"use client"
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import AppConfig from "@/AppConfig";
import Link from "next/link";
import Image from "next/image";


const Banner = ({ city, data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change to mobile view on widths below or equal to 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => window.removeEventListener("resize", handleResize); // Clean up the listener on unmount
  }, []);

  const images = [
    data.find((item) => item.seq_no === 1) || {},
    data.find((item) => item.seq_no === 2) || {},
    data.find((item) => item.seq_no === 3) || {},
    data.find((item) => item.seq_no === 4) || {},
    data.find((item) => item.seq_no === 5) || {}
  ];

  return (
    <div className="banner-wrap">
      <Container fluid>
        {isMobile ? (
          <Carousel>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <Link href={`/${image.redirect_url ? image.redirect_url : "/"}`}>
                  <Image
                    src={AppConfig.cdn + image.img_url}
                    alt="No image found"
                    height={403}
                    width={597}
                    priority
                  />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="banner-body">
            <div className="banner-sec1">
              <div className="banner-img banner-img1" id="animatedImage">
                <Link href={`/${images[0].redirect_url ? images[0].redirect_url : "/"}`}>
                  <Image
                    src={AppConfig.cdn + images[0].img_url}
                    alt="No image found"
                    height={403}
                    width={597}
                    priority
                  />
                </Link>
              </div>
              <div className="banner-img banner-img2" id="animatedImage">
                <Link href={`/${images[1].redirect_url ? images[1].redirect_url : "/"}`}>
                  <Image
                    src={AppConfig.cdn + images[1].img_url}
                    alt="No image found"
                    height={428}
                    width={601}
                    priority
                  />
                </Link>
              </div>
            </div>
            <div className="banner-sec1 banner-sec-center">
              <div className="banner-img banner-img-center" id="animatedImage">
                <Link href={`/${images[2].redirect_url ? images[2].redirect_url : "/"}`}>
                  <Image
                    src={AppConfig.cdn + images[2].img_url}
                    alt="No image found"
                    height={629}
                    width={931}
                    priority
                  />
                </Link>
              </div>
            </div>
            <div className="banner-sec1">
              <div className="banner-img banner-img3" id="animatedImage">
                <Link href={`/${images[3].redirect_url ? images[3].redirect_url : "/"}`}>
                  <Image
                    src={AppConfig.cdn + images[3].img_url}
                    alt="No image found"
                    height={403}
                    width={596}
                    priority
                  />
                </Link>
              </div>
              <div className="banner-img banner-img4" id="animatedImage">
                <Link href={`/${images[4].redirect_url ? images[4].redirect_url : "/"}`}>
                  <Image
                    src={AppConfig.cdn + images[4].img_url}
                    alt="No image found"
                    height={428}
                    width={633}
                    priority
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Banner;
