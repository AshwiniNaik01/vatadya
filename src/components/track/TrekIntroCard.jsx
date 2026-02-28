import {
  Share2, MapPin, Star, ChevronRight, Bookmark, Calendar,
  Clock, CheckCircle, Sparkles, Activity, Layers, Users, Mountain
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TrekIntroCard = ({ onBookNow, trek }) => {
  const navigate = useNavigate();
  if (!trek) return null;

  const diffColors = {
    easy: { text: "text-emerald-700", bg: "bg-emerald-100" },
    moderate: { text: "text-amber-700", bg: "bg-amber-100" },
    challenging: { text: "text-orange-700", bg: "bg-orange-100" },
    difficult: { text: "text-red-700", bg: "bg-red-100" },
    extreme: { text: "text-purple-700", bg: "bg-purple-100" },
  };
  const diff = diffColors[(trek.difficulty || "moderate").toLowerCase()] || diffColors.moderate;

  return (
    <div className="bg-white/90 backdrop-blur-3xl border-b border-sky-100/50 shadow-xl shadow-sky-900/[0.03] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-5 md:py-7">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* Left — Trek Identity */}
          <div className="flex-1 min-w-0">
            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${diff.bg} ${diff.text}`}>
                {trek.difficulty}
              </div>
              {trek.tags?.slice(0, 2).map((tag, i) => (
                <div key={i} className="px-4 py-1 rounded-full text-[10px] font-black text-sky-600 bg-sky-50/50 border border-sky-100 uppercase tracking-widest">
                  {tag}
                </div>
              ))}
              <div className="px-3 py-1 rounded-full text-[10px] font-bold text-sky-300 bg-transparent border border-sky-100/50 uppercase tracking-widest">
                #{trek._id?.slice(-5).toUpperCase()}
              </div>
            </div>

            {/* Title with Gradient Polish */}
            <h1 className="text-3xl lg:text-5xl font-black text-sky-950 tracking-tighter leading-[0.9] mb-5">
              {trek.title}
            </h1>

            {/* Meta row with subtle dividers */}
            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-[13px] font-bold text-sky-600/70">
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <MapPin className="w-4 h-4 text-sky-400" />
                </div>
                {trek.location}
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <Clock className="w-4 h-4 text-sky-400" />
                </div>
                {trek.duration}
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <Users className="w-4 h-4 text-sky-400" />
                </div>
                {trek.groupSize || "Flexible Group"}
              </div>
              <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                  <Activity className="relative w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="text-emerald-700 text-[11px] font-black uppercase tracking-widest">{trek.status || "Booking Open"}</span>
              </div>
            </div>
          </div>

          {/* Right — Price + CTA Card */}
          <div className="flex items-center gap-6 p-4 bg-sky-50/50 rounded-[2rem] border border-sky-100/50 self-stretch lg:self-center">
            <div className="text-right px-4 hidden md:block">
              <div className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-1">Total Expedition</div>
              <div className="text-3xl font-black text-sky-950 tracking-tighter">₹{trek.price?.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Free Cancellations</div>
            </div>
            <button
              onClick={onBookNow}
              className="flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-black text-sm text-white
                         bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 shadow-xl shadow-sky-200/50
                         hover:shadow-2xl hover:shadow-sky-400/40 hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="uppercase tracking-[0.1em]">Book Now</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekIntroCard;
