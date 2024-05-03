"use client"
import React from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import AddToFavoritesButton from "./AddToFavoritesButton";
import { Carousel } from 'react-responsive-carousel';
import "bootstrap/dist/css/bootstrap.min.css";

const ShowCaseSlider = ({ data, city }) => {
  return (
    <>
      <div className="ShowCaseSliderWrap">
        <div className="ShowCaseSliderTitle">You may also like</div>
        <div className="ShowCaseSliderBody">
          {data && data.length > 0 ? (
            <Carousel className="ShowCaseCarousel" centerMode={true} centerSlidePercentage={10} showThumbs={true} showArrows={false} selectedItem={5} autoPlay={true}>
            {data.map((item, index) => {
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
                        <AddToFavoritesButton productData={item} />
                        <div className={styles.imgHvr}>
                          <img
                            className={styles.plpProdctImg}
                            src={`${AppConfig.cdn}products/${image[0]}`}
                            alt="No image found dhddsjdks"
                          />
                        </div>
                        <div className={styles.itemDesc}>
                          <h1>{item.product_name}</h1>
                          <h4>Sinful Collections</h4>
                          <p>₹ {item.cost}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Carousel>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowCaseSlider;
