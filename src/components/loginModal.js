"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useSession, signIn, signOut } from "next-auth/react";
import * as yup from "yup";
import { loginSchema } from "@/components/validation";
import { otpSchema } from "@/components/validation";
import homeStyles from "@/app/home.module.css";
import Head from "next/head";
import { AuthOtpContext } from "@/components/authContext";
// import Toast from "react-bootstrap/Toast";
// import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onRequestClose, closeLoginModal }) => {
  const { data: session } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [showloginInput, setShowLoginInput] = useState(true);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [loginError, setLoginError] = useState("");
  const inputs = ["input1", "input2", "input3", "input4"];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const cartId =
    typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const { isLogged, setIsLogged } = useContext(AuthOtpContext);
  const [userObject, setUserObject] = useState({});
  const [timer, setTimer] = useState(30);
  const apiUrl = process.env.API_URL;
  const mobileInputRef = useRef(null);
  const inputRefs = useRef([]);

  const user =
    typeof window !== "undefined" ? sessionStorage.getItem("userData") : "";
  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
      setTimeout(() => {
        if (mobileInputRef.current) {
          mobileInputRef.current.focus();
        }
      }, 0);
    }
  }, [isOpen]);
  useEffect(() => {
    if (user?.user_id) {
      setModalIsOpen(false);
    }
  }, [user]);

  const closeModal = () => {
    setShowLoginInput(true);
    setModalIsOpen(false);
    signOut();
    onRequestClose();
    closeLoginModal();
  };

  const submitHandler = async () => {
    try {
      var loginData = {
        mobile: mobile,
        fb_id:
          session && session.account.provider == "facebook"
            ? session.accessToken
            : "",
        cart_id: cartId ? cartId : "",
        g_id:
          session && session.account.provider == "google"
            ? session.accessToken
            : "",
        otp: "",
      };
      await loginSchema.validate({ mobile }, { abortEarly: false });
      const responseData = await fetch(apiUrl + "User/LoginCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const response = await responseData.json();
      if (response.resp === true) {
        sessionStorage.removeItem("userData");
        if (response.respObj.cart_id && !sessionStorage.getItem("cartId")) {
          Cookies.set("cartId", response.respObj.cart_id);
          sessionStorage.setItem("cartId", response.respObj.cart_id);
        }
        setLoginError("");
        setUserObject(response.respObj);
        setShowLoginInput(false);
        setShowOtpSection(true);
      } else {
        setLoginError(response.respMsg);
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setLoginError(validationError.message);
      } else {
        console.log(validationError);
      }
    }
  };

  useEffect(() => {
    inputs.forEach((id, index) => {
      const input = document.getElementById(id);
      if (input) {
        addListener(input, index);
      }
    });
  }, [showOtpSection]);

  function addListener(input, index) {
    input.addEventListener("keyup", function (event) {
      const code = parseInt(input.value);
      if (code >= 0 && code <= 9) {
        const nextIndex = index + 1;
        const nextInput = document.getElementById(inputs[nextIndex]);
        if (nextInput) nextInput.focus();
      } else {
        input.value = "";
      }
      const key = event.key;
      if (key === "Backspace" || key === "Delete") {
        const prevIndex = index - 1;
        const prevInput = document.getElementById(inputs[prevIndex]);
        if (prevInput) prevInput.focus();
      }
    });
  }

  // const [showA, setShowA] = useState(false);

  // const toggleShowA = () => setShowA(true);
  const verifyOTP = async () => {
    const otpValue = inputs
      .map((id) => document.getElementById(id).value)
      .join("");

    if (userObject) {
      try {
        await otpSchema.validate({ otp: otpValue }, { abortEarly: false });
        var loginData = {
          mobile: mobile,
          fb_id: "",
          cart_id: cartId ? cartId : "",
          g_id: session ? session?.user?.email : "",
          otp: otpValue,
          userId: userObject ? userObject?.user_id : "",
        };
        const responseData = await fetch(apiUrl + "OtpDetails/VerifyUserOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        const data = await responseData.json();
        if (data.resp == true) {
          setLoginError("");
          sessionStorage.setItem("userData", JSON.stringify(data.respObj));
          sessionStorage.setItem("isLoggedIn", "true");
          toast("You have logged in successfully", {
            autoClose: 3000,
            closeButton: true,
            onClose: () => {
              setIsLogged(true);
              setShowOtpSection(false);
              setModalIsOpen(false);
              // setShowA(false);
            },
          });
        } else if (data.resp == false) {
          setLoginError(data.respMsg);
        }
      } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
          const errorMessage = validationError.errors[0];
          setLoginError(errorMessage);
        } else {
          console.log(validationError);
        }
      }
    }
  };

  const googleLogin = async () => {
    signIn("google");
  };
  const handleOtpNotRecieved = async () => {
    setLoginError("");
    setShowOtpSection(false);
    setShowLoginInput(true);
    setTimer(30);
  };

  useEffect(() => {
    if (showOtpSection) {
      inputs.forEach((id, index) => {
        const input = document.getElementById(id);
        if (input) {
          addListener(input, index);
        }
      });
      let timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [showOtpSection]);

  const handleOtpKeyUp = (e, index) => {
    const code = parseInt(e.target.value);
    if (e.key == "Backspace" || e.key == "Delete") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (code >= 0 && code <= 9) {
      if (index < inputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } 
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move focus to the previous input if current is empty
    if (!value && index > 0) {
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 0);
    }
  };
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://apis.google.com/js/api:client.js"></script>
      </Head>
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
            {showloginInput && !user ? (
              <form className="p-4 m-4 login-form">
                <h1 className="loginTitle">
                  {session ? "Phone Number" : "Login / Sign Up"}
                </h1>
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
                    ref={mobileInputRef}
                  />
                </div>
                {loginError && (
                  <p className="" style={{ color: "red" }}>
                    {loginError}
                  </p>
                )}
                <button
                  type="button"
                  className="loginButtons"
                  onClick={() => submitHandler("login")}
                >
                  Proceed
                </button>
                {!session && (
                  <div className="text-center">
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
                  </div>
                )}
              </form>
            ) : (
              ""
            )}
            {showOtpSection && (
              <div className={`${homeStyles["form-group"]} text-center p-4 `}>
                <label className="mb-4 mt-5 otp-label">Verify Your OTP</label>
                <div className={`${homeStyles["otp-input"]} mb-4`}>
                  {inputs.map((id, index) => (
                    <input
                      className={`${homeStyles.input} otp-inputs`}
                      key={id}
                      id={id}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyUp={(e) => handleOtpKeyUp(e, index)}
                    />
                  ))}
                  {loginError && (
                    <p className="" style={{ color: "red" }}>
                      {loginError}
                    </p>
                  )}
                </div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={verifyOTP}
                  id="btnVerifyOtp"
                >
                  verify
                </button>
                {timer !== 0 && (
                  <p className="text-center mt-5 otp-p">
                    We've sent your code. Try again in {timer} seconds
                  </p>
                )}
                {timer === 0 && (
                  <p
                    className="text-center mt-3 otp-p"
                    onClick={handleOtpNotRecieved}
                    style={{ cursor: "pointer" }}
                  >
                    didn't received ? resend
                  </p>
                )}{" "}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* <Toast
        show={showA}
        onClose={() => {
          setIsLogged(true);
          setShowOtpSection(false);
          setModalIsOpen(false);
          setShowA(false);
        }}
        autohide
        delay={3000}
        position="top-end"
        progressbar="true"
        style={{ borderRadius: "4px" }}
      >
        <Toast.Body className="LoginToaster">
          You have logged In successfully!
          <button
            type="button"
            className="btn btn-sm btn-close"
            onClick={() => setShowA(false)}
          ></button>
        </Toast.Body>
      </Toast> */}
      <ToastContainer />
    </div>
  );
};

export default LoginModal;
