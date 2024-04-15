import React from "react";
import styles from "@/app/[city]/p/[productbyname]/page.module.css";
import homeStyles from "@/app/home.module.css";
import AddToCart from "@/components/addToCartButton";
import ProducDetails from "@/components/productDetails";
import ProductImageZoom from "@/components/productImageZoom";
import https from "https";
import AppConfig from "@/AppConfig";
import Link from "next/link";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AddToFavoritesButton from "@/components/AddToFavoritesButton";
import ShowCaseSlider from "@/components/ShowCaseSlider";
import Product from "@/components/product";
import { useSession } from "next-auth/react";
// import  {  useEffect } from "react";

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

  return <>{data ? <Product data={data} city={city} /> : ""}</>;
};

export default productbyname;
