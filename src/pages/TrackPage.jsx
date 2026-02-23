import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  MapPin,
  Mountain,
  Search,
  Sunrise,
  Users,
  Filter,
  X
} from "lucide-react";
import BookNowModal from "../components/modals/BookNowModal";
import { selectAllTreks, fetchTreksAsync, fetchFilteredTreksAsync } from "../store/slices/trekSlice";

const TrackPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const difficultyParam = searchParams.get("difficulty");
  const categoryIdParam = searchParams.get("categoryId");

  const allTreks = useSelector(selectAllTreks);
  const status = useSelector((state) => state.treks.status);
  const error = useSelector((state) => state.treks.error);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Helper to check if param is a standard difficulty
  const isStandardDifficulty = (param) => {
    const standards = ["easy", "moderate", "challenging", "difficult", "extreme"];
    return standards.includes(param?.toLowerCase());
  };

  // Fetch treks on mount or when params change
  useEffect(() => {
    const param = difficultyParam || categoryIdParam;

    if (param) {
      dispatch(fetchFilteredTreksAsync(param));
      if (isStandardDifficulty(param)) {
        setSelectedDifficulty(param.toLowerCase());
      } else {
        setSelectedDifficulty("all");
      }
    } else {
      dispatch(fetchTreksAsync());
      setSelectedDifficulty("all");
    }
  }, [dispatch, difficultyParam, categoryIdParam]);

  // Filtering Logic
  const filteredTreks = allTreks.filter((trek) => {
    const matchesSearch =
      trek.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === "all" ||
      trek.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
  };

  // Helper for difficulty colors
  const getDifficultyColor = (difficulty) => {
    const colors = {
      moderate: "text-emerald-600 bg-emerald-50 border-emerald-200",
      challenging: "text-orange-600 bg-orange-50 border-orange-200",
      difficult: "text-red-600 bg-red-50 border-red-200",
      extreme: "text-purple-600 bg-purple-50 border-purple-200",
      easy: "text-green-600 bg-green-50 border-green-200"
    };
    return colors[difficulty?.toLowerCase()] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mb-4"></div>
        <p className="text-xl text-gray-500 font-medium animate-pulse">Summoning Mountains...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center max-w-lg">
          <h3 className="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden pt-20">
      <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

      {/* Modern Compact Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Wild</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 font-medium max-w-2xl mx-auto leading-relaxed">
            Curated treks for every explorer. From serene valleys to challenging summits.
          </p>
        </div>
      </section>

      {/* Interactive Filter Bar - Floating Glassmorphism */}
      <div className="sticky top-20 z-40 px-4 -mt-8 mb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl p-3 flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Find your next adventure..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide px-1">
              {["All", "Easy", "Moderate", "Challenging", "Difficult", "Extreme"].map((level) => {
                const isActive = selectedDifficulty === (level.toLowerCase() === "all" ? "all" : level.toLowerCase());
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level.toLowerCase() === "all" ? "all" : level.toLowerCase())}
                    className={`
                      whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95
                      ${isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-600 ring-offset-2"
                        : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}
                    `}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {filteredTreks.length > 0 ? "Available Treks" : "No Matches"}
            </h2>
            <p className="text-gray-500 mt-1">Found <strong className="text-emerald-600">{filteredTreks.length}</strong> distinctive journeys.</p>
          </div>

          {(searchQuery || selectedDifficulty !== "all") && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors group"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Advanced Trek Grid */}
      <section className="container mx-auto px-4 pb-24">
        {filteredTreks.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No adventures found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We couldn't find any treks matching your current filters. Try adjusting your search or difficulty level.
            </p>
            <button
              onClick={clearFilters}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
            {filteredTreks.map((trek) => (
              <div
                key={trek._id}
                className="group relative flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2"
              >
                {/* Image Header */}
                <div className="relative h-80 shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-80"></div>
                  <img
                    src={trek.image?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3"}
                    alt={trek.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-5 left-5 z-20 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/30">
                      {trek.difficulty}
                    </span>
                    {trek.featured && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950 shadow-lg">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-5 right-5 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white">
                    <span className="text-amber-400 text-base">★</span>
                    <span className="text-xs font-bold">{trek.rating || "4.8"}</span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <h3 className="text-2xl font-black text-white leading-tight mb-2 drop-shadow-lg group-hover:text-emerald-400 transition-colors">
                      {trek.title}
                    </h3>
                    <div className="flex items-center text-gray-200 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      {trek.location}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col flex-grow p-6 bg-white">
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: <Calendar className="w-4 h-4" />, label: "Duration", value: trek.duration, colorClass: "text-emerald-600 bg-emerald-50" },
                      { icon: <Mountain className="w-4 h-4" />, label: "Altitude", value: trek.altitude, colorClass: "text-blue-600 bg-blue-50" },
                      { icon: <Users className="w-4 h-4" />, label: "Group", value: trek.groupSize, colorClass: "text-orange-600 bg-orange-50" },
                      { icon: <Sunrise className="w-4 h-4" />, label: "Season", value: trek.season, colorClass: "text-purple-600 bg-purple-50" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.colorClass}`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase font-bold text-gray-400">{item.label}</p>
                          <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Starting from</p>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-lg font-bold text-emerald-600">₹</span>
                        <span className="text-2xl font-black text-gray-900">{trek.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <Link
                      to={`/trek/${trek._id}`}
                      className="group/btn relative overflow-hidden bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-emerald-600 transition-all hover:shadow-emerald-200 hover:-translate-y-0.5 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Details <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        )}
      </section>
    </div>
  );
};

export default TrackPage;
