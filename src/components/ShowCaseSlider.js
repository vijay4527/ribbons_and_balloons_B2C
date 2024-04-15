"use client"
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Head from "next/head";
import styles from "@/app/[city]/l/[category]/page.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AddToFavoritesButton from "./AddToFavoritesButton";

const OptionsShowCaseSlider = {
  items: 4,
  loop: true,
  margin: 10,
  autoplay: false,
  nav: false, 
  dots: false,
  navText: [
    '<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
    '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>',
  ],
};

const ShowCaseSlider =  ({ sliderName, sliderData }) => {
  const [isMounted, setIsMounted] = useState(false);
  const {data,status} = useSession();
  useEffect(() => {
    setIsMounted(true);
  }, [data]); 

  return (
    <>
      <Head>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </Head>
      <div className='ShowCaseSliderWrap'>
        <div className="ShowCaseSliderTitle">{sliderName}</div>
        <div className="ShowCaseSliderBody">
          {isMounted && (
            <OwlCarousel className="owl-theme" {...OptionsShowCaseSlider}>
              {/* <div className="item">
                <div className="itemNewLunch">
                  <div className="itemNewLunchImg">
                    <img
                      src="https://fama.b-cdn.net/RnB/Ln1.jpg"
                      alt="No image found"
                    />
                  </div>
                </div>
              </div> */}
              {sliderData.map((item,index) => {
                const productName = item.product_name.split(" ").join("-");
                var image = item.product_image.split(",");
                return (
                  <Link
                    key={item.product_id}
                    href={`/mumbai/p/${productName}`}
                    className={styles.itemCard}
                    prefetch={true}
                  >
                    <div className={styles.item}>
                      <div className={styles.itemInfo}>
                        <AddToFavoritesButton  productData={item}/>
                        <div className={`${styles.imgHvr}`}>
                          <img className={styles.plpProdctImg}
                            src={`${AppConfig.cdn}products/${image[0]}`}
                            alt="No image found"/>
                        </div>
                        <div className={`${styles["itemDesc"]}`}>
                          <h1>{item.product_name}</h1>
                          <h4>Sinful Collections</h4>
                          <p>₹ {item.cost}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowCaseSlider;