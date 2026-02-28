import React, { useEffect, useState } from "react";
import {
  Terminal,
  Zap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Timer
} from "lucide-react";
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
import airplaneData from "../../lotties/airplane.json";

const TrekInfoCard = ({ trek }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!trek) return null;

  const infoGrid = [
    {
      title: "Complexity",
      value: trek.difficulty || "MODERATE",
      lottie: barChartData,
      color: "from-sky-500 to-blue-600",
      bg: "bg-sky-50/50",
      accent: "text-sky-600",
      tag: "Terrain_Profile"
    },
    {
      title: "Duration",
      value: trek.duration || "6 DAYS",
      lottie: clockData,
      color: "from-amber-400 to-orange-500",
      bg: "bg-amber-50/50",
      accent: "text-orange-600",
      tag: "Mission_Tenure"
    },
    {
      title: "Altitude",
      value: trek.altitude || "N/A",
      lottie: mountainData,
      color: "from-emerald-400 to-teal-500",
      bg: "bg-emerald-50/50",
      accent: "text-emerald-600",
      tag: "Apex_Elevation"
    },
    {
      title: "Base Camp",
      value: (trek.location?.split(',')[0] || "ZENITH").toUpperCase(),
      lottie: mapPinData,
      color: "from-rose-400 to-red-500",
      bg: "bg-rose-50/50",
      accent: "text-rose-600",
      tag: "Start_Node"
    },
    {
      title: "Deployment",
      value: trek.startDate ? new Date(trek.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }).toUpperCase() : "TBA",
      lottie: timerData,
      color: "from-indigo-400 to-violet-500",
      bg: "bg-indigo-50/50",
      accent: "text-indigo-600",
      tag: "Launch_Window"
    },
    {
      title: "Lodging",
      value: "ALPINE TENTS",
      lottie: tentData,
      color: "from-teal-400 to-emerald-500",
      bg: "bg-teal-50/50",
      accent: "text-teal-600",
      tag: "Field_Shelter"
    },
    {
      title: "Gear Staging",
      value: "ON_SITE",
      lottie: shoppingCartData,
      color: "from-pink-400 to-rose-500",
      bg: "bg-pink-50/50",
      accent: "text-pink-600",
      tag: "Pro_Equipment"
    },
    {
      title: "Transport",
      value: "SECTOR_SYNC",
      lottie: airplaneData,
      color: "from-cyan-400 to-blue-500",
      bg: "bg-cyan-50/50",
      accent: "text-cyan-600",
      tag: "Rapid_Transit"
    },
    {
      title: "Pro Pack",
      value: "READY_STATE",
      lottie: backPackData,
      color: "from-yellow-400 to-amber-600",
      bg: "bg-yellow-50/50",
      accent: "text-amber-700",
      tag: "Survival_Kit"
    },
    {
      title: "Squad Max",
      value: trek.groupSize || "15 UNITS",
      lottie: timerData,
      color: "from-orange-400 to-amber-500",
      bg: "bg-orange-50/50",
      accent: "text-orange-600",
      tag: "Unit_Capacity"
    }
  ];

  return (
    <section className="w-full bg-transparent">
      {/* Visual background elements */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {infoGrid.map((item, index) => (
          <div
            key={index}
            className={`group relative p-8 rounded-[2.5rem] bg-white border border-sky-100/60 shadow-xl 
                        hover:shadow-2xl hover:shadow-sky-200/40 transition-all duration-700 hover:-translate-y-2
                        flex flex-col items-center justify-center text-center cursor-default overflow-hidden
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            {/* Glossy Backdrop */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${item.color} opacity-[0.04] group-hover:opacity-[0.12] rounded-full blur-3xl transition-all duration-700 group-hover:scale-150`} />

            {/* Lottie Container */}
            <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-full scale-50 group-hover:scale-110 transition-all duration-700`} />
              <div className="relative z-10 w-24 h-24 transform group-hover:scale-110 transition-transform duration-500 grayscale-[0.5] group-hover:grayscale-0">
                <Player
                  autoplay
                  loop
                  src={item.lottie}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
            </div>

            {/* Labels */}
            <div className="relative z-10 w-full">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${item.color}`} />
                  <span className="text-[10px] font-black text-sky-400/80 uppercase tracking-[0.3em]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-black text-sky-950 uppercase tracking-tighter mb-4 group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>

                {/* Technical Value Display */}
                <div className="relative inline-flex items-center px-6 py-2 bg-sky-50/80 backdrop-blur-md rounded-2xl border border-sky-100/50 w-full justify-center overflow-hidden group/val">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover/val:opacity-10 transition-opacity`} />
                  <span className={`text-[11px] font-black tracking-widest ${item.accent} truncate`}>
                    {item.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-5 left-5 opacity-20 flex gap-1 items-center">
              <div className="w-3 h-3 border-t-2 border-l-2 border-sky-200" />
            </div>
            <div className="absolute bottom-5 right-5 opacity-20">
              <div className="w-3 h-3 border-b-2 border-r-2 border-sky-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrekInfoCard;
