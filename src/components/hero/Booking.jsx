import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Search, Activity, Terminal, Shield, Zap, Target, Cpu, Layers } from 'lucide-react';
import { fetchTrekCategories } from '../../api/trekCategoryApi';

const Booking = () => {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    groupSize: '',
    experience: ''
  });
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSectors = async () => {
      try {
        const data = await fetchTrekCategories();
        if (data && Array.isArray(data.message)) {
          setSectors(data.message.map(cat => ({
            id: cat._id,
            title: cat.title
          })));
        }
      } catch (err) {
        console.error("Failed to load sectors for booking:", err);
      }
    };
    loadSectors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('[TRANSMISSION_SUCCESS] > Logistics request received at Command HQ. Deployment synchronization pending.');
  };

  return (
    <section id="booking" className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
      {/* Dynamic HUD Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/[0.01] skew-x-12 -translate-x-1/4"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        {/* Pulsing radar rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-primary/5 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">

            {/* Tactical Deployment Console (Form) */}
            <div className="hud-panel p-10 md:p-16 bg-white/[0.02] border-white/5 animate-slide-up relative overflow-hidden group">
              {/* Scanline micro-animation */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-20 w-full animate-scanline pointer-events-none opacity-40"></div>

              <div className="relative z-10">
                <div className="mb-12">
                  <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
                    <Terminal size={14} className="text-primary" />
                    <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">DEPLOYMENT_REQUEST_V5</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                    Initialize <br />
                    <span className="command-gradient">Deployment</span>
                  </h2>
                  <p className="data-text text-[11px] text-white/30 leading-relaxed uppercase tracking-widest max-w-md">
                    [INPUT_REQUIRED] {">"} Transmit tactical mission parameters to synchronize elite squad logistics and hardware staging.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="data-text text-[9px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Target size={10} className="text-primary" />
                        TARGET_SECTOR
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/40 w-4 h-4" />
                        <select
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 hud-panel bg-white/5 border-white/10 text-white data-text text-[10px] focus:border-primary/60 focus:ring-0 transition-all outline-none appearance-none hover:border-white/20"
                          required
                        >
                          <option value="" className="bg-obsidian">SELECT_SECTOR</option>
                          {sectors.map((sector) => (
                            <option key={sector.id} value={sector.title} className="bg-obsidian">{sector.title.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="data-text text-[9px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Calendar size={10} className="text-primary" />
                        LAUNCH_WINDOW
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/40 w-4 h-4" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 hud-panel bg-white/5 border-white/10 text-white data-text text-[10px] focus:border-primary/60 focus:ring-0 transition-all outline-none [color-scheme:dark] hover:border-white/20"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="data-text text-[9px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Users size={10} className="text-secondary" />
                        SQUAD_UNIT_SIZE
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary/40 w-4 h-4" />
                        <select
                          value={formData.groupSize}
                          onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 hud-panel bg-white/5 border-white/10 text-white data-text text-[10px] focus:border-primary/60 focus:ring-0 transition-all outline-none appearance-none hover:border-white/20"
                          required
                        >
                          <option value="" className="bg-obsidian">SELECT_UNIT_COUNT</option>
                          <option value="1" className="bg-obsidian">SOLO_RECON [1_UNIT]</option>
                          <option value="2" className="bg-obsidian">DUAL_SYNC [2_UNITS]</option>
                          <option value="3-5" className="bg-obsidian">STRIKE_SQUAD [3-5_UNITS]</option>
                          <option value="6-10" className="bg-obsidian">OPERATIONAL_FORCE [6-10_UNITS]</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="data-text text-[9px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Cpu size={10} className="text-primary" />
                        TECH_EXPERIENCE_LVL
                      </label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-6 py-4 hud-panel bg-white/5 border-white/10 text-white data-text text-[10px] focus:border-primary/60 focus:ring-0 transition-all outline-none appearance-none hover:border-white/20"
                        required
                      >
                        <option value="" className="bg-obsidian">SELECT_QUALIFICATION</option>
                        <option value="beginner" className="bg-obsidian">CIVILIAN_RECON [L0]</option>
                        <option value="intermediate" className="bg-obsidian">FIELD_CERTIFIED [L1]</option>
                        <option value="advanced" className="bg-obsidian">ADVANCED_TACTICAL [L2]</option>
                        <option value="expert" className="bg-obsidian">ELITE_COMMAND [L3]</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="data-text text-[9px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Layers size={10} className="text-white/20" />
                      MISSION_CONSTRAINTS_SPEC
                    </label>
                    <textarea
                      className="w-full px-8 py-5 hud-panel bg-white/5 border-white/10 text-white data-text text-[10px] focus:border-primary/60 focus:ring-0 transition-all outline-none min-h-[140px] uppercase tracking-widest placeholder:text-white/10 hover:border-white/20"
                      placeholder="ENTER_ADDITIONAL_OPERATIONAL_LOGS..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group relative py-6 bg-primary text-obsidian font-black data-text text-[11px] uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:glow-primary active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-5">
                      <Search size={18} />
                      TRANSMIT_DEPLOYMENT_DECREE
                    </span>
                    {/* Ripple effect background */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                  </button>
                </form>

                <div className="mt-16 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                    <span className="data-text text-[8px] text-white/20 uppercase tracking-[0.2em]">COMMS_STABLE</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/5"></div>
                  <div className="flex items-center gap-3">
                    <Shield size={10} className="text-secondary" />
                    <span className="data-text text-[8px] text-white/20 uppercase tracking-[0.2em]">SSL_ENC_V7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Intel Nods (Right Side) */}
            <div className="animate-fade-in lg:pl-12">
              <div className="inline-flex items-center gap-4 bg-secondary/10 border border-secondary/20 rounded-sm px-5 py-3 mb-10">
                <Shield size={16} className="text-secondary animate-pulse" />
                <span className="data-text text-secondary text-[10px] font-black uppercase tracking-[0.5em]">FAILSAFE_VERIFIED_VND</span>
              </div>

              <h3 className="text-4xl md:text-7xl font-black text-white mb-12 uppercase tracking-tighter italic leading-[0.9]">
                Why Sync With <br />
                <span className="command-gradient">Vatadya HQ?</span>
              </h3>

              <div className="space-y-12 mb-20">
                {[
                  {
                    icon: <Zap size={20} className="text-primary" />,
                    title: "Dynamic Windowing",
                    desc: "Free operational window adjustments up to 30 days prior to launch, ensuring unit flexibility.",
                    id: "ARC_01"
                  },
                  {
                    icon: <Users size={20} className="text-secondary" />,
                    title: "Symmetry of Units",
                    desc: "Strictly capped squad density for optimized tactical communication and individualized field focus.",
                    id: "ARC_02"
                  },
                  {
                    icon: <Target size={20} className="text-primary" />,
                    title: "Sector Sovereignty",
                    desc: "Field leads with 10k+ hours of native terrain data and technical survival protocol expertise.",
                    id: "ARC_03"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-10 group cursor-default">
                    <div className="hud-panel p-5 border-white/5 group-hover:bg-primary group-hover:text-obsidian transition-all duration-700 shrink-0 group-hover:glow-primary">
                      {item.icon}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-4">
                        <span className="data-text text-[8px] text-white/10 font-black">{item.id}</span>
                        <h4 className="data-text text-2xl font-black text-white uppercase group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                      </div>
                      <p className="data-text text-[10px] text-white/30 leading-relaxed uppercase tracking-[0.15em] max-w-sm group-hover:text-white/50 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure Command Comms Panel */}
              <div className="hud-panel p-10 bg-white/[0.01] border-primary/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <Activity size={22} className="text-primary animate-pulse" />
                    <h4 className="data-text text-xl font-black text-white uppercase tracking-tight">Tactical Comms Sync</h4>
                  </div>
                  <p className="data-text text-[11px] text-white/30 mb-10 leading-relaxed uppercase tracking-widest max-w-md">
                    Emergency mission consultants ready for secure uplink.
                    Real-time field coordinates and gear calibration support 24/7.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="data-text text-3xl md:text-5xl font-black text-primary tracking-tighter italic">+91 8806058687</div>
                    <div className="data-text text-[10px] text-secondary font-black tracking-[0.4em] uppercase opacity-40">CHANNEL_SECURE_V8_SSL</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
};

export default Booking;