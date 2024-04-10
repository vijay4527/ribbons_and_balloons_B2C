
import React from 'react';
import { redirect } from 'next/navigation'

const Page = (city) => {

  if (city !== "") {
    return {
      redirect: {
        destination: `/${city}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/mumbai",
        permanent: false,
      },
    };
  }
};

const page = async({params})=>{
  const city = params.city || ""; 

  const  data = await Page(city)
  if(data){
    redirect("/mumbai")
  }else{
    redirect("/mumbai")

  }
  return (
    <></>
  )
}

export default page;


