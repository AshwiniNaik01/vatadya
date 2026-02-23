import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  CheckCircle,
  Play,
  Pause,
  Mountain,
  Sparkles,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { selectUpcomingTreks, fetchTreksAsync } from "../../store/slices/trekSlice";

const UpcomingDepartures = () => {
  const dispatch = useDispatch();
  const upcomingTreks = useSelector(selectUpcomingTreks);
  const status = useSelector((state) => state.treks.status);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [prevSlide, setPrevSlide] = useState(null);

  const sliderRef = useRef(null);
  const timerRef = useRef(null);
  const activeSlideRef = useRef(activeSlide); // Moved up

  // Update ref whenever activeSlide changes
  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTreksAsync());
    }
  }, [status, dispatch]);

  const departures = upcomingTreks.length > 0 ? upcomingTreks.map(trek => ({
    id: trek._id,
    name: trek.title,
    location: trek.location,
    date: trek.startDate || "TBA",
    duration: trek.duration,
    groupSize: trek.groupSize,
    slotsLeft: 5, // Placeholder as schema doesn't have exact slots count per date easily accessible
    price: `$${trek.price}`,
    rating: trek.rating || 0,
    reviews: trek.reviews || 0,
    difficulty: trek.difficulty,
    image: trek.image?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
    highlights: trek.tags || [],
    discount: trek.discount ? `${trek.discount}% OFF` : null,
    featured: trek.featured
  })) : [];

  console.log(departures.image, "image from response");

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const slideDuration = 6000;
    const interval = 50;
    const steps = slideDuration / interval;
    let step = 0;

    // Only set interval if we have departures
    if (departures.length > 0) {
      timerRef.current = setInterval(() => {
        step++;
        setProgress((step / steps) * 100);

        if (step >= steps) {
          step = 0;
          setProgress(0);

          // Use ref to get latest slide
          slideTransition(
            (activeSlideRef.current + 1) % departures.length,
            "next"
          );
        }
      }, interval);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, departures.length]); // Re-run if data length changes

  // Calculate days left
  const getDaysLeft = (dateStr) => {
    if (!dateStr || dateStr === "TBA") return "TBA";
    const targetDate = new Date(dateStr);
    const today = new Date();
    const diffTime = targetDate - today;
    const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    if (days === 0) return "Last Day!";
    if (days === 1) return "Tomorrow!";
    if (days <= 7) return `${days} days left`;
    return `${days} days to go`;
  };

  // Get formatted date
  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Enhanced slide transition with portal effect - Define this BEFORE any return
  const slideTransition = (targetSlide, direction = "next") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSlideDirection(direction);
    setPrevSlide(activeSlide);

    setActiveSlide(targetSlide);

    setTimeout(() => {
      setPrevSlide(null);
      setIsAnimating(false);
    }, 700);
  };

  const nextSlide = () => {
    const next = (activeSlide + 1) % departures.length;
    slideTransition(next, "next");
  };
  const prevSlides = () => {
    const prev =
      (activeSlide - 1 + departures.length) % departures.length;
    slideTransition(prev, "prev");
  };


  const goToSlide = (index) => {
    const direction = index > activeSlide ? "next" : "prev";
    slideTransition(index, direction);
  };

  const toggleAutoPlay = () => setIsPlaying(!isPlaying);

  // --- CONDITIONAL RENDERS MUST BE LAST ---

  // If loading, show a loader or nothing
  if (status === 'loading') {
    return <div className="py-20 text-center text-emerald-600">Loading upcoming departures...</div>;
  }

  // If no upcoming treks, show a placeholder message instead of null
  if (departures.length === 0) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-400">No Upcoming Departures</h2>
        <p className="text-gray-500">Check back later for new adventure dates!</p>
      </section>
    );
  }


  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-74 h-74 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-126 h-126 bg-amber-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">UPCOMING DEPARTURES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              Adventure Awaits
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Limited spots available for these confirmed departures. Book now to
            secure your place in these epic adventures.
          </p>
        </div>

        {/* Slider Container with Portal Effect */}
        <div className="relative mb-6">
          {/* Mountain Portal Background */}
          <div className="relative mx-auto max-w-8xl">
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Portal Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-96 h-96">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 border-4 border-emerald-200/30 rounded-3xl rotate-45 animate-spin-slow"></div>
                  <div className="absolute inset-8 border-4 border-emerald-300/20 rounded-2xl -rotate-45 animate-spin-slow-reverse"></div>

                  {/* Mountain Silhouette */}

                </div>
              </div>

              {/* Active Slide with Portal Effect */}
              {/* <div className="relative z-20">
                <div className={`transition-all duration-700 ease-out transform ${
                  isAnimating 
                    ? slideDirection === 'next' 
                      ? 'animate-slideInRight' 
                      : 'animate-slideInLeft'
                    : ''
                }`}>
                  <div className="relative">
                    {/* Glow Effect */}
              {/* <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 blur-xl rounded-lg"></div> */}

              {/* Main Card */}
              {/* <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl w-full max-w-7xl">
                      <div className="grid md:grid-cols-2">
                        {/* Image Side */}
              {/* <div className="relative h-64 md:h-auto">
                          <img
                            src={departures[activeSlide].image}
                            alt={departures[activeSlide].name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                           */}
              {/* Urgent Badge */}
              {/* <div className="absolute top-4 left-4 flex gap-2">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold animate-pulse">
                              {departures[activeSlide].slotsLeft} SLOTS LEFT
                            </div>
                            {departures[activeSlide].discount && (
                              <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {departures[activeSlide].discount}
                              </div>
                            )}
                          </div> */}

              {/* Days Counter */}
              {/* <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                            <div className="text-xs text-emerald-300">Departing in</div>
                            <div className="text-xl font-bold">{getDaysLeft(departures[activeSlide].date)}</div>
                          </div>
                        </div> */}

              {/* Content Side */}
              {/* <div className="p-6"> */}
              {/* Header */}
              {/* <div className="mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                              {departures[activeSlide].name}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{departures[activeSlide].location}</span>
                            </div>
                          </div> */}

              {/* Rating */}
              {/* <div className="flex items-center mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(departures[activeSlide].rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="ml-2 font-semibold text-gray-700">
                              {departures[activeSlide].rating} ({departures[activeSlide].reviews} reviews)
                            </span>
                          </div> */}

              {/* Details Grid */}
              {/* <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                              <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                              <div>
                                <div className="text-sm text-gray-500">Date</div>
                                <div className="font-semibold">{getFormattedDate(departures[activeSlide].date)}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                              <div>
                                <div className="text-sm text-gray-500">Duration</div>
                                <div className="font-semibold">{departures[activeSlide].duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-5 h-5 text-emerald-600 mr-3" />
                              <div>
                                <div className="text-sm text-gray-500">Group</div>
                                <div className="font-semibold">{departures[activeSlide].groupSize}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Starting from</div>
                              <div className="text-2xl font-bold text-emerald-700">
                                {departures[activeSlide].price}
                                <span className="text-sm text-gray-500 font-normal"> /person</span>
                              </div>
                            </div>
                          </div> */}

              {/* Highlights */}
              {/* <div className="mb-6">
                            <div className="text-sm text-gray-500 mb-2">Highlights</div>
                            <div className="flex flex-wrap gap-2">
                              {departures[activeSlide].highlights.map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full text-sm"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div> */}

              {/* CTA Button */}
              {/* <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Secure Your Spot
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* ACTIVE SLIDE AREA */}
              <div className="relative z-20 w-full h-full overflow-hidden">
                {/* PREVIOUS SLIDE (slides OUT) */}
                {prevSlide !== null && (
                  <div
                    className={`absolute inset-0 ${slideDirection === "next"
                      ? "animate-slideOutLeft"
                      : "animate-slideOutRight"
                      }`}
                  >
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl w-full max-w-7xl mx-auto">
                      <div className="grid md:grid-cols-2">
                        {/* Image Side */}
                        <div className="relative h-64 md:h-auto">
                          <img
                            src={departures[prevSlide].image}
                            alt={departures[prevSlide].name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                          {/* Urgent Badge */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold animate-pulse">
                              {departures[activeSlide].slotsLeft} SLOTS LEFT
                            </div>
                            {departures[activeSlide].discount && (
                              <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {departures[activeSlide].discount}
                              </div>
                            )}
                          </div>

                          {/* Days Counter */}
                          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                            <div className="text-xs text-emerald-300">Departing in</div>
                            <div className="text-xl font-bold">{getDaysLeft(departures[activeSlide].date)}</div>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {departures[prevSlide].name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CURRENT SLIDE (slides IN) */}
                <div
                  className={`absolute inset-0 ${isAnimating
                    ? slideDirection === "next"
                      ? "animate-slideInRight"
                      : "animate-slideInLeft"
                    : ""
                    }`}
                >
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl w-full max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2">
                      {/* Image Side */}
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={departures[activeSlide].image}
                          alt={departures[activeSlide].name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                        {/* Urgent Badge */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold animate-pulse">
                            {departures[activeSlide].slotsLeft} SLOTS LEFT
                          </div>
                          {departures[activeSlide].discount && (
                            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              {departures[activeSlide].discount}
                            </div>
                          )}
                        </div>

                        {/* Days Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-xl">
                          <div className="text-xs text-emerald-300">
                            Departing in
                          </div>
                          <div className="text-xl font-bold">
                            {getDaysLeft(departures[activeSlide].date)}
                          </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-6">
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {departures[activeSlide].name}
                          </h3>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{departures[activeSlide].location}</span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(departures[activeSlide].rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-semibold text-gray-700">
                            {departures[activeSlide].rating} ({departures[activeSlide].reviews} reviews)
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Date</div>
                              <div className="font-semibold">{getFormattedDate(departures[activeSlide].date)}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Duration</div>
                              <div className="font-semibold">{departures[activeSlide].duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-5 h-5 text-emerald-600 mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Group</div>
                              <div className="font-semibold">{departures[activeSlide].groupSize}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Starting from</div>
                            <div className="text-2xl font-bold text-emerald-700">
                              {departures[activeSlide].price}
                              <span className="text-sm text-gray-500 font-normal"> /person</span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <div className="text-sm text-gray-500 mb-2">Highlights</div>
                          <div className="flex flex-wrap gap-2">
                            {departures[activeSlide].highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full text-sm"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Secure Your Spot
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-6 space-x-6">
            {/* Previous Button */}
            <button
              onClick={prevSlides}
              disabled={isAnimating}
              className="group relative p-4 rounded-full bg-white border-2 border-emerald-200 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700" />
              <div className="absolute -inset-2 bg-gradient-to-r from-transparent to-emerald-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Auto-play & Progress */}

            {/* Next Button */}
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="group relative p-4 rounded-full bg-white border-2 border-emerald-200 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700" />
              <div className="absolute -inset-2 bg-gradient-to-l from-transparent to-emerald-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Slide Indicators */}
          {/* <div className="flex justify-center mt-8 space-x-3">
            {departures.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className="relative group"
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'bg-emerald-600 scale-125'
                    : 'bg-gray-300 group-hover:bg-gray-400'
                }`} />
                {index === activeSlide && (
                  <>
                    <div className="absolute -inset-2 border-2 border-emerald-400 rounded-full animate-ping opacity-50"></div>
                    <div className="absolute -inset-2 border-2 border-emerald-300 rounded-full animate-pulse"></div>
                  </>
                )}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
          @keyframes slideInRight {
  from { opacity: 0; transform: translateX(100%) scale(0.9); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-100%) scale(0.9); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(-100%) scale(0.9); }
}
@keyframes slideOutRight {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(100%) scale(0.9); }
}

.animate-slideInRight { animation: slideInRight 0.7s ease-out; }
.animate-slideInLeft { animation: slideInLeft 0.7s ease-out; }
.animate-slideOutLeft { animation: slideOutLeft 0.7s ease-in forwards; }
.animate-slideOutRight { animation: slideOutRight 0.7s ease-in forwards; }

      `}</style>
    </section>
  );
};

export default UpcomingDepartures;
