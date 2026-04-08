import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Search,
  Loader2,
  Zap,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Wind,
  Waves,
  TreePine,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────
   Tiny helpers
───────────────────────────────────────── */
const guestCount = (stay) =>
  (stay.adults || 0) + (stay.children || 0) || parseInt(stay.groupSize) || 0;

const duration = (stay) => {
  const parts = (stay.duration || "1 Night").split(" ");
  return { num: parts[0] || "1", unit: parts[1] || "Night" };
};

/* ─────────────────────────────────────────
   Loading Screen
───────────────────────────────────────── */
const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0f]">
    <div className="relative w-16 h-16 mb-8">
      <div className="absolute inset-0 rounded-full border-2 border-[#52b788]/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#52b788] animate-spin" />
      <div
        className="absolute inset-2 rounded-full border border-transparent border-t-[#c9a84c]/60 animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
      />
    </div>
    <p
      className="text-[10px] font-black uppercase tracking-[0.28em]"
      style={{
        color: "rgba(255,255,255,0.25)",
        animation: "pulse 1.8s ease-in-out infinite",
      }}
    >
      Finding your escape
    </p>
  </div>
);

/* ─────────────────────────────────────────
   Stay Card
───────────────────────────────────────── */
const StayCard = ({ stay, index, liked, onToggleLike }) => {
  const dur = duration(stay);
  const guests = guestCount(stay);
  const isLiked = liked.has(stay._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/stay/${stay._id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden mb-5 bg-stone-100">
          <img
            src={
              stay.image?.cdnUrl ||
              stay.image ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
            }
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-[8px] border border-white/20 backdrop-blur-sm"
              style={{ background: "rgba(45,106,79,0.85)", color: "#fff" }}
            >
              {stay.reg_type}
            </span>
            {stay.featured && (
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-[8px] border border-white/20 backdrop-blur-sm"
                style={{ background: "rgba(201,168,76,0.88)", color: "#fff" }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleLike(stay._id);
            }}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border border-white/60 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Save to wishlist"
          >
            <Heart
              className="w-3.5 h-3.5 transition-colors"
              style={{ color: "#e05c5c", fill: isLiked ? "#e05c5c" : "none" }}
            />
          </button>

          {/* Private badge bottom left */}
          {stay.privateRoom && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md uppercase tracking-wider">
              <Zap className="w-2.5 h-2.5" />
              Private
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="px-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {/* Location */}
              <div className="flex items-center gap-1 mb-1.5">
                <MapPin className="w-3 h-3 text-[#52b788] flex-shrink-0" />
                <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider truncate">
                  {stay.address?.city}, {stay.address?.state}
                </span>
              </div>
              {/* Title */}
              <h3 className="text-base font-black text-[#0d0d0f] group-hover:text-[#2d6a4f] transition-colors duration-200 leading-tight tracking-tight">
                {stay.title}
              </h3>
            </div>
            {/* Price */}
            <div className="text-right flex-shrink-0">
              <p className="text-[9px] font-medium text-stone-400 uppercase tracking-wider">
                from
              </p>
              <p className="text-lg font-black text-[#2d6a4f] leading-tight">
                ₹{stay.price?.toLocaleString() || 0}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-stone-100 mb-3" />

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-[#52b788]" />
                {guests} guests
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center  transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const StayPage = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [liked, setLiked] = useState(new Set());
  const [activeTag, setActiveTag] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const response = await axiosInstance.get("/api/stays");
        if (response.data.success) setStays(response.data.data);
      } catch (error) {
        console.error("Error fetching stays:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStays();
  }, []);

  const filteredStays = stays.filter((stay) => {
    const s = searchTerm.toLowerCase().trim();
    if (!s) return true;
    const { address } = stay;
    return [
      stay.title,
      address?.city,
      address?.state,
      address?.district,
      address?.nearbyLocation,
      address?.landmark,
    ].some((f) => f?.toLowerCase().includes(s));
  });

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleTagClick = (loc) => {
    if (activeTag === loc) {
      setActiveTag(null);
      setSearchTerm("");
    } else {
      setActiveTag(loc);
      setSearchTerm(loc);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setActiveTag(null);
    inputRef.current?.focus();
  };

  if (loading) return <LoadingScreen />;

  const quickTags = [
    { label: "Phansad", icon: <TreePine className="w-3 h-3" /> },
    { label: "Diveagar", icon: <Waves className="w-3 h-3" /> },
    { label: "Kashid", icon: <Wind className="w-3 h-3" /> },
  ];

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes blobdrift {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-20px) scale(1.08); }
        }
        @keyframes blobdrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-20px,30px) scale(1.05); }
        }
        .blob1 { animation: blobdrift 9s ease-in-out infinite; }
        .blob2 { animation: blobdrift2 12s ease-in-out infinite; }
        .pulse-dot { animation: pulsedot 2s ease-in-out infinite; }
        @keyframes pulsedot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.4; transform:scale(.65); }
        }
      `}</style>

      <div className="min-h-screen bg-[#fafaf8]">
        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden pt-24 pb-16"
          style={{ background: "#0d0d0f", borderRadius: "0 0 36px 36px" }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Blobs */}
          <div
            className="blob1 absolute pointer-events-none"
            style={{
              width: 520,
              height: 520,
              background:
                "radial-gradient(circle, rgba(82,183,136,0.18) 0%, transparent 70%)",
              top: -120,
              right: -100,
            }}
          />
          <div
            className="blob2 absolute pointer-events-none"
            style={{
              width: 360,
              height: 360,
              background:
                "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)",
              bottom: -80,
              left: -80,
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border"
              style={{
                background: "rgba(82,183,136,0.08)",
                borderColor: "rgba(82,183,136,0.2)",
              }}
            >
              <span
                className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#52b788] flex-shrink-0"
                style={{ display: "inline-block" }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52b788]">
                {stays.length} Premium Destinations
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-white mb-10 leading-[0.92]"
              style={{
                fontSize: "clamp(44px, 8vw, 80px)",
                fontWeight: 800,
                letterSpacing: "0.1em",
              }}
            >
              Find Your
              <br />
              <em className="not-italic" style={{ color: "#52b788" }}>
                Perfect Stay
              </em>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl"
            >
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: searchTerm
                    ? "rgba(82,183,136,0.5)"
                    : "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Search
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "white/40" }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by city, landmark, or vibe..."
                  className="flex-1 bg-transparent border-none outline-none text-base font-normal text-white placeholder-white/40"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setActiveTag(null);
                  }}
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearSearch}
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      <X className="w-3 h-3 text-white/60" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white  text-[11px] uppercase tracking-[0.12em] transition-all duration-200 hover:scale-[1.02] active:scale-95 flex-shrink-0"
                  style={{
                    background: "#40916c",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#52b788")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#2d6a4f")
                  }
                >
                  <ArrowRight className="w-3.5 h-4" />
                  Explore
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex rounded-2xl border border-stone-100 bg-white overflow-hidden mt-6"
            style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}
          >
            {[
              { val: stays.length, label: "Total Stays" },
              { val: "4.8 ★", label: "Avg Rating" },
              { val: "3", label: "Destinations" },
            ].map(({ val, label }, i) => (
              <div
                key={label}
                className="flex-1 py-4 px-5 text-center transition-colors duration-200 hover:bg-stone-50"
                style={{ borderRight: i < 2 ? "1px solid #f0ede8" : "none" }}
              >
                <div className="text-xl font-black text-[#0d0d0f]">{val}</div>
                <div className="text-[10px] font-medium text-stone-400 mt-0.5 tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── GRID SECTION ── */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-[#52b788]" />
                <span className="text-[10px] font-black text-[#52b788] uppercase tracking-[0.22em]">
                  Our Selection
                </span>
              </div>
              <h2 className="text-3xl font-black text-[#0d0d0f] tracking-tight">
                Available Stays
              </h2>
              {searchTerm && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-stone-400 mt-1.5 italic"
                >
                  {filteredStays.length}{" "}
                  {filteredStays.length === 1 ? "match" : "matches"} near
                  &ldquo;{searchTerm}&rdquo;
                </motion.p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-100 bg-white text-[11px] font-medium text-stone-500">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#52b788]" />
                {filteredStays.length} propert
                {filteredStays.length === 1 ? "y" : "ies"}
              </div>
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            {filteredStays.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredStays.map((stay, idx) => (
                  <StayCard
                    key={stay._id}
                    stay={stay}
                    index={idx}
                    liked={liked}
                    onToggleLike={toggleLike}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 rounded-3xl border-2 border-dashed border-stone-100"
              >
                <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center mx-auto mb-5">
                  <Search className="w-7 h-7 text-stone-300" />
                </div>
                <h3 className="text-xl font-black text-stone-400 tracking-tight mb-2">
                  No stays found
                </h3>
                <p className="text-sm text-stone-400 mb-6">
                  Try a different location or clear your search
                </p>
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: "#0d0d0f",
                  }}
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
};

export default StayPage;
