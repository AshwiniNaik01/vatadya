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
  Heart,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUpcomingTreks,
  fetchTreksAsync,
} from "../../store/slices/trekSlice";
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

  const departures =
    upcomingTreks.length > 0
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
          image:
            trek.image?.cdnUrl ||
            "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
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
          slideTransition(
            (activeSlideRef.current + 1) % departures.length,
            "next",
          );
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

  const nextSlide = () =>
    slideTransition((activeSlide + 1) % departures.length, "next");
  const prevSlides = () =>
    slideTransition(
      (activeSlide - 1 + departures.length) % departures.length,
      "prev",
    );
  const goToSlide = (index) =>
    slideTransition(index, index > activeSlide ? "next" : "prev");

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
              <div className="text-sky-800 mb-3 text-lg font-light">
                No upcoming departures
              </div>
              <p className="text-sky-600/60 text-sm">
                New adventures are being planned. Check back soon!
              </p>
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
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center md:text-left md:flex md:justify-between md:items-end">
          <div className="max-w-8xl mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-sky-800/50 rounded-full px-5 py-2 mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-sky-700 text-xs font-medium tracking-wide">
                UPCOMING JOURNEYS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl text-underline font-bold text-slate-700 mb-4 tracking-tight leading-tight flex flex-wrap items-end gap-4">
              <span>Ready for your next</span>

              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 whitespace-nowrap">
                Adventure Awaits
              </span>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70" />
            </h2>
            <p className="text-sky-700/70 text-lg leading-relaxed max-w-5xl mx-auto md:mx-0">
              Your next unforgettable adventure is just around the corner. Join
              carefully curated journeys that promise thrills, discovery, and
              memories to last a lifetime.
            </p>
          </div>

          {/* <div className="hidden md:flex items-center gap-4 bg-gradient-to-r from-sky-100/50 to-transparent rounded-full px-4 py-2">
            <div className="flex -space-x-2">
              {[Sunrise, CloudSun, Sunset].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white border-2 border-sky-200 flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm text-sky-600">Explore the Peaks</div>
              <div className="text-xs text-sky-400">
                Your Next Journey Awaits
              </div>
            </div>
          </div> */}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -top-8 left-0 right-0 flex justify-between items-center">
            <span className="text-sm text-sky-600 font-semibold tracking-wider">
              EXPLORING{" "}
              <span className="font-extrabold animate-ping">
                {activeSlide + 1}
              </span>{" "}
              OF {departures.length}
            </span>
            <div className="w-48 h-1 bg-sky-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-100 ease-linear"
                style={{
                  width: `${((activeSlide + 1) / departures.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* 🔗 SPIRAL BINDING CENTER LINE */}
            <div className="hidden lg:flex flex-col items-center absolute left-1/2 top-0 -translate-x-1/2 h-full z-30 pointer-events-none">
              <div className="w-[3px] h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent opacity-40"></div>

              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3 my-2 rounded-full border border-slate-400/40 bg-sky-700 shadow-sm"
                />
              ))}
            </div>

            {/* 📦 GRID */}
            <div className="grid lg:grid-cols-2 gap-10 items-center max-h-[460px]">
              {/* 🖼 IMAGE CARD */}
              <div className="relative group rounded-xl overflow-hidden shadow-2xl border-2 border-sky-900/70 h-[400px]">
                <img
                  src={departures[activeSlide].image}
                  alt={departures[activeSlide].name}
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-[1200ms] ease-out"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* location */}
                <div className="absolute bottom-5 left-5">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs tracking-wide">
                    <span className="animate-ping">📍</span>{" "}
                    {departures[activeSlide].location}
                  </div>
                </div>

                {/* glow */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-sky-500/10 via-transparent to-amber-400/10 blur-3xl opacity-60" />
              </div>

              {/* 🧾 DETAILS CARD */}
              <div className="relative bg-[#0B0F19]/90 backdrop-blur-2xl rounded-2xl p-6 lg:p-7 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col h-[400px] overflow-hidden">
                {/* ambient luxury glow */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 blur-3xl rounded-full" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/10 blur-3xl rounded-full" />

                {/* subtle inner border glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/[0.06] pointer-events-none" />

                {/* TOP */}

                {/* TITLE */}
                <div className="flex items-center gap-3 mb-2 z-10 flex-wrap">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white leading-snug tracking-tight">
                    {departures[activeSlide].title}
                  </h3>
                  {departures[activeSlide].status && (
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${
                        departures[activeSlide].status.toLowerCase() === 'completed'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : departures[activeSlide].status.toLowerCase() === 'upcoming'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : departures[activeSlide].status.toLowerCase() === 'ongoing'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}
                    >
                      {departures[activeSlide].status}
                    </span>
                  )}
                </div>

                {/* LOCATION */}
                <p className="text-xs text-white/50 mb-5 tracking-wide z-10">
                  📍 {departures[activeSlide].location?.trim()}
                </p>

                {/* INFO GRID */}
                <div className="grid grid-cols-3 gap-3 mb-6 z-10">
                  {[
                    {
                      icon: Users,
                      label: "Group",
                      value: departures[activeSlide].groupSize?.trim() || "--",
                    },
                    {
                      icon: Clock,
                      label: "Duration",
                      value: departures[activeSlide].duration?.trim() || "--",
                    },
                    {
                      icon: Calendar,
                      label: "Start",
                      value: departures[activeSlide].startDate
                        ? new Date(
                            departures[activeSlide].startDate,
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })
                        : "--",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white/[0.03] border border-white/40 rounded-xl flex flex-col items-center justify-center p-3 hover:bg-white/[0.06] transition"
                      >
                        <Icon className="w-4 h-4 text-amber-400 mb-2" />
                        <div className="text-sm text-white/40 tracking-wide">
                          {item.label}
                        </div>
                        <div className="text-sm font-medium text-white">
                          {item.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* INCLUSIONS */}
                <div className="space-y-2 mb-6 z-10">
                  {departures[activeSlide]?.inclusions?.length > 0 ? (
                    departures[activeSlide].inclusions
                      .slice(0, 3)
                      .map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-white/60 text-xs">{item}</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-xs text-white/30 italic">
                      No inclusions listed
                    </p>
                  )}
                </div>

                {/* PRICE */}
                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                  {/* 💰 PRICE BLOCK */}
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 tracking-wider uppercase">
                      Starting from
                    </span>

                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent leading-tight">
                      ₹
                      {departures[activeSlide]?.feeDetails?.totalFee ||
                        departures[activeSlide]?.calculatedTotalFee ||
                        "--"}
                    </span>

                    <span className="text-[10px] text-white/40">
                      per person
                    </span>
                  </div>

                  {/* ⚡ ACTIONS */}
                  <div className="flex items-center gap-3">
                    {/* CTA */}
                    <Link
                      to={`/trek/${departures[activeSlide].id}`}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-semibold tracking-wide shadow-md hover:shadow-amber-500/30 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Wishlist */}
                    <button
                      onClick={(e) =>
                        handleWishlist(e, departures[activeSlide])
                      }
                      className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-rose-500/10 hover:border-rose-400/30 transition-all duration-300"
                    >
                      <Heart
                        className={`w-5 h-5 transition ${
                          departures[activeSlide].isWishlisted
                            ? "fill-rose-500 text-rose-500"
                            : "text-white/40 hover:text-rose-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* CTA */}
                {/* <div className="flex gap-3 z-10"> */}

                {/* </div> */}
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
                    className={`rounded-full transition-all duration-500 ${
                      idx === activeSlide
                        ? "w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-400 text-white flex items-center justify-center text-sm font-bold"
                        : "w-3 h-3 bg-sky-200 hover:bg-sky-300"
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
