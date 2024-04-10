"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import initAOS from "@/components/initAOS";
import { useSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Head from "next/head";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const optionsNewLunched = {
  items: 4,
  loop: true,
  margin: 10,
  autoplay: false,
  nav: false,
  dots: false,
  navText: [
    '<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
    '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
  ],
};

const newLaunched = () => {
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
      <div className="newLaunchWrap">
        <div className="lte-background-overlay"></div>
        <Container fluid>
          <div className="headerTitle">
            <h2>New Launches</h2>
            <div className="testimonialUnderLine">
              <div className="testimonialUnder">
                <div className="underLine"></div>
                <div className="shapLine"></div>
              </div>
            </div>
            {isMounted && (
              <OwlCarousel className="owl-theme" {...optionsNewLunched}>
                <div className="item">
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img
                        src="https://fama.b-cdn.net/RnB/Ln1.jpg"
                        alt="No image found"
                      />
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img
                        src="https://fama.b-cdn.net/RnB/Ln2.jpg"
                        alt="No image found"
                      />
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img
                        src="https://fama.b-cdn.net/RnB/Ln3.jpg"
                        alt="No image found"
                      />
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img
                        src="https://fama.b-cdn.net/RnB/Ln4.jpg"
                        alt="No image found"
                      />
                    </div>
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

export default newLaunched;
