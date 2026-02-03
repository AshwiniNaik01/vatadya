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
  Users
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiKey } from "react-icons/hi";
import BookNowModal from "../modals/BookNowModal";
import { API_BASE_URL, DIR } from "../../config/constants";
import { fetchTreks } from "./trekApi";

const PopularTreks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [filteredTreks, setFilteredTreks] = useState([]);
  const [treks, setTreks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholders = [
    "Search treks like Kedarkantha, Everest...",
    "Explore Himalayan adventures...",
    "Find beginner to extreme treks...",
    "Search by location, season, altitude...",
  ];

  const ITEM_HEIGHT = 56;

  const difficultyOptions = [
    { value: "all", label: "All Adventures", icon: <Compass className="w-4 h-4" />, color: "bg-gradient-to-r from-gray-800 to-gray-600" },
    { value: "moderate", label: "Moderate", icon: <TrendingUp className="w-4 h-4" />, color: "bg-gradient-to-r from-emerald-600 to-emerald-800", description: "Good fitness required" },
    { value: "challenging", label: "Challenging", icon: <Mountain className="w-4 h-4" />, color: "bg-gradient-to-r from-orange-600 to-amber-700", description: "For experienced trekkers" },
    { value: "difficult", label: "Difficult", icon: <Award className="w-4 h-4" />, color: "bg-gradient-to-r from-red-600 to-orange-700", description: "High altitude experience" },
    { value: "extreme", label: "Extreme", icon: <Target className="w-4 h-4" />, color: "bg-gradient-to-r from-purple-700 to-pink-600", description: "Mountaineering skills needed" },
  ];

  const quickFilters = [
    { id: "epic", label: "Epic Journeys", icon: "🏔️" },
    { id: "wild", label: "Wilderness", icon: "🌲" },
    { id: "cultural", label: "Cultural", icon: "🏛️" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "solo", label: "Solo Friendly", icon: "👤" },
    { id: "family", label: "Family Adventure", icon: "👨‍👩‍👧‍👦" },
  ];

  // --- Carousel placeholder animation ---
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeIndex === placeholders.length) {
      setTimeout(() => {
        setAnimate(false);
        setActiveIndex(0);
      }, 700);
      setTimeout(() => setAnimate(true), 750);
    }
  }, [activeIndex]);

  // --- Fetch Treks from API dynamically using Axios ---
  useEffect(() => {
    const loadTreks = async () => {
      try {
        setLoading(true);

        const result = await fetchTreks(); // ✅ using API function

        if (result.success && Array.isArray(result.data)) {
          setTreks(result.data);
          setFilteredTreks(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch treks.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadTreks();
  }, []);

  // --- Filtering ---
  useEffect(() => {
    if (!treks) return;

    let results = treks;

    if (searchQuery) {
      results = results.filter(
        (trek) =>
          trek.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trek.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trek.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedDifficulty !== "all") {
      results = results.filter(
        (trek) =>
          trek.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    setFilteredTreks(results);
  }, [searchQuery, selectedDifficulty, treks]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
    setActiveFilter("all");
  };

  // --- Render loading/error ---
  if (loading) return <div className="text-center py-40 text-gray-600 text-xl">Loading Treks...</div>;
  if (error) return <div className="text-center py-40 text-red-500 text-xl">{error}</div>;

  // --- Helper functions ---
  const getDifficultyColor = (difficulty) => {
    const colors = {
      moderate: "from-emerald-500 to-emerald-700",
      challenging: "from-orange-500 to-amber-600",
      difficult: "from-red-500 to-orange-600",
      extreme: "from-purple-600 to-pink-500",
      easy: "from-green-400 to-emerald-600"
    };
    return colors[difficulty.toLowerCase()] || "from-gray-500 to-gray-700";
  };

  return (
    <section
      id="treks"
      className="relative min-h-screen py-6 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50"
    >
      <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-200/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-amber-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Mountain className="w-12 h-12 text-emerald-300/40" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <HiKey className="w-10 h-10 text-amber-300/40" />
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-amber-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-6 h-6" />
            <span className="font-bold tracking-wide text-sm">
              UNCHARTED ADVENTURES AWAIT
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Conquer{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              EPIC PEAKS
            </span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From Himalayan giants to Patagonian glaciers. Your next
            life-changing adventure starts here.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-12 bg-transparent backdrop-blur-lg p-2 mx-20">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 h-14 overflow-hidden rounded-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 z-20" />
              {!searchQuery && (
                <div className="absolute left-12 top-0 h-14 overflow-hidden pointer-events-none z-10">
                  <div
                    className={`${animate ? "transition-transform duration-700 ease-in-out" : ""}`}
                    style={{
                      transform: `translateY(-${activeIndex * ITEM_HEIGHT}px)`,
                    }}
                  >
                    {[...placeholders, placeholders[0]].map((text, index) => (
                      <div key={index} className="h-14 flex items-center text-gray-400 text-base whitespace-nowrap">
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="absolute inset-0 w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none bg-transparent z-30"
              />
            </div>

            <button className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
              Find Adventures
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {["All", "Easy", "Moderate", "Challenging", "Difficult", "Extreme"].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setSelectedDifficulty(level.toLowerCase() === "all" ? "all" : level.toLowerCase())
                }
                className={`px-5 py-2 rounded-lg font-medium transition ${selectedDifficulty === (level.toLowerCase() === "all" ? "all" : level.toLowerCase())
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-8 mx-20">
          <h2 className="text-2xl font-bold text-gray-900">
            <span className="text-emerald-600">{filteredTreks.length}</span> Adventures Found
          </h2>
          {(searchQuery || selectedDifficulty !== "all") && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Treks Grid */}
        {filteredTreks.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg border border-gray-700/50">
            <Compass className="w-20 h-20 text-amber-400 mx-auto mb-6 opacity-50" />
            <h3 className="text-3xl font-bold text-white mb-4">
              No Adventures Found
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
              The wilderness is vast! Try a different search or explore all our epic journeys.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 group"
            >
              EXPLORE ALL TREKS
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-20">
            {filteredTreks.map((trek) => (
              <div key={trek._id} className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
                <button title="Add/Remove from wishlist" className="absolute top-4 right-4 z-50 p-2 rounded-full backdrop-blur-md bg-black/40 border border-white/20 transition-all duration-300 hover:bg-red-500/20 hover:border-red-400">
                  <Heart className="w-6 h-6 text-red-500" />
                </button>

                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={trek.image?.cdnUrl}
                    alt={trek.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end p-6 min-h-[500px]">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {trek.title}
                  </h3>
                  <div className="flex items-center text-gray-300 mb-4">
                    <MapPin className="w-5 h-5 text-amber-400 mr-2" />
                    <span className="font-medium">{trek.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-emerald-400 mr-2" />
                        <span className="text-xs text-gray-300">DURATION</span>
                      </div>
                      <div className="text-white font-bold">{trek.duration}</div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-xs text-gray-300">GROUP</span>
                      </div>
                      <div className="text-white font-bold">{trek.groupSize}</div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center">
                        <Sunrise className="w-4 h-4 text-orange-400 mr-2" />
                        <span className="text-xs text-gray-300">ALTITUDE</span>
                      </div>
                      <div className={`text-white font-bold text-sm px-2 py-1 rounded`}>
                        {trek.altitude}
                      </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-yellow-400 mr-2">📅</span>
                      <div>
                        <div className="text-xs text-gray-300">SEASON</div>
                        <div className="text-white font-bold text-sm">{trek.season}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-300">FROM</div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-white">
                            ${trek.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-500/30">
                        {trek.difficulty}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to={`/trek/${trek._id}`}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-white/20 text-center flex items-center justify-center"
                      >
                        View Trek
                      </Link>
                      <button
                        onClick={() => setIsBookModalOpen(true)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTreks;
