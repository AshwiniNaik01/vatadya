
// import React, { useEffect, useState } from "react";
// import { Zap, Compass } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Axios for API calls
// import axiosInstance from "../../api/axiosInstance";

// const Hero = () => {
//   const navigate = useNavigate();
//   const [heroData, setHeroData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHeroSection = async () => {
//       try {
//         const response = await axiosInstance.get(`/api/hero`);
//         if (response.data.success) {
//           setHeroData(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching hero section:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHeroSection();
//   }, []);

//   if (loading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center">
//         <p className="text-white">Loading...</p>
//       </section>
//     );
//   }

//   if (!heroData) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center">
//         <p className="text-white">Hero section not found.</p>
//       </section>
//     );
//   }

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-16 bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700 selection:bg-blue-200 selection:text-sky-900"
//     >
//       {/* Background Layers */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {/* Soft gradient overlay */}
//         <div
//           className="absolute inset-0 z-10 bg-gradient-to-b from-white/50 via-blue-400/30 to-blue-900"
//         ></div>

//         {/* Mountain Image from API */}
//         <div className="absolute inset-0 opacity-25 filter contrast-110 saturate-105">
//           <img
//             src={heroData.image?.cdnUrl || heroData.image?.fullS3URL}
//             className="w-full h-full object-cover scale-105 transition-all duration-1000"
//             alt={heroData.title}
//           />
//         </div>

//         {/* Subtle grid overlay */}
//         <div
//           className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)",
//             backgroundSize: "60px 60px",
//           }}
//         ></div>

//         {/* Moving scanline */}
//         <div className="absolute inset-0 bg-linear-to-b from-transparent via-yellow-400/5 to-transparent h-1/2 animate-scanline pointer-events-none opacity-10"></div>
//       </div>

//       {/* Main Heading */}
//       <div className="relative z-20 text-center px-6 max-w-4xl">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-snug tracking-tight">
//   {heroData?.title ? (
//     <>
//       {/* First word or part - plain or single color */}
//       <span className="block text-blue-900">{heroData.title.split(' ')[0]}</span>

//       {/* Second word or rest of title - gradient / colored */}
//       <span className="block text-white italic bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
//         {heroData.title.split(' ').slice(1).join(' ')}
//       </span>
//     </>
//   ) : (
//     <>
//       <span className="block text-blue-900">Default</span>
//       <span className="block text-white italic bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
//         Title
//       </span>
//     </>
//   )}
// </h1>

//         <p className="text-white/90 text-base md:text-lg mb-12 leading-relaxed tracking-wide">
//           {heroData.description}
//         </p>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
//           <button
//             onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}
//             className="group relative px-12 py-4 bg-cyan-400 text-sky-900 font-bold uppercase tracking-widest border-3 hover:border-white/90 overflow-hidden rounded-md hover:scale-105 hover:shadow-lg transition-all duration-500"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <Zap className="w-4 h-4" />
//               START TREK
//             </span>
//             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 rounded-md"></div>
//           </button>

//           <button
//             onClick={() => navigate("/trek-gallery")}
//             className="group relative px-12 py-4 border-3 border-white/20 bg-white/5 text-white hover:border-white/50 hover:text-white font-bold uppercase tracking-widest overflow-hidden rounded-md transition-all duration-500"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <Compass className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
//               View Gallery
//             </span>
//             <div className="absolute inset-0 bg-blue-700/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-md"></div>
//           </button>
//         </div>

//         {/* Telemetry Panel */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-md p-4">
//           {[
//             { label: "PEAKS CLIMBED", value: heroData.peaksClimbed, color: "text-emerald-200" },
//             { label: "TOTAL DISTANCE", value: heroData.totalDistance, color: "text-emerald-100" },
//             { label: "AVG ALTITUDE", value: heroData.avgAltitude, color: "text-emerald-200" },
//             { label: "TREK TIME", value: heroData.trekTime, color: "text-emerald-100" },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col items-center justify-center gap-2 bg-white/5 p-4 rounded-md hover:bg-yellow-400/10 transition-all duration-500"
//             >
//               <span className="data-text text-xs text-white font-bold uppercase tracking-wider">{stat.label}</span>
//               <span className={`data-text text-2xl md:text-3xl font-extrabold ${stat.color} italic`}>
//                 {stat.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useEffect, useState, useRef } from "react";
import { Zap, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Hero = () => {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = heroRef.current.getBoundingClientRect();
        const x = (clientX / width - 0.5) * 20;
        const y = (clientY / height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response = await axiosInstance.get(`/api/hero`);
        if (response.data.success) {
          setHeroData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching hero section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `floatParticle ${Math.random() * 20 + 15}s linear infinite`,
              }}
            />
          ))}
        </div>
        <div className="relative text-center">
          <div className="w-24 h-24 border-4 border-sky-400/30 border-t-sky-400 rounded-full animate-spin mx-auto mb-8" />
          <p className="text-sky-400 text-sm tracking-[0.3em] uppercase animate-pulse">ASCENDING TO PEAKS</p>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950">
        <p className="text-white/60">Hero section not found.</p>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 30%, #0A4B72 70%, #0B5B86 100%)',
      }}
    >
      {/* ===== DYNAMIC BACKGROUND LAYERS ===== */}

      {/* Layer 1: Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `floatParticle ${Math.random() * 20 + 15}s linear infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* Layer 2: Gradient Orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"
          style={{ transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Layer 3: Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `perspective(500px) rotateX(${mousePosition.y * 0.2}deg)`,
        }}
      />

      {/* Layer 4: Moving Light Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-50%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent animate-scan-slow" />
        <div className="absolute bottom-0 left-[-50%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-scan-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Layer 5: Background Image with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src={heroData.image?.cdnUrl || heroData.image?.fullS3URL}
          className="w-full h-full object-cover opacity-30"
          alt={heroData.title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A3B5E]/50 to-[#0B2B4A]" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-20 text-center px-6 pt-20 mx-auto max-w-8xl">

        {/* Floating Badge */}
        {/* <div
          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
          style={{ animation: 'fadeUp 0.8s ease-out 0.1s both' }}
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
            {heroData.badge || "EXPLORE THE UNKNOWN"}
          </span>
        </div> */}

        {/* Main Title with 3D Letter Effect */}
        <h1
          className="text-6xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter"
          style={{ animation: 'fadeUp 0.8s ease-out 0.2s both' }}
        >
          {heroData?.title ? (
            <>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                {heroData.title.split(' ')[0]}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 mt-2 relative">
                {heroData.title.split(' ').slice(1).join(' ')}
                {/* 3D Shadow Effect */}
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-amber-500/50 to-yellow-600/50 blur-xl -z-10">
                  {heroData.title.split(' ').slice(1).join(' ')}
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="block text-white">DEFAULT</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 mt-2">
                TITLE
              </span>
            </>
          )}
        </h1>

        {/* Description with Glass Effect */}
        <p
          className="text-white/80 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
          style={{ animation: 'fadeUp 0.8s ease-out 0.3s both' }}
        >
          {heroData.description}
        </p>

        {/* CTA Buttons with Enhanced Design */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          style={{ animation: 'fadeUp 0.8s ease-out 0.4s both' }}
        >
          <button
            onClick={() => navigate("/treks")}
            className="group relative px-10 py-5 overflow-hidden rounded-2xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg tracking-wider">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              START TREK
            </span>
          </button>

          <button
            onClick={() => navigate("/trek-gallery")}
            className="group relative px-10 py-5 overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border-2 border-white/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg tracking-wider">
              <Compass className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              VIEW GALLERY
            </span>
          </button>
        </div>

        {/* Stats Panel - Glass Morphism */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
          style={{ animation: 'fadeUp 0.8s ease-out 0.5s both' }}
        >
          {[
            { label: "PEAKS CLIMBED", value: heroData.peaksClimbed, color: "from-sky-400 to-blue-400" },
            { label: "TOTAL DISTANCE", value: heroData.totalDistance, color: "from-emerald-400 to-teal-400" },
            { label: "AVG ALTITUDE", value: heroData.avgAltitude, color: "from-amber-400 to-orange-400" },
            { label: "TREK TIME", value: heroData.trekTime, color: "from-purple-400 to-pink-400" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group relative text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-500"
            >
              {/* Gradient Line */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />

              <span className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
                {stat.label}
              </span>
              <span className={`block text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}
          style={{ animation: 'fadeUp 0.8s ease-out 0.6s both' }}
        >
          <span className="text-white/40 text-xs font-medium uppercase tracking-wider group-hover:text-white/60 transition-colors">
            DISCOVER MORE
          </span>
          <div className="relative">
            <div className="w-0.5 h-12 bg-white/20 rounded-full overflow-hidden">
              <div className="w-full h-1/3 bg-gradient-to-b from-white to-transparent animate-scroll" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-100px) rotate(180deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes scan-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-scan-slow {
          animation: scan-slow 6s linear infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;