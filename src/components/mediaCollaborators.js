"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";

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

const MediaCollaborators = ({ city, data }) => {

  const mediaCollabWrap = {
    backgroundImage: "url(https://ribbons-and-balloons-b2c.vercel.app/)",
  };
  return (
    <div className="mediaCollabWrap" style={mediaCollabWrap}>
      <Container fluid>
        <div className="testimonialsBody">
          <div className="headerTitle">
            <h2 style={{fontFamily:"revicons"}}>MEDIA COLLABORATIONS</h2>
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
            {data && data.length > 0 && data.map((e,i) => (
              <Link href={`${e.redirect_url}`} key={i}>
                <div className="item" key={e.banner_id}>
                  <div className="itemNewLunch" >
                    <div className="itemNewLunchImg" >
                      <img
                        src={AppConfig.cdn + e.img_url}
                        alt="No image found"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default MediaCollaborators;
