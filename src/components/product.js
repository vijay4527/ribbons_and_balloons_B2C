"use client"
import React from 'react'
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import homeStyles from "@/app/home.module.css";
import AddToCart from "@/components/addToCartButton";
import ProducDetails from "@/components/productDetails";
import ProductImageZoom from "@/components/productImageZoom";
import AppConfig from "@/AppConfig";
import Link from "next/link";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import { useRouter } from "next/router";
import Head from "next/head";
import AddToFavoritesButton from "@/components/AddToFavoritesButton";
import ShowCaseSlider from "@/components/ShowCaseSlider";
import { useSession } from "next-auth/react";
import { useState,useEffect } from 'react';
const RecentlyViewed = [
    {
      cost: 500,
      description: "Red velvet cake is a true classic in the world of desserts, celebrated for its eye-catching deep red hue and its delightful blend of flavors. This cake boasts a subtle cocoa flavor, a hint of tanginess, and a moist, tender crumb that makes it stand out among other cakes.`",
      product_id: "2310251249526037055",
      product_image: "20240120084802366.jpeg,20240120084835622.jpeg,20240120090211247.jpeg",
      product_name: "Red Velvet Strawberry Cake"
    },
    {
      cost: 500,
      description: "Red velvet cake is a true classic in the world of desserts, celebrated for its eye-catching deep red hue and its delightful blend of flavors. This cake boasts a subtle cocoa flavor, a hint of tanginess, and a moist, tender crumb that makes it stand out among other cakes.`",
      product_id: "2310251249526037056",
      product_image: "20240120084802366.jpeg,20240120084835622.jpeg,20240120090211247.jpeg",
      product_name: "Red Velvet Strawberry Cake"
    },
    {
      cost: 500,
      description: "Red velvet cake is a true classic in the world of desserts, celebrated for its eye-catching deep red hue and its delightful blend of flavors. This cake boasts a subtle cocoa flavor, a hint of tanginess, and a moist, tender crumb that makes it stand out among other cakes.`",
      product_id: "2310251249526037057",
      product_image: "20240120084802366.jpeg,20240120084835622.jpeg,20240120090211247.jpeg",
      product_name: "Red Velvet Strawberry Cake"
    },
    {
      cost: 500,
      description: "Red velvet cake is a true classic in the world of desserts, celebrated for its eye-catching deep red hue and its delightful blend of flavors. This cake boasts a subtle cocoa flavor, a hint of tanginess, and a moist, tender crumb that makes it stand out among other cakes.`",
      product_id: "2310251249526037058",
      product_image: "20240120084802366.jpeg,20240120084835622.jpeg,20240120090211247.jpeg",
      product_name: "Red Velvet Strawberry Cake"
    },
  ];
const product = ({data,city}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    let image = data.product_image.split(",");
  
    const handleThumbnailClick = (index) => {
      setActiveIndex(index);
    };
  return (
    <>
    <div className={styles.pdp_WrapContent}>
      <div className={styles.common_header}>
        <div className={homeStyles["container_fluid"]}>
          <div className={styles.content_heading}>
            <div className={styles.content_title_heading}>
              <span className={styles.back_to_shop}>READY REGULARS</span>
              <h1 className={styles.text_title_heading}>
                <a
                  href={`/${city}/l/${data ? data?.category_name
                    .split(" ")
                    .join("-") : ""}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {data ? data.category_name : ""}
                </a>
              </h1>
            </div>
            <div className={styles.breadcrumb}>
              <div className={styles.breadcrumb}>
                <Link
                  href={`/${city}/l/${data.category_name
                    .split(" ")
                    .join("-")}/${data.sub_category_name
                    .split(" ")
                    .join("-")}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {data ? data.category_name : ""}{" "}
                  <span className={styles.delimiter}>
                    {data ? data.sub_category_name : ""}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data ? (
        <div className={styles.pdp_Wrap}>
          <div className={homeStyles["container_fluid"]}>
            <div className={styles.pdp_DetailBody}>
              <div className={styles.pdp_detailImgs}>
                <div className={styles.pdp_DetailImg}>
                  {image ? (
                    <>
                      <div className={styles.pdp_ProductImgs}>
                        <ul>
                          {image.map((item, index) => (
                            <li
                              key={item}
                              className={
                                  index === activeIndex ? styles.active : ""
                              }
                              onClick={() => handleThumbnailClick(index)}
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
                        <AddToFavoritesButton productData={data} city={city}/>
                        <ProductImageZoom
                          imageSrc={
                            AppConfig.cdn + "products/" + image[activeIndex]
                          }
                          alt="image"
                        />
                      </div>
                    </>
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
              <div className={styles.pdp_detailDesc}>
                <div className={styles.pdp_DetailDesc}>
                  {data ? (
                    <>
                      <h2 className={styles.pdp_ProductName}>
                        {data.product_name}
                      </h2>
                      <div className={styles.underLineSeperator}></div>
                    </>
                  ) : (
                    ""
                  )}
                  <AddToCart data={data} city={city}></AddToCart>
                </div>
                <ProducDetails data={data}></ProducDetails>
              </div>
            </div>
          </div>
          <div className={styles.pdp_otherContent}>
            <div className={homeStyles["container_fluid"]}>
              <div className={styles.reviewSection}>
                <ShowCaseSlider
                  sliderName="Showcase"
                  sliderData={RecentlyViewed}
                />
              </div>
            </div>
            <div className={homeStyles["container_fluid"]}>
              <div className={styles.reviewSection}>
                <ShowCaseSlider
                  sliderName="You may also like"
                  sliderData={RecentlyViewed}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg"
            alt="No image found"
          />
          <span>Product not found</span>
        </>
      )}
    </div>
  </>
  )
}

export default product