"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthOtpContext } from "@/components/authContext";
import homeStyles from "@/app/home.module.css";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { validationSchema } from "@/components/validation";
import { ToastContainer, toast } from "react-toastify";
import styles from "@/app/[city]/address/page.module.css";
const page = () => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData"))
      : null;

  const [address, setAddress] = useState([]);
  const [enableAddress, setEnableAddress] = useState(false);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    GetAddress();
  }, []);
  const GetAddress = async () => {
    try {
      if (user.user_id) {
        const addressResponse = await fetch(
          process.env.API_URL +
            `ShippingAddress/GetShippingAddressByUserId/${user.user_id}`
        );
        const addressData = await addressResponse.json();
        if (addressData) {
          console.log(addressData);
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
        toast("Your address has been saved", {
          autoClose: 3000,
          closeButton: true,
        });
        GetAddress();
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

  return (
    <>
      <div className={`container  ${styles.addressSection}`}>
        <div className={styles.addressSectionHeader}>
          <div className={`mb-4 ${styles.saveAddressSetion}`}>
            Saved Addresses
          </div>

          {enableAddress && (
            <i className={`fa-solid fa-arrow-right ${styles.arrowIcon}`} onClick={()=>setEnableAddress(!enableAddress)}></i>
          )}
        </div>

        {enableAddress && (
          <>
            <div className="card p-5">
              <div className={styles.checkoutQctShippingForm}>
                <div className="row">
                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.firstName}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
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
                        <div className="text-danger"> {errors.contact}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.address}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.pinCode}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.city}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6">
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
                        <div className="text-danger">{errors.state}</div>
                      )}
                    </div>
                  </div>
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
                    <div className="text-danger">{errors.country}</div>
                  )}
                </div>
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
                  className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
                  onClick={saveShippingAddress}
                >
                  {" "}
                  <span>ADD ADDRESS</span>
                </button>
              </div>
            </div>
          </>
        )}

        {!enableAddress && (
          <div className={`${styles.addressContainer}`}>
            {address &&
              address.length > 0 &&
              address.map((ele, index) => (
                <div className={`mb-3 p-4 ${styles.address}`} key={index}>
                  <div className={styles.addressImageContainer}>
                    <div className=""></div>
                    <div className="d-flex">
                      <div className="ml-4">
                        <img
                          alt="edit address"
                          src="https://bkmedia.bakingo.com/images/addressbook/edit.svg"
                        />
                      </div>
                      <div className="ml-4">
                        <img
                          alt="delete address"
                          src="https://bkmedia.bakingo.com/images/addressbook/delete.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div>{ele.first_name + " " + ele.last_name}</div>
                  <div className="mt-2 mb-3">{ele.email_address}</div>
                  <div className="mt-2 mb-3">
                    {ele.address} {ele.city},{ele.state} - {ele.pincode}
                  </div>
                  <div>+91 {ele.mobile_number}</div>
                </div>
              ))}
            <div>
              <button
                className="btn btn-primary"
                onClick={() => setEnableAddress(true)}
              >
                Add Address
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default page;
