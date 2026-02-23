import React, { useEffect, useState } from "react";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { getAllReviews } from "./../../api/reviewApi";
import { API_BASE_URL } from "../../config/constants";

const TrackReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getAllReviews();

        // Handle different API response structures
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (data && Array.isArray(data.message)) {
          // Your API returns reviews in the 'message' property
          setReviews(data.message);
        } else if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else if (data && Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          console.warn("Unexpected API response format:", data);
          setReviews([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setReviews([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Pagination logic
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const totalPages = Math.ceil(reviewsArray.length / reviewsPerPage);
  const startIndex = currentPage * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviewsArray.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="max-w-8xl mx-auto px-6 md:px-15 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Stories from <span className="text-emerald-600">Our Trekkers</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Real experiences from travelers who witnessed the majestic beauty of
            the Himalayas with us.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentReviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="group bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-10 h-10 text-emerald-50 group-hover:text-emerald-100 transition-colors duration-500" />
                    <div className="flex">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-500 fill-amber-500"
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-emerald-600 transition-colors">
                    "{review.title || "Amazing Trek Experience"}"
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow italic text-sm">
                    {review.description}
                  </p>

                  <div className="pt-6 border-t border-gray-50 mt-auto flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={
                          review.profilePhoto
                            ? `${API_BASE_URL || ""}/uploads/${review.profilePhoto}`
                            : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000"
                        }
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-50"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000";
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2 size={8} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                        {review.role || "Trekker"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {reviewsArray.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 font-medium">
                  No reviews available yet.
                </p>
              </div>
            )}
          </>
        )}

        {/* Navigation & Stats */}
        {!loading && !error && reviewsArray.length > 0 && (
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={reviewsArray.length <= reviewsPerPage}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? "bg-emerald-500 shadow-sm shadow-emerald-200"
                        : "bg-emerald-100"
                    }`}
                  ></span>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={reviewsArray.length <= reviewsPerPage}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="bg-emerald-700 rounded-3xl p-6 md:p-8 text-white flex-grow md:ml-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                <div className="text-center md:text-left">
                  <div className="text-3xl font-black mb-1">10K+</div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-tight">
                    Trekkers
                    <br />
                    Served
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-black mb-1">4.9/5</div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-tight">
                    Average
                    <br />
                    Rating
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-black mb-1">150+</div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-tight">
                    Destinations
                    <br />
                    Covered
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-black mb-1">15+</div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-tight">
                    Years Of
                    <br />
                    Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackReview;