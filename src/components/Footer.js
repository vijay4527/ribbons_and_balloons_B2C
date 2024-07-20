"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import * as yup from "yup";
import { usePathname } from "next/navigation";
import { newsLetterSchema } from "./validation";
import Image from "next/image";

import Cookies from "js-cookie";
export default function Footer() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const router = usePathname();
  const cityname = router.split("/")[1];
  const cookieCity = Cookies.get("city");
  const city =
    cityname == "paymentfailed" || cityname == "paymentfailed"
      ? cookieCity
      : cityname;
  const [status, setStatus] = useState(false);
  const apiUrl = process.env.API_URL;
  const saveNewsLetter = async () => {
    try {
      await newsLetterSchema.validate({ email }, { abortEarly: false });
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
      const newsLetterData = await fetch(apiUrl + "NewsLetter/SaveNewsLetter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const newsLetterResponse = await newsLetterData.json();
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

  useEffect(() => {
    GetAllCategories();
  }, [city]);

  const GetAllCategories = async () => {
    try {
      const responseData = await fetch(
        process.env.API_URL + "Category/GetAllCategories",
        { next: { revalidate: 180 } }
      );

      const data = await responseData.json();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
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
                    <Image
                      src="https://fama.b-cdn.net/RnB/ykfl.webp"
                      alt="No image found"
                      height={120}
                      width={205}
                    />
                    <Image
                      src="https://fama.b-cdn.net/RnB/Logo-Golden.webp"
                      alt="No image found"
                      height={120}
                      width={205}
                    />
                  </div>
                  <div className="footerSocial">
                    <ul>
                      <li>
                        <Link href="/" aria-label="Footer Links">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-linkedin"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                          </svg> */}
                          <Image
                            src="https://fama.b-cdn.net/RnB/linkdin.webp"
                            height={60}
                            width={60}
                            alt="linkdinLogo"
                          ></Image>
                        </Link>
                      </li>
                      <li>
                        <Link href="/" aria-label="Footer Links">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-facebook"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                          </svg> */}
                          <Image
                            src="https://fama.b-cdn.net/RnB/facebook.webp"
                            height={60}
                            width={60}
                            alt="facebookLogo"
                          ></Image>
                        </Link>
                      </li>
                      <li>
                        <Link href="/" aria-label="Footer Links">
                          
                          <Image
                            src="https://fama.b-cdn.net/RnB/instagram.webp"
                            height={60}
                            width={60}
                            alt="instaLogo"
                          ></Image>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="footerLinks">
                    <h2>Useful Links</h2>
                    <ul>
                     
                      {categories &&
                        categories.length > 0 &&
                        categories.slice(0, 8).map((ele, index) => (
                          <li key={index}>
                            <Link
                              href={`/${city}/l/${ele.category_name.replaceAll(
                                " ",
                                "-"
                              )}`}
                              aria-label="Photo Cakes"
                            >
                              {ele.category_name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="footerLinks">
                    <h2>Favourite</h2>
                    <ul>
                      <li>
                        <Link href={`/${city}`} prefetch={true}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${city}/about-us`} prefetch={true}>
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${city}`} aria-label="Get Franchise">
                          Get Franchise
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${city}`} aria-label="Store Location">
                          Store Location
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${city}/privacy-and-policy`}
                          aria-label="Privacy policy"
                        >
                          Privacy policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${city}/desclaimer`}
                          aria-label="Desclaimer"
                        >
                          Disclaimer
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${city}/delivery-policy`}
                          aria-label="Delivery Policy"
                        >
                          Delivery Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${city}/terms-and-condition`}
                          aria-label="Terms and Condition"
                        >
                          Terms & Conditions{" "}
                        </Link>
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
