import { axiosGet } from "./api";
async function getCities() {
    try {
      const cities = await axiosGet("RNBCity/GetAllRNBCity");
      if (cities) {
        return cities;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        data: null,
      };
    }
  }