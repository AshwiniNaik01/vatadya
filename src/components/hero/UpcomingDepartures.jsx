import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Mountain,
  Feather,
  Zap,
  Sunrise,
  Sunset,
  CloudSun,
  Heart
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectUpcomingTreks, fetchTreksAsync } from "../../store/slices/trekSlice";
import { Link } from "react-router-dom";
import { openLoginModal } from "../../store/slices/authSlice";
import { toggleWishlistAsync } from "../../store/slices/wishlistSlice";

const UpcomingDepartures = () => {
  const dispatch = useDispatch();
  const upcomingTreks = useSelector(selectUpcomingTreks);
  const status = useSelector((state) => state.treks.status);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [prevSlide, setPrevSlide] = useState(null);

  const sliderRef = useRef(null);
  const timerRef = useRef(null);
  const activeSlideRef = useRef(activeSlide);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);


  const departures = upcomingTreks.length > 0
    ? upcomingTreks.map((trek) => ({
      ...trek,
      id: trek._id,
      name: trek.title,
      location: trek.location,
      date: trek.startDate || "TBA",
      duration: trek.duration,
      groupSize: trek.groupSize,
      slotsLeft: Math.floor(Math.random() * 8) + 2,
      totalFee: trek.feeDetails?.totalFee
        ? `₹${trek.feeDetails.totalFee.toLocaleString()}`
        : "Contact for pricing",
      inclusions: trek?.inclusions || ["Standard inclusions apply"],
      rating: trek.rating || "A1",
      difficulty: trek.difficulty || "MODERATE",
      image: trek.image?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
      discount: trek.discount ? `${trek.discount}% OFF` : null,
    }))
    : [];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    const slideDuration = 6000;
    const interval = 50;
    const steps = slideDuration / interval;
    let step = 0;
    if (departures.length > 0) {
      timerRef.current = setInterval(() => {
        step++;
        setProgress((step / steps) * 100);
        if (step >= steps) {
          step = 0;
          setProgress(0);
          slideTransition((activeSlideRef.current + 1) % departures.length, "next");
        }
      }, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, departures.length]);

  const getDaysLeft = (dateStr) => {
    if (!dateStr || dateStr === "TBA") return "TBA";
    const targetDate = new Date(dateStr);
    const today = new Date();
    const diffTime = targetDate - today;
    const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return `${days}`;
  };

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

  const nextSlide = () => slideTransition((activeSlide + 1) % departures.length, "next");
  const prevSlides = () => slideTransition((activeSlide - 1 + departures.length) % departures.length, "prev");
  const goToSlide = (index) => slideTransition(index, index > activeSlide ? "next" : "prev");

  const handleWishlist = (e, trek) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    dispatch(toggleWishlistAsync({ trekId: trek._id, isWishlisted: trek.isWishlisted }));
  };

  if (status === "loading") {
    return (
      <div className="py-40 bg-gradient-to-b from-sky-50 via-white to-blue-50 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-sky-200 border-t-sky-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Mountain className="w-8 h-8 text-sky-400 animate-pulse" />
          </div>
        </div>
        <div className="text-sky-600 text-sm tracking-wider animate-pulse font-medium">
          Discovering upcoming adventures...
        </div>
      </div>
    );
  }

  if (departures.length === 0) {
    return (
      <section className="py-32 bg-gradient-to-b from-sky-50 via-white to-blue-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-200/50 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-sky-200 rounded-3xl p-16 shadow-xl">
              <Feather className="w-20 h-20 text-sky-300 mx-auto mb-6" />
              <div className="text-sky-800 mb-3 text-lg font-light">No upcoming departures</div>
              <p className="text-sky-600/60 text-sm">New adventures are being planned. Check back soon!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-sky-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-sky-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-100/50 to-transparent"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(125, 211, 252, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(125, 211, 252, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center md:text-left md:flex md:justify-between md:items-end">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-sky-700 text-xs font-medium tracking-wide">UPCOMING JOURNEYS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-sky-900 mb-4">
              Ready for your next
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mt-2">
                Adventure Awaits!
              </span>
            </h2>
            <p className="text-sky-700/70 text-lg leading-relaxed">
              Your next unforgettable adventure is just around the corner.
              Join carefully curated journeys that promise thrills, discovery, and memories to last a lifetime.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 mt-8 md:mt-0">
            <div className="flex -space-x-2">
              {[Sunrise, CloudSun, Sunset].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm text-sky-600">Explore the Peaks</div>
              <div className="text-xs text-sky-400">Your Next Journey Awaits</div>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -top-8 left-0 right-0 flex justify-between items-center">
            <span className="text-sm text-sky-600 font-light tracking-wider">
              EXPLORING <span className="font-bold">{activeSlide + 1}</span> OF {departures.length}
            </span>
            <div className="w-48 h-1 bg-sky-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${(activeSlide + 1) / departures.length * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="relative min-h-[600px]">
            <div
              className={`absolute inset-0 transition-all duration-700 ${isAnimating
                ? slideDirection === "next"
                  ? "animate-slideInRight"
                  : "animate-slideInLeft"
                : ""
                }`}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-stretch min-h-[590px]">
                <div className="relative rounded-3xl overflow-hidden group shadow-2xl shadow-sky-200/50 h-full">
                  <img
                    src={departures[activeSlide].image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={departures[activeSlide].name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/20 to-transparent"></div>

                  <div className="absolute top-6 left-6 flex flex-wrap gap-3">
                    {departures[activeSlide].discount && (
                      <div className="bg-white/95 backdrop-blur-sm text-sky-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        {departures[activeSlide].discount}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg">
                      <div className="text-xs text-sky-600 mb-1">STARTS IN</div>
                      <div className="text-3xl font-bold text-sky-900">{getDaysLeft(departures[activeSlide].date)}</div>
                      <div className="text-xs text-sky-500">days</div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{departures[activeSlide].location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-sky-100 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider ${departures[activeSlide].difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-700' :
                      departures[activeSlide].difficulty === 'MODERATE' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                      {departures[activeSlide].difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-sky-900 mb-4 leading-tight">
                    {departures[activeSlide].name}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-sky-50 rounded-xl p-4">
                      <Users className="w-5 h-5 text-sky-600 mb-2" />
                      <div className="text-xs text-sky-600/70">Group</div>
                      <div className="text-sm font-bold text-sky-900">{departures[activeSlide].groupSize}</div>
                    </div>
                    <div className="bg-sky-50 rounded-xl p-4">
                      <Clock className="w-5 h-5 text-sky-600 mb-2" />
                      <div className="text-xs text-sky-600/70">Duration</div>
                      <div className="text-sm font-bold text-sky-900">{departures[activeSlide].duration}</div>
                    </div>
                    <div className="bg-sky-50 rounded-xl p-4">
                      <Calendar className="w-5 h-5 text-sky-600 mb-2" />
                      <div className="text-xs text-sky-600/70">Start</div>
                      <div className="text-sm font-bold text-sky-900">
                        {new Date(departures[activeSlide].date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {departures[activeSlide]?.inclusions?.map((inclusion, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sky-700">{inclusion}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-sm text-sky-600/70 block mb-1">Starting from</span>
                        <span className="text-4xl font-bold text-sky-900">{departures[activeSlide]?.totalFee}</span>
                        <span className="text-sm text-sky-600/70 ml-2">per person</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to={`/trek/${departures[activeSlide].id}`}
                        className="flex-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white py-4 rounded-xl font-medium hover:from-sky-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-sky-200 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={(e) => handleWishlist(e, departures[activeSlide])}
                        className="w-14 h-14 bg-white border-2 border-sky-200 rounded-xl flex items-center justify-center hover:border-sky-400 transition-colors group"
                      >
                        <Heart className={`w-6 h-6 ${departures[activeSlide].isWishlisted
                          ? "fill-rose-500 text-rose-500"
                          : "text-sky-400 group-hover:text-rose-400"
                          } transition-colors`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevSlides}
              className="w-12 h-12 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center hover:border-sky-400 hover:bg-sky-50 transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-sky-600 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex gap-3">
              {departures.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="group relative"
                >
                  <div
                    className={`rounded-full transition-all duration-500 ${idx === activeSlide
                      ? 'w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-400 text-white flex items-center justify-center text-sm font-bold'
                      : 'w-3 h-3 bg-sky-200 hover:bg-sky-300'
                      }`}
                  >
                    {idx === activeSlide && idx + 1}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center hover:border-sky-400 hover:bg-sky-50 transition-all group"
            >
              <ChevronRight className="w-5 h-5 text-sky-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.5; }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default UpcomingDepartures;