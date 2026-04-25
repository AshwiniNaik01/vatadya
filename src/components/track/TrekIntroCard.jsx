import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrekIntroCard = ({ onBookNow, onWishlist, trek }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState("02:15:30");

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const [h, m, s] = prev.split(":").map(Number);
        if (h === 0 && m === 0 && s === 0) return "00:00:00";
        const total = h * 3600 + m * 60 + s - 1;
        const hours = Math.floor(total / 3600);
        const minutes = Math.floor((total % 3600) / 60);
        const seconds = total % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!trek) return null;

  const diffColors = {
    easy: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      emoji: "🌱",
      label: "Easy",
    },
    moderate: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      emoji: "⛰️",
      label: "Moderate",
    },
    challenging: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      emoji: "🏔️",
      label: "Challenging",
    },
    difficult: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      emoji: "❄️",
      label: "Difficult",
    },
    extreme: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      emoji: "⚡",
      label: "Extreme",
    },
  };
  const diff =
    diffColors[(trek.difficulty || "moderate").toLowerCase()] ||
    diffColors.moderate;

  return (
    <div
      className={`w-full bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200/80 shadow-lg sticky top-0 z-50 transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      {/* Premium Top Accent */}
      <div className="relative h-1 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
          {/* Left Section - Trek Identity */}
          <div className="flex items-center gap-5 flex-1 min-w-0">
            {/* Title and Location */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-2xl font-bold text-gray-900 truncate hover:text-clip tracking-tight">
                  {trek.title}
                </h2>
                {trek.status && (
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                      trek.status.toLowerCase() === 'completed'
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : trek.status.toLowerCase() === 'upcoming'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : trek.status.toLowerCase() === 'ongoing'
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-blue-50 text-blue-600 border-blue-200'
                    }`}
                  >
                    {trek.status}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-5 text-sm text-gray-600 flex-wrap">
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>

                <div className="flex flex-col items-start gap-2"></div>
              </div>
            </div>
          </div>

          {/* Middle Section - Premium Info Cards */}
          <div className="hidden lg:flex items-center gap-6"></div>

          {/* Right Section - Premium Price & Actions */}
          <div className="flex items-center gap-4 flex-shrink-0 bg-gradient-to-br from-gray-50 to-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
            {/* Price */}
            <div className="text-right">
              <div className="text-xs font-medium text-gray-500 mb-1 tracking-wider">
                STARTING FROM
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-bold text-gray-700">
                  ₹{(trek?.feeDetails?.totalFee || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Wishlist Button */}
              <button
                onClick={onWishlist}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  trek.isWishlisted
                    ? "bg-white text-white shadow-lg shadow-red-500/30"
                    : "bg-white border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 shadow-sm"
                }`}
              >
                <span className="text-xl">
                  {trek.isWishlisted ? "❤️" : "🤍"}
                </span>
                {/* {trek.isWishlisted && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
                )} */}
              </button>

              {/* Book Now Button */}
              <button
                onClick={onBookNow}
                disabled={trek.status?.toLowerCase() === 'completed'}
                className={`group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm overflow-hidden shadow-lg transition-all duration-300 transform ${trek.status?.toLowerCase() === 'completed' ? 'opacity-50 cursor-not-allowed' : 'shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105'}`}
              >
                {trek.status?.toLowerCase() === 'completed' ? (
                  <div className="relative flex items-center gap-2.5">
                    <span className="tracking-wide">COMPLETED</span>
                  </div>
                ) : (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <div className="relative flex items-center gap-2.5">
                      <span className="text-lg group-hover:rotate-12 transition-transform">
                        🎒
                      </span>
                      <span className="tracking-wide">BOOK NOW</span>
                      <span className="text-lg group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Quick Info */}
        <div className="lg:hidden flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-gray-600">🏔️</span>
              <span className="font-medium text-gray-900">
                {trek.altitude || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-gray-600">👥</span>
              <span className="font-medium text-gray-900">
                {trek.groupSize || "4-12"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
    </div>
  );
};

export default TrekIntroCard;
