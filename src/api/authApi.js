// import axiosInstance from "./axiosInstance";

// export const sendOtp = async (email) => {
//   try {
//     const response = await axiosInstance.post(`/api/auth/send-otp`, { email });
//     return response.data;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw error.response?.data || error;
//   }
// };

// export const verifyOtp = async (reference, otp) => {
//   try {
//     const response = await axiosInstance.post(`/api/auth/verify-otp`, {
//       reference,
//       otp,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     throw error.response?.data || error;
//   }
// };

import axiosInstance from "./axiosInstance";

// ----------------- OTP FLOW -----------------

// Send OTP to email
export const sendOtp = async (email) => {
  try {
    const payload = { email }; // payload is an object with email
    const response = await axiosInstance.post(`/api/auth/send-otp`, payload);
    // Expect response: { success: true, message, data: { reference: "..." } }
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

// Verify OTP
export const verifyOtp = async (reference, otp) => {
  try {
    const payload = { reference, otp }; // payload includes reference and otp
    const response = await axiosInstance.post(`/api/auth/verify-otp`, payload);
    // Expect response: { success: true, data: { token, user } }
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

// ----------------- EMAIL/PASSWORD LOGIN -----------------

export const loginUser = async ({ email, password }) => {
  try {
    const payload = { email, password }; // payload includes email & password
    const response = await axiosInstance.post(`/api/user/login`, payload);
    // Expect response: { success: true, data: { token, user } }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// ----------------- REGISTER -----------------

export const registerUser = async ({ name, email, password }) => {
  try {
    const payload = { name, email, password };
    const response = await axiosInstance.post(`/api/user/register`, payload);
    // Expect response: { success: true, data: { user } }
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response?.data || { message: "Registration failed" };
  }
};
