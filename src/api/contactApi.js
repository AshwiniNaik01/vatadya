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



export const getContactUs = async () => {
  const res = await axiosInstance.get(`/api/contact-us`);
  return res.data.data;
};

// export const addContact = async (data) => {
//   const res = await axios.post(`${BASE_URL}/contact`, data);
//   return res.data;
// };