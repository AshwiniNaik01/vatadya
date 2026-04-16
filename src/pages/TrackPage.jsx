import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Mountain,
  Search,
  Sunrise,
  Users,
  X,
  Star,
  ArrowRight,
  Terminal,
  Activity,
  Clock,
  Compass,
  Heart,
  Eye,
  Footprints,
  Wind,
  Navigation,
  Zap,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import BookNowModal from "../components/modals/BookNowModal";
import {
  selectAllTreks,
  fetchTreksAsync,
  fetchFilteredTreksAsync,
} from "../store/slices/trekSlice";
import { openLoginModal } from "../store/slices/authSlice";
import { toggleWishlistAsync } from "../store/slices/wishlistSlice";

const TrackPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const difficultyParam = searchParams.get("difficulty");
  const categoryIdParam = searchParams.get("categoryId");

  const allTreks = useSelector(selectAllTreks);
  const status = useSelector((state) => state.treks.status);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleBookNow = (trek) => {
    setSelectedTrek(trek);
    setIsBookModalOpen(true);
  };

  const { trekIds, stayIds } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const param = difficultyParam || categoryIdParam;
    if (param) {
      dispatch(fetchFilteredTreksAsync(param));
      const standards = [
        "easy",
        "moderate",
        "challenging",
        "difficult",
        "extreme",
      ];
      setSelectedDifficulty(
        standards.includes(param?.toLowerCase()) ? param.toLowerCase() : "all",
      );
    } else if (status === "idle") {
      dispatch(fetchTreksAsync());
      setSelectedDifficulty("all");
    } else {
      setSelectedDifficulty("all");
    }
  }, [dispatch, difficultyParam, categoryIdParam, status]);

  const filteredTreks = allTreks.filter((trek) => {
    const matchesSearch =
      trek.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      trek.difficulty?.toLowerCase() === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // const handleWishlist = (e, trek) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (!isLoggedIn) {
  //     dispatch(openLoginModal());
  //     return;
  //   }
  //   dispatch(
  //     toggleWishlistAsync({
  //       trekId: trek._id,
  //       isWishlisted: trek.isWishlisted,
  //     }),
  //   );
  // };

  const handleWishlist = (e, item, type) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      toggleWishlistAsync({
        trekId: type === "trek" ? item._id : null,
        stayId: type === "stay" ? item._id : null,
        isWishlisted:
          type === "trek"
            ? trekIds.includes(item._id)
            : stayIds.includes(item._id),
      }),
    );
  };

  const difficultyConfig = {
    easy: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    moderate: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    challenging: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      dot: "bg-orange-500",
    },
    difficult: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
    extreme: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      dot: "bg-purple-500",
    },
  };
  const getDiff = (d) =>
    difficultyConfig[d?.toLowerCase()] || {
      bg: "bg-sky-100",
      text: "text-sky-700",
      dot: "bg-sky-500",
    };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center gap-5">
        <div className="relative w-20 h-20">
          <div className="w-20 h-20 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
          <Mountain className="absolute inset-0 m-auto w-7 h-7 text-sky-400 animate-pulse" />
        </div>
        <p className="text-sky-600 text-sm font-medium tracking-widest animate-pulse">
          Discovering expeditions...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-white to-blue-300 overflow-x-hidden">
      <BookNowModal
        isOpen={isBookModalOpen}
        trekData={selectedTrek}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* ══════════ HERO (PRESERVED) ══════════ */}
      <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 via-sky-900/60 to-sky-900/90" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Terminal size={16} className="text-sky-300" />
            <span className="text-sky-300 text-xs font-bold tracking-[0.3em] uppercase">
              MISSION ARCHIVE
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Explore
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-blue-200">
              Your Next Adventure
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Access our curated expedition database and find the perfect trek for
            your next adventure.
          </p>
        </div>
      </section>

      {/* ══════════ FILTER BAR — UPDATED ══════════ */}
      <div className="sticky top-0 z-40">
        <div className="bg-white/90 backdrop-blur-xl border-b border-sky-100 shadow-sm shadow-sky-100/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-[380px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400 group-focus-within:text-sky-600 transition-colors" />
              <input
                type="text"
                placeholder="Search trek or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-sm
                           placeholder:text-sky-400 focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-sky-200 text-sky-600 hover:bg-sky-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["All", "Easy", "Moderate", "Difficult"].map((level) => {
                const val =
                  level.toLowerCase() === "all" ? "all" : level.toLowerCase();
                const isActive = selectedDifficulty === val;
                const cfg = getDiff(level);
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(val)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300
                      ${
                        isActive
                          ? `${cfg.bg} ${cfg.text} shadow-sm scale-105 ring-2 ring-offset-1 ${cfg.text.replace("text", "ring")}`
                          : "bg-white text-sky-600 border border-sky-200 hover:bg-sky-50 hover:border-sky-300"
                      }`}
                  >
                    {isActive && (
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${cfg.dot}`}
                      />
                    )}
                    {level}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sky-600 text-sm font-medium hidden lg:block">
                <span className="font-bold text-sky-800">
                  {filteredTreks.length}
                </span>{" "}
                results
              </span>
              {(searchQuery || selectedDifficulty !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDifficulty("all");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-sky-900">
            {filteredTreks.length}{" "}
            {filteredTreks.length === 1 ? "Expedition" : "Expeditions"} Found
          </h2>
          <p className="text-sky-600/70 text-sm mt-1">
            Pick your next mountain adventure
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-28">
        {filteredTreks.length === 0 ? (
          <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-24 text-center">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="w-10 h-10 text-sky-300" />
            </div>
            <h3 className="text-xl font-bold text-sky-900 mb-3">
              No Expeditions Found
            </h3>
            <p className="text-sky-600/70 mb-8 max-w-sm mx-auto text-sm">
              Try adjusting your search or difficulty filter to find your
              perfect trek.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
              }}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-bold hover:from-sky-600 hover:to-blue-600 transition-all shadow-lg shadow-sky-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTreks.map((trek, idx) => {
              const diff = getDiff(trek.difficulty);

              return (
                <div
                  key={trek._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg shadow-sky-100/60 border-4 border-sky-200
                             hover:shadow-2xl hover:shadow-sky-200/60 hover:-translate-y-2 transition-all duration-500"
                  style={{
                    animation: `trackFadeUp 0.5s ease-out ${idx * 0.08}s both`,
                  }}
                  onMouseEnter={() => setHoveredCard(trek._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative h-[350px] overflow-hidden">
                    <img
                      src={
                        trek.image?.cdnUrl ||
                        trek.image ||
                        "https://images.unsplash.com/photo-1551632811-561732d1e306"
                      }
                      alt={trek.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent" />

                    <button
                      onClick={(e) => handleWishlist(e, trek, "trek")}
                      className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl
                                 bg-white/90 backdrop-blur-sm shadow-lg border border-white/50
                                 hover:bg-rose-50 hover:border-rose-200 transition-all duration-300 z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${trek.isWishlisted ? "fill-rose-500 text-rose-500" : "text-sky-400"}`}
                      />
                    </button>

                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-md">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wide ${diff.bg} ${diff.text} shadow-sm`}
                      >
                        {trek.difficulty || "Moderate"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-sky-500 text-xs font-semibold mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {trek.location}
                    </div>

                    <h3 className="text-lg font-bold text-sky-900 mb-4 leading-snug group-hover:text-sky-600 transition-colors">
                      {trek.title}
                    </h3>

                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {[
                        {
                          label: "Altitude",
                          val: trek.altitude || "N/A",
                          icon: Mountain,
                        },
                        {
                          label: "Group",
                          val: trek.groupSize || "N/A",
                          icon: Users,
                        },
                        {
                          label: "Season",
                          val: trek.season || "YR",
                          icon: Calendar,
                        },
                      ].map((s, i) => (
                        <div key={i} className="bg-sky-50 rounded-xl p-2">
                          <s.icon className="w-4 h-4 text-sky-500 mb-1" />
                          <div className="text-[10px] text-sky-500/70 uppercase">
                            {s.label}
                          </div>
                          <div className="text-[11px] font-bold text-sky-800">
                            {s.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between p-2 border-t border-sky-100">
                      <div className="">
                        <div className=" text-[10px] text-sky-500  uppercase tracking-wider mb-0.5">
                          Starting from
                        </div>
                        <div className="text-xl font-bold text-sky-900">
                          ₹{trek?.feeDetails?.totalFee?.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/trek/${trek._id}`}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-50 border border-sky-200
                                     hover:bg-sky-100 hover:border-sky-300 transition-all group/l"
                        >
                          <Eye className="w-4 h-4 text-sky-500 group-hover/l:text-sky-700 transition-colors" />
                        </Link>
                        <button
                          onClick={() => handleBookNow(trek)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white uppercase tracking-wide
                                     bg-gradient-to-r from-sky-500 to-blue-500
                                     hover:from-sky-600 hover:to-blue-600 hover:shadow-lg hover:shadow-sky-200 transition-all group/b"
                        >
                          Book Now
                          <ArrowRight className="w-3.5 h-3.5 group-hover/b:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        @keyframes trackFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TrackPage;
