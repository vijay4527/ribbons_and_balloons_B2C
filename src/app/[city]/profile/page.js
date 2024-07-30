"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileSchema } from "@/components/validation";
import Cookies from "js-cookie";
import * as yup from "yup";
import TabComponent from "@/components/tab";
import styles from "@/app/[city]/address/page.module.css";
const page = () => {
  const [errors, setErrors] = useState({});
  const city = Cookies.get("city");
  const apiUrl = process.env.API_URL;

  const [userCity, setUserCity] = useState(city);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: userCity,
    state: "",
    pinCode: "",
    country: "",
  });
  const [user, setUser] = useState({});
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [contact, setContact] = useState("");
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const userObject =
        typeof window !== "undefined"
          ? JSON.parse(sessionStorage.getItem("userData"))
          : "";
      if (userObject) {
        setUser(userObject);
        setContact(userObject.mobile_number);
      }
    };
    fetchUser();
    if (city) {
      setUserCity(city);
    }
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [user?.user_id]);
  const getUserProfile = async () => {
    if (user.user_id) {
      try {
        const data = await fetch(
          process.env.API_URL + "UserProfile/GetUserProfileById/" + user.user_id
        );
        if (data) {
          const userData = await data.json();
          if (userData.length > 0) {
            setProfileData(userData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const saveUserProfile = async () => {
    try {
      await profileSchema.validate(formValues, { abortEarly: false });
      var obj = {
        user_id: user ? user.user_id : "",
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        user_email: formValues.email,
        contact_details: contact,
        city: userCity ? userCity : formValues.city,
        state: formValues.state,
        address_1: address1,
        address_2: address2,
        pincode: formValues.pinCode,
        country: formValues.country,
        is_active: true,
        created_on: "2024-04-25T07:03:52.248Z",
        created_by: "",
        updated_on: "2024-04-25T07:03:52.248Z",
        updated_by: "",
      };

      const respData = await fetch(apiUrl + "UserProfile/SaveUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data = await respData.json();
      if (data.resp == true) {
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          state: "",
          pinCode: "",
          country: "",
        });
        toast("Your Profile has been updated", {
          autoClose: 3000,
          closeButton: true,
        });
      } else {
        toast.error(data.respMsg, {
          autoClose: 3000,
          closeButton: true,
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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div>
      <ToastContainer />
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
      <div className={`container ${styles.addressPage}`}>
        <TabComponent url={"profile"} city={userCity} />
        <div className={`form-wrap ${styles.profileForm}`}>
          <div className={`row ${!hasErrors ? "mt-2" : ""}`}>
            <div className="col-lg-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control profileInput"
                value={formValues.firstName}
                onChange={handleInputChange}
                name="firstName"
              />
              {errors.lastName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control profileInput"
                value={formValues.lastName}
                onChange={handleInputChange}
                name="lastName"
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
          </div>
          <div className={`row ${!hasErrors ? "mt-2" : ""}`}>
            <div className="col-lg-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control profileInput"
                value={formValues.email}
                onChange={handleInputChange}
                name="email"
              />
              {errors.lastName && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Contact</label>
              <input
                type="text"
                className="form-control profileInput"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={true}
                name="contact"
              />
            </div>
          </div>

          <div className={`row ${!hasErrors ? "mt-2" : ""}`}>
            <div className="col-lg-6">
              <label>Address 1</label>
              <input
                type="text"
                className="form-control profileInput"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                name="address1"
              />
              {/* {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )} */}
            </div>
            <div className="col-lg-6">
              <label>Address 2</label>
              <input
                type="text"
                className="form-control profileInput"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                name="address2"
              />
              {/* {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )} */}
            </div>
          </div>
          <div className={`row ${!hasErrors ? "mt-2" : ""}`}>
            <div className="col-lg-6">
              <label>Pin Code</label>
              <input
                type="text"
                className="form-control profileInput"
                value={formValues.pinCode}
                onChange={handleInputChange}
                name="pinCode"
              />
              {errors.pinCode && (
                <div className="text-danger">{errors.pinCode}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>City</label>
              <input
                type="text"
                className="form-control profileInput"
                value={formValues.city}
                onChange={handleInputChange}
                name="city"
              />
              {errors.city && <div className="text-danger">{errors.city}</div>}
            </div>
          </div>
          <div className={`row ${!hasErrors ? "mt-2" : ""}`}>
            <div className="col-lg-6">
              <label>State</label>
              <input
                type="text"
                className="form-control profileInput"
                value={formValues.state}
                onChange={handleInputChange}
                name="state"
              />
              {errors.state && (
                <div className="text-danger">{errors.state}</div>
              )}
            </div>
            <div className="col-lg-6">
              <label>Country</label>
              <input
                type="text"
                className="form-control profileInput"
                value={formValues.country}
                onChange={handleInputChange}
                name="country"
              />
              {errors.country && (
                <div className="text-danger">{errors.country}</div>
              )}
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={saveUserProfile}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
