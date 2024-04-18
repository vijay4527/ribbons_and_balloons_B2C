import React from "react";
import { axiosGet, axiosPost, axiosGetAll } from "@/api";
import Product from "@/components/product";
export async function generateMetadata({ params }) {
  const  data = await  GetProductData(params.productbyname,params.city);
  if (data ) {
    console.log("data ", data)
    return {
      title: data.product_name,
      description:"Buy & Order Cakes Online and Send Cakes anywhere in Mumbai. Ribbons & Balloons is an Online Cakes Shop in Mumbai, we make your Occasions special for your friends, family and you. Order Best Quality cakes online and we deliver it on your doorsteps.",
      openGraph: {
        images: [
          {
            url: data.image,
            height: 1200,
            width: 600,
            alt: "Alt",
          },
        ],
        icons:{
          icon:[
            "/favicon/favicon.ico"
          ],
          shortcut:[
            "/favicon/favicon.ico"
          ],
        }
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

  return <>{data ? <Product data={data} city={city} /> : ""}</>;
};

export default productbyname;
