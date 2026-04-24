import {
  Award,
  Calendar,
  ChevronRight,
  Compass,
  Heart,
  MapPin,
  Mountain,
  Search,
  Sparkles,
  Sunrise,
  Target,
  TrendingUp,
  Users,
  Terminal,
  Activity,
  Zap,
  ArrowRight,
  Globe,
  Clock,
  Wind,
  Gauge,
  Navigation,
  Cloud,
  Star,
  CheckCircle,
  Eye,
  Layers,
  Droplets,
  Footprints,
  Tent,
  Camera,
  Sun,
  Moon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTreks, fetchTreksAsync } from "../../store/slices/trekSlice";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookNowModal from "../modals/BookNowModal";
import { openLoginModal } from "../../store/slices/authSlice";
import { toggleWishlistAsync } from "../../store/slices/wishlistSlice";

const PopularTreks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTreks = useSelector(selectAllTreks);
  const status = useSelector((state) => state.treks.status);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleWishlist = (e, trek) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    dispatch(
      toggleWishlistAsync({
        trekId: trek._id,
        isWishlisted: trek.isWishlisted,
      }),
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [filteredTreks, setFilteredTreks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const cardRefs = useRef([]);

  const placeholders = [
    "Search for your dream peak...",
    "Find Himalayan adventures...",
    "Discover alpine trails...",
    "Explore mountain secrets...",
  ];

  const seasons = ["all", "Spring", "Summer", "Autumn", "Winter"];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let results = allTreks;
    if (searchQuery) {
      results = results.filter(
        (trek) =>
          trek.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trek.location?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedDifficulty !== "all") {
      results = results.filter(
        (trek) =>
          trek.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase(),
      );
    }
    setFilteredTreks(results);
  }, [searchQuery, selectedDifficulty, allTreks]);

  const handleBookNow = (trek) => {
    setSelectedTrek(trek);
    setIsBookModalOpen(true);
  };

  const difficulties = [
    { name: "all", label: "All Levels", icon: Layers },
    {
      name: "Easy",
      label: "Easy",
      icon: Footprints,
      color: "from-emerald-400 to-green-400",
    },
    {
      name: "Moderate",
      label: "Moderate",
      icon: Wind,
      color: "from-amber-400 to-yellow-400",
    },
    // {
    //   name: "Challenging",
    //   label: "Challenging",
    //   icon: Mountain,
    //   color: "from-orange-400 to-red-400",
    // },
    {
      name: "Difficult",
      label: "Difficult",
      icon: Zap,
      color: "from-red-400 to-rose-400",
    },
    // {
    //   name: "Extreme",
    //   label: "Extreme",
    //   icon: Target,
    //   color: "from-purple-400 to-pink-400",
    // },
  ];

  const getDifficultyIcon = (difficulty) => {
    const found = difficulties.find(
      (d) => d.name.toLowerCase() === difficulty?.toLowerCase(),
    );
    return found?.icon || Mountain;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "from-emerald-400 to-green-400";
      case "moderate":
        return "from-amber-400 to-yellow-400";
      case "challenging":
        return "from-orange-400 to-red-400";
      case "difficult":
        return "from-red-400 to-rose-400";
      case "extreme":
        return "from-purple-400 to-pink-400";
      default:
        return "from-blue-400 to-cyan-400";
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950 flex items-center justify-center">
        <div className="relative">
          {/* 3D Loading Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-24 bg-gradient-to-t from-sky-400 to-blue-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: `${30 + i * 15}px`,
                  opacity: 0.5 + i * 0.1,
                }}
              ></div>
            ))}
          </div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-sky-300/80 font-light tracking-[0.3em] text-sm">
            LOADING ADVENTURES
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="treks"
      className="relative py-12 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0a1929 0%, #0b2b4a 50%, #0a3b5e 100%)",
      }}
    >
      <BookNowModal
        isOpen={isBookModalOpen}
        trekData={selectedTrek}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* ===== Dynamic Background Layers ===== */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 
  bg-gradient-to-b 
  from-slate-900 
  via-blue-950 
  to-slate-950"
        />

        <div
          className="absolute inset-0 
  bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%)]"
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-sky-400/20 to-blue-400/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `floatParticle ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}

        {/* 3D Mountain Silhouettes */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${10 + i * 20}%`,
                width: 0,
                height: 0,
                borderLeft: `${100 - i * 15}px solid transparent`,
                borderRight: `${100 - i * 15}px solid transparent`,
                borderBottom: `${200 - i * 30}px solid rgba(56, 189, 248, ${0.05 - i * 0.01})`,
                transform: `scale(${1 - i * 0.1})`,
                filter: "blur(2px)",
                opacity: 0.3 - i * 0.05,
              }}
            />
          ))}
        </div>

        {/* Animated Light Beams */}
        <div
          className="absolute top-0 left-[-50%] w-[200%] h-[2px] 
                        bg-gradient-to-r from-transparent via-sky-400/30 to-transparent 
                        animate-scan-slow"
        />
        <div
          className="absolute bottom-0 left-[-50%] w-[200%] h-[2px] 
                        bg-gradient-to-r from-transparent via-blue-400/30 to-transparent 
                        animate-scan-slow"
          style={{ animationDelay: "3s" }}
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ===== Content Container ===== */}
      <div className="container mx-auto px-6 relative z-10">
        {/* ===== Header with 3D Tilt ===== */}
        <div
          className="text-center mb-6 perspective-1000"
          style={{
            transform: `rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              POPULAR TREKS
            </span>
          </div>

          <h2
            className="flex flex-wrap items-center justify-center gap-4
     text-5xl md:text-6xl font-semibold 
     leading-none tracking-tight mb-2"
          >
            <span className="text-white">Conquer</span>

            <span
              className="text-transparent bg-clip-text 
         bg-gradient-to-r from-sky-200 via-sky-500 to-sky-400
         animate-gradient"
            >
              Epic Peaks
            </span>
          </h2>
        </div>

        {/* ===== Search & Filter Console ===== */}
        {/* <div className="max-w-7xl mx-auto mb-8 flex flex-col gap-6">

  {/* TOP ROW: SEARCH + FILTERS */}
  {/* <div className="flex flex-col lg:flex-row gap-6 items-center"> */}

    {/* Search Bar */}
    {/* <div className="relative group mb-0 flex-1 perspective-1000 shadow-lg w-full">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-indigo-400/20 
                      rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div
        className="relative bg-white backdrop-blur-xl 
                      border border-sky-800/30 rounded-2xl p-1
                      flex items-center
                      group-hover:border-sky-400/60 transition-all"
      >
        <div className="flex-1 flex items-center px-4">
          <Search className="w-5 h-5 text-sky-800/60 group-hover:text-sky-900 transition-colors" />

          <div className="flex-1 ml-4 relative h-12 overflow-hidden">
            <div
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                searchQuery ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              style={{ transform: `translateY(-${activeIndex * 48}px)` }}
            >
              {placeholders.map((p, i) => (
                <div
                  key={i}
                  className="h-12 text-sky-900/40 flex items-center text-lg"
                >
                  {p}
                </div>
              ))}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="absolute inset-0 w-full bg-transparent border-none 
                         outline-none text-black text-lg placeholder-transparent
                         focus:ring-0"
            />
          </div>
        </div>

        <button
          className="px-8 py-2 bg-gradient-to-r from-sky-500 to-blue-500 
                           text-white rounded-xl font-medium 
                           hover:from-sky-600 hover:to-blue-600 
                           transition-all shadow-lg shadow-sky-500/30
                           flex items-center gap-2 group/btn"
        >
          <span>SCAN</span>
          <Zap className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
        </button>
      </div>
    </div> */}

    {/* Filter Chips */}
    {/* <div className="flex flex-wrap justify-center gap-3 w-full lg:w-auto">

      {difficulties.map(({ name, label, icon: Icon, color }) => (
        <button
          key={name}
          onClick={() => setSelectedDifficulty(name)}
          className={`group relative px-6 py-2 rounded-lg font-medium 
                       transition-all duration-300 overflow-hidden
                       ${
                         selectedDifficulty === name
                           ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-500/30 scale-105"
                           : "bg-white/5 text-white shadow-lg hover:text-white border border-sky-800 hover:border-sky-400/60"
                       }`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          />
          <div className="relative flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </div>
        </button>
      ))}

    </div> */}

  {/* </div> */}

  {/* Active Filters Display (UNCHANGED) */}
  {/* {(searchQuery ||
    selectedDifficulty !== "all" ||
    selectedSeason !== "all") && (
    <div
      className="mt-8 flex items-center justify-between 
                    pt-6 border-t border-sky-400/20"
    >
      <div className="flex items-center gap-3 text-sky-300">
        <Activity className="w-4 h-4 animate-pulse" />
        <span className="text-sm font-medium">
          {filteredTreks.length} expeditions match your criteria
        </span>
      </div>

      <button
        onClick={() => {
          setSearchQuery("");
          setSelectedDifficulty("all");
          setSelectedSeason("all");
        }}
        className="text-sm text-sky-400/60 hover:text-sky-400 
                   transition-colors flex items-center gap-1
                   px-4 py-2 rounded-full bg-white/5"
      >
        Clear filters
      </button>
    </div>
  )}
</div> */}

        {/* ===== Cards Grid ===== */}
        {/* Dynamic Trek Grid */}
        {filteredTreks.length === 0 ? (
          <div className="py-40 flex flex-col items-center justify-center gap-8">
            <Compass className="text-primary animate-spin-slow w-16 h-16" />
            <span className="data-text text-sm text-primary font-black uppercase tracking-[0.6em]">
              NO_EXPEDITIONS_FOUND
            </span>
          </div>
        ) : (
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 mx-auto max-w-7xl">
  {filteredTreks.map((trek) => {
    const DifficultyIcon = getDifficultyIcon(trek.difficulty);

    return (
      <div
        key={trek._id}
        className="group relative h-[500px]"
      >
        {/* CARD */}
        <div
          className="relative h-full rounded-lg overflow-hidden
          bg-[#0B0F19] border-2 border-white/50
          shadow-[0_25px_80px_rgba(0,0,0,0.6)]
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:-translate-y-3 group-hover:shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        >

          {/* IMAGE */}
          <img
            src={
              trek.image?.cdnUrl ||
              trek.image ||
              ""
            }
            alt={trek.title}
            className="absolute inset-0 w-full h-full object-cover
            scale-105 group-hover:scale-110 transition duration-[1200ms]"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* TOP BAR */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-20">

            {/* Difficulty */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              text-[10px] font-semibold text-white tracking-wide"
            >
              <DifficultyIcon className="w-3 h-3 text-amber-400" />
              {trek.difficulty || "Unknown"}
            </div>

            {/* Wishlist */}
            <button
              onClick={(e) => handleWishlist(e, trek)}
              className={`w-10 h-10 flex items-center justify-center rounded-full
              backdrop-blur-md border border-white/20 transition-all duration-300
              ${
                trek.isWishlisted
                  ? "bg-rose-500/20 text-rose-400 border-rose-400/40"
                  : "bg-white/5 text-white/70 hover:text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  trek.isWishlisted ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          {/* CONTENT */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 z-20">

            {/* TITLE */}
            <h3 className="text-2xl font-semibold text-white leading-tight tracking-tight">
              {trek.title}
            </h3>

            {/* LOCATION */}
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              {trek.location}
            </div>

            {/* INFO STRIP */}
            <div className="flex items-center justify-between text-white/60 text-xs border-t border-white/10 pt-3">
              <span>{trek.duration || "--"}</span>
              <span>Group: {trek.groupSize || "--"}</span>
              <span>{trek.altitude || "--"} ft</span>
            </div>

            {/* PRICE + CTA */}
            <div
              className="flex items-center justify-between mt-2
              bg-white/[0.05] backdrop-blur-xl border border-white/10
              rounded-xl px-4 py-3"
            >
              {/* PRICE */}
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">
                  Starting from
                </p>

                <p className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  ₹{trek?.feeDetails?.totalFee?.toLocaleString() || "--"}
                </p>

                <p className="text-[10px] text-white/40">
                  per person
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">

                {/* View */}
                <Link
                  to={`/trek/${trek._id}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full
                  bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <Eye className="w-4 h-4 text-white" />
                </Link>

                {/* BOOK BUTTON */}
                <button
                  onClick={() => handleBookNow(trek)}
                  disabled={trek.status?.toLowerCase() === 'completed'}
                  className={`px-4 py-2 rounded-full
                  bg-gradient-to-r from-amber-500 to-amber-600
                  text-black text-xs font-semibold tracking-wide
                  transition-all duration-300 ${trek.status?.toLowerCase() === 'completed' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                >
                  {trek.status?.toLowerCase() === 'completed' ? 'Completed' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>

          {/* PREMIUM HOVER LIGHT */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-400/10 blur-3xl rounded-full" />
          </div>

        </div>
      </div>
    );
  })}
</div>
        )}
        {/* ===== View All Link ===== */}
       <div className="text-center mt-5">

  <Link
    to="/treks"
    className="group inline-flex items-center gap-3
    px-6 py-3 rounded-3xl
    bg-white/5 backdrop-blur-md
    border border-white/10
    hover:border-amber-400/40 hover:bg-white/10
    transition-all duration-500 relative overflow-hidden"
  >

    {/* soft glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

    {/* shimmer line */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    {/* text */}
    <span className="relative text-sm font-medium text-white tracking-wide">
      Explore Expeditions
    </span>

    {/* icon */}
    <div className="relative w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-amber-400/60 transition">
      <Globe className="w-4 h-4 text-amber-400 group-hover:rotate-180 transition-transform duration-700" />
    </div>

  </Link>

</div>
      </div>

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-100px) rotate(180deg); opacity: 0.6; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.2; }
        }
        
        @keyframes cardFloat {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes mountainWave {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        @keyframes scan-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scan-fast {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        
        .animate-scan-slow {
          animation: scan-slow 8s linear infinite;
        }
        
        .animate-scan-fast {
          animation: scan-fast 3s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default PopularTreks;
