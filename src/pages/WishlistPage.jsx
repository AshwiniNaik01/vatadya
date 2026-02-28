import React, { useState } from "react";
import {
  Heart, MapPin, Calendar, Users, Trash2, Share2,
  BookmarkPlus, ArrowUpDown, Plane, Star, Globe, TrendingUp,
  Zap, Clock, X, ArrowRight, Sparkles, Mountain, CheckCircle
} from "lucide-react";
import WishlistCard from "../components/wishlist/WishlistCard";

const dummyWishlist = [
  {
    id: 1,
    title: "Everest Base Camp Trek",
    location: "Nepal Himalayas",
    price: 2899,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    difficulty: "Challenging",
    duration: "14 Days",
    groupSize: "4-12 People",
    rating: 4.9,
    reviews: 342,
    tags: ["High Altitude", "Glacier"],
    featured: true,
    discount: 17,
    season: "Mar-May"
  },
  {
    id: 2,
    title: "Patagonia W Trek",
    location: "Chilean Andes",
    price: 2299,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    difficulty: "Moderate",
    duration: "8 Days",
    groupSize: "6-16 People",
    rating: 4.8,
    reviews: 215,
    tags: ["Mountains", "Lakes"],
    featured: false,
    discount: 18,
    season: "Nov-Mar"
  }
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(dummyWishlist);
  const [sortBy, setSortBy] = useState("added");

  const removeItem = (id) => setWishlist(prev => prev.filter(item => item.id !== id));
  const removeAll = () => setWishlist([]);
  const totalValue = wishlist.reduce((s, i) => s + i.price, 0);
  const totalSavings = wishlist.reduce((s, i) => s + (i.originalPrice - i.price), 0);

  const stats = [
    { label: "Saved Treks", value: wishlist.length, desc: "Dream destinations", icon: Heart, gradient: "from-rose-400 to-pink-500", bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-600" },
    { label: "Total Value", value: `$${totalValue.toLocaleString()}`, desc: "Combined cost", icon: TrendingUp, gradient: "from-amber-400 to-orange-500", bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600" },
    { label: "You Save", value: `$${totalSavings.toLocaleString()}`, desc: "Special discounts", icon: Zap, gradient: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 overflow-x-hidden">

      {/* ── Decorative background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/70 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/70 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* ════════ HERO ════════ */}
     <div className="text-center mb-12" style={{ animation: 'wishFadeUp 0.7s ease-out both' }}>
  {/* Eyebrow pill */}
  <div className="inline-flex items-center gap-2 bg-white border border-rose-200 shadow-sm rounded-full px-4 py-2 mb-6">
    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
    <span className="text-rose-600 text-xs font-bold uppercase tracking-widest">Your Collection</span>
    <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-full">{wishlist.length}</span>
  </div>

  {/* Heading */}
 <h1 className="text-4xl md:text-5xl font-bold text-sky-900 leading-tight mb-3">
  Saved{' '}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 inline">
    Adventures
  </span>
</h1>

  {/* Subtext */}
  {/* <p className="text-sky-600/80 text-base md:text-lg max-w-md mx-auto leading-relaxed">
    Your handpicked collection of dream treks, ready for your next adventure.
  </p> */}
</div>

     {/* ════════ CONTROLS ════════ */}
        {wishlist.length > 0 && (
          <div className="bg-white rounded-2xl border border-sky-100 shadow-md shadow-sky-100/40 px-6 py-4
                         flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
            style={{ animation: 'wishFadeUp 0.7s ease-out 0.2s both' }}>
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-sky-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-bold text-sky-700 outline-none cursor-pointer hover:text-sky-900 transition-colors"
              >
                <option value="added">Sort: Date Added</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
             
              <button onClick={removeAll}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors">
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        )}
        {/* ════════ STATS ════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6" style={{ animation: 'wishFadeUp 0.7s ease-out 0.1s both' }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i}
                className={`relative bg-white rounded-2xl border ${stat.border} shadow-md shadow-sky-100/60 p-3 overflow-hidden
                           hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50 transition-all duration-400 group`}>
                {/* Top gradient stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-t-2xl`} />

                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} border ${stat.border} flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${stat.text}`} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em] mb-1">{stat.label}</div>
                    <div className={`text-3xl font-bold ${stat.text}`}>{stat.value}</div>
                    <div className="text-xs text-sky-500/60 mt-0.5">{stat.desc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

   

        {/* ════════ CONTENT ════════ */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-24 text-center"
            style={{ animation: 'wishFadeUp 0.6s ease-out both' }}>
            {/* Animated rings */}
            <div className="relative w-28 h-28 mx-auto mb-10">
              <div className="absolute inset-0 bg-rose-100 rounded-full animate-ping opacity-30" style={{ animationDuration: '2.5s' }} />
              <div className="absolute inset-2 bg-rose-50 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-10 h-10 text-rose-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-sky-900 mb-3">Nothing saved yet</h2>
            <p className="text-sky-600/70 max-w-md mx-auto mb-10 leading-relaxed">
              Start exploring our expeditions and save the ones that speak to your adventurous spirit.
            </p>
            <a href="/treks"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500
                         text-white rounded-xl font-bold hover:from-sky-600 hover:to-blue-600
                         hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 transition-all group">
              <Plane className="w-4 h-4" />
              Explore Treks
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((trek, idx) => (
              <div key={trek.id} style={{ animation: `wishFadeUp 0.5s ease-out ${idx * 0.1}s both` }}>
                <WishlistTrekCard trek={trek} onRemove={removeItem} />
              </div>
            ))}

            {/* Add more */}
            <a href="/treks"
              className="rounded-3xl border-2 border-dashed border-sky-200 bg-sky-50/50 min-h-[420px] flex flex-col items-center justify-center gap-5 group
                         hover:border-sky-400 hover:bg-sky-100/50 transition-all duration-400 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-sky-200 flex items-center justify-center group-hover:scale-110 group-hover:border-sky-400 transition-all">
                <BookmarkPlus className="w-7 h-7 text-sky-500" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-sky-600 group-hover:text-sky-800 transition-colors">Discover More</div>
                <div className="text-xs text-sky-400 mt-1">Find your next adventure</div>
              </div>
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes wishFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ═══ Inline wishlist card ═══ */
const WishlistTrekCard = ({ trek, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  const diffConfig = (d) => {
    switch (d?.toLowerCase()) {
      case 'easy': return 'bg-emerald-100 text-emerald-700';
      case 'moderate': return 'bg-amber-100 text-amber-700';
      case 'challenging': return 'bg-orange-100 text-orange-700';
      case 'difficult': return 'bg-red-100 text-red-700';
      default: return 'bg-sky-100 text-sky-700';
    }
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-lg shadow-sky-100/60 border-4 border-sky-200
                 hover:shadow-2xl hover:shadow-sky-200/60 hover:-translate-y-2 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={trek.image}
          alt={trek.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent" />

        {/* Discount */}
        {trek.discount && (
          <div className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg">
            −{trek.discount}% OFF
          </div>
        )}

        {/* Remove */}
        <button onClick={() => onRemove(trek.id)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl
                     bg-white/90 backdrop-blur-sm shadow-lg border border-rose-100
                     hover:bg-rose-50 hover:border-rose-200 transition-all duration-300">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </button>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-md">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-sky-900">{trek.rating}</span>
        </div>

        {/* Difficulty */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase ${diffConfig(trek.difficulty)}`}>
            {trek.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-sky-500 text-xs font-semibold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {trek.location}
        </div>

        <h3 className="text-lg font-bold text-sky-900 mb-4 group-hover:text-sky-600 transition-colors">
          {trek.title}
        </h3>

        {/* Info chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { icon: Clock, val: trek.duration },
            { icon: Users, val: trek.groupSize },
            { icon: Calendar, val: trek.season },
          ].map((chip, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-[11px] font-semibold text-sky-700">
              <chip.icon className="w-3 h-3 text-sky-400" />
              {chip.val}
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-5">
          {["Expert guides included", "All equipment provided"].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-sky-600">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-sky-100">
          <div>
            <div className="text-[10px] text-sky-400 uppercase tracking-wider mb-0.5">From</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-sky-900">${trek.price.toLocaleString()}</span>
              {trek.originalPrice && (
                <span className="text-sm text-sky-400 line-through">${trek.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white uppercase tracking-wide
                             bg-gradient-to-r from-sky-500 to-blue-500
                             hover:from-sky-600 hover:to-blue-600 hover:shadow-lg hover:shadow-sky-200 transition-all">
            Book Now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hover bottom accent */}
      <div className="h-1 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
    </div>
  );
};

export default WishlistPage;
