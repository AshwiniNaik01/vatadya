import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
// import { API_BASE_URL } from "../config/constants";

export const fetchTrekGallery = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/trekGallery`);
  return response.data; // return full response data
};
