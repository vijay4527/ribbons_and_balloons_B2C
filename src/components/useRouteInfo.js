"use client"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const useRouteInfo = () => {
  const path = usePathname();
  const pathSegments = path.split("/");
  const newCity = pathSegments[1];
  
  const [city, setCity] = useState(newCity);

  useEffect(() => {
    setCity(newCity);
  }, [path]); 

  return {
    city,
  };
};

export default useRouteInfo;
