"use client";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { axiosPost } from "@/api";
const Banner = ({city,data}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bannerImage,setBannerImage] = useState(data)
  const [firstImage,setFirstImage] = useState('')
  const [secondImage,setSecondImage] = useState('')
  const [thirdImage,setThirdImage] = useState('')
  const [fourthImage,setFourthImage] = useState('')
  const [fifthImage,setFifthImage] = useState('')

 console.log("data",data) 
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollPosition(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
   
  }, []);

  useEffect(() => {
    const firstImage = data.find(item => item.seq_no === '1');
    const secondImage = data.find(item => item.seq_no === '2');
    const thirdImage = data.find(item => item.seq_no === '3');
    const fourthImage = data.find(item => item.seq_no === '4');
    const fifthImage = data.find(item => item.seq_no === '5');

    if (firstImage) setFirstImage(firstImage.img_url);
    if (secondImage) setSecondImage(secondImage.img_url);
    if (thirdImage) setThirdImage(thirdImage.img_url);
    if (fourthImage) setFourthImage(fourthImage.img_url);
    if (fifthImage) setFifthImage(fifthImage.img_url);
  }, [data]);
  
  return (
    <>
      <div className="banner-wrap">
        <Container fluid>
          <div className="banner-body">
            <div className="banner-sec1">
              <div
                className="banner-img banner-img1"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}
              >
                {/* <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-7.jpg"
                  alt="No image found"
                /> */}
                
                <img
                  src={firstImage}
                  alt="No image found"
                />
              </div>
              <div
                className="banner-img banner-img2"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}
              >
                {/* <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-1-729x1024.png"
                  alt="No image found"
                /> */}
                <img
                  src={secondImage}
                  alt="No image found"
                />
              </div>
            </div>
            <div className="banner-sec1 banner-sec-center">
              <div
                className="banner-img banner-img-center"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 0}px)` }}
              >
                {/* <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-8.jpg"
                  alt="No image found"
                /> */}
                <img
                  src={thirdImage}
                  alt="No image found"
                />
              </div>
            </div>
            <div className="banner-sec1">
              <div
                className="banner-img banner-img3"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}
              >
                {/* <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-10.jpg"
                  alt="No image found"
                /> */}
                <img
                  src={fourthImage}
                  alt="No image found"
                />
              </div>
              <div
                className="banner-img banner-img4"
                id="animatedImage"
                style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}
              >
                {/* <img
                  src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-9.jpg"
                  alt="No image found"
                /> */}
                <img
                  src={fifthImage}
                  alt="No image found"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Banner;
