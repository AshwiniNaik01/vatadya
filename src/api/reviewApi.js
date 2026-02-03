import axiosInstance from "./axiosInstance";
import { API_BASE_URL } from "../config/constants";

export const getAllReviews = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/api/trekReview`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
