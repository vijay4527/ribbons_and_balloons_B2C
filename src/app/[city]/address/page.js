"use client";
import React, { useState, useEffect } from "react";
import homeStyles from "@/app/home.module.css";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { validationSchema } from "@/components/validation";
import toast, { Toaster } from "react-hot-toast";

import styles from "@/app/[city]/address/page.module.css";
import TabComponent from "@/components/tab";
const page = ({ params }) => {
  const [address, setAddress] = useState([]);
  const [enableAddress, setEnableAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [shippingAddressId, setShippingAddressId] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUser(userData);
      GetAddress(userData);
    }
  }, []);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: user ? user?.mobile_number : "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const GetAddress = async (userData) => {
    try {1
      if (userData.user_id) {
        const addressResponse = await fetch(
          process.env.API_URL +
            `ShippingAddress/GetShippingAddressByUserId/${userData.user_id}`
        );
        const addressData = await addressResponse.json();
        if (addressData) {
          setAddress(addressData);
        }
      }
    } catch (error) {
      console.log("error while fetching the data" + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const deleteAddress = async (id) => {
    try {
      const resp = await fetch(
        `${process.env.API_URL}ShippingAddress/DeleteShippingAddress/${id}`,
        {
          method: "POST",
        }
      );
      const response = await resp.json();
      if (response.resp === true) {
        await GetAddress(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const notify = () =>
    toast(
      (t) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Your address has been saved.</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push(`/${city}/cart`);
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

  const saveShippingAddress = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      var obj = {
        shipping_address_id: shippingAddressId ? shippingAddressId : "",
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
        process.env.API_URL + "ShippingAddress/SaveShippingAddress",
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
        
        notify();
        GetAddress(user);
        setEnableAddress(false);
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
          longitude: location?.longitude,
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
  const getAddressById = async (id) => {
    try {
      setShippingAddressId(id);
      setEnableAddress(true);
      const addressData = await fetch(
        process.env.API_URL + "ShippingAddress/GetShippingAddressById/" + id
      );
      if (addressData) {
        const data = await addressData.json();
        setFormValues({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email_address,
          contact: data.mobile_number,
          address: data.address,
          city: data.city,
          state: data.state,
          pinCode: data.pincode,
          country: data.country,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = async (addressId) => {
    toast(
      (t) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Are you sure you want to delete this address?</span>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#d33",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              onClick={async () => {
                toast.dismiss(t.id);
                await deleteAddress(addressId);
              }}
            >
              Yes
            </button>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "#3085d6",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-right",
      }
    );
  };

  return (
    <>
      <div className={`container ${styles.userDetailSection}`}>
        {user && (
          <>
            <div className={styles.contactSection}>
              <span>
                <i className="fa fa-user"></i>
                {user.first_name}
              </span>
            </div>

            <div className={styles.contactSection}>
              <span>
                <i className="fa fa-envelope"></i>
                {user.email}
              </span>
              <span>
                <i className="fa fa-phone"></i>
                {user.mobile_number}
              </span>
            </div>
          </>
        )}
      </div>
      <Toaster />
      <div className={`container ${styles.addressPage}`}>
        <TabComponent url={"address"} city={params.city} />
        <div className={styles.addressContainer}>
          {enableAddress && (
            <>
              <div className={styles.arrowIconContainer}>
                <i
                  className={`fa-solid fa-arrow-right ${styles.arrowIcon}`}
                  onClick={() => setEnableAddress(!enableAddress)}
                ></i>
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>First Name</Form.Label>
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
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>Last Name</Form.Label>
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
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  autoComplete="off"

                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>Contact</Form.Label>
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
                  <div className="text-danger"> {errors.contact}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"

                />
                {errors.address && (
                  <div className="text-danger">{errors.address}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="pinCode"
                  value={formValues.pinCode}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"

                />
                {errors.pinCode && (
                  <div className="text-danger">{errors.pinCode}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"

                />
                {errors.city && (
                  <div className="text-danger">{errors.city}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formValues.state}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"

                />
                {errors.state && (
                  <div className="text-danger">{errors.state}</div>
                )}
              </div>
              <div className={homeStyles["form_group"]}>
                <Form.Label className={styles.label}>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formValues.country}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"

                />
                {errors.country && (
                  <div className="text-danger">{errors.country}</div>
                )}
              </div>
              <div
                className={`${styles.checkoutQctShippingAddress} `}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  className={`${homeStyles["btn"]} ${homeStyles.AddAddressBtn} ${homeStyles["btn-primary"]}`}
                  onClick={saveShippingAddress}
                >
                  {" "}
                  <span>ADD ADDRESS</span>
                </button>
              </div>
            </>
          )}

          {!enableAddress && (
            <>
              <div className={homeStyles.AddAddressBtnDiv}>
                <button
                  className={homeStyles.AddAddressBtn}
                  onClick={() => setEnableAddress(true)}
                >
                  Add Address
                </button>
              </div>
              <div className={`${styles.savedAddress}`}>
                {address &&
                  address.length > 0 &&
                  address.map((ele, index) => (
                    <div className={`mb-3 p-4 ${styles.address}`} key={index}>
                      <div className={styles.addressImageContainer}>
                        <div></div>
                        <div className="d-flex justify-content-space-between">
                          <div className="ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className={homeStyles.btnEdit}
                              onClick={() =>
                                getAddressById(ele.shipping_address_id)
                              }
                            >
                              <g data-name="Group 5772">
                                <path
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                  data-name="Rectangle 1323"
                                />
                                <g data-name="edit (4)">
                                  <g data-name="Group 5770">
                                    <path
                                      fill="#c19f5f"
                                      d="M19.739 6.646 17.17 4.077a1.55 1.55 0 0 0-2.19 0L4.896 14.161a.55.55 0 0 0-.146.259l-1.295 5.272a.553.553 0 0 0 .669.669l5.272-1.295a.55.55 0 0 0 .259-.146L19.739 8.836a1.55 1.55 0 0 0 0-2.19M4.746 19.07l.053-.215.162.162zm1.47-.361L5.107 17.6l.482-1.964 2.59 2.59zm3.048-.961-3.2-3.2 8.253-8.253 3.2 3.2zm9.693-9.693-.638.638-3.2-3.2.638-.638a.443.443 0 0 1 .627 0l2.573 2.568a.443.443 0 0 1 0 .632"
                                      data-name="Path 27163"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className={homeStyles.btnDelete}
                              onClick={() =>
                                confirmDelete(ele.shipping_address_id)
                              }
                            >
                              <g data-name="Group 5773">
                                <path
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                  data-name="Rectangle 1322"
                                />
                                <g data-name="delete (2)">
                                  <path
                                    fill="#c19f5f"
                                    d="M16.754 9.79H7.338a.44.44 0 0 0-.44.477l.787 9.734a1.045 1.045 0 0 0 1.042.962h6.639a1.046 1.046 0 0 0 1.04-.961l.787-9.734a.44.44 0 0 0-.439-.478M9.618 19.925h-.032a.5.5 0 0 1-.5-.471l-.493-7.991a.501.501 0 1 1 1-.062l.493 7.991a.5.5 0 0 1-.468.533m2.935-.5a.5.5 0 0 1-1 0v-7.992a.5.5 0 1 1 1 0zm2.946-7.962-.471 7.991a.5.5 0 0 1-.5.472h-.03a.5.5 0 0 1-.471-.53l.471-7.992a.5.5 0 1 1 1 .059zm0 0"
                                    data-name="Path 27161"
                                  />
                                  <g data-name="Group 5771">
                                    <path
                                      fill="#c19f5f"
                                      d="m9.637 5.55 2.706-.754.105.549.977-.272-.12-.625a.95.95 0 0 0-1.123-.846l-2.835.789a1.153 1.153 0 0 0-.702 1.352l.12.625.977-.271zm0 0"
                                      data-name="Path 27160"
                                    />
                                    <path
                                      fill="#c19f5f"
                                      d="m18.034 5.831-.543-1.068a.6.6 0 0 0-.688-.348L6.069 7.398a.74.74 0 0 0-.496.676L5.479 9.32a.51.51 0 0 0 .278.519.34.34 0 0 0 .226.013l11.79-3.276a.4.4 0 0 0 .2-.133.57.57 0 0 0 .06-.612m0 0"
                                      data-name="Path 27162"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className={styles.details}>
                        {ele.first_name + " " + ele.last_name}
                      </div>
                      <div className={`${styles.details} mt-2 mb-3`}>
                        {ele.email_address}
                      </div>
                      <div className={`${styles.details} mt-2 mb-3`}>
                        {ele.address} {ele.city},{ele.state} - {ele.pincode}
                      </div>
                      <div className={`${styles.details}`}>
                        +91 {ele.mobile_number}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
