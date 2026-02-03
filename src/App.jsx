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

function App() {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
