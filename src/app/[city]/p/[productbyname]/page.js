import React from "react";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import Product from "@/components/product";
import AppConfig from "@/AppConfig";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import homeStyles from "@/app/home.module.css";
import Link from "next/link";
import ProductImages from "@/components/productImages";
import AddToCart from "@/components/addToCartButton"
import ProducDetails from "@/components/productDetails";

export async function generateMetadata({ params }) {
  const data = await GetProductData(params.productbyname, params.city);
  if (data) {

    return {
      title: data.product_name,
      description:
        "Buy & Order Cakes Online and Send Cakes anywhere in Mumbai. Ribbons & Balloons is an Online Cakes Shop in Mumbai, we make your Occasions special for your friends, family and you. Order Best Quality cakes online and we deliver it on your doorsteps.",
      openGraph: {
        images: [
          {
            url: AppConfig.cdn + "products/" + data.product_image.split(",")[0],
            height: 1200,
            width: 600,
            alt: "Alt",
          },
        ],
        icons: {
          icon: ["/favicon/favicon.ico"],
          shortcut: ["/favicon/favicon.ico"],
        },
      },
    };
  }
}
async function GetProductData(productname, city) {
  const Name = productname.split("-").join(" ");
  try {
    const response = await axiosGet(
      `/productMaster/GetProductByName/${city}/${Name}`
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
const productbyname = async ({ params }) => {
  const city = params.city;
  const productname = params.productbyname;
  const data = await GetProductData(productname, city);
  let image = data.product_image.split(","); 
  return (
    <>
      {data ? (
        <>
          <div className={styles.common_header}>
            <div className={homeStyles["container_fluid"]}>
              <div className={styles.content_heading}>
                <div className={styles.content_title_heading}>
                  <span className={styles.back_to_shop}>READY REGULARS</span>
                  <h1 className={styles.text_title_heading}>
                    <Link
                      href={`/${city}/l/${
                        data ? data?.category_name.split(" ").join("-") : ""
                      }`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {data ? data.category_name : ""}
                    </Link>
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
                    <ProductImages data={data} city={city}/>
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
                      <AddToCart data={data} city={city}></AddToCart>
                    </>
                  ) : (
                    ""
                  )}
                 
                </div>
                {
                  data && (
                    <ProducDetails data={data}></ProducDetails>
                  )
                }
              </div>
            </div>
          </div>
          {/* <div className={styles.pdp_otherContent}>
            <div className={homeStyles["container_fluid"]}>
              <div className={styles.reviewSection}>
                {
                  data ? (
                    <ShowCaseSlider
                    sliderName="You may also like"
                    sliderData={data}
                    city={city}
                  />
                  ) : (
                    ""
                  )
                }
              </div>
            </div>
          </div> */}
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
          {/* <Product data={data} city={city} /> */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default productbyname;
