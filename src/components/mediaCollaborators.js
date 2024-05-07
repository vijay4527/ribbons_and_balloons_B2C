"use client";
import React from "react";
// import dynamic from "next/dynamic";
// import initAOS from "@/components/initAOS";
// import { useSession } from "next-auth/react";
import Container from "react-bootstrap/Container";
// import Head from "next/head";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
//   ssr: false,
// });
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
const MediaCollaborators = () => {
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
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </Head> */}
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
            {/* {isMounted && (
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
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MediaCollaborators;
