"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import initAOS from "@/components/initAOS";
import Head from "next/head";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Prociono } from "next/font/google";
const optionsMedia = {
  items: 5,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: true,
  dots: false,
  navText: [
    '<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
    '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
  ],
};
const mediaCollaborators = () => {
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
      <div className="mediaCollabWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className="headerTitle">
              <h2>MEDIA COLLABORATIONS</h2>
              <div className="testimonialUnderLine">
                <div className="testimonialUnder">
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
            </div>
            {isMounted && (
              <OwlCarousel className="owl-theme" {...optionsMedia}>
                <div className="item">
                  <div className="MediaContentImg">
                    <img
                      src="https://fama.b-cdn.net/RnB/media2.png"
                      alt="No image found"
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="MediaContentImg">
                    <img
                      src="https://fama.b-cdn.net/RnB/media1.png"
                      alt="No image found"
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="MediaContentImg">
                    <img
                      src="https://fama.b-cdn.net/RnB/media3.png"
                      alt="No image found"
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="MediaContentImg">
                    <img
                      src="https://fama.b-cdn.net/RnB/media4.png"
                      alt="mediaImage"
                    />
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

export default mediaCollaborators;
