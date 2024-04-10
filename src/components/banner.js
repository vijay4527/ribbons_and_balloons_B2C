"use client";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const banner = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollPosition(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="banner-wrap">
        <Container fluid>
          <div className="banner-body">
            <div className="banner-sec1">
              <div
                className="banner-img banner-img1"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 1}px)` }}
              >
                <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-7.jpg"
                  alt="No image found"
                />
              </div>
              <div
                className="banner-img banner-img2"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 1}px)` }}
              >
                <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-1-729x1024.png"
                  alt="No image found"
                />
              </div>
            </div>
            <div className="banner-sec1 banner-sec-center">
              <div
                className="banner-img banner-img-center"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}
              >
                <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-8.jpg"
                  alt="No image found"
                />
              </div>
            </div>
            <div className="banner-sec1">
              <div
                className="banner-img banner-img3"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 1}px)` }}
              >
                <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-10.jpg"
                  alt="No image found"
                />
              </div>
              <div
                className="banner-img banner-img4"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 1}px)` }}
              >
                <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-9.jpg"
                  alt="No image found"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default banner;
