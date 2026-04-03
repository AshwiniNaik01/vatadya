// // import React, { useState } from 'react';
// // import {
// //   Shield,
// //   Terminal,
// //   Activity,
// //   Compass,
// //   Zap,
// //   Globe,
// //   Cpu,
// //   Microscope,
// //   Award
// // } from 'lucide-react';

// // const Features = () => {
// //   const [activeFeature, setActiveFeature] = useState(0);

// //   const features = [
// //     {
// //       icon: <Cpu className="w-8 h-8" />,
// //       title: "Command Personnel",
// //       description: "Led by certified mountaineers with elite high-altitude mission credentials.",
// //       stats: "15k+ MISSIONS",
// //       code: "AUTH_01",
// //       delay: "0s"
// //     },
// //     {
// //       icon: <Compass className="w-8 h-8" />,
// //       title: "GPS Array V4",
// //       description: "Redundant satellite tracking ensures navigational precision in dead zones.",
// //       stats: "99.9% SYNC",
// //       code: "NAV_SYS",
// //       delay: "0.1s"
// //     },
// //     {
// //       icon: <Shield className="w-8 h-8" />,
// //       title: "Failsafe Protocols",
// //       description: "Advanced medical synchronization and rapid extraction contingencies.",
// //       stats: "0.0 INCIDENTS",
// //       code: "SAFE_77",
// //       delay: "0.2s"
// //     },
// //     {
// //       icon: <Microscope className="w-8 h-8" />,
// //       title: "Sector Intelligence",
// //       description: "Deep topographical analysis and real-time environment monitoring.",
// //       stats: "HD RECON",
// //       code: "INTEL_99",
// //       delay: "0.3s"
// //     },
// //     {
// //       icon: <Zap className="w-8 h-8" />,
// //       title: "Rapid Deployment",
// //       description: "Agile mission architecture allowing for swift sector mobilization.",
// //       stats: "24H READY",
// //       code: "OPS_FAST",
// //       delay: "0.4s"
// //     },
// //     {
// //       icon: <Award className="w-8 h-8" />,
// //       title: "Verified Standards",
// //       description: "Globally recognized operational excellence in high-altitude logistics.",
// //       stats: "TIER 1",
// //       code: "STD_PRO",
// //       delay: "0.5s"
// //     }
// //   ];

// //   return (
// //     <section className="py-24 bg-obsidian relative overflow-hidden border-t border-white/5">
// //       {/* Arctic Background Grids */}
// //       <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
// //         style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
// //       </div>

// //       <div className="container mx-auto px-6 relative z-10">
// //         {/* Section Console Header */}
// //         <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
// //           <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
// //             <Activity className="w-4 h-4 text-primary animate-pulse" />
// //             <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">
// //               OPERATIONAL_CAPABILITIES_AUDIT
// //             </span>
// //           </div>
// //           <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
// //             System <br />
// //             <span className="command-gradient italic">Parameters</span>
// //           </h2>
// //           <p className="data-text text-primary/40 text-sm max-w-2xl mx-auto leading-relaxed">
// //             [SYS_AUDIT] {">"} Core infrastructure metrics validated for elite high-altitude mission success.
// //             Calibrating for peak performance in extreme theatres.
// //           </p>
// //         </div>

// //         {/* Technical Features Dashboard */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {features.map((feature, index) => (
// //             <div
// //               key={index}
// //               onMouseEnter={() => setActiveFeature(index)}
// //               className="group relative hud-panel p-10 hover-lift bg-white/[0.02] animate-slide-up"
// //               style={{ animationDelay: feature.delay }}
// //             >
// //               {/* Internal HUD Elements */}
// //               <div className="absolute top-6 right-8 opacity-[0.05] group-hover:opacity-100 transition-opacity">
// //                 <span className="data-text text-[8px] font-black text-white bg-white/10 px-3 py-1 border border-white/20">
// //                   {feature.code}
// //                 </span>
// //               </div>

// //               {/* Icon Matrix */}
// //               <div className="mb-10 w-16 h-16 hud-panel border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-obsidian transition-all duration-500 transform group-hover:rotate-6">
// //                 {feature.icon}
// //               </div>

// //               {/* Data Text Cluster */}
// //               <div className="relative z-10">
// //                 <div className="flex items-center gap-3 mb-4">
// //                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
// //                   <span className="data-text text-[8px] font-black text-secondary tracking-widest">{feature.stats}</span>
// //                 </div>

// //                 <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
// //                   {feature.title}
// //                 </h3>

// //                 <p className="data-text text-[10px] text-white/30 leading-relaxed mb-8">
// //                   {feature.description}
// //                 </p>

// //                 {/* Progress Visualizer */}
// //                 <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
// //                   <div className="absolute inset-0 bg-primary/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
// //                 </div>
// //               </div>

// //               {/* Hover Glow Background */}
// //               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Features;





// import React, { useState, useEffect, useRef } from 'react';
// import Lottie from 'lottie-react';
// import {
//   Shield,
//   Terminal,
//   Activity,
//   Compass,
//   Zap,
//   Globe,
//   Cpu,
//   Microscope,
//   Award,
//   Sparkles,
//   Target,
//   Navigation,
//   Wind,
//   Star,
//   CheckCircle
// } from 'lucide-react';

// // Import Lottie animations (you'll need to add these files to your project)
// // You can download free animations from https://lottiefiles.com/
// import mountainAnimation from '../../../src/lotties/mountain.json';
// import compassAnimation from '../../../src/lotties/compass.json';
// import shieldAnimation from '../../../src/lotties/shield.json';
// import radarAnimation from '../../../src/lotties/radar.json';
// import zapAnimation from '../../../src/lotties/electricity.json';
// import awardAnimation from '../../../src/lotties/award.json';

// const Features = () => {
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         setMousePosition({
//           x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
//           y: ((e.clientY - rect.top) / rect.height - 0.5) * 10
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const features = [
//     {
//       icon: Cpu,
//       lottie: mountainAnimation,
//       title: "Command Personnel",
//       description: "Led by certified mountaineers with elite high-altitude mission credentials.",
//       stats: "15k+",
//       statLabel: "MISSIONS",
//       code: "AUTH_01",
//       color: "from-sky-400 to-blue-400",
//       delay: "0s",
//       metric: "100% success"
//     },
//     {
//       icon: Compass,
//       lottie: compassAnimation,
//       title: "GPS Array V4",
//       description: "Redundant satellite tracking ensures navigational precision in dead zones.",
//       stats: "99.9%",
//       statLabel: "SYNC",
//       code: "NAV_SYS",
//       color: "from-blue-400 to-indigo-400",
//       delay: "0.1s",
//       metric: "0.01ms latency"
//     },
//     {
//       icon: Shield,
//       lottie: shieldAnimation,
//       title: "Failsafe Protocols",
//       description: "Advanced medical synchronization and rapid extraction contingencies.",
//       stats: "0.0",
//       statLabel: "INCIDENTS",
//       code: "SAFE_77",
//       color: "from-indigo-400 to-purple-400",
//       delay: "0.2s",
//       metric: "24/7 monitoring"
//     },
//     {
//       icon: Microscope,
//       lottie: radarAnimation,
//       title: "Sector Intelligence",
//       description: "Deep topographical analysis and real-time environment monitoring.",
//       stats: "HD",
//       statLabel: "RECON",
//       code: "INTEL_99",
//       color: "from-purple-400 to-pink-400",
//       delay: "0.3s",
//       metric: "4K resolution"
//     },
//     {
//       icon: Zap,
//       lottie: zapAnimation,
//       title: "Rapid Deployment",
//       description: "Agile mission architecture allowing for swift sector mobilization.",
//       stats: "24H",
//       statLabel: "READY",
//       code: "OPS_FAST",
//       color: "from-pink-400 to-rose-400",
//       delay: "0.4s",
//       metric: "Instant response"
//     },
//     {
//       icon: Award,
//       lottie: awardAnimation,
//       title: "Verified Standards",
//       description: "Globally recognized operational excellence in high-altitude logistics.",
//       stats: "TIER 1",
//       statLabel: "RATING",
//       code: "STD_PRO",
//       color: "from-rose-400 to-orange-400",
//       delay: "0.5s",
//       metric: "ISO certified"
//     }
//   ];

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative py-24 overflow-hidden"
//       style={{
//         background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)',
//       }}
//     >
//       {/* ===== Light Background Elements ===== */}
//       <div className="absolute inset-0">
//         {/* Floating Particles */}
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-gradient-to-br from-sky-200/40 to-blue-200/40"
//             style={{
//               width: Math.random() * 8 + 2 + 'px',
//               height: Math.random() * 8 + 2 + 'px',
//               left: Math.random() * 100 + '%',
//               top: Math.random() * 100 + '%',
//               animation: `floatParticle ${Math.random() * 20 + 15}s linear infinite`,
//               animationDelay: Math.random() * 5 + 's',
//             }}
//           />
//         ))}

//         {/* Soft Grid Overlay */}
//         <div 
//           className="absolute inset-0 opacity-[0.08]"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
//               linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
//             `,
//             backgroundSize: '40px 40px'
//           }}
//         />

//         {/* Gradient Orbs */}
//         <div className="absolute top-20 left-20 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10"
//            style={{ 
//              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
//              transition: 'transform 0.1s ease-out'
//            }}>
        
//         {/* ===== Header Section ===== */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-3 
//                           bg-white/80 backdrop-blur-sm 
//                           border border-sky-200 rounded-full 
//                           px-6 py-3 mb-6
//                           shadow-lg shadow-sky-100">
//             <Sparkles className="w-5 h-5 text-sky-500 animate-sparkle" />
//             <span className="text-sky-700 text-sm font-medium tracking-wide">
//               CORE CAPABILITIES
//             </span>
//             <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
//           </div>

//           <h2 className="text-4xl md:text-6xl font-bold text-sky-900 
//                          leading-tight mb-4">
//             System
//             <span className="block text-transparent bg-clip-text 
//                              bg-gradient-to-r from-sky-600 to-blue-600">
//               Parameters
//             </span>
//           </h2>

//           <p className="text-sky-700/70 text-lg leading-relaxed">
//             Core infrastructure metrics validated for elite high-altitude mission success.
//             Calibrating for peak performance in extreme theatres.
//           </p>
//         </div>

//         {/* ===== Features Grid - Smaller Cards ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             const isActive = activeFeature === index;

//             return (
//               <div
//                 key={index}
//                 onMouseEnter={() => setActiveFeature(index)}
//                 onMouseLeave={() => setActiveFeature(null)}
//                 className="group relative perspective-1000"
//                 style={{ animation: `fadeInUp 0.6s ease-out ${feature.delay} forwards`, opacity: 0 }}
//               >
//                 {/* 3D Card Container */}
//                 <div 
//                   className="relative transition-transform duration-500"
//                   style={{
//                     transform: isActive 
//                       ? `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) scale(1.02)` 
//                       : 'none'
//                   }}
//                 >
//                   {/* Glow Effect */}
//                   <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} 
//                                   rounded-2xl blur-xl transition-opacity duration-500
//                                   ${isActive ? 'opacity-50' : 'opacity-0'}`} />

//                   {/* Main Card */}
//                   <div className={`relative bg-white rounded-2xl p-6
//                                   border-2 transition-all duration-300
//                                   shadow-lg hover:shadow-xl
//                                   ${isActive 
//                                     ? `border-${feature.color.split('-')[1]}-400` 
//                                     : 'border-sky-100 hover:border-sky-300'}`}>
                    
//                     {/* Top Row - Code & Stats */}
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-xs font-mono text-sky-400 bg-sky-50 
//                                        px-2 py-1 rounded-md">
//                         {feature.code}
//                       </span>
//                       <div className="flex items-center gap-1">
//                         <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                         <span className="text-xs font-medium text-sky-600">
//                           {feature.metric}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Lottie Animation Container */}
//                     <div className="relative w-20 h-20 mx-auto mb-4">
//                       <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} 
//                                       rounded-2xl opacity-10 group-hover:opacity-20 
//                                       transition-opacity`} />
//                       <Lottie 
//                         animationData={feature.lottie}
//                         loop={true}
//                         autoplay={true}
//                         className="w-full h-full"
//                         style={{ filter: isActive ? 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))' : 'none' }}
//                       />
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-lg font-bold text-sky-900 text-center mb-2
//                                    group-hover:text-sky-600 transition-colors">
//                       {feature.title}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-sm text-sky-600/70 text-center mb-4 leading-relaxed">
//                       {feature.description}
//                     </p>

//                     {/* Stats Row */}
//                     <div className="flex items-center justify-center gap-3 
//                                     pt-4 border-t border-sky-100">
//                       <div className="text-center">
//                         <div className={`text-xl font-bold bg-gradient-to-r ${feature.color} 
//                                         bg-clip-text text-transparent`}>
//                           {feature.stats}
//                         </div>
//                         <div className="text-xs text-sky-500 mt-1">
//                           {feature.statLabel}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Hover Progress Indicator */}
//                     <div className="absolute bottom-0 left-0 right-0 h-1 
//                                     bg-sky-100 rounded-b-2xl overflow-hidden">
//                       <div className={`h-full bg-gradient-to-r ${feature.color} 
//                                       transition-all duration-700 ease-out
//                                       ${isActive ? 'w-full' : 'w-0'}`} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ===== Bottom Stats Bar ===== */}
//         <div className="mt-16 max-w-4xl mx-auto">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6
//                           border border-sky-100 shadow-lg
//                           flex flex-wrap items-center justify-around gap-6">
//             {[
//               { label: 'Active Missions', value: '24', icon: Activity },
//               { label: 'Success Rate', value: '100%', icon: CheckCircle },
//               { label: 'Global Reach', value: '15+', icon: Globe },
//               { label: 'Expert Guides', value: '47', icon: Star },
//             ].map((stat, idx) => {
//               const StatIcon = stat.icon;
//               return (
//                 <div key={idx} className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-100 to-blue-100 
//                                   flex items-center justify-center">
//                     <StatIcon className="w-5 h-5 text-sky-600" />
//                   </div>
//                   <div>
//                     <div className="text-xl font-bold text-sky-900">{stat.value}</div>
//                     <div className="text-xs text-sky-600">{stat.label}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ===== Decorative Elements ===== */}
//         <div className="flex justify-center gap-2 mt-12">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="w-2 h-8 rounded-full bg-gradient-to-t from-sky-200 to-blue-200
//                         animate-pulse"
//               style={{ animationDelay: `${i * 0.2}s`, height: `${16 + i * 4}px` }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* ===== Custom Animations ===== */}
//       <style>{`
//         @keyframes floatParticle {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
//           50% { transform: translateY(-100px) rotate(180deg); opacity: 0.7; }
//           100% { transform: translateY(0) rotate(360deg); opacity: 0.3; }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes sparkle {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.2); }
//         }
        
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.1); }
//         }
        
//         .animate-sparkle {
//           animation: sparkle 2s ease-in-out infinite;
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
//       `}</style>
//     </section>
//   );
// };

// export default Features;



// import React, { useState, useEffect, useRef } from 'react';
// import Lottie from 'lottie-react';
// import {
//   Shield,
//   Terminal,
//   Activity,
//   Compass,
//   Zap,
//   Globe,
//   Cpu,
//   Microscope,
//   Award,
//   Sparkles,
//   Target,
//   Navigation,
//   Wind,
//   Star,
//   CheckCircle
// } from 'lucide-react';
// import { Player } from "@lottiefiles/react-lottie-player";
// // Import Lottie animations with error handling

// import mountainAnimation from "../../lotties/mountain.json";
// import compassAnimation from "../../lotties/compass.json";
// import shieldAnimation from "../../lotties/shield.json";
// import radarAnimation from "../../lotties/radar.json";
// import zapAnimation from "../../lotties/electricity.json";
// import awardAnimation from "../../lotties/award.json";

// const Features = () => {
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [lottieError, setLottieError] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         setMousePosition({
//           x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
//           y: ((e.clientY - rect.top) / rect.height - 0.5) * 10
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const features = [
//     {
//       icon: Cpu,
//       lottie: mountainAnimation,
//       title: "Command Personnel",
//       description: "Led by certified mountaineers with elite high-altitude mission credentials.",
//       stats: "15k+",
//       statLabel: "MISSIONS",
//       code: "AUTH_01",
//       color: "from-sky-400 to-blue-400",
//       delay: "0s",
//       metric: "100% success"
//     },
//     {
//       icon: Compass,
//       lottie: compassAnimation,
//       title: "GPS Array V4",
//       description: "Redundant satellite tracking ensures navigational precision in dead zones.",
//       stats: "99.9%",
//       statLabel: "SYNC",
//       code: "NAV_SYS",
//       color: "from-blue-400 to-indigo-400",
//       delay: "0.1s",
//       metric: "0.01ms latency"
//     },
//     {
//       icon: Shield,
//       lottie: shieldAnimation,
//       title: "Failsafe Protocols",
//       description: "Advanced medical synchronization and rapid extraction contingencies.",
//       stats: "0.0",
//       statLabel: "INCIDENTS",
//       code: "SAFE_77",
//       color: "from-indigo-400 to-purple-400",
//       delay: "0.2s",
//       metric: "24/7 monitoring"
//     },
//     {
//       icon: Microscope,
//       lottie: radarAnimation,
//       title: "Sector Intelligence",
//       description: "Deep topographical analysis and real-time environment monitoring.",
//       stats: "HD",
//       statLabel: "RECON",
//       code: "INTEL_99",
//       color: "from-purple-400 to-pink-400",
//       delay: "0.3s",
//       metric: "4K resolution"
//     },
//     {
//       icon: Zap,
//       lottie: zapAnimation,
//       title: "Rapid Deployment",
//       description: "Agile mission architecture allowing for swift sector mobilization.",
//       stats: "24H",
//       statLabel: "READY",
//       code: "OPS_FAST",
//       color: "from-pink-400 to-rose-400",
//       delay: "0.4s",
//       metric: "Instant response"
//     },
//     {
//       icon: Award,
//       lottie: awardAnimation,
//       title: "Verified Standards",
//       description: "Globally recognized operational excellence in high-altitude logistics.",
//       stats: "TIER 1",
//       statLabel: "RATING",
//       code: "STD_PRO",
//       color: "from-rose-400 to-orange-400",
//       delay: "0.5s",
//       metric: "ISO certified"
//     }
//   ];

//   // Fallback component when Lottie fails
//   const LottieFallback = ({ icon: Icon, color }) => (
//     <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${color} rounded-2xl bg-opacity-10`}>
//       <Icon className="w-10 h-10 text-white" />
//     </div>
//   );

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative py-12 overflow-hidden"
//       style={{
//         background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)',
//       }}
//     >
//       {/* ===== Light Background Elements ===== */}
//       <div className="absolute inset-0">
//         {/* Floating Particles */}


//         {/* Soft Grid Overlay */}
//         <div 
//           className="absolute inset-0 opacity-[0.08]"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
//               linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
//             `,
//             backgroundSize: '40px 40px'
//           }}
//         />

//         {/* Gradient Orbs */}
        
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
        
//         {/* ===== Header Section ===== */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-3 
//                           bg-white/80 backdrop-blur-sm 
//                           border border-sky-200 rounded-full 
//                           px-6 py-3 mb-6
//                           shadow-lg shadow-sky-100">
//             <Sparkles className="w-5 h-5 text-sky-500 animate-sparkle" />
//             <span className="text-sky-700 text-sm font-medium tracking-wide">
//               OUR ESSENTIALS
//             </span>
//             <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
//           </div>

//          <h2 className="text-4xl md:text-6xl font-bold text-sky-900 leading-tight mb-4">
//   <span>System </span>
//   <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
//     Parameters
//   </span>
// </h2>
//         </div>

//         {/* ===== Features Grid - Smaller Cards ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             const isActive = activeFeature === index;

//             return (
//               <div
//                 key={index}
//                 onMouseEnter={() => setActiveFeature(index)}
//                 onMouseLeave={() => setActiveFeature(null)}
//                 className="group relative perspective-1000"
//                 style={{ animation: `fadeInUp 0.6s ease-out ${feature.delay} forwards`, opacity: 0 }}
//               >
//                 {/* 3D Card Container */}
//                 <div 
//                   className="relative transition-transform duration-500"
//                   style={{
//                     transform: isActive 
//                       ? `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) scale(1.02)` 
//                       : 'none'
//                   }}
//                 >
//                   {/* Glow Effect */}
//                   <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} 
//                                   rounded-2xl blur-xl transition-opacity duration-500
//                                   ${isActive ? 'opacity-50' : 'opacity-0'}`} />

//                   {/* Main Card */}
//                   <div className={`relative bg-white rounded-2xl p-6
//                                   border-2 transition-all duration-300
//                                   shadow-lg hover:shadow-xl
//                                   ${isActive 
//                                     ? `border-${feature.color.split('-')[1]}-400` 
//                                     : 'border-sky-100 hover:border-sky-300'}`}>
                    
//                     {/* Top Row - Code & Stats */}
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-xs font-mono text-sky-400 bg-sky-50 
//                                        px-2 py-1 rounded-md">
//                         {feature.code}
//                       </span>
//                       <div className="flex items-center gap-1">
//                         <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                         <span className="text-xs font-medium text-sky-600">
//                           {feature.metric}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Animation/Icon Container */}
//                     <div className="relative w-20 h-20 mx-auto mb-4">
//                       <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} 
//                                       rounded-2xl opacity-10 group-hover:opacity-20 
//                                       transition-opacity`} />
                      
//                       {/* Lottie Animation with Error Boundary */}
//                       {feature.lottie ? (
//                         <div className="w-full h-full">
//                           <Player
//   autoplay
//   loop
//   src={feature.lottie}
//   className="w-full h-full"
// />

//                         </div>
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <Icon className={`w-10 h-10 text-${feature.color.split('-')[1]}-400`} />
//                         </div>
//                       )}
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-lg font-bold text-sky-900 text-center mb-2
//                                    group-hover:text-sky-600 transition-colors">
//                       {feature.title}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-sm text-sky-600/70 text-center mb-4 leading-relaxed">
//                       {feature.description}
//                     </p>

//                     {/* Stats Row */}
//                     <div className="flex items-center justify-center gap-3 
//                                     pt-4 border-t border-sky-100">
//                       <div className="text-center">
//                         <div className={`text-xl font-bold bg-gradient-to-r ${feature.color} 
//                                         bg-clip-text text-transparent`}>
//                           {feature.stats}
//                         </div>
//                         <div className="text-xs text-sky-500 mt-1">
//                           {feature.statLabel}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Hover Progress Indicator */}
//                     <div className="absolute bottom-0 left-0 right-0 h-1 
//                                     bg-sky-100 rounded-b-2xl overflow-hidden">
//                       <div className={`h-full bg-gradient-to-r ${feature.color} 
//                                       transition-all duration-700 ease-out
//                                       ${isActive ? 'w-full' : 'w-0'}`} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>

//       {/* ===== Custom Animations ===== */}
//       <style>{`
//         @keyframes floatParticle {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
//           50% { transform: translateY(-100px) rotate(180deg); opacity: 0.7; }
//           100% { transform: translateY(0) rotate(360deg); opacity: 0.3; }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes sparkle {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.2); }
//         }
        
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.1); }
//         }
        
//         .animate-sparkle {
//           animation: sparkle 2s ease-in-out infinite;
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
//       `}</style>
//     </section>
//   );
// };

// export default Features;

import React, { useState, useEffect, useRef } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Cpu,
  Compass,
  Shield,
  Microscope,
  Zap,
  Award,
  Sparkles,
  Activity
} from 'lucide-react';
import axios from 'axios';

import mountainAnimation from "../../lotties/mountain.json";
import compassAnimation from "../../lotties/compass.json";
import shieldAnimation from "../../lotties/shield.json";
import radarAnimation from "../../lotties/radar.json";
import zapAnimation from "../../lotties/electricity.json";
import awardAnimation from "../../lotties/award.json";
import axiosInstance from '../../api/axiosInstance';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [features, setFeatures] = useState([]);
  const [mainTitle, setMainTitle] = useState("");
  const sectionRef = useRef(null);

  // Map titles to Lottie animations dynamically
  const lottieMap = {
    "Adventure Treks": mountainAnimation,
    "GPS Array V4": compassAnimation,
    "Failsafe Protocols": shieldAnimation,
    "Sector Intelligence": radarAnimation,
    "Rapid Deployment": zapAnimation,
    "Verified Standards": awardAnimation
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 10
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch features from API
useEffect(() => {
  const fetchFeatures = async () => {
    try {
      const res = await axiosInstance.get(`/api/our-features`);

      console.log("API RESPONSE:", res.data); // 👈 VERY IMPORTANT

      const apiData = res.data?.data;

      if (!apiData || !apiData.features) {
        console.warn("Invalid API structure", apiData);
        return;
      }

      const lotties = [
        mountainAnimation,
        compassAnimation,
        shieldAnimation,
        radarAnimation,
        zapAnimation,
        awardAnimation
      ];

      const colors = [
        "from-sky-400 to-blue-400",
        "from-blue-400 to-indigo-400",
        "from-indigo-400 to-purple-400",
        "from-purple-400 to-pink-400",
        "from-pink-400 to-rose-400",
        "from-rose-400 to-orange-400"
      ];

      const mappedFeatures = apiData.features.map((feature, index) => ({
        title: feature.title,
        description: feature.description,
        stats: feature.statValue,
        statLabel: feature.statLabel,
        metric: feature.achievementMetric,
        lottie: lottieMap[feature.title] || lotties[index % lotties.length],
        icon: Cpu,
        color: colors[index % colors.length],
        delay: `${index * 0.1}s`,
        code: `CODE_${index + 1}`
      }));

      setFeatures(mappedFeatures);
      setMainTitle(apiData.mainTitle || "");

    } catch (err) {
      console.error("Error fetching features:", err);
    }
  };

  fetchFeatures();
}, []);
  // Lottie fallback component
  const LottieFallback = ({ icon: Icon, color }) => (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${color} rounded-2xl bg-opacity-10`}>
      <Icon className="w-10 h-10 text-white" />
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)' }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-6 py-3 mb-6 shadow-lg shadow-sky-100">
            <Sparkles className="w-5 h-5 text-sky-500 animate-sparkle" />
            <span className="text-sky-700 text-sm font-medium tracking-wide">OUR ESSENTIALS</span>
            <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>


       <h2 className="text-4xl md:text-6xl font-bold text-sky-900 leading-tight mb-4">
  <span>{mainTitle?.split(" ")[0]} </span>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
    {mainTitle?.split(" ").slice(1).join(" ")}
  </span>
</h2>
{/* 
          <h2 className="text-4xl md:text-6xl font-bold text-sky-900 leading-tight mb-4">
            <span>System </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Parameters
            </span>
          </h2> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => {
  const Icon = feature.icon;
  const isActive = activeFeature === index;

  // Map colors for border safely
  const borderColors = [
    'border-sky-400',
    'border-blue-400',
    'border-indigo-400',
    'border-purple-400',
    'border-pink-400',
    'border-rose-400'
  ];

  return (
    <div
      key={index}
      onMouseEnter={() => setActiveFeature(index)}
      onMouseLeave={() => setActiveFeature(null)}
      className="group relative perspective-1000"
    >
      <div className="relative transition-transform duration-500"
        style={{
          transform: isActive 
            ? `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) scale(1.02)` 
            : 'none'
        }}
      >
        <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl transition-opacity duration-500 ${isActive ? 'opacity-50' : 'opacity-0'}`} />

        <div className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${isActive ? borderColors[index % borderColors.length] : 'border-sky-100 hover:border-sky-300'}`}>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-sky-400 bg-sky-50 px-2 py-1 rounded-md">{feature.code}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-sky-600">{feature.metric}</span>
            </div>
          </div>

          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />
            {feature.lottie ? (
              <Player autoplay loop src={feature.lottie} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon className={`w-10 h-10 text-sky-400`} />
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-sky-900 text-center mb-2 group-hover:text-sky-600 transition-colors">{feature.title}</h3>
          <p className="text-sm text-sky-600/70 text-center mb-4 leading-relaxed">{feature.description}</p>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-sky-100">
            <div className="text-center">
              <div className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>{feature.stats}</div>
              <div className="text-xs text-sky-500 mt-1">{feature.statLabel}</div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-100 rounded-b-2xl overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-700 ease-out ${isActive ? 'w-full' : 'w-0'}`} />
          </div>
        </div>
      </div>
    </div>
  );
})}
        </div>
      </div>
    </section>
  );
};

export default Features;