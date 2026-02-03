import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

export const fetchTrekCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/trekCategory`);
  return response.data; // just return full raw data
};
