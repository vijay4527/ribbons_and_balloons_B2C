"use client";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { axiosGet, axiosGetAll, axiosPost } from "@/api";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthOtpContext } from "@/components/authContext";
import { profileSchema } from "@/components/validation";
import Cookies from "js-cookie";
import * as yup from "yup";

const page = () => {
  const router = useRouter();
  const { isLogged } = useContext(AuthOtpContext);
  const { data } = useSession();
  const [errors, setErrors] = useState({});
  const city = Cookies.get("city");

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

      const data = await axiosPost("UserProfile/SaveUserProfile", obj);
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
      <div className="container profile-container">
        <div className="m-4 form-wrap">
          <div className="row">
            <div className="col-lg-6">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
                value={formValues.lastName}
                onChange={handleInputChange}
                name="lastName"
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
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
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={true}
                name="contact"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <label>Address 1</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                name="address2"
              />
              {/* {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )} */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>Pin Code</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
                value={formValues.city}
                onChange={handleInputChange}
                name="city"
              />
              {errors.city && <div className="text-danger">{errors.city}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>State</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
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
      <ToastContainer />
    </>
  );
};

export default page;
