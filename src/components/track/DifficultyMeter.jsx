// import React from "react";

// const DifficultyMeter = ({ trek }) => {
//   // Difficulty mapping with blue shades
// const difficultyMap = {
//   Easy: { 
//     pct: 25, 
//     badge: "bg-green-100 text-green-700", 
//     gradient: ["#22c55e", "#4ade80"] 
//   },
//   Moderate: { 
//     pct: 55, 
//     badge: "bg-yellow-100 text-yellow-700", 
//     gradient: ["#facc15", "#f59e0b"] 
//   },
//   Difficult: { 
//     pct: 85, 
//     badge: "bg-red-100 text-red-700", 
//     gradient: ["#ef4444", "#dc2626"] 
//   },
// };

//   const diff = difficultyMap[trek?.difficulty] || {
//     pct: 45,
//     badge: "bg-blue-100 text-blue-700",
//     color: "from-blue-400 to-blue-500",
//     successRate: "85%",
//   };

//   // Calculate needle rotation (0° to 180°)
//   const needleRotation = (diff.pct / 100) * 180;

//   return (
//     <div className="relative overflow-hidden bg-white rounded-2xl border-2 border-blue-800 shadow-lg p-6 group hover:shadow-xl transition-all duration-500">

//       {/* Background Accent */}
//       <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100/50 via-cyan-100/50 to-indigo-100/50 rounded-full blur-2xl -translate-y-16 translate-x-16 pointer-events-none group-hover:scale-110 transition-transform"></div>

//       {/* Header */}
//       <div className="relative flex items-center justify-between mb-6">
//         <div>
//           <h3 className="text-sm font-semibold text-gray-700">Difficulty Level</h3>
//           <p className="text-xs text-gray-400 mt-0.5">Based on technical requirements</p>
//         </div>
//         <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${diff.badge}`}>
//           {trek?.difficulty || "Moderate"}
//         </div>
//       </div>

//       {/* Gauge Container */}
//       <div className="relative flex justify-center py-4">
//         {/* Semi-circle Gauge */}
//         <div className="relative w-56 h-28">
//           {/* SVG Gauge */}
//           <svg viewBox="0 0 200 100" className="w-full h-full">
//             {/* Background Arc */}
//             <path
//               d="M 20 80 A 70 70 0 0 1 180 80"
//               fill="none"
//               stroke="#EFF6FF" // blue-50
//               strokeWidth="14"
//               strokeLinecap="round"
//             />

//             {/* Colored Progress Arc */}
//             <path
//               d="M 20 80 A 70 70 0 0 1 180 80"
//               fill="none"
//               stroke={`url(#gradient-${trek?.difficulty || 'Moderate'})`}
//               strokeWidth="14"
//               strokeLinecap="round"
//               strokeDasharray="219.8" // Circumference for half circle
//               strokeDashoffset={219.8 - (219.8 * diff.pct) / 100}
//               className="transition-all duration-1000 ease-out"
//             />

//             {/* Gradient Definition */}
//             <defs>
//            <linearGradient
//   id={`gradient-${trek?.difficulty || "Moderate"}`}
//   x1="0%"
//   y1="0%"
//   x2="100%"
//   y2="0%"
// >
//   <stop offset="0%" stopColor={diff.gradient[0]} />
//   <stop offset="100%" stopColor={diff.gradient[1]} />
// </linearGradient>
//             </defs>

//             {/* Scale Markers */}
//             {[0, 25, 50, 75, 100].map((marker, i) => {
//               const angle = (marker / 100) * Math.PI;
//               const x = 100 + 60 * Math.cos(angle - Math.PI/2);
//               const y = 80 + 60 * Math.sin(angle - Math.PI/2);
//               return (
//                 <g key={i}>
//                   <circle cx={x} cy={y} r="2" fill="#94A3B8" className="opacity-50" />
//                 </g>
//               );
//             })}
//           </svg>

//           {/* Needle Container */}
//           <div 
//             className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-1000 ease-out"
//             style={{ 
//               transform: `translateX(-50%) rotate(${needleRotation - 90}deg)`,
//               bottom: '0px',
//               left: '50%'
//             }}
//           >
//             {/* Needle */}
//             <div className="relative w-0.5 h-20 bg-gray-800 rounded-full">
//               <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-gray-800 rounded-full"></div>
//             </div>
//           </div>

//           {/* Center Pivot */}
//           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-5 h-5 bg-white border-2 border-gray-800 rounded-full shadow-md z-10"></div>

//           {/* Percentage Display */}
//           <div className="absolute inset-x-0 bottom-0 text-center mb-2">
//             <span className="text-2xl font-bold text-gray-800">{diff.pct}%</span>
//           </div>
//         </div>
//       </div>

//       {/* Scale Labels */}
//      <div className="flex justify-between px-6 mt-4 text-xs">
//   <span className="font-semibold text-green-600">Easy</span>
//   <span className="font-semibold text-yellow-600">Moderate</span>
//   <span className="font-semibold text-red-600">Difficult</span>
// </div>

//       {/* Stats Grid */}
   

//       {/* Subtle Bottom Accent */}
//       <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 rounded-full"></div>
//     </div>
//   );
// };

// export default DifficultyMeter;

import React from "react";

const DifficultyMeter = ({ trek }) => {
  // Difficulty mapping with green-yellow-red shades
  const difficultyMap = {
    Easy: { 
      pct: 20, 
      badge: "bg-green-100 text-green-700", 
      gradient: ["#22c55e", "#84cc16"], // green to light green
      color: "text-green-600"
    },
    Moderate: { 
      pct: 50, 
      badge: "bg-yellow-100 text-yellow-700", 
      gradient: ["#facc15", "#f59e0b"], // yellow to orange
      color: "text-yellow-600"
    },
    Difficult: { 
      pct: 85, 
      badge: "bg-red-100 text-red-700", 
      gradient: ["#ef4444", "#b91c1c"], // red to dark red
      color: "text-red-600"
    },
  };

  const diff = difficultyMap[trek?.difficulty] || difficultyMap.Moderate;

  // Calculate needle rotation (0° to 180°)
  // Easy: 0-33% → 0-60°, Moderate: 33-66% → 60-120°, Difficult: 66-100% → 120-180°
  const needleRotation = (diff.pct / 100) * 180;

  // Get gradient colors for the arc
  const getGradientColors = () => {
    return {
      easy: "#22c55e",
      moderate: "#facc15",
      difficult: "#ef4444"
    };
  };

  const colors = getGradientColors();

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border-2 border-blue-800 shadow-lg p-4 group hover:shadow-xl transition-all duration-500">

      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-green-100/30 via-yellow-100/30 to-red-100/30 rounded-full blur-2xl -translate-y-16 translate-x-16 pointer-events-none group-hover:scale-110 transition-transform"></div>

      {/* Header */}
{/* Header */}
<div className="-mx-6 -mt-6 mb-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-b border-blue-800 px-6 py-4 rounded-t-2xl flex items-center justify-between">
  <div>
    <h3 className="text-sm font-semibold text-white">Difficulty Level</h3>
    <p className="text-xs text-blue-200 mt-0.5">
      Based on technical requirements
    </p>
  </div>

  <div
    className={`px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm bg-white border border-white/20 ${diff.badge}`}
  >
    {trek?.difficulty || "Moderate"}
  </div>
</div>

      {/* Gauge Container */}
      <div className="relative flex justify-center py-2">
        {/* Semi-circle Gauge */}
        <div className="relative w-56 h-28">
          {/* SVG Gauge */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background Arc */}
            {/* <path
              d="M 20 80 A 70 70 0 0 1 180 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="14"
              strokeLinecap="round"
              strokeOpacity="0.3"
            /> */}

            {/* Green Section (Easy) */}
            <path
              d="M 20 80 A 70 70 0 0 1 73.3 25.6"
              fill="none"
              stroke={colors.easy}
              strokeWidth="14"
              strokeLinecap="round"
              className="transition-all duration-500"
            />

            {/* Yellow Section (Moderate) */}
            <path
              d="M 73.3 25.6 A 70 70 0 0 1 126.7 25.6"
              fill="none"
              stroke={colors.moderate}
              strokeWidth="14"
              strokeLinecap="round"
              className="transition-all duration-500"
            />

            {/* Red Section (Difficult) */}
            <path
              d="M 126.7 25.6 A 70 70 0 0 1 180 80"
              fill="none"
              stroke={colors.difficult}
              strokeWidth="14"
              strokeLinecap="round"
              className="transition-all duration-500"
            />

            {/* Progress Indicator - Colored based on difficulty */}
            <path
              d="M 20 80 A 70 70 0 0 1 180 80"
              fill="none"
              stroke={`url(#gradient-${trek?.difficulty || 'Moderate'})`}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="219.8"
              strokeDashoffset={219.8 - (219.8 * diff.pct) / 100}
              className="transition-all duration-1000 ease-out opacity-30"
            />

            {/* Gradient Definition */}
            {/* <defs>
              <linearGradient id={`gradient-${trek?.difficulty || 'Moderate'}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.easy} />
                <stop offset="50%" stopColor={colors.moderate} />
                <stop offset="100%" stopColor={colors.difficult} />
              </linearGradient>
            </defs> */}

            {/* Scale Markers */}
            {/* {[0, 25, 50, 75, 100].map((marker, i) => {
              const angle = (marker / 100) * Math.PI;
              const x = 100 + 60 * Math.cos(angle - Math.PI/2);
              const y = 80 + 60 * Math.sin(angle - Math.PI/2);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="2" fill="#64748b" />
                </g>
              );
            })} */}
          </svg>

          {/* Needle Container */}
          <div 
            className="absolute bottom-0 left-1/2 origin-bottom transition-transform duration-1000 ease-out z-20"
            style={{ 
              transform: `translateX(-50%) rotate(${needleRotation - 90}deg)`,
              bottom: '0px',
              left: '50%'
            }}
          >
            {/* Needle */}
            <div className="relative w-0.5 h-20">
              {/* Needle Line */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-600 rounded-full"></div>
              {/* Needle Head */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Center Pivot */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-5 h-5 bg-white border-2 border-gray-800 rounded-full shadow-md z-30"></div>

          {/* Percentage Display */}
          <div className="absolute inset-x-0 bottom-0 text-center mb-2">
            <span className="text-2xl font-bold text-gray-800">{diff.pct}%</span>
          </div>
        </div>
      </div>

      {/* Zone Labels */}
      <div className="flex justify-between px-4 mt-2">
        <div className="text-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1"></div>
          <span className="text-xs font-medium text-green-600">Easy</span>
          <span className="text-[10px] text-gray-400 block">0-33%</span>
        </div>
        <div className="text-center">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mb-1"></div>
          <span className="text-xs font-medium text-yellow-600">Moderate</span>
          <span className="text-[10px] text-gray-400 block">34-66%</span>
        </div>
        <div className="text-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-1"></div>
          <span className="text-xs font-medium text-red-600">Difficult</span>
          <span className="text-[10px] text-gray-400 block">67-100%</span>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Elevation</div>
          <div className="font-semibold text-gray-800">{trek?.elevation || "4,200m"}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Duration</div>
          <div className="font-semibold text-gray-800">{trek?.duration || "12 days"}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Difficulty</div>
          <div className={`font-semibold ${diff.color}`}>{trek?.difficulty || "Moderate"}</div>
        </div>
      </div> */}

      {/* Zone Indicators */}
      <div className="flex gap-1 mt-4">
        <div className={`h-1 flex-1 rounded-l-full ${diff.pct >= 20 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        <div className={`h-1 flex-1 ${diff.pct >= 50 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
        <div className={`h-1 flex-1 rounded-r-full ${diff.pct >= 85  ? 'bg-red-500' : 'bg-gray-200'}`}></div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full"></div>
    </div>
  );
};

export default DifficultyMeter;