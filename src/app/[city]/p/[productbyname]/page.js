import React from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import homeStyles from "@/app/home.module.css";
import Link from "next/link";
import AppConfig from "@/AppConfig";
import ProductImages from "@/components/productImages";
import AddToCart from "@/components/addToCartButton";
import ProductDetails from "@/components/productDetails";
import ShowCaseSlider from "@/components/ShowCaseSlider";
import { cookies } from "next/headers";
import { getCities } from "@/utils/commoncity";
import { redirect } from "next/navigation";
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

      const respData = await fetch(
        process.env.API_URL +
          `ProductMaster/GetB2CProducts?category_name=${
            category ? category : ""
          }&sub_category_name=&city_name=${city}`,
        { next: { revalidate: 180 } }
      );
      const getData = await respData.json();
      if (getData) {
        return getData;
      }
    }
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
    const respData = await fetch(
      process.env.API_URL + `productMaster/GetProductByName/${city}/${Name}`
    );
    const response = await respData.json();
    if (response) {
      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}

const productbyname = async ({ params }) => {
  // const cities = await getCities();
  const city = params.city;
  const productname = params.productbyname;
  //   const nextCookies = cookies();
  //   const cityObj = await nextCookies.get("city");
  //   const cookiecity = cityObj?.value;
  //   const isValidCity = cities.some(
  //     (c) => c.city_name.toLowerCase() === newcity.toLowerCase()
  //   );

  //   const city = isValidCity ? newcity : (cities.includes(cookiecity) ? cookiecity : newcity);

  //  if (!isValidCity) {
  //     redirect(`/${city}/p/${productname}`);
  //   }
  const data = await GetProductData(productname, city);
  if (data) {
    let image = data.product_image.split(",");
    const categoryProduct = await getCategoryData(data.category_name, city);

    return (
      <>
        {data  && categoryProduct && (
          <div className={styles.pdp_WrapContent}>
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
                      {
                        categoryProduct && categoryProduct.length > 0 && (
                          <ShowCaseSlider data={categoryProduct} city={city} />
                        )
                        
                      }
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
  } else {
    return (
      <div className="display-flex-center">
        <span className="text-center">
          No Products Found for {productname}
        </span>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg"
          alt="No image found"
        />
      </div>
    );
  }
};

export default productbyname;
