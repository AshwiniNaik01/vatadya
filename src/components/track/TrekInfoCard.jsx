import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

// Lottie assets
import mountainData from "../../lotties/mountain.json";
import tentData from "../../lotties/tent.json";
import clockData from "../../lotties/clock.json";
import barChartData from "../../lotties/barChart.json";
import mapPinData from "../../lotties/mappin.json";
import timerData from "../../lotties/timer.json";
import shoppingCartData from "../../lotties/shoppingCart.json";
import backPackData from "../../lotties/backPack.json";
import hikingData from "../../lotties/hiking.json";

const TrekInfoCard = ({ trek }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!trek) return null;

  // Asset mapping with unique colors
  const assetMap = {
    "TREK DIFFICULTY": {
      lottie: barChartData,
      color: "#3B82F6",
      accent: "text-blue-600",
      tag: "Complexity",
      bg: "bg-blue-50",
    },
    "TREK DURATION": {
      lottie: clockData,
      color: "#F59E0B",
      accent: "text-orange-600",
      tag: "Duration",
      bg: "bg-orange-50",
    },
    "HIGHEST ALTITUDE": {
      lottie: mountainData,
      color: "#10B981",
      accent: "text-emerald-600",
      tag: "Altitude",
      bg: "bg-emerald-50",
    },
    BASECAMP: {
      lottie: mapPinData,
      color: "#EF4444",
      accent: "text-red-600",
      tag: "Start Point",
      bg: "bg-red-50",
    },
    "GEAR RENTAL": {
      lottie: shoppingCartData,
      color: "#14B8A6",
      accent: "text-teal-600",
      tag: "Equipment",
      bg: "bg-teal-50",
    },
    "FITNESS CRITERIA": {
      lottie: backPackData,
      color: "#6366F1",
      accent: "text-indigo-600",
      tag: "Fitness",
      bg: "bg-indigo-50",
    },
    "TREK TYPE": {
      lottie: timerData,
      color: "#A855F7",
      accent: "text-purple-600",
      tag: "Category",
      bg: "bg-purple-50",
    },
    "REMAINING SEATS": {
      lottie: hikingData,
      color: "#2563EB",
      accent: "text-blue-700",
      tag: "Availability",
      bg: "bg-blue-50",
    },
  };

  const defaultAsset = {
    lottie: timerData,
    color: "#6B7280",
    accent: "text-gray-600",
    tag: "Info",
    bg: "bg-gray-50",
  };

  const excludeTitles = ["PICKUP", "DROPOFF", "ACCOMMODATION", "SUITABLE FOR"];

  const infoGrid = (trek?.trekInfo || [])
    .filter((item) => {
      const isSingleValue = item.value && item.value.trim() !== "";
      const isNotExcluded = !excludeTitles.includes(
        item.title ? item.title.toUpperCase() : "",
      );
      return isSingleValue && isNotExcluded;
    })
    .map((item) => {
      const assets =
        assetMap[item.title?.toUpperCase()] ||
        assetMap[item.title] ||
        defaultAsset;
      return {
        title: item.title,
        value: item.value,
        lottie: assets.lottie,
        color: assets.color,
        accent: assets.accent,
        tag: assets.tag,
        bg: assets.bg,
      };
    });

  if (trek?.isLimitedSeats) {
    const assets = assetMap["REMAINING SEATS"];
    infoGrid.push({
      title: "REMAINING SEATS",
      value: `${trek.totalSeats - trek.registrationCompleted} / ${trek.totalSeats} Seats Left`,
      lottie: assets.lottie,
      color: assets.color,
      accent: assets.accent,
      tag: assets.tag,
      bg: assets.bg,
    });
  }

  return (
    <section className="w-full py-2">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        {/* <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">
            Essential Information
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trek <span className="text-blue-600">Specifications</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Everything you need to know before embarking on this adventure
          </p>
        </div> */}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 ">
          {infoGrid.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl overflow-visible transition-all duration-500
                          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Container with visible overflow */}
              {/* <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-visible"> */}

              <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-visible border-3 border-blue-800 group-hover:border-transparent">
                {/* 🔥 Gradient Top Cap (uses empty space beautifully) */}
                {/* <div 
    className="absolute -top-1 left-6 right-6 h-2 rounded-full opacity-90 group-hover:opacity-100 transition-all duration-500"
    style={{
      background: `linear-gradient(90deg, ${item.color}, ${item.color}80, transparent)`
    }}
  /> */}

                {/* 🌈 Animated Border Glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  style={{
                    padding: "1px",
                    background: `linear-gradient(135deg, ${item.color}, transparent, ${item.color})`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="w-full h-full bg-white rounded-2xl" />
                </div>

                {/* Lottie Animation - Top Right Corner Fully Visible */}
                <div
                  className="absolute -top-10 -right-12 w-26 h-26 z-20 transition-all duration-500 group-hover:scale-110 group-hover:-translate-x-1 group-hover:translate-y-1"
                  style={{
                    filter:
                      hoveredIndex === index
                        ? "drop-shadow(0 25px 20px rgba(0,0,0,0.2)) drop-shadow(0 8px 10px rgba(0,0,0,0.15))"
                        : "drop-shadow(0 12px 10px rgba(0,0,0,0.1))",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Background Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
                      filter: "blur(12px)",
                      transform: "scale(1.2)",
                    }}
                  />

                  {/* 3D Shadow Effect */}
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 shadow-2xl transition-opacity duration-500"
                    style={{ filter: "blur(20px)" }}
                  />

                  {/* Lottie Player Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg shadow-blue-500/20 transform transition-all duration-500 group-hover:scale-110">
                    <Player
                      autoplay
                      loop
                      src={item.lottie}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>

                  {/* Additional Glow Ring */}
                  {/* <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                       style={{ 
                         boxShadow: `0 0 30px ${item.color}, 0 0 60px ${item.color}40`,
                         borderRadius: '50%'
                       }} /> */}
                </div>

                {/* Card Content - Adjusted padding to accommodate Lottie */}
                <div className="relative p-6 pt-4 z-10 bg-linear-to-b from-blue-100 to-purple-100 rounded-xl">
                  {/* Title & Value Section */}
                  <div className="text-left">
                    <span
                      className={`text-xs font-semibold ${item.accent} uppercase tracking-wider`}
                    >
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 leading-tight">
                      {item.title}
                    </h3>

                    {/* Value Display */}
                    <div
                      className={`inline-flex items-center px-4 py-2 ${item.bg} rounded-xl`}
                    >
                      <span className={`text-sm font-bold ${item.accent}`}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-400 transition-all duration-500" />

                {/* Subtle Hover Shadow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 40px ${item.color}30` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekInfoCard;
