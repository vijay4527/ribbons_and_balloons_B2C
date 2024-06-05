import { axiosGet, axiosPost } from "@/api";

  export async function getCities() {
    try {
      const response = await axiosGet('/RNBCity/GetAllRNBCity');
      return response; // Assuming the cities data is in the response.data
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Indicate error or handle differently as needed
    }
  }