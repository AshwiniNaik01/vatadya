// // import React from 'react';
// // import { Terminal, Activity, Shield, Award, Map, Info, Compass, Zap, Target } from 'lucide-react';

// // const AboutUs = () => {
// //   return (
// //     <section id="about" className="relative py-32 bg-obsidian overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
// //       {/* Background HUD Matrix */}
// //       <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
// //         <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/[0.05] -skew-x-12 translate-x-1/4"></div>
// //         <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-primary/5 to-transparent"></div>
// //         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
// //       </div>

// //       <div className="container mx-auto px-6 relative z-10">
// //         <div className="flex flex-col lg:flex-row items-center gap-24">

// //           {/* Intelligence Visual Terminal */}
// //           <div className="lg:w-1/2 animate-fade-in order-2 lg:order-1 relative">
// //             <div className="relative group">
// //               {/* Outer Glowing Border */}
// //               <div className="absolute -inset-4 bg-primary/20 rounded-sm blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

// //               <div className="relative hud-panel overflow-hidden border-white/10 bg-obsidian-80 backdrop-blur-3xl p-2">
// //                 <div className="relative overflow-hidden">
// //                   <img
// //                     src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
// //                     alt="Mission Recon"
// //                     className="w-full h-[650px] object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
// //                   />

// //                   {/* Tactical Overlays */}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>

// //                   {/* Corner Markers */}
// //                   <div className="absolute top-8 left-8 p-4 border-t-2 border-l-2 border-primary/40 w-16 h-16"></div>
// //                   <div className="absolute top-8 right-8 p-4 border-t-2 border-r-2 border-white/10 w-16 h-16"></div>
// //                   <div className="absolute bottom-8 left-8 p-4 border-b-2 border-l-2 border-white/10 w-16 h-16"></div>
// //                   <div className="absolute bottom-8 right-8 p-4 border-b-2 border-r-2 border-primary/40 w-16 h-16"></div>
// //                 </div>

// //                 {/* HUD Overlay Labels */}
// //                 <div className="absolute top-12 left-12 flex flex-col gap-4">
// //                   <div className="hud-panel px-5 py-2.5 bg-obsidian/90 text-primary border-primary/20 data-text text-[9px] font-black tracking-[0.3em]">RECON_MODE: ACTIVE</div>
// //                   <div className="hud-panel px-5 py-2.5 bg-obsidian/90 text-white/40 border-white/5 data-text text-[9px] font-black tracking-[0.3em]">COORDS_LOCKED: 27.9881° N</div>
// //                 </div>

// //                 <div className="absolute bottom-12 right-12">
// //                   <div className="bg-obsidian/90 backdrop-blur-2xl p-8 hud-panel border-white/10 group-hover:border-primary/40 transition-all duration-700">
// //                     <div className="data-text text-[9px] text-primary/40 mb-3 font-black uppercase tracking-[0.4em]">OPERATIONAL_START</div>
// //                     <div className="data-text text-3xl font-black text-white italic tracking-tighter">EST_2013</div>
// //                   </div>
// //                 </div>

// //                 {/* Scanline Animation Effect */}
// //                 <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-primary/5 to-transparent h-1/2 animate-scanline opacity-30"></div>
// //               </div>

// //               {/* Floating Metadata Node */}
// //               <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:block animate-float">
// //                 <div className="hud-panel p-6 bg-obsidian-90 border-primary/20 flex flex-col items-center gap-4">
// //                   <Activity className="text-primary animate-pulse" />
// //                   <div className="w-1 h-12 bg-white/5"></div>
// //                   <span className="data-text text-[7px] [writing-mode:vertical-lr] text-white/20 font-black tracking-[0.5em] uppercase">TELEMETRY_SYNC</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Mission Intel Content */}
// //           <div className="lg:w-1/2 animate-slide-up order-1 lg:order-2">
// //             <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
// //               <Terminal size={14} className="text-primary" />
// //               <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">MISSION_INTELLIGENCE_LOG</span>
// //             </div>

// //             <h2 className="text-4xl md:text-8xl font-black text-white mb-10 leading-none tracking-tighter uppercase italic">
// //               Arctic <br />
// //               <span className="command-gradient">Legacy</span>
// //             </h2>

// //             <p className="data-text text-primary/40 text-sm md:text-xl md:leading-relaxed mb-16 uppercase tracking-widest max-w-2xl">
// //               [SYS_OVERVIEW] {">"} At Vatadya, we engineer high-altitude trajectories
// //               by synthesizing elite field wisdom with precision logistics. Our mission
// //               is to provide a deterministic path to the summit for the modern explorer.
// //             </p>

// //             {/* Strategic Intel Nods */}
// //             <div className="grid gap-6">
// //               {[
// //                 {
// //                   id: "INTEL_01",
// //                   title: "Precision Recon",
// //                   desc: "Deterministic mission architecture ensuring seamless execution and redundant protocol staging.",
// //                   icon: <Compass className="text-primary" size={24} />
// //                 },
// //                 {
// //                   id: "INTEL_02",
// //                   title: "Tech Sovereignty",
// //                   desc: "Utilizing deep sector knowledge and validated survival algorithms for extreme theatre ops.",
// //                   icon: <Zap className="text-secondary" size={24} />
// //                 },
// //                 {
// //                   id: "INTEL_03",
// //                   title: "Verified Yield",
// //                   desc: "Tier-1 operational status confirmed across all global mountain theatres and high-altitude hubs.",
// //                   icon: <Target className="text-primary" size={24} />
// //                 }
// //               ].map((item, idx) => (
// //                 <div key={idx} className="group relative hud-panel p-10 bg-white/[0.01] border-white/5 hover:border-primary/40 transition-all duration-700 overflow-hidden">
// //                   {/* Card Scanning Light */}
// //                   <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 opacity-20"></div>

// //                   <div className="relative z-10 flex items-start gap-10">
// //                     <div className="w-16 h-16 hud-panel border-white/5 flex items-center justify-center bg-obsidian/40 group-hover:scale-110 group-hover:bg-primary group-hover:text-obsidian transition-all duration-700">
// //                       {item.icon}
// //                     </div>

// //                     <div className="flex-1">
// //                       <div className="flex items-center gap-4 mb-3">
// //                         <span className="data-text text-[9px] text-white/10 font-black group-hover:text-primary transition-colors">{item.id}</span>
// //                         <div className="h-px flex-1 bg-white/5 group-hover:bg-primary/20 transition-all"></div>
// //                       </div>
// //                       <h4 className="data-text text-xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-4 italic">
// //                         {item.title}
// //                       </h4>
// //                       <p className="data-text text-[10px] text-white/30 leading-relaxed uppercase tracking-[0.15em] group-hover:text-white/50 transition-colors">
// //                         {item.desc}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default AboutUs;

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Terminal,
//   Activity,
//   Shield,
//   Award,
//   Map,
//   Info,
//   Compass,
//   Zap,
//   Target,
//   Mountain,
//   Waves,
//   Wind,
//   Cloud,
//   Star,
//   Navigation,
//   Eye,
//   Sparkles,
//   Layers,
//   Droplets,
//   Sunrise,
//   Sunset
// } from 'lucide-react';

// const AboutUs = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [activeStat, setActiveStat] = useState(null);
//   const sectionRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         setMousePosition({
//           x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
//           y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const stats = [
//     { label: 'PEAKS CONQUERED', value: '47+', icon: Mountain, color: 'from-sky-400 to-blue-400' },
//     { label: 'EXPEDITIONS', value: '156', icon: Compass, color: 'from-blue-400 to-indigo-400' },
//     { label: 'HAPPY TREKKERS', value: '2.8k', icon: Star, color: 'from-indigo-400 to-purple-400' },
//     { label: 'YEARS OF GLORY', value: '12', icon: Award, color: 'from-purple-400 to-pink-400' },
//   ];

//   return (
//     <section
//       id="about"
//       ref={sectionRef}
//       className="relative py-12 overflow-hidden"
//       style={{
//         background: 'linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 30%, #0A4B72 70%, #0B5B86 100%)',
//       }}
//     >
//       {/* ===== Dynamic Background Layers ===== */}
//       <div className="absolute inset-0">
//         {/* Gradient Orbs */}
//         <div className="absolute top-20 left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* ===== Header Section ===== */}
//         <div className="text-center mb-20">
//          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
//             <Sparkles className="w-4 h-4 text-sky-500" />
//             <span className="text-sky-700 text-xs font-medium tracking-wide">
//              OUR MISSION & VISION
//             </span>
//           </div>

//           <h2 className="text-5xl md:text-7xl font-black text-white
//                          leading-none tracking-tight mb-6">
//             Crafting
//             <span className="block text-transparent bg-clip-text
//                              bg-gradient-to-r from-sky-300 via-sky-400 to-blue-400
//                              animate-gradient">
//               Mountain Legacies
//             </span>
//           </h2>

//         </div>

//         {/* ===== Main Content with 3D Effect ===== */}
//         <div className="flex flex-col lg:flex-row items-center gap-16 mx-auto max-w-7xl"
//              >

//           {/* ===== Left Side - 3D Image Terminal ===== */}
//           <div className="lg:w-1/2 relative group perspective-1000">
//             {/* Floating Stats Cards */}
//             <div className="absolute -left-12 top-20 z-20 hidden xl:block">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-sky-400/20 rounded-2xl blur-xl"></div>
//                 <div className="relative bg-white/10 backdrop-blur-xl
//                                 border border-sky-400/30 rounded-2xl p-6
//                                 animate-float">
//                   <div className="space-y-4">
//                     {stats.slice(0, 2).map((stat, idx) => {
//                       const Icon = stat.icon;
//                       return (
//                         <div key={idx} className="flex items-center gap-4">
//                           <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color}
//                                           flex items-center justify-center`}>
//                             <Icon className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <div className="text-xs text-sky-300/60">{stat.label}</div>
//                             <div className="text-2xl font-bold text-white">{stat.value}</div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Main Image Card */}
//             <div className="relative transform-gpu transition-all duration-500
//                             group-hover:rotateY-5 group-hover:scale-105">
//               {/* Glow Effect */}
//               <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/30 to-blue-400/30
//                               rounded-3xl blur-2xl opacity-0 group-hover:opacity-100
//                               transition-opacity duration-700" />

//               {/* Image Container */}
//               <div className="relative rounded-3xl overflow-hidden
//                               border-2 border-sky-400/30
//                               shadow-2xl shadow-sky-500/20">
//                 <img
//                   src="https://images.pexels.com/photos/1081111/pexels-photo-1081111.jpeg?cs=srgb&dl=pexels-simonmigaj-1081111.jpg&fm=jpg"
//                   alt="Mountain Expedition"
//                   className="w-full h-[600px] object-cover transition-transform duration-1000
//                              group-hover:scale-110"
//                 />

//                 {/* Gradient Overlay */}

//                 {/* HUD Overlay */}

//                 {/* Year Badge */}

//                 {/* Scanline Animation */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent
//                                 via-sky-400/10 to-transparent
//                                 opacity-0 group-hover:opacity-100
//                                 animate-scan-fast pointer-events-none" />
//               </div>
//             </div>

//             {/* Right Stats Card */}
//             <div className="absolute -right-12 bottom-20 z-20 hidden xl:block">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl"></div>
//                 <div className="relative bg-white/10 backdrop-blur-xl
//                                 border border-blue-400/30 rounded-2xl p-2
//                                 animate-float-delayed">
//                   <div className="space-y-4">
//                     {stats.slice(2, 4).map((stat, idx) => {
//                       const Icon = stat.icon;
//                       return (
//                         <div key={idx} className="flex items-center gap-4">
//                           <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color}
//                                           flex items-center justify-center`}>
//                             <Icon className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <div className="text-xs text-blue-300/60">{stat.label}</div>
//                             <div className="text-2xl font-bold text-white">{stat.value}</div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ===== Right Side - Content ===== */}
//           <div className="lg:w-1/2 space-y-8">
//             {/* Mission Statement */}
//             <div className="bg-white/5 backdrop-blur-sm
//                             border border-sky-400/30 rounded-3xl
//                             p-6 hover:border-sky-400/60 transition-all
//                             group/statement">
//               <div className="flex items-start gap-6">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500
//                                 flex items-center justify-center
//                                 group-hover/statement:scale-110 transition-transform
//                                 shadow-lg shadow-sky-500/30">
//                   <Target className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className="text-xs font-bold text-sky-400 tracking-[0.3em]">
//                       MISSION_01
//                     </span>
//                     <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent"></div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     Precision Recon & Execution
//                   </h3>
//                   <p className="text-sky-200/60 leading-relaxed">
//                     Deterministic mission architecture ensuring seamless execution
//                     and redundant protocol staging across all high-altitude theatres.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Tech Sovereignty */}
//             <div className="bg-white/5 backdrop-blur-sm
//                             border border-sky-400/30 rounded-3xl
//                             p-6 hover:border-sky-400/60 transition-all
//                             group/tech">
//               <div className="flex items-start gap-6">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500
//                                 flex items-center justify-center
//                                 group-hover/tech:scale-110 transition-transform
//                                 shadow-lg shadow-indigo-500/30">
//                   <Zap className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className="text-xs font-bold text-indigo-400 tracking-[0.3em]">
//                       MISSION_02
//                     </span>
//                     <div className="h-px flex-1 bg-gradient-to-r from-indigo-400/30 to-transparent"></div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     Tech Sovereignty
//                   </h3>
//                   <p className="text-sky-200/60 leading-relaxed">
//                     Utilizing deep sector knowledge and validated survival algorithms
//                     for extreme theatre operations with 100% success rate.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Verified Yield */}
//             <div className="bg-white/5 backdrop-blur-sm
//                             border border-sky-400/30 rounded-3xl
//                             p-6 hover:border-sky-400/60 transition-all
//                             group/yield">
//               <div className="flex items-start gap-6">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500
//                                 flex items-center justify-center
//                                 group-hover/yield:scale-110 transition-transform
//                                 shadow-lg shadow-emerald-500/30">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className="text-xs font-bold text-emerald-400 tracking-[0.3em]">
//                       MISSION_03
//                     </span>
//                     <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/30 to-transparent"></div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     Verified Yield
//                   </h3>
//                   <p className="text-sky-200/60 leading-relaxed">
//                     Tier-1 operational status confirmed across all global mountain
//                     theatres with 47+ successful expeditions and counting.
//                   </p>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>

//       {/* ===== Custom Animations ===== */}
//       <style>{`
//         @keyframes floatParticle {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
//           50% { transform: translateY(-100px) rotate(180deg); opacity: 0.6; }
//           100% { transform: translateY(0) rotate(360deg); opacity: 0.2; }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         @keyframes mountainWave {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.03); }
//         }

//         @keyframes sparkle {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.2); }
//         }

//         @keyframes scan-slow {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }

//         @keyframes scan-fast {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100%); }
//         }

//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.1); }
//         }

//         @keyframes waveMove {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(15px); }
//         }

//         .animate-float {
//           animation: float 5s ease-in-out infinite;
//         }

//         .animate-float-delayed {
//           animation: float 5s ease-in-out infinite;
//           animation-delay: 2s;
//         }

//         .animate-sparkle {
//           animation: sparkle 2s ease-in-out infinite;
//         }

//         .animate-scan-slow {
//           animation: scan-slow 8s linear infinite;
//         }

//         .animate-scan-fast {
//           animation: scan-fast 3s linear infinite;
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 4s ease-in-out infinite;
//         }

//         .delay-1000 {
//           animation-delay: 1s;
//         }

//         .perspective-1000 {
//           perspective: 1000px;
//         }

//         .group:hover .rotateY-5 {
//           transform: rotateY(5deg);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default AboutUs;

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
          icon: Mountain,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 30%, #0A4B72 70%, #0B5B86 100%)",
      }}
    >
      {/* ===== Dynamic Background Layers ===== */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* ===== Header Section ===== */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              {" "}
              OUR MISSION & VISION{" "}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
            {missionData ? (
              <>
                {/* First part plain/white */}
                <span>{missionData.title.split(" ")[0]} </span>

                {/* Second part with gradient color */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
                  {missionData.title.split(" ").slice(1).join(" ")}
                </span>
              </>
            ) : (
              <>
                <span>Crafting </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
                  Mountain Legacies
                </span>
              </>
            )}
          </h2>
        </div>

        {/* ===== Main Content with 3D Effect ===== */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mx-auto max-w-7xl">
          {/* ===== Left Side - 3D Image Terminal ===== */}
          <div className="lg:w-1/2 relative group perspective-1000">
            {/* Floating Stats Cards */}
            <div className="absolute -left-12 top-20 z-20 hidden xl:block">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-400/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-sky-400/30 rounded-2xl p-6 animate-float">
                  <div className="space-y-4">
                    {stats.slice(0, 2).map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-sky-300/60">
                              {stat.label}
                            </div>
                            <div className="text-2xl font-bold text-white">
                              {stat.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Image Card */}
            <div className="relative transform-gpu transition-all duration-500 group-hover:rotateY-5 group-hover:scale-105">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/30 to-blue-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-sky-400/30 shadow-2xl shadow-sky-500/20">
                <img
                  src={
                    missionData?.image?.cdnUrl ||
                    "https://images.pexels.com/photos/1081111/pexels-photo-1081111.jpeg?cs=srgb&dl=pexels-simonmigaj-1081111.jpg&fm=jpg"
                  }
                  alt="Mountain Expedition"
                  className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 animate-scan-fast pointer-events-none" />
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="absolute -right-12 bottom-20 z-20 hidden xl:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-2 animate-float-delayed">
                  <div className="space-y-4">
                    {stats.slice(2, 4).map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-blue-300/60">
                              {stat.label}
                            </div>
                            <div className="text-2xl font-bold text-white">
                              {stat.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Right Side - Mission Cards ===== */}
          <div className="lg:w-1/2 space-y-8">
            {missionData?.missions?.map((mission, idx) => (
              <div
                key={mission._id}
                className={`bg-white/5 backdrop-blur-sm border border-sky-400/30 rounded-3xl p-6 hover:border-sky-400/60 transition-all group/mission-${idx}`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center group-hover/mission-${idx}:scale-110 transition-transform shadow-lg shadow-sky-500/30`}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-sky-400 tracking-[0.3em]">{`MISSION_${idx + 1}`}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {mission.title}
                    </h3>
                    <p
                      className="text-sky-200/60 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: mission.description }}
                    ></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.2);} }
        @keyframes scan-fast { 0%{transform:translateY(-100%);}100%{transform:translateY(100%);} }
        @keyframes gradient { 0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;} }
        @keyframes pulse-slow { 0%,100%{opacity:0.3;transform:scale(1);}50%{opacity:0.5;transform:scale(1.1);} }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 5s ease-in-out infinite; animation-delay:2s; }
        .animate-scan-fast { animation: scan-fast 3s linear infinite; }
        .animate-gradient { background-size:200% 200%; animation:gradient 3s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .perspective-1000 { perspective:1000px; }
        .group:hover .rotateY-5 { transform: rotateY(5deg); }
      `}</style>
    </section>
  );
};

export default AboutUs;
