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
          className="text-center mb-12 perspective-1000"
          style={{
            transform: `rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              POPULAR TREKS
            </span>
          </div>

          <h2
            className="flex flex-wrap items-center justify-center gap-4
     text-5xl md:text-6xl font-black 
     leading-none tracking-tight mb-6"
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
        <div className="max-w-5xl mx-auto mb-20">
          {/* Search Bar */}
          <div className="relative group mb-8 perspective-1000 shadow-lg">
            <div
              className="absolute -inset-1 bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-indigo-400/20 
                            rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div
              className="relative bg-white backdrop-blur-xl 
                            border border-sky-800/30 rounded-2xl
                            p-2 flex items-center
                            group-hover:border-sky-400/60 transition-all"
            >
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-sky-800/60 group-hover:text-sky-900 transition-colors" />
                <div className="flex-1 ml-4 relative h-12 overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                      searchQuery
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
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
                    placeholder=""
                  />
                </div>
              </div>
              <button
                className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 
                                 text-white rounded-xl font-medium 
                                 hover:from-sky-600 hover:to-blue-600 
                                 transition-all shadow-lg shadow-sky-500/30
                                 flex items-center gap-2 group/btn"
              >
                <span>SCAN</span>
                <Zap className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {difficulties.map(({ name, label, icon: Icon, color }) => (
              <button
                key={name}
                onClick={() => setSelectedDifficulty(name)}
                className={`group relative px-6 py-3 rounded-xl font-medium 
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
          </div>

          {/* Active Filters Display */}
          {(searchQuery ||
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
        </div>

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto max-w-7xl">
            {filteredTreks.map((trek, idx) => {
              const DifficultyIcon = getDifficultyIcon(trek.difficulty);

              return (
                <div
                  key={trek._id}
                  className="relative h-[520px] group perspective-1000"
                >
                  {/* Cube Container */}
                  <div className="relative w-full h-full transform-style-preserve-3d shadow-2xl rounded-3xl bg-transparent">
                    {/* Card Faces Layered */}
                    <div
                      className="absolute inset-0 rounded-xl overflow-hidden border border-white/10
                          bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 
                          shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    >
                      {/* Main Image */}
                      <img
                        src={
                          trek.image?.cdnUrl ||
                          trek.image ||
                          "https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg"
                        }
                        alt={trek.title}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000 "
                      />

                      {/* Top Meta Floating Glass */}
                      <div className="absolute top-6 left-6 z-20">
                        <div
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl
                              backdrop-blur-md bg-white/10 border border-white/20 text-white
                              text-[10px] font-bold`}
                        >
                          <DifficultyIcon className="w-3 h-3 text-primary" />
                          {trek.difficulty || "Moderate"}
                        </div>
                      </div>
                      {/* Save Button */}
                      <button
                        onClick={(e) => handleWishlist(e, trek)}
                        className={`absolute top-6 right-6 w-12 h-12 flex items-center justify-center
                                rounded-xl border border-white/20 bg-white/5 transition-all duration-300
                                ${trek.isWishlisted ? "text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] border-pink-500/50" : "text-white/70 hover:text-pink-400"}
                                hover:shadow-[0_0_10px_rgba(255,105,180,0.7)]`}
                      >
                        <Heart
                          className={`w-5 h-5 ${trek.isWishlisted ? "fill-current" : ""}`}
                        />
                      </button>

                      {/* Bottom Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-4">
                        {/* Title */}
                        <h3
                          className="text-3xl font-bold tracking-tight text-white
               [text-shadow:0_0_4px_rgba(0,0,0,0.8),0_0_6px_rgba(0,0,0,0.8),0_0_8px_rgba(0,0,0,0.8)]"
                        >
                          {trek.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-white/80 text-sm drop-shadow-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          {trek.location}
                        </div>

                        {/* Price + Button */}
                        <div className="flex items-center justify-between mt-2 backdrop-blur-md bg-black/50 border border-white/20 rounded-xl p-4 text-white">
                          <div>
                            <div className="text-[12px] text-white">
                              Starting From
                            </div>
                            <div className="text-xl font-bold">
                              ₹{trek?.feeDetails?.totalFee?.toLocaleString()}
                              <span className="text-xs text-white ml-1">
                                /person
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Link
                              to={`/trek/${trek._id}`}
                              className="w-12 h-12 flex items-center justify-center rounded-xl border border-black/20 bg-white/5 hover:bg-blue-400/20 transition-all"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => handleBookNow(trek)}
                              className="px-4 py-3 rounded-xl border border-blue-400/30 bg-blue-500/10 hover:bg-blue-500 hover:text-white font-extrabold uppercase"
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Neon Bottom Glow Line */}
                      <div className="absolute bottom-0 left-0 w-full h-[4px] overflow-hidden">
                        <div
                          className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent 
                              -translate-x-[200%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-linear"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* ===== View All Link ===== */}
        <div className="text-center mt-20">
          <Link
            to="/treks"
            className="group inline-flex items-center gap-4
                       px-10 py-5 bg-white/5 backdrop-blur-sm
                       border border-sky-400/30 rounded-2xl
                       hover:border-sky-400/60 hover:bg-white/10
                       transition-all relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />

            <span
              onClick={() => navigate("/treks")}
              className="relative text-lg font-medium text-white cursor-pointer"
            >
              Explore Full Expedition Archive
            </span>
            <div
              className="relative w-12 h-12 rounded-full
                            border-2 border-sky-400/30
                            group-hover:border-sky-400
                            flex items-center justify-center
                            group-hover:scale-110 transition-all"
            >
              <Globe
                className="w-5 h-5 text-sky-400 
                                group-hover:rotate-180 
                                transition-transform duration-700"
              />
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
