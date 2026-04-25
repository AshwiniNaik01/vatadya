import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  ShieldCheck,
  Briefcase,
  Users,
  Zap,
  Star,
  Award,
  Leaf,
  Smile,
  Map,
  Globe,
  TrendingUp,
  ThumbsUp,
  CheckCircle,
  Gem,
  Activity,
  Target,
  Compass,
  Cpu,
  Layers,
  Radio,
  ArrowRight,
  Mountain,
  ChevronDown,
  Sparkles,
  Camera,
  Clock,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  TreePine,
  Footprints,
  Tent,
  Coffee,
  Compass as CompassIcon,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Icon pool for random assignment
const iconPool = [
  Heart,
  ShieldCheck,
  Briefcase,
  Users,
  Zap,
  Star,
  Award,
  Leaf,
  Smile,
  Map,
  Globe,
  TrendingUp,
  ThumbsUp,
  CheckCircle,
  Gem,
  Activity,
  Target,
  Compass,
  Cpu,
  Layers,
  Radio,
  ArrowRight,
  Mountain,
  ChevronDown,
  Sparkles,
  Camera,
  Clock,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  TreePine,
  Footprints,
  Tent,
  Coffee,
  CompassIcon,
  Navigation,
];

// Color combinations for icons
const colorCombos = [
  { color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
  { color: "text-sky-500", bg: "bg-sky-50", border: "border-sky-100" },
  { color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-100" },
  { color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  {
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  { color: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
  { color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-100" },
  { color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
  { color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100" },
  { color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-100" },
  { color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
  { color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100" },
  { color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-100" },
  { color: "text-cyan-500", bg: "bg-cyan-50", border: "border-cyan-100" },
];

// Helper function to get random icon
const getRandomIcon = (usedIcons = []) => {
  const availableIcons = iconPool.filter((icon) => !usedIcons.includes(icon));
  if (availableIcons.length === 0)
    return iconPool[Math.floor(Math.random() * iconPool.length)];
  return availableIcons[Math.floor(Math.random() * availableIcons.length)];
};

// Helper function to get random color combo
const getRandomColorCombo = (usedCombos = []) => {
  const availableCombos = colorCombos.filter(
    (combo) => !usedCombos.includes(combo),
  );
  if (availableCombos.length === 0)
    return colorCombos[Math.floor(Math.random() * colorCombos.length)];
  return availableCombos[Math.floor(Math.random() * availableCombos.length)];
};

const AboutUsPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeValue, setActiveValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // State for icons
  const [coreValuesWithIcons, setCoreValuesWithIcons] = useState([]);
  const [capabilitiesWithIcons, setCapabilitiesWithIcons] = useState([]);
  const [statsWithIcons, setStatsWithIcons] = useState([]);

  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const bgRefs = useRef([]);
  const foregroundRef = useRef(null);

  // Fetch about us data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance("/api/about-us");
        const result = response.data;

        if (result.success) {
          setAboutData(result.data);

          // Assign random icons to pillars
          let usedIcons = [];
          let usedCombos = [];

          const pillarsWithIcons = result.data.operationalPillars.pillars.map(
            (pillar) => {
              const randomIcon = getRandomIcon(usedIcons);
              const randomCombo = getRandomColorCombo(usedCombos);
              usedIcons.push(randomIcon);
              usedCombos.push(randomCombo);
              return {
                ...pillar,
                icon: randomIcon,
                ...randomCombo,
              };
            },
          );
          setCoreValuesWithIcons(pillarsWithIcons);

          // Assign random icons to capabilities
          usedIcons = [];
          usedCombos = [];

          const capsWithIcons = result.data.capabilities.items.map((item) => {
            const randomIcon = getRandomIcon(usedIcons);
            const randomCombo = getRandomColorCombo(usedCombos);
            usedIcons.push(randomIcon);
            usedCombos.push(randomCombo);
            return {
              ...item,
              icon: randomIcon,
              ...randomCombo,
            };
          });
          setCapabilitiesWithIcons(capsWithIcons);

          // Assign random icons to stats
          usedIcons = [];
          usedCombos = [];

          const statsWithIcons = result.data.infoBar.stats.map((stat) => {
            const randomIcon = getRandomIcon(usedIcons);
            const randomCombo = getRandomColorCombo(usedCombos);
            usedIcons.push(randomIcon);
            usedCombos.push(randomCombo);
            return {
              ...stat,
              icon: randomIcon,
              ...randomCombo,
            };
          });
          setStatsWithIcons(statsWithIcons);
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError("Failed to load about us data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!aboutData) return;

    const ctx = gsap.context(() => {
      // Pin background layers + text
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + (foregroundRef.current?.offsetHeight + 300 || 1000),
        pin: [textRef.current, ...bgRefs.current].filter(Boolean),
        pinSpacing: false,
        scrub: 0.5,
      });

      // Foreground moves fast
      if (foregroundRef.current) {
        gsap.to(foregroundRef.current, {
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
          },
        });
      }

      // VATA DYA moves upward slower (depth effect)
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [aboutData]);

  // Mouse Move Listener with smoother values
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll Listener with passive support
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Failed to load data"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen overflow-x-hidden font-sans scroll-smooth">
      {/* ─────────────── HERO ─────────────── */}
      <section
        ref={sectionRef}
        className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-white"
      >
        {/* LAYER 1 — Sky */}
        <div
          ref={(el) => (bgRefs.current[0] = el)}
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <img
            src="https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.05) contrast(0.95)", opacity: 0.9 }}
            alt="Sky with clouds"
          />
        </div>

        {/* LAYER 4 — VATA DYA Text */}
        <div
          ref={textRef}
          className="relative z-[3] flex flex-col items-center justify-center text-center px-4 mb-40"
        >
          {/* Hero Title */}
          <h1 className="relative text-[clamp(3rem,8vw,6rem)] font-extrabold tracking-tight leading-none flex flex-wrap justify-center font-cinzel">
            {/* Gradient text */}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-md mr-2 sm:mr-4 z-10 relative">
              {aboutData.aboutSection.mainTitle.split(" ")[0]}
            </span>
            <span className="text-slate-800 drop-shadow-md z-10 relative">
              {aboutData.aboutSection.mainTitle.split(" ")[1]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-700 font-medium text-sm sm:text-base tracking-wide mb-8 max-w-2xl px-6 py-2 bg-white/30 backdrop-blur-sm rounded-full shadow-sm">
            {aboutData.aboutSection.subTitle}
          </p>

          {/* Buttons */}
          {/* <div className="flex flex-wrap justify-center gap-4 px-4">
            {[
              "TALK TO A TREK EXPERT",
              "SEE UPCOMING DEPARTURES",
              "OUR IMPACT",
            ].map((text, i) => (
              <button
                key={i}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-wide rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-0.5 hover:bg-orange-50 transition-all duration-300"
              >
                {text}
              </button>
            ))}
          </div> */}
        </div>

        {/* LAYER 5 — Foreground Peak */}
        <div
          ref={foregroundRef}
          className="absolute bottom-0 left-0 w-full h-[60vh] z-[4] pointer-events-none overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1603475429038-44361bcde123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
            className="w-full h-full object-cover object-top"
            style={{
              maskImage: "linear-gradient(to top, black 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 70%, transparent 100%)",
              filter: "brightness(0.95) contrast(1.15)",
              objectPosition: "center 25%",
            }}
            alt="Foreground mountain peak"
          />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
      </section>

      {/* ─────────────── IDENTITY ─────────────── */}
      {/* <section
        id="about-content"
        className="relative py-28 z-10 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-3 bg-orange-100/50 border border-orange-200 rounded-full px-5 py-2 mb-8">
              <Target className="w-4 h-4 text-orange-600" />
              <span className="text-orange-900 text-[10px] font-black uppercase tracking-[0.3em]">
                {aboutData.missionSection.title}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {aboutData.missionSection.description
                .split(" ")
                .slice(0, 2)
                .join(" ")}{" "}
              the
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-800"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.missionSection?.description

                    .split(" ")
                    .slice(2)
                    .join(" "),
                }}
              ></span>
            </h2>

            <p
              className="text-slate-900/70 text-lg leading-relaxed mb-6 font-medium"
              dangerouslySetInnerHTML={{
                __html: aboutData.missionSection.description,
              }}
            ></p>
            <p className="text-slate-600/60 text-sm leading-relaxed mb-10">
              {aboutData.missionSection.subDescription}
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black tracking-widest text-[11px] uppercase transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                GET IN TOUCH
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900/40">
                  Ready for OPS
                </span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-400/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 transition-all duration-[1.5s]">
              <img
                src={
                  aboutData.missionSection.image?.cdnUrl ||
                  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80"
                }
                alt="Expedition Team"
                className="w-full h-[520px] object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section> */}

      <section
        id="about-content"
        className="relative py-28 z-10 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white"
      >
        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-orange-300/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-amber-400/20 blur-[120px] rounded-full"></div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-orange-200 rounded-full px-5 py-2 mb-8 shadow-sm">
              <Target className="w-4 h-4 text-orange-600" />
              <span className="text-orange-900 text-[10px] font-black uppercase tracking-[0.3em]"
                dangerouslySetInnerHTML={{ __html: aboutData?.missionSection?.title }}>
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[1] tracking-tight mb-4">
              {aboutData.missionSection.description
                .split(" ")
                .slice(0, 2)
                .join(" ")}{" "}
              <span className="relative inline-block">
                the
                <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-orange-300/40 rounded-full blur-sm"></span>
              </span>
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.missionSection?.description
                    .split(" ")
                    .slice(2)
                    .join(" "),
                }}
              />
            </h2>

            {/* Description */}
            <p
              className="text-slate-700 text-lg leading-relaxed mb-3 font-medium"
              dangerouslySetInnerHTML={{
                __html: aboutData.missionSection.description,
              }}
            ></p>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-md">
              {aboutData.missionSection.subDescription}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="relative px-10 py-5 rounded-2xl font-black tracking-widest text-[11px] uppercase overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 transition-all duration-500 group-hover:scale-105"></span>
                <span className="relative text-white">GET IN TOUCH</span>
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Ready for Ops
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative group">
            {/* Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-orange-400/30 to-amber-500/30 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-white/40 backdrop-blur-xl">
              <img
                src={
                  aboutData.missionSection.image?.cdnUrl ||
                  ""
                }
                alt="Expedition Team"
                className="w-full h-[520px] object-cover transition-transform duration-[2.5s] group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-white/40">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                  Trusted Adventures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden relative group">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800/50">
              {statsWithIcons.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat._id || i}
                    className="py-12 px-4 text-center hover:bg-slate-800/30 transition-colors cursor-default"
                  >
                    <div
                      className={`w-12 h-12 mx-auto rounded-2xl ${stat.bg} bg-opacity-10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-black text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-200/50 font-black uppercase tracking-[0.3em]">
                      {stat.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── CORE VALUES ─────────────── */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-full px-5 py-2 mb-8 shadow-sm">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-slate-900 text-[10px] font-black uppercase tracking-[0.3em]">
                Operational Pillars
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-800 font-black">
                Standard
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValuesWithIcons.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeValue === i;
              return (
                <div
                  key={item._id || i}
                  onClick={() => setActiveValue(isActive ? null : i)}
                  className={`group bg-white rounded-3xl border shadow-lg p-8 text-center cursor-pointer transition-all duration-500 ${isActive
                    ? `${item.border} shadow-orange-500/20 -translate-y-2 bg-orange-50`
                    : "border-gray-50 hover:-translate-y-1 hover:shadow-2xl hover:border-gray-200"
                    }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isActive
                      ? "bg-slate-900 scale-110"
                      : `${item.bg} group-hover:scale-110`
                      }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${isActive ? "text-white" : item.color} transition-colors`}
                    />
                  </div>
                  <h3
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? "text-slate-900" : "text-slate-600"
                      }`}
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── FACILITIES ─────────────── */}
      <section className="relative z-10 py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-full px-5 py-2 mb-8 shadow-sm">
              <Layers className="w-4 h-4 text-orange-600" />
              <span className="text-slate-900 text-[10px] font-black uppercase tracking-[0.3em]">
                Field Capabilities
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-800 font-black">
                Logic
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {capabilitiesWithIcons.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item._id || i}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center
                             hover:-translate-y-2 hover:shadow-2xl hover:border-gray-300 transition-all duration-500"
                >
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl ${item.bg} flex items-center justify-center mb-8
                    group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                  >
                    <Icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h5 className="text-lg font-black text-slate-950 mb-4 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-[13px] text-slate-900/50 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="relative z-10 py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 shadow-md rounded-full px-6 py-3 mb-10 text-orange-600">
            <Mountain className="w-4 h-4" />
            <span className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em]">
              Initialize Protocol
            </span>
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-slate-950 leading-[0.9] mb-10 tracking-tighter">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-800 font-black">
              Begin?
            </span>
          </h2>
          <p className="text-slate-900/60 text-lg mb-12 font-medium">
            Join the elite tier of adventurers who've trusted Vatadya for their
            most extraordinary journeys.
          </p>
          <Link
            to="/treks"
            className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-[0_30px_60px_rgba(15,23,42,0.3)] hover:-translate-y-2"
          >
            COMMENCE EXPEDITION
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes scroll-pip {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-pip {
          animation: scroll-pip 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
