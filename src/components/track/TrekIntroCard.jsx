// // import { Phone, Share2, MapPin, Star } from "lucide-react";
// // import React from "react";

// // const TrekIntroCard = () => {
// //   return (
// //     <div className="bg-white">
// //       <div className="max-w-7xl mx-auto px-6 py-6">
// //         <div className="flex flex-col lg:flex-row justify-between gap-6">
// //           {/* LEFT */}
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900">Brahmatal Trek</h1>

// //             <p className="text-gray-500 mt-1">
// //               Winter Trek · Snow Trek · Uttarakhand
// //             </p>

// //             <p className="text-sm text-gray-500 mt-1">
// //               Lohajung Base Camp, Chamoli, Uttarakhand
// //             </p>

// //             <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
// //               <span className="text-green-600 font-semibold">
// //                 Best Season · Dec – Mar
// //               </span>
// //               <span className="text-gray-600">Duration · 6 Days</span>
// //               <span className="flex items-center gap-1 text-red-500">
// //                 <Phone size={15} /> +91 9356412002
// //               </span>
// //             </div>
// //           </div>

// //           {/* RIGHT – RATINGS */}
// //           <div className="flex gap-3">
// //             <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex flex-col items-center justify-center">
// //               <div className="flex items-center justify-center gap-1 font-semibold text-sm">
// //                 4.8 <Star size={14} fill="white" />
// //               </div>
// //               <p className="text-xs mt-0">120 Reviews</p>
// //             </div>
// //             <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex flex-col items-center justify-center">
// //               <div className="flex items-center justify-center gap-1 font-semibold text-sm">
// //                 4.7 <Star size={14} fill="white" />
// //               </div>
// //               <p className="text-xs mt-0">Safety</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex flex-wrap gap-3 mt-5">
// //           <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
// //             <MapPin size={16} /> Trek Route
// //           </button>

// //           <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
// //             <Share2 size={16} /> Group Session
// //           </button>

// //           <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
// //             View Fees
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrekIntroCard;



// import React from "react";
// import { Phone, Share2, MapPin, Star } from "lucide-react";

// const TrekIntroCard = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between gap-6">
//       {/* LEFT */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Brahmatal Trek</h1>
//         <p className="text-gray-500 mt-1">Winter Trek · Snow Trek · Uttarakhand</p>
//         <p className="text-sm text-gray-500 mt-1">
//           Lohajung Base Camp, Chamoli, Uttarakhand
//         </p>

//         <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
//           <span className="text-green-600 font-semibold">Best Season · Dec – Mar</span>
//           <span className="text-gray-600">Duration · 6 Days</span>
//           <span className="flex items-center gap-1 text-red-500">
//             <Phone size={15} /> +91 9356412002
//           </span>
//         </div>
//       </div>

//       {/* RIGHT RATINGS */}
//       <div className="flex gap-3">
//         <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex flex-col items-center justify-center">
//           <div className="flex items-center justify-center gap-1 font-semibold text-sm">
//             4.8 <Star size={14} fill="white" />
//           </div>
//           <p className="text-xs mt-0">120 Reviews</p>
//         </div>
//         <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex flex-col items-center justify-center">
//           <div className="flex items-center justify-center gap-1 font-semibold text-sm">
//             4.7 <Star size={14} fill="white" />
//           </div>
//           <p className="text-xs mt-0">Safety</p>
//         </div>
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="flex flex-wrap gap-3 mt-5 lg:mt-0">
//         <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
//           <MapPin size={16} /> Trek Route
//         </button>
//         <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
//           <Share2 size={16} /> Group Session
//         </button>
//         <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
//           View Fees
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TrekIntroCard;


import {
  Phone,
  Share2,
  MapPin,
  Star,
  ChevronRight,
  Bookmark,
  ArrowLeft,
  Calendar,
  Clock,
  Zap,
  CheckCircle2
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TrekIntroCard = ({ onBookNow, trek }) => {
  const navigate = useNavigate();

  if (!trek) return null;

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Left Section - Trek Details */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {trek.tags?.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-100">
                  {trek.location?.split(',').pop().trim()}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {trek.title}
              </h1>

              <p className="text-gray-500 mt-2 flex items-center text-sm font-medium">
                <MapPin size={16} className="mr-2 text-red-500" />
                {trek.location}
              </p>
            </div>

            {/* Features/Quick Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex justify-center text-center">
              <div className="flex flex-col p-2 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Best Season</span>
                <span className="text-sm font-semibold text-gray-900">{trek.season}</span>
              </div>

              <div className="flex flex-col p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Duration</span>
                <span className="text-sm font-semibold text-gray-900">{trek.duration}</span>
              </div>

              <div className="flex flex-col p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Difficulty</span>
                <span className="text-sm font-semibold text-gray-900">{trek.difficulty}</span>
              </div>

              <div className="flex flex-col p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Altitude</span>
                <span className="text-sm font-semibold text-gray-900">{trek.altitude}</span>
              </div>
            </div>

            {/* Rating Badges */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className={`${s <= Math.floor(trek.rating || 4) ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{trek.rating || "4.8"}</span>
                <span className="text-xs text-gray-400 font-medium">({trek.reviews || "120"} Reviews)</span>
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-wide">{trek.status || "Ongoing"}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Pricing and Action Card */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-500"></div>

              <div className="relative z-10">
                <div className="my-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-500 text-sm font-medium">From</span>
                    <span className="text-2xl font-black text-gray-900">₹{trek.price?.toLocaleString()}</span>
                  </div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">per person • All inclusive</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onBookNow}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base transition-all transform hover:translate-y-[-2px] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Book Your Adventure</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekIntroCard;
