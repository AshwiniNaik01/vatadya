import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Use BrowserRouter
import "./App.css";
import Layout from "./components/layout/Layout";
import Hero from "./components/hero/Hero";
import HomePage from "./pages/home/HomePage";
import TrackPage from "./pages/TrackPage";
import TrekGalleryPage from "./pages/TrekGalleryPage";
import WishlistPage from "./pages/WishlistPage";
import AboutUs from "./components/hero/AboutUs";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import BookNowPage from "./pages/BookNowPage";
import TrekDetailPage from "./pages/TrekDetailPage";
import StayPage from "./pages/StayPage";
import StayDetailPage from "./pages/StayDetailPage";
import ScrollToTop from "./components/common/ScrollToTop";
import LoadingScreen from "./components/common/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading && <LoadingScreen onLoadingComplete={() => setLoading(false)} />}
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <div className={loading ? "hidden" : "block transition-opacity duration-1000 opacity-100"}>
        <Routes>
          {/* Layout wrapper */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} /> {/* Home page */}
            <Route path="/treks" element={<TrackPage />} />
            <Route path="/trek-gallery" element={<TrekGalleryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/book-now" element={<BookNowPage />} />
            <Route path="/trek/:id" element={<TrekDetailPage />} />
            <Route path="/stay" element={<StayPage />} />
            <Route path="/stay/:id" element={<StayDetailPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

