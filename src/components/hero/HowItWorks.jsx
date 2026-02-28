// import React from 'react';
// import {
//     Target,
//     Cpu,
//     Map,
//     Mountain,
//     Flag,
//     Terminal,
//     Activity,
//     ChevronRight,
//     Zap,
//     ShieldCheck
// } from 'lucide-react';

// const HowItWorks = () => {
//     const steps = [
//         {
//             id: "01",
//             title: "Sector Recon",
//             desc: "Analyze topographical data and select your target mission sector from our validated vaults.",
//             icon: <Target className="w-10 h-10" />,
//             color: "text-primary border-primary/20"
//         },
//         {
//             id: "02",
//             title: "Tactical Sync",
//             desc: "Initialize unit deployment. Our command team synchronizes gear staging and squad integration.",
//             icon: <Cpu className="w-10 h-10" />,
//             color: "text-secondary border-secondary/20"
//         },
//         {
//             id: "03",
//             title: "Base-Ops Intake",
//             desc: "Arrival at basecamp. Execute final logistics checks, medical briefings, and equipment calibration.",
//             icon: <Map className="w-10 h-10" />,
//             color: "text-primary border-primary/20"
//         },
//         {
//             id: "04",
//             title: "The Ascent Pulse",
//             desc: "Phased ascent under technical lead supervision. Real-time vital metrics and field reporting active.",
//             icon: <Mountain className="w-10 h-10" />,
//             color: "text-secondary border-secondary/20"
//         },
//         {
//             id: "05",
//             title: "Mission Debrief",
//             desc: "Summit achieved. Descend for full visual debrief, sector log archive, and mission medal issuance.",
//             icon: <Flag className="w-10 h-10" />,
//             color: "text-primary border-primary/20"
//         }
//     ];

//     return (
//         <section id="how-it-works" className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
//             {/* Background Micro-elements */}
//             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
//             <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/[0.01] rounded-full blur-[120px] translate-y-1/2"></div>

//             {/* Vertical Data Line */}
//             <div className="absolute left-1/2 top-0 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent -translate-x-1/2 hidden lg:block"></div>

//             <div className="container mx-auto px-6 relative z-10">
//                 <div className="text-center mb-32 animate-fade-in flex flex-col items-center">
//                     <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
//                         <Zap className="w-4 h-4 text-primary animate-pulse" />
//                         <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">DEPLOYMENT_SEQUENCE_v9</span>
//                     </div>
//                     <h2 className="text-4xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
//                         Tactical <br />
//                         <span className="command-gradient italic">Lifecycle</span>
//                     </h2>
//                     <p className="data-text text-primary/40 text-sm max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
//                         [SYS_OVERVIEW] {">"} The deterministic sequence from sector selection
//                         to mission successful. Every step is monitored by VATADYA telemetry logs.
//                     </p>
//                 </div>

//                 <div className="relative max-w-5xl mx-auto">
//                     {steps.map((step, idx) => (
//                         <div
//                             key={idx}
//                             className={`flex flex-col lg:flex-row items-center gap-12 mb-24 lg:mb-40 group last:mb-0 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
//                                 }`}
//                         >
//                             {/* Process Card */}
//                             <div className="flex-1 w-full animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
//                                 <div className="hud-panel p-10 md:p-12 bg-white/[0.01] border-white/5 hover:border-primary/40 transition-all duration-700 relative group-hover:bg-primary/[0.02]">
//                                     {/* Sector Index Marker */}
//                                     <div className="absolute top-4 left-6">
//                                         <span className="data-text text-[8px] text-white/10 font-black">PHASE_{step.id}_STABLE</span>
//                                     </div>

//                                     <div className={`w-20 h-20 hud-panel border flex items-center justify-center mb-10 transition-all duration-700 group-hover:glow-primary group-hover:bg-primary group-hover:text-obsidian ${step.color}`}>
//                                         {step.icon}
//                                     </div>

//                                     <h3 className="data-text text-2xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-primary transition-colors">
//                                         {step.title}
//                                     </h3>
//                                     <p className="data-text text-[11px] text-white/30 leading-relaxed uppercase tracking-[0.15em] mb-10">
//                                         {step.desc}
//                                     </p>

//                                     <div className="flex items-center gap-4 text-primary/20 group-hover:text-primary transition-colors">
//                                         <span className="data-text text-[8px] font-black">CONTINUE_SEQUENCE</span>
//                                         <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Central Node (Hidden on mobile) */}
//                             <div className="hidden lg:flex items-center justify-center relative z-20">
//                                 <div className="w-12 h-12 hud-panel border-primary/20 bg-obsidian flex items-center justify-center text-primary group-hover:scale-125 group-hover:border-primary transition-all duration-700">
//                                     <Activity size={18} className={`${idx % 2 === 0 ? 'animate-pulse' : ''}`} />
//                                 </div>
//                             </div>

//                             {/* Spacing alignment */}
//                             <div className="flex-1 hidden lg:block"></div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Closing Status */}
//                 <div className="mt-20 pt-20 border-t border-white/5 text-center">
//                     <div className="inline-flex flex-col items-center gap-6">
//                         <ShieldCheck className="w-12 h-12 text-secondary opacity-20" />
//                         <p className="data-text text-[9px] text-white/10 uppercase tracking-[0.6em] animate-pulse">
//                             SYSTEM_INTEGRITY_CHECK: PASSED
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HowItWorks;


import React, { useState } from "react";
import {
  Target,
  Cpu,
  Map,
  Mountain,
  Flag,
  Activity,
  ChevronRight,
  Zap,
  ShieldCheck,
  Sparkles,
  Satellite,
  Compass
} from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      title: "Sector Recon",
      desc: "Analyze topographical data and select your target mission sector.",
      icon: Target,
      color: "from-yellow-300 to-orange-400"
    },
    {
      id: "02",
      title: "Tactical Sync",
      desc: "AI-powered logistics coordination and squad integration.",
      icon: Cpu,
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: "03",
      title: "Base-Ops Intake",
      desc: "Medical checks, equipment calibration and logistics finalization.",
      icon: Map,
      color: "from-indigo-400 to-purple-500"
    },
    {
      id: "04",
      title: "The Ascent Pulse",
      desc: "Live ascent tracking with telemetry and safety monitoring.",
      icon: Mountain,
      color: "from-pink-400 to-rose-500"
    },
    {
      id: "05",
      title: "Mission Debrief",
      desc: "Summit achieved. Certification and mission archive unlocked.",
      icon: Flag,
      color: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-12 overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700"
    >
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* Mountain Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover scale-105"
            alt="Mountain Trek"
          />
        </div>

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-blue-400/20 to-blue-900/80"></div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Scanline */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-yellow-300/10 to-transparent h-1/2 animate-scanline pointer-events-none opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">

        {/* ===== Header ===== */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 
                          bg-white/10 backdrop-blur-sm 
                          border border-white/20 rounded-full 
                          px-6 py-2 mb-6">
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest">
             HOW WE WORK
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            How The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 italic">
              Expedition
            </span>{" "}
            Works
          </h2>
        </div>

        {/* ===== Steps Grid ===== */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`group relative p-6 rounded-2xl 
                            backdrop-blur-md border transition-all duration-500
                            ${isActive
                              ? "bg-white/20 border-yellow-300 shadow-xl scale-105"
                              : "bg-white/10 border-white/20 hover:bg-white/20"}`}
              >
                {/* Gradient Glow */}
                <div className={`absolute -inset-1 rounded-2xl  blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />

                <div className="relative z-10 flex flex-col items-center text-center">

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4
                                  bg-gradient-to-r ${step.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-white/70 mb-4">
                    {step.desc}
                  </p>

                  <span className="text-xs font-bold text-yellow-300 tracking-widest">
                    PHASE {step.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== Bottom Status Panel ===== */}
     
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scanline {
          0% { background-position-y: 0; }
          100% { background-position-y: 100%; }
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
          background-size: 100% 100%;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;