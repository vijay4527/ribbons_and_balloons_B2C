"use client"
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import * as yup from "yup";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function Footer() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const router = useRouter();
  const  city  = "mumbai";
  const [status, setStatus] = useState(false);
  const saveNewsLetter = async () => {
    try {
      await validationSchema.validate({ email }, { abortEarly: false });
      var obj = {
        news_letter_id: "",
        email: email,
        city: city,
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
        setEmail("");
        setStatus(true);
        setErrors({ email: "You have subscribed" });
        setTimeout(() => {
          setErrors({});
        }, 3000);
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setStatus(false);
        setErrors(newErrors);
        setTimeout(() => {
            setErrors({});
        }, 3000);
      } else {
        console.error(validationError);
      }
    }
  };

  return (
    <>
      <div className="footerWap">
        <div className="footerbg">
          <Container>
            <div className="footerBody">
              <Row>
                <Col md={3}>
                  <div className="footerLogos">
                    <img
                      src="https://fama.b-cdn.net/RnB/Logo-Golden.png"
                      alt="No image found"
                    />
                  </div>
                  <div className="footerSocial">
                    <ul>
                      <li>
                        <Link href="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-linkedin"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-facebook"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-instagram"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="footerLinks">
                    <h2>Useful Links</h2>
                    <ul>
                      <li>
                        <Link href="/">Signature Cakes</Link>
                      </li>
                      <li>
                        <Link href="/">Ready Regulars</Link>
                      </li>
                      <li>
                        <Link href="/">Fancy Cakes</Link>
                      </li>
                      <li>
                        <Link href="/">Sinful Collections</Link>
                      </li>
                      <li>
                        <Link href="/">Photo Cakes</Link>
                      </li>
                      <li>
                        <Link href="/">Sensational Cakes</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="footerLinks">
                    <h2>Favourite</h2>
                    <ul>
                      <li>
                        <Link href="/">Get Franchise</Link>
                      </li>
                      <li>
                        <Link href="/">Store Location</Link>
                      </li>
                      <li>
                        <Link href="/">Privacy policy</Link>
                      </li>
                      <li>
                        <Link href="/">Disclaimer</Link>
                      </li>
                      <li>
                        <Link href="/">Delivery Policy</Link>
                      </li>
                      <li>
                        <Link href="/">Terms & Conditions </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="footerLinks">
                    <h2>Newsletter</h2>
                    <p>
                      Subscribe to get special offers, free gifts and
                      once-in-a-lifetime deals.
                    </p>
                    <div className="NewsletterInput">
                      <input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="material-icons" onClick={saveNewsLetter}>
                        email
                      </span>
                      {errors.email && (
                        <div
                          className={`${
                            status == true ? "text-success" : "text-danger"
                          }`}
                        >
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <Container>
            <div className="footerCopyRight">
              © 2023{" "}
              <a href="https://ribbonsandballoons.com/" target="_blank">
                ribbons & balloons
              </a>
              , All Rights Reserved
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
