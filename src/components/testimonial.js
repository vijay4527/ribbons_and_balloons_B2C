"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic";
import initAOS from "@/components/initAOS";
import { useSession } from "next-auth/react";
import Head from "next/head";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const options = {
  items: 1,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: true,
  dots: true,
  navText: [
    '<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
    '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
  ],
};
const testimonial = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (typeof window !== "undefined") {
      initAOS();
      setIsMounted(true);
    }
  }, [session, isMounted]);
  return (
    <>
      <Head>
        {" "}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </Head>
      <div className="testimonialsWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className="headerTitle">
              <p className=""> you said about us </p>
              <h2>Testimonials</h2>
              <div className="testimonialUnderLine">
                <div className="testimonialUnder">
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
            </div>
            {isMounted && (
              <OwlCarousel className="owl-theme" {...options}>
                <div className="item">
                  <div className="headerTitle">
                    <h6>
                      An vis civibus albucius. Eu mea augue menandri consequat,
                      his graeco discere consequat ei. An autem nostrum
                      signiferumque mea, id ullum antiopam qui. Has eu timeam
                      utroque dissentiunt, eos te iriure verterem suis san.
                    </h6>
                    <h5>Roland Brown</h5>
                    <div>Chef</div>
                  </div>
                </div>
                <div className="item">
                  <div className="headerTitle">
                    <h6>
                      An vis civibus albucius. Eu mea augue menandri consequat,
                      his graeco discere consequat ei. An autem nostrum
                      signiferumque mea, id ullum antiopam qui. Has eu timeam
                      utroque dissentiunt, eos te iriure verterem suis san.
                    </h6>
                    <h5>Roland Brown</h5>
                    <div>Chef</div>
                  </div>
                </div>
                <div className="item">
                  <div className="headerTitle">
                    <h6>
                      An vis civibus albucius. Eu mea augue menandri consequat,
                      his graeco discere consequat ei. An autem nostrum
                      signiferumque mea, id ullum antiopam qui. Has eu timeam
                      utroque dissentiunt, eos te iriure verterem suis san.
                    </h6>
                    <h5>Roland Brown</h5>
                    <div>Chef</div>
                  </div>
                </div>
              </OwlCarousel>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default testimonial;
