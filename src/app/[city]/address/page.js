"use client";
import React, { useState, useEffect } from "react";
import homeStyles from "@/app/home.module.css";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { validationSchema } from "@/components/validation";
import { ToastContainer, toast } from "react-toastify";
import styles from "@/app/[city]/address/page.module.css";
import Swal from "sweetalert2";
import TabComponent from "@/components/tab"
const page = ({ params }) => {
  const [address, setAddress] = useState([]);
  const [enableAddress, setEnableAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [shippingAddressId, setShippingAddressId] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
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
    try {
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
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
          await Swal.fire({
            title: "Deleted!",
            text: "Your address has been deleted.",
            icon: "success",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        toast("Your address has been saved", {
          autoClose: 3000,
          closeButton: true,
        });
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
      console.log("id : ", id);
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

      {/* <div className={`container  ${styles.addressSection}`}>
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6 p-4">
            <div className={styles.addressSectionHeader}>
              <div className={`mb-4 ${styles.saveAddressSetion}`}>
                Saved Addresses
              </div>

              {enableAddress && (
                <i
                  className={`fa-solid fa-arrow-right ${styles.arrowIcon}`}
                  onClick={() => setEnableAddress(!enableAddress)}
                ></i>
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
                            <div className="text-danger">
                              {errors.firstName}
                            </div>
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
        </div>
      </div> */}

      <ToastContainer />
      <div className={`container ${styles.addressPage}`}>
       <TabComponent url={"address"} city={params.city}/>
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
                  className={`${homeStyles["btn"]} ${homeStyles["btn-primary"]}`}
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
              <h4 className={`${styles.addressTitle} mb-4`}>Saved Address</h4>
              <div className={`${styles.savedAddress}`}>
                {address &&
                  address.length > 0 &&
                  address.map((ele, index) => (
                    <div className={`mb-3 p-4 ${styles.address}`} key={index}>
                      <div className={styles.addressImageContainer}>
                        <div></div>
                        <div className="d-flex justify-content-space-between">
                          <div className="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g data-name="Group 5772"><path fill="none" d="M0 0h24v24H0z" data-name="Rectangle 1323" /><g data-name="edit (4)"><g data-name="Group 5770"><path fill="#c19f5f" d="M19.739 6.646 17.17 4.077a1.55 1.55 0 0 0-2.19 0L4.896 14.161a.55.55 0 0 0-.146.259l-1.295 5.272a.553.553 0 0 0 .669.669l5.272-1.295a.55.55 0 0 0 .259-.146L19.739 8.836a1.55 1.55 0 0 0 0-2.19M4.746 19.07l.053-.215.162.162zm1.47-.361L5.107 17.6l.482-1.964 2.59 2.59zm3.048-.961-3.2-3.2 8.253-8.253 3.2 3.2zm9.693-9.693-.638.638-3.2-3.2.638-.638a.443.443 0 0 1 .627 0l2.573 2.568a.443.443 0 0 1 0 .632" data-name="Path 27163" /></g></g></g></svg>
                          </div>
                          <div className="ml-4">
                            <img
                              alt="delete address"
                              src="https://bkmedia.bakingo.com/images/addressbook/delete.svg"
                              className={styles.btnDelete}
                              onClick={() =>
                                deleteAddress(ele.shipping_address_id)
                              }
                            />
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
          <div className="mt-4">
            <button
              className="btn btn-primary p-2"
              onClick={() => setEnableAddress(true)}
            >
              Add Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
