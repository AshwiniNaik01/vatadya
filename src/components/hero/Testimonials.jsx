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
            sector:
              review.trekId?.title?.toUpperCase().replace(/ /g, "_") ||
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
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
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
              Mission Debrief
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
                  y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
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
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                {/* 3D Card Container */}
                <div
                  className="relative transition-all duration-700 w-full flex flex-col"
                  style={{
                    transform: isHovered
                      ? `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) scale(1.02)`
                      : "none",
                  }}
                >
                  {/* Main Card */}
                  <div
                    className={`relative bg-white/90 backdrop-blur-xl rounded-3xl 
                          border-2 transition-all duration-500 overflow-hidden
                          shadow-2xl hover:shadow-sky-200/50
                          ${isHovered ? "border-sky-400" : "border-sky-100"} flex flex-col h-full`}
                  >
                    {/* Animated Gradient Background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/80 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    {/* Animated Scanline */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b from-transparent 
                            via-sky-400/10 to-transparent h-32 
                            animate-scanline opacity-0 group-hover:opacity-100 
                            pointer-events-none transition-opacity duration-300`}
                    />

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                      <div
                        className="absolute top-0 right-0 w-12 h-12 
                              bg-gradient-to-br from-sky-400/20 to-transparent
                              transform rotate-45 translate-x-6 -translate-y-6"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden">
                      <div
                        className="absolute bottom-0 left-0 w-12 h-12 
                              bg-gradient-to-tr from-blue-400/20 to-transparent
                              transform -rotate-45 -translate-x-6 translate-y-6"
                      />
                    </div>

                    {/* Big Quote Icon with Animation */}
                    <div
                      className={`absolute -top-4 -left-2 text-[100px] font-serif 
                            transition-all duration-700 select-none
                            ${
                              isHovered
                                ? "text-sky-400/30 transform -translate-y-2 -translate-x-2"
                                : "text-sky-400/10"
                            }`}
                    >
                      “
                    </div>

                    {/* Floating Like Button */}
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`absolute top-6 right-6 w-10 h-10 rounded-xl 
                         backdrop-blur-sm flex items-center justify-center
                         transition-all duration-500 z-20
                         border shadow-lg
                       
                        bg-rose-500 border-rose-400 shadow-rose-200/50 `}
                    >
                      <Heart
                        className={`w-5 h-5 transition-all duration-300
                                ${
                                  isLiked
                                    ? "fill-white text-white scale-110"
                                    : "text-sky-400 group-hover:text-rose-400"
                                }`}
                      />
                    </button>

                    {/* Profile Section with 3D Effect */}
                    <div className="relative p-8 z-10">
                      <div className="flex items-center gap-5 mb-6">
                        <div className="relative group/avatar">
                          {/* Avatar Ring */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 
                                  rounded-2xl blur-md transition-opacity duration-500
                                  ${isHovered ? "opacity-60" : "opacity-0"}`}
                          />

                          {/* Avatar Image */}
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="relative w-20 h-20 rounded-2xl object-cover 
                               border-3 border-white shadow-xl
                               group-hover/avatar:scale-110 transition-transform duration-500"
                          />

                          {/* Verified Badge */}
                          <div
                            className="absolute -bottom-2 -right-2 w-6 h-6 
                                  bg-gradient-to-r from-sky-400 to-blue-500 
                                  rounded-full border-2 border-white
                                  flex items-center justify-center
                                  shadow-lg animate-pulse-slow"
                          >
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                          </div>
                        </div>

                        <div>
                          <h4
                            className="text-xl font-bold text-slate-800 
                                 group-hover:text-transparent group-hover:bg-clip-text
                                 group-hover:bg-gradient-to-r group-hover:from-sky-600 
                                 group-hover:to-blue-600 transition-all"
                          >
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
                        <p
                          className={`relative text-slate-600 text-base leading-relaxed 
                              transition-all duration-500 italic
                              ${isHovered ? "translate-x-1" : ""}`}
                        >
                          {testimonial.content}
                        </p>

                        {/* Animated Quote Mark */}
                        <div
                          className={`absolute -bottom-4 -right-10 text-4xl font-serif 
                                transition-all duration-700
                                ${
                                  isHovered
                                    ? "text-sky-800/50 opacity-20"
                                    : "text-sky-400/0 opacity-0"
                                }`}
                        >
                          ❞
                        </div>

                        <div
                          className={`absolute -bottom-4 left-10 text-4xl font-serif 
                                transition-all duration-700
                                ${
                                  isHovered
                                    ? "text-sky-800/50 opacity-20"
                                    : "text-sky-400/0 opacity-0"
                                }`}
                        >
                          ❞
                        </div>
                      </div>

                      {/* Bottom Section - Redesigned */}
                      <div
                        className="relative flex items-center justify-between pt-4 
                              border-t border-sky-100 group-hover:border-sky-200 
                              transition-colors duration-500"
                      >
                        {/* Modern Star Rating with Animation */}
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`relative transition-all duration-300
                                  ${isHovered ? "hover:scale-125" : ""}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  className={`w-6 h-6 transition-all duration-300
                                    ${
                                      i < testimonial.rating
                                        ? "drop-shadow-lg"
                                        : "opacity-30"
                                    }`}
                                >
                                  <defs>
                                    <linearGradient
                                      id={`starGradient-${idx}-${i}`}
                                    >
                                      <stop offset="0%" stopColor="#38BDF8" />
                                      <stop offset="100%" stopColor="#3B82F6" />
                                    </linearGradient>
                                  </defs>
                                  <path
                                    fill={
                                      i < testimonial.rating
                                        ? `url(#starGradient-${idx}-${i})`
                                        : "#CBD5E1"
                                    }
                                    d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.42 8.28L12 18.897 4.58 23.876 6 15.596 0 9.748l8.332-1.593z"
                                    className={`transition-all duration-300
                                      ${
                                        i < testimonial.rating && isHovered
                                          ? "scale-110"
                                          : ""
                                      }`}
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
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 
                                  rounded-full blur-md transition-opacity duration-500
                                  ${isHovered ? "opacity-60" : "opacity-0"}`}
                          />
                          <div
                            className="relative flex items-center gap-2 
                                  bg-gradient-to-r from-sky-500 to-blue-600
                                  text-white px-4 py-2 rounded-full
                                  shadow-lg hover:shadow-xl
                                  transform hover:scale-105 transition-all
                                  cursor-default"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                            </svg>
                            <span className="text-xs font-semibold uppercase tracking-wider">
                              {testimonial.sector}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1 
                              bg-sky-100 rounded-b-3xl overflow-hidden"
                      >
                        <div
                          className={`h-full bg-gradient-to-r from-sky-400 to-blue-500 
                              transition-all duration-700 ease-out
                              ${isHovered ? "w-full" : "w-0"}`}
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
                  idx === activeIndex ? "w-8 bg-sky-400" : "w-2 bg-slate-600"
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
