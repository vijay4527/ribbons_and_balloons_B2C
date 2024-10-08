"use client";
import React from "react";
import { useEffect, useState, useContext } from "react";
import styles from "@/app/[city]/checkout/page.module.css";
import homeStyles from "@/app/home.module.css";
import Head from "next/head";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import ServingInfo from "@/components/ServingInfo";
import OrderSummary from "@/components/OrderSummary";
import { AuthOtpContext } from "@/components/authContext";
import Cookies from "js-cookie";
import { validationSchema } from "@/components/validation";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";

const page = ({ params }) => {
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("delivery");
  const [inputValue, setInputValue] = useState("");
  const [franchise, setFranchise] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [user, setUser] = useState({});
  const [enableAddress, setEnableAddress] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [filteredCoupon, setFilteredCoupon] = useState([]);
  const [couponMessage, setCouponMessage] = useState("");
  const { isLogged } = useContext(AuthOtpContext);
  const accessCode = process.env.ACCESS_CODE;
  const redirectUrl = process.env.form_Action_Url;
  const [finalAmount, setFinalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [displayCancelButton, setDisplayCancelButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const formatDateForInput = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const currentDate = new Date();
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  const [startDate, setStartDate] = useState(formatDateForInput(nextDate));
  const apiUrl = process.env.API_URL;

  const handleDateChange = async (e) => {
    const selectedDate = e;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = await formatDateForInput(tomorrow);
    if (selectedDate >= tomorrowDate) {
      return true;
    } else {
      return false;
    }
  };
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const router = useRouter();
  const city = params.city;
  useEffect(() => {
    const fetchUser = async () => {
      const userObject =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("userData"))
          : "";
      if (userObject) {
        setUser(userObject);
      } else {
        router.push("/" + city);
      }
    };
    fetchUser();
  }, [isLogged, user?.user_id]);

  const cartId =
    typeof window !== "undefined" ? localStorage.getItem("cartId") : "";
  useEffect(() => {
    GetAllCart();
    GetAddress();
    getAllCoupons();
  }, [city, user?.user_id]);

  const getAllCoupons = async () => {
    try {
      const response = await fetch(
        apiUrl + "CouponMaster/GetAllCouponByCity?city=" + city,
        { next: { revalidate: 180 } }
      );
      const data = await response.json();
      if (data) {
        setFilteredCoupon(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllCart = async (couponId) => {
    try {
      if (user && user.user_id && city && cartId) {
        var obj = {
          cart_id: cartId ? cartId : "",
          user_id: user ? user.user_id : "",
          city_name: city,
          type: "AC",
          coupon_id: couponId ? couponId : "",
        };
        const responseData = await fetch(apiUrl + "CartMaster/GetCartDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        const response = await responseData.json();
        if (response) {
          setProducts(response.result);
          setFinalAmount(response.final_amount);
          setTotalAmount(response.totalAmount);
          setDiscountAmount(response.discount);
          setCouponMessage(response.validationMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFranchiseAddress = async (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const inputWords = inputValue.trim().split(/\s+/);
    if (inputWords.length > 0) {
      const lastWord = inputWords[inputWords.length - 1];
      if (lastWord) {
        const apiRequestData = {
          city_name: city,
          param: lastWord,
        };
        const storesData = await fetch(
          apiUrl + "StoreMaster/GetPickupDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestData),
          }
        );
        const stores = await storesData.json();
        if (stores) {
          setFranchise(stores);
        }
      } else {
        setFranchise([]);
      }
    } else {
      setSelectedFranchise("");
    }
  };
  const handleOptionChange = (option) => {
    if (option == "pickup") {
      setSelectedAddress("");
    }
    if (option == "delivery") {
      setInputValue("");
      setSelectedFranchise("");
      setFranchise([]);
    }
    setSelectedOption(option);
  };

  const loadMap = (lat, long) => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  };

  const GetAddress = async () => {
    try {
      if (user.user_id) {
        const addressResponse = await fetch(
          apiUrl + `ShippingAddress/GetShippingAddressByUserId/${user.user_id}`
        );
        const addressData = await addressResponse.json();
        if (addressData) {
          setUserAddress(addressData);
        }
      }
    } catch (error) {
      console.log("error while fetching the data" + error);
    }
  };

  const validateOrder = async () => {
    const isOrderDate = await handleDateChange(startDate);
    if (!isOrderDate) {
      toast("Please select a valid date.", {
        autoClose: 3000,
        closeButton: true,
      });
      return false;
    } else if (selectedOption === "delivery") {
      if (!selectedAddress) {
        toast("Please select a shipping address for delivery.", {
          autoClose: 3000,
          closeButton: true,
        });
        return false;
      }
    } else if (selectedOption === "pickup") {
      if (!selectedFranchise) {
        toast("Please select a shop for pickup.", {
          autoClose: 3000,
          closeButton: true,
        });
        return false;
      } else if (time == "") {
        toast("Please select time for pickup.", {
          autoClose: 3000,
          closeButton: true,
        });
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    const isValidOrder = await validateOrder();
    if (isValidOrder) {
      await createOrder();
    }
  };

  const createOrder = async () => {
    try {
      products.forEach((e) => {
        e.city = city;
      });
      const orderobj = {
        order_type: selectedOption,
        franchise_id: selectedFranchise ? selectedFranchise : null,
        shipping_address_id: selectedAddress ? selectedAddress : "",
        coupon_code: selectedCoupon ? selectedCoupon : null,
        city: city,
        orderDate: startDate,
        orderTime: time,
        user_id: user.user_id,
        order_status: null,
        image: "",
      };
      if (products.length > 0) {
        const orderData = await fetch(apiUrl + "Order/SaveOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderobj),
        });
        const order = await orderData.json();
        if (order && order?.resp == true) {
          setProducts([]);
          // Cookies.remove("cartId");
          // localStorage.removeItem("cartId");
          const form = document.createElement("form");
          form.id = "nonseamless";
          form.method = "post";
          form.name = "redirect";
          form.action = redirectUrl;
          const encRequestInput = document.createElement("input");
          encRequestInput.type = "hidden";
          encRequestInput.name = "encRequest";
          encRequestInput.id = "encRequest";
          encRequestInput.value = order.respObj.formdata.encRequest;
          const accessCodeInput = document.createElement("input");
          accessCodeInput.type = "hidden";
          accessCodeInput.name = "access_code";
          accessCodeInput.id = "access_code";
          accessCodeInput.value = accessCode;
          form.appendChild(encRequestInput);
          form.appendChild(accessCodeInput);
          document.body.appendChild(form);
          form.submit();
        } else {
          toast("Something went wrong! Your Order has not been placed", {
            autoClose: 3000,
            closeButton: true,
            position: "top-right",
          });
        }
      } else {
        toast("Please add product to your cart", {
          autoClose: 3000,
          closeButton: true,
          position: "top-right",
        });
      }
    } catch (err) {
      toast("error while placing the order", {
        autoClose: 3000,
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const frachiseSelection = (store) => {
    setSelectedFranchise(store.store_id);
  };

  const addressSelection = (shippingId) => {
    setSelectedAddress(shippingId);
  };
  const saveShippingAddress = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      var obj = {
        shipping_address_id: "",
        user_id: user.user_id,
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        email_address: formValues.email,
        mobile_number: formValues.contact,
        address: formValues.address,
        city: formValues.city,
        state: formValues.state,
        pincode: formValues.pinCode,
        country: formValues.country,
      };
      const responseData = await fetch(
        apiUrl + "ShippingAddress/SaveShippingAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const data = await responseData.json();
      if (data.resp == true) {
        // toast("Your address has been saved", {
        //   autoClose: 3000,
        //   closeButton: true,
        //   onClose: () => setEnableAddress(false),
        // });
        notify();
        GetAddress();
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          country: "",
          latitude: location?.latitude ? location?.latitude : "",
          longitude: location?.longitude ? location?.longitude : "",
        });
        setTimeout(() => {
          setEnableAddress(false);
        }, 2000);
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error(validationError);
      }
    }
  };

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const handleClose = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    });
    setEnableAddress(false);
  };

  const notify = () =>
    toast(
      (t) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Address has been saved.</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setEnableAddress(false);
            }}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <i className="fa fa-x" />
          </button>
        </div>
      ),
      {
        duration: 3000,
        style: {
          marginRight: "20px",
        },
        icon: "✅",
        position: "top-right",
        progressBar: {
          style: {
            height: "4px",
            backgroundColor: "#4caf50",
          },
        },
      }
    );

  const [filter, setFilter] = useState("");
  const handleCouponChange = (e) => {
    setDisplayCancelButton(true);
    setFilter(e);
    fitlerCoupon(e);
    if (e.length == 0) {
      getAllCoupons();
      setFilter("");
      setSelectedCoupon("");
      setCouponMessage("");
    }
  };

  const hanldeCoupon = (res) => {
    setIsBtnVisible(true);
    setDisplayCancelButton(true);
    setSelectedCoupon(res.coupon_id);
    GetAllCart(res.coupon_id);
  };

  const fitlerCoupon = (e) => {
    const searchTerm = e.toLowerCase();
    const filteredCoupons = filteredCoupon.filter((coupon) =>
      coupon.coupon_name.toLowerCase().includes(searchTerm)
    );
    if (filteredCoupons.length > 0) {
      setFilteredCoupon(filteredCoupons);
    } else {
      setCouponMessage("No Coupon Found");
      setSelectedCoupon("");
    }
  };

  const [location, setLocation] = useState(null);
  // const [error, setError] = useState(null);
  const enableAddAddress = () => {
    setEnableAddress(true);
    // getLocation();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const removeCoupon = () => {
    setSelectedCoupon("");
    GetAllCart();
  };
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="https://ribbonsandballoons.com/frontassets/images/fav.png"
          type="image/x-icon"
        />
      </Head>
      <section className={styles.CheckOutQct}>
        <div className={homeStyles["container"]}>
          <div className={styles.checkOutQctWrap}>
            <div className={styles.checkoutQctTitle}>Shipping & Payment</div>
            <div className={styles.checkoutQctBody}>
              <div className={styles.checkoutQctShippingWrap}>
                <div className={styles.checkoutQctShipping}>
                  <div className={styles.checkoutQctShippingMethod}>
                    <div className={styles.checkoutQctShippingHeader}>
                      <h4 className={styles.checkoutQctShippingTitle}>
                        Select Date and Time
                      </h4>
                      <div className={styles.checkoutQctShippingContents}>
                        <div
                          className={`${styles.checkoutQctShippingContent} ${styles.active}`}
                        >
                          <div className={styles.dateContiner}>
                            <div className={styles.dateDiv}>
                              <label>Select a date:</label>
                              <input
                                type="date"
                                placeholder="DD/MM/YYYY"
                                className={`${styles.datePicker} form-control`}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </div>
                            {selectedOption == "pickup" && (
                              <div className={styles.dateDiv}>
                                <label>Select a time:</label>
                                <select
                                  className="form-select"
                                  name=""
                                  id=""
                                  onChange={(e) => setTime(e.target.value)}
                                >
                                  <option value="" disabled selected>
                                    select a time
                                  </option>
                                  <option value="">11:30am to 3:30 pm</option>
                                  <option value="">11:30pm to 5:30 pm</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.checkoutQctShipping}>
                  <div className={styles.checkoutQctShippingMethod}>
                    <div className={styles.checkoutQctShippingHeader}>
                      <h4 className={styles.checkoutQctShippingTitle}>
                        Shipping method
                      </h4>
                      <ul className={styles.checkoutQctShippingTabs}>
                        <li
                          className={
                            selectedOption === "delivery"
                              ? `${styles.active}`
                              : ""
                          }
                          onClick={() => handleOptionChange("delivery")}
                        >
                          <h4>Home Delivery</h4>
                          <p>(Get your product delivered to your home)</p>
                        </li>
                        <li
                          className={
                            selectedOption === "pickup"
                              ? `${styles.active}`
                              : ""
                          }
                          onClick={() => handleOptionChange("pickup")}
                        >
                          <h4>Pick from nearby store</h4>
                          <p>
                            (Collect your order from a store of your choice)
                          </p>
                        </li>
                      </ul>
                      <div className={styles.checkoutQctShippingContents}>
                        <div
                          className={`${styles.checkoutQctShippingContent} ${
                            selectedOption === "delivery"
                              ? `${styles.active}`
                              : ""
                          }`}
                        >
                          <div className={styles.newAddress}>
                            <h4
                              className={`${styles.checkoutQctShippingContentTitle}`}
                              onClick={enableAddAddress}
                            >
                              Click to Add new address{" "}
                            </h4>
                            {enableAddress && (
                              <button
                                className={`${styles.closeButton}`}
                                onClick={handleClose}
                              >
                                Close
                              </button>
                            )}
                          </div>
                          {enableAddress && (
                            <>
                              <div className={styles.checkoutQctShippingForm}>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.firstName && (
                                    <div className="text-danger">
                                      {errors.firstName}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.lastName && (
                                    <div className="text-danger">
                                      {errors.lastName}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    autoComplete="off"
                                  />
                                  {errors.email && (
                                    <div className="text-danger">
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>Contact</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="+91"
                                    name="contact"
                                    value={formValues.contact}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.contact && (
                                    <div className="text-danger">
                                      {" "}
                                      {errors.contact}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>Address</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.address && (
                                    <div className="text-danger">
                                      {errors.address}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>Zip Code</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="pinCode"
                                    value={formValues.pinCode}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.pinCode && (
                                    <div className="text-danger">
                                      {errors.pinCode}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="city"
                                    value={formValues.city}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.city && (
                                    <div className="text-danger">
                                      {errors.city}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>State</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="state"
                                    value={formValues.state}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.state && (
                                    <div className="text-danger">
                                      {errors.state}
                                    </div>
                                  )}
                                </div>
                                <div className={homeStyles["form_group"]}>
                                  <Form.Label>Country</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="country"
                                    value={formValues.country}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                  />
                                  {errors.country && (
                                    <div className="text-danger">
                                      {errors.country}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className={styles.checkoutQctShippingAddress}
                              >
                                <button
                                  className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                                  onClick={saveShippingAddress}
                                >
                                  {" "}
                                  <span>ADD ADDRESS</span>
                                </button>
                              </div>
                            </>
                          )}
                          <div>
                            <h4>Select Shipping Address</h4>
                            <div className={styles.pickUpSearchResult}>
                              {userAddress && userAddress.length > 0 ? (
                                userAddress.map((res) => (
                                  <label
                                    htmlFor={`Address${res.shipping_address_id}`}
                                    className={`${
                                      styles.pickUpSearchResultItem
                                    } ${
                                      selectedAddress ===
                                      res.shipping_address_id
                                        ? `${styles.active}`
                                        : ""
                                    }`}
                                    key={res.shipping_address_id}
                                  >
                                    <div
                                      className={styles.pickUpFranchiseInput}
                                    >
                                      <input
                                        id={`Address${res.shipping_address_id}`}
                                        className="form-check-input"
                                        type="radio"
                                        name="address"
                                        autoComplete="off"
                                        checked={
                                          selectedAddress ===
                                          res.shipping_address_id
                                        }
                                        onChange={() => {
                                          addressSelection(
                                            res.shipping_address_id
                                          );
                                        }}
                                      />
                                      <div
                                        className={
                                          styles.pickUpFranchiseInputIcon
                                        }
                                      >
                                        <svg
                                          className={styles.roundedIcon}
                                          focusable="false"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                        >
                                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                        </svg>
                                        <svg
                                          className={styles.solidIcon}
                                          focusable="false"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                        >
                                          <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div
                                      className={styles.pickUpFranchiseDetails}
                                    >
                                      <div className={styles.addressInfo}>
                                        <h4>
                                          <p>
                                            {" "}
                                            {res.first_name} {res.last_name},
                                          </p>
                                          <p>
                                            {res.address},{res.city}-
                                            {res.pincode}
                                          </p>
                                          <p>
                                            {res.state}, {res.country}
                                          </p>
                                          <p>Mobile no: {res.mobile_number}</p>
                                        </h4>
                                      </div>
                                    </div>
                                  </label>
                                ))
                              ) : (
                                <div>
                                  {" "}
                                  <h5>No Address to Show</h5>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${styles.checkoutQctShippingContent} ${
                            selectedOption === "pickup"
                              ? `${styles.active}`
                              : ""
                          }`}
                        >
                          <h4
                            className={styles.checkoutQctShippingContentTitle}
                          >
                            Select your collection store
                          </h4>
                          <div className={styles.pickUpWrap}>
                            <div className={styles.pickUpSearch}>
                              <div className={homeStyles["form_group"]}>
                                <Form.Label>
                                  {" "}
                                  Search by city or locality
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  value={inputValue}
                                  onChange={handleFranchiseAddress}
                                  placeholder="Enter the city or locality"
                                  required
                                />
                              </div>
                            </div>
                            <div className={styles.pickUpSearchResult}>
                              {franchise.length >= 1 ? (
                                franchise.map((res) => (
                                  <label
                                    htmlFor={`Franchise${res.store_id}`}
                                    className={`${
                                      styles.pickUpSearchResultItem
                                    } ${
                                      selectedFranchise === res.store_id
                                        ? `${styles.active}`
                                        : ""
                                    }`}
                                    key={res.store_id}
                                  >
                                    <div
                                      className={styles.pickUpFranchiseInput}
                                    >
                                      <input
                                        id={`Franchise${res.store_id}`}
                                        className="form-check-input"
                                        type="radio"
                                        value="pickup"
                                        checked={
                                          selectedFranchise === res.store_id
                                        }
                                        onChange={() => {
                                          frachiseSelection(res);
                                        }}
                                        autoComplete="off"
                                      />
                                      <div
                                        className={
                                          styles.pickUpFranchiseInputIcon
                                        }
                                      >
                                        <svg
                                          className={styles.roundedIcon}
                                          focusable="false"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                        >
                                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                        </svg>
                                        <svg
                                          className={styles.solidIcon}
                                          focusable="false"
                                          viewBox="0 0 24 24"
                                          aria-hidden="true"
                                        >
                                          <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <div
                                      className={styles.pickUpFranchiseDetails}
                                    >
                                      <div
                                        className={styles.pickUpFranchiseInfo}
                                      >
                                        <h4>{res.franchise_name}</h4>
                                        <p
                                          onClick={() =>
                                            loadMap(res.latitude, res.longitude)
                                          }
                                        >
                                          View in Map
                                        </p>
                                      </div>
                                      <div
                                        className={styles.pickUpFranchiseInfo}
                                      >
                                        <h5>{res.store_address}</h5>{" "}
                                      </div>
                                    </div>
                                  </label>
                                ))
                              ) : (
                                <div>
                                  {" "}
                                  <h5>No Franchise to Show</h5>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.checkoutQctOrderSummary}>
                <div className="" style={{ width: "100%", marginTop: "10px" }}>
                  <div className={styles.cartPriceBox}>
                    <div className={styles.cartOrderSummary}>
                      <h4>Order summary</h4>
                      <ServingInfo />
                    </div>
                    {products && products.length > 0 && (
                      <OrderSummary
                        data={products}
                        finalAmount={finalAmount}
                        discountAmount={discountAmount}
                        totalAmount={totalAmount}
                      />
                    )}
                    <button
                      className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                      onClick={handlePlaceOrder}
                    >
                      <span className={styles.cartPriceBoxSpan}>Checkout</span>
                    </button>
                  </div>
                </div>
                {filteredCoupon.length > 0 && (
                  <div
                    className=""
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <div className={styles.cartPriceBox}>
                      <div className={`${styles.cartOrderSummary} m-0`}>
                        <h4
                          className={styles.addCouponItem}
                          onClick={() => {
                            setModalIsOpen(true);
                          }}
                        >
                          <img
                            src="https://assets.landmarkshops.in/website_images/in/checkout/gift-box.png"
                            className={styles.giftBox}
                          />
                          Add Offers
                        </h4>{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        id="coupons-modal-dialog"
        show={modalIsOpen}
        onHide={closeModal}
        className={homeStyles["couponsModal"]}
        centered
      >
        <div className={styles.modalBox}>
          <div className={styles.modalCartPriceBox}>
            <div className={styles.modalBorder}>
              <div className={styles.cartOrderSummary}>
                <h4>Add Coupons</h4>{" "}
                {/* <button className="btn btn-primary" onClick={closeModal}>
                  close
                </button> */}
                <i className="fa-solid fa-x"  onClick={closeModal}></i>
              </div>
              <div className={homeStyles["form_group"]}>
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => handleCouponChange(e.target.value)}
                  placeholder="Search Coupon if any"
                  autoComplete="off"
                />
                <div className={styles.couponBody}>
                  {filteredCoupon.length > 0 &&
                    filteredCoupon.map((res, index) => (
                      <div className={styles.couponItem} key={res.coupon_id}>
                        <label
                          htmlFor={`Franchise${res.coupon_id}`}
                          className={`${styles.pickUpSearchResultItem} ${
                            selectedCoupon === res.coupon_id
                              ? `${styles.active}`
                              : ""
                          }`}
                        >
                          <div className={styles.pickUpFranchiseInput}>
                            <input
                              id={`Franchise${res.coupon_id}`}
                              className="form-check-input"
                              type="radio"
                              value="pickup"
                              checked={selectedCoupon === res.coupon_id}
                              onChange={() => {
                                hanldeCoupon(res);
                              }}
                              autoComplete="off"
                            />
                            <div className={styles.pickUpFranchiseInputIcon}>
                              <svg
                                className={styles.roundedIcon}
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                              </svg>
                              <svg
                                className={styles.solidIcon}
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                              </svg>
                            </div>
                          </div>
                          <div
                            className={`${styles.pickUpFranchiseDetails} ${styles.couponDetails}`}
                          >
                            <div className={styles.modalCouponName}>
                              <h4>{res.coupon_name}</h4>
                            </div>
                            <span style={{fontSize:"1.3rem"}}>
                              shop for minimum {res.applicable_amt} and get
                              discount upto {res.dist_max_amt}
                            </span>
                            {selectedCoupon === res.coupon_id &&
                              displayCancelButton && (
                                <div
                                  className={`${styles.pickUpFranchiseInfo}`}
                                >
                                  <h6 className={styles.couponMessage}>{couponMessage}</h6>
                                </div>
                              )}
                          </div>
                        </label>

                        {selectedCoupon === res.coupon_id &&
                          displayCancelButton && (
                            // <button
                            //   className="btn btn-primary"
                            //   onClick={removeCoupon}
                            // >
                            //   Remove
                            // </button>
                            <i
                              className="fa-solid fa-x"
                              onClick={removeCoupon}
                            ></i>
                          )}
                      </div>
                    ))}
                </div>
              </div>
              {/* {isBtnVisible && (
                <div className="btnCoupon">
                  <i className="fa-solid fa-x" onClick={closeModal}></i>
                  <button className="btn btn-primary" onClick={closeModal}>
                    Add
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default page;
