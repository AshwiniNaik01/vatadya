import React, { useEffect, useState, useRef } from "react";
import { Zap, Compass, Mountain, Route, TrendingUp, Timer } from "lucide-react";
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
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `floatParticle ${Math.random() * 20 + 15}s linear infinite`,
              }}
            />
          ))}
        </div>
        <div className="relative text-center">
          <div className="w-24 h-24 border-4 border-sky-400/30 border-t-sky-400 rounded-full animate-spin mx-auto mb-8" />
          <p className="text-sky-400 text-sm tracking-[0.3em] uppercase animate-pulse">
            ASCENDING TO PEAKS
          </p>
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
      className="relative min-h-screen flex flex-col pt-14 items-center justify-center overflow-hidden bg-[#071826]"
    >
      {/* 🌫️ SOFT ATMOSPHERIC LAYERS */}
      <div className="absolute inset-0">
        {/* subtle gradient fog */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2B4A] via-[#071826] to-black opacity-90" />

        {/* soft floating orbs (reduced intensity) */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      {/* 🌄 SIMPLIFIED MOUNTAIN PARALLAX (SUBTLE) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 w-[200%] h-[60%] bg-[url('/mountains-far.png')] bg-repeat-x bg-bottom opacity-20 animate-[scrollFar_30s_linear_infinite]" />
        <div className="absolute bottom-0 w-[200%] h-[45%] bg-[url('/mountains-front.png')] bg-repeat-x bg-bottom opacity-30 animate-[scrollFront_20s_linear_infinite]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* ✨ REDUCED PARTICLES (MORE LUXURY FEEL) */}
      <div className="absolute inset-0">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `floatParticle ${Math.random() * 25 + 20}s linear infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* 🧠 MAIN CONTENT (CLEAN FOCUS) */}
      <div className="relative z-20 text-center px-6 max-w-8xl">
        {/* TITLE */}
        <h1
          className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6"
          style={{ animation: "fadeUp 0.8s ease-out both" }}
        >
          <span className="block text-white/90">
            {heroData?.title?.split(" ")[0] || ""}
          </span>

          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 mt-2">
            {heroData?.title?.split(" ").slice(1).join(" ") || ""}
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="text-white/70 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: heroData.description }}
          style={{ animation: "fadeUp 1s ease-out 0.2s both" }}
        />
        <div className="relative flex items-center justify-center gap-2 text-emerald-300/80 text-sm font-bold mb-6 tracking-widest animate-pulse">
          <Route className="w-6 h-6" />

          <span>JOURNEY BEGINS HERE</span>

          {/* STATIC UNDERLINE */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70" />
        </div>

        {/* CTA (MORE PREMIUM SPACING) */}
        <div
          className="flex flex-col sm:flex-row gap-5 justify-center mb-6"
          style={{ animation: "fadeUp 1s ease-out 0.4s both" }}
        >
          {/* PRIMARY CTA */}
          <button
            onClick={() => navigate("/treks")}
            className="group flex items-center gap-3 px-8 py-3 rounded-xl animate-pulse bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold tracking-wide hover:scale-105 transition-transform shadow-lg"
          >
            <Zap className="w-4 h-4 group-hover:rotate-180 transition" />
            START TREK
          </button>

          {/* SECONDARY CTA */}
          <button
            onClick={() => navigate("/trek-gallery")}
            className="group flex items-center gap-3 px-8 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition"
          >
            <Compass className="w-4 h-4 group-hover:rotate-180 transition duration-700" />
            VIEW GALLERY
          </button>
        </div>

        {/* 📊 STATS (LESS FLASHY, MORE PREMIUM) */}
       <div
  className="grid grid-cols-2 md:grid-cols-4 gap-50 md:gap-30 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 md:p-4 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
  style={{ animation: "fadeUp 1s ease-out 0.4s both" }}
>
  {[
    { label: "PEAKS", value: heroData.peaksClimbed, icon: Mountain, color: "from-sky-400 to-blue-500" },
    { label: "DISTANCE", value: heroData.totalDistance, icon: Route, color: "from-emerald-400 to-teal-500" },
    { label: "ALTITUDE", value: heroData.avgAltitude, icon: TrendingUp, color: "from-amber-400 to-orange-500" },
    { label: "TREK TIME", value: heroData.trekTime, icon: Timer, color: "from-purple-400 to-pink-500" },
  ].map((stat, i) => {
    const Icon = stat.icon;

    return (
      <div
        key={i}
        className="group relative flex flex-col items-center justify-center text-center p-2 rounded-2xl transition-all duration-500 hover:scale-[1.05]"
      >
        {/* glow background */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-xl transition`}
        />

        {/* icon badge */}
        {/* <div className="relative mb-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition`}
          >
            <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition" />
          </div>
        </div> */}

        {/* label */}
        <div className={`text-${stat.color.split('-')[1]} text-sm uppercase tracking-[0.25em] mb-2`} >
          {stat.label}
        </div>

        {/* value */}
        <div
          className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
        >
          {stat.value}
        </div>

        {/* subtle underline */}
        <div className="mt-3 w-10 h-[1px] bg-white/10 group-hover:w-16 transition-all duration-500" />
      </div>
    );
  })}
</div>
      </div>

      {/* 🎨 STYLES */}
      <style>{`
      @keyframes floatParticle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-80px); }
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes scrollFar {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes scrollFront {
        from { transform: translateX(0); }
        to { transform: translateX(-30%); }
      }

      .animate-pulse-slow {
        animation: pulse-slow 6s ease-in-out infinite;
      }

      @keyframes pulse-slow {
        0%, 100% { opacity: 0.25; }
        50% { opacity: 0.4; }
      }
    `}</style>
    </section>
  );
};

export default Hero;
