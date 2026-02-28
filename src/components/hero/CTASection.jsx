import React from 'react';
import { Sparkles, ArrowRight, Mountain, Terminal, Zap, Activity, Shield, Radio, Globe, Compass, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
  <section className="py-40 relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 border-t border-sky-100 selection:bg-sky-200 selection:text-sky-900">
  
  {/* Soft Background Glow */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-sky-300/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl"></div>
  </div>

  {/* Decorative Ring */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] border border-sky-300/40 rounded-full translate-y-1/2 opacity-40 animate-pulse-slow"></div>

  <div className="container mx-auto px-6 relative z-10 text-center">
    <div className="max-w-5xl mx-auto">

      {/* Status Badge */}
      <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-sky-200 rounded-full px-6 py-2 mb-14 shadow-sm">
        <Radio className="w-5 h-5 text-sky-600 animate-pulse" />
        <span className="text-sky-700 text-xs font-semibold tracking-widest uppercase">
          Operational Status: Ready
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-5xl md:text-7xl font-extrabold text-sky-900 mb-10 leading-tight">
        Command Your
        <span className="block bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
          Trajectory
        </span>
      </h2>

      {/* Description */}
      <p className="text-sky-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
        Verified altitude windows detected for elite explorers.
        Initialize your next high-stakes mission and join the global
        community of high-altitude adventurers.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        
        <button
          onClick={() => navigate('/treks')}
          className="group px-14 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold tracking-wide rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 flex items-center gap-4"
        >
          Start Mission
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
        </button>

        <button
          onClick={() => navigate('/contact')}
          className="px-14 py-5 bg-white border border-sky-200 text-sky-700 font-semibold tracking-wide rounded-xl hover:bg-sky-50 hover:border-sky-300 transition-all duration-300 flex items-center gap-3"
        >
          <Activity className="w-5 h-5 text-sky-500" />
          Talk to Team
        </button>
      </div>

      {/* Stats Section */}
      <div className="mt-28 pt-12 border-t border-sky-200 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        {[
          { label: "LAT", val: "27.240°N", icon: <Compass size={14} /> },
          { label: "LON", val: "86.512°E", icon: <Target size={14} /> },
          { label: "UPTIME", val: "99.998%", icon: <Zap size={14} /> },
          { label: "STATUS", val: "VERIFIED", icon: <Shield size={14} /> },
          { label: "FREQ", val: "406.0MHz", icon: <Radio size={14} /> },
          { label: "GLOBAL", val: "ACTIVE", icon: <Globe size={14} /> }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-sky-500">
              {stat.icon}
              <span className="text-xs font-semibold tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
            <span className="text-sm font-bold text-sky-900">
              {stat.val}
            </span>
          </div>
        ))}
      </div>

    </div>
  </div>

  <style>{`
    .animate-pulse-slow {
      animation: pulse-slow 8s ease-in-out infinite;
    }
    @keyframes pulse-slow {
      0%,100% { opacity:0.2; transform: scale(1) translateX(-50%); }
      50% { opacity:0.5; transform: scale(1.05) translateX(-50%); }
    }
  `}</style>
</section>
  );
};

export default CTASection;
