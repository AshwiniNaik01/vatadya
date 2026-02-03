import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, XCircle } from "lucide-react";
import { fetchTrekById } from "../components/hero/trekApi";
import TrekIntroCard from "../components/track/TrekIntroCard";
import TrekInfoCard from "../components/track/TrekInfoCard";
import TrekPageWithFees from "../components/track/TrekDescription";
import AddSiderForm from "../components/track/AddSiderForm";
import TrackReview from "../components/track/TrackReview";
import TrekGallery from "../components/track/TrekGallery";
import BookNowModal from "../components/modals/BookNowModal";

const TrekDetailPage = () => {
    const { id } = useParams();
    const [trek, setTrek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Overview");

    // Refs for each section
    const overviewRef = useRef(null);
    const feesRef = useRef(null);
    const reviewsRef = useRef(null);
    const photosRef = useRef(null);
    const tabsRef = useRef(null);

    const tabs = useMemo(() => [
        { id: "Overview", label: "Overview", ref: overviewRef },
        { id: "Fees", label: "Fees", ref: feesRef },
        { id: "Reviews", label: "Reviews", ref: reviewsRef },
        { id: "Photos", label: "Photos", ref: photosRef },
    ], []);

    useEffect(() => {
        const getTrek = async () => {
            try {
                setLoading(true);
                const result = await fetchTrekById(id);
                if (result.success) {
                    setTrek(result.data);
                    window.scrollTo(0, 0);
                } else {
                    setError(result.message || "Trek not found");
                }
            } catch (err) {
                setError("An error occurred while fetching trek details.");
            } finally {
                setLoading(false);
            }
        };
        getTrek();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const offset = 350;
            const scrollPosition = window.scrollY + offset;

            let foundSection = "Overview";
            for (let i = tabs.length - 1; i >= 0; i--) {
                const tab = tabs[i];
                if (tab.ref.current && tab.ref.current.offsetTop <= scrollPosition) {
                    foundSection = tab.id;
                    break;
                }
            }
            setActiveTab(foundSection);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [tabs, trek]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        const element = tabs.find(t => t.id === tabId)?.ref.current;
        if (element) {
            const headerOffset = 350;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium italic">Loading your next adventure...</p>
                </div>
            </div>
        );
    }

    if (error || !trek) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center max-w-md">
                    <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Trek Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || "The trek you're looking for doesn't exist or has been removed."}</p>
                    <Link to="/treks" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
                        <ChevronLeft className="w-5 h-5" />
                        Back to Treks
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

            {/* Global Navbar Spacer */}
            <div className="h-[72px] lg:h-[80px]"></div>

            {/* Breadcrumb - Scrolls with page */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link to="/treks" className="hover:text-emerald-600 transition-colors">Treks</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-emerald-600">{trek.title}</span>
                </nav>
            </div>

            {/* Trek Header - Sticky */}
            <div className="sticky top-[0px] lg:top-[0px] z-40 bg-white shadow-sm">
                <TrekIntroCard
                    trek={trek}
                    onBookNow={() => setIsBookModalOpen(true)}
                />
            </div>

            {/* Visual Slider */}
            <section className="relative z-10">
                <AddSiderForm trek={trek} />
            </section>

            {/* Dynamic Sticky Tabs */}
            <div
                ref={tabsRef}
                className="bg-white border-b border-gray-200 z-99 sticky top-[190px] lg:top-[210px] transition-all duration-300 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-6 overflow-x-auto scrollbar-hide py-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`relative px-6 py-2 text-base font-semibold whitespace-nowrap transition-all duration-300 rounded-lg
                                ${activeTab === tab.id
                                        ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                        : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-1 w-10 bg-emerald-600 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Sections */}
            <main className="max-w-8xl mx-auto px-6 md:px-15 py-8">
                <section ref={overviewRef} id="overview" className="scroll-mt-[350px]">
                    <TrekInfoCard trek={trek} />
                </section>

                <section ref={feesRef} id="fees" className="scroll-mt-[350px] mt-20">
                    <TrekPageWithFees trek={trek} />
                </section>

                <section ref={reviewsRef} id="reviews" className="scroll-mt-[350px] mt-20">
                    <TrackReview />
                </section>

                <section ref={photosRef} id="photos" className="scroll-mt-[350px] mt-20">
                    <TrekGallery trek={trek} />
                </section>
            </main>
        </div>
    );
};

export default TrekDetailPage;
