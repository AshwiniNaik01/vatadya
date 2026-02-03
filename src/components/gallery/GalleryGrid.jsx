// import React from "react";
// import { Maximize2, MapPin, Calendar } from "lucide-react";

// const GalleryGrid = ({ images }) => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//             {images.map((img, index) => (
//                 <div
//                     key={img.id}
//                     className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-2"
//                 >
//                     {/* Image Container */}
//                     <div className="relative aspect-[4/5] overflow-hidden">
//                         <img
//                             src={img.url}
//                             alt={img.title}
//                             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
//                         />
//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
//                             <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
//                                     <MapPin size={12} />
//                                     {img.region}
//                                 </div>
//                                 <h3 className="text-2xl font-black leading-tight">
//                                     {img.title}
//                                 </h3>
//                                 <div className="flex items-center gap-3 text-xs opacity-80">
//                                     <span className="flex items-center gap-1">
//                                         <Calendar size={12} /> {img.month} {img.year}
//                                     </span>
//                                     <span className="px-2 py-0.5 bg-white/20 rounded-md backdrop-blur-md">
//                                         {img.experience}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* View Button */}
//                         <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-emerald-500 transition-all duration-300 transform scale-75 group-hover:scale-100">
//                             <Maximize2 size={20} />
//                         </button>
//                     </div>

//                     {/* Info Section (Visible on Hover/Light variant) */}
//                     <div className="p-6 bg-white border-t border-gray-50 flex items-center justify-between">
//                         <div className="space-y-1">
//                             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{img.season} Season</p>
//                             <h4 className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{img.title}</h4>
//                         </div>
//                         <div className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
//                             {img.year}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default GalleryGrid;

import React, { useState, useEffect } from "react";
import { Maximize2, MapPin, Calendar } from "lucide-react";
import { DIR } from "../../config/constants";
import { fetchTrekGallery } from "../gallery/galleryApi";
// import { fetchTrekGallery } from "../../api/galleryApi";

const GalleryGrid = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);

        const result = await fetchTrekGallery();

        if (Array.isArray(result.data) && result.data.length > 0) {
          const galleryItems = result.data.map((item, index) => ({
            id: `${item.photo}-${index}`,
            url: item.photo.cdnUrl || "",
            title: item.title,
            month: item.month,
            year: item.year,
            season: item.season,
            experience: item.experience,
            region: item.region,
          }));

          setImages(galleryItems);
        } else {
          setError("No gallery items found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading gallery...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {images.map((img) => (
        <div
          key={img.id}
          className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-xl transition-all"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <MapPin size={12} /> {img.region}
                </div>
                <h3 className="text-xl font-bold">{img.title}</h3>
                <div className="flex items-center gap-3 text-xs">
                  <Calendar size={12} /> {img.month} {img.year}
                </div>
              </div>
            </div>

            <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
              <Maximize2 size={18} />
            </button>
          </div>

          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-emerald-600 font-semibold">
                {img.season} Season
              </p>
              <p className="text-sm font-bold truncate">{img.title}</p>
            </div>
            <span className="text-xs text-gray-400 font-bold">{img.year}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
