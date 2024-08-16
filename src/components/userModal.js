"use client";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const userModal = ({ isOpen, closeModal, city }) => {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userObject =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("userData"))
          : "";
      if (userObject) {
        setUserData(userObject);
      }
    };
    fetchUser();
  }, [userData?.user_id]);

  const updateSessionStorage = (updatedUser) => {
    localStorage.setItem("userData", JSON.stringify(updatedUser));
  };

  const notify = () =>
    toast(
      (t) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Welcome {name}.</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              closeModal();
              setName("");
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

  const updateUserProfile = async () => {
    try {
      const obj = {
        user_id: userData ? userData?.user_id : "",
        first_name: name,
        last_name: "",
        user_email: userData?.email,
        contact_details: "",
        city: city,
        state: "",
        address_1: "",
        address_2: "",
        pincode: "",
        country: "",
        is_active: true,
        created_on: "2024-07-16T06:37:58.325Z",
        created_by: "",
        updated_on: "2024-07-16T06:37:58.325Z",
        updated_by: "",
      };
      const updateProfile = await fetch(
        process.env.API_URL + "UserProfile/SaveUserProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const data = await updateProfile.json();
      if (data.resp == true) {
        const updatedUser = { ...userData, first_name: name, city: city };
        setUserData(updatedUser);
        updateSessionStorage(updatedUser);
        notify();
        // toast("Your Profile has been updated", {
        //   autoClose: 3000,
        //   closeButton: true,
        //   onClose: () => {

        //   },
        // });
        setTimeout(() => {
          closeModal();
          setName("");
        }, 3000);
      } else {
        toast(data.respMsg, {
          autoClose: 3000,
          closeButton: true,
          onClose: () => {
            closeModal();
            setName("");
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>userModal</div>
      <Modal
        id="enquiry-modal-dialog"
        show={isOpen}
        onHide={closeModal}
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
              <i className="fa-solid fa-x" onClick={closeModal}></i>
            </div>
            <div className="headerTitle headerTitle-Enquiry">
              <h2>One Last thing</h2>
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
                  <span className="subtitle">what do we call you ?</span>

                  <form className="p-4 m-4 login-form">
                    <div className="form_group mb-3">
                      <input
                        type="text"
                        className="form_control"
                        value={name}
                        placeholder="Your Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      className="loginButtons"
                      onClick={updateUserProfile}
                    >
                      Proceed
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
        <Toaster />
      </Modal>
    </>
  );
};

export default userModal;
