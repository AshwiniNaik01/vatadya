import axios from "axios";
import { API_BASE_URL } from "../config/constants";

export const fetchTrekReviews = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/trekReview`);
    return response.data; // return full raw data with message array
};
