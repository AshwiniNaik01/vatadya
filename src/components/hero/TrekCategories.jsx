import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Sparkles, Terminal, Activity, Compass, Layers, Target, Shield, Zap, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchTrekCategories } from "../../api/trekCategoryApi";

const TrekCategories = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchTrekCategories();
        if (!data || !data.message) throw new Error("Invalid API data");

        const mappedCategories = data.message.map((cat) => ({
          id: cat._id,
          title: cat.title,
          description: cat.description,
          icon: <Layers className="w-6 h-6" />,
          count: cat.trekCount || 0,
          difficulty: cat.difficulty || "VAR_LEVEL",
          image: cat.catImage?.cdnUrl || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3"
        }));

        setCategories(mappedCategories);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const difficultyLevels = ["all", "Easy", "Moderate", "Challenging", "Expert"];

  // return (
  //   <section id="sectors" className="py-32 bg-gradient-to-br from-sky-50 via-white to-blue-50 relative border-t border-white/5 selection:bg-primary selection:text-obsidian overflow-hidden">
  //     {/* Visual Data Matrix Background */}
  //     <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
  //       <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-primary/10 to-transparent"></div>
  //       <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '120px 120px' }}></div>
  //     </div>

  //     <div className="container mx-auto px-6 relative z-10">
  //       {/* Header Console */}
  //       <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20 animate-fade-in relative">
  //         <div className="max-w-3xl">
  //           <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
  //             <Terminal size={14} className="text-primary" />
  //             <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">SECTOR_CATEGORIZATION_V4.8</span>
  //           </div>
  //           <h2 className="text-4xl md:text-8xl font-black text-white mb-10 leading-none tracking-tighter uppercase italic">
  //             Mission <br />
  //             <span className="command-gradient">Sectors</span>
  //           </h2>
  //           <p className="data-text text-primary/40 text-sm md:text-xl md:leading-relaxed mb-4 uppercase tracking-widest">
  //             [SYS_SCAN] {">"} Categorizing topographical classifications by
  //             atmospheric density and navigational complexity indexes.
  //           </p>
  //         </div>

  //         {/* Tactical Logic Filters */}
  //         <div className="flex flex-wrap gap-4 bg-white/[0.01] hud-panel p-2 border-white/5 backdrop-blur-3xl">
  //           {difficultyLevels.map((lvl) => (
  //             <button
  //               key={lvl}
  //               onClick={() => setActiveCategory(lvl)}
  //               className={`px-8 py-4 hud-panel data-text text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-700 relative overflow-hidden group ${activeCategory.toLowerCase() === lvl.toLowerCase()
  //                 ? "bg-primary text-obsidian border-primary glow-primary scale-105"
  //                 : "bg-white/5 text-white/40 border-white/5 hover:border-primary/40 hover:text-white"
  //                 }`}
  //             >
  //               <span className="relative z-10">{lvl === "all" ? "SHOW_ALL_FEEDS" : `IDX_${lvl.toUpperCase()}`}</span>
  //               {/* Micro-scanning animation inside active button */}
  //               {activeCategory.toLowerCase() === lvl.toLowerCase() && (
  //                 <div className="absolute inset-0 bg-white/20 -translate-x-full animate-scanline pointer-events-none opacity-20"></div>
  //               )}
  //             </button>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Dynamic Data Grid */}
  //       {loading ? (
  //         <div className="py-40 flex flex-col items-center justify-center gap-8">
  //           <Activity className="text-primary animate-pulse w-16 h-16" />
  //           <span className="data-text text-[11px] text-primary animate-pulse font-black uppercase tracking-[0.6em]">DECODING_SECTOR_MATRIX...</span>
  //         </div>
  //       ) : error ? (
  //         <div className="py-40 text-center">
  //           <div className="inline-flex items-center gap-4 px-10 py-6 hud-panel border-red-500/20 bg-red-500/5 text-red-500 data-text text-sm font-black uppercase tracking-widest">
  //             [CRITICAL_FAILURE] {">"} {error}
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
  //           {categories
  //             .filter(cat => activeCategory === "all" || cat.difficulty.toLowerCase() === activeCategory.toLowerCase())
  //             .map((category, idx) => (
  //               <div
  //                 key={category.id}
  //                 className="group relative hud-panel h-[550px] overflow-hidden cursor-crosshair hover-lift animate-slide-up"
  //                 style={{ animationDelay: `${idx * 0.1}s` }}
  //                 onClick={() => navigate(`/treks?categoryId=${category.id}`)}
  //               >
  //                 {/* Background Recon Image */}
  //                 <img
  //                   src={category.image}
  //                   alt={category.title}
  //                   className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 scale-110 group-hover:scale-100"
  //                 />

  //                 {/* Tactical Overlays */}
  //                 <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent"></div>

  //                 {/* Corner Accents */}
  //                 <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  //                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

  //                 {/* Technical Meta Labels */}
  //                 <div className="absolute top-8 left-8 flex flex-col gap-3">
  //                   <div className="data-text text-[8px] text-primary bg-primary/10 px-4 py-1.5 border border-primary/20 backdrop-blur-xl">
  //                     SECTOR_ID: 0x{idx + 104}
  //                   </div>
  //                   {category.count > 0 && (
  //                     <div className="data-text text-[8px] text-white/40 bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-xl">
  //                       ACTIVE_NODES: {category.count}
  //                     </div>
  //                   )}
  //                 </div>

  //                 {/* Content Terminal UI */}
  //                 <div className="absolute inset-0 p-10 flex flex-col justify-end">
  //                   <div className="mb-8 w-14 h-14 hud-panel border-primary/20 bg-obsidian/60 backdrop-blur-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-obsidian group-hover:scale-110 transition-all duration-700">
  //                     {category.icon}
  //                   </div>

  //                   <div className="flex items-center gap-4 mb-4">
  //                     <span className="data-text text-[9px] font-black text-secondary tracking-widest uppercase">{category.difficulty}</span>
  //                     <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors"></div>
  //                     <span className="data-text text-[9px] font-black text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">THREAT_LEVEL: STABLE</span>
  //                   </div>

  //                   <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter group-hover:text-primary transition-colors italic leading-none">
  //                     {category.title}
  //                   </h3>

  //                   <p className="data-text text-[10px] text-white/30 line-clamp-2 mb-10 leading-relaxed uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
  //                     {category.description}
  //                   </p>

  //                   <div className="flex items-center justify-between pt-8 border-t border-white/5 group-hover:border-primary/20 transition-all">
  //                     <div className="flex items-center gap-3">
  //                       <Globe size={14} className="text-primary/40 group-hover:text-primary animate-spin-slow" />
  //                       <span className="data-text text-[10px] font-black text-primary/60 group-hover:text-primary tracking-[0.3em]">INITIALIZE_RECON</span>
  //                     </div>
  //                     <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-3 transition-transform duration-500" />
  //                   </div>
  //                 </div>

  //                 {/* Aesthetic Radar Scan Line */}
  //                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/10 overflow-hidden">
  //                   <div className="w-1/2 h-full bg-primary -translate-x-[200%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-linear"></div>
  //                 </div>
  //               </div>
  //             ))}
  //         </div>
  //       )}

  //       {/* Catalog Access Terminal */}
  //       <div className="mt-40 text-center">
  //         <button
  //           onClick={() => navigate('/treks')}
  //           className="group relative inline-flex items-center gap-8 px-16 py-8 hud-panel border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-700 hover:border-primary/40"
  //         >
  //           {/* Background light shift */}
  //           <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>

  //           <Zap className="w-6 h-6 text-primary animate-pulse" />
  //           <span className="data-text text-[12px] font-black text-white uppercase tracking-[0.6em] relative z-10 group-hover:text-primary transition-colors">ACCESS_FULL_MISSION_DATABASE</span>
  //           <div className="w-12 h-[1px] bg-white/10 group-hover:bg-primary transition-all"></div>
  //         </button>
  //       </div>
  //     </div>

  //     <style>{`
  //       .animate-spin-slow { animation: spin 15s linear infinite; }
  //       @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  //     `}</style>
  //   </section>
  // );

return (
  <section
    id="sectors"
    className="py-12 bg-gradient-to-br from-sky-50 via-white to-blue-50 relative overflow-hidden"
  >
    {/* Light & Airy Background Elements */}
    <div className="absolute inset-0">
      {/* Soft Gradient Layers */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-sky-100/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-100/50 to-transparent"></div>
      {/* Decorative Circles */}
      <div className="absolute top-24 right-24 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl animate-floatBubble"></div>
      <div className="absolute bottom-24 left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-floatBubble"></div>
      {/* Light Grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(125, 211, 252, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(125, 211, 252, 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>

    <div className="container mx-auto px-6 relative z-10">
      {/* Header Section */}
      <div className="mb-20 text-center md:text-left md:flex md:justify-between md:items-end">
        <div className="max-w-3xl mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <Terminal size={14} className="text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              SECTOR CATEGORIZATION
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-sky-900 mb-4">
            Mission <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mt-2">Sectors</span>
          </h2>
          <p className="text-sky-700/70 text-lg leading-relaxed">
            [SYS_SCAN] &gt; Categorizing topographical classifications by atmospheric density and navigational complexity indexes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="hidden md:flex items-center gap-4 mt-8 md:mt-0">
          {difficultyLevels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveCategory(lvl)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-500 ${
                activeCategory.toLowerCase() === lvl.toLowerCase()
                  ? "bg-sky-400 text-white shadow-lg scale-105"
                  : "bg-white/10 text-sky-600 hover:bg-sky-100 hover:text-sky-700"
              }`}
            >
              {lvl.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Data Grid */}
    
       {/* Dynamic Data Grid */}
   {loading ? (
  <div className="py-40 flex flex-col items-center justify-center gap-8">
    <Activity className="text-primary animate-pulse w-16 h-16" />
    <span className="data-text text-[11px] text-primary animate-pulse font-black uppercase tracking-[0.6em]">
      DECODING_SECTOR_MATRIX...
    </span>
  </div>
) : error ? (
  <div className="py-40 text-center">
    <div className="inline-flex items-center gap-4 px-10 py-6 rounded-xl bg-red-100 text-red-600 font-black uppercase tracking-wide shadow-lg">
      [CRITICAL_FAILURE] &gt; {error}
    </div>
  </div>
) : (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto max-w-7xl">
    {categories
      .filter(
        (cat) =>
          activeCategory === "all" ||
          cat.difficulty.toLowerCase() === activeCategory.toLowerCase()
      )
      .map((category, idx) => (
        <div
          key={category.id}
          className="group relative h-[400px] rounded-xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
          style={{ animationDelay: `${idx * 0.1}s` }}
          onClick={() => navigate(`/treks?categoryId=${category.id}`)}
        >
          {/* Background Image */}
          <img
            src={category.image}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-110 group-hover:scale-100"
          />

          {/* Dark Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sky-400/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Top Meta */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
           
            {category.count > 0 && (
              <div className="text-xs font-bold text-white/70 bg-sky-800/20 px-3 py-1 rounded-full backdrop-blur-sm">
                ACTIVE TREKS: {category.count}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="mb-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-sky-800 transition-all duration-500">
              {category.icon}
            </div>

            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-sky-200 transition-colors">
              {category.title}
            </h3>
            <p className="text-sm text-white/60 line-clamp-2 mb-4">
              {category.description}
            </p>

            <div className="flex items-center justify-between text-xs text-white/60">
              <span>{category.difficulty}</span>
              <span>THREAT LEVEL: STABLE</span>
            </div>
          </div>

          {/* Bottom Scan Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-400/20 overflow-hidden">
            <div className="w-1/2 h-full bg-sky-400 -translate-x-[200%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-linear"></div>
          </div>
        </div>
      ))}
  </div>
)}

      {/* Bottom CTA */}
  
    </div>

    {/* Custom Animations */}
    <style>{`
      @keyframes floatBubble {
        0%,100% { transform: translateY(0) scale(1); opacity: 0.3; }
        50% { transform: translateY(-30px) scale(1.1); opacity: 0.5; }
      }
      .animate-floatBubble { animation: floatBubble 6s ease-in-out infinite; }
    `}</style>
  </section>
);

};

export default TrekCategories;
