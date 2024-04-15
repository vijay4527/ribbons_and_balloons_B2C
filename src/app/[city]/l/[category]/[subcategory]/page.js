import React from 'react'
import { axiosPost } from '@/api';
import CategoryComponent from "@/components/CategoryandSubcategory"
async function getCategoryData(categoryName,subcategory,city) {
    const subcatgoryName = subcategory.split("-").join(" ")
    try {
        const obj = {
          category_name: categoryName || "",
          sub_category_name: subcatgoryName || "",
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

const page = async({params}) => {
    const categoryName = params.category
    const city = params.city
    const subcategory = params.subcategory
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