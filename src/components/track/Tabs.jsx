import React, { useState } from "react";
import TrekInfoCard from "./TrekInfoCard";
import TrekPageWithFees from "./TrekDescription";
import TrackReview from "./TrackReview";
import TrekGallery from "./TrekGallery";

const tabs = ["Overview", "Fees", "Photos"];
// "Reviews",

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabComponents = {
    Overview: <TrekInfoCard />,
    Fees: <TrekPageWithFees />,
    Reviews: <TrackReview />,
    Photos: <TrekGallery />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* TAB HEADER */}
      <div className="flex overflow-x-auto gap-8 border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-4 text-sm font-semibold whitespace-nowrap transition ${
              activeTab === tab
                ? "text-emerald-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute left-0 -bottom-[1px] h-[3px] w-full bg-emerald-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="py-10">{tabComponents[activeTab]}</div>
    </div>
  );
};

export default Tabs;
