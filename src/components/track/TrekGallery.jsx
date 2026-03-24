// import React from "react";
// import { Link } from "react-router-dom";
// import { Image as ImageIcon, ArrowRight, Sparkles, Terminal, Scan, Camera } from "lucide-react";

// const TrekGallery = ({ trek }) => {
//   if (!trek) return null;

//   const galleryImages = trek.gallery || [];
//   const mainImage = trek.image?.cdnUrl;

//   const displayImages = mainImage ? [
//     { url: mainImage, title: trek.title, tag: "PRIMARY_RECON" },
//     ...galleryImages.map((img, i) => ({
//       url: img.cdnUrl,
//       title: `${trek.title.toUpperCase()}_IMG_${i + 1}`,
//       tag: "FIELD_DATA"
//     }))
//   ] : galleryImages.map((img, i) => ({
//     url: img.cdnUrl,
//     title: `${trek.title.toUpperCase()}_IMG_${i + 1}`,
//     tag: "FIELD_DATA"
//   }));

//   return (
//     <div className="space-y-12">
//       {/* Tactical Header */}
//       <div className="flex flex-col md:flex-row items-end justify-between gap-12">
//         <div className="space-y-6">
//           <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-2 hud-corners">
//             <Terminal size={14} className="text-primary" />
//             <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">VISUAL_RECON_ARCHIVE</span>
//           </div>
//           <h2 className="text-3xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic">
//             Mission <span className="command-gradient">Imagery</span>
//           </h2>
//           <p className="data-text text-primary/40 text-[11px] leading-relaxed uppercase tracking-widest max-w-lg">
//             [SYS_SCAN] {">"} High-resolution topographical captures and crew-documented encounters
//             from the {trek.title.replace(/ /g, '_')} mission sector.
//           </p>
//         </div>

//         <Link
//           to="/trek-gallery"
//           className="group flex items-center gap-4 px-10 py-5 bg-white/[0.02] hud-panel border-white/10 text-white data-text text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-obsidian hover:border-primary transition-all duration-500"
//         >
//           VIEW_FULL_LOGS
//           <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
//         </Link>
//       </div>

//       {/* Recon Imagery Grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {displayImages.slice(0, 5).map((img, index) => (
//           <div
//             key={index}
//             className={`group relative overflow-hidden hud-panel border-white/5 transition-all duration-700 hover:border-primary/40 ${index === 0 ? "col-span-2 row-span-2 h-[500px]" : "h-[242px]"
//               }`}
//           >
//             {/* Visual Stream Layer */}
//             <img
//               src={img.url}
//               alt={img.title}
//               className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-40 group-hover:opacity-100"
//             />

//             {/* HUD Scanline micro-animation */}
//             <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-primary/10 to-transparent h-20 w-full animate-scanline opacity-0 group-hover:opacity-100 transition-opacity"></div>

//             {/* Tactical Overlays */}
//             <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent flex flex-col justify-end p-8">
//               <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                 <div className="flex items-center gap-2">
//                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
//                   <span className="data-text text-[8px] font-black uppercase tracking-widest text-primary">{img.tag}</span>
//                 </div>
//                 <h4 className="data-text text-white font-black text-[10px] leading-tight uppercase tracking-wider">{img.title}</h4>
//               </div>
//             </div>

//             {/* Sector Metadata Corner */}
//             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
//               <div className="hud-panel p-3 bg-obsidian/80 backdrop-blur-md border-primary/20 text-primary">
//                 <Camera size={14} />
//               </div>
//             </div>

//             <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-40">
//               <span className="data-text text-[6px] text-white">RECON_ID_{index + 504}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrekGallery;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Terminal,
  Scan,
  Camera,
  MapPin,
  Calendar,
  Star,
  Heart,
  Download,
  Maximize2,
  Eye,
  Clock,
  Film,
  Aperture,
  ZoomIn
} from "lucide-react";

const TrekGallery = ({ trek }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [likedImages, setLikedImages] = useState({});

  if (!trek) return null;

  const galleryImages = trek.gallery || [];
  const mainImage = trek.image?.cdnUrl;

  // Enhanced display images with photography metadata
  const displayImages = mainImage ? [
    {
      url: mainImage,
      title: trek.title,
      tag: "HERO SHOT",
      photographer: "@mountain.captures",
      camera: "SONY α7 IV",
      aperture: "f/2.8",
      shutter: "1/1000s",
      iso: "100",
      location: trek.location,
      date: "Sept 2025",
      likes: 234,
      composition: "Rule of Thirds"
    },
    ...galleryImages.map((img, i) => ({
      url: img.cdnUrl,
      title: `${trek.title} - Frame ${i + 1}`,
      tag: i % 2 === 0 ? "ACTION SHOT" : "LANDSCAPE",
      photographer: ["@alex.creates", "@maya.lens", "@peak.captures"][i % 3],
      camera: ["SONY α7 IV", "FUJI X-T5", "CANON R5"][i % 3],
      aperture: ["f/2.8", "f/4", "f/5.6"][i % 3],
      shutter: ["1/500s", "1/1000s", "1/2000s"][i % 3],
      iso: ["100", "200", "400"][i % 3],
      location: trek.location,
      date: `Sept ${2025 - i}`,
      likes: Math.floor(Math.random() * 300) + 100,
      composition: ["Golden Hour", "Leading Lines", "Framing"][i % 3]
    }))
  ] : galleryImages.map((img, i) => ({
    url: img.cdnUrl,
    title: `${trek.title} - Frame ${i + 1}`,
    tag: i % 2 === 0 ? "ACTION SHOT" : "LANDSCAPE",
    photographer: ["@alex.creates", "@maya.lens", "@peak.captures"][i % 3],
    camera: ["SONY α7 IV", "FUJI X-T5", "CANON R5"][i % 3],
    aperture: ["f/2.8", "f/4", "f/5.6"][i % 3],
    shutter: ["1/500s", "1/1000s", "1/2000s"][i % 3],
    iso: ["100", "200", "400"][i % 3],
    location: trek.location,
    date: `Sept ${2025 - i}`,
    likes: Math.floor(Math.random() * 300) + 100,
    composition: ["Golden Hour", "Leading Lines", "Framing"][i % 3]
  }));

  const handleLike = (index, e) => {
    e.stopPropagation();
    setLikedImages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="space-y-12">
      {/* ===== Photography Header ===== */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-4 
                          bg-white/5 backdrop-blur-sm 
                          border border-sky-400/30 rounded-full 
                          px-6 py-3
                          hover:border-sky-400/60 transition-all
                          shadow-lg shadow-sky-500/10">
            <Camera size={16} className="text-sky-400 animate-pulse" />
            <span className="text-sky-400 text-xs font-bold tracking-[0.3em] uppercase">
              PHOTOGRAPHY ARCHIVE
            </span>
            <Sparkles size={14} className="text-sky-400 animate-sparkle" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-blue-900 leading-none tracking-tight flex flex-wrap md:flex-nowrap items-center gap-3">
            <span>Mission</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-blue-400 animate-gradient">
              Imagery
            </span>
          </h2>

        </div>

        <Link
          to="/trek-gallery"
          className="group flex items-center gap-3 
                     bg-white/5 backdrop-blur-sm 
                     border border-sky-400/30 rounded-full 
                     px-8 py-4
                     hover:border-sky-400/60 hover:bg-white/10 
                     transition-all shadow-lg shadow-sky-500/10"
        >
          <span className="text-sky-400 text-sm font-medium tracking-wide">VIEW FULL GALLERY</span>
          <ArrowRight size={16} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ===== Photography Grid ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {displayImages.slice(0, 5).map((img, index) => {
          const isHovered = hoveredImage === index;
          const isLiked = likedImages[index];

          return (
            <div
              key={index}
              className={`group relative perspective-1000
                         ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setSelectedImage(img)}
            >
              {/* 3D Card Container */}
              <div className={`relative w-full h-full transition-all duration-700
                              ${isHovered ? 'rotateY-5 scale-105' : ''}`}
                style={{
                  height: index === 0 ? '600px' : '280px',
                }}>

                {/* Glow Effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-sky-400/30 to-blue-400/30 
                                rounded-3xl blur-xl transition-opacity duration-500
                                ${isHovered ? 'opacity-50' : 'opacity-0'}`} />

                {/* Main Card */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden
                                bg-white/5 backdrop-blur-sm 
                                border-2 transition-all duration-500
                                shadow-2xl shadow-sky-500/20
                                cursor-pointer
                                ${isHovered 
                                  ? 'border-sky-400' 
                                  : 'border-sky-400/30 hover:border-sky-400/60'}"
                  style={{
                    transform: isHovered
                      ? `perspective(1000px) rotateX(2deg) rotateY(2deg)`
                      : 'none'
                  }}>

                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover transition-all duration-1000
                                 group-hover:scale-110"
                      style={{
                        filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)'
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t 
                                    from-[#0A3B5E] via-transparent to-transparent 
                                    opacity-60" />

                    {/* Top Left - Camera Info */}
                    {/* <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm 
                                      rounded-full px-4 py-2 border border-white/20">
                        <Camera className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-medium text-white">{img.camera}</span>
                      </div>
                    </div> */}

                    {/* Top Right - Like Button */}
                   

                    {/* Center - Quick View (appears on hover) */}
                    <div className={`absolute inset-0 flex items-center justify-center
                                    transition-opacity duration-500
                                    ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4
                                      border border-white/20">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Bottom - Photography Metadata */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 
                                    bg-gradient-to-t from-black/90 via-black/60 to-transparent">

                      {/* Title & Tag */}
                      <div className="mb-3">
                        {/* <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-sky-400 tracking-wider">
                            {img.tag}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-sky-400"></div>
                          <span className="text-xs text-white/60">{img.composition}</span>
                        </div> */}
                        <h4 className="text-lg font-bold text-white line-clamp-1">
                          {img.title}
                        </h4>
                      </div>


                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 
                                      bg-gradient-to-br from-sky-400/30 to-transparent
                                      transform rotate-45 translate-x-4 -translate-y-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Lightbox Modal ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>
          <div
            className="relative max-w-6xl w-full bg-white/10 backdrop-blur-2xl 
                       border-2 border-sky-400/30 rounded-3xl overflow-hidden
                       animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            {/* Lightbox Metadata */}
            <div className="absolute bottom-0 left-0 right-0 
                            bg-gradient-to-t from-black/90 via-black/60 to-transparent
                            p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>

                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-12 h-12 bg-black/50 rounded-full
                           flex items-center justify-center
                           hover:bg-rose-500/80 transition-colors
                           border border-white/20"
                >
                  <ArrowRight className="w-6 h-6 text-white rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotateY-5 {
          transform: rotateY(5deg);
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default TrekGallery;