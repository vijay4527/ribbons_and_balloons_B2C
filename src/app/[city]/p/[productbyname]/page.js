import React from "react";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import Product from "@/components/product";

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
