// globalCity.js
"use client"
import { useEffect, useState } from "react";

const useCity = () => {
  const [city, setCity] = useState("");

  useEffect(() => {
    const getCity = () => {
      if (typeof window !== "undefined") {
        const fullPath = window.location.pathname;
        console.log("full path is", fullPath);
        const city = fullPath.split("/")[0];
        console.log("city is", city);
        setCity(city);
      }
    };

    getCity();

    return () => {
    };
  }, []); 

  return city;
};

export default useCity;
