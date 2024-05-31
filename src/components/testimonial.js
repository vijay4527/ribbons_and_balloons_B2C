"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";

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

  return (
    <>

      <div className="testimonialsWrap">
        <Container fluid className="testimonial-container">
          <div className="testimonialsBody">
            <div className="headerTitle">
              <p className=""> you said about us </p>
              <h2 style={{fontFamily:"revicons"}}>Testimonials</h2>
              <div className="testimonialUnderLine">
                <div className="testimonialUnder">
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
            </div>
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
