"use client"
import React from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import homeStyles from "@/app/home.module.css";
import ProductImageZoom from "@/components/productImageZoom";
import AppConfig from "@/AppConfig";
import AddToFavoritesButton from "@/components/AddToFavoritesButton";
import { useState, useEffect } from "react";
const productImages = ({data,images,city}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  let image = data.product_image.split(",");
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className={styles.pdp_DetailImg}>
    {image ? (
      <>
        <div className={styles.pdp_ProductImgs}>
          <ul>
            {image.map((item, index) => (
              <li
                key={item}
                className={
                  index === activeIndex
                    ? styles.active
                    : ""
                }
                onClick={() =>
                  handleThumbnailClick(index)
                }
              >
                <img
                  src={AppConfig.cdn + "products/" + item}
                  alt="No image found"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.pdp_ProductImg}>
          <AddToFavoritesButton
            productData={data}
            city={city}
          />
          <ProductImageZoom
            imageSrc={
              AppConfig.cdn +
              "products/" +
              image[activeIndex]
            }
            alt="image"
          />
        </div>
      </>
    ) : (
      <p>No images available</p>
    )}
  </div>
  );
};

export default productImages;
