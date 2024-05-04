"use client"
import React from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import AddToFavoritesButton from "./AddToFavoritesButton";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

const ShowCaseSlider = ({ data, city }) => {
  return (
    <>
      <div className="ShowCaseSliderWrap">
        <div className="ShowCaseSliderTitle">You may also like</div>
        <div className="ShowCaseSliderBody">
          {data && data.length > 0 ? (
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              ssr={true} // Set ssr to true for server-side rendering support
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              // customTransition="all .5"
              transitionDuration={500}
              containerClass={`${styles.showCaseCarouselContainer}`}
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType="desktop"
              dotListClass={`${styles.showCaseCarouselDotList}`}
              itemClass={`${styles.showCaseCarouselItem}`}
          >
            {data.map((item, index) => {
              const productName = item.product_name.split(' ').join('-');
              var image = item.product_image.split(',');
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
