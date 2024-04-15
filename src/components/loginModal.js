"use client"
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { axiosPost } from "@/api";
import * as yup from "yup";
import { loginSchema } from "./validation";
import homeStyles from "@/app/home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
const LoginModal = ({ isOpen, onRequestClose, closeLoginModal,}) => {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [showloginInput, setShowLoginInput] = useState(true);
  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const length = otp.length;
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [newOtp, setnewOtp] = useState("");
  const [loginError, setLoginError] = useState("");
  const inputs = ["input1", "input2", "input3", "input4"];
  const cartId =typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const router = useRouter();
  const currentPath = router.asPath;
  const { city } = "mumbai";
  const [hitApi, setHitApi] = useState(false);
  // const { otpVerified } = useUserData(hitApi);
  const [userObject, setUserObject] = useState({});
  const user = typeof window !== "undefined" ? sessionStorage.getItem("userData") : ""

  
  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
    }
  }, [isOpen]);
  useEffect(()=>{
     if(user?.user_id){
      setModalIsOpen(false);
     }
  },[user])

  const closeModal = () => {   
    setModalIsOpen(false);
    signOut()
    onRequestClose();
    closeLoginModal();
  };

  const submitHandler = async (type) => {

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
      const response = await axiosPost("/User/LoginCheck", loginData);
      if (response.resp === true) {
        sessionStorage.removeItem("userData");
        console.log("API Response:", response);
        setLoginError("")
        setUserObject(response.respObj);
        setShowLoginInput(false);
        setShowOtpSection(true);        
        // router.push(currentPath);
      } else {
        setLoginError(response.respMsg);
        // router.push("/")
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setLoginError(validationError.message);
      } else {
        console.log(validationError);
      }
    }
  };

  const handleOTPChange = (e, index) => {
    const inputs = document.querySelectorAll("input"),
      button = document.getElementById("btnVerifyOtp");
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        const currentInput = input,
          nextInput = input.nextElementSibling,
          prevInput = input.previousElementSibling;
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        if (
          nextInput &&
          nextInput.hasAttribute("disabled") &&
          currentInput.value !== ""
        ) {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }
        if (e.key === "Backspace") {
          inputs.forEach((input, index2) => {
            if (index1 <= index2 && prevInput) {
              input.removeAttribute("disabled");
              input.value = "";
              prevInput.focus();
            }
          });
        }
        if (!inputs[4].disabled && inputs[4].value !== "") {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    });
    window.addEventListener("load", () => inputs[0].focus());
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);
    const valuesArray = newOTP.toString();
    const Array = valuesArray.split(",").filter((value) => value !== "");
    if (Array.length == length) {
      const combinedString = Array.join("");
      setnewOtp(combinedString);
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
        // setErrors({otp:""})
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

  const verifyOTP = async () => {
    const otpValue = inputs
      .map((id) => document.getElementById(id).value)
      .join("");

    if (userObject) {
      console.log(userObject)
      try{
       
      var loginData = {
        mobile: mobile,
        fb_id: "",
        cart_id: cartId ? cartId : "",
        g_id: session ? session?.user?.email : "",
        otp: otpValue,
        userId:userObject ? userObject?.user_id :  ''
      };
        const data = await axiosPost("OtpDetails/VerifyUserOtp", loginData);
        if (data.resp == true) {
          sessionStorage.setItem("userData", JSON.stringify(data.respObj));
          sessionStorage.setItem("isLoggedIn", "true");
          setHitApi(true)
          toast("You have logged in successfully", {
            autoClose: 3000,
            closeButton: true,
          });
          setShowOtpSection(false);
          setModalIsOpen(false);
        }
        else if(data.resp== false){
          setLoginError(data.respMsg)
        }
      }
      catch(error){
        setLoginError(error)
      }  
    }
  };

  const googleLogin = async () => {
    setHitApi(true);
    signIn("google");
  };
  const handleOTpNotRecieved = async () => {
    setShowOtpSection(false);
    setShowLoginInput(true);
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
        show={modalIsOpen}
        onHide={closeModal}
        className={homeStyles["loginModal"]}
        centered
      >
        <div className="container container-fluid">
          {showloginInput && !user ? (
            <form className="p-4 m-4">
              <h1 className="loginTitle">
                {session ? "Phone Number" : "Login / Sign Up"}
              </h1>
              <div className="form_group mb-3">
                <input
                  type="text"
                  className="form_control"
                  value={mobile}
                  placeholder="Phone No"
                  onChange={(e) => setMobile(e.target.value)}
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
                      <i className="fa fa-google"></i>
                    </button>
                    <button
                      type="button"
                      className="btn facebookLogin"
                      onClick={() => signIn("facebook")}
                    >
                      <i className="fa fa-facebook"></i>
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
              <label className="mb-4 mt-5">Verify Your OTP</label>
              <div className={`${homeStyles["otp-input"]} mb-4`}>
                {inputs.map((id) => (
                  <input
                    className={`${homeStyles.input} `}
                    key={id}
                    id={id}
                    type="text"
                    maxLength="1"
                  />
                ))}
                
              {loginError && (
                <p className="mt-3" style={{ color: "red" }}>
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
              <p
                onClick={handleOTpNotRecieved}
                className="text-center mt-5"
                style={{ cursor: "pointer" }}
              >
                Didnt Recieved Otp ? Click here to check Mobile Number{" "}
              </p>
            </div>
          )}
        </div>
      </Modal>
      <ToastContainer />

    </div>
  );
};

export default LoginModal;
