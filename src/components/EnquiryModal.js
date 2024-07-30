"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { enquirySchema } from "@/components/validation";
function EnquiryModal() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(null);
  const apiUrl = process.env.API_URL;

  const handleClose = () => {
    setEnquiryObj({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [enquiryObj, setEnquiryObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const saveNewsLetter = async () => {
    try {
      await enquirySchema.validate(enquiryObj, { abortEarly: false });
      var obj = {
        enquiry_id: "",
        first_name: enquiryObj.firstName,
        last_name: enquiryObj.lastName,
        email: enquiryObj.email,
        msg: enquiryObj.message,
        is_active: true,
        created_on: "0001-01-01",
        created_by: "",
        updated_on: "0001-01-01",
        updated_by: "",
        is_deleted: true,
      };
      const enquiryData = await fetch(
        apiUrl + "EnquiryMaster/SaveEnquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const enquiryResponse = await enquiryData.json()
      if (enquiryResponse) {
        toast("Your enquiry has been sent", {
          autoClose: 3000,
          closeButton: true,
          onClose: handleClose,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryObj({ ...enquiryObj, [name]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <>
      <div className="enquiry_btn" onClick={handleShow}>
        <span>Enquiry Now</span>
      </div>
      <Modal
        id="enquiry-modal-dialog"
        show={show}
        onHide={handleClose}
        centered
      >
        <div className="modal-flex-div">
          <div className="modal-img-div">
            <img
              src="https://img.freepik.com/free-photo/front-view-delicious-chocolate-cake-concept_23-2148769269.jpg?t=st=1713784946~exp=1713788546~hmac=08aa9294847931729fd314e2a57a262d0978f8b438dd42adf2313a6425085b42&w=360"
              className=""
              alt="modal image"
            />
          </div>
          <Modal.Body className="enquiryBody">
            <div className="enquiryCrossIcon">
              <i className="fa-solid fa-x" onClick={handleClose}></i>
            </div>
            <div className="headerTitle headerTitle-Enquiry">
              <h2>Enquiry Now</h2>
              <div className="testimonialUnderLine">
                <div className="testimonialUnder">
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
            </div>
            <div className="enquiryContent">
              <div className="enquiryForm">
                <div className="enquiryFormData">
                  <Form>
                    <Form.Group controlId="formfirstname">
                      <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        value={enquiryObj.firstName}
                        onChange={handleInputChange}
                        className={`${errors?.firstName ? "mb-3" : "mb-4"}`}
                      />
                      {errors?.firstName && (
                        <div className="text-danger">{errors.firstName}</div>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formlastname">
                      <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        value={enquiryObj.lastName}
                        name="lastName"
                        onChange={handleInputChange}
                        className={`${errors?.firstName ? "mb-3" : "mb-4"}`}
                      />
                      {errors?.lastName && (
                        <div className="text-danger">{errors.lastName}</div>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formemail">
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={enquiryObj.email}
                        name="email"
                        onChange={handleInputChange}
                        className={`${errors?.firstName ? "mb-3" : "mb-4"}`}
                      />
                      {errors?.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formmessage">
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Message"
                        style={{ height: "100%" }}
                        htmlFor="message on"
                        name="message"
                        value={enquiryObj.message}
                        onChange={handleInputChange}
                        className={`${errors?.firstName ? "mb-3" : "mb-4"}`}
                      />
                      {errors?.message && (
                        <div className="text-danger">{errors.message}</div>
                      )}
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={saveNewsLetter}
                    >
                      Submit
                    </Button>
                  </Form>

                  <div className="enquiryLinks">
                    <a href="tel:18002096323">
                      <img
                        src="https://fama.b-cdn.net/RnB/call.png"
                        alt="call image"
                        className="icon-image"
                      />
                      <span>18002096323</span>
                    </a>
                    <a href="mailto:info@ribbonsandballoons.com">
                      <img
                        src="https://fama.b-cdn.net/RnB/email.png"
                        alt="email image"
                        className="icon-image"
                      />
                      <span>info@ribbonsandballoons.com</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="enquiryContact">
                <ul>
                  <li>
                    <a href="tel:18002096323">
                      <span className="">
                        <img
                          src="https://fama.b-cdn.net/RnB/call.png"
                          alt="call image"
                          className="icon-image"
                        />
                      </span>
                      <h4>18002096323</h4>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@ribbonsandballoons.com">
                      <span className="">
                        <img
                          src="https://fama.b-cdn.net/RnB/email.png"
                          alt="email image"
                          className="icon-image"
                        />
                      </span>

                      <h4>info@ribbonsandballoons.com</h4>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span className="">
                        <img
                          src="https://fama.b-cdn.net/RnB/home.png"
                          alt="home image"
                          className="icon-image"
                        />
                      </span>
                      <h4>60+ Stores Pan India</h4>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Modal.Body>
        </div>
        <ToastContainer />
      </Modal>
    </>
  );
}

export default EnquiryModal;
