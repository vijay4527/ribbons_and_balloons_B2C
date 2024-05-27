"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";
import { axiosPost } from "@/api";
import { useEffect,useState} from "react";
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
const MediaCollaborators = ({city,data}) => {
  useEffect(()=>{
  },[city])

  return (
    <>
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
