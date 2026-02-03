import React, { useEffect, useState } from "react";
import {
  BarChart2,
  Clock,
  Mountain,
  Users,
  MapPin,
  Tent,
  HeartPulse,
  Timer,
  ShoppingBag,
  Backpack,
  Package,
  Sparkles,
  Info
} from "lucide-react";

import { Player } from "@lottiefiles/react-lottie-player";
import mountainData from "../../lotties/mountain.json";
import tentData from "../../lotties/tent.json";
import clockData from "../../lotties/clock.json";
import barChartData from "../../lotties/barChart.json";
import mapPinData from "../../lotties/mappin.json";
import timerData from "../../lotties/timer.json";
import shoppingCartData from "../../lotties/shoppingCart.json";
import backPackData from "../../lotties/backPack.json";
import airplaneData from "../../lotties/airplane.json";
// import { Player } from "@lottiefiles/react-lottie-player";
// import mountainData from "../../lotties/mountain.json";

const trekInfo = [
  {
    title: "TREK DIFFICULTY",
    value: "Easy – Moderate",
    icon: <BarChart2 size={24} />,
    lottie: barChartData,
    color: "bg-amber-100 text-amber-600",
    group: "Essentials"
  },
  {
    title: "TREK DURATION",
    value: "6 Days / 22 km",
    icon: <Clock size={24} />,
    lottie: clockData,
    color: "bg-blue-100 text-blue-600",
    group: "Essentials"
  },
  {
    title: "HIGHEST ALTITUDE",
    value: "12,250 ft",
    icon: <Mountain size={24} />,
    lottie: mountainData,
    color: "bg-emerald-100 text-emerald-600",
    group: "Essentials"
  },
  {
    title: "SUITABLE FOR",
    value: "8 Years & Above",
    icon: <Users size={24} />,
    color: "bg-indigo-100 text-indigo-600",
    group: "Essentials"
  },
  {
    title: "BASECAMP",
    value: "Lohajung, Uttarakhand",
    icon: <MapPin size={24} />,
    lottie: mapPinData,
    color: "bg-rose-100 text-rose-600",
    group: "Logistics"
  },
  {
    title: "ACCOMMODATION",
    value: "Tents",
    icon: <Tent size={24} />,
    lottie: tentData,
    color: "bg-teal-100 text-teal-600",
    group: "Logistics"
  },
  {
    title: "FITNESS CRITERIA",
    value: "5 km in 38 mins",
    icon: <HeartPulse size={24} />,
    color: "bg-red-100 text-red-600",
    group: "Logistics"
  },
  {
    title: "PICKUP",
    value: "Rishikesh – 5:30 AM",
    icon: <Timer size={24} />,
    lottie: airplaneData,
    color: "bg-cyan-100 text-cyan-600",
    group: "Logistics"
  },
  {
    title: "DROPOFF",
    value: "Rishikesh – 7:00 PM",
    icon: <Timer size={24} />,
    lottie: timerData,
    color: "bg-sky-100 text-sky-600",
    group: "Logistics"
  },
  {
    title: "GEAR RENTAL",
    value: "Available",
    icon: <ShoppingBag size={24} />,
    lottie: shoppingCartData,
    color: "bg-orange-100 text-orange-600",
    group: "Services"
  },
  {
    title: "CLOAKROOM",
    value: "Available",
    icon: <Backpack size={24} />,
    lottie: backPackData,
    color: "bg-purple-100 text-purple-600",
    group: "Services"
  },
  {
    title: "OFFLOADING",
    value: "Available",
    icon: <Package size={24} />,
    color: "bg-gray-100 text-gray-600",
    group: "Services"
  },
];


const TrekInfoCard = ({ trek }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!trek) return null;

  const dynamicInfo = [
    {
      title: "TREK DIFFICULTY",
      value: trek.difficulty || "Easy – Moderate",
      icon: <BarChart2 size={24} />,
      lottie: barChartData,
      color: "bg-amber-100 text-amber-600",
      group: "Essentials"
    },
    {
      title: "TREK DURATION",
      value: trek.duration || "6 Days",
      icon: <Clock size={24} />,
      lottie: clockData,
      color: "bg-blue-100 text-blue-600",
      group: "Essentials"
    },
    {
      title: "HIGHEST ALTITUDE",
      value: trek.altitude || "N/A",
      icon: <Mountain size={24} />,
      lottie: mountainData,
      color: "bg-emerald-100 text-emerald-600",
      group: "Essentials"
    },
    {
      title: "SUITABLE FOR",
      value: trek.govtEligibility || "8 Years & Above",
      icon: <Users size={24} />,
      color: "bg-indigo-100 text-indigo-600",
      group: "Essentials"
    },
    {
      title: "PRICE",
      value: `₹${trek.price?.toLocaleString()} onwards`,
      icon: <MapPin size={24} />,
      lottie: mapPinData,
      color: "bg-rose-100 text-rose-600",
      group: "Logistics"
    },
    {
      title: "ACCOMMODATION",
      value: trek.links?.inclusions?.toLowerCase().includes('camp') || trek.links?.inclusions?.toLowerCase().includes('tent') ? "Tents / Camps" : "Guest House / Tents",
      icon: <Tent size={24} />,
      lottie: tentData,
      color: "bg-teal-100 text-teal-600",
      group: "Logistics"
    },
    {
      title: "START DATE",
      value: trek.startDate ? new Date(trek.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : "Coming Soon",
      icon: <Timer size={24} />,
      lottie: airplaneData,
      color: "bg-cyan-100 text-cyan-600",
      group: "Logistics"
    },
    {
      title: "GROUP SIZE",
      value: trek.groupSize || "4-12 Climbers",
      icon: <Users size={24} />,
      color: "bg-sky-100 text-sky-600",
      group: "Logistics"
    },
    {
      title: "SEASON",
      value: trek.season || "N/A",
      icon: <Clock size={24} />,
      lottie: clockData,
      color: "bg-orange-100 text-orange-600",
      group: "Services"
    },
    {
      title: "GEAR RENTAL",
      value: "Available",
      icon: <ShoppingBag size={24} />,
      lottie: shoppingCartData,
      color: "bg-purple-100 text-purple-600",
      group: "Services"
    },
    {
      title: "STATUS",
      value: trek.status || "Ongoing",
      icon: <Package size={24} />,
      color: "bg-gray-100 text-gray-600",
      group: "Services"
    },
  ];

  return (
    <section className="w-full py-4 bg-[#f9fafb] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"></div>

      <div className="max-w-8xl mx-auto px-15 relative">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100 animate-fade-in">
            <Sparkles size={14} className="animate-pulse" />
            Quick Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Trek <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Quick Facts</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Essential information you need to know before embarking on your {trek.title} adventure.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 flex justify-center items-center">
          {dynamicInfo.map((item, index) => (
            <div
              key={index}
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
              className="group relative bg-white rounded-lg p-4 border-3 border-emerald-700 
             shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
             hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
             transition-all duration-500 hover:-translate-y-2 overflow-hidden 
             flex flex-col justify-center items-center gap-4
             h-52"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-50 to-transparent -mr-10 -mt-10 rounded-full transition-transform group-hover:scale-150 duration-700"></div>

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
                {item.lottie ? (
                  <Player
                    autoplay
                    loop
                    src={item.lottie}
                    style={{ height: '80px', width: '80px' }}
                  />
                ) : (
                  item.icon
                )}
              </div>

              <div className="space-y-1 relative z-10 text-center">
                <h3 className="text-xs font-bold text-gray-500 uppercase">
                  {item.title}
                </h3>
                <p className="text-sm font-black text-gray-900 leading-tight">
                  {item.value}
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-gray-100 group-hover:text-emerald-50 transition-colors duration-500">
                <Info size={40} strokeWidth={1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekInfoCard;

