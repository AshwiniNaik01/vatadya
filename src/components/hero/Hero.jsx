import React, { useEffect, useState } from "react";
import { Play, ArrowRight, Shield, Activity, Zap, Compass, Info, Terminal, Wind, Gauge, Globe, Target, Radio, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();


  // return (
  //   <section
  //     id="home"
  //     className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-obsidian selection:bg-primary selection:text-obsidian"
  //   >
  //     {/* Arctic Atmospheric Command Background */}
  //     <div className="absolute inset-0 z-0 overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-obsidian to-primary/5 z-10"></div>

  //       {/* Deep Field Visual Recon */}
  //       <div className="absolute inset-0 opacity-20 filter contrast-125 saturate-0 group">
  //         <img
  //           src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2070"
  //           className={`w-full h-full object-cover scale-105 animate-pulse-slow transition-all duration-1000 ${glitch ? 'skew-x-2 opacity-40' : ''}`}
  //           alt="Arctic Mountain Range"
  //         />
  //       </div>

  //       {/* Tactical HUD Grids & Scanners */}
  //       <div className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none"
  //         style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
  //       </div>

  //       {/* Animated Horizon Line */}
  //       <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
  //       <div className="absolute top-[40%] left-0 w-full h-px bg-linear-to-r from-transparent via-primary/5 to-transparent"></div>

  //       {/* Radar Active Pulse */}
  //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-primary/10 rounded-full opacity-[0.03] animate-ping duration-[12s]"></div>

  //       {/* Moving Scanlines */}
  //       <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-1/2 animate-scanline pointer-events-none opacity-20"></div>
  //     </div>

  //     {/* Side Telemetry Arrays */}
  //     <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-20 z-30">
  //       {[
  //         { label: "ALTITUDE_INDEX", value: "8,848", unit: "METERS", color: "text-primary" },
  //         { label: "ATM_PRESSURE", value: "29.92", unit: "INHG", color: "text-secondary" },
  //         { label: "GEO_COORDS", value: "27.9°N / 86.9°E", unit: "WGS84", color: "text-primary" },
  //         { label: "WIND_VELOCITY", value: "48", unit: "KNOTS", color: "text-secondary" },
  //       ].map((item, i) => (
  //         <div key={i} className="flex flex-col gap-4 animate-fade-in group" style={{ animationDelay: `${i * 0.2}s` }}>
  //           <span className="data-text text-[8px] text-white/20 font-black tracking-[0.4em] uppercase">{item.label}</span>
  //           <div className="flex items-baseline gap-2">
  //             <span className={`data-text text-3xl font-black text-white group-hover:${item.color} transition-colors duration-500 italic`}>{item.value}</span>
  //             <span className="data-text text-[9px] text-white/10 font-bold">{item.unit}</span>
  //           </div>
  //           <div className="w-16 h-[2px] bg-white/5 relative overflow-hidden">
  //             <div className={`absolute inset-0 ${item.color.replace('text', 'bg')} -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Right Side Mission Status */}
  //     <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col items-end gap-12 z-30">
  //       <div className="flex flex-col items-end gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
  //         <span className="data-text text-[8px] text-white/20 font-black tracking-[0.4em] uppercase">SYSTEM_UPTIME</span>
  //         <span className="data-text text-xl font-black text-primary italic">99:24:12:04</span>
  //       </div>
  //       <div className="flex items-center gap-4 py-4 px-6 hud-panel border-white/5 bg-white/[0.02]">
  //         <div className="flex flex-col items-end">
  //           <span className="data-text text-[7px] text-white/20 uppercase">Signal</span>
  //           <span className="data-text text-[9px] text-secondary font-black">ENCRYPTED</span>
  //         </div>
  //         <Radio className="text-secondary animate-pulse" size={16} />
  //       </div>
  //     </div>

  //     {/* Main Command Dashboard */}
  //     <div className="container mx-auto px-6 z-30 relative">
  //       <div className="max-w-6xl mx-auto text-center">
  //         {/* Mission Deployment Notification */}
  //         <div className="inline-flex items-center gap-6 bg-primary/5 border border-primary/20 rounded-sm px-6 py-3.5 mb-16 animate-fade-in hud-corners relative group overflow-hidden">
  //           <Scan className="w-4 h-4 text-primary animate-pulse" />
  //           <span className="data-text text-primary text-[10px] font-black tracking-[0.5em] uppercase">
  //             STATUS: MISSION_READY // THEATRE: ARCTIC_ALPINE_CORE
  //           </span>
  //           {/* Hover light shift */}
  //           <div className="absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-[1.5s]"></div>
  //         </div>

  //         {/* Core Command Branding */}
  //         <h1 className="text-7xl md:text-[11rem] font-black text-white mb-12 leading-[0.8] tracking-tighter uppercase animate-slide-up flex flex-col items-center">
  //           <span className={`transition-all duration-300 ${glitch ? 'translate-x-4 skew-x-12 opacity-50' : ''}`}>Arctic</span>
  //           <span className="command-gradient italic relative">
  //             Expedition
  //             <div className="absolute -bottom-4 left-0 w-full h-1 bg-primary/20 scale-x-50 group-hover:scale-x-100 transition-transform duration-1000"></div>
  //           </span>
  //         </h1>

  //         {/* Strategic Narrative Briefing */}
  //         <p className="data-text text-primary/40 text-sm md:text-2xl mb-24 max-w-3xl mx-auto leading-relaxed animate-slide-up uppercase tracking-widest" style={{ animationDelay: '0.2s' }}>
  //           [RECON_INTEL] {">"} Synthesizing elite high-altitude scouting protocols.
  //           Deploying next-gen logistics for the modern arctic vanguard.
  //           Calibrate your trajectory for peak mission immersion.
  //         </p>

  //         {/* Command Action Suite */}
  //         <div className="flex flex-col sm:flex-row gap-10 justify-center mb-32 animate-slide-up" style={{ animationDelay: '0.4s' }}>
  //           <button
  //             onClick={() => {
  //               const element = document.getElementById("sectors");
  //               element?.scrollIntoView({ behavior: "smooth" });
  //             }}
  //             className="group relative px-20 py-10 bg-primary text-obsidian font-black data-text text-[12px] uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:glow-primary hover:scale-105"
  //           >
  //             <span className="relative z-10 flex items-center justify-center gap-6">
  //               <Zap className="w-5 h-5" />
  //               INITIALIZE_DEEP_MAPPING
  //             </span>
  //             <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
  //           </button>

  //           <button
  //             onClick={() => navigate("/trek-gallery")}
  //             className="group relative px-20 py-10 border border-white/10 hover:border-primary/40 bg-white/[0.02] text-white/40 hover:text-primary font-black data-text text-[12px] uppercase tracking-[0.5em] transition-all duration-700 backdrop-blur-3xl overflow-hidden"
  //           >
  //             <span className="relative z-10 flex items-center justify-center gap-6">
  //               <Compass className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
  //               VISUAL_RECON_ARCHIVE
  //             </span>
  //             <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
  //           </button>
  //         </div>

  //         {/* Central Telemetry Hub */}
  //         <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 hud-panel animate-slide-up overflow-hidden" style={{ animationDelay: '0.6s' }}>
  //           {[
  //             { label: "VERIFIED_UNITS", icon: <Globe size={20} />, value: "12.4k+", meta: "GLOBAL_SYNC", color: "text-primary" },
  //             { label: "SECTOR_YIELD", icon: <Target size={20} />, value: "100%", meta: "ZERO_FAILURE", color: "text-secondary" },
  //             { label: "COMM_LATENCY", icon: <Activity size={20} />, value: "0.04ms", meta: "DATA_STABLE", color: "text-primary" },
  //             { label: "CORE_SECURITY", icon: <Shield size={20} />, value: "A1_VET", meta: "TIER_1_AUTH", color: "text-secondary" },
  //           ].map((stat, idx) => (
  //             <div key={idx} className="bg-obsidian/40 p-12 text-center group hover:bg-primary/5 transition-all duration-700 relative overflow-hidden">
  //               <div className="flex flex-col items-center gap-8 relative z-10">
  //                 <div className={`p-5 hud-panel border-white/5 ${stat.color} group-hover:scale-110 group-hover:border-primary/40 transition-all duration-700`}>
  //                   {stat.icon}
  //                 </div>
  //                 <div className="space-y-3">
  //                   <div className="data-text text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">{stat.label}</div>
  //                   <div className="data-text text-5xl font-black text-white italic tracking-tighter transition-colors group-hover:text-primary">{stat.val || stat.value}</div>
  //                   <div className="data-text text-[10px] text-secondary font-black tracking-[0.5em] uppercase">{stat.meta}</div>
  //                 </div>
  //               </div>
  //               {/* Micro scanner line for card */}
  //               {idx % 2 === 0 && <div className="absolute bottom-0 left-0 w-full h-px bg-primary/20 animate-scanline opacity-0 group-hover:opacity-100"></div>}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>

  //     {/* Manual Scroll Telemetry */}
  //     <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 group cursor-pointer hover:opacity-100 transition-opacity"
  //       onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}>
  //       <span className="data-text text-[9px] text-primary tracking-[0.8em] font-black uppercase">ENGAGE_OPERATIONAL_DATA</span>
  //       <div className="w-[1px] h-20 bg-linear-to-b from-primary to-transparent relative">
  //         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/20 rounded-full blur-md animate-bounce"></div>
  //       </div>
  //     </div>

  //     <style>{`
  //       .animate-spin-slow { animation: spin 30s linear infinite; }
  //       @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  //       @keyframes pulse-slow {
  //         0%, 100% { opacity: 0.15; transform: scale(1.05); }
  //         50% { opacity: 0.25; transform: scale(1.1); }
  //       }
  //       .animate-pulse-slow { animation: pulse-slow 2s infinite ease-in-out; }
  //     `}</style>
  //   </section>
  // );

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-16 bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700 selection:bg-blue-200 selection:text-sky-900"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b 
                  from-white/50
                  via-blue-400/30 
                  to-blue-900"></div>

        {/* Mountain Image */}
        <div className="absolute inset-0 opacity-25 filter contrast-110 saturate-105">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070"
            className={`w-full h-full object-cover scale-105 transition-all duration-1000`}
            alt="Mountain Trekking"
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Moving scanline */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-yellow-400/5 to-transparent h-1/2 animate-scanline pointer-events-none opacity-10"></div>
      </div>

      {/* Main Heading */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-snug tracking-tight">
          <span className={`block`}>Alpine</span>
          <span className="block text-white italic bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
            Expedition
          </span>
        </h1>

        <p className="text-white/90 text-base md:text-lg mb-12 leading-relaxed tracking-wide">
          Gear up for an epic trek through majestic mountains. Navigate trails, track your altitude, and embrace the adventure of the great outdoors. Adventure awaits — your path is ready.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button
            onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-12 py-4 bg-cyan-400 text-sky-900 font-bold uppercase tracking-widest overflow-hidden rounded-md hover:scale-105 hover:shadow-lg transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              START TREK
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 rounded-md"></div>
          </button>

          <button
            onClick={() => navigate("/trek-gallery")}
            className="group relative px-12 py-4 border border-white/20 bg-white/5 text-white hover:border-blue-900 hover:text-white font-bold uppercase tracking-widest overflow-hidden rounded-md transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Compass className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
              View Gallery
            </span>
            <div className="absolute inset-0 bg-blue-700/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-md"></div>
          </button>
        </div>

        {/* Telemetry Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-md p-4">
          {[
            { label: "PEAKS CLIMBED", value: "12", unit: "", color: "text-emerald-200" },
            { label: "TOTAL DISTANCE", value: "85 km", unit: "", color: "text-emerald-100" },
            { label: "AVG ALTITUDE", value: "3,200 m", unit: "", color: "text-emerald-200" },
            { label: "TREK TIME", value: "24h 37m", unit: "", color: "text-emerald-100" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-2 bg-white/5 p-4 rounded-md hover:bg-yellow-400/10 transition-all duration-500"
            >
              <span className="data-text text-xs text-white font-bold uppercase tracking-wider">{stat.label}</span>
              <span className={`data-text text-2xl md:text-3xl font-extrabold ${stat.color} italic`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Prompt */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"
        onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="data-text text-[12px] text-white tracking-wide font-bold uppercase">
          SCROLL FOR TREKS
        </span>
        <div className="w-1 h-16 bg-white relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-bounce blur-sm"></div>
        </div>
      </div>

      {/* Fonts & Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1.05); }
          50% { opacity: 0.35; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 2s infinite ease-in-out; }
        @keyframes scanline { 0% { background-position-y: 0; } 100% { background-position-y: 100%; } }
        .animate-scanline { animation: scanline 3s linear infinite; background-size: 100% 100%; }
        .data-text { font-family: 'Rajdhani', 'Exo 2', sans-serif; }
      `}</style>
    </section>
  );

};

export default Hero;
