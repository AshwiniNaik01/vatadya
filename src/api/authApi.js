// src/api/authApi.js
// import axios from "axios";
import axiosInstance from "./axiosInstance";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const sendOtp = async (email) => {
  try {
    const response = await axiosInstance.post(`/api/auth/send-otp`, { email });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error.response?.data || error;
  }
};

export const verifyOtp = async (reference, otp) => {
  try {
    const response = await axiosInstance.post(`/api/auth/verify-otp`, {
      reference,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error.response?.data || error;
  }
};
