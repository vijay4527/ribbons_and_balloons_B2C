import axios from "axios";
import https from "https";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;
const BASE_URL = process.env.API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosGet = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error)
  }
};

export const axiosPost = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error)

  }
};

export const axiosGetAll = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error)
  }
};


const handleAxiosError = (error) => {
  if (error.response) {  
    const { status, data } = error.response;
    toast.error(`Error: ${status} - ${data.message}`);
  } else if (error.request) {
    toast.error("Network Error");
  } else {
    toast.error("An error occurred while processing your request");
  }
};