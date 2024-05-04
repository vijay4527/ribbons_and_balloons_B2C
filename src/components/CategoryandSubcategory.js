"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/[city]/l/[category]/page.module.css";
import homeStyles from "@/app/home.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import RangeSlider from "react-range-slider-input";
import AddToFavoriteButton from "./AddToFavoritesButton";
import "react-range-slider-input/dist/style.css";

function CategoryComponent({
  category,
  subcategoryName,
  data,
  categoryName,
  city,
}) {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);
  const [selectedMinRange, setSelectedMinRange] = useState(0);
  const [selectedMaxRange, setSelectedMaxRange] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [sortingType, setSortingType] = useState("Default sorting");
  const [sortingDirection, setSortingDirection] = useState("asc");

  useEffect(() => {
    let minCost = Number.MAX_VALUE;
    let maxCost = Number.MIN_VALUE;
    if (data && data.length > 0) {
      data.forEach((item) => {
        const cost = parseFloat(item.cost);
        if (cost < minCost) {
          minCost = cost;
          setSelectedMinRange(cost);
        }
        if (cost > maxCost) {
          maxCost = cost;
          setSelectedMaxRange(cost);
        }
      });
      setMinRange(minCost);
      setMaxRange(maxCost);
      filterProductsByRange(minCost, maxCost);
    }
  }, [data]);

  const filterProductsByRange = (min, max) => {
    const filteredProducts = data.filter((item) => {
      const cost = parseFloat(item.cost);
      return cost >= min && cost <= max;
    });
    setFilteredData(filteredProducts);
  };

  const handleRangeChange = ({ start, end }) => {
    setSelectedMaxRange(end);
    setSelectedMinRange(start);
    console.log("Range values start:", start);
    console.log("Range values end:", end);

    filterProductsByRange(start, end);
  };

  const sortProducts = (sortType) => {
    let sortedProducts = [...filteredData];
    switch (sortType) {
      case "Sort by popularity":
        // Implement logic to sort by popularity
        break;
      case "Sort by average rating":
        // Implement logic to sort by average rating
        break;
      case "Sort by latest":
        // Implement logic to sort by latest
        break;
      case "Sort by price: low to high":
        sortedProducts.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
        setSortingDirection("asc");
        break;
      case "Sort by price: high to low":
        sortedProducts.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
        setSortingDirection("desc");
        break;
      default:
        // Default sorting (no sorting)
        break;
    }
  
    // Update the sorting type state
    setSortingType(sortType);
  
    // Update the filteredData state with sorted products
    setFilteredData(sortedProducts);
  };
  
  return (
    <>
      <div className={styles.breadcrumb}></div>
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
                  <RangeSlider
                    min={minRange}
                    max={maxRange}
                    defaultValue={{ start: minRange, end: maxRange }}
                    value={[selectedMinRange, selectedMaxRange]}
                    onInput={(values) =>
                      handleRangeChange({ start: values[0], end: values[1] })
                    }
                  />
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
                      ? category.map((item, index) => (
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
                <h4 className={styles.plpItemsCount}>
                  Showing 1-{filteredData.length} of {data.length} results
                </h4>
                <div className={styles.plpSortby}>
                  <select
                    className={"form-control"}
                    defaultValue="Default sorting"
                    value={sortingType}
                    onChange={(e)=>sortProducts(e.target.value)}
                  >
                    <option  value="Default sorting">Default sorting</option>
                    {/* <option  value="Sort by popularity">Sort by popularity</option>
                    <option  value="Sort by average rating">Sort by average rating</option>
                    <option  value="Sort by latest">Sort by latest</option> */}
                    <option  value="Sort by price: low to high">Sort by price: low to high</option>
                    <option  value="Sort by price: high to low">Sort by price: high to low</option>
                  </select>
                </div>
              </div>
              <div className={styles.plpTiles}>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const productName = item.product_name.split(" ").join("-");
                    var image = item.product_image.split(",");
                    return (
                      <div className={styles.item} key={item.product_id}>
                        <div className={styles.itemInfo}>
                          {/* <AddToFavoriteButton  productData={item} city={city}/> */}
                          <Link
                            key={item.product_id}
                            href={`/${city}/p/${productName}`}
                            className={styles.itemCard}
                            prefetch={true}
                          >
                            <div className={`${styles.imgHvr}`}>
                              <img
                                className={styles.plpProdctImg}
                                src={`${AppConfig.cdn}products/${image[0]}`}
                                alt="No image found"
                              />
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
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg"
                        alt="No image found"
                      />
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
