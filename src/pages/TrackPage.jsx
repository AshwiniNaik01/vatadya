// // import React from "react";
// // import TrekIntroCard from "../components/track/TrekIntroCard";
// // import TrekInfoCard from "../components/track/TrekInfoCard";
// // import TrekPageWithFees from "../components/track/TrekDescription";
// // import AddSiderForm from "../components/track/AddSiderForm";
// // import TrackReview from "../components/track/TrackReview";
// // import TrekGallery from "../components/track/TrekGallery";
// // import Tabs from "../components/track/Tabs";
// // const TrackPage = () => {
// //   return (
// //     <div className="bg-gray-50 min-h-screen overflow-visible">
// //       {/* INTRO – ALWAYS STICKY */}
// //       <div className="sticky top-0 z-50 bg-white">
// //         <TrekIntroCard />
// //       </div>

// //       {/* SLIDER – NORMAL SCROLL */}
// //       <div className="relative">
// //         <AddSiderForm />
// //       </div>

// //       {/* TABS – STICKY */}
// //       <div className="sticky top-[96px] z-40 bg-white">
// //         <Tabs />
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrackPage;

// import React from "react";
// import TrekIntroCard from "../components/track/TrekIntroCard";
// import Tabs from "../components/track/Tabs";

// const TrackPage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Sticky Intro Header */}
//       <div className="sticky top-0 z-50 bg-white shadow-md">
//         <TrekIntroCard />
//       </div>

//       {/* Tabs + Content */}
//       <div className="sticky top-[96px] z-40 bg-white shadow-sm">
import React, { useState, useEffect, useRef } from "react";
import TrekIntroCard from "../components/track/TrekIntroCard";
import TrekInfoCard from "../components/track/TrekInfoCard";
import TrekPageWithFees from "../components/track/TrekDescription";
import AddSiderForm from "../components/track/AddSiderForm";
import TrackReview from "../components/track/TrackReview";
import TrekGallery from "../components/track/TrekGallery";
import BookNowModal from "../components/modals/BookNowModal";

const TrackPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Refs for each section
  const overviewRef = useRef(null);
  const feesRef = useRef(null);
  const reviewsRef = useRef(null);
  const photosRef = useRef(null);
  const tabsRef = useRef(null);

  // Memoize tabs to prevent unnecessary effect re-runs
  const tabs = React.useMemo(() => [
    { id: "Overview", label: "Overview", ref: overviewRef },
    { id: "Fees", label: "Fees", ref: feesRef },
    { id: "Reviews", label: "Reviews", ref: reviewsRef },
    { id: "Photos", label: "Photos", ref: photosRef },
  ], []);

  // Scroll spy & sticky tabs
  useEffect(() => {
    const handleScroll = () => {
      // Offset to trigger active state (header height + tabs height + visual padding)
      const offset = 180;
      const scrollPosition = window.scrollY + offset;

      // Check sections from bottom to top to find the first one that has been crossed
      let foundSection = "Overview";

      for (let i = tabs.length - 1; i >= 0; i--) {
        const tab = tabs[i];
        if (tab.ref.current && tab.ref.current.offsetTop <= scrollPosition) {
          foundSection = tab.id;
          break;
        }
      }

      setActiveTab(foundSection);

      // Handle sticky state
      if (tabsRef.current) {
        // This logic can be refined if you want to toggle the sticky spacer
        setIsTabsSticky(window.scrollY > 300); // Example threshold
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  // Smooth scroll on tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = tabs.find(t => t.id === tabId)?.ref.current;
    if (element) {
      // Offset needs to account for the fixed header (approx 144px) + sticky tabs height (approx 60px)
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

      {/* Spacer for Absolute Global Navbar */}
      <div className="h-[72px] lg:h-[80px]"></div>

      {/* Trek Header - Now sticks to the very top once navbar scrolls away */}
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <TrekIntroCard onBookNow={() => setIsBookModalOpen(true)} price="12,999" />
      </div>

      {/* Slider */}
      <section className="relative z-10">
        <AddSiderForm />
      </section>

      {/* Sticky Tabs */}
      {/* Sticky Tabs */}
      {/* <div
        ref={tabsRef}
        className="bg-white border-b border-gray-200 z-40 sticky top-52 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative py-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 bottom-0 h-1 w-full bg-red-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      <div
        ref={tabsRef}
        className="bg-white border-b border-gray-200 z-40 sticky top-[50px] lg:top-[220px] transition-all duration-300 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-6 py-2 text-base font-semibold whitespace-nowrap transition-all duration-300 rounded-lg
            ${activeTab === tab.id
                    ? "bg-emerald-50 text-emerald-600 shadow-md"
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



      {/* Spacer for sticky tabs */}
      {isTabsSticky && <div className="h-4"></div>}

      {/* Sections */}
      <main className="max-w-8xl mx-auto px-15 py-2">
        <section ref={overviewRef} id="overview-section" className="scroll-mt-36">
          <TrekInfoCard />
        </section>

        <section ref={feesRef} id="fees-section" className="scroll-mt-36 mt-12">
          <TrekPageWithFees />
        </section>

        <section ref={reviewsRef} id="reviews-section" className="scroll-mt-36 mt-12">
          <TrackReview />
        </section>

        <section ref={photosRef} id="photos-section" className="scroll-mt-36 mt-12">
          <TrekGallery />
        </section>
      </main>

    </div>
  );
};

export default TrackPage;
