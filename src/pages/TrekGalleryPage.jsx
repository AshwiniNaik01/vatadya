import React, { useState, useEffect, useMemo } from "react";
import GalleryFilters from "../components/gallery/GalleryFilters";
import {
  Image as ImageIcon,
  Search,
  X,
  Grid3x3,
  LayoutGrid,
  Film,
  Camera,
  Heart,
  Eye,
  MapPin,
  Calendar,
  Share2,
  Bookmark,
  ChevronDown,
  Aperture,
  Clock,
  Star,
  Sparkles,
  Download,
  ZoomIn
} from "lucide-react";
import { fetchTrekGallery } from "../api/galleryApi";

const TrekGalleryPage = () => {
  // --- Filters & Sorting ---
  const [filters, setFilters] = useState({
    month: "All",
    year: "All",
    experience: "All",
    season: "All",
    region: "All",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [likedImages, setLikedImages] = useState({});
  const [savedImages, setSavedImages] = useState({});
  const [activeView, setActiveView] = useState("grid");

  // --- Gallery Data ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch gallery ---
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const result = await fetchTrekGallery();
        const mapped = result.data.map((item, index) => ({
          id: index + 1,
          url: `${item.photo?.cdnUrl}`,
          title: item.title,
          month: item.month,
          year: item.year,
          experience: item.experience,
          season: item.season,
          region: item.region,
          photographer: ["Alex Rivera", "Maya Chen", "James Wilson"][index % 3],
          photographerAvatar: `https://i.pravatar.cc/150?img=${index + 10}`,
          camera: ["SONY α7 IV", "FUJIFILM X-T5", "CANON EOS R5"][index % 3],
          aperture: ["f/2.8", "f/4", "f/5.6"][index % 3],
          shutter: ["1/1000s", "1/500s", "1/250s"][index % 3],
          iso: ["100", "200", "400"][index % 3],
          likes: Math.floor(Math.random() * 500) + 200,
          views: Math.floor(Math.random() * 2000) + 500,
          location: item.region || "Himalayas",
          timestamp: new Date().toLocaleDateString()
        }));
        setGalleryImages(mapped);
      } catch (err) {
        console.error("Failed to load gallery", err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  // --- Filtered & Sorted Images ---
  const filteredImages = useMemo(() => {
    return galleryImages
      .filter((img) => {
        return (
          (filters.month === "All" || img.month === filters.month) &&
          (filters.year === "All" || img.year === filters.year) &&
          (filters.experience === "All" || img.experience === filters.experience) &&
          (filters.season === "All" || img.season === filters.season) &&
          (filters.region === "All" || img.region === filters.region) &&
          img.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortBy === "newest") return b.id - a.id;
        if (sortBy === "oldest") return a.id - b.id;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "popular") return b.likes - a.likes;
        return 0;
      });
  }, [galleryImages, filters, sortBy, searchQuery]);

  // --- Grouped Images by Month and Year ---
  const groupedImages = useMemo(() => {
    const groups = [];
    const groupMap = {};

    filteredImages.forEach(img => {
      const key = `${img.month} ${img.year}`;
      if (!groupMap[key]) {
        groupMap[key] = [];
        groups.push({ key, images: groupMap[key] });
      }
      groupMap[key].push(img);
    });

    return groups;
  }, [filteredImages]);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedImages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = (id, e) => {
    e.stopPropagation();
    setSavedImages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50">
        <div className="relative">
          <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
          <Camera className="relative w-16 h-16 text-sky-500 animate-bounce mb-4" />
        </div>
        <p className="text-sky-700 font-semibold tracking-widest uppercase animate-pulse">
          Loading Alpine Moments...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 pt-0 selection:bg-sky-200 selection:text-sky-900 font-sans">

      {/* ================= HERO SECTION (betravelish mountain-depth) ================= */}
  <section className="relative h-[50vh] min-h-[50px] flex items-center justify-center text-center overflow-hidden">
  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    alt="Sky"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 via-blue-400/40 to-white/80" />

  {/* Text Content */}
  <div className="relative z-10 px-4">
    <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-2">
      Advantures{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-blue-200 to-indigo-100">
        Gallery
      </span>
    </h1>
    <p className="text-white text-md md:text-base max-w-xl mx-auto">
      Your handpicked collection of dream treks, waiting for your next chapter.
    </p>
  </div>

  {/* Semi-Circle Bottom */}
<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
  <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-[90px] md:h-[70px] block">
    <path
      fill="#e0f2fe"
      d="M0,0 C0,70 1440,70 1440,0 L1440,140 L0,140 Z"
    />
  </svg>
</div>
</section>

      {/* ================= MAIN INTERFACE ================= */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-2 relative z-30">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* SIDEBAR: FILTERS COMMENTED OUT
          <aside className="lg:col-span-3 lg:col-start-1 space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-sky-900/5 sticky top-28 border border-slate-100">
              <GalleryFilters filters={filters} setFilters={setFilters} />

              <button
                onClick={() => {
                  setFilters({
                    month: "All", year: "All", experience: "All", season: "All", region: "All",
                  });
                  setSearchQuery("");
                }}
                className="w-full mt-6 py-3 rounded-xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200"
              >
                Clear All Filters
              </button>
            </div>

            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-6 shadow-xl text-white">
              <h4 className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Star size={14} className="text-yellow-300" /> Spotlight
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <img src="https://i.pravatar.cc/150?img=12" alt="Featured" className="w-12 h-12 rounded-full border-2 border-white/50" />
                <div>
                  <div className="font-bold text-lg">Maya Chen</div>
                  <div className="text-sky-100 text-xs">@maya.explores</div>
                </div>
              </div>
              <p className="text-sm text-sky-50 mb-4 line-clamp-3">Capturing the raw beauty of the Himalayas. Winner of the 2024 Alpine Vision Award.</p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors">
                View Portfolio
              </button>
            </div>
          </aside>
          */}

          {/* MAIN GRID */}
          <main className="lg:col-span-12 order-1 lg:order-2 space-y-8">

            {/* Control Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-xl shadow-sky-900/5 border border-sky-100 flex flex-col md:flex-row items-center justify-between gap-4">

              <div className="relative w-full md:w-[60%]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400" />
                <input
                  type="text"
                  placeholder="Search adventures, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3.5 bg-sky-50 border border-sky-100 rounded-2xl text-sky-800 font-medium outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 transition-all placeholder:text-sky-300"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full md:w-48 px-5 py-3.5 bg-sky-50 border border-sky-100 rounded-2xl text-sky-800 font-medium outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 transition-all cursor-pointer appearance-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="title">A-Z</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="hidden md:flex p-1.5 bg-sky-50 border border-sky-100 rounded-2xl">
                  {[{ icon: Grid3x3, view: 'grid' },
                  { icon: LayoutGrid, view: 'compact' }]
                  // { icon: Film, view: 'masonry' }]
                  .map(({ icon: Icon, view }) => (
                    <button
                      key={view}
                      onClick={() => setActiveView(view)}
                      className={`p-2.5 rounded-xl transition-all duration-300 ${activeView === view ? 'bg-white shadow-sm text-sky-600' : 'text-sky-400 hover:text-sky-600'}`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between px-2">
              <p className="text-sky-600/80 font-medium">
                Showing <span className="text-sky-700 font-black">{filteredImages.length}</span> stunning captures
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="min-h-[500px]">
              {groupedImages.length > 0 ? (
                <div className="space-y-16">
                  {groupedImages.map((group) => (
                    <div key={group.key}>
                      <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl lg:text-3xl font-black text-sky-900 tracking-tight">
                          {group.key}
                        </h2>
                        <div className="flex-1 h-px bg-sky-100"></div>
                      </div>
                      <div className={`grid gap-6 ${activeView === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' :
                        activeView === 'compact' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4' :
                          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
                        }`}>
                        {group.images.map((image) => {
                          const isHovered = hoveredId === image.id;
                          const isLiked = likedImages[image.id];
                          const isSaved = savedImages[image.id];

                          return (
                            <div
                              key={image.id}
                              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-sky-900/5 border-3 border-blue-400/50 hover:shadow-2xl hover:shadow-sky-900/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col"
                              onMouseEnter={() => setHoveredId(image.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              onClick={() => setSelectedImage(image)}
                            >
                              {/* Image Container */}
                              <div className="relative aspect-[4/5] overflow-hidden p-2 pb-0">
                                <img
                                  src={image.url}
                                  alt={image.title}
                                  className="w-full h-full object-cover rounded-[1.5rem] transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                />

                                {/* Top Badges */}
                                <div className={`absolute top-6 left-6 right-6 flex justify-between items-start transition-all duration-500 transform z-20 ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-sky-700 uppercase tracking-widest shadow-sm">
                                    {image.season}
                                  </span>
                                  <button
                                    onClick={(e) => handleSave(image.id, e)}
                                    className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors text-slate-400 shadow-sm"
                                  >
                                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-sky-500 hover:text-white' : ''}`} />
                                  </button>
                                </div>

                                {/* Center Engagement Overlay */}
                                <div className={`absolute inset-0 flex items-center justify-center gap-6 transition-all duration-500 z-20 bg-sky-900/20 rounded-[1.5rem] m-2 backdrop-blur-[2px] ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                
                                  <div className="p-4 rounded-full bg-white/95 text-sky-600 shadow-xl group-hover:scale-110 transition-all">
                                    <ZoomIn className="w-6 h-6" />
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Info */}
                              <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-slate-800 font-bold text-lg mb-1 truncate group-hover:text-sky-600 transition-colors">
                                  {image.title}
                                </h3>
                                <div className="flex items-center gap-3 text-slate-500 text-xs font-medium mb-4">
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                                    <span className="truncate">{image.region}</span>
                                  </div>
                                </div>


                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-white rounded-3xl border border-slate-100 shadow-xl shadow-sky-900/5">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <X size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 mb-2">
                    No Images Found
                  </h3>
                  <p className="text-slate-500">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>

          </main>
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Mobile/Desktop */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-[60] w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-all"
            >
              <X size={20} />
            </button>

            {/* Image Section - Left */}
            <div className="relative w-full lg:w-3/5 h-[40vh] lg:h-[85vh] bg-slate-50 flex items-center justify-center overflow-hidden group p-4 lg:p-8">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Details Sidebar - Right */}
            <div className="w-full lg:w-2/5 h-[45vh] lg:h-[85vh] overflow-y-auto bg-white p-8 custom-scrollbar">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 border border-sky-100">
                <ImageIcon size={14} /> Gallery Capture
              </div>

              <h2 className="text-3xl font-black text-slate-800 leading-tight mb-6">
                {selectedImage.title}
              </h2>

              {/* Photographer */}
              {/* <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
                <img
                  src={selectedImage.photographerAvatar}
                  alt={selectedImage.photographer}
                  className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                />
                {/* <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Captured By</div>
                  <div className="text-base font-bold text-slate-700">{selectedImage.photographer}</div>
                </div> 
              </div> */}

              {/* Specs Grid */}
              {/* <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: 'Camera', value: selectedImage.camera, icon: Camera },
                  { label: 'Aperture', value: selectedImage.aperture, icon: Aperture },
                  { label: 'Shutter', value: selectedImage.shutter, icon: Clock },
                  { label: 'ISO', value: selectedImage.iso, icon: Film },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Icon className="w-4 h-4 text-sky-500" />
                        <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-700">{item.value}</div>
                    </div>
                  );
                })}
              </div> */}

              {/* Location Data */}
              <div className="space-y-4 mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium flex items-center gap-2"><MapPin size={16} className="text-sky-500" /> Location</span>
                  <span className="text-slate-800 font-bold">{selectedImage.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium flex items-center gap-2"><Calendar size={16} className="text-sky-500" /> Date</span>
                  <span className="text-slate-800 font-bold">{selectedImage.month} {selectedImage.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium flex items-center gap-2"><Star size={16} className="text-sky-500" /> Prime Season</span>
                  <span className="text-slate-800 font-bold">{selectedImage.season}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium flex items-center gap-2"><MapPin size={16} className="text-sky-500" /> Location</span>
                  <span className="text-slate-800 font-bold">{selectedImage.experience}</span>
                </div>
              </div>

              {/* Action Modules */}
              {/* <div className="flex gap-4 mt-auto">
                <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-4 text-sm font-bold shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2">
                  <Download size={18} /> Download
                </button>
                <button className="px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default TrekGalleryPage;