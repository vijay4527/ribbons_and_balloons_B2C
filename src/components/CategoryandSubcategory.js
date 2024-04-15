"use client"
import React from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import homeStyles from "@/app/home.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import RangeSlider from 'react-range-slider-input';
import AddToFavoriteButton from "./AddToFavoritesButton";
import 'react-range-slider-input/dist/style.css';

function CategoryComponent({ category, subcategoryName, data, categoryName,city }) {

  return (
    <>
      <div className={styles.breadcrumb}>
      </div>
      <section className={styles.plpPageMain}>
        <div className={homeStyles["container_fluid"]}>
          <div className={styles.plpPageWrap}>
            <div className={styles.plpPageFilter}>
                <div className={styles.plpFilterAction}>
                  <h4 className={styles.plpFilterInfoAction}>PRICE FILTER</h4>
                  <div className={styles.underLinecenter}>
                    <div className={"testimonialUnder"}>
                      <div className={"underLine"}></div>
                      <div className={"shapLine"}></div>
                    </div>
                  </div>
                  <div className={styles.plpFilterDescAction}>
                    <RangeSlider/>
                  </div>
                </div>
                <div className={styles.plpFilterAction}>
                  <h4 className={styles.plpFilterInfoAction}>CATEGORIES</h4>
                  <div className={styles.underLinecenter}>
                    <div className={"testimonialUnder"}>
                      <div className={"underLine"}></div>
                      <div className={"shapLine"}></div>
                    </div>
                  </div>
                  <div className={styles.plpFilterDescAction}>
                    
                    <ul>
                      {category && category.length > 0
                      ? category.map((item,index) => (
                          <li key={index}>
                            <a>{item.category_name}</a>
                          </li>
                        ))
                      : ""}
                    </ul>
                  </div>
                </div>
            </div>
            <div className={styles.plpPageBody}>
              <div className={styles.plpPagetemsAction}>
                <h4 className={styles.plpItemsCount}>Showing 1-{data.length} of {data.length} results</h4>
                <div className={styles.plpSortby}>
                  <select className={"form-control"}  defaultValue="Default sorting">
                    <option>Default sorting</option>
                    <option>Sort by popularity</option>
                    <option>Sort by average rating</option>
                    <option>Sort by latest</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                </div>
              </div>
              <div className={styles.plpTiles}>
              {data && data.length > 0 ? (
                  data.map((item) => {
                    const productName = item.product_name.split(" ").join("-");
                    var image = item.product_image.split(",");
                    return (
                     
                        <div className={styles.item} key={item.product_id}>
                          <div className={styles.itemInfo}>
                            <AddToFavoriteButton  productData={item} city={city}/>
                            <Link
                        key={item.product_id}
                        href={`/${city}/p/${productName}`}
                        className={styles.itemCard}
                        prefetch={true}
                      >
                            <div className={`${styles.imgHvr}`}>
                              <img className={styles.plpProdctImg}
                                src={`${AppConfig.cdn}products/${image[0]}`}
                                alt="No image found"/>
                            </div>
                            </Link>

                            <div className={`${styles["itemDesc"]}`}>
                              <h1>{item.product_name}</h1>
                              <h4>Sinful Collections</h4>
                              <p>₹ {item.cost}</p>
                            </div>
                          </div>
                        </div>
                    );
                  })
                ) : (
                  <>
                    <div className="display-flex-center">
                      <span className="text-center">
                        No Products Found for {categoryName}
                      </span>
                      <img src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg" 
                                alt="No image found"/>
                    </div>
                  </>
                )}
              </div>  
            </div>
          </div>
        </div>
      </section>
    </>
   
  );
}
export default CategoryComponent;
