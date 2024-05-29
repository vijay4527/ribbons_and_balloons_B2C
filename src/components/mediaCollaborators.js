"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";
import { axiosPost } from "@/api";
import { useEffect, useState } from "react";
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
  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [fourthImage, setFourthImage] = useState("");

  useEffect(() => {
    const firstImage = data.find((item) => item.seq_no == "1");
    const secondImage = data.find((item) => item.seq_no == "2");
    const thirdImage = data.find((item) => item.seq_no == "3");
    const fourthImage = data.find((item) => item.seq_no == "4");

    if (firstImage) setFirstImage(firstImage);
    if (secondImage) setSecondImage(secondImage);
    if (thirdImage) setThirdImage(thirdImage);
    if (fourthImage) setFourthImage(fourthImage);
  }, [data, city]);

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
                <Link href={`/${firstImage.redirect_url}`}>
                  <img src={AppConfig.cdn+firstImage.img_url} alt="No image found" />

                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="MediaContentImg">
                <Link href={`/${secondImage.redirect_url}`}>
                  <img src={AppConfig.cdn+secondImage.img_url} alt="No image found" />
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="MediaContentImg">
                <Link href={`/${thirdImage.redirect_url}`}>
                  <img src={AppConfig.cdn+thirdImage.img_url} alt="No image found" />
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="MediaContentImg">
                <Link href={`/${fourthImage.redirect_url}`}>
                  <img src={AppConfig.cdn+fourthImage.img_url} alt="mediaImage" />
                  </Link>
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
