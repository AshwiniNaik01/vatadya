import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useScroll, useTransform } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Calendar,
  Users,
  ChevronRight,
  Share,
  Heart,
  Wind,
  Tv,
  Trees,
  Flame,
  Map,
  ChefHat,
  Shield,
  Thermometer,
  Tent,
  Info,
  CheckCircle,
  Navigation,
  Coffee,
  Dumbbell,
  Clock,
  Beer,
  Sprout,
  PawPrint,
  Laptop,
  Layout,
  Waves,
  Loader2,
  BadgePercent,
  Calculator,
  XCircle,
  Bed,
  User,
  Baby,
  Zap,
  DoorOpen,
  Mountain,
  Compass,
  ArrowUpRight,
  ChevronDown,
  Moon,
  CloudRain,
  Backpack,
  Footprints,
} from "lucide-react";

/* ─── Scroll-based fade-in hook ─── */
const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ─── Section wrapper with fade-in ─── */
const Section = ({ children, className = "" }) => {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition:
          "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
};

/* ─── Icon map ─── */
const getIcon = (name) => {
  const m = {
    Waves,
    Wifi,
    Wind,
    Utensils: ChefHat,
    Tv,
    Trees,
    Flame,
    Mountain,
    PawPrint,
    Layout,
    Laptop,
    Sprout,
    Coffee,
    Beer,
    Clock,
    Dumbbell,
    Map,
    Car,
    Tent,
    Shield,
    Thermometer,
    ChefHat,
    DoorOpen,
    Zap,
    Compass,
  };
  return m[name] || MapPin;
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const StayDetailPage = () => {
  const { id } = useParams();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  useEffect(() => {
    const fetchStayDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/stays/${id}`);
        if (response.data.success) {
          setStay(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching stay detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStayDetail();
  }, [id]);

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-stone-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Compass className="w-14 h-14 text-amber-400" />
        </motion.div>
        <p className="text-stone-400 text-xs font-black uppercase tracking-[0.3em]">
          Finding Your Summit…
        </p>
      </div>
    );

  /* ── Not found ── */
  if (!stay)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-stone-50">
        <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center">
          <Info className="w-10 h-10 text-stone-300" />
        </div>
        <h2 className="text-4xl font-black text-stone-800 uppercase tracking-tight">
          Stay not found
        </h2>
        <Link
          to="/stay"
          className="px-8 py-4 bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg"
        >
          Back to Stays
        </Link>
      </div>
    );

  /* ── Derived values ── */
  const basePrice = stay.feeDetails?.basePrice?.amount || stay.price || 0;
  const weekdayCharge = stay.feeDetails?.weekdayCharge?.amount || 0;
  const weekendCharge = stay.feeDetails?.weekendCharge?.amount || 0;
  const gstPct = stay.feeDetails?.gstPercent?.value || 0;
  const discountPct = stay.feeDetails?.discount?.value || 0;
  const discountAmt = Math.round((basePrice * discountPct) / 100);
  const subtotal = basePrice + weekdayCharge + weekendCharge - discountAmt;
  const gstAmt = Math.round((subtotal * gstPct) / 100);
  const total = subtotal + gstAmt;
  const amenitiesList =
    stay.amenities?.length > 0 ? stay.amenities : stay.tags || [];
  const allImages = [stay.image, ...(stay.gallery || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* ══════════════ HERO ══════════════ */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Parallax image */}
        <motion.div
          style={{ y: heroY }}
          className="absolute w-full h-[120%] -top-[10%]"
        >
          <img
            src={stay.image?.cdnUrl || "https://placeholder.com/1400x900"}
            alt="Stay hero"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 to-transparent pointer-events-none" />

        {/* Topo SVG rings */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {[60, 130, 210, 310, 430, 560, 700].map((r, i) => (
            <ellipse
              key={i}
              cx="720"
              cy="1000"
              rx={r * 4.5}
              ry={r * 1.3}
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Top nav */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 md:px-12 pt-8 z-20">
          <Link
            to="/stay"
            className="flex items-center gap-3 text-white/80 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] transition-colors group"
          >
            <div className="w-9 h-9 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </div>
            All Camps
          </Link>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-white/20 transition-colors"
            >
              <Share className="w-3.5 h-3.5" /> Share
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setSaved((s) => !s)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.15em] transition-all ${saved ? "bg-orange-500 border-orange-400 text-white" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-white" : ""}`} />{" "}
              Save
            </motion.button>
          </div>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 px-8 md:px-12 pb-14 z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              <span className="px-4 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.15em]">
                {stay.category}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-sm">
                {stay.reg_type}
              </span>
              {stay.privateRoom && (
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-sm">
                  <DoorOpen className="w-3 h-3" /> Private
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight uppercase mb-6 drop-shadow-2xl">
              {stay.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                <MapPin className="w-4 h-4 text-orange-400" />
                {stay.address?.street}, {stay.address?.city}
              </div>
            </div>

            {/* Weather pills */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: Thermometer, label: "Temp", value: "8–14°C" },
                { icon: CloudRain, label: "Season", value: "May–Oct" },
                { icon: Mountain, label: "Altitude", value: "2,800m" },
                { icon: Footprints, label: "Level", value: "Moderate" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-sky-300" />
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="text-white text-[11px] font-black">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2 z-20">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </div>
      </div>

      {/* ══════════════ GALLERY STRIP ══════════════ */}
      <div className="flex gap-1 h-96 overflow-hidden">
        {allImages.slice(0, 5).map((img, i) => (
          <motion.div
            key={i}
            onClick={() => setActiveImg(i)}
            animate={{ flex: activeImg === i ? 3 : 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative overflow-hidden cursor-pointer group"
          >
            <img
              src={img?.cdnUrl || img}
              alt={`Gallery ${i}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {activeImg === i && (
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest">
                Viewing
              </div>
            )}
            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* ══════════════ BODY ══════════════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 items-start mb-10">
          {/* ─── LEFT COLUMN ─── */}
          <div className="lg:col-span-2 flex flex-col gap-16">
            {/* HOST CARD */}
            <Section>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-stone-900 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 opacity-[0.05] pointer-events-none">
                  <svg width="280" height="280" viewBox="0 0 280 280">
                    {[40, 75, 110, 145, 180].map((r) => (
                      <circle
                        key={r}
                        cx="200"
                        cy="80"
                        r={r}
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                    ))}
                  </svg>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                      Hosted by Vatadya Adventures
                    </p>
                    <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                      Entire {stay.category} —{" "}
                      <span className="text-amber-400 italic">
                        just for you
                      </span>
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {[
                      { icon: User, val: `${stay.adults || 0} Adults` },
                      stay.children > 0 && {
                        icon: Baby,
                        val: `${stay.children} Kids`,
                      },
                      { icon: Clock, val: stay.duration },
                      { icon: Zap, val: "Instant Book" },
                    ]
                      .filter(Boolean)
                      .map(({ icon: Icon, val }, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-wider"
                        >
                          <Icon className="w-4 h-4 text-amber-400" /> {val}
                        </div>
                      ))}
                  </div>
                </div>
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl font-black border-4 border-stone-800 shadow-2xl">
                    V
                  </div>
                </div>
              </motion.div>
            </Section>

            {/* ELEVATION PROFILE */}
            <Section>
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-100 shadow-sm">
                <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-1">
                  Trek Elevation{" "}
                  <span className="text-orange-500">Profile</span>
                </h3>
                <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-8">
                  Day-by-day altitude gain
                </p>
                <svg viewBox="0 0 600 150" className="w-full overflow-visible">
                  <defs>
                    <linearGradient id="elGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#ea580c"
                        stopOpacity="0.25"
                      />
                      <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 150, 300, 450, 600].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="140"
                      stroke="#f5f5f4"
                      strokeWidth="1"
                    />
                  ))}
                  <path
                    d="M0 135 L60 115 L150 85 L240 48 L310 18 L390 34 L470 62 L560 80 L600 72 L600 145 Z"
                    fill="url(#elGrad)"
                  />
                  <path
                    d="M0 135 L60 115 L150 85 L240 48 L310 18 L390 34 L470 62 L560 80 L600 72"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1200,
                      strokeDashoffset: 1200,
                      animation: "drawTrail 2.5s ease forwards 0.3s",
                    }}
                  />
                  <style>{`@keyframes drawTrail { to { stroke-dashoffset: 0; } }`}</style>
                  {[
                    [60, 115, "Day 1", "1,800m"],
                    [240, 48, "Day 2", "2,800m"],
                    [310, 18, "Summit", "3,200m"],
                    [470, 62, "Day 3", "2,200m"],
                  ].map(([x, y, d, alt]) => (
                    <g key={d}>
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="white"
                        stroke="#ea580c"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 14}
                        textAnchor="middle"
                        fill="#292524"
                        fontSize="9"
                        fontWeight="800"
                        fontFamily="inherit"
                      >
                        {d}
                      </text>
                      <text
                        x={x}
                        y={y - 4}
                        textAnchor="middle"
                        fill="#a8a29e"
                        fontSize="8"
                        fontFamily="inherit"
                      >
                        {alt}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </Section>

            {/* ROOM FEATURES */}
            {/* <div className="space-y-16"> */}

            {/* ROOM FEATURES / LAYOUT */}
            {stay.roomFeatures?.length > 0 && (
              <Section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-0.5 bg-orange-500" />
                  <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight">
                    Property <span className="text-orange-500">Layout</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {stay.roomFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.04, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                        <Bed className="w-5 h-5 text-orange-500" />
                      </div>

                      <span className="text-sm font-semibold text-stone-700 tracking-wide">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* DESCRIPTION + HIGHLIGHTS */}
          </div>

          {/* ─── RIGHT COLUMN: BOOKING ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 flex flex-col gap-4">
              {/* Floating altitude badge */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-orange-500/30"
              >
                <Mountain className="w-3.5 h-3.5" /> Summit: 3,200m
              </motion.div>

              {/* BOOKING CARD */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10 border border-stone-100"
              >
                {/* Dark header */}
                <div className="bg-stone-900 p-8 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 opacity-[0.05] pointer-events-none">
                    <Tent className="w-40 h-40 text-white" />
                  </div>
                  <div className="flex items-start justify-between mb-6 relative">
                    <div>
                      <p className="text-white text-4xl font-black tracking-tight leading-none">
                        ₹{basePrice.toLocaleString()}
                      </p>
                      <p className="text-stone-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">
                        Base Rate / Night
                      </p>
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-400/15 border border-amber-400/25">
                      <BadgePercent className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: Users,
                        label: "Guests",
                        val: `${(stay.adults || 0) + (stay.children || 0)}`,
                      },
                      { icon: Moon, label: "Nights", val: "3" },
                      { icon: Compass, label: "Trails", val: "6+" },
                    ].map(({ icon: Icon, label, val }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-center"
                      >
                        <Icon className="w-5 h-5 text-amber-400" />
                        <span className="text-white font-black text-base leading-none">
                          {val}
                        </span>
                        <span className="text-stone-500 text-[9px] font-bold uppercase tracking-wider">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates & guests */}
                <div className="border-b border-stone-100">
                  <div className="grid grid-cols-2 divide-x divide-stone-100 border-b border-stone-100">
                    {[
                      { label: "Arrival", date: stay.startDate?.slice(0, 10) },
                      { label: "Departure", date: stay.endDate?.slice(0, 10) },
                    ].map(({ label, date }, i) => (
                      <div
                        key={i}
                        className="p-5 hover:bg-stone-50 transition-colors cursor-pointer group"
                      >
                        <label className="text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5 group-hover:text-orange-500 transition-colors">
                          {label}
                        </label>
                        <div className="flex items-center gap-2 text-stone-800 text-xs font-black">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />{" "}
                          {date}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer group">
                    <div>
                      <label className="text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5 group-hover:text-orange-500 transition-colors">
                        Trekkers
                      </label>
                      <div className="flex items-center gap-2 text-stone-800 text-xs font-black">
                        <Users className="w-3.5 h-3.5 text-orange-500" />
                        {stay.adults} Adults · {stay.children} Children
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="p-6 space-y-3">
                  {[
                    {
                      label: "Stay subtotal",
                      val: `₹${basePrice.toLocaleString()}`,
                      green: false,
                    },
                    weekdayCharge > 0 && {
                      label: "Weekday charge",
                      val: `₹${weekdayCharge.toLocaleString()}`,
                      green: false,
                    },
                    weekendCharge > 0 && {
                      label: "Weekend surcharge",
                      val: `₹${weekendCharge.toLocaleString()}`,
                      green: false,
                    },
                    discountPct > 0 && {
                      label: `Discount (${discountPct}%)`,
                      val: `-₹${discountAmt.toLocaleString()}`,
                      green: true,
                    },
                    {
                      label: `GST / Fees (${gstPct}%)`,
                      val: `₹${gstAmt.toLocaleString()}`,
                      green: false,
                    },
                  ]
                    .filter(Boolean)
                    .map(({ label, val, green }, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wide">
                          {label}
                        </span>
                        <span
                          className={`text-xs font-black ${green ? "text-emerald-500" : "text-stone-700"}`}
                        >
                          {val}
                        </span>
                      </div>
                    ))}

                  <div className="h-px bg-stone-100 my-1" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        Estimated Total
                      </p>
                      <p className="text-stone-900 text-4xl font-black tracking-tight leading-none">
                        ₹{total.toLocaleString()}
                      </p>
                    </div>
                    <Calculator className="w-7 h-7 text-stone-100" />
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    className="w-full py-5 rounded-2xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-colors duration-300 shadow-xl shadow-stone-900/20"
                  >
                    <Backpack className="w-4 h-4" /> Confirm Booking
                  </motion.button>
                </div>
              </motion.div>

              {/* Guide card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 p-5 bg-stone-100 rounded-2xl border border-stone-200"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-700 flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-stone-800 text-xs font-black uppercase tracking-wide">
                    Expert Guide Assigned
                  </p>
                  <p className="text-stone-400 text-[10px] font-semibold mt-0.5">
                    48 hrs before your trek starts
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
            {/* HIGHLIGHTS */}
            <Section className="min-w-[50%]">
              <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-10 overflow-hidden shadow-xl">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, white, white 1px, transparent 1px, transparent 28px)",
                  }}
                />

                {/* Icon decoration */}
                <div className="absolute top-6 right-6 opacity-[0.05]">
                  <Mountain className="w-36 h-36 text-white" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-0.5 bg-amber-400" />
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
                      Highlights
                    </span>
                  </div>

                  <div
                    className="text-stone-300 text-sm leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: stay.highlight }}
                  />
                </div>
              </div>
            </Section>

            {/* DESCRIPTION */}
            <Section className="p-8 shadow-lg bg-white rounded-2xl border-2 border-stone-400">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-orange-500" />
                <h3 className="text-2xl font-extrabold text-stone-900">
                  About{" "}
                  <span className="text-orange-500 italic">This Stay</span>
                </h3>
              </div>

              <div
                className="text-stone-600 leading-relaxed text-sm font-medium prose prose-stone"
                dangerouslySetInnerHTML={{ __html: stay.description }}
              />
            </Section>

            {/* </div> */}
          </div>

          <div>
            {/* AMENITIES */}
            <Section className="mb-8">
              <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight flex items-center gap-4 mb-8">
                Top <span className="text-orange-500 italic">Amenities</span>
                <div className="flex-1 h-px bg-stone-100" />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenitiesList.map((item, idx) => {
                  const Icon = getIcon(item);
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="flex flex-col items-center gap-3 p-5 bg-stone-50 border border-stone-100 rounded-2xl cursor-default hover:bg-white hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white border border-stone-100 flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6 text-stone-600" />
                      </div>
                      <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest text-center">
                        {item}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </Section>

            {/* INCLUSIONS & EXCLUSIONS */}
            <Section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stay.inclusion?.length > 0 && (
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-emerald-700 text-xs font-black uppercase tracking-[0.2em]">
                        What's Included
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {stay.inclusion.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-xs font-semibold text-emerald-800/70 uppercase tracking-wider"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {stay.exclusion?.length > 0 && (
                  <div className="bg-rose-50/60 border border-rose-100 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <XCircle className="w-5 h-5 text-rose-500" />
                      <h4 className="text-rose-700 text-xs font-black uppercase tracking-[0.2em]">
                        Not Included
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {stay.exclusion.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-xs font-semibold text-rose-800/70 uppercase tracking-wider"
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Section>

            {/* MAP */}
            <Section>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">
                    Find{" "}
                    <span className="text-orange-500 italic">Paradise</span>
                  </h3>
                  <p className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-wider mt-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {stay.address?.nearbyLocation}, {stay.address?.city}
                  </p>
                </div>
                <a
                  href={stay.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-stone-200 text-stone-700 hover:border-orange-500 hover:text-orange-500 text-[10px] font-black uppercase tracking-[0.15em] transition-all group"
                >
                  Open in Maps{" "}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-md aspect-video">
                <iframe
                  src={stay.mapUrl}
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayDetailPage;
