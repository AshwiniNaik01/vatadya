import axiosInstance from "../api/axiosInstance";

export const addContact = async (contactData) => {
  try {
    const response = await axiosInstance.post(
      "/api/contact/submit",
      contactData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
