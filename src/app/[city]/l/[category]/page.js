import React from "react";
import CategoryComponent from "@/components/CategoryandSubcategory";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCities } from "@/utils/commoncity";
export async function generateMetadata({ params }) {
  const apiUrl = process.env.API_URL;

  const { data, category } = await getCategoryData(
    apiUrl,
    params.category,
    params.subcategory,
    params.city
  );
  if (data) {
    return {
      title: params.category + " | Ribbons and balloons",
      description:
        "Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
      openGraph: {
        images: [
          // {
          //   url: "https://ribbonsandballoons.com/frontassets/images/fav.png",
          //   height: 1200,
          //   width: 600,
          //   alt: "Alt",
          // },
        ],
        // icons:{
        //   icon:[
        //     "/favicon/favicon.ico"
        //   ],
        //   shortcut:[
        //     "/favicon/favicon.ico"
        //   ],
        // }
      },
    };
  }
}
async function getCategoryData(apiUrl, categoryName, subcategory, city) {
  const categoryStr = await categoryName.split("-").join(" ");

  try {
    let listingUrl =
      apiUrl +
      `ProductMaster/GetB2CProducts?category_name=${
        categoryStr ? categoryStr : ""
      }${
        subcategory ? "&sub_category_name=" + subcategory : ""
      }&city_name=${city}`;
    const responseData = await fetch(listingUrl, { next: { revalidate: 180 } });
    const categoryData = await fetch(
      apiUrl + "Category/GetAllCategories?city_name=" + city
    );

    const response = await responseData.json();
    const category = await categoryData.json();
    if (response && category) {
      return {
        data: response,
        category: category,
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: null,
      additionalData: null,
    };
  }
}

const page = async ({ params }) => {
  const cities = await getCities();
  const isValidCity = (cityName) => {
    return cities.some(
      (city) => city.city_name.toLowerCase() === cityName.toLowerCase()
    );
  };

  const categoryName = params.category;
  const nextCookies = cookies();
  const cityObj = await nextCookies.get("city");
  let city = params.city;

  if (!isValidCity(city)) {
    city = cityObj?.value || city;
    redirect(`/${city}/l/` + categoryName);
  }
  const subcategory = params.subcategory;
  // const isValidCity = cities.some(
  //   (c) => c.city_name.toLowerCase() === city.toLowerCase()
  // );

  // if (!isValidCity) {
  //   redirect('/mumbai/l/'+categoryName)
  // }
  const apiUrl = process.env.API_URL;
  console.log("Api Url", apiUrl);

  const { data, category } = await getCategoryData(
    apiUrl,
    categoryName,
    subcategory,
    city
  );
  return (
    <CategoryComponent
      category={category}
      subcategoryName={subcategory}
      data={data}
      categoryName={categoryName}
      city={city}
    />
  );
};

export default page;
