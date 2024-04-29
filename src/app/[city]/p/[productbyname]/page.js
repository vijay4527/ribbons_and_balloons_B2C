import React from "react";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import Product from "@/components/product";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import homeStyles from "@/app/home.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import ProductImages from "@/components/productImages";
import AddToCart from "@/components/addToCartButton";
import ProductDetails from "@/components/productDetails";
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
async function getCategoryData(category, city) {
  try {
    if (category) {
      const obj = {
        category_name: category || "",
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
  var respObject = {
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
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const city = params.city;
  const productname = params.productbyname;
  const data = await GetProductData(productname, city);
  if (data) {
    let image = data.product_image.split(",");
    const categoryProduct = await getCategoryData(data.category_name, city);
    if (categoryProduct) {
      console.log("categoryProduct", categoryProduct);
    }
    return (
      <>
        {data && categoryProduct && (
          <div className={styles.pdp_WrapContent}>
            <div className={styles.common_header}>
              <div className={homeStyles["container_fluid"]}>
                <div className={styles.content_heading}>
                  <div className={styles.content_title_heading}>
                    <span className={styles.back_to_shop}>READY REGULARS</span>
                    <h1 className={styles.text_title_heading}>
                      <a
                        href={`/${city}/l/${
                          data ? data?.category_name.split(" ").join("-") : ""
                        }`}
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
                      <ProductImages data={data} images={image} city={city} />
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
                      {data && <ProductDetails data={data}></ProductDetails>}
                    </div>
                  </div>
                </div>
                <div className={styles.pdp_otherContent}>
                  <div className={homeStyles["container_fluid"]}>
                    <div className={styles.reviewSection}>
                      {categoryProduct &&
                        categoryProduct.length > 0 &&
                        categoryProduct.map((item) => {
                          <h2>{item.product_name}</h2>;
                        })}
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
        )}
      </>
    );
  }
};

export default productbyname;
