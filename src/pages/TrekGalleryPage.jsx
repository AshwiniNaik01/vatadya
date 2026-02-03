// import React, { useState, useMemo } from "react";
// import GalleryFilters from "../components/gallery/GalleryFilters";
// import GalleryGrid from "../components/gallery/GalleryGrid";
// import { Filter, SlidersHorizontal, LayoutGrid } from "lucide-react";

// const galleryImages = [
//     {
//         id: 1,
//         url: "https://images.prismic.io/indiahike/f0e8c174-54f0-47db-97fe-b19f90bb47ad_Lohajung_Brahmatal_Drone_shot_Vignesh2.jpg",
//         title: "Drone View of Lohajung",
//         month: "December",
//         year: "2024",
//         experience: "Moderate",
//         season: "Winter",
//         region: "Uttarakhand",
//     },
//     {
//         id: 2,
//         url: "https://images.prismic.io/indiahike/37f413f1-5df0-46dc-8a01-43539aeb1d9f_Brahmatal-Trek_Guhanesan-Sivalingam_Sunset-View-from-Tilandi-Campsite_1_.jpg",
//         title: "Sunset at Tilandi",
//         month: "January",
//         year: "2024",
//         experience: "Beginner",
//         season: "Winter",
//         region: "Uttarakhand",
//     },
//     {
//         id: 3,
//         url: "https://images.prismic.io/indiahike/d7b174bc-af90-4c41-89fa-4a55c8d5c76c_Brahmatal_BT_Indiahikes_VishwajeetChavan_brahmatalcampsite_campsite_winter_.jpg",
//         title: "Brahmatal Campsite",
//         month: "February",
//         year: "2024",
//         experience: "Advanced",
//         season: "Winter",
//         region: "Uttarakhand",
//     },
//     {
//         id: 4,
//         url: "https://images.prismic.io/indiahike/43a8c497-80a5-46c7-9ca7-2b1c5020acfb_Brahmatal+-+Khorurai+-+Forest+-+Snow+-+Winter+-+Abhishek+M+-+++Indiahikes.jpg",
//         title: "Forest Trails in Snow",
//         month: "December",
//         year: "2023",
//         experience: "Moderate",
//         season: "Winter",
//         region: "Uttarakhand",
//     },
//     {
//         id: 5,
//         url: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
//         title: "Valley View",
//         month: "March",
//         year: "2025",
//         experience: "Beginner",
//         season: "Spring",
//         region: "Himachal",
//     },
//     {
//         id: 6,
//         url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
//         title: "Alpine Lake",
//         month: "April",
//         year: "2024",
//         experience: "Moderate",
//         season: "Spring",
//         region: "Kashmir",
//     },
//     // Add more items to mock the grid better
//     {
//         id: 7,
//         url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//         title: "High Mountain Pass",
//         month: "June",
//         year: "2024",
//         experience: "Advanced",
//         season: "Summer",
//         region: "Himachal",
//     },
//     {
//         id: 8,
//         url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
//         title: "Misty Valleys",
//         month: "September",
//         year: "2024",
//         experience: "Moderate",
//         season: "Autumn",
//         region: "Uttarakhand",
//     },
// ];

// const TrekGalleryPage = () => {
//     const [filters, setFilters] = useState({
//         month: "All",
//         year: "All",
//         experience: "All",
//         season: "All",
//         region: "All",
//     });
//     const [sortBy, setSortBy] = useState("newest");
//     const [searchQuery, setSearchQuery] = useState("");

//     const filteredImages = useMemo(() => {
//         return galleryImages
//             .filter((img) => {
//                 return (
//                     (filters.month === "All" || img.month === filters.month) &&
//                     (filters.year === "All" || img.year === filters.year) &&
//                     (filters.experience === "All" || img.experience === filters.experience) &&
//                     (filters.season === "All" || img.season === filters.season) &&
//                     (filters.region === "All" || img.region === filters.region) &&
//                     (img.title.toLowerCase().includes(searchQuery.toLowerCase()))
//                 );
//             })
//             .sort((a, b) => {
//                 if (sortBy === "newest") return b.id - a.id;
//                 if (sortBy === "oldest") return a.id - b.id;
//                 if (sortBy === "title") return a.title.localeCompare(b.title);
//                 return 0;
//             });
//     }, [filters, sortBy, searchQuery]);

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Hero Header */}
//             <div className="relative pt-20 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
//                 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

//                 <div className="max-w-8xl mx-auto relative z-10 text-center space-y-4">
//                     <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
//                         EXPLORE THE WILD
//                     </span>
//                     <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
//                         Trek <span className="text-emerald-600">Gallery</span>
//                     </h1>
//                     <p className="text-gray-500 max-w-2xl mx-auto text-md font-medium">
//                         A visual journey through the most breathtaking landscapes and unforgettable moments captured on our trails.
//                     </p>
//                 </div>
//             </div>

//             <div className="max-w-8xl mx-auto px-6 md:px-4 py-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
//                     {/* Sidebar Filters */}
//                     <aside className="lg:col-span-1 space-y-8">
//                         <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sticky top-24">
//                             <div className="flex items-center gap-2 mb-8 text-gray-900">
//                                 <SlidersHorizontal size={20} className="text-emerald-500" />
//                                 <h3 className="text-xl font-bold">Filters</h3>
//                             </div>

//                             <GalleryFilters filters={filters} setFilters={setFilters} />

//                             <button
//                                 onClick={() => setFilters({
//                                     month: "All",
//                                     year: "All",
//                                     experience: "All",
//                                     season: "All",
//                                     region: "All",
//                                 })}
//                                 className="w-full mt-8 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
//                             >
//                                 Reset All
//                             </button>
//                         </div>
//                     </aside>

//                     {/* Main Content */}
//                     <main className="lg:col-span-3 space-y-8">
//                         {/* Top Bar */}
//                         <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white shadow-sm">
//                             <div className="relative w-full md:w-96">
//                                 <input
//                                     type="text"
//                                     placeholder="Search adventures..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm font-medium"
//                                 />
//                             </div>

//                             <div className="flex items-center gap-4 w-full md:w-auto">
//                                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest shrink-0">Sort By</span>
//                                 <select
//                                     value={sortBy}
//                                     onChange={(e) => setSortBy(e.target.value)}
//                                     className="w-full md:w-48 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all"
//                                 >
//                                     <option value="newest">Newest First</option>
//                                     <option value="oldest">Oldest First</option>
//                                     <option value="title">Title (A-Z)</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Results Count */}
//                         <div className="px-2 flex items-center justify-between">
//                             <p className="text-gray-400 font-medium">
//                                 Showing <span className="text-gray-900 font-bold">{filteredImages.length}</span> stunning captures
//                             </p>
//                             <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
//                                 <LayoutGrid size={14} />
//                                 Grid View
//                             </div>
//                         </div>

//                         {/* Grid */}
//                         <GalleryGrid images={filteredImages} />

//                         {filteredImages.length === 0 && (
//                             <div className="py-20 text-center space-y-4">
//                                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
//                                     <Filter size={40} />
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-900">No results found</h3>
//                                 <p className="text-gray-500">Try adjusting your filters to find more adventures.</p>
//                             </div>
//                         )}
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TrekGalleryPage;


import React, { useState, useEffect, useMemo } from "react";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { Filter, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { fetchTrekGallery } from "../components/gallery/galleryApi";
import { DIR } from "../config/constants";
// import { fetchTrekGallery } from "../api/galleryApi";
// import { DIR } from "../config/constants";

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

  // --- Gallery Data ---
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch gallery once ---
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const result = await fetchTrekGallery();

        const mapped = result.data.map((item, index) => ({
          id: index + 1,
          url: `${DIR.TrekGalleryImage}${item.photo}`,
          title: item.title,
          month: item.month,
          year: item.year,
          experience: item.experience,
          season: item.season,
          region: item.region,
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
        return 0;
      });
  }, [galleryImages, filters, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative pt-20 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60"></div>

        <div className="max-w-8xl mx-auto relative z-10 text-center space-y-4">
          <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
            EXPLORE THE WILD
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Trek <span className="text-emerald-600">Gallery</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-md font-medium">
            A visual journey through the most breathtaking landscapes and unforgettable moments captured on our trails.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 md:px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="p-4 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sticky top-24">
              <div className="flex items-center gap-2 mb-8 text-gray-900">
                <SlidersHorizontal size={20} className="text-emerald-500" />
                <h3 className="text-xl font-bold">Filters</h3>
              </div>

              <GalleryFilters filters={filters} setFilters={setFilters} />

              <button
                onClick={() =>
                  setFilters({
                    month: "All",
                    year: "All",
                    experience: "All",
                    season: "All",
                    region: "All",
                  })
                }
                className="w-full mt-8 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Reset All
              </button>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-3 space-y-8">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white shadow-sm">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search adventures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest shrink-0">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-48 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="px-2 flex items-center justify-between">
              <p className="text-gray-400 font-medium">
                Showing <span className="text-gray-900 font-bold">{filteredImages.length}</span> stunning captures
              </p>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                <LayoutGrid size={14} />
                Grid View
              </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <p className="text-center text-gray-400 py-20">Loading gallery...</p>
            ) : filteredImages.length > 0 ? (
              <GalleryGrid images={filteredImages} />
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Filter size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">No results found</h3>
                <p className="text-gray-500">Try adjusting your filters to find more adventures.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TrekGalleryPage;

