"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import initAOS from "@/components/initAOS";
import { useSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Head from "next/head";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Owl Carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

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
const Testimonial = () => {
 
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize AOS
      initAOS();
      setIsMounted(true);

      // Load jQuery and Bootstrap JavaScript
      const script1 = document.createElement("script");
      script1.src = "https://code.jquery.com/jquery-3.4.1.min.js";
      script1.async = true;
      script1.onload = () => {
        const script2 = document.createElement("script");
        script2.src =
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js";
        script2.async = true;
        document.body.appendChild(script2);
      };
      document.body.appendChild(script1);
    }
  }, [session, isMounted]);
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script
          src="https://code.jquery.com/jquery-3.3.1.js"
          integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
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

export default Testimonial;
