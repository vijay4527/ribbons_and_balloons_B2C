import { axiosGet, axiosPost } from "@/api";

  export async function getCities() {
    try {
      const response = await axiosGet('/RNBCity/GetAllRNBCity');
      return response; 
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  }