import React, { useEffect, useState } from "react";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  ShieldCheck,
  TrendingUp,
  Globe
} from "lucide-react";
import { getAllReviews } from "./../../api/reviewApi";
import { API_BASE_URL } from "../../config/constants";

const TrackReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getAllReviews();

        if (Array.isArray(data)) {
          setReviews(data);
        } else if (data && Array.isArray(data.message)) {
          setReviews(data.message);
        } else if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else if (data && Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          setReviews([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load mission logs. Recalibrating feeds...");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const totalPages = Math.ceil(reviewsArray.length / reviewsPerPage);
  const startIndex = currentPage * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviewsArray.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-6">
        <Activity className="text-primary animate-pulse w-10 h-10" />
        <span className="data-text text-[9px] text-primary animate-pulse uppercase tracking-[0.4em]">FILTERING_ECHOES...</span>
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 relative z-10">
        {/* Technical Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20 animate-fade-in">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
              <Terminal size={14} className="text-primary" />
              <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">INTEL_REPORTS</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">
              After Action <span className="command-gradient">Debriefs</span>
            </h2>
            <p className="data-text text-primary/40 text-[11px] leading-relaxed uppercase tracking-widest">
              [RECON_INTEL] {">"} Verified mission reflections from previous high-altitude
              deployments. Validating sector atmosphere and unit performance metrics.
            </p>
          </div>

          <div className="flex items-center gap-4 group">
            <button onClick={handlePrevPage} className="w-14 h-14 hud-panel border-white/5 bg-white/[0.02] flex items-center justify-center text-white/30 hover:border-primary/40 hover:text-primary transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1.5 px-4 h-14 items-center bg-white/[0.01] hud-panel border-white/5">
              {[...Array(totalPages)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentPage ? 'bg-primary glow-primary' : 'bg-white/10'}`}></div>
              ))}
            </div>
            <button onClick={handleNextPage} className="w-14 h-14 hud-panel border-white/5 bg-white/[0.02] flex items-center justify-center text-white/30 hover:border-primary/40 hover:text-primary transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Error Overlay */}
        {error && (
          <div className="text-center py-20 hud-panel border-red-500/20 bg-red-500/5">
            <p className="data-text text-red-500 text-[10px] font-black uppercase tracking-widest">[SYS_ERR] {">"} {error}</p>
          </div>
        )}

        {/* Tactical Review Matrix */}
        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentReviews.map((review, index) => (
              <div
                key={review._id || index}
                className="group relative hud-panel p-10 bg-white/[0.01] border-white/5 hover:border-primary/20 transition-all duration-700 hover-lift flex flex-col h-full min-h-[400px]"
              >
                {/* Visual Marker */}
                <div className="absolute top-2 right-4 opacity-10">
                  <span className="data-text text-[7px] text-white">LOG_SEC_{index + 100}</span>
                </div>

                <div className="flex justify-between items-start mb-8">
                  <Quote className="w-10 h-10 text-primary opacity-10 group-hover:opacity-30 transition-opacity" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-1 ${i < (review.rating || 5) ? 'bg-secondary' : 'bg-white/5'}`}></div>
                    ))}
                  </div>
                </div>

                <h3 className="data-text text-[11px] font-black text-white mb-6 uppercase tracking-wider group-hover:text-primary transition-colors line-clamp-2">
                  {review.title || "MISSION_SUCCESS_REPORT"}
                </h3>

                <p className="data-text text-[10px] text-white/30 leading-relaxed mb-10 italic uppercase tracking-widest flex-grow">
                  "{review.description}"
                </p>

                <div className="pt-8 border-t border-white/5 mt-auto flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={
                        review.profilePhoto
                          ? `${API_BASE_URL || ""}/uploads/${review.profilePhoto}`
                          : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
                      }
                      alt={review.name}
                      className="w-12 h-12 hud-panel border-white/10 grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary text-obsidian rounded-sm flex items-center justify-center border border-obsidian">
                      <ShieldCheck size={10} />
                    </div>
                  </div>
                  <div>
                    <h4 className="data-text font-black text-white text-[11px] uppercase tracking-tight">
                      {review.name}
                    </h4>
                    <p className="data-text text-[7px] text-primary/40 font-black uppercase tracking-widest mt-1">
                      {review.role || "VERIFIED_EXPLORER"}
                    </p>
                  </div>
                </div>

                {/* HUD Scan Line micro-animation */}
                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-primary/5 to-transparent h-12 w-full animate-scanline opacity-0 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        )}

        {/* Tactical Feed Counter (Stats Bar) */}
        {!error && reviewsArray.length > 0 && (
          <div className="mt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 hud-panel overflow-hidden border-white/5">
              {[
                { label: "UNITS_CLEARED", val: "10K+", icon: <Users size={14} /> },
                { label: "RANK_INDEX", val: "4.9/5", icon: <TrendingUp size={14} /> },
                { label: "ACTIVE_NODES", val: "150+", icon: <Globe size={14} /> },
                { label: "LEGACY_CYCLES", val: "15Y+", icon: <Zap size={14} /> }
              ].map((stat, i) => (
                <div key={i} className="bg-obsidian/60 p-10 flex flex-col items-center text-center group hover:bg-primary/5 transition-all">
                  <div className="text-primary/20 mb-6 group-hover:text-primary group-hover:scale-110 transition-all">
                    {stat.icon}
                  </div>
                  <div className="data-text text-4xl font-black text-white mb-2 leading-none">{stat.val}</div>
                  <div className="data-text text-[8px] text-white/30 tracking-[0.3em] font-black uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import { Users } from "lucide-react";
export default TrackReview;