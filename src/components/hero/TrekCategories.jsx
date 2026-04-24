import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Sparkles,
  Terminal,
  Activity,
  Compass,
  Layers,
  Target,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
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
          image:
            cat.catImage?.cdnUrl ||
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3",
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

  const difficultyLevels = ["all", "Easy", "Moderate", "Difficult"];

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
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-sky-800/70 rounded-full px-5 py-2 mb-6 shadow-sm">
              <Sparkles size={14} className="text-sky-500" />
              <span className="text-sky-700 text-xs font-medium tracking-wide">
                Mission
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-sky-900 mb-4 flex items-center gap-3 justify-center md:justify-start">
              Mission{" "}
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mt-2">
                Sectors
              </span>
            </h2>
            <p className="text-sky-700/70 text-lg leading-relaxed">
              Explore trekking routes categorized by challenge and landscape,
              from beginner trails to thrilling summit climbs.
            </p>
            
          </div>

          {/* Category Filters */}
        <div className="hidden md:flex items-center gap-3 mt-8 md:mt-0 p-2 rounded-2xl
                bg-white/5 backdrop-blur-xl border border-white/10
                shadow-[0_10px_40px_rgba(0,0,0,0.2)]">

  {difficultyLevels.map((lvl) => {
    const isActive =
      activeCategory.toLowerCase() === lvl.toLowerCase();

    return (
      <button
        key={lvl}
        onClick={() => setActiveCategory(lvl)}
        className={`relative px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest
                    transition-all duration-500 overflow-hidden group
                    ${
                      isActive
                        ? "text-white shadow-lg scale-105"
                        : "text-sky-900 hover:text-sky-800/50 hover:scale-105"
                    }`}
      >

        {/* glow background */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-500
          ${
            isActive
              ? "bg-gradient-to-r from-sky-500 to-blue-600 opacity-100"
              : "bg-white/0 group-hover:bg-white/10"
          }`}
        />

        {/* shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        {/* text */}
        <span className="relative z-10">
          {lvl}
        </span>

        {/* active indicator dot */}
        {isActive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5
                           bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        )}

      </button>
    );
  })}
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto max-w-7xl">

  {categories
    .filter(
      (cat) =>
        activeCategory === "all" ||
        cat.difficulty.toLowerCase() === activeCategory.toLowerCase(),
    )
    .map((category, idx) => (
      <div
        key={category.id}
        onClick={() => navigate(`/treks?categoryId=${category.id}`)}
        className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer
                   bg-black/40 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                   hover:scale-[1.03] transition-all duration-500"
        style={{ animationDelay: `${idx * 0.1}s` }}
      >

        {/* 🌄 IMAGE */}
        <img
          src={category.image}
          alt={category.title}
          className="absolute inset-0 w-full h-full object-cover
                     scale-110 group-hover:scale-100 transition-transform duration-1000"
        />

        {/* 🖤 PREMIUM OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* ✨ SOFT LUXURY GLOW */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-sky-500/10 via-transparent to-amber-400/10 blur-3xl opacity-40" />

        {/* 🔳 CORNER ACCENTS */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-sky-400/40 opacity-0 group-hover:opacity-100 transition" />

        {/* 📊 TOP BADGE */}
        {category.count > 0 && (
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full
                          bg-white/10 backdrop-blur-xl border border-white/10
                          text-[10px] tracking-widest text-white/70">
            ACTIVE • {category.count}
          </div>
        )}

        {/* 🧭 CONTENT */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">

          {/* ICON */}
          <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center
                          bg-white/10 backdrop-blur-xl border border-white/10
                          text-white group-hover:bg-sky-500 group-hover:text-white
                          transition-all duration-500 shadow-lg">
            {category.icon}
          </div>

          {/* TITLE */}
          <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2
                         group-hover:text-sky-200 transition-colors tracking-tight">
            {category.title}
          </h3>

          {/* DESCRIPTION */}
          <p
            className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: category.description }}
          />

          {/* FOOTER META */}
          <div className="flex items-center justify-between text-[11px] text-white/50 tracking-wider">

            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
              {category.difficulty}
            </span>

            <span className="text-white/40">
              STABILITY: HIGH
            </span>

          </div>

        </div>

        {/* ⚡ SCAN LINE EFFECT */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-sky-400 to-transparent
                          -translate-x-[200%] group-hover:translate-x-[250%]
                          transition-transform duration-1000 ease-linear" />
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
