"use client";
import React from "react";
import Modal from "react-bootstrap/Modal";

const userModal = (modalIsOpen,closeModal) => {
  return (
    <>
      <div>userModal</div>

      <Modal
        id="login-modal-dialog"
        show={modalIsOpen}
        onHide={closeModal}
        className={homeStyles["loginModal"]}
        centered
      >
        <div className="login-modal-flex">
          <div className="login-modal-img-div">
            <img
              src="https://img.freepik.com/free-photo/front-view-cake-with-slice-cut-out_23-2148485343.jpg?t=st=1713786533~exp=1713790133~hmac=79ef04caa8f89924e1ae13d93f572083f1c1d58d1da15c1bc857d64dc0a5d211&w=360"
              alt="login modal image"
            ></img>
          </div>
          <div className="container login-container container-fluid">
            <form className="p-4 m-4 login-form">
              <h1 className="loginTitle">One Last thing</h1>
              <span>what do we call you?</span>
              <div className="testimonialUnderLine">
                <div className="testimonialUnder">
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
              <div className="form_group mb-3">
                <input
                  type="text"
                  className="form_control"
                  value={mobile}
                  placeholder="Phone No"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              {/* {loginError && (
                  <p className="" style={{ color: "red" }}>
                    {loginError}
                  </p>
                )} */}
              <button
                type="button"
                className="loginButtons"
                onClick={() => submitHandler("login")}
              >
                Proceed
              </button>

              {/* <div className="text-center">
                <p>Or Sign In with</p>
                <div className="socialLogin">
                  <button
                    type="button"
                    className="btn googleLogin"
                    id="btnGoogle"
                    onClick={googleLogin}
                  >
                    <i className="fab fa-google"></i>
                  </button>
                  <button
                    type="button"
                    className="btn facebookLogin"
                    onClick={() => signIn("facebook")}
                  >
                    <i className="fab fa-facebook"></i>
                  </button>
                </div>
              </div> */}
            </form>
            )
          </div>
        </div>
      </Modal>
    </>
  );
};

export default userModal;
