import axios from "axios";
import { API_BASE_URL } from "../config/constants";


// Single function to fetch treks
export const fetchTreks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/trek`);
        return response.data; // returns the whole response object
    } catch (error) {
        console.error("Error fetching treks:", error);
        return { success: false, data: [], error: error.message };
    }
};

// Function to fetch a single trek by ID
export const fetchTrekById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/trek/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching trek with ID ${id}:`, error);
        return { success: false, data: null, error: error.message };
    }
};

// Function to fetch filtered treks
export const fetchFilteredTreks = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/trek/filter?difficulty=${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered treks:", error);
        return { success: false, data: [], error: error.message };
    }
};
