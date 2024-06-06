import React from 'react'
import { axiosPost,axiosGet } from '@/api';
import CategoryComponent from "@/components/CategoryandSubcategory"
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; 
import { getCities } from '@/utils/commoncity';
export async function generateMetadata({ params }) {
  const {data,category} = await getCategoryData(params.category,params.subcategory,params.city);
  if (data) {
    return {
      title: params.category + " | Ribbons and balloons",
      description:"Welcome to AshGamewitted, your ultimate destination for immersive gaming and captivating anime content! Dive into a world where pixels meet passion, as we bring you the latest updates, reviews, and insights from the gaming and anime realms.",
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
async function getCategoryData(categoryName,subcategory,city) {

  const categoryStr= await categoryName.split("-").join(" ")
   
    try {
        const obj = {
          category_name: categoryStr || "",
          sub_category_name: subcategory || "",
          city_name: city,
        };
    
        const [response, category] = await Promise.all([
            axiosPost("/ProductMaster/GetB2CProducts", obj),
            axiosPost("/Category/GetAllCategories", { city_name: city })
          ]);
      
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

  // async function getCities() {
  //   try {
   
  //       const cities = await axiosGet("RNBCity/GetAllRNBCity");
  //       if (cities) {
  //         return cities;
  //       }  
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return {
  //       data: null,
  //     };
  //   }
  // }

const page = async({params}) => {
  const cities = await getCities();
  const isValidCity = (cityName) => {
    return cities.some(
      (city) => city.city_name.toLowerCase() === cityName.toLowerCase()
    );
  };


  const categoryName = params.category;
  const nextCookies = cookies();
  const cityObj = await nextCookies.get('city');
  let city = params.city;

  if (!isValidCity(city)) {
    city = cityObj?.value || city; 
    redirect(`/${city}/l/`+ categoryName);
  }
    const subcategory = params.subcategory
    // const isValidCity = cities.some(
    //   (c) => c.city_name.toLowerCase() === city.toLowerCase()
    // );

    // if (!isValidCity) {
    //   redirect('/mumbai/l/'+categoryName)
    // }
 const {data,category} = await getCategoryData(categoryName,subcategory,city)
  return (
    <CategoryComponent
    category={category}
    subcategoryName={subcategory}
    data={data}
    categoryName={categoryName}
    city={city}
  />
  )
}

export default page