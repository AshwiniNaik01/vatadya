import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ChevronLeft, XCircle, MapPin, Mountain, Clock, Users,
    Star, ArrowRight, Layers, Activity, Camera, Calendar,
    CheckCircle, Zap, Heart, Shield, Leaf, TrendingUp,
    Sparkles, Info, BarChart2, CircleDot, ChevronRight,
    X, BadgeCheck, Globe, Flame, Wind
} from "lucide-react";
import { fetchTrekById } from "../api/trekApi";
import TrekIntroCard from "../components/track/TrekIntroCard";
import TrekInfoCard from "../components/track/TrekInfoCard";
import TrekPageWithFees from "../components/track/TrekDescription";
import AddSiderForm from "../components/track/AddSiderForm";
import TrackReview from "../components/track/TrekReview";
import TrekGallery from "../components/track/TrekGallery";
import BookNowModal from "../components/modals/BookNowModal";

const TrekDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trek, setTrek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Overview");

    const overviewRef = useRef(null);
    const feesRef = useRef(null);
    const reviewsRef = useRef(null);
    const photosRef = useRef(null);

    const tabs = useMemo(() => [
        { id: "Overview", label: "Overview", ref: overviewRef, icon: Layers, accent: "sky-500", ring: "ring-sky-400" },
        { id: "Fees", label: "Fees & Inclusions", ref: feesRef, icon: Activity, accent: "emerald-500", ring: "ring-emerald-400" },
        // { id: "Reviews", label: "Reviews", ref: reviewsRef, icon: Star, accent: "amber-500", ring: "ring-amber-400" },
        { id: "Photos", label: "Gallery", ref: photosRef, icon: Camera, accent: "purple-500", ring: "ring-purple-400" },
    ], []);

    useEffect(() => {
        const get = async () => {
            try {
                setLoading(true);
                const res = await fetchTrekById(id);
                if (res.success) { setTrek(res.data); window.scrollTo(0, 0); }
                else setError(res.message || "Not found");
            } catch { setError("Error fetching trek."); }
            finally { setLoading(false); }
        };
        get();
    }, [id]);

    useEffect(() => {
        const onScroll = () => {
            const pos = window.scrollY + 160;
            let found = "Overview";
            for (let i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i].ref.current && tabs[i].ref.current.offsetTop <= pos) { found = tabs[i].id; break; }
            }
            setActiveTab(found);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [tabs, trek]);

    const scrollToTab = (tabId) => {
        setActiveTab(tabId);
        const ref = tabs.find(t => t.id === tabId)?.ref.current;
        if (ref) window.scrollTo({ top: ref.getBoundingClientRect().top + window.pageYOffset - 145, behavior: "smooth" });
    };

    // ─── Loading ─────────────────────────────────
    if (loading) return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center gap-6">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-sky-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <Mountain className="absolute inset-0 m-auto w-7 h-7 text-sky-400 animate-pulse" />
            </div>
            <p className="text-sky-500 text-sm font-semibold tracking-[0.2em] animate-pulse uppercase">Loading Expedition...</p>
        </div>
    );

    if (error || !trek) return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-sky-100 p-14 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-rose-400" />
                </div>
                <h2 className="text-2xl font-bold text-sky-900 mb-3">Trek Not Found</h2>
                <p className="text-sky-500/70 text-sm mb-10 leading-relaxed">{error}</p>
                <button onClick={() => navigate("/treks")}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl font-bold shadow-lg shadow-sky-200 hover:shadow-xl transition-all">
                    <ChevronLeft className="w-4 h-4" /> Back to Treks
                </button>
            </div>
        </div>
    );

    const diffMap = {
        easy: { label: "Easy", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-400", pct: 20, flame: 1 },
        moderate: { label: "Moderate", badge: "bg-amber-100 text-amber-700", bar: "bg-amber-400", pct: 45, flame: 2 },
        challenging: { label: "Challenging", badge: "bg-orange-100 text-orange-700", bar: "bg-orange-400", pct: 65, flame: 3 },
        difficult: { label: "Difficult", badge: "bg-red-100 text-red-700", bar: "bg-red-500", pct: 80, flame: 4 },
        extreme: { label: "Extreme", badge: "bg-purple-100 text-purple-700", bar: "bg-purple-500", pct: 95, flame: 5 },
    };
    const diff = diffMap[(trek.difficulty || "moderate").toLowerCase()] || diffMap.moderate;

    const heroImg = trek.image?.cdnUrl || trek.image
        || "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80";

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50">
            <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

            {/* ══ Navbar spacer ══ */}
            <div className="h-[72px] lg:h-[80px]" />

            {/* ══ Breadcrumb ══ */}
            <div className="max-w-7xl mx-auto px-6 py-4 z-10 relative">
                <nav className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                    <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link to="/treks" className="hover:text-sky-600 transition-colors">Treks</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-sky-700">{trek.title}</span>
                </nav>
            </div>

            {/* ══ TrekIntroCard (Removed sticky to allow tabs and sidebar space) ══ */}
            <div className="sticky top-15 z-10">
                <TrekIntroCard trek={trek} onBookNow={() => setIsBookModalOpen(true)} />
            </div>

            {/* ══ Image/Swiper Section ══ */}
            <div className="border-b border-sky-100">
                <AddSiderForm trek={trek} />
            </div>

            {/* ══ STICKY: Tab Navigation ══ */}
            <div className="sticky top-30 lg:top-56 z-40 bg-white/95 backdrop-blur-xl border-b border-sky-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-1 py-2.5 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button key={tab.id} onClick={() => scrollToTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider
                              whitespace-nowrap transition-all duration-300 flex-shrink-0
                    ${isActive
                                            ? `bg-${tab.accent} text-white shadow-md`
                                            : 'text-sky-500 hover:bg-sky-50 hover:text-sky-700'
                                        }`}>
                                    <Icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-6 py-14 space-y-24">

                {/* ╔═══════════════════════════════╗
            ║  SECTION 01 — OVERVIEW        ║
            ╚═══════════════════════════════╝ */}
                <section ref={overviewRef} id="overview" className="scroll-mt-[150px]">

                    {/* Section label */}
                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-sky-200">
                                <Layers className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-8 h-px bg-yellow-400"></span>
                                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em]">Section 01</p>
                                </div>
                                <h2 className="text-4xl font-black text-sky-950 tracking-tight">Expedition <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Overview</span></h2>
                            </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-sky-100 via-sky-50 to-transparent hidden md:block mb-4" />
                    </div>

                    {/* ── A: Hero Banner Card ── */}
                    <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-sky-200/50 group">
                        <img src={heroImg} alt={trek.title}
                            className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/60 to-transparent" />

                        {/* Content over image */}
                        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
                            <div className="max-w-xl">
                                <div className="flex flex-wrap gap-3 mb-5">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${diff.badge}`}>{diff.label}</span>
                                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                                        {trek.location}
                                    </span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">{trek.title}</h3>
                                {trek.description && (
                                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 max-w-lg">{trek.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Stats overlay on right */}
                        <div className="absolute right-10 top-10 hidden lg:flex flex-col gap-3">
                            {[
                                { label: "Rating", val: trek.rating || "4.9", icon: Star, color: "text-amber-400" },
                                { label: "Duration", val: trek.duration, icon: Clock, color: "text-sky-400" },
                                { label: "Altitude", val: trek.altitude || "N/A", icon: Mountain, color: "text-emerald-400" },
                            ].map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5">
                                        <Icon className={`w-4 h-4 ${s.color} flex-shrink-0`} />
                                        <div>
                                            <div className="text-[9px] text-white/40 uppercase tracking-wider">{s.label}</div>
                                            <div className="text-white text-xs font-bold">{s.val}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── B: Innovative Info Panels ── */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Difficulty gauge */}
                        <div className="relative overflow-hidden bg-white rounded-3xl border border-sky-100/50 shadow-xl shadow-sky-900/[0.03] p-8 group hover:-translate-y-2 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none group-hover:bg-yellow-50 transition-colors"></div>
                            <div className="relative flex items-center justify-between mb-8">
                                <div className="text-[11px] font-black text-sky-400 uppercase tracking-widest">Trek Intensity</div>
                                <div className="flex gap-1.5 p-1.5 bg-sky-50 rounded-full">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <Flame key={n} className={`w-3.5 h-3.5 ${n <= diff.flame ? 'text-orange-500 fill-orange-500' : 'text-sky-200'} transition-all duration-500 group-hover:scale-110`} />
                                    ))}
                                </div>
                            </div>
                            <div className={`text-3xl font-black mb-6 tracking-tight ${diff.badge.split(' ')[1]}`}>{trek.difficulty}</div>
                            <div className="relative w-full h-3 bg-sky-50 rounded-full overflow-hidden p-0.5">
                                <div className={`h-full ${diff.bar} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${diff.pct}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] text-sky-300 mt-3 font-bold uppercase tracking-widest">
                                <span>Novice</span><span>Master</span>
                            </div>
                        </div>

                        {/* Best for - Dynamic Card */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 to-blue-800 rounded-3xl p-8 text-white group hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-400/30 transition-all duration-500">
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="relative text-[11px] font-black text-sky-300 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                                Ideal Voyager
                            </div>
                            <p className="relative text-white font-medium text-lg leading-relaxed mb-8 drop-shadow-md">
                                {trek.bestFor || "Crafted for those who chase horizons and seek stories carved in mountain stone."}
                            </p>
                            <div className="relative flex flex-wrap gap-2">
                                {["Alpine", "Wilderness", "Heritage"].map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-xl bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Season window - Modern Wheel style placeholder */}
                        <div className="relative overflow-hidden bg-white rounded-3xl border border-sky-100/50 shadow-xl shadow-sky-900/[0.03] p-8 group hover:-translate-y-2 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none group-hover:bg-sky-50 transition-colors"></div>
                            <div className="relative text-[11px] font-black text-sky-400 uppercase tracking-widest mb-8">Seasonal Window</div>
                            <div className="relative flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shadow-lg shadow-amber-100/50 group-hover:rotate-12 transition-transform duration-500">
                                    <Calendar className="w-7 h-7 text-amber-500" />
                                </div>
                                <div>
                                    <div className="font-black text-2xl text-sky-950 tracking-tight">{trek.season || "Open Trails"}</div>
                                    <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Prime Expedition Month</div>
                                </div>
                            </div>
                            <div className="relative grid grid-cols-12 gap-1 mt-6">
                                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1.5">
                                        <div className={`w-full h-8 rounded-lg transition-all duration-500
                                          ${i >= 2 && i <= 4 ? 'bg-emerald-500 shadow-lg shadow-emerald-200 scale-y-110' :
                                                i >= 9 && i <= 10 ? 'bg-emerald-500 shadow-lg shadow-emerald-200 scale-y-110' :
                                                    'bg-sky-50'}`}>
                                        </div>
                                        <span className={`text-[9px] font-black ${i >= 2 && i <= 4 || i >= 9 && i <= 10 ? 'text-emerald-600' : 'text-sky-300'}`}>{m}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── C: Description + Full Highlights ── */}
                    {trek.description && (
                        <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 overflow-hidden mb-8">
                            {/* Top accent */}
                            <div className="h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400" />
                            <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-sky-100">
                                {/* Description text */}
                                <div className="md:col-span-3 p-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Info className="w-5 h-5 text-sky-500" />
                                        <h3 className="font-bold text-sky-900 text-base">About This Trek</h3>
                                    </div>
                                    {/* Pull quote decoration */}
                                    <div className="relative pl-6 border-l-4 border-sky-300 mb-6">
                                        <p className="text-sky-700/80 leading-relaxed text-[15px] italic">
                                            "{trek.description.substring(0, 140)}..."
                                        </p>
                                    </div>
                                    <p className="text-sky-600/60 leading-relaxed text-sm">{trek.description.substring(140)}</p>
                                </div>

                                {/* Checklist */}
                                <div className="md:col-span-2 p-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <BadgeCheck className="w-5 h-5 text-emerald-500" />
                                        <h3 className="font-bold text-sky-900 text-base">Trek Highlights</h3>
                                    </div>
                                    <ul className="space-y-3.5">
                                        {[
                                            "Breathtaking Himalayan vistas",
                                            "Certified expert guides",
                                            "Tested safe routes",
                                            "Eco-friendly campsites",
                                            "Rich local culture",
                                            "Emergency support 24/7",
                                        ].map((h, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-sky-700 group">
                                                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                                    <CheckCircle className="w-3 h-3 text-sky-500 group-hover:text-white transition-colors" />
                                                </div>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── D: Trek Info Card Grid ── */}
                    <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <BarChart2 className="w-5 h-5 text-sky-500" />
                            <h3 className="font-bold text-sky-900 text-base">Expedition Parameters</h3>
                        </div>
                        <TrekInfoCard trek={trek} />
                    </div>

                </section>

                {/* ╔═══════════════════════════════╗
            ║  SECTION 02 — FEES            ║
            ╚═══════════════════════════════╝ */}
                <section ref={feesRef} id="fees" className="scroll-mt-[150px]">

                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-200">
                                <Activity className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-8 h-px bg-yellow-400"></span>
                                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em]">Section 02</p>
                                </div>
                                <h2 className="text-4xl font-black text-sky-950 tracking-tight">Finances & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Inclusions</span></h2>
                            </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-emerald-100 via-emerald-50 to-transparent hidden md:block mb-4" />
                    </div>

                    {/* Pricing highlight banner */}
                    <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-px shadow-xl shadow-emerald-200/50">
                        <div className="bg-white rounded-[calc(1.5rem-1px)] px-10 py-8">
                            <div className="grid md:grid-cols-4 gap-8">
                                {[
                                    { label: "Base Price", val: `₹${trek.price?.toLocaleString() || "N/A"}`, sub: "per person", icon: TrendingUp, color: "text-sky-600" },
                                    { label: "Group Discount", val: "Up to 15%", sub: "for 8+ people", icon: Users, color: "text-emerald-600" },
                                    { label: "Early Bird", val: "10% OFF", sub: "book 30 days early", icon: Zap, color: "text-amber-600" },
                                    { label: "Cancellation", val: "Free", sub: "up to 7 days before", icon: Shield, color: "text-rose-500" },
                                ].map((p, i) => {
                                    const Icon = p.icon;
                                    return (
                                        <div key={i} className="text-center">
                                            <Icon className={`w-6 h-6 ${p.color} mx-auto mb-3`} />
                                            <div className="text-xl font-bold text-sky-900">{p.val}</div>
                                            <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider mt-0.5">{p.label}</div>
                                            <div className="text-xs text-sky-500/60 mt-0.5">{p.sub}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main fees content */}
                    <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
                        <div className="p-8 md:p-12">
                            <TrekPageWithFees trek={trek} />
                        </div>
                    </div>

                    {/* Trust badges row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {[
                            { icon: Shield, label: "Safety First", desc: "Expert-led, medically backed", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
                            { icon: BadgeCheck, label: "Certified Guides", desc: "WAFA & wilderness certified", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                            { icon: Leaf, label: "Eco Responsible", desc: "Leave-no-trace protocols", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
                            { icon: Globe, label: "Global Standards", desc: "International safety norms", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
                        ].map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <div key={i} className={`bg-white rounded-2xl border ${b.border} shadow-sm p-5 text-center group
                  hover:-translate-y-1 hover:shadow-md transition-all duration-300`}>
                                    <div className={`w-10 h-10 rounded-xl ${b.bg} border ${b.border} flex items-center justify-center mx-auto mb-3
                    group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-5 h-5 ${b.color}`} />
                                    </div>
                                    <div className="text-xs font-bold text-sky-900 mb-1">{b.label}</div>
                                    <div className="text-[11px] text-sky-400">{b.desc}</div>
                                </div>
                            );
                        })}
                    </div>

                </section>

                {/* ╔═══════════════════════════════╗
            ║  SECTION 03 — REVIEWS         ║
            ╚═══════════════════════════════╝ */}
                {/* <section ref={reviewsRef} id="reviews" className="scroll-mt-[130px]">

                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-200">
                                <Star className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-8 h-px bg-sky-400"></span>
                                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em]">Section 03</p>
                                </div>
                                <h2 className="text-4xl font-black text-sky-950 tracking-tight">Voyager <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Reviews</span></h2>
                            </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-amber-100 via-amber-50 to-transparent hidden md:block mb-4" />
                    </div>

                    {/* Rating Summary Card */}
                {/* <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 overflow-hidden mb-8">
                    <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-sky-100">
                        {/* Big rating */}
                {/* <div className="p-10 text-center flex flex-col items-center justify-center">
                            <div className="text-7xl font-bold text-sky-900 leading-none mb-3">{trek.rating || "4.9"}</div>
                            <div className="flex gap-1 justify-center mb-2">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                            </div>
                            <div className="text-xs text-sky-400 font-semibold">Based on 124 reviews</div>
                        </div> */}

                {/* Bar chart breakdown */}
                {/* <div className="lg:col-span-2 p-10">
                            <div className="text-[10px] text-sky-400 font-black uppercase tracking-widest mb-5">Rating Breakdown</div>
                            <div className="space-y-3">
                                {[
                                    { stars: 5, count: 89, pct: 72 },
                                    { stars: 4, count: 23, pct: 19 },
                                    { stars: 3, count: 8, pct: 6 },
                                    { stars: 2, count: 3, pct: 2 },
                                    { stars: 1, count: 1, pct: 1 },
                                ].map((r) => (
                                    <div key={r.stars} className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 w-14 flex-shrink-0">
                                            {[...Array(r.stars)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                                        </div>
                                        <div className="flex-1 h-2 bg-sky-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                                                style={{ width: `${r.pct}%`, animation: 'widen 1s ease-out 0.2s both' }} />
                                        </div>
                                        <span className="text-xs text-sky-500 font-semibold w-8 text-right">{r.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                {/* Attribute scores */}
                {/* <div className="p-10">
                            <div className="text-[10px] text-sky-400 font-black uppercase tracking-widest mb-5">Key Metrics</div>
                            <div className="space-y-4">
                                {[
                                    { label: "Guide Quality", score: 4.9 },
                                    { label: "Safety", score: 5.0 },
                                    { label: "Value", score: 4.7 },
                                    { label: "Experience", score: 4.8 },
                                ].map((m) => (
                                    <div key={m.label}>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="text-xs text-sky-700 font-semibold">{m.label}</span>
                                            <span className="text-xs font-bold text-amber-600">{m.score}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-sky-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-300 rounded-full"
                                                style={{ width: `${(m.score / 5) * 100}%`, animation: 'widen 1s ease-out 0.3s both' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Actual reviews */}
                {/* <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 p-8 md:p-10">
                    <TrackReview />
                </div>

            </section> */}

                {/* ╔═══════════════════════════════╗
            ║  SECTION 04 — GALLERY         ║
            ║  (UNTOUCHED)                  ║
            ╚═══════════════════════════════╝ */}
                <section ref={photosRef} id="photos" className="scroll-mt-[150px]">

                    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-14">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-200">
                                <Camera className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-8 h-px bg-sky-400"></span>
                                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em]">Section 04</p>
                                </div>
                                <h2 className="text-4xl font-black text-sky-950 tracking-tight">Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">Chronicle</span></h2>
                            </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-violet-100 via-violet-50 to-transparent hidden md:block mb-4" />
                    </div>

                    {/* Gallery — completely untouched */}
                    <TrekGallery trek={trek} />

                </section>

            </div >

            {/* ══ Bottom Book Strip ══ */}
            <div className="bg-gradient-to-r from-sky-200 via-blue-200 to-blue-300 py-14">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Ready for This Adventure?</h2>
                    <p className="text-sky-900/70 mb-10 text-sm">Spots fill up fast. Secure your place on {trek.title} today.</p>
                    <button onClick={() => setIsBookModalOpen(true)}
                        className="inline-flex items-center gap-3 px-12 py-5 bg-white text-sky-700 rounded-2xl font-bold
                       hover:bg-sky-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group text-sm uppercase tracking-wider">
                        <Sparkles className="w-5 h-5 text-sky-500" />
                        Book Your Spot Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes widen {
          from { width: 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default TrekDetailPage;
