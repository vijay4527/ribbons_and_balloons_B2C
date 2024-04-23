"use client"
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { axiosGet, axiosPost, axiosGetAll } from "@/api";

function EnquiryModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveNewsLetter = async () => {
    try {
      var obj = {
        news_letter_id: "",
        email: email,
        is_active: true,
        created_on: "0001-01-01",
        created_by: "",
        updated_on: "0001-01-01",
        updated_by: "",
        is_deleted: true,
      };
      const newsLetterResponse = await axiosPost(
        "NewsLetter/SaveNewsLetter",
        obj
      );

      if (newsLetterResponse) {
        alert("News letter saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='enquiry_btn' onClick={handleShow}>
        Enquiry Now
      </div>
      {/*  size="lg" */}
      <Modal id='enquiry-modal-dialog' show={show} onHide={handleClose} centered>
        <div className='modal-flex-div'>
          <div className='modal-img-div'>
            <img src='https://img.freepik.com/free-photo/front-view-delicious-chocolate-cake-concept_23-2148769269.jpg?t=st=1713784946~exp=1713788546~hmac=08aa9294847931729fd314e2a57a262d0978f8b438dd42adf2313a6425085b42&w=360' className=''></img>
          </div>
          <Modal.Body className="enquiryBody">
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
                        placeholder="Enter firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                    
                    <Form.Group controlId="formlastname">
                      <Form.Control
                        type="text"
                        placeholder="Enter lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formemail">
                      <Form.Control
                        type="email"
                        placeholder="Enter emai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formmessage">
                      <Form.Control
                        as="textarea"
                        placeholder="Enter message"
                        style={{ height: "100px" }}
                        htmlFor="message on"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={saveNewsLetter}
                    >
                      Submit
                    </Button>
                  </Form>

                  <div className='enquiryLinks'>
                    <a>
                      <img
                        src="https://fama.b-cdn.net/RnB/call.png"
                        alt=""
                        className="icon-image"
                      />
                      <span>1234567890</span>
                    </a>
                    <a>
                      <img
                        src="https://fama.b-cdn.net/RnB/email.png"
                        alt=""
                        className="icon-image"
                      />
                      <span>abc@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="enquiryContact">
                <ul>
                  <li>
                    <a href="/">
                      <span className="">
                        <img
                          src="https://fama.b-cdn.net/RnB/call.png"
                          alt=""
                          className="icon-image"
                        />
                      </span>
                      <h4>1234567890</h4>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="">
                        <img
                          src="https://fama.b-cdn.net/RnB/email.png"
                          alt=""
                          className="icon-image"
                        />
                      </span>

                      <h4>abc@gmail.com</h4>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="">
                        <img
                          src="https://fama.b-cdn.net/RnB/home.png"
                          alt=""
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
      </Modal>
    </>
  );
}

export default EnquiryModal;