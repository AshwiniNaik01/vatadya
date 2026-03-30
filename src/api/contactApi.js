import axiosInstance from "../api/axiosInstance";

export const addContact = async (contactData) => {
  const response = await axiosInstance.post("/api/contact/submit", contactData);
  return response.data;
};

export const getContactUs = async () => {
  const response = await axiosInstance.get("/api/contact-us");
  return response.data;
};
