// Single source of truth for env variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// constants.js
export const DIR = {
    TrekImage: `${API_BASE_URL}/uploads/Treks/`,
    CategoryImage: `${API_BASE_URL}/uploads/category/trekkvede-category/`,
    TrekGalleryImage: `${API_BASE_URL}/uploads/gallery/trek-gallery/`,
    //   TrekGallery: "uploads/Treks/Gallery/",
    // add more if needed
};
