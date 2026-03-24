// import React, { useState } from "react";
// import {
//   ShieldCheck, Clock, Calendar, ChevronDown, Activity,
//   CheckCircle, AlertCircle, Zap, IndianRupee, Users, ArrowRight
// } from "lucide-react";

// const TrekFeeSidebar = ({ trek }) => {
//   const [openMonth, setOpenMonth] = useState(null);
//   if (!trek) return null;

//   const totalFee = trek?.feeDetails?.totalFee || 0;
//   const trekMonths = trek.months || [];

//   return (
//     <div className="space-y-6">
//       {/* Price header */}
//       <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-200 p-7 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-28 h-28 bg-sky-200/40 rounded-full translate-x-10 -translate-y-10 blur-2xl pointer-events-none" />
//         <div className="relative z-10">
//           <div className="text-[10px] text-sky-500 font-bold uppercase tracking-widest mb-3">Total Package Price</div>
//           <div className="flex items-baseline gap-2 mb-2">
//             <span className="text-sky-600 font-bold text-xl">₹</span>
//             <span className="text-5xl font-bold text-sky-900 tracking-tight">{totalFee.toLocaleString()}</span>
//             <span className="text-sky-400 text-sm font-semibold">/ person</span>
//           </div>
//           <div className="flex items-center gap-2 text-emerald-600">
//             <ShieldCheck className="w-3.5 h-3.5" />
//             <span className="text-xs font-semibold">Includes GST & Basic Insurance</span>
//           </div>
//         </div>
//       </div>

//       {/* Fee breakdown */}
//       <div className="space-y-3">
//         {[
//           { icon: ShieldCheck, label: "Insurance Coverage", val: trek.feeDetails?.insurance?.amount ? `₹${trek.feeDetails.insurance.amount.toLocaleString()}` : "Standard Plan", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
//           { icon: Clock, label: "Discount Percentage", val: trek.feeDetails?.discount?.value ? `${trek.feeDetails.discount.value}%` : "N/A", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
//         ].map((item, i) => {
//           const Icon = item.icon;
//           return (
//             <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${item.bg} border ${item.border}`}>
//               <div className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
//                 <Icon className={`w-4 h-4 ${item.color}`} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">{item.label}</div>
//                 <div className="text-sky-800 font-bold text-sm">{item.val}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Batch windows */}
//       {trekMonths.length > 0 && (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Calendar className="w-4 h-4 text-sky-500" />
//               <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">Available Batches</h4>
//             </div>
//             <span className="px-2.5 py-1 bg-sky-100 text-sky-600 text-[10px] font-bold rounded-full">
//               {trekMonths.length} windows
//             </span>
//           </div>

//           <div className="space-y-2.5">
//             {trekMonths.map((m, i) => (
//               <div
//                 key={i}
//                 className={`rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer
//                   ${openMonth === i
//                     ? 'border-sky-300 bg-sky-50 shadow-md shadow-sky-100'
//                     : 'border-sky-100 bg-white hover:border-sky-200'
//                   }`}
//                 onClick={() => setOpenMonth(openMonth === i ? null : i)}
//               >
//                 <div className="flex items-center justify-between p-4">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
//                       ${openMonth === i ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-500 border border-sky-200'}`}>
//                       <Calendar className="w-4 h-4" />
//                     </div>
//                     <div>
//                       <p className={`font-bold text-sm ${openMonth === i ? 'text-sky-700' : 'text-sky-900'}`}>{m.month}</p>
//                       <p className="text-[11px] text-sky-400 font-semibold">{m.season}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {m.badge && (
//                       <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">{m.badge}</span>
//                     )}
//                     <ChevronDown className={`w-4 h-4 text-sky-400 transition-transform duration-300 ${openMonth === i ? 'rotate-180 text-sky-600' : ''}`} />
//                   </div>
//                 </div>

//                 {openMonth === i && (
//                   <div className="px-4 pb-4 pt-1">
//                     <div className="bg-white rounded-xl border border-sky-200 p-4 space-y-3">
//                       <div className="flex items-center justify-between text-xs">
//                         <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
//                           <Activity className="w-3.5 h-3.5 animate-pulse" />
//                           {m.slotsAvailable ? 'Slots Available' : 'Fully Booked'}
//                         </div>
//                         <span className="text-sky-400">Max 12 people</span>
//                       </div>
//                       <button
//                         disabled={!m.slotsAvailable}
//                         className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
//                           ${m.slotsAvailable
//                             ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600 hover:shadow-md hover:shadow-sky-200'
//                             : 'bg-sky-50 text-sky-300 cursor-not-allowed border border-sky-100'
//                           }`}
//                       >
//                         {m.slotsAvailable ? 'Book This Batch' : 'Batch Full'}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Quick links */}
//       {/* Quick links */}
//       <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sky-100">
//         {[
//           { label: "Inclusions", key: "inclusions" },
//           { label: "Cancellation", key: "cancellation" },
//           { label: "Terms", key: "terms" },
//           { label: "Scholarships", key: "scholarships" },
//         ].map((link) => {
//           const fileData = trek.links?.[link.key];

//           // Use cdnUrl from response
//           const cdnUrl = fileData?.cdnUrl || null;

//           return (
//             <a
//               key={link.key}
//               href={cdnUrl || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`flex items-center gap-2 text-sky-500 text-xs font-semibold hover:text-sky-700 transition-colors group ${!cdnUrl ? "cursor-not-allowed opacity-50" : ""
//                 }`}
//               onClick={(e) => {
//                 if (!cdnUrl) e.preventDefault();
//               }}
//             >
//               <div className="w-1.5 h-1.5 rounded-full bg-sky-200 group-hover:bg-sky-500 transition-colors" />
//               {link.label}
//             </a>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TrekFeeSidebar;


import React, { useState } from "react";
import {
  ShieldCheck, Clock, Calendar, ChevronDown, Activity,
  CheckCircle, AlertCircle, Zap, IndianRupee, Users, ArrowRight,
  Mountain, Compass, MapPin, Sun, Cloud, Wind
} from "lucide-react";

const TrekFeeSidebar = ({ trek }) => {
  const [openMonth, setOpenMonth] = useState(null);
  if (!trek) return null;

  const totalFee = trek?.feeDetails?.totalFee || 0;
  const trekMonths = trek.months || [];

  // Helper to get season icon
  const getSeasonIcon = (season) => {
    switch (season?.toLowerCase()) {
      case 'spring': return <Sun className="w-3.5 h-3.5" />;
      case 'summer': return <Sun className="w-3.5 h-3.5" />;
      case 'autumn': return <Wind className="w-3.5 h-3.5" />;
      case 'winter': return <Cloud className="w-3.5 h-3.5" />;
      default: return <Calendar className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-5 font-sans">

      {/* ===== PRICE CARD ===== */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 overflow-hidden shadow-sm">
        {/* Decorative mountain silhouette */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <Mountain className="w-24 h-24 text-amber-700" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] font-medium text-amber-600 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded-full">
              Expedition Fee
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-amber-700 font-semibold text-lg">₹</span>
            <span className="text-3xl font-bold text-amber-900">{totalFee.toLocaleString()}</span>
            <span className="text-amber-600 text-xs font-medium ml-1">/person</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium">Includes GST & basic insurance</span>
          </div>
        </div>
      </div>

      {/* ===== FEE BREAKDOWN ===== */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
          Fee Details
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            {
              icon: ShieldCheck,
              label: "Insurance",
              value: trek.feeDetails?.insurance?.amount ? `₹${trek.feeDetails.insurance.amount.toLocaleString()}` : "Included",
              color: "emerald"
            },
            {
              icon: Clock,
              label: "Discount",
              value: trek.feeDetails?.discount?.value ? `${trek.feeDetails.discount.value}%` : "No discount",
              color: "amber"
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`bg-${item.color}-50 rounded-lg p-3 border border-${item.color}-100`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-3.5 h-3.5 text-${item.color}-600`} />
                  <span className="text-[10px] font-medium text-slate-500 uppercase">{item.label}</span>
                </div>
                <span className={`text-sm font-semibold text-${item.color}-700 block`}>{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== BATCHES SECTION ===== */}
      {trekMonths.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
              Available Batches
            </h4>
            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
              {trekMonths.length} {trekMonths.length === 1 ? 'window' : 'windows'}
            </span>
          </div>

          <div className="space-y-2">
            {trekMonths.map((m, i) => (
              <div
                key={i}
                className={`border rounded-lg overflow-hidden transition-all duration-200 cursor-pointer
                  ${openMonth === i
                    ? 'border-amber-200 bg-amber-50/30 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-amber-200'
                  }`}
                onClick={() => setOpenMonth(openMonth === i ? null : i)}
              >
                {/* Batch Header */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                      ${openMonth === i ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${openMonth === i ? 'text-amber-700' : 'text-slate-700'}`}>
                        {m.month}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        {getSeasonIcon(m.season)}
                        <span>{m.season || 'All Season'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {m.badge && (
                      <span className="text-[9px] font-medium bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                        {m.badge}
                      </span>
                    )}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 
                      ${openMonth === i ? 'rotate-180 text-amber-500' : ''}`} />
                  </div>
                </div>

                {/* Expanded Content */}
                {openMonth === i && (
                  <div className="px-3 pb-3 pt-0">
                    <div className="bg-white rounded-lg border border-slate-200 p-3">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center gap-1.5">
                          <Activity className={`w-3.5 h-3.5 ${m.slotsAvailable ? 'text-emerald-500' : 'text-rose-500'}`} />
                          <span className={`font-medium ${m.slotsAvailable ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {m.slotsAvailable ? 'Slots Available' : 'Fully Booked'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Max 12</span>
                        </div>
                      </div>

                      <button
                        disabled={!m.slotsAvailable}
                        className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5
                          ${m.slotsAvailable
                            ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                      >
                        {m.slotsAvailable ? (
                          <>
                            <span>Book This Batch</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          'Batch Full'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== QUICK LINKS ===== */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-3">
          <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
          Quick Links
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Inclusions", key: "inclusions", icon: CheckCircle },
            { label: "Cancellation", key: "cancellation", icon: AlertCircle },
            { label: "Terms", key: "terms", icon: ShieldCheck },
            { label: "Scholarships", key: "scholarships", icon: Compass },
          ].map((link) => {
            const fileData = trek.links?.[link.key];
            const cdnUrl = fileData?.cdnUrl || null;
            const Icon = link.icon;

            return (
              <a
                key={link.key}
                href={cdnUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all group
                  ${cdnUrl
                    ? 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
                    : 'text-slate-300 cursor-not-allowed'
                  }`}
                onClick={(e) => !cdnUrl && e.preventDefault()}
              >
                <Icon className={`w-3.5 h-3.5 ${cdnUrl ? 'group-hover:text-amber-500' : ''}`} />
                <span className="font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ===== TREKKING TIP ===== */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mt-4">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Trekker's Tip</p>
            <p className="text-xs text-slate-600">Book at least 30 days in advance for best batch availability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekFeeSidebar;