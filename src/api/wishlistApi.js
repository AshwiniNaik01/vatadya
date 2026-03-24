import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";

export const addToWishlist = async (trekId) => {
  const userId = Cookies.get("userId");
  const response = await axiosInstance.post(`/api/wishlist`, {
    userId,
    trekId,
  });
  return response.data;
};

export const removeFromWishlist = async (trekId) => {
  const userId = Cookies.get("userId");
  const response = await axiosInstance.delete(`/api/wishlist`, {
    data: { userId, trekId },
  });
  return response.data;
};

export const fetchWishlist = async () => {
  const userId = Cookies.get("userId");
  if (!userId) return { success: true, data: [] };
  const response = await axiosInstance.get(`/api/wishlist`);
  return response.data;
};