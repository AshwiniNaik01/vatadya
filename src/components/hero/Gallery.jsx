// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight, Sparkles, X, ArrowRight, Image as ImageIcon, Terminal, Activity, Scan, Target, Database } from 'lucide-react';
// import { fetchTrekGallery } from '../../api/galleryApi';

// const Gallery = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadGallery = async () => {
//       try {
//         const result = await fetchTrekGallery();
//         if (result && Array.isArray(result.data)) {
//           // Take only the first 6 images for the section
//           const mappedImages = result.data.slice(0, 6).map((item) => ({
//             url: item.photo?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
//             category: (item.season || item.region || "FIELD_DATA").toUpperCase(),
//             title: (item.title || "Trek Moment").toUpperCase()
//           }));
//           setGalleryImages(mappedImages);
//         }
//       } catch (error) {
//         console.error("Failed to load gallery images:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadGallery();
//   }, []);

//   if (loading) {
//     return (
//       <div className="py-24 bg-obsidian flex flex-col items-center justify-center gap-6">
//         <Database className="w-12 h-12 text-primary animate-pulse" />
//         <p className="data-text text-[10px] font-black uppercase tracking-[0.4em] text-primary animate-pulse">BUFFERING_VISUAL_LOGS...</p>
//       </div>
//     );
//   }

//   // Fallback if no images found
//   if (galleryImages.length === 0) {
//     return null;
//   }

//   return (
//     <section id="gallery" className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
//       {/* Tactical Background Elements */}
//       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
//         <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24 animate-fade-in">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
//               <ImageIcon size={14} className="text-primary" />
//               <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">RECON_VISUAL_ARCHIVE_v4</span>
//             </div>
//             <h2 className="text-4xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase italic">
//               Atmospheric <br />
//               <span className="command-gradient">Recon</span>
//             </h2>
//             <p className="data-text text-primary/40 text-sm leading-relaxed uppercase tracking-widest max-w-xl">
//               [SYS_SCAN] {">"} High-fidelity visual artifacts recovered from active mission sectors.
//               Each node represents a verified topographical encounter captured by field units.
//             </p>
//           </div>

//           <Link
//             to="/trek-gallery"
//             className="group flex items-center gap-4 px-10 py-5 bg-white/[0.02] hud-panel border-white/10 text-white data-text text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-obsidian hover:border-primary hover:glow-primary transition-all duration-700"
//           >
//             OPEN_FULL_DATABASE
//             <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {galleryImages.map((image, index) => (
//             <div
//               key={index}
//               className="relative group cursor-pointer overflow-hidden hud-panel border-white/5 aspect-[3/4] transition-all duration-700 hover-lift animate-slide-up"
//               style={{ animationDelay: `${index * 0.1}s` }}
//               onClick={() => setSelectedImage(image.url)}
//             >
//               <img
//                 src={image.url}
//                 alt={image.title}
//                 className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
//               />

//               {/* HUD Scanline micro-animation */}
//               <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-primary/10 to-transparent h-20 w-full animate-scanline opacity-0 group-hover:opacity-100 transition-opacity"></div>

//               <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
//                 <span className="data-text text-[8px] font-black uppercase tracking-[0.3em] text-primary mb-2">{image.category}</span>
//                 <span className="data-text text-white font-black text-[10px] leading-tight uppercase tracking-wider">{image.title}</span>
//               </div>

//               {/* Corner Tagging */}
//               <div className="absolute top-4 right-4 text-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
//                 <Target size={14} />
//               </div>
//               <div className="absolute bottom-4 right-4 data-text text-[6px] text-white/10 opacity-0 group-hover:opacity-40 transition-opacity">
//                 RECON_NODE_0x{index + 72}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* High-Fidelity Lightbox Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 z-[200] bg-obsidian/95 backdrop-blur-3xl flex items-center justify-center p-10 animate-fade-in">
//           {/* Tactical Overlay for modal */}
//           <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
//             style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
//           </div>

//           <button
//             className="absolute top-10 right-10 w-16 h-16 hud-panel border-white/5 bg-white/5 text-white/20 hover:text-red-500 hover:border-red-500/40 flex items-center justify-center transition-all duration-500 z-50 group"
//             onClick={() => setSelectedImage(null)}
//           >
//             <X size={28} className="group-hover:rotate-90 transition-transform" />
//           </button>

//           <div className="relative max-w-7xl w-full flex items-center gap-12 z-10">
//             <button
//               className="hidden md:flex w-20 h-40 hud-panel border-white/5 bg-white/5 text-white/10 hover:text-primary hover:border-primary/40 rounded-sm shrink-0 items-center justify-center transition-all duration-500 group"
//               onClick={() => {
//                 const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
//                 const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
//                 setSelectedImage(galleryImages[prevIndex].url);
//               }}
//             >
//               <ChevronLeft size={48} className="group-hover:-translate-x-3 transition-transform" />
//             </button>

//             <div className="w-full relative group hud-panel border-white/10 overflow-hidden bg-obsidian flex items-center justify-center">
//               {/* Visual Scanline for lightbox */}
//               <div className="absolute inset-x-0 top-0 h-1 bg-primary/20 animate-scanline z-20 pointer-events-none"></div>

//               <img
//                 src={selectedImage}
//                 alt="Enlarged recon visual"
//                 className="w-full h-auto max-h-[85vh] object-contain grayscale group-hover:grayscale-0 transition-all duration-1000"
//               />

//               {/* Internal HUD data labels */}
//               <div className="absolute bottom-8 left-8 flex flex-col gap-2 opacity-40">
//                 <div className="flex items-center gap-3">
//                   <Activity size={12} className="text-secondary animate-pulse" />
//                   <span className="data-text text-[7px] text-white uppercase tracking-widest">DATA_FEED_SECURE</span>
//                 </div>
//                 <div className="data-text text-[7px] text-white uppercase tracking-widest">ZOOM_OPT_v9.2</div>
//               </div>
//             </div>

//             <button
//               className="hidden md:flex w-20 h-40 hud-panel border-white/5 bg-white/5 text-white/10 hover:text-primary hover:border-primary/40 rounded-sm shrink-0 items-center justify-center transition-all duration-500 group"
//               onClick={() => {
//                 const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
//                 const nextIndex = (currentIndex + 1) % galleryImages.length;
//                 setSelectedImage(galleryImages[nextIndex].url);
//               }}
//             >
//               <ChevronRight size={48} className="group-hover:translate-x-3 transition-transform" />
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Gallery;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  X, 
  ArrowRight, 
  Image as ImageIcon, 
  Terminal, 
  Activity, 
  Scan, 
  Target, 
  Database,
  Camera,
  MapPin,
  Calendar,
  Eye,
  Heart,
  ZoomIn,
  Share2,
  Download,
  Film,
  Clock,
  Star
} from 'lucide-react';
import { fetchTrekGallery } from '../../api/galleryApi';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedImages, setLikedImages] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const result = await fetchTrekGallery();
        if (result && Array.isArray(result.data)) {
          // Take only the first 6 images for the section
          const mappedImages = result.data.slice(0, 6).map((item, index) => ({
            id: index,
            url: item.photo?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
            category: (item.season || item.region || "FIELD DATA").toUpperCase(),
            title: (item.title || "Trek Moment").toUpperCase(),
            // Generate photography metadata from available data
            photographer: item.photographer || ["Alex Rivera", "Maya Chen", "James Wilson"][index % 3],
            handle: item.handle || ["@alex.rivera", "@maya.chen", "@james.wilson"][index % 3],
            camera: item.camera || ["SONY α7 IV", "FUJIFILM X-T5", "CANON EOS R5"][index % 3],
            aperture: item.aperture || ["f/2.8", "f/4", "f/5.6"][index % 3],
            shutter: item.shutter || ["1/1000s", "1/500s", "1/250s"][index % 3],
            iso: item.iso || ["100", "200", "400"][index % 3],
            location: item.region || "Himalayas",
            season: item.season || "Autumn",
            month: item.month || "September",
            year: item.year || "2025",
            likes: Math.floor(Math.random() * 300) + 100,
            views: Math.floor(Math.random() * 1000) + 500,
            composition: ["Leading Lines", "Golden Hour", "Rule of Thirds", "Symmetry"][index % 4],
            mood: ["Serene", "Epic", "Intimate", "Dramatic"][index % 4]
          }));
          setGalleryImages(mappedImages);
        }
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const handleLike = (index, e) => {
    e.stopPropagation();
    setLikedImages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image.url);
    setSelectedImageData(image);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B2B4A] to-[#0A4B72] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
          <Camera className="relative w-16 h-16 text-sky-400 animate-pulse" />
        </div>
        <p className="text-sky-400/80 text-sm font-light tracking-[0.3em] uppercase animate-pulse">
          LOADING PHOTOGRAPHY ARCHIVE
        </p>
      </div>
    );
  }

  // Fallback if no images found
  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="relative py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B2B4A 0%, #0A3B5E 30%, #0A4B72 70%, #0B5B86 100%)',
      }}>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-4 
                            bg-white/5 backdrop-blur-sm 
                            border border-sky-400/30 rounded-full 
                            px-6 py-3 mb-6
                            hover:border-sky-400/60 transition-all
                            shadow-lg shadow-sky-500/10">
              <Camera size={16} className="text-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-bold tracking-[0.3em] uppercase">
               MOMENTS & MEMORIES
              </span>
              <Sparkles size={14} className="text-sky-400 animate-sparkle" />
            </div>

           <h2 className="text-5xl md:text-7xl font-black text-white 
               leading-none tracking-tight mb-6 flex flex-wrap items-center gap-4">
  Alpine
  <span className="text-transparent bg-clip-text 
                   bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500
                   animate-gradient">
    Gallery
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
            <span className="text-white text-sm font-medium tracking-wide">VIEW FULL ARCHIVE</span>
            <ArrowRight size={16} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {galleryImages.map((image, index) => {
            const isHovered = hoveredIndex === index;
            const isLiked = likedImages[index];

            return (
              <div
                key={index}
                className="group relative perspective-1000 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(image, index)}
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
              >
                {/* 3D Card Container */}
                <div className={`relative w-full transition-all duration-700
                                ${isHovered ? 'rotateY-5 scale-105 z-10' : 'z-0'}`}>
                  
                  {/* Glow Effect */}
                  <div className={`absolute -inset-2 bg-gradient-to-r from-sky-400/30 to-blue-400/30 
                                  rounded-2xl blur-xl transition-opacity duration-500
                                  ${isHovered ? 'opacity-50' : 'opacity-0'}`} />

                  {/* Main Card */}
                  <div className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden
                                  bg-white/5 backdrop-blur-sm 
                                  border-2 transition-all duration-500
                                  shadow-2xl shadow-sky-500/20
                                  ${isHovered 
                                    ? 'border-sky-400 shadow-2xl shadow-sky-500/40' 
                                    : 'border-sky-400/30'}`}
                       style={{
                         transform: isHovered 
                           ? `perspective(1000px) rotateX(2deg) rotateY(2deg)` 
                           : 'none'
                       }}>
                    
                    {/* Image */}
                    <img
                      src={image.url}
                      alt={image.title}
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

                    {/* Top Row - Category & Like */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm 
                                       rounded-full text-[8px] font-bold text-sky-400
                                       border border-white/20">
                        {image.category}
                      </span>
            
                    </div>

                    {/* Center - Quick View Icon (appears on hover) */}
                    <div className={`absolute inset-0 flex items-center justify-center
                                    transition-opacity duration-500
                                    ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="bg-black/50 backdrop-blur-md rounded-xl p-3
                                      border border-white/20">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Bottom Info Panel */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 
                                    bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                      
                      {/* Title */}
                      <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">
                        {image.title}
                      </h4>

                    


                   
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div className="absolute top-0 right-0 w-6 h-6 
                                      bg-gradient-to-br from-sky-400/30 to-transparent
                                      transform rotate-45 translate-x-3 -translate-y-3" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
             onClick={() => {
               setSelectedImage(null);
               setSelectedImageData(null);
             }}>
          
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-md
                       rounded-full flex items-center justify-center
                       hover:bg-rose-500/80 transition-all
                       border border-white/20 z-30"
            onClick={() => {
              setSelectedImage(null);
              setSelectedImageData(null);
            }}
          >
            <X size={20} className="text-white" />
          </button>

          {/* Navigation */}
          <div className="relative max-w-7xl w-full flex items-center gap-4 z-20">
            <button
              className="hidden md:flex w-12 h-24 bg-black/50 backdrop-blur-md
                         rounded-xl items-center justify-center
                         hover:bg-sky-500/50 transition-all
                         border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
                const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                setSelectedImage(galleryImages[prevIndex].url);
                setSelectedImageData(galleryImages[prevIndex]);
              }}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            {/* Image Container */}
            <div className="flex-1 relative rounded-2xl overflow-hidden
                            border-2 border-sky-400/30 bg-black/50"
                 onClick={(e) => e.stopPropagation()}>
              
              <img
                src={selectedImage}
                alt="Enlarged recon visual"
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              {/* Lightbox Metadata Panel */}
              <div className="absolute bottom-0 left-0 right-0 
                              bg-gradient-to-t from-black/95 via-black/80 to-transparent
                              p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{selectedImageData.title}</h3>
                      <span className="px-2 py-1 bg-sky-500/20 text-sky-400 
                                     rounded-full text-[10px] border border-sky-500/30">
                        {selectedImageData.category}
                      </span>
                    </div>

                  </div>

              
                </div>
              </div>
            </div>

            <button
              className="hidden md:flex w-12 h-24 bg-black/50 backdrop-blur-md
                         rounded-xl items-center justify-center
                         hover:bg-sky-500/50 transition-all
                         border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
                const nextIndex = (currentIndex + 1) % galleryImages.length;
                setSelectedImage(galleryImages[nextIndex].url);
                setSelectedImageData(galleryImages[nextIndex]);
              }}
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
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
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Gallery;