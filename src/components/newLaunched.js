"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import initAOS from "@/components/initAOS";
import { useSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.min.css";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
//   ssr: false,
// });

// const optionsNewLunched = {
//   items: 4,
//   loop: true,
//   margin: 10,
//   autoplay: false,
//   nav: false,
//   dots: false,
//   navText: [
//     '<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
//     '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
//   ],
// };

const NewLaunched = () => {
  // const [isMounted, setIsMounted] = useState(false);
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     initAOS();
  //     const jqueryScript = document.createElement("script");
  //     jqueryScript.src = "https://code.jquery.com/jquery-3.4.1.min.js";
  //     jqueryScript.async = true;
  //     jqueryScript.onload = () => {
  //       const bootstrapScript = document.createElement("script");
  //       bootstrapScript.src =
  //         "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js";
  //       bootstrapScript.async = true;
  //       document.body.appendChild(bootstrapScript);
  //     };
  //     document.body.appendChild(jqueryScript);

  //     setIsMounted(true);
  //   }
  // }, [session, isMounted]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
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
            {/* {isMounted && (
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
            )} */}
            <Carousel centerMode={true} centerSlidePercentage={25} thumbWidth={130}>
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
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NewLaunched;