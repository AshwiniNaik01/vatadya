// import React from 'react';
// import {
//     ShieldCheck,
//     Wifi,
//     Activity,
//     HeartPulse,
//     MapPin,
//     Radio,
//     Terminal,
//     Zap,
//     AlertTriangle,
//     FileSearch,
//     Crosshair
// } from 'lucide-react';

// const SafetySection = () => {
//     const protocols = [
//         {
//             title: "SAT_UPLINK_OMEGA",
//             desc: "Persistent satellite tethering ensures secure comms 24/7 across all dead-zones.",
//             icon: <Radio className="w-8 h-8" />,
//             id: "SIG_0x11"
//         },
//         {
//             title: "FIELD_MED_DEPLOY",
//             desc: "Certified medical responders and oxygen staging at every critical ascent node.",
//             icon: <HeartPulse className="w-8 h-8" />,
//             id: "MED_0x22"
//         },
//         {
//             title: "HELO_RECON_PROTO",
//             desc: "Established air-evacuation corridors with high-altitude specialized rotorcraft.",
//             icon: <Activity className="w-8 h-8" />,
//             id: "EVAC_0x33"
//         },
//         {
//             title: "REDUNDANT_VND",
//             desc: "Fail-safe navigational backup via analog orienteering and redundant GPS nodes.",
//             icon: <MapPin className="w-8 h-8" />,
//             id: "NAV_0x44"
//         }
//     ];

//     return (
//         <section id="safety" className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
//             {/* Visual Glitch/Technical Background */}
//             <div className="absolute inset-0 z-0 opacity-[0.02]">
//                 <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, var(--color-primary) 1px, var(--color-primary) 2px)', backgroundSize: '100% 4px' }}></div>
//             </div>

//             {/* Danger/Warning HUD Accents */}
//             <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500/20 via-transparent to-red-500/20 opacity-40"></div>

//             <div className="container mx-auto px-6 relative z-10">
//                 <div className="grid lg:grid-cols-2 gap-24 items-center">

//                     {/* Left Column: Safety Narrative */}
//                     <div className="animate-fade-in">
//                         <div className="inline-flex items-center gap-4 bg-red-500/5 border border-red-500/20 rounded-sm px-4 py-2 mb-8 hud-corners">
//                             <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
//                             <span className="data-text text-red-500 text-[10px] font-black tracking-[0.4em]">FAILSAFE_PROTOCOLS_V4.0</span>
//                         </div>

//                         <h2 className="text-4xl md:text-8xl font-black text-white mb-10 leading-none tracking-tighter uppercase italic">
//                             Critical <br />
//                             <span className="command-gradient">Guardians</span>
//                         </h2>

//                         <p className="data-text text-primary/40 text-base md:text-xl leading-relaxed uppercase tracking-widest max-w-xl mb-16">
//                             [COMMAND_PRIORITY] {">"} Zero-compromise safety architecture.
//                             We engineer mission success by mitigating extreme theatre risks
//                             through redundant technical layers and elite field wisdom.
//                         </p>

//                         <div className="grid sm:grid-cols-2 gap-8">
//                             {[
//                                 { label: "SUCCESS_YIELD", val: "100%", detail: "No mission loss recorded" },
//                                 { label: "SYNC_LATENCY", val: "0.2ms", detail: "Real-time field ping" }
//                             ].map((stat, i) => (
//                                 <div key={i} className="hud-panel p-8 bg-white/[0.01] border-white/5">
//                                     <div className="data-text text-[8px] text-white/20 mb-2 uppercase">{stat.label}</div>
//                                     <div className="data-text text-4xl font-black text-primary mb-1">{stat.val}</div>
//                                     <div className="data-text text-[9px] text-white/40 uppercase tracking-widest">{stat.detail}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Right Column: Protocol Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 hud-panel overflow-hidden">
//                         {protocols.map((proto, idx) => (
//                             <div key={idx} className="p-10 bg-obsidian/80 hover:bg-primary/5 transition-all duration-700 group relative">
//                                 {/* Phase Marker */}
//                                 <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <span className="data-text text-[7px] text-primary">{proto.id}</span>
//                                 </div>

//                                 <div className="w-16 h-16 hud-panel border-white/10 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:border-primary group-hover:glow-primary transition-all duration-700 mb-8 overflow-hidden relative">
//                                     {proto.icon}
//                                     {/* Scanning light inside icon */}
//                                     <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                                 </div>

//                                 <h3 className="data-text text-lg font-black text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
//                                     {proto.title}
//                                 </h3>

//                                 <p className="data-text text-[10px] text-white/30 leading-relaxed uppercase tracking-widest group-hover:text-white/50 transition-colors">
//                                     {proto.desc}
//                                 </p>

//                                 {/* Status Indicator */}
//                                 <div className="mt-8 flex items-center justify-between opacity-20 group-hover:opacity-100 transition-opacity">
//                                     <div className="flex gap-1">
//                                         {[1, 2, 3].map(i => (
//                                             <div key={i} className="w-2 h-1 bg-primary"></div>
//                                         ))}
//                                     </div>
//                                     <span className="data-text text-[7px] text-primary">ENCRYPTED_FEED_ACTIVE</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>

//                 {/* Global Security Disclaimer Terminal */}
//                 <div className="mt-32 hud-panel p-8 bg-red-500/[0.02] border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
//                     <div className="flex items-center gap-6">
//                         <div className="w-12 h-12 hud-panel border-red-500/20 flex items-center justify-center text-red-500">
//                             <Radio className="w-6 h-6 animate-pulse" />
//                         </div>
//                         <div>
//                             <h4 className="data-text text-sm font-black text-white uppercase tracking-tight mb-1">Emergency Uplink Frequency</h4>
//                             <p className="data-text text-[9px] text-white/20 uppercase tracking-widest leading-none">Global Sector Distress Beacon: 406.0 MHz</p>
//                         </div>
//                     </div>
//                     <div className="flex gap-4">
//                         <button className="px-6 py-3 hud-panel border-white/10 data-text text-[9px] font-black text-white/40 uppercase hover:text-white hover:border-white transition-all">
//                             VIEW_RESCUE_LOGS
//                         </button>
//                         <button className="px-6 py-3 hud-panel border-red-500/20 bg-red-500/5 data-text text-[9px] font-black text-red-500 uppercase hover:bg-red-500 hover:text-white transition-all">
//                             READ_RISK_INDEX
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SafetySection;

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const SafetySection = () => {
  const [protocols, setProtocols] = useState([]);
  const [protocolsHeader, setProtocolsHeader] = useState({ title: "", description: "" }); // Added state

  useEffect(() => {
    const fetchSafetyStandards = async () => {
      try {
        const response = await axiosInstance("/api/safety-standards");
        const result = response.data;

        if (result.success && result.data) {
          // MAIN TITLE & DESCRIPTION FROM BACKEND
          setProtocolsHeader({
            title: result.data.title,
            description: result.data.description,
          });

          // CARDS FROM BACKEND
          const formattedProtocols = result.data.standards.map((item) => ({
            title: item.title,
            desc: item.description,
            image: item.image?.cdnUrl || "",
          }));
          setProtocols(formattedProtocols);
        }
      } catch (error) {
        console.error("Error fetching safety standards:", error);
      }
    };

    fetchSafetyStandards();
  }, []);

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700">
      <div className="flex justify-center items-center">
        <div className="inline-flex items-center gap-2 bg-sky-900/80 backdrop-blur-sm border border-white rounded-full px-5 py-2 mb-6 shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-bold tracking-wide">
            OUR SAFETY STANDARDS
          </span>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070"
          alt="Mountain Background"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-blue-400/20 to-blue-900/80"></div>

      {/* Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
       <div className="text-center mb-16">
  <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
    {protocolsHeader.title ? (
      protocolsHeader.title.split(" ").map((word, index) => {
        const isGradient = index === 1; // apply gradient to 2nd word
        return (
          <span
            key={index}
            className={
              isGradient
                ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 italic"
                : ""
            }
          >
            {word}{" "}
          </span>
        );
      })
    ) : (
      <>
        Core{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 italic">
          Safety Protocols
        </span>
      </>
    )}
  </h2>
  <p className="text-white/70 max-w-2xl mx-auto">
    {protocolsHeader.description ||
      "Engineered with precision, resilience, and mission-critical intelligence."}
  </p>
</div>

        {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {protocols.map((item, index) => {
    // Dark gray shades for cards
    const cardShades = [
      "bg-gray-800",
      "bg-gray-700",
      "bg-gray-900",
      "bg-gray-800",
    ];
    const bgClass = cardShades[index % cardShades.length];

    return (
      <div
        key={index}
        className={`relative rounded-2xl overflow-hidden group shadow-xl ${bgClass}`}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>

        {/* Left Accent Border */}
        <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-300 to-orange-400"></div>

        {/* Content */}
        <div className="relative z-10 p-8 text-white h-full flex flex-col justify-end">
          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
          <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
        </div>
      </div>
    );
  })}
</div>
      </div>
    </section>
  );
};

export default SafetySection;