import React from 'react';
import { ShieldCheck, Calendar, Award, Users, Star, Activity } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "5k+",
      label: "UNITS_DEPLOYED",
      desc: "Our global circle of verified mountain explorers",
      delay: "0.1s"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      value: "13Y+",
      label: "LEGACY_RUNTIME",
      desc: "Mastering extreme terrain since mission start 2013",
      delay: "0.2s"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "100%",
      label: "TEK_CERTIFIED",
      desc: "Internationally validated technical leads",
      delay: "0.3s"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      value: "LEVEL_5",
      label: "SAFETY_INDEX",
      desc: "Distinguished fail-safe protocol architecture",
      delay: "0.4s"
    }
  ];

  return (
    <section className="py-24 bg-obsidian border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative animate-fade-in"
              style={{ animationDelay: badge.delay }}
            >
              <div className="relative h-full hud-panel p-10 bg-white/5 hover:bg-white/10 transition-all duration-700 hover-lift text-center flex flex-col items-center border-white/5">
                <div className="w-16 h-16 hud-panel border-primary/20 flex items-center justify-center text-primary mb-8 group-hover:glow-primary group-hover:bg-primary group-hover:text-white transition-all duration-700">
                  {badge.icon}
                </div>

                <div className="mb-2 flex items-center justify-center gap-3">
                  <span className="data-text text-4xl font-black text-white">{badge.value}</span>
                  {index === 3 && <Activity className="w-5 h-5 text-secondary animate-pulse" />}
                </div>

                <h4 className="data-text text-[9px] font-black uppercase tracking-[0.3em] text-secondary mb-4">
                  {badge.label}
                </h4>

                <p className="data-text text-[10px] text-white/30 leading-relaxed max-w-[200px]">
                  {badge.desc}
                </p>

                {/* Data readout bar */}
                <div className="mt-8 w-full flex gap-1">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className={`h-1 flex-1 ${i <= 4 ? 'bg-primary/20' : 'bg-white/5'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;