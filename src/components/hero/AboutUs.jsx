import React, { useEffect, useRef, useState } from "react";
import {
  Terminal,
  Activity,
  Shield,
  Award,
  Map,
  Info,
  Compass,
  Zap,
  Target,
  Mountain,
  Star,
  Sparkles,
  MountainIcon,
  MousePointer,
  MountainSnow,
} from "lucide-react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const AboutUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [missionData, setMissionData] = useState(null);
  const sectionRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch mission & vision data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/api/mission-vision");
        if (res.data.success) {
          setMissionData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching mission data:", err);
      }
    };
    fetchData();
  }, []);

  const stats = missionData
    ? [
        {
          label: "PEAKS CONQUERED",
          value: missionData.peaksConquered,
          icon: MountainSnow,
          color: "from-sky-400 to-blue-400",
        },
        {
          label: "EXPEDITIONS",
          value: missionData.expeditions,
          icon: Compass,
          color: "from-blue-400 to-indigo-400",
        },
        {
          label: "HAPPY TREKKERS",
          value: missionData.happyTrekkers,
          icon: Star,
          color: "from-indigo-400 to-purple-400",
        },
        {
          label: "YEARS OF GLORY",
          value: missionData.yearsOfGlory,
          icon: Award,
          color: "from-purple-400 to-pink-400",
        },
      ]
    : [];

//   return (
//     <section
//       id="about"
//       ref={sectionRef}
//       className="relative py-12 overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 30%, #0A4B72 70%, #0B5B86 100%)",
//       }}
//     >
//       {/* ===== Dynamic Background Layers ===== */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* ===== Header Section ===== */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
//             <Sparkles className="w-4 h-4 text-sky-500" />
//             <span className="text-sky-700 text-xs font-medium tracking-wide">
//               {" "}
//               OUR MISSION & VISION{" "}
//             </span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-bold text-white leading-none tracking-tight mb-6">
//             {missionData ? (
//               <>
//                 {/* First part plain/white */}
//                 <span>{missionData.title.split(" ")[0]} </span>

//                 {/* Second part with gradient color */}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-600">
//                   {missionData.title.split(" ").slice(1).join(" ")}
//                 </span>
//               </>
//             ) : (
//               <>
//                 <span>Crafting </span>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-600">
//                   Mountain Legacies
//                 </span>
//               </>
//             )}
//           </h2>
//         </div>

//         {/* ===== Main Content with 3D Effect ===== */}
//         <div className="flex flex-col lg:flex-row items-center gap-16 mx-auto max-w-7xl">
//           {/* ===== Left Side - 3D Image Terminal ===== */}
//          <div className="lg:w-1/2 relative group perspective-[1400px]">

//   {/* ===== Soft Royal Ambient Glow ===== */}
//   <div className="absolute -inset-10 bg-gradient-to-br from-amber-100/10 via-sky-300/10 to-blue-500/10 blur-3xl opacity-40 group-hover:opacity-60 transition duration-700" />

//   {/* ===== Main 3D Stage ===== */}
//   <div className="relative transform-gpu transition-all duration-700 group-hover:[transform:rotateX(4deg)_rotateY(4deg)_translateY(-6px)]">

//     {/* ===== Royal Image Frame ===== */}
//     <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-[0_60px_140px_rgba(0,0,0,0.5)]">

//       <div className="relative rounded-[2.5rem] overflow-hidden bg-[#061a2b]">

//         {/* cinematic depth overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-10" />

//         {/* main image */}
//         <img
//           src={
//             missionData?.image?.cdnUrl ||
//             "https://images.pexels.com/photos/1081111/pexels-photo-1081111.jpeg"
//           }
//           alt="Mountain Expedition"
//           className="w-full h-[600px] object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
//         />

//         {/* subtle royal light sweep */}
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-1000">
//           <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shine_3s_ease-in-out]" />
//         </div>

//       </div>
//     </div>

//     {/* ===== LEFT ROYAL INFO PANEL (replaces floating stats) ===== */}
// <div className="absolute -left-14 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start gap-6">

//   {/* Vertical glowing line */}
//   <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-amber-400 via-amber-200/40 to-transparent blur-[1px]" />

//   {stats.slice(0, 2).map((stat, idx) => {
//     const Icon = stat.icon;

//     return (
//       <div
//         key={idx}
//         className="relative flex items-center gap-4 group"
//       >
//         {/* Glow dot */}
//         <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

//         {/* Floating stat */}
//         <div className="flex items-center gap-3 px-4 py-2 rounded-xl 
//                         bg-black/40 backdrop-blur-lg border border-amber-300/10
//                         shadow-[0_8px_30px_rgba(0,0,0,0.4)]
//                         group-hover:translate-x-1 transition">

//           <Icon className="w-4 h-4 text-amber-300" />

//           <div className="leading-tight">
//             <div className="text-[9px] tracking-[0.35em] text-amber-200/50 uppercase">
//               {stat.label}
//             </div>

//             <div className="text-sm font-semibold text-amber-100">
//               {stat.value}
//             </div>
//           </div>

//         </div>
//       </div>
//     );
//   })}
// </div>

//     {/* ===== RIGHT ROYAL INFO PANEL ===== */}
//     <div className="absolute -right-20 bottom-20 hidden xl:block">

//       <div className="relative w-[240px] p-[1px] rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-white/10">

//         <div className="bg-black/30 backdrop-blur-2xl rounded-2xl p-5 space-y-5 border border-white/10">

//           {stats.slice(2, 4).map((stat, idx) => {
//             const Icon = stat.icon;

//             return (
//               <div key={idx} className="flex items-center gap-4">
//                 <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
//                   <Icon className="w-5 h-5 text-white/80" />
//                 </div>

//                 <div>
//                   <div className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
//                     {stat.label}
//                   </div>
//                   <div className="text-xl font-semibold text-white">
//                     {stat.value}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//         </div>
//       </div>
//     </div>

//   </div>
// </div>

//           {/* ===== Right Side - Mission Cards ===== */}
//           <div className="lg:w-1/2 space-y-8">
//             {missionData?.missions?.map((mission, idx) => (
//               <div
//                 key={mission._id}
//                 className={`bg-white/5 backdrop-blur-sm border border-sky-400/30 rounded-3xl p-6 hover:border-sky-400/60 transition-all group/mission-${idx}`}
//               >
//                 <div className="flex items-start gap-6">
//                   <div
//                     className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center group-hover/mission-${idx}:scale-110 transition-transform shadow-lg shadow-sky-500/30`}
//                   >
//                     <Target className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <span className="text-xs font-bold text-sky-400 tracking-[0.3em]">{`MISSION_${idx + 1}`}</span>
//                       <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent"></div>
//                     </div>
//                     <h3 className="text-2xl font-bold text-white mb-4">
//                       {mission.title}
//                     </h3>
//                     <p
//                       className="text-sky-200/60 leading-relaxed"
//                       dangerouslySetInnerHTML={{ __html: mission.description }}
//                     ></p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ===== Custom Animations ===== */}
//       <style>{`
//         @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
//         @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.2);} }
//         @keyframes scan-fast { 0%{transform:translateY(-100%);}100%{transform:translateY(100%);} }
//         @keyframes gradient { 0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;} }
//         @keyframes pulse-slow { 0%,100%{opacity:0.3;transform:scale(1);}50%{opacity:0.5;transform:scale(1.1);} }
//         .animate-float { animation: float 5s ease-in-out infinite; }
//         .animate-float-delayed { animation: float 5s ease-in-out infinite; animation-delay:2s; }
//         .animate-scan-fast { animation: scan-fast 3s linear infinite; }
//         .animate-gradient { background-size:200% 200%; animation:gradient 3s ease infinite; }
//         .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
//         .perspective-1000 { perspective:1000px; }
//         .group:hover .rotateY-5 { transform: rotateY(5deg); }
//       `}</style>
//     </section>
//   );

return (
  <section
    id="about"
    ref={sectionRef}
    className="relative py-12 overflow-hidden bg-[#071826]"
  >
    {/* 🌫️ ATMOSPHERIC BACKGROUND */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2B4A] via-[#071826] to-black opacity-90" />

      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse-slow" />
    </div>

    <div className="container mx-auto px-6 relative z-10">

      {/* ===== HEADER ===== */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-300/80 border-2 border-emerald-300/50  p-2 rounded-full text-xs tracking-[0.4em] mb-2">
          <Sparkles className="w-4 h-4" />
          OUR MISSION & VISION
        </div>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="text-white/90">
            {missionData?.title?.split(" ")[0] || "Crafting"}
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
            {missionData?.title?.split(" ").slice(1).join(" ") || "Mountain Legacies"}
          </span>
        </h2>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

        {/* ===== LEFT: IMAGE (CINEMATIC) ===== */}
        <div className="relative group">

          {/* glow */}
          <div className="absolute -inset-10 bg-gradient-to-br from-amber-200/10 via-sky-300/10 to-blue-500/10 blur-3xl opacity-40 group-hover:opacity-60 transition duration-700" />

          <div className="relative overflow-hidden rounded-4xl border border-white/10 shadow-[0_60px_140px_rgba(0,0,0,0.6)]">

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />

            <img
              src={
                missionData?.image?.cdnUrl ||
                "https://images.pexels.com/photos/1081111/pexels-photo-1081111.jpeg"
              }
              className="w-full h-[460px] object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
            />

            {/* shine */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-1000">
              <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shine_3s_ease-in-out]" />
            </div>

          </div>

          {/* ===== INLINE STATS (PREMIUM STRIP) ===== */}
          <div className="absolute -bottom-10 left-1/2 z-50 -translate-x-1/2 w-[90%] bg-white/5 backdrop-blur-2xl border border-white/70 rounded-2xl p-4 flex justify-between shadow-xl">

            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center group">
                  <Icon className="w-5 h-5 mx-auto text-amber-300 mb-2 group-hover:scale-110 transition" />

                  <div className="text-sm text-white/70 ">
                    {stat.label}
                  </div>

                  <div className="text-lg font-bold text-white hover:text-amber-400 transition">
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== RIGHT: MISSION CONTENT ===== */}
        <div className="space-y-10">

          {missionData?.missions?.map((mission, idx) => (
            <div
              key={mission._id}
              className="group relative"
            >
              {/* line indicator */}
              <div className="absolute -left-6 top-2 w-[2px] h-full bg-gradient-to-b from-amber-400 to-transparent opacity-40" />

              <div className="pl-6">
                <div className="text-xs tracking-[0.4em] text-amber-300 mb-3">
                  MISSION_{idx + 1}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition">
                  {mission.title}
                </h3>

                <p
                  className="text-white/60 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: mission.description }}
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>

    {/* ===== ANIMATIONS ===== */}
    <style>{`
      @keyframes pulse-slow {
        0%,100% { opacity:0.25; }
        50% { opacity:0.4; }
      }

      @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }

      .animate-pulse-slow {
        animation: pulse-slow 6s ease-in-out infinite;
      }
    `}</style>
  </section>
);
};

export default AboutUs;
