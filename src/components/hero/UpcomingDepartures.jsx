// import React, { useState, useEffect, useRef } from "react";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   TrendingUp,
//   CheckCircle,
//   Play,
//   Pause,
//   Mountain,
//   Sparkles,
//   ArrowRight,
//   Terminal,
//   Activity,
//   Target,
//   Zap
// } from "lucide-react";

// import { useSelector, useDispatch } from "react-redux";
// import { selectUpcomingTreks, fetchTreksAsync } from "../../store/slices/trekSlice";
// import { Link } from "react-router-dom";

// const UpcomingDepartures = () => {
//   const dispatch = useDispatch();
//   const upcomingTreks = useSelector(selectUpcomingTreks);
//   const status = useSelector((state) => state.treks.status);

//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [slideDirection, setSlideDirection] = useState("next");
//   const [prevSlide, setPrevSlide] = useState(null);

//   const sliderRef = useRef(null);
//   const timerRef = useRef(null);
//   const activeSlideRef = useRef(activeSlide);

//   useEffect(() => {
//     activeSlideRef.current = activeSlide;
//   }, [activeSlide]);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchTreksAsync());
//     }
//   }, [status, dispatch]);

//   const departures = upcomingTreks.length > 0 ? upcomingTreks.map(trek => ({
//     id: trek._id,
//     name: trek.title,
//     location: trek.location,
//     date: trek.startDate || "TBA",
//     duration: trek.duration,
//     groupSize: trek.groupSize,
//     slotsLeft: 5, // Simulated for UI
//     price: `₹${trek.price?.toLocaleString()}`,
//     rating: trek.rating || "A1",
//     difficulty: trek.difficulty || "MODERATE",
//     image: trek.image?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
//     discount: trek.discount ? `${trek.discount}%_OFF` : null,
//   })) : [];

//   useEffect(() => {
//     if (!isPlaying) {
//       if (timerRef.current) clearInterval(timerRef.current);
//       return;
//     }

//     const slideDuration = 6000;
//     const interval = 50;
//     const steps = slideDuration / interval;
//     let step = 0;

//     if (departures.length > 0) {
//       timerRef.current = setInterval(() => {
//         step++;
//         setProgress((step / steps) * 100);

//         if (step >= steps) {
//           step = 0;
//           setProgress(0);
//           slideTransition((activeSlideRef.current + 1) % departures.length, "next");
//         }
//       }, interval);
//     }

//     return () => clearInterval(timerRef.current);
//   }, [isPlaying, departures.length]);

//   const getDaysLeft = (dateStr) => {
//     if (!dateStr || dateStr === "TBA") return "TBA";
//     const targetDate = new Date(dateStr);
//     const today = new Date();
//     const diffTime = targetDate - today;
//     const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
//     return `${days}D_REMAINING`;
//   };

//   const slideTransition = (targetSlide, direction = "next") => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setSlideDirection(direction);
//     setPrevSlide(activeSlide);
//     setActiveSlide(targetSlide);
//     setTimeout(() => {
//       setPrevSlide(null);
//       setIsAnimating(false);
//     }, 700);
//   };

//   const nextSlide = () => slideTransition((activeSlide + 1) % departures.length, "next");
//   const prevSlides = () => slideTransition((activeSlide - 1 + departures.length) % departures.length, "prev");
//   const goToSlide = (index) => slideTransition(index, index > activeSlide ? "next" : "prev");

//   if (status === 'loading') {
//     return (
//       <div className="py-40 bg-obsidian flex flex-col items-center gap-6">
//         <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
//         <div className="data-text text-primary text-[10px] tracking-widest animate-pulse font-black uppercase tracking-[0.4em]">SYNCHRONIZING_LAUNCH_DATA...</div>
//       </div>
//     );
//   }

//   if (departures.length === 0) {
//     return (
//       <section className="py-32 bg-obsidian border-t border-white/5 text-center">
//         <div className="hud-panel p-20 max-w-2xl mx-auto border-white/5 bg-white/[0.01]">
//           <div className="data-text text-white/30 mb-4 tracking-widest text-[11px] font-black uppercase">[NO_ACTIVE_LAUNCHES_DETECTION]</div>
//           <p className="data-text text-[10px] text-primary/40 uppercase tracking-[0.3em]">Check telemetry logs for future sector operational windows.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
//       {/* Tactical Grid Background */}
//       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
//         <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Technical Header Section */}
//         <div className="mb-24 animate-fade-in relative flex flex-col md:flex-row justify-between items-end gap-12">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
//               <Terminal size={14} className="text-primary" />
//               <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">DEPLOYMENT_TELEMETRY_V2.9</span>
//             </div>
//             <h2 className="text-4xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase italic">
//               Imminent <br />
//               <span className="command-gradient">Deployments</span>
//             </h2>
//             <p className="data-text text-primary/40 text-sm leading-relaxed uppercase tracking-widest">
//               [SYSTEM_ALERT] {">"} Verified launch windows for active sectors.
//               Authorized units must initialize boarding protocols within the
//               defined temporal mission parameters.
//             </p>
//           </div>
//           <div className="hidden lg:flex flex-col items-end gap-3 opacity-40">
//             <div className="flex items-center gap-3">
//               <Activity size={14} className="text-secondary animate-pulse" />
//               <span className="data-text text-[9px] text-white/40 uppercase tracking-[0.3em]">MISSION_SYNC_ACTIVE</span>
//             </div>
//             <span className="data-text text-3xl font-black text-white tracking-widest">{new Date().toLocaleTimeString('en-IN', { hour12: false })}</span>
//           </div>
//         </div>

//         {/* Tactical Carousel UI */}
//         <div className="relative max-w-7xl mx-auto">
//           <div className="relative h-[750px] md:h-[600px] overflow-hidden hud-panel border-white/5 bg-white/[0.01]">
//             <div className="absolute inset-0">
//               {/* CURRENT SLIDE (slides IN) */}
//               <div key={activeSlide} className={`absolute inset-0 z-10 transition-all duration-700 ${isAnimating ? (slideDirection === "next" ? "animate-slideInRight" : "animate-slideInLeft") : ""}`}>
//                 <div className="grid lg:grid-cols-2 h-full bg-obsidian">

//                   {/* Visual Recon Side */}
//                   <div className="relative h-full overflow-hidden group">
//                     <img src={departures[activeSlide].image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-105 group-hover:scale-100" alt={departures[activeSlide].name} />
//                     <div className="absolute inset-0 bg-gradient-to-r from-obsidian/20 via-transparent to-obsidian"></div>

//                     {/* Technical Overlays */}
//                     <div className="absolute top-10 left-10 flex flex-col gap-4">
//                       <div className="hud-panel px-5 py-2 border-primary/40 bg-obsidian/80 backdrop-blur-xl flex items-center gap-3">
//                         <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
//                         <span className="data-text text-[10px] text-white font-black tracking-widest">{departures[activeSlide].slotsLeft.toString().padStart(2, '0')} UNITS_AVAILABLE</span>
//                       </div>
//                       {departures[activeSlide].discount && (
//                         <div className="hud-panel px-5 py-2 border-secondary/40 bg-secondary/20 text-secondary data-text text-[10px] font-black tracking-widest uppercase">
//                           {departures[activeSlide].discount}
//                         </div>
//                       )}
//                     </div>

//                     <div className="absolute bottom-10 left-10 right-10">
//                       <div className="hud-panel p-8 bg-obsidian/60 backdrop-blur-2xl border-white/10 group-hover:border-primary/40 transition-all duration-700">
//                         <div className="flex flex-col md:flex-row items-center gap-12">
//                           <div className="text-center md:text-left">
//                             <div className="data-text text-[9px] text-white/40 mb-3 uppercase tracking-widest">MISSION_LAUNCH</div>
//                             <div className="data-text text-2xl font-black text-white italic">{departures[activeSlide].date.toUpperCase()}</div>
//                           </div>
//                           <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
//                           <div className="text-center md:text-left">
//                             <div className="data-text text-[9px] text-primary/40 mb-3 uppercase tracking-widest">TIME_WINDOW</div>
//                             <div className="data-text text-2xl font-black text-primary uppercase animate-pulse">{getDaysLeft(departures[activeSlide].date)}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Operational Data Side */}
//                   <div className="p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

//                     <div className="relative z-10">
//                       <div className="flex items-center gap-4 text-primary data-text text-[10px] font-black tracking-[0.4em] mb-10">
//                         <Target size={14} className="animate-pulse" />
//                         COORD: {departures[activeSlide].location.toUpperCase()}
//                       </div>
//                       <h3 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[0.9] tracking-tighter uppercase italic">
//                         {departures[activeSlide].name.split(' ')[0]} <br />
//                         <span className="opacity-30">{departures[activeSlide].name.split(' ').slice(1).join(' ')}</span>
//                       </h3>

//                       <div className="grid grid-cols-3 gap-px bg-white/10 hud-panel overflow-hidden border-white/10 mb-12">
//                         <div className="bg-obsidian/40 p-6 flex flex-col items-center text-center">
//                           <div className="data-text text-[7px] text-white/20 mb-3 uppercase tracking-widest">Personnel</div>
//                           <div className="data-text text-[11px] font-black text-white">[{departures[activeSlide].groupSize.toUpperCase()}]</div>
//                         </div>
//                         <div className="bg-obsidian/40 p-6 flex flex-col items-center text-center">
//                           <div className="data-text text-[7px] text-white/20 mb-3 uppercase tracking-widest">Duration</div>
//                           <div className="data-text text-[11px] font-black text-white">{departures[activeSlide].duration.toUpperCase()}</div>
//                         </div>
//                         <div className="bg-obsidian/40 p-6 flex flex-col items-center text-center">
//                           <div className="data-text text-[7px] text-white/20 mb-3 uppercase tracking-widest">Complexity</div>
//                           <div className="data-text text-[11px] font-black text-secondary">{departures[activeSlide].difficulty.toUpperCase()}</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between mb-16 relative z-10">
//                       <div className="space-y-1">
//                         <div className="data-text text-[8px] text-white/20 uppercase tracking-widest">DEPLOYMENT_FEES</div>
//                         <div className="flex items-baseline gap-2">
//                           <span className="text-primary text-xl font-black italic">$</span>
//                           <span className="text-5xl font-black text-white tracking-tighter italic">{departures[activeSlide].price}</span>
//                         </div>
//                         <p className="data-text text-[7px] text-primary/40 font-black uppercase tracking-widest mt-2">Validated Net Logistics Cost</p>
//                       </div>
//                       <Link
//                         to={`/trek/${departures[activeSlide].id}`}
//                         className="w-16 h-16 hud-panel border-white/10 bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-obsidian hover:border-primary transition-all duration-700 hover:scale-110 group/link"
//                       >
//                         <ArrowRight size={24} className="group-hover/link:translate-x-1.5 transition-transform" />
//                       </Link>
//                     </div>

//                     <button className="group relative w-full py-7 hud-panel border-primary/40 bg-primary/5 text-obsidian overflow-hidden transition-all duration-700 hover:glow-primary">
//                       <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
//                       <span className="data-text text-[12px] font-black tracking-[0.5em] relative z-10 transition-colors group-hover:text-obsidian text-primary">INITIALIZE_BOARDING</span>
//                     </button>

//                     {/* Launch Indicators readout */}
//                     <div className="absolute bottom-10 right-12 flex gap-1.5 items-end">
//                       <span className="data-text text-[6px] text-white/10 mr-4">SYS_STABLE_V4_8</span>
//                       {[1, 2, 3, 4, 5, 4, 3].map((v, i) => (
//                         <div key={i} className={`w-1 bg-primary/20 transition-all duration-500`} style={{ height: `${v * 4}px`, animationDelay: `${i * 0.1}s`, opacity: 0.2 + (v * 0.1) }}></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tactical Nav Controls Overlay */}
//           <div className="absolute top-1/2 -left-8 md:-left-12 -translate-y-1/2 z-30">
//             <button onClick={prevSlides} className="w-16 h-32 hud-panel bg-obsidian/40 backdrop-blur-xl border-white/10 text-white/20 hover:text-primary hover:border-primary transition-all flex items-center justify-center group">
//               <ChevronLeft size={28} className="group-hover:-translate-x-1.5 transition-transform" />
//             </button>
//           </div>
//           <div className="absolute top-1/2 -right-8 md:-right-12 -translate-y-1/2 z-30">
//             <button onClick={nextSlide} className="w-16 h-32 hud-panel bg-obsidian/40 backdrop-blur-xl border-white/10 text-white/20 hover:text-primary hover:border-primary transition-all flex items-center justify-center group">
//               <ChevronRight size={28} className="group-hover:translate-x-1.5 transition-transform" />
//             </button>
//           </div>

//           {/* Mission Progress Indicators */}
//           <div className="flex justify-center mt-16 gap-6 relative">
//             {departures.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => goToSlide(idx)}
//                 className={`group relative h-[3px] transition-all duration-1000 ${idx === activeSlide ? 'w-24 bg-primary glow-primary' : 'w-10 bg-white/5 hover:bg-white/20'}`}
//               >
//                 {idx === activeSlide && (
//                   <div className="absolute top-4 left-1/2 -translate-x-1/2 data-text text-[8px] font-black text-primary whitespace-nowrap animate-pulse uppercase tracking-[0.4em]">MISSION_SECTOR_0{idx + 1}</div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideInRight {
//           from { opacity: 0; transform: skewX(-5deg) translateX(100px); }
//           to { opacity: 1; transform: skewX(0) translateX(0); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: skewX(5deg) translateX(-100px); }
//           to { opacity: 1; transform: skewX(0) translateX(0); }
//         }
//         .animate-slideInRight { animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
//         .animate-slideInLeft { animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
//       `}</style>
//     </section>
//   );
// };

// export default UpcomingDepartures;



import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  CheckCircle,
  Play,
  Pause,
  Mountain,
  Sparkles,
  ArrowRight,
  Terminal,
  Activity,
  Target,
  Zap,
  Navigation,
  Wind,
  Gauge,
  Radio,
  Scan,
  Compass,
  Sunrise,
  Sunset,
  CloudSun,
  Feather,
  Cherry,
  Leaf,
  Waves,
  Heart
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { selectUpcomingTreks, fetchTreksAsync } from "../../store/slices/trekSlice";
import { Link } from "react-router-dom";

const UpcomingDepartures = () => {
  const dispatch = useDispatch();
  const upcomingTreks = useSelector(selectUpcomingTreks);
  const status = useSelector((state) => state.treks.status);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [prevSlide, setPrevSlide] = useState(null);

  const sliderRef = useRef(null);
  const timerRef = useRef(null);
  const activeSlideRef = useRef(activeSlide);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTreksAsync());
    }
  }, [status, dispatch]);

  const departures = upcomingTreks.length > 0 ? upcomingTreks.map(trek => ({
    id: trek._id,
    name: trek.title,
    location: trek.location,
    date: trek.startDate || "TBA",
    duration: trek.duration,
    groupSize: trek.groupSize,
    slotsLeft: Math.floor(Math.random() * 8) + 2,
    price: `₹${trek.price?.toLocaleString()}`,
    rating: trek.rating || "A1",
    difficulty: trek.difficulty || "MODERATE",
    image: trek.image?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
    discount: trek.discount ? `${trek.discount}% OFF` : null,
  })) : [];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const slideDuration = 6000;
    const interval = 50;
    const steps = slideDuration / interval;
    let step = 0;

    if (departures.length > 0) {
      timerRef.current = setInterval(() => {
        step++;
        setProgress((step / steps) * 100);

        if (step >= steps) {
          step = 0;
          setProgress(0);
          slideTransition((activeSlideRef.current + 1) % departures.length, "next");
        }
      }, interval);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, departures.length]);

  const getDaysLeft = (dateStr) => {
    if (!dateStr || dateStr === "TBA") return "TBA";
    const targetDate = new Date(dateStr);
    const today = new Date();
    const diffTime = targetDate - today;
    const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return `${days}`;
  };

  const slideTransition = (targetSlide, direction = "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setPrevSlide(activeSlide);
    setActiveSlide(targetSlide);
    setTimeout(() => {
      setPrevSlide(null);
      setIsAnimating(false);
    }, 700);
  };

  const nextSlide = () => slideTransition((activeSlide + 1) % departures.length, "next");
  const prevSlides = () => slideTransition((activeSlide - 1 + departures.length) % departures.length, "prev");
  const goToSlide = (index) => slideTransition(index, index > activeSlide ? "next" : "prev");

  if (status === 'loading') {
    return (
      <div className="py-40 bg-gradient-to-b from-sky-50 via-white to-blue-50 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-sky-200 border-t-sky-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Mountain className="w-8 h-8 text-sky-400 animate-pulse" />
          </div>
        </div>
        <div className="text-sky-600 text-sm tracking-wider animate-pulse font-medium">Discovering upcoming adventures...</div>
      </div>
    );
  }

  if (departures.length === 0) {
    return (
      <section className="py-32 bg-gradient-to-b from-sky-50 via-white to-blue-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-200/50 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-sky-200 rounded-3xl p-16 shadow-xl">
              <Feather className="w-20 h-20 text-sky-300 mx-auto mb-6" />
              <div className="text-sky-800 mb-3 text-lg font-light">No upcoming departures</div>
              <p className="text-sky-600/60 text-sm">New adventures are being planned. Check back soon!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-sky-50 via-white to-blue-50 relative overflow-hidden">
      {/* Light & Airy Background Elements */}
      <div className="absolute inset-0">
      

        {/* Soft Wave Lines */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-sky-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-100/50 to-transparent"></div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

        {/* Light Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(125, 211, 252, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(125, 211, 252, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section - Light & Elegant */}
        <div className="mb-16 text-center md:text-left md:flex md:justify-between md:items-end">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-sky-700 text-xs font-medium tracking-wide">UPCOMING JOURNEYS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-sky-900 mb-4">
              Ready for your next
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mt-2">
               Adventure Awaits!
              </span>
            </h2>
            <p className="text-sky-700/70 text-lg leading-relaxed">
              Your next unforgettable adventure is just around the corner. 
              Join carefully curated journeys that promise thrills, discovery, and memories to last a lifetime.
            </p>
          </div>
          
          {/* Season Indicator */}
          <div className="hidden md:flex items-center gap-4 mt-8 md:mt-0">
            <div className="flex -space-x-2">
              {[Sunrise, CloudSun, Sunset].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm text-sky-600">Explore the Peaks</div>
<div className="text-xs text-sky-400">Your Next Journey Awaits</div>
            </div>
          </div>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="absolute -top-8 left-0 right-0 flex justify-between items-center">
            <span className="text-sm text-sky-600 font-light tracking-wider">
              EXPLORING <span className="font-bold">{activeSlide + 1}</span> OF {departures.length}
            </span>
            <div className="w-48 h-1 bg-sky-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${(activeSlide + 1) / departures.length * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Slide Container */}
          <div className="relative min-h-[600px]">
            <div 
              className={`absolute inset-0 transition-all duration-700 ${
                isAnimating 
                  ? slideDirection === "next" 
                    ? "animate-slideInRight" 
                    : "animate-slideInLeft"
                  : ""
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-stretch min-h-[590px]">
                {/* Image Card - Modern & Clean */}
                <div className="relative rounded-3xl overflow-hidden group shadow-2xl shadow-sky-200/50 h-full">
                  <img 
                    src={departures[activeSlide].image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={departures[activeSlide].name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/20 to-transparent"></div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-3">
                    {departures[activeSlide].discount && (
                      <div className="bg-white/95 backdrop-blur-sm text-sky-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        {departures[activeSlide].discount}
                      </div>
                    )}
                   
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
                      <div className="text-xs text-sky-600 mb-1">STARTS IN</div>
                      <div className="text-3xl font-bold text-sky-900">{getDaysLeft(departures[activeSlide].date)}</div>
                      <div className="text-xs text-sky-500">days</div>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{departures[activeSlide].location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Card - Light & Airy */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-sky-100 flex flex-col h-full">
                  {/* Difficulty Tag */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider ${
                      departures[activeSlide].difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-700' :
                      departures[activeSlide].difficulty === 'MODERATE' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {departures[activeSlide].difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Trek Name */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-sky-900 mb-4 leading-tight">
                    {departures[activeSlide].name}
                  </h3>

                  {/* Quick Stats - Modern Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-sky-50 rounded-xl p-4">
                      <Users className="w-5 h-5 text-sky-600 mb-2" />
                      <div className="text-xs text-sky-600/70">Group</div>
                      <div className="text-sm font-bold text-sky-900">{departures[activeSlide].groupSize}</div>
                    </div>
                    <div className="bg-sky-50 rounded-xl p-4">
                      <Clock className="w-5 h-5 text-sky-600 mb-2" />
                      <div className="text-xs text-sky-600/70">Duration</div>
                      <div className="text-sm font-bold text-sky-900">{departures[activeSlide].duration}</div>
                    </div>
                    <div className="bg-sky-50 rounded-xl p-4">
                      <Calendar className="w-5 h-5 text-sky-600 mb-2" />
                      <div className="text-xs text-sky-600/70">Start</div>
                      <div className="text-sm font-bold text-sky-900">
                        {new Date(departures[activeSlide].date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {['Professional guides', 'All equipment included', 'Meals & accommodation', 'Emergency support'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sky-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-sm text-sky-600/70 block mb-1">Starting from</span>
                        <span className="text-4xl font-bold text-sky-900">{departures[activeSlide].price}</span>
                        <span className="text-sm text-sky-600/70 ml-2">per person</span>
                      </div>
                      
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to={`/trek/${departures[activeSlide].id}`}
                        className="flex-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white py-4 rounded-xl font-medium hover:from-sky-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-sky-200 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <button className="w-14 h-14 bg-white border-2 border-sky-200 rounded-xl flex items-center justify-center hover:border-sky-400 transition-colors group">
                        <Heart className="w-6 h-6 text-sky-400 group-hover:text-rose-400 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - Modern Minimal */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevSlides}
              className="w-12 h-12 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center hover:border-sky-400 hover:bg-sky-50 transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-sky-600 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            {/* Slide Indicators */}
            <div className="flex gap-3">
              {departures.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="group relative"
                >
                  <div
                    className={`rounded-full transition-all duration-500 ${
                      idx === activeSlide 
                        ? 'w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-400 text-white flex items-center justify-center text-sm font-bold' 
                        : 'w-3 h-3 bg-sky-200 hover:bg-sky-300'
                    }`}
                  >
                    {idx === activeSlide && idx + 1}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center hover:border-sky-400 hover:bg-sky-50 transition-all group"
            >
              <ChevronRight className="w-5 h-5 text-sky-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute -bottom-16 right-0 flex items-center gap-2 text-sky-600/60 hover:text-sky-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause size={16} />
                <span className="text-sm">Pause</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span className="text-sm">Auto-play</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Decoration */}
        
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.5; }
        }
        
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default UpcomingDepartures;