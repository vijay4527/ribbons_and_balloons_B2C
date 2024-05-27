"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "@/app/[city]/l/[category]/page.module.css";
import { useState,useEffect } from "react";
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
const Testimonial = ({city,data}) => {

  const [newLaunchedData,seNewLaunchedData] = useState(data)
  const [firstImage,setFirstImage] = useState('')
  const [secondImage,setSecondImage] = useState('')
  const [thirdImage,setThirdImage] = useState('')
 


  useEffect(() => {
    const firstImage = data.find(item => item.seq_no === '1');
    const secondImage = data.find(item => item.seq_no === '2');
    const thirdImage = data.find(item => item.seq_no === '3');
  
    if (firstImage) setFirstImage(firstImage.img_url);
    if (secondImage) setSecondImage(secondImage.img_url);
    if (thirdImage) setThirdImage(thirdImage.img_url);
   
  }, [data]);
  
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
              <div className="item">
                <div className="itemNewLunch">
                  <div className="itemNewLunchImg">
                    <img
                      src={firstImage}
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
                      src={secondImage}
                      alt="No image found"
                    />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="itemNewLunch">
                  <div className="itemNewLunchImg">
                    <img
                      src={thirdImage}
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

export default Testimonial;
