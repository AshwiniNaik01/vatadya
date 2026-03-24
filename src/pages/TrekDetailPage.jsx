import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  XCircle,
  MapPin,
  Mountain,
  Clock,
  Users,
  Star,
  Activity,
  Camera,
  Calendar,
  CheckCircle,
  Zap,
  Info,
  BarChart2,
  CircleDot,
  ChevronRight,
  BadgeCheck,
  Flame,
  Layers,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrekById } from "../api/trekApi";
import TrekIntroCard from "../components/track/TrekIntroCard";
import TrekInfoCard from "../components/track/TrekInfoCard";
import TrekPageWithFees from "../components/track/TrekDescription";
import AddSiderForm from "../components/track/AddSiderForm";
import TrekGallery from "../components/track/TrekGallery";
import BookNowModal from "../components/modals/BookNowModal";
import { openLoginModal } from "../store/slices/authSlice";
import { toggleWishlistAsync } from "../store/slices/wishlistSlice";
import { selectAllTreks } from "../store/slices/trekSlice";
import AvailabilityCalendar from "../components/track/AvailabilityCalendar";
import DifficultyMeter from "../components/track/DifficultyMeter";
import MapCard from "../components/track/MapCard";

const TrekDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDropoff, setSelectedDropoff] = useState(null);
  const [selectedSuitable, setSelectedSuitable] = useState(null);
  const [selectedStay, setSelectedStay] = useState(null);

  const { isLoggedIn } = useSelector((state) => state.auth);
  // We might want to use the trek from trekSlice if it's there to keep track of isWishlisted
  const treks = useSelector(selectAllTreks);
  const trekFromStore = treks?.find((t) => t._id === id);

  // Effective trek object (merge API data with store status)
  const effectiveTrek = trekFromStore
    ? { ...trek, isWishlisted: trekFromStore.isWishlisted }
    : trek;

  const overviewRef = useRef(null);
  const feesRef = useRef(null);
  const photosRef = useRef(null);

  const tabs = useMemo(
    () => [
      {
        id: "Overview",
        label: "Overview",
        ref: overviewRef,
        icon: Layers,
        accent: "sky-500",
        ring: "ring-sky-400",
      },
      {
        id: "Fees",
        label: "Fees & Inclusions",
        ref: feesRef,
        icon: Activity,
        accent: "emerald-500",
        ring: "ring-emerald-400",
      },
      {
        id: "Photos",
        label: "Gallery",
        ref: photosRef,
        icon: Camera,
        accent: "purple-500",
        ring: "ring-purple-400",
      },
    ],
    [],
  );

  useEffect(() => {
    const get = async () => {
      try {
        setLoading(true);
        const res = await fetchTrekById(id);
        if (res.success) {
          const fetchedTrek = res.data;

          // Extract info from trekInfo if top-level fields are empty
          const infoMap = {};
          fetchedTrek.trekInfo?.forEach((item) => {
            infoMap[item.title] = item.values || [];
          });

          // Enhance trek object with extracted data if needed
          if (!fetchedTrek.pickup?.length && infoMap["PICKUP"])
            fetchedTrek.pickup = infoMap["PICKUP"];
          if (!fetchedTrek.dropoff?.length && infoMap["DROPOFF"])
            fetchedTrek.dropoff = infoMap["DROPOFF"];
          if (!fetchedTrek.suitableFor?.length && infoMap["SUITABLE FOR"])
            fetchedTrek.suitableFor = infoMap["SUITABLE FOR"];
          if (!fetchedTrek.accommodation?.length && infoMap["ACCOMMODATION"])
            fetchedTrek.accommodation = infoMap["ACCOMMODATION"];

          setTrek(fetchedTrek);
          window.scrollTo(0, 0);
        } else setError(res.message || "Not found");
      } catch {
        setError("Error fetching trek.");
      } finally {
        setLoading(false);
      }
    };
    get();
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 160;
      let found = "Overview";
      for (let i = tabs.length - 1; i >= 0; i--) {
        if (tabs[i].ref.current && tabs[i].ref.current.offsetTop <= pos) {
          found = tabs[i].id;
          break;
        }
      }
      setActiveTab(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tabs, trek]);

  const scrollToTab = (tabId) => {
    setActiveTab(tabId);
    const ref = tabs.find((t) => t.id === tabId)?.ref.current;
    if (ref)
      window.scrollTo({
        top: ref.getBoundingClientRect().top + window.pageYOffset - 145,
        behavior: "smooth",
      });
  };

  const handleWishlist = (e, t) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }
    dispatch(
      toggleWishlistAsync({ trekId: t._id, isWishlisted: t.isWishlisted }),
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-sky-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <Mountain className="absolute inset-0 m-auto w-7 h-7 text-sky-400 animate-pulse" />
        </div>
        <p className="text-sky-500 text-sm font-semibold tracking-[0.2em] animate-pulse uppercase">
          Loading Expedition...
        </p>
      </div>
    );

  if (error || !trek)
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-sky-100 p-14 text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-sky-900 mb-3">
            Trek Not Found
          </h2>
          <p className="text-sky-500/70 text-sm mb-10 leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => navigate("/treks")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-sky-200 hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Treks
          </button>
        </div>
      </div>
    );

  const diffMap = {
    easy: {
      label: "Easy",
      badge: "bg-emerald-100 text-emerald-700",
      bar: "bg-emerald-400",
      pct: 20,
      flame: 1,
    },
    moderate: {
      label: "Moderate",
      badge: "bg-amber-100 text-amber-700",
      bar: "bg-amber-400",
      pct: 45,
      flame: 2,
    },
    challenging: {
      label: "Challenging",
      badge: "bg-orange-100 text-orange-700",
      bar: "bg-orange-400",
      pct: 65,
      flame: 3,
    },
    difficult: {
      label: "Difficult",
      badge: "bg-red-100 text-red-700",
      bar: "bg-red-500",
      pct: 80,
      flame: 4,
    },
    extreme: {
      label: "Extreme",
      badge: "bg-purple-100 text-purple-700",
      bar: "bg-purple-500",
      pct: 95,
      flame: 5,
    },
  };
  const diff =
    diffMap[(trek.difficulty || "moderate").toLowerCase()] || diffMap.moderate;

  const heroImg =
    trek.image?.cdnUrl ||
    trek.image ||
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80";

  const SelectorGroup = ({ title, items, selected, setSelected }) => {
    if (!items?.length) return null;

    return (
      <div className="bg-white rounded-3xl border border-sky-100 shadow-lg p-8">
        <div className="flex items-center gap-2 mb-6">
          <CircleDot className="w-4 h-4 text-sky-500" />
          <h3 className="text-sky-900 font-bold text-sm uppercase tracking-wider">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {items.map((item, i) => {
            const active = selected === item;

            return (
              <button
                key={i}
                onClick={() => setSelected(item)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-300
              ${
                active
                  ? "bg-sky-500 text-white border-sky-500 shadow-md scale-105"
                  : "bg-white text-sky-600 border-sky-200 hover:border-sky-400 hover:bg-sky-50"
              }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <BookNowModal
        isOpen={isBookModalOpen}
        trekData={trek}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* ══ Navbar spacer ══ */}
      <div className="h-[72px] lg:h-[80px]" />

      {/* ══ Breadcrumb ══ */}
      <div className="max-w-7xl mx-auto px-6 py-4 z-10 relative">
        <nav className="flex items-center gap-2 text-xs font-semibold text-sky-400">
          <Link to="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/treks" className="hover:text-sky-600 transition-colors">
            Treks
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-sky-700">{trek.title}</span>
        </nav>
      </div>

      {/* ══ TrekIntroCard ══ */}
      <div className="sticky top-15 z-10">
        <TrekIntroCard
          trek={effectiveTrek}
          onBookNow={() => setIsBookModalOpen(true)}
          onWishlist={(e) => handleWishlist(e, effectiveTrek)}
        />
      </div>

      {/* ══ Image/Swiper Section ══ */}
      <div className="border-b border-sky-100">
        <AddSiderForm trek={trek} />
      </div>

      {/* ══ STICKY: Tab Navigation ══ */}
      <div className="sticky top-30 lg:top-46 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-blue-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-2.5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider
                        whitespace-nowrap transition-all duration-300 flex-shrink-0
              ${
                isActive
                  ? `bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-600/30`
                  : "text-white hover:bg-slate-800/70 hover:text-cyan-200 border border-blue-800/30"
              }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-cyan-400/60"}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 space-y-24">
        <section ref={overviewRef} id="overview" className="scroll-mt-[150px]">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-sky-200">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-px bg-yellow-400"></span>
                  <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em]">
                    Section 01
                  </p>
                </div>
                <h2 className="text-4xl font-black text-sky-950 tracking-tight">
                  Expedition{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                    Overview
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-sky-100 via-sky-50 to-transparent hidden md:block mb-4" />
          </div>

          {/* <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-sky-200/50 group">
            <img
              src={heroImg}
              alt={trek.title}
              className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/60 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
              <div className="max-w-xl">
                <div className="flex flex-wrap gap-3 mb-5">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold ${diff.badge}`}
                  >
                    {diff.label}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                    {trek.location}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {trek.title}
                </h3>
                {trek.description && (
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 max-w-lg">
                    {trek.description}
                  </p>
                )}
              </div>
            </div>

            <div className="absolute right-10 top-10 hidden lg:flex flex-col gap-3">
              {[
                {
                  label: "Duration",
                  val: trek.duration,
                  icon: Clock,
                  color: "text-sky-400",
                },
                {
                  label: "Altitude",
                  val: trek.altitude || "N/A",
                  icon: Mountain,
                  color: "text-emerald-400",
                },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5"
                  >
                    <Icon className={`w-4 h-4 ${s.color} flex-shrink-0`} />
                    <div>
                      <div className="text-xs text-blue-800 uppercase tracking-wider font-bold">
                        {s.label}
                      </div>
                      <div className="text-white text-xs font-bold">
                        {s.val}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}

{trek?.description && (
  <div className="mb-12">
    {/* Clean Header */}
    <div className="mb-8 text-center md:text-left">
   
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Trek Overview
      </h2>
    </div>

    {/* Description with nice typography */}
    <div className="max-w-8xl mx-auto md:mx-0">
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {trek.description}
      </p>
    </div>

    {/* Highlights in a clean grid */}
    {trek?.highlight?.length > 0 && (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          What Makes This Trek Special
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {trek.highlight.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-blue-600 font-bold text-lg">✦</span>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <DifficultyMeter trek={trek} />

            <MapCard location={trek?.location} />

            {/* <div className="relative grid grid-cols-12 gap-1 mt-6">
  {[
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ].map((m, i) => {
    const active = trek?.availableMonths?.includes(m);
    return (
      <div key={i} className="flex flex-col items-center gap-1.5">
        <div
          className={`w-full h-8 rounded-lg transition-all duration-500
          ${
            active
              ? "bg-emerald-500 shadow-lg shadow-emerald-200 scale-y-110"
              : "bg-sky-100"
          }`}
        ></div>
        <span
          className={`text-xs font-black ${
            active ? "text-emerald-600" : "text-sky-300"
          }`}
        >
          {m.slice(0,3)}
        </span>
      </div>
    );
  })}
</div> */}

            <div>
              <AvailabilityCalendar trek={trek} />
            </div>
          </div>

          {/* {trek?.description && (
            <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/40 overflow-hidden mb-10">
              <div className="h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400" />
              <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-sky-100">
                <div className="md:col-span-3 p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Info className="w-5 h-5 text-sky-500" />
                    <h3 className="font-semibold text-sky-900 text-lg">
                      About This Trek
                    </h3>
                  </div>
                  <div className="relative pl-6 border-l-4 border-sky-300 mb-6">
                    <p className="text-sky-700/80 leading-relaxed text-[15px] italic">
                      "{trek.description.substring(0, 140)}..."
                    </p>
                  </div>
                  <p className="text-sky-700/70 leading-relaxed text-sm">
                    {trek.description.substring(140)}
                  </p>
                </div>
                <div className="md:col-span-2 p-10 bg-white/40">
                  <div className="flex items-center gap-3 mb-7">
                    <BadgeCheck className="w-6 h-6 text-emerald-500" />
                    <h3 className="font-semibold text-sky-900 text-lg">
                      Trek Highlights
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {trek?.highlight?.length ? (
                      trek.highlight.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-500 transition-all">
                            <CheckCircle className="w-4 h-4 text-sky-500 group-hover:text-white transition" />
                          </div>
                          <p className="text-sky-700 text-sm md:text-base">
                            {item}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sky-400 text-sm">
                        No highlights available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )} */}

          <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <BarChart2 className="w-5 h-5 text-sky-500" />
              <h3 className="font-bold text-sky-900 text-base">
                Expedition Parameters
              </h3>
            </div>
            <TrekInfoCard trek={trek} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <SelectorGroup
              title="Pickup Location"
              items={trek.pickup}
              selected={selectedPickup}
              setSelected={setSelectedPickup}
            />
            <SelectorGroup
              title="Dropoff Location"
              items={trek.dropoff}
              selected={selectedDropoff}
              setSelected={setSelectedDropoff}
            />
            <SelectorGroup
              title="Suitable For"
              items={trek.suitableFor}
              selected={selectedSuitable}
              setSelected={setSelectedSuitable}
            />
            <SelectorGroup
              title="Accommodation"
              items={trek.accommodation}
              selected={selectedStay}
              setSelected={setSelectedStay}
            />
          </div>
        </section>

        <section ref={feesRef} id="fees" className="scroll-mt-[150px]">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-200">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-px bg-yellow-400"></span>
                  <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em]">
                    Section 02
                  </p>
                </div>
                <h2 className="text-4xl font-black text-sky-950 tracking-tight">
                  Finances &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    Inclusions
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-100 via-emerald-50 to-transparent hidden md:block mb-4" />
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-px shadow-xl shadow-emerald-200/50">
            <div className="bg-white rounded-[calc(1.5rem-1px)] px-10 py-8">
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    label: "Base Price",
                    val: trek?.feeDetails?.baseFee?.amount
                      ? `₹${trek.feeDetails.baseFee.amount.toLocaleString()}`
                      : "N/A",
                    sub:
                      trek?.feeDetails?.baseFee?.shortDescription ||
                      "per person",
                    icon: Activity,
                    color: "text-sky-600",
                  },
                  {
                    label: "GST Amount",
                    val: trek?.feeDetails?.gstPercent?.value
                      ? `${trek.feeDetails.gstPercent.value}%`
                      : "N/A",
                    sub: trek?.feeDetails?.gstPercent?.shortDescription || "",
                    icon: Users,
                    color: "text-emerald-600",
                  },
                  {
                    label: "Insurance",
                    val: trek?.feeDetails?.insurance?.amount
                      ? `₹${trek.feeDetails.insurance.amount.toLocaleString()}`
                      : "N/A",
                    sub: trek?.feeDetails?.insurance?.shortDescription || "",
                    icon: Zap,
                    color: "text-amber-600",
                  },
                  {
                    label: "Discount",
                    val: trek?.feeDetails?.discount?.value
                      ? `${trek.feeDetails.discount.value}%`
                      : "N/A",
                    sub: trek?.feeDetails?.discount?.shortDescription || "",
                    icon: Star,
                    color: "text-rose-500",
                  },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="text-center">
                      <Icon className={`w-6 h-6 ${p.color} mx-auto mb-3`} />
                      <div className="text-xl font-bold text-sky-900">
                        {p.val}
                      </div>
                      <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider mt-0.5">
                        {p.label}
                      </div>
                      <div className="text-xs text-sky-500/60 mt-0.5">
                        {p.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
            <div className="p-8 md:p-12">
              <TrekPageWithFees trek={trek} />
            </div>
          </div>
        </section>

        <section ref={photosRef} id="photos" className="scroll-mt-[150px]">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-200">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-px bg-yellow-400"></span>
                  <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em]">
                    Section 03
                  </p>
                </div>
                <h2 className="text-4xl font-black text-sky-950 tracking-tight">
                  Visual{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
                    Archive
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-100 via-purple-50 to-transparent hidden md:block mb-4" />
          </div>
          <TrekGallery trek={trek} />
        </section>
      </div>
    </div>
  );
};

export default TrekDetailPage;
