import React from "react";
import CategoryComponent from "@/components/CategoryandSubcategory";
import { cookies } from "next/headers";
import { getCities } from "@/utils/commoncity";
import { redirect } from "next/navigation";
export async function generateMetadata({ params }) {
  return {
    title: params.subcategory + " | Ribbons and balloons",
    description:
      "Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
    openGraph: {
      // images: [
      //   {
      //     url: "https://ribbonsandballoons.com/frontassets/images/fav.png",
      //     height: 1200,
      //     width: 600,
      //     alt: "Alt",
      //   },
      // ],
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
async function getCategoryData(apiUrl,categoryName, subcategory, city) {
  const subcatgoryName = subcategory.split("-").join(" ");
  const categoryStr = categoryName.split("-").join(" ");
  try {
    const responseData = await fetch(apiUrl + `ProductMaster/GetB2CProducts?category_name=${categoryStr}&sub_category_name=${subcatgoryName}&city_name=${city}`,{ next: { revalidate: 180 },});
    const categoryData = await fetch(
      apiUrl + "Category/GetAllCategories?city_name=" + city,{ next: { revalidate: 180 },}
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
  const categoryName = params.category;
  const cities = await getCities();
  const isValidCity = (cityName) => {
    return cities.some(
      (city) => city.city_name.toLowerCase() === cityName.toLowerCase()
    );
  };
  const nextCookies = cookies();
  const cityObj = await nextCookies.get('city');
  let city = params.city;

  if (!isValidCity(city)) {
    city = cityObj?.value || city; 
    redirect(`/${city}/l/`+ categoryName);
  }
  const apiUrl = process.env.API_URL
  const subcategory = params.subcategory;
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
