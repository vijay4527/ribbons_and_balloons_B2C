"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useSession} from "next-auth/react";
import styles from "@/app/[city]/checkout/page.module.css";
import homeStyles from "@/app/home.module.css";
import { axiosGet, axiosPost } from "@/api";
import Head from "next/head";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import * as yup from "yup";
import ServingInfo from "@/components/ServingInfo";
import OrderSummary from "@/components/OrderSummary";
import MapModal from "@/components/googleMapModal";

const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid Contact format (10 digits required)")
      .required("This field is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pinCode: yup.string().required("Pin code is required"),
    country: yup.string().required("Country is required"),
  });
const page = ({params}) => {
    const { data, status } = useSession();
    const [products, setProducts] = useState([]);
    const [subTotalAmount, setSubTotalAmount] = useState(0);
    const [shippingCharges, setShippingCharges] = useState(20);
    const [selectedOption, setSelectedOption] = useState("delivery");
    const [inputValue, setInputValue] = useState("");
    const [franchise, setFranchise] = useState([]);
    const [selectedFranchise, setSelectedFranchise] = useState("");
    const [userAddress, setUserAddress] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [user, setUser] = useState({});
    const [enableAddress, setEnableAddress] = useState(false);  
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const userObject =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("userData"))
    : "";
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

  // useEffect(()=>{
  //   if(data){
  //      setSessionData(data)
  //   }
  // },[])
  const router = useRouter();
  const  city  = params.city;
  useEffect(() => {
    const fetchUser = async () => {
      const userObject =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("userData"))
          : "";
      if (userObject) {
        setUser(userObject);
      }
    };

    fetchUser();
  }, []);

  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";

    useEffect(() => {
      GetAllCart();
    }, [city]);
    
    useEffect(() => {
      if (userObject) {
        GetAddress(); 
      }
    }, [userObject?.user_id]);

  useEffect(() => {
    countSubTotalAmount();
  }, [products]);

//   useEffect(() => {
//     if (subTotalAmount) {
//       setTotalAmount(subTotalAmount + shippingCharges);
//     }
//   }, [subTotalAmount]);


  const GetAllCart = async () => {
    if (userObject && userObject.user_id && city) {
      var obj = {
        cart_id: cartId ? cartId : "",
        user_id: userObject ? userObject.user_id : "",
        city_name: city,
        type:"AC"
      };
      const response = await axiosPost("/CartMaster/GetCartDetails", obj);
      if (response) {
        setProducts(response);
      }
    }
  };

  const countSubTotalAmount = () => {
    var price = 0;
    products.map((e) => {
      price += e.cost;
    });
    setSubTotalAmount(price);
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
        const stores = await axiosPost(
          "/StoreMaster/GetPickupDetails",
          apiRequestData
        );
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
    setSelectedOption(option);
  };

  const loadMap = (lat, long) => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  };


  const GetAddress = async () => {
    try {
      if (userObject.user_id) {
        const addressData = await axiosGet(
          `ShippingAddress/GetShippingAddressByUserId/${userObject.user_id}`
        );
        if (addressData) {
          setUserAddress(addressData);
        }
      }
    } catch (error) {
      console.log("error while fetching the data" + error);
    }
  };

  const validateOrder = () => {
    if (selectedOption === 'delivery') {
      if (!selectedAddress) {
        toast('Please select a shipping address for delivery.',{autoClose : 3000,closeButton: true});
        return false;
      }
    } else if (selectedOption === 'pickup') {
      if (!selectedFranchise) {
        toast('Please select a shop for pickup.',{autoClose : 3000,closeButton: true});
        return false;
      }
    }

    return true;
  };


  const handlePlaceOrder = async () => {
    const isValidOrder = validateOrder();
    if (isValidOrder) {
      await createOrder();
    }
  };

  const createOrder = async () => {
    products.forEach((e) => {
      e.city = city;
    });
    const orderobj = {
      order_type: selectedOption,
      franchise_id: selectedFranchise ? selectedFranchise : null,
      shipping_address_id: selectedAddress ? selectedAddress : "",
      coupon_code: couponCode ? couponCode : null,
      city: city,
      user_id: userObject.user_id,
      order_status: null,
    };
    if(products.length> 0 ){
      const order = await axiosPost("Order/SaveOrder", orderobj);
      if (order.resp == true) {
  
        toast("Your Order has been placed", {
          autoClose: 3000,
          closeButton: true,
          onClose: () => {
            sessionStorage.removeItem("cartId");
            setProducts([])
            router.push( `/${city}/orders`);
          }
        });
      } else {
        console.log("Order not placed");
        toast("Something went wrong! Your Order has not been placed",{autoClose : 3000,closeButton: true})
  
      }
    }else{
      toast("Please add product to your cart", {
        autoClose: 3000,
        closeButton: true,    
      });
    }
   
  };

  const frachiseSelection = (storeid) => {
    setSelectedFranchise(storeid);
  };

  const addressSelection = (shippingId) => {
    console.log("shiiping adress hit");
    setSelectedAddress(shippingId);
    console.log("shipping address is", shippingId);
  };
  const saveShippingAddress = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      var obj = {
        shipping_address_id: "",
        user_id: userObject.user_id,
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
      const data = await axiosPost("ShippingAddress/SaveShippingAddress", obj);
      if (data.resp == true) {
        toast("Your address has been saved",{autoClose : 3000,closeButton: true})
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
        });
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

  const enableAddAddredd = () => {
    setEnableAddress(true);
  };

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
            <div className={styles.checkoutQctShipping}>
              <div className={styles.checkoutQctShippingMethod}>
                <div className={styles.checkoutQctShippingHeader}>
                  <h4 className={styles.checkoutQctShippingTitle}>
                    Shipping method
                  </h4>
                  <ul className={styles.checkoutQctShippingTabs}>
                    <li
                      className={
                        selectedOption === "delivery" ? `${styles.active}` : ""
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
                      <p>(Collect your order from a store of your choice)</p>
                    </li>
                  </ul>
                  <div className={styles.checkoutQctShippingContents}>
                    <div
                      className={`${styles.checkoutQctShippingContent} ${
                        selectedOption === "delivery" ? `${styles.active}` : ""
                      }`}
                    >
                      <div className={styles.newAddress}>
                        <h4
                          className={`${styles.checkoutQctShippingContentTitle}`}
                          onClick={enableAddAddredd}
                        >
                          Add new address
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
                              />
                              {errors.contact && (
                                <div className="text-danger">
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
                              />
                              {errors.country && (
                                <div className="text-danger">
                                  {errors.country}
                                </div>
                              )}
                            </div>
                              <button className="btn btn-sm btn-primary" onClick={handleShowModal}>Select Address from the modal</button>
                          </div>
                          <div className={styles.checkoutQctShippingAddress}>

                            <button
                              className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                              onClick={saveShippingAddress}
                            >
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
                                  selectedAddress === res.shipping_address_id
                                    ? `${styles.active}`
                                    : ""
                                }`}
                                key={res.shipping_address_id}
                              >
                                <div className={styles.pickUpFranchiseInput}>
                                  <input
                                    id={`Address${res.shipping_address_id}`}
                                    className="form-check-input"
                                    type="radio"
                                    name="address"
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
                                        {res.first_name} {res.last_name},
                                      </p>

                                      <p>
                                        {res.address},{res.city}-{res.pincode}
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
                      <h4 className={styles.checkoutQctShippingContentTitle}>
                        Select your collection store
                      </h4>
                      <p className={styles.pickUpImpNote}>
                        Note: The product exchange feature is not available
                        for this shipping method
                      </p>
                      <div className={styles.pickUpWrap}>
                        <div className={styles.pickUpSearch}>
                          <div className={homeStyles["form_group"]}>
                            <Form.Label>
                              Search by city, locality or mall name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={inputValue}
                              onChange={handleFranchiseAddress}
                              placeholder="Enter the city, locality or mall"
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
                                <div className={styles.pickUpFranchiseInput}>
                                  <input
                                    id={`Franchise${res.store_id}`}
                                    className="form-check-input"
                                    type="radio"
                                    value="pickup"
                                    checked={
                                      selectedFranchise === res.store_id
                                    }
                                    onChange={() => {
                                      frachiseSelection(res.store_id);
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
                                  <div className={styles.pickUpFranchiseInfo}>
                                    <h4>{res.franchise_name}</h4>
                                    <p
                                      onClick={() =>
                                        loadMap(res.latitude, res.longitude)
                                      }
                                    >
                                      View in Map
                                    </p>
                                  </div>
                                  <div className={styles.pickUpFranchiseInfo}>
                                    <h5>{res.store_address}</h5>
                                  </div>
                                </div>
                              </label>
                            ))
                          ) : (
                            <div>
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
            <div className={styles.checkoutQctOrderSummary}>
              <div className={styles.cartPriceBox}>
                <div className={styles.cartOrderSummary}>
                  <h4>Order summary</h4>
                  <ServingInfo />
                </div>
                
                <OrderSummary data={products} />
                <button
                  className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                  onClick={handlePlaceOrder}
                >
                  <span>Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ToastContainer />
    {/* <MapModal show={showModal} handleClose={handleCloseModal} /> */}
  </>  )
}

export default page