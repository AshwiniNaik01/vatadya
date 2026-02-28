// // import React, { useState, useEffect } from 'react';
// // import { Quote, Star, Sparkles, TrendingUp, Users, ShieldCheck, Globe, Activity, Terminal, ClipboardCheck, ArrowRight, Scan, Target } from 'lucide-react';
// // import { fetchTrekReviews } from '../../api/trekReviewApi';
// // import { DIR } from '../../config/constants';

// // const Testimonials = () => {
// //   const [testimonials, setTestimonials] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const loadReviews = async () => {
// //       try {
// //         setLoading(true);
// //         const result = await fetchTrekReviews();

// //         if (result && Array.isArray(result.message)) {
// //           const mappedReviews = result.message.map(review => ({
// //             id: review._id,
// //             name: review.name,
// //             role: "CERTIFIED_EXPLORER",
// //             content: review.description,
// //             rating: review.rating,
// //             sector: review.trekId?.title?.toUpperCase().replace(/ /g, '_') || "UNKNOWN_SECTOR",

            
// //             // image: review.profilePhoto
// //             //   ? (review.profilePhoto.startsWith('http') ? review.profilePhoto : `${DIR.TrekImage || ''}${review.profilePhoto}`)
// //             //   : "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3"
// //           }));
// //           setTestimonials(mappedReviews);
// //         }
// //       } catch (err) {
// //         console.error("Failed to load testimonials:", err);
// //         setError("Failed to sync debrief logs from central archive.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadReviews();
// //   }, []);


  
// //   if (loading) {
// //     return (
// //       <div className="py-32 bg-obsidian flex flex-col items-center justify-center gap-6">
// //         <Activity className="w-12 h-12 text-primary animate-pulse" />
// //         <p className="data-text text-[10px] font-black uppercase tracking-[0.4em] text-primary animate-pulse">EXTRACTING_INTEL_FEEDS...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
// //       {/* Visual Telemetry Background */}
// //       <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
// //         <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"></div>
// //         {/* Radar scan ring */}
// //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/20 rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }}></div>
// //       </div>

// //       <div className="container mx-auto px-6 relative z-10">
// //         <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24 animate-fade-in">
// //           <div className="max-w-3xl">
// //             <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
// //               <ClipboardCheck className="w-4 h-4 text-primary" />
// //               <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">MISSION_DEBRIEF_ARCHIVE_v3</span>
// //             </div>
// //             <h2 className="text-4xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase italic">
// //               After Action <br />
// //               <span className="command-gradient">Reports</span>
// //             </h2>
// //             <p className="data-text text-primary/40 text-sm leading-relaxed uppercase tracking-widest">
// //               [INTEL_RECOVERY] {">"} Verified field reflections from personnel who have
// //               conquered active mission sectors. Validating squad performance and sector stability metrics.
// //             </p>
// //           </div>

// //           <div className="hidden lg:flex items-center gap-4 opacity-20">
// //             <div className="data-text text-[8px] text-white/40 uppercase tracking-[0.4em]">LOG_SYMMETRY_ACTIVE</div>
// //             <Scan className="text-white animate-pulse" />
// //           </div>
// //         </div>

// //         {testimonials.length === 0 ? (
// //           <div className="hud-panel p-20 text-center bg-white/[0.01] border-white/5">
// //             <p className="data-text text-white/20 uppercase tracking-[0.4em] text-[10px] animate-pulse">[NO_VERIFIED_REPORTS_IN_CURRENT_BUFFER]</p>
// //           </div>
// //         ) : (
// //           <div className="grid md:grid-cols-3 gap-8">
// //             {testimonials.slice(0, 3).map((testimonial, index) => (
// //               <div
// //                 key={index}
// //                 className="group relative hud-panel p-10 bg-white/[0.01] border-white/5 hover:border-primary/40 transition-all duration-700 hover-lift overflow-hidden animate-slide-up"
// //                 style={{ animationDelay: `${index * 0.1}s` }}
// //               >
// //                 {/* HUD Scan Line micro-animation */}
// //                 <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-12 w-full animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none"></div>

// //                 <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary transition-all duration-700">
// //                   <span className="data-text text-[8px] font-black">{testimonial.sector}</span>
// //                 </div>

// //                 <div className="flex mb-10 gap-1.5 items-end">
// //                   {[...Array(5)].map((_, i) => (
// //                     <div key={i} className={`h-1.5 transition-all duration-500 ${i < testimonial.rating ? 'w-4 bg-secondary glow-secondary' : 'w-2 bg-white/5'}`}></div>
// //                   ))}
// //                   <span className="data-text text-[8px] text-white/20 ml-2 font-black">RANK_0{testimonial.rating}</span>
// //                 </div>

// //                 <p className="data-text text-base text-white/50 leading-relaxed mb-12 italic uppercase tracking-wider group-hover:text-white transition-colors duration-500 line-clamp-4">
// //                   "{testimonial.content}"
// //                 </p>

// //                 <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
// //                   <div className="flex items-center gap-5">
// //                     <div className="relative">
// //                       <img
// //                         src={testimonial.image}
// //                         alt={testimonial.name}
// //                         className="w-14 h-14 hud-panel border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700"
// //                       />
// //                       <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-obsidian rounded-sm flex items-center justify-center border-2 border-obsidian transform rotate-45 group-hover:rotate-0 transition-transform">
// //                         <Activity size={10} className="transform -rotate-45 group-hover:rotate-0" />
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <h4 className="data-text font-black text-white text-[11px] mb-2 uppercase tracking-widest">{testimonial.name}</h4>
// //                       <div className="flex items-center gap-3">
// //                         <Target size={10} className="text-secondary" />
// //                         <span className="data-text text-[7px] text-primary/60 font-black tracking-[0.2em] uppercase">{testimonial.role}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <span className="data-text text-[10px] text-white/5 font-black uppercase group-hover:text-primary/10 transition-colors tracking-tighter italic">LOG_0x{index + 10}4</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Tactical Operational Metrics Section */}
// //         <div className="mt-40">
// //           <div className="flex items-center gap-6 mb-16">
// //             <div className="h-px flex-1 bg-white/5"></div>
// //             <div className="flex items-center gap-3 text-primary/20 data-text text-[10px] font-black uppercase tracking-[0.5em]">GLOBAL_AGGREGATE_METRICS</div>
// //             <div className="h-px flex-1 bg-white/5"></div>
// //           </div>

// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 hud-panel overflow-hidden border-white/5">
// //             {[
// //               { icon: <Users size={18} />, val: "10K+", label: "UNITS_SYNCED", color: "text-primary" },
// //               { icon: <TrendingUp size={18} />, val: "150+", label: "SECTORS_CLEARED", color: "text-secondary" },
// //               { icon: <ShieldCheck size={18} />, val: "100%", label: "PROTOCOL_YIELD", color: "text-primary" },
// //               { icon: <Globe size={18} />, val: "12K+", label: "DISTANCE_TELEMETRY", color: "text-secondary" }
// //             ].map((stat, i) => (
// //               <div key={i} className="bg-obsidian/60 p-12 flex flex-col items-center text-center group relative hover:bg-primary/5 transition-all">
// //                 <div className={`mb-8 p-4 hud-panel border-white/5 ${stat.color} group-hover:scale-110 group-hover:border-primary/20 transition-all duration-700`}>
// //                   {stat.icon}
// //                 </div>
// //                 <div className="data-text text-5xl font-black text-white mb-3 leading-none italic tracking-tighter">{stat.val}</div>
// //                 <div className="data-text text-[9px] text-white/20 font-black tracking-[0.4em] uppercase">{stat.label}</div>
// //                 {/* Progress bar micro-element */}
// //                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
// //                   <div className={`h-full ${stat.color === 'text-primary' ? 'bg-primary' : 'bg-secondary'} opacity-0 group-hover:opacity-40 transition-opacity w-[40%]`}></div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Testimonials;


// import React, { useState, useEffect, useRef } from 'react'; 
// import { 
//   Quote, 
//   Star, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   ShieldCheck, 
//   Globe, 
//   Activity, 
//   Terminal, 
//   ClipboardCheck, 
//   ArrowRight, 
//   Scan, 
//   Target,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Pause
// } from 'lucide-react';
// import { fetchTrekReviews } from '../../api/trekReviewApi';
// import { DIR } from '../../config/constants';

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   const timerRef = useRef(null);
//   const sectionRef = useRef(null);
//   const activeIndexRef = useRef(activeIndex);

//   // Mouse move effect for parallax
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

//   useEffect(() => {
//     activeIndexRef.current = activeIndex;
//   }, [activeIndex]);

//   useEffect(() => {
//     const loadReviews = async () => {
//       try {
//         setLoading(true);
//         const result = await fetchTrekReviews();

//         if (result && Array.isArray(result.message)) {
//           const mappedReviews = result.message.map(review => ({
//             id: review._id,
//             name: review.name,
//             role: "CERTIFIED EXPLORER",
//             content: review.description,
//             rating: review.rating,
//             sector: review.trekId?.title?.toUpperCase().replace(/ /g, '_') || "UNKNOWN SECTOR",
//            image: (() => {
//   const photo = review.profilePhoto;

//   // If it's a valid string
//   if (typeof photo === "string" && photo.trim() !== "") {
//     return photo.startsWith("http")
//       ? photo
//       : `${DIR.TrekImage || ""}${photo}`;
//   }

//   // If backend sends object like { url: "" }
//   if (typeof photo === "object" && photo?.cdnUrl) {
//     return photo.url.startsWith("http")
//       ? photo.url
//       : `${DIR.TrekImage || ""}${photo.cdnUrl}`;
//   }

//   // Fallback image
//   return "https://images.unsplash.com/photo-1494790108755-2616b612b786";
// })(),
//           }));
//           setTestimonials(mappedReviews);
//         }
//       } catch (err) {
//         console.error("Failed to load testimonials:", err);
//         setError("Failed to sync debrief logs from central archive.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadReviews();
//   }, []);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isPlaying || testimonials.length === 0) {
//       if (timerRef.current) clearInterval(timerRef.current);
//       return;
//     }

//     const slideDuration = 5000;
//     const interval = 50;
//     const steps = slideDuration / interval;
//     let step = 0;

//     timerRef.current = setInterval(() => {
//       step++;
//       setProgress((step / steps) * 100);

//       if (step >= steps) {
//         step = 0;
//         setProgress(0);
//         setActiveIndex((prev) => (prev + 1) % testimonials.length);
//       }
//     }, interval);

//     return () => clearInterval(timerRef.current);
//   }, [isPlaying, testimonials.length]);

//   const handleNext = () => {
//     setProgress(0);
//     setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const handlePrev = () => {
//     setProgress(0);
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const goToSlide = (index) => {
//     setProgress(0);
//     setActiveIndex(index);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center"
//            style={{
//              background: 'linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 50%, #0A4B72 100%)',
//            }}>
//         <div className="relative">
//           <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
//           <Activity className="relative w-16 h-16 text-sky-400 animate-pulse mb-8" />
//         </div>
//         <p className="text-sky-400/80 text-sm font-light tracking-[0.3em] uppercase animate-pulse">
//           EXTRACTING INTEL FEEDS
//         </p>
//       </div>
//     );
//   }

//   if (testimonials.length === 0) {
//     return (
//       <section className="py-32 relative overflow-hidden"
//         style={{
//           background: 'linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 50%, #0A4B72 100%)',
//         }}>
//         <div className="container mx-auto px-6 text-center">
//           <div className="inline-block p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-sky-400/30">
//             <p className="text-sky-200/60 text-lg">[NO VERIFIED REPORTS IN CURRENT BUFFER]</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const testimonial = testimonials[activeIndex];

// return (
//   <section 
//     ref={sectionRef}
//     className="relative py-20 overflow-hidden"
//     style={{
//       background: 'linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 50%, #0A4B72 100%)',
//     }}
//   >
//     {/* ===== Dynamic Background Elements ===== */}
//     <div className="absolute inset-0">
//       {/* Grid Overlay */}
//       <div 
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
//           `,
//           backgroundSize: '60px 60px',
//           transform: `perspective(500px) rotateX(${mousePosition.y * 0.3}deg)`,
//         }}
//       />

//       {/* Radar Scan Ring */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
//                       w-[800px] h-[800px] border border-sky-400/10 rounded-full 
//                       animate-ping opacity-20" 
//            style={{ animationDuration: '4s' }} />
//     </div>

//     <div className="container mx-auto px-6 relative z-10"
//         >

//       {/* ===== Header Section ===== */}
//       <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12">
//         <div className="max-w-3xl">
//           <div className="inline-flex items-center gap-3 
//                           bg-white border border-slate-200 shadow-md
//                           hover:bg-sky-50 hover:border-sky-300
//                           rounded-full px-5 py-2 mb-4
//                           transition-all">
//             <ClipboardCheck className="w-4 h-4 text-sky-400 animate-pulse" />
//             <span className="text-sky-400 text-xs font-bold tracking-[0.3em] uppercase">
//               MISSION DEBRIEF ARCHIVE
//             </span>
//             <Sparkles className="w-3 h-3 text-sky-400 animate-sparkle" />
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold text-white 
//                          leading-tight tracking-tight mb-4">
//             After Action
//             <span className="block text-transparent bg-clip-text 
//                              bg-gradient-to-r from-sky-300 via-sky-400 to-blue-400
//                              animate-gradient">
//               Reports
//             </span>
//           </h2>

//           <p className="text-sky-200/70 text-base leading-relaxed max-w-lg">
//             Verified field reflections from personnel who have conquered active 
//             mission sectors. Validating squad performance and sector stability metrics.
//           </p>
//         </div>

//         <div className="hidden lg:flex items-center gap-3 text-sky-400/40">
//           <Scan className="w-5 h-5 animate-pulse" />
//           <span className="text-xs tracking-widest uppercase">LOG SYMMETRY ACTIVE</span>
//         </div>
//       </div>

//       {/* ===== 3-Card Testimonial Grid ===== */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {testimonials.slice(activeIndex, activeIndex + 3).map((testimonial, idx) => (
//           <div
//             key={testimonial.id || idx}
//             className="bg-white/95 backdrop-blur-md 
//                        rounded-2xl p-6 
//                        border border-white/40
//                        shadow-lg hover:shadow-xl
//                        transition-all duration-300
//                        hover:-translate-y-2"
//           >
//             {/* Profile */}
//             <div className="flex items-center gap-3 mb-4">
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="w-14 h-14 rounded-xl object-cover border border-sky-200"
//               />
//               <div>
//                 <h4 className="font-semibold text-slate-900 text-sm">
//                   {testimonial.name}
//                 </h4>
//                 <p className="text-xs text-slate-500">
//                   {testimonial.role}
//                 </p>
//               </div>
//             </div>

//             {/* Content */}
//             <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-4">
//               "{testimonial.content}"
//             </p>

//             {/* Rating */}
//             <div className="flex items-center justify-between">
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-2 w-4 rounded-full ${
//                       i < testimonial.rating
//                         ? "bg-gradient-to-r from-sky-400 to-blue-400"
//                         : "bg-slate-200"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-xs text-sky-600 font-mono">
//                 {testimonial.sector}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== Navigation Controls ===== */}
//       <div className="flex items-center justify-between mb-12">
//         <div className="flex items-center gap-3">
//           {testimonials.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => goToSlide(idx)}
//               className={`group relative h-2 rounded-full transition-all duration-500
//                         ${idx === activeIndex 
//                           ? 'w-12 bg-gradient-to-r from-sky-400 to-blue-400' 
//                           : 'w-2 bg-white/20 hover:bg-white/40'}`}
//             >
//               {idx === activeIndex && (
//                 <span className="absolute -top-6 left-1/2 -translate-x-1/2 
//                                  text-[8px] font-bold text-sky-400 whitespace-nowrap
//                                  animate-pulse uppercase tracking-wider">
//                   ACTIVE
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={handlePrev}
//             className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-md
//                        hover:bg-sky-50 hover:border-sky-300
//                        flex items-center justify-center transition-all"
//           >
//             <ChevronLeft className="w-5 h-5 text-sky-400 transition-transform group-hover:-translate-x-1" />
//           </button>

//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500
//                        flex items-center justify-center
//                        hover:from-sky-600 hover:to-blue-600
//                        transition-all shadow-lg shadow-sky-500/30"
//           >
//             {isPlaying ? (
//               <Pause className="w-5 h-5 text-white" />
//             ) : (
//               <Play className="w-5 h-5 text-white ml-0.5" />
//             )}
//           </button>

//           <button
//             onClick={handleNext}
//             className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-md
//                        hover:bg-sky-50 hover:border-sky-300
//                        flex items-center justify-center transition-all"
//           >
//             <ChevronRight className="w-5 h-5 text-sky-400 transition-transform group-hover:translate-x-1" />
//           </button>
//         </div>
//       </div>

//       {/* ===== Global Metrics Section ===== */}
//       <div className="mt-20">
//         <div className="flex items-center gap-4 mb-8">
//           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
//           <span className="text-xs font-bold text-sky-400/60 uppercase tracking-[0.4em]">
//             GLOBAL AGGREGATE METRICS
//           </span>
//           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { icon: Users, value: "10K+", label: "UNITS SYNCED", color: "from-sky-400 to-blue-400" },
//             { icon: TrendingUp, value: "150+", label: "SECTORS CLEARED", color: "from-blue-400 to-indigo-400" },
//             { icon: ShieldCheck, value: "100%", label: "PROTOCOL YIELD", color: "from-indigo-400 to-purple-400" },
//             { icon: Globe, value: "12K+", label: "DISTANCE TELEMETRY", color: "from-purple-400 to-pink-400" }
//           ].map((stat, idx) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={idx}
//                 className="group relative bg-white border border-slate-200 shadow-md
//                            hover:bg-sky-50 hover:border-sky-300
//                            rounded-2xl p-6 transition-all overflow-hidden"
//               >
//                 <div className={`w-12 h-12 mx-auto mb-3 rounded-xl 
//                                 bg-gradient-to-r ${stat.color} 
//                                 flex items-center justify-center
//                                 group-hover:scale-110 group-hover:rotate-3
//                                 transition-all duration-500
//                                 shadow-lg shadow-sky-500/20`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>

//                 <div className="text-2xl font-semibold text-center mb-1
//                                 group-hover:text-transparent group-hover:bg-clip-text
//                                 group-hover:bg-gradient-to-r group-hover:from-sky-400 
//                                 group-hover:to-blue-400 transition-all">
//                   {stat.value}
//                 </div>

//                 <div className="text-xs text-center text-sky-400/60 uppercase tracking-wider">
//                   {stat.label}
//                 </div>

//                 <div className={`absolute bottom-0 left-0 right-0 h-1 
//                                 bg-gradient-to-r ${stat.color} 
//                                 transform scale-x-0 group-hover:scale-x-100 
//                                 transition-transform duration-700 origin-left`} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>

//     {/* ===== Custom Animations ===== */}
//     <style>{`
//       @keyframes sparkle {
//         0%, 100% { opacity: 1; transform: scale(1); }
//         50% { opacity: 0.5; transform: scale(1.2); }
//       }

//       @keyframes gradient {
//         0% { background-position: 0% 50%; }
//         50% { background-position: 100% 50%; }
//         100% { background-position: 0% 50%; }
//       }

//       .animate-sparkle {
//         animation: sparkle 2s ease-in-out infinite;
//       }

//       .animate-gradient {
//         background-size: 200% 200%;
//         animation: gradient 3s ease infinite;
//       }
//     `}</style>
//   </section>
// );
// };

// export default Testimonials;


import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Globe,
  Activity,
  ClipboardCheck,
  Scan,
  Target,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Heart,
} from "lucide-react";
import { fetchTrekReviews } from "../../api/trekReviewApi";
import { DIR } from "../../config/constants";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
   const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ================= FETCH REVIEWS =================
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const result = await fetchTrekReviews();

        if (result && Array.isArray(result.message)) {
          const mapped = result.message.map((review) => ({
            id: review._id,
            name: review.name,
            role: "CERTIFIED EXPLORER",
            content: review.description,
            rating: review.rating,
            sector: review.trekId?.title?.toUpperCase().replace(/ /g, "_") ||           
              "OUR EXPLORERS",
            image: (() => {
              const photo = review.profilePhoto;

              if (typeof photo === "string" && photo.trim() !== "") {
                return photo.startsWith("http")
                  ? photo
                  : `${DIR?.TrekImage || ""}${photo}`;
              }

              if (typeof photo === "object" && photo?.cdnUrl) {
                return photo.cdnUrl;
              }

              return "https://images.unsplash.com/photo-1494790108755-2616b612b786";
            })(),
          }));

          setTestimonials(mapped);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // ================= AUTOPLAY =================
  useEffect(() => {
    if (!isPlaying || testimonials.length === 0) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, testimonials.length]);

  // ================= PARALLAX =================
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Activity className="w-12 h-12 text-sky-400 animate-pulse mb-6" />
        <p className="text-sky-400 text-xs tracking-widest uppercase">
          Extracting Intel Feeds...
        </p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="py-20 text-center bg-slate-900 text-white">
        No testimonials available.
      </div>
    );
  }

  // Safe 3-card loop logic
  const visibleCards = [
    testimonials[activeIndex % testimonials.length],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length],
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56,189,248,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56,189,248,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `perspective(500px) rotateX(${mousePosition.y * 0.2}deg)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-sky-500/10 px-4 py-2 rounded-full mb-6">
            <ClipboardCheck className="w-4 h-4 text-sky-400" />
            <span className="text-xs text-sky-400 tracking-widest uppercase">
              Mission Debrief Archive
            </span>
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            After Action Reports
          </h2>

          <p className="text-slate-400 max-w-xl">
            Verified reflections from explorers who completed active trekking
            missions.
          </p>
        </div>

{/* TESTIMONIAL CARDS */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14  items-stretch">
  {visibleCards.map((testimonial, idx) => {
 

    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 10
        });
      }
    };

    return (
      <div
        key={testimonial.id || idx}
        ref={cardRef}
        className="relative group perspective-1000 flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
      >
        {/* 3D Card Container */}
        <div 
          className="relative transition-all duration-700 w-full flex flex-col"
          style={{
            transform: isHovered 
              ? `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) scale(1.02)` 
              : 'none'
          }}
        >
  

          {/* Main Card */}
          <div className={`relative bg-white/90 backdrop-blur-xl rounded-3xl 
                          border-2 transition-all duration-500 overflow-hidden
                          shadow-2xl hover:shadow-sky-200/50
                          ${isHovered ? 'border-sky-400' : 'border-sky-100'} flex flex-col h-full`}>
            
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/80 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Animated Scanline */}
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent 
                            via-sky-400/10 to-transparent h-32 
                            animate-scanline opacity-0 group-hover:opacity-100 
                            pointer-events-none transition-opacity duration-300`} />

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 
                              bg-gradient-to-br from-sky-400/20 to-transparent
                              transform rotate-45 translate-x-6 -translate-y-6" />
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-12 h-12 
                              bg-gradient-to-tr from-blue-400/20 to-transparent
                              transform -rotate-45 -translate-x-6 translate-y-6" />
            </div>

            {/* Big Quote Icon with Animation */}
            <div className={`absolute -top-4 -left-2 text-[100px] font-serif 
                            transition-all duration-700 select-none
                            ${isHovered 
                              ? 'text-sky-400/30 transform -translate-y-2 -translate-x-2' 
                              : 'text-sky-400/10'}`}>
              “
            </div>

            {/* Floating Like Button */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`absolute top-6 right-6 w-10 h-10 rounded-xl 
                         backdrop-blur-sm flex items-center justify-center
                         transition-all duration-500 z-20
                         border shadow-lg
                       
                        bg-rose-500 border-rose-400 shadow-rose-200/50 `
                          }
            >
              <Heart className={`w-5 h-5 transition-all duration-300
                                ${isLiked 
                                  ? 'fill-white text-white scale-110' 
                                  : 'text-sky-400 group-hover:text-rose-400'}`} />
            </button>

            {/* Profile Section with 3D Effect */}
            <div className="relative p-8 z-10">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative group/avatar">
                  {/* Avatar Ring */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 
                                  rounded-2xl blur-md transition-opacity duration-500
                                  ${isHovered ? 'opacity-60' : 'opacity-0'}`} />
                  
                  {/* Avatar Image */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="relative w-20 h-20 rounded-2xl object-cover 
                               border-3 border-white shadow-xl
                               group-hover/avatar:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Verified Badge */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 
                                  bg-gradient-to-r from-sky-400 to-blue-500 
                                  rounded-full border-2 border-white
                                  flex items-center justify-center
                                  shadow-lg animate-pulse-slow">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-800 
                                 group-hover:text-transparent group-hover:bg-clip-text
                                 group-hover:bg-gradient-to-r group-hover:from-sky-600 
                                 group-hover:to-blue-600 transition-all">
                    {testimonial.name}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs text-slate-500 tracking-wide">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial Content with Quotation Animation */}
              <div className="relative mb-6">
                <p className={`relative text-slate-600 text-base leading-relaxed 
                              transition-all duration-500 italic
                              ${isHovered ? 'translate-x-1' : ''}`}>
                  {testimonial.content}
                </p>
                
                {/* Animated Quote Mark */}
                <div className={`absolute -bottom-4 -right-10 text-4xl font-serif 
                                transition-all duration-700
                                ${isHovered 
                                  ? 'text-sky-800/50 opacity-20' 
                                  : 'text-sky-400/0 opacity-0'}`}>
                  ❞
                </div>

                 <div className={`absolute -bottom-4 left-10 text-4xl font-serif 
                                transition-all duration-700
                                ${isHovered 
                                  ? 'text-sky-800/50 opacity-20' 
                                  : 'text-sky-400/0 opacity-0'}`}>
                    ❞
                </div>
              </div>

              {/* Bottom Section - Redesigned */}
              <div className="relative flex items-center justify-between pt-4 
                              border-t border-sky-100 group-hover:border-sky-200 
                              transition-colors duration-500">

                {/* Modern Star Rating with Animation */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`relative transition-all duration-300
                                  ${isHovered ? 'hover:scale-125' : ''}`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className={`w-6 h-6 transition-all duration-300
                                    ${i < testimonial.rating
                                      ? 'drop-shadow-lg' 
                                      : 'opacity-30'}`}
                        >
                          <defs>
                            <linearGradient id={`starGradient-${idx}-${i}`}>
                              <stop offset="0%" stopColor="#38BDF8" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                          <path
                            fill={i < testimonial.rating 
                              ? `url(#starGradient-${idx}-${i})` 
                              : '#CBD5E1'}
                            d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.42 8.28L12 18.897 4.58 23.876 6 15.596 0 9.748l8.332-1.593z"
                            className={`transition-all duration-300
                                      ${i < testimonial.rating && isHovered 
                                        ? 'scale-110' : ''}`}
                          />
                        </svg>
                        
                     
                      </div>
                    ))}
                  </div>
                  
                  {/* Rating Text */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">
                      {testimonial.rating}
                    </span>
                    <span className="text-xs text-slate-400">/ 5</span>
                   
                   
                  </div>
                </div>

                {/* Sector Badge with Hover Effect */}
                <div className="relative group/badge">
                  <div className={`absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 
                                  rounded-full blur-md transition-opacity duration-500
                                  ${isHovered ? 'opacity-60' : 'opacity-0'}`} />
                  <div className="relative flex items-center gap-2 
                                  bg-gradient-to-r from-sky-500 to-blue-600
                                  text-white px-4 py-2 rounded-full
                                  shadow-lg hover:shadow-xl
                                  transform hover:scale-105 transition-all
                                  cursor-default">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {testimonial.sector}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 
                              bg-sky-100 rounded-b-3xl overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-sky-400 to-blue-500 
                              transition-all duration-700 ease-out
                              ${isHovered ? 'w-full' : 'w-0'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>



        {/* CONTROLS */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? "w-8 bg-sky-400"
                    : "w-2 bg-slate-600"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="p-3 bg-white text-blue-900 rounded-xl shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-sky-500 text-white rounded-xl shadow"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={handleNext}
              className="p-3 bg-white rounded-xl text-blue-900 shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* METRICS */}
   
      </div>

{/* Add these styles to your component */}
<style>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
  }
  
  .animate-scanline {
    animation: scanline 3s linear infinite;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
`}</style>
    </section>
  );
};

export default Testimonials;