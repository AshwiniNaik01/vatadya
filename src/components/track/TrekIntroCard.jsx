// import {
//   Share2, MapPin, Star, ChevronRight, Bookmark, Calendar,
//   Clock, CheckCircle, Sparkles, Activity, Layers, Users, Mountain, Heart
// } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const TrekIntroCard = ({ onBookNow, onWishlist, trek }) => {
//   const navigate = useNavigate();
//   if (!trek) return null;

//   const diffColors = {
//     easy: { text: "text-emerald-700", bg: "bg-emerald-100" },
//     moderate: { text: "text-amber-700", bg: "bg-amber-100" },
//     challenging: { text: "text-orange-700", bg: "bg-orange-100" },
//     difficult: { text: "text-red-700", bg: "bg-red-100" },
//     extreme: { text: "text-purple-700", bg: "bg-purple-100" },
//   };
//   const diff = diffColors[(trek.difficulty || "moderate").toLowerCase()] || diffColors.moderate;

//   return (
//     <div className="bg-white/90 backdrop-blur-3xl border-b border-sky-100/50 shadow-xl shadow-sky-900/[0.03] overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 py-5 md:py-7">
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

//           {/* Left — Trek Identity */}
//           <div className="flex-1 min-w-0">
//             {/* Tags row */}
//             <div className="flex flex-wrap items-center gap-2.5 mb-4">
//               <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${diff.bg} ${diff.text}`}>
//                 {trek.difficulty}
//               </div>
//               {trek.tags?.slice(0, 2).map((tag, i) => (
//                 <div key={i} className="px-4 py-1 rounded-full text-[10px] font-black text-sky-600 bg-sky-50/50 border border-sky-100 uppercase tracking-widest">
//                   #{tag}
//                 </div>
//               ))}
//             </div>

//             {/* Title with Gradient Polish */}
//             <h1 className="text-3xl lg:text-5xl font-black text-sky-950 tracking-tighter leading-[0.9] mb-5">
//               {trek.title}
//             </h1>

//             {/* Meta row with subtle dividers */}
//             <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-[13px] font-bold text-sky-600/70">
//               <div className="flex items-center gap-2.5 group cursor-default">
//                 <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
//                   <MapPin className="w-4 h-4 text-sky-400" />
//                 </div>
//                 {trek.location}
//               </div>
//               <div className="flex items-center gap-2.5 group cursor-default">
//                 <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
//                   <Clock className="w-4 h-4 text-sky-400" />
//                 </div>
//                 {trek.duration}
//               </div>
//               <div className="flex items-center gap-2.5 group cursor-default">
//                 <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
//                   <Users className="w-4 h-4 text-sky-400" />
//                 </div>
//                 {trek.groupSize || "Flexible Group"}
//               </div>
//               <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
//                   <Activity className="relative w-3.5 h-3.5 text-emerald-500" />
//                 </div>
//                 <span className="text-emerald-700 text-[11px] font-black uppercase tracking-widest">{trek.status || "Booking Open"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Right — Price + CTA Card */}
//          <div className="flex items-center gap-4 p-4 bg-sky-50/50 rounded-[2rem] border border-sky-100/50 self-stretch lg:self-center">

//   <div className="text-right px-4 hidden md:block">
//     <div className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-1">
//       Total Expedition
//     </div>
//     <div className="text-3xl font-black text-sky-950 tracking-tighter">
//       ₹{trek?.feeDetails?.totalFee?.toLocaleString()}
//     </div>
//   </div>

//   {/* Wishlist Button */}
//   <button
//     onClick={onWishlist}
//     className={`flex items-center gap-2 px-6 py-4 rounded-[1.5rem] font-black text-sm
//                border shadow-md hover:shadow-lg hover:-translate-y-0.5
//                transition-all duration-300 group ${
//                  trek.isWishlisted
//                  ? "bg-rose-50 border-rose-200 text-rose-600"
//                  : "bg-white border-sky-200 text-sky-700"
//                }`}
//   >
//     <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${trek.isWishlisted ? 'fill-current' : ''}`} />
//     <span className="uppercase tracking-[0.1em]">Wishlist</span>
//   </button>

//   {/* Book Now Button */}
//   <button
//     onClick={onBookNow}
//     className="flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-black text-sm text-white
//                bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 shadow-xl shadow-sky-200/50
//                hover:shadow-2xl hover:shadow-sky-400/40 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//     <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//     <span className="uppercase tracking-[0.1em]">Book Now</span>
//     <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//   </button>

// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrekIntroCard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const TrekIntroCard = ({ onBookNow, onWishlist, trek }) => {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false);
//   const [countdown, setCountdown] = useState("02:15:30");

//   useEffect(() => {
//     setIsVisible(true);
//     // Simulate countdown timer
//     const timer = setInterval(() => {
//       setCountdown(prev => {
//         const [h, m, s] = prev.split(':').map(Number);
//         if (h === 0 && m === 0 && s === 0) return "00:00:00";
//         const total = h * 3600 + m * 60 + s - 1;
//         const hours = Math.floor(total / 3600);
//         const minutes = Math.floor((total % 3600) / 60);
//         const seconds = total % 60;
//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   if (!trek) return null;

//   const diffColors = {
//     easy: { text: "text-emerald-600", bg: "bg-emerald-50", emoji: "🌱", label: "Easy" },
//     moderate: { text: "text-amber-600", bg: "bg-amber-50", emoji: "⛰️", label: "Moderate" },
//     challenging: { text: "text-orange-600", bg: "bg-orange-50", emoji: "🏔️", label: "Challenging" },
//     difficult: { text: "text-red-600", bg: "bg-red-50", emoji: "❄️", label: "Difficult" },
//     extreme: { text: "text-purple-600", bg: "bg-purple-50", emoji: "⚡", label: "Extreme" },
//   };
//   const diff = diffColors[(trek.difficulty || "moderate").toLowerCase()] || diffColors.moderate;

//   return (
//     <div className={`w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200 shadow-sm sticky top-0 z-50 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
//       {/* Animated Progress Bar */}
//       <div className="relative h-0.5 w-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 overflow-hidden">
//         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
//         <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">

//           {/* Left Section - Trek Identity */}
//           <div className="flex items-center gap-4 flex-1 min-w-0">
//             {/* Animated Icon */}
//             <div className="relative flex-shrink-0">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl animate-float shadow-lg">
//                 {diff.emoji}
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse border-2 border-white"></div>
//             </div>

//             {/* Title and Location */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate hover:text-clip">
//                   {trek.title}
//                 </h2>
//                 <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${diff.bg} ${diff.text} flex items-center gap-1 animate-pulse-slow`}>
//                   <span>{diff.emoji}</span>
//                   <span>{diff.label}</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
//                 <div className="flex items-center gap-1">
//                   <span>📍</span>
//                   <span className="truncate max-w-[120px] sm:max-w-none">{trek.location}</span>
//                 </div>
//                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
//                 <div className="flex items-center gap-1">
//                   <span>⏱️</span>
//                   <span>{trek.duration}</span>
//                 </div>
//                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
//                 <div className="flex items-center gap-1">
//                   <span className="text-amber-400">⭐</span>
//                   <span>{trek.rating || 4.8} ({trek.reviews || 128})</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Middle Section - Quick Info */}
//           <div className="hidden lg:flex items-center gap-6">
//             <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in">
//               <div className="text-center">
//                 <div className="text-xs text-slate-500 mb-1">Altitude</div>
//                 <div className="font-bold text-slate-900 flex items-center gap-1">
//                   <span>🏔️</span>
//                   <span>{trek.elevation || "4,200m"}</span>
//                 </div>
//               </div>
//               <div className="w-px h-8 bg-slate-200"></div>
//               <div className="text-center">
//                 <div className="text-xs text-slate-500 mb-1">Group</div>
//                 <div className="font-bold text-slate-900 flex items-center gap-1">
//                   <span>👥</span>
//                   <span>{trek.groupSize || "4-12"}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Limited Offer Timer */}
//             <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-xl border border-red-200 animate-pulse-slow">
//               <span className="text-lg animate-spin-slow">⏳</span>
//               <div>
//                 <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Limited Offer</div>
//                 <div className="font-mono font-bold text-red-700 text-sm">{countdown}</div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Price and Actions */}
//           <div className="flex items-center gap-3 flex-shrink-0">
//             {/* Price */}
//             <div className="text-right hidden sm:block">
//               <div className="text-xs text-slate-500">Starting from</div>
//               <div className="flex items-baseline gap-2">
//                 <span className="text-2xl font-black text-slate-900">₹{(trek?.feeDetails?.totalFee || 25999).toLocaleString()}</span>
//                 <span className="text-xs text-slate-400 line-through">₹{(trek?.feeDetails?.originalPrice || 32999).toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Wishlist Button */}
//             <button
//               onClick={onWishlist}
//               className={`relative group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 transform hover:scale-110 ${
//                 trek.isWishlisted
//                   ? "bg-red-500 text-white"
//                   : "bg-white border-2 border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500"
//               }`}
//             >
//               <span className={`text-lg transition-all duration-300 ${trek.isWishlisted ? 'animate-bounce' : ''}`}>
//                 {trek.isWishlisted ? "❤️" : "🤍"}
//               </span>
//               {trek.isWishlisted && (
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
//               )}
//             </button>

//             {/* Book Now Button */}
//             <button
//               onClick={onBookNow}
//               className="relative group px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg group-hover:rotate-12 transition-transform">🎒</span>
//                 <span>Book Now</span>
//                 <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Quick Info */}
//         <div className="lg:hidden flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1 text-xs">
//               <span>🏔️</span>
//               <span>{trek.elevation || "4,200m"}</span>
//             </div>
//             <span className="w-px h-4 bg-slate-200"></span>
//             <div className="flex items-center gap-1 text-xs">
//               <span>👥</span>
//               <span>{trek.groupSize || "4-12"}</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs text-red-600 font-bold">🔥 Limited Time</span>
//             <span className="font-mono text-xs font-bold text-red-700">{countdown}</span>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Border Animation */}
//       <div className="relative h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer-slow"></div>
//       </div>
//     </div>

//   );
// };

// export default TrekIntroCard;

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

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
          {/* Left Section - Trek Identity */}
          <div className="flex items-center gap-5 flex-1 min-w-0">
            {/* Title and Location */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-2xl font-bold text-gray-900 truncate hover:text-clip tracking-tight">
                  {trek.title}
                </h2>
                <div
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${diff.bg} ${diff.text} border ${diff.border} shadow-sm`}
                >
                  {diff.label}
                </div>
              </div>

              <div className="flex items-center gap-5 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">📍</span>
                  <span className="font-medium">{trek.location}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">⏱️</span>
                  <span className="font-medium">{trek.duration}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>

                {/* 🌤️ Season */}
                {trek.season && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    <span>🌤️</span>
                    <span>{trek.season}</span>
                  </div>
                )}

                <div className="flex flex-col items-start gap-2">
                  {/* 🏷️ Tags */}
                  {trek.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {trek.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2.5 py-1 rounded-full 
                     bg-sky-50 text-sky-600 border border-sky-100
                     hover:bg-sky-500 hover:text-white transition-all duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* <div className="flex items-center gap-1.5">
                  <span className="text-amber-500">⭐</span> */}
                {/* <span className="font-medium text-gray-900">{trek.rating || 4.8}</span>
                  <span className="text-gray-500 text-xs">({trek.reviews || 128})</span> */}
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Middle Section - Premium Info Cards */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Altitude & Group Card */}
            <div className="flex items-center gap-5 px-5 py-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-center">
                <div className="text-xs font-medium text-gray-500 mb-1 tracking-wider">
                  ALTITUDE
                </div>
                <div className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                  <span className="text-gray-600">🏔️</span>
                  <span>{trek.altitude || "N/A"}</span>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-xs font-medium text-gray-500 mb-1 tracking-wider">
                  GROUP SIZE
                </div>
                <div className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                  <span className="text-gray-600">👥</span>
                  <span>{trek.groupSize || "4-12"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Premium Price & Actions */}
          <div className="flex items-center gap-4 flex-shrink-0 bg-gradient-to-br from-gray-50 to-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
            {/* Price */}
            <div className="text-right">
              <div className="text-xs font-medium text-gray-500 mb-1 tracking-wider">
                STARTING FROM
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">
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
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm overflow-hidden shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
              >
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
