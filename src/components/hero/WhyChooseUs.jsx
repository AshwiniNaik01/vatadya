// import React from 'react';
// import { Shield, Users, Gem, Leaf, Award, Zap, Sparkles, Terminal, Activity } from "lucide-react";

// const WhyChooseUs = () => {
//   const features = [
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Tactical Safety Systems",
//       description: "Tier-1 operational protocols with redundant satellite tethering and real-time vital monitoring.",
//       code: "PROT_99"
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Optimized Unit Size",
//       description: "Mission-specific squads capped at 12 units for maximum coordination and tactical efficiency.",
//       code: "UNIT_CTRL"
//     },
//     {
//       icon: <Gem className="w-8 h-8" />,
//       title: "Base-Ops Infrastructure",
//       description: "High-spec thermal housing and high-calorie nutritional supply tailored for extreme altitudes.",
//       code: "BASE_SPEC"
//     },
//     {
//       icon: <Leaf className="w-8 h-8" />,
//       title: "Sustainable Recon",
//       description: "Eco-integrated operations with net-zero footprint protocols focused on indigenous preservation.",
//       code: "ECO_SYNC"
//     },
//     {
//       icon: <Award className="w-8 h-8" />,
//       title: "Sector Specialists",
//       description: "Technical leads with 10k+ hours in high-altitude terrain and generational local intelligence.",
//       code: "INTEL_OPS"
//     },
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Precision Logistics",
//       description: "Full-stack support architecture, technical gear staging, and optimized mission itineraries.",
//       code: "LOG_CORE"
//     }
//   ];

//   return (
//     <section id="why-choose-us" className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5">
//       {/* Background HUD Grid */}
//       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
//         style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-24 animate-fade-in flex flex-col items-center">
//           <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
//             <Activity className="w-4 h-4 text-primary" />
//             <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">STRATEGIC_VALUE_PROP_V1</span>
//           </div>

//           <h2 className="text-4xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
//             Operational <br />
//             <span className="command-gradient italic">Advantages</span>
//           </h2>
//           <p className="data-text text-primary/40 text-sm max-w-2xl mx-auto leading-relaxed">
//             [SYS_AUDIT] {">"} Core pillars of the Vatadya infrastructure.
//             Validated technical metrics for elite high-altitude mission success.
//           </p>
//         </div>

//         {/* Advantage Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group relative hud-panel p-12 hover-lift transition-all duration-700 animate-slide-up"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="absolute top-4 right-6">
//                 <span className="data-text text-[8px] text-white/20 whitespace-nowrap">{feature.code}</span>
//               </div>

//               {/* Icon Panel */}
//               <div className="w-16 h-16 hud-panel border-primary/20 flex items-center justify-center text-primary mb-10 group-hover:glow-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
//                 {feature.icon}
//               </div>

//               {/* Content Panel */}
//               <h3 className="data-text text-xl font-black text-white mb-5 uppercase tracking-tight group-hover:text-primary transition-colors">
//                 {feature.title}
//               </h3>
//               <p className="data-text text-[10px] text-white/30 leading-relaxed font-normsl group-hover:text-white/50 transition-colors">
//                 {feature.description}
//               </p>

//               {/* Data Visualization Micro-elements */}
//               <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
//                 <div className="flex gap-1">
//                   {[1, 2, 3].map(i => (
//                     <div key={i} className={`w-3 h-1 ${i <= 2 ? 'bg-primary/40' : 'bg-white/5'}`}></div>
//                   ))}
//                 </div>
//                 <div className="data-text text-[7px] text-primary/40 animate-pulse">SYSTEM_SYNCED</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import React from "react";
import {
  Shield,
  Users,
  Gem,
  Leaf,
  Award,
  Zap,
  Activity,
  CheckCircle,
  Star
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Tactical Safety Systems",
      description:
        "Tier-1 operational protocols with redundant satellite tethering and real-time vital monitoring.",
      metric: 92,
      color: "from-sky-400 to-blue-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Optimized Unit Size",
      description:
        "Mission-specific squads capped at 12 units for maximum coordination and tactical efficiency.",
      metric: 87,
      color: "from-blue-400 to-indigo-400"
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Base-Ops Infrastructure",
      description:
        "High-spec thermal housing and high-calorie nutritional supply tailored for extreme altitudes.",
      metric: 98,
      color: "from-indigo-400 to-purple-400"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Recon",
      description:
        "Eco-integrated operations with net-zero footprint protocols focused on indigenous preservation.",
      metric: 81,
      color: "from-emerald-400 to-teal-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Sector Specialists",
      description:
        "Technical leads with 10k+ hours in high-altitude terrain and generational local intelligence.",
      metric: 96,
      color: "from-amber-400 to-orange-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Precision Logistics",
      description:
        "Full-stack support architecture, technical gear staging, and optimized mission itineraries.",
      metric: 89,
      color: "from-rose-400 to-pink-400"
    },
  ];

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      
      {/* Light Background Blobs */}
    
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <Activity className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
            Engineered for the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Extraordinary
            </span>
          </h2>
          
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mx-auto max-w-7xl">
          
          {/* Left Column - Circular Feature List */}
          <div className="space-y-8">
            <div className="relative">
              {/* Circular Progress Line (Decoration) */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 via-blue-200 to-transparent"></div>
              
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="relative flex items-start gap-6 pl-16 group">
                  {/* Circular Number with Icon */}
                  <div className={`absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} 
                                  flex items-center justify-center text-white shadow-lg
                                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4
                                  border border-sky-100 shadow-lg hover:shadow-xl 
                                  transition-all duration-500 group-hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-sky-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-sky-700/70 mb-3">{feature.description}</p>
                    
                   
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Central Image with Circular Stats */}
          <div className="relative">
            {/* Main Circular Image Container */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
              
              {/* Image Circle */}
              <div className="relative aspect-square rounded-full overflow-hidden
                              border-8 border-white shadow-2xl">
                <img 
                  src="https://img.freepik.com/premium-vector/man-avatar-thinking-with-question-marks-isolated_1263815-1018.jpg" 
                  alt="Mountain Guide"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent"></div>
              </div>

              {/* Floating Stat Cards - Positioned Absolutely */}
              
              {/* Top Right Stat */}
              <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm 
                              rounded-2xl p-4 shadow-xl border border-sky-100
                              animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 
                                  flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-900">156+</div>
                    <div className="text-xs text-sky-600">Expeditions</div>
                  </div>
                </div>
              </div>

              {/* Bottom Left Stat */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm 
                              rounded-2xl p-4 shadow-xl border border-sky-100
                              animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 
                                  flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-900">2.8k+</div>
                    <div className="text-xs text-sky-600">Happy Trekkers</div>
                  </div>
                </div>
              </div>

              {/* Top Left Badge */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm 
                              rounded-xl px-4 py-2 shadow-lg border border-sky-100">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-sky-900">4.9</span>
                  <span className="text-xs text-sky-600">(2.4k reviews)</span>
                </div>
              </div>

              {/* Bottom Right Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm 
                              rounded-xl px-4 py-2 shadow-lg border border-sky-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-sky-900">100% Safety</span>
                </div>
              </div>
            </div>

      
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;