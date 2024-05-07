"use client";
import React from "react";
// import dynamic from "next/dynamic";
// import initAOS from "@/components/initAOS";
// import { useSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";

// Import Owl Carousel CSS
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";

// const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
//   ssr: false,
// });

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
const Testimonial = () => {
  // const [isMounted, setIsMounted] = useState(false);
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     initAOS();
  //     setIsMounted(true);
  //     const script1 = document.createElement("script");
  //     script1.src = "https://code.jquery.com/jquery-3.4.1.min.js";
  //     script1.async = true;
  //     script1.onload = () => {
  //       const script2 = document.createElement("script");
  //       script2.src =
  //         "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js";
  //       script2.async = true;
  //       document.body.appendChild(script2);
  //     };
  //     document.body.appendChild(script1);
  //   }
  // }, [session, isMounted]);
  return (
    <>
      {/* <Head>
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
      </Head> */}

      <div className="testimonialsWrap">
        <Container fluid className="testimonial-container">
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
            {/* {isMounted && (
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
            )} */}
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              // customTransition="all .5"
              transitionDuration={500}
              containerClass={`${styles.showCaseCarouselContainer}`}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType="desktop"
              dotListClass={`${styles.showCaseCarouselDotList}`}
              itemClass={`${styles.showCaseCarouselItem}`}
            >
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
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Testimonial;
