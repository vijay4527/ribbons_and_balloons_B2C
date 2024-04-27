import React from "react";
import Head from "next/head";
import styles from "@/app/[city]/l/[category]/page.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import { axiosPost } from "@/api";
import AddToFavoritesButton from "./AddToFavoritesButton";
import "react-multi-carousel/lib/styles.css"; 
import Carousel from "react-multi-carousel";

async function getCategoryData(sliderData,city) {
    try {
      if (sliderData.category_name) {
        const obj = {
          category_name: sliderData.category_name || "",
          sub_category_name: "",
          city_name: city,
        };
        const getData = await axiosPost("/ProductMaster/GetB2CProducts", obj);
        if (getData) {
         return getData;
        }
      }
       
          return {
            data: response,
            category: category,
          };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
            data: null,
            additionalData: null,
        };
      }
  }

const ShowCaseSlider = async({ sliderName, sliderData, city }) => {
  


  const categoryProduct =await getCategoryData(sliderData,city)

  return (
    <>
      <div className="ShowCaseSliderWrap">
        <div className="ShowCaseSliderTitle">{sliderName}</div>
        <div className="ShowCaseSliderBody">
          {categoryProduct.length > 0 ? (
            <Carousel
              responsive={{
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 3000 },
                  items: 5,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 4,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
              ssr={true} 
              autoPlay={true}
              autoPlaySpeed={2000}
              containerClass="carousel-container" 
              dotListClass="custom-dot-list"
              itemClass="Custom-class" 
            >
              {categoryProduct.map((item, index) => {
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
