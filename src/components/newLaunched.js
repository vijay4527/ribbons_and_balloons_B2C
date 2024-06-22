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
const Testimonial = ({ city, data }) => {
  return (
    <>
      <div className="testimonialsWrap">
        <Container fluid className="testimonial-container">
          <div className="testimonialsBody">
            <div className="headerTitle">
              <p className=""> you said about us </p>
              <h2>New Launches</h2>
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
            >
              {data &&
                data.length > 0 &&
                data.map((e, i) => (
                  <Link href={`${e?.redirect_url}`} key={i}>
                    <div className="item">
                      <div className="itemNewLunch">
                        <div className="itemNewLunchImg">
                          <img
                            src={AppConfig.cdn + e?.img_url}
                            alt="No image found"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

              {/* <div className="item">
                <Link href={`/${secondImage.redirect_url}`}>
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img src={AppConfig.cdn+secondImage.img_url} alt="No image found" />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="item">
                <Link href={`/${thirdImage.redirect_url}`}>
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img src={AppConfig.cdn+thirdImage.img_url} alt="No image found" />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="item">
                <Link href={`/${fourthImage.redirect_url}`}>
                  <div className="itemNewLunch">
                    <div className="itemNewLunchImg">
                      <img src={AppConfig.cdn+fourthImage.img_url} alt="No image found" />
                    </div>
                  </div>
                </Link>
              </div> */}
            </Carousel>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Testimonial;
