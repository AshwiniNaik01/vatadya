import React, { useEffect, useRef, useState } from "react";
import {
  Terminal,
  Activity,
  Shield,
  Award,
  Map,
  Info,
  Compass,
  Zap,
  Target,
  Mountain,
  Star,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const AboutUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [missionData, setMissionData] = useState(null);
  const sectionRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch mission & vision data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/api/mission-vision");
        if (res.data.success) {
          setMissionData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching mission data:", err);
      }
    };
    fetchData();
  }, []);

  const stats = missionData
    ? [
        {
          label: "PEAKS CONQUERED",
          value: missionData.peaksConquered,
          icon: Mountain,
          color: "from-sky-400 to-blue-400",
        },
        {
          label: "EXPEDITIONS",
          value: missionData.expeditions,
          icon: Compass,
          color: "from-blue-400 to-indigo-400",
        },
        {
          label: "HAPPY TREKKERS",
          value: missionData.happyTrekkers,
          icon: Star,
          color: "from-indigo-400 to-purple-400",
        },
        {
          label: "YEARS OF GLORY",
          value: missionData.yearsOfGlory,
          icon: Award,
          color: "from-purple-400 to-pink-400",
        },
      ]
    : [];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 30%, #0A4B72 70%, #0B5B86 100%)",
      }}
    >
      {/* ===== Dynamic Background Layers ===== */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* ===== Header Section ===== */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              {" "}
              OUR MISSION & VISION{" "}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
            {missionData ? (
              <>
                {/* First part plain/white */}
                <span>{missionData.title.split(" ")[0]} </span>

                {/* Second part with gradient color */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
                  {missionData.title.split(" ").slice(1).join(" ")}
                </span>
              </>
            ) : (
              <>
                <span>Crafting </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
                  Mountain Legacies
                </span>
              </>
            )}
          </h2>
        </div>

        {/* ===== Main Content with 3D Effect ===== */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mx-auto max-w-7xl">
          {/* ===== Left Side - 3D Image Terminal ===== */}
          <div className="lg:w-1/2 relative group perspective-1000">
            {/* Floating Stats Cards */}
            <div className="absolute -left-12 top-20 z-20 hidden xl:block">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-400/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-sky-400/30 rounded-2xl p-6 animate-float">
                  <div className="space-y-4">
                    {stats.slice(0, 2).map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-sky-300/60">
                              {stat.label}
                            </div>
                            <div className="text-2xl font-bold text-white">
                              {stat.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Image Card */}
            <div className="relative transform-gpu transition-all duration-500 group-hover:rotateY-5 group-hover:scale-105">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/30 to-blue-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-sky-400/30 shadow-2xl shadow-sky-500/20">
                <img
                  src={
                    missionData?.image?.cdnUrl ||
                    "https://images.pexels.com/photos/1081111/pexels-photo-1081111.jpeg?cs=srgb&dl=pexels-simonmigaj-1081111.jpg&fm=jpg"
                  }
                  alt="Mountain Expedition"
                  className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 animate-scan-fast pointer-events-none" />
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="absolute -right-12 bottom-20 z-20 hidden xl:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-2 animate-float-delayed">
                  <div className="space-y-4">
                    {stats.slice(2, 4).map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-blue-300/60">
                              {stat.label}
                            </div>
                            <div className="text-2xl font-bold text-white">
                              {stat.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Right Side - Mission Cards ===== */}
          <div className="lg:w-1/2 space-y-8">
            {missionData?.missions?.map((mission, idx) => (
              <div
                key={mission._id}
                className={`bg-white/5 backdrop-blur-sm border border-sky-400/30 rounded-3xl p-6 hover:border-sky-400/60 transition-all group/mission-${idx}`}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center group-hover/mission-${idx}:scale-110 transition-transform shadow-lg shadow-sky-500/30`}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-sky-400 tracking-[0.3em]">{`MISSION_${idx + 1}`}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {mission.title}
                    </h3>
                    <p
                      className="text-sky-200/60 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: mission.description }}
                    ></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.2);} }
        @keyframes scan-fast { 0%{transform:translateY(-100%);}100%{transform:translateY(100%);} }
        @keyframes gradient { 0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;} }
        @keyframes pulse-slow { 0%,100%{opacity:0.3;transform:scale(1);}50%{opacity:0.5;transform:scale(1.1);} }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 5s ease-in-out infinite; animation-delay:2s; }
        .animate-scan-fast { animation: scan-fast 3s linear infinite; }
        .animate-gradient { background-size:200% 200%; animation:gradient 3s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .perspective-1000 { perspective:1000px; }
        .group:hover .rotateY-5 { transform: rotateY(5deg); }
      `}</style>
    </section>
  );
};

export default AboutUs;
