// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   X,
//   ArrowRight,
//   Camera,
//   MapPin,
//   Calendar,
//   ZoomIn,
//   Search,
//   Filter
// } from "lucide-react";
// import { fetchTrekGallery } from "../../api/galleryApi";

// const Gallery = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedImageData, setSelectedImageData] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     const loadGallery = async () => {
//       try {
//         const result = await fetchTrekGallery();
//         if (result && Array.isArray(result.data)) {
//           // Take only the first 6 images for the section
//           const mappedImages = result.data.slice(0, 6).map((item, index) => ({
//             id: index,
//             url: item.photo?.cdnUrl || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3",
//             title: (item.title || "Trek Moment"),
//             location: item.region || "Himalayas",
//             month: item.month || "September",
//             year: item.year || "2025",
//             experience: item.experience || "Wilderness",
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
//       <div className="py-40 bg-[#020617] flex flex-col items-center justify-center gap-6">
//         <Camera className="w-12 h-12 text-cyan-500 animate-bounce" />
//         <p className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-[10px]">Developing Moments...</p>
//       </div>
//     );
//   }

//   if (galleryImages.length === 0) return null;

//   return (
//     <section id="gallery" className="relative py-24 bg-[#020617] overflow-hidden selection:bg-cyan-500 selection:text-white">

//       {/* ================= DESK DECORATIONS ================= */}

//       {/* Top Left: Plant */}
//       <div className="absolute top-10 -left-20 w-80 h-80 opacity-40 pointer-events-none z-10 rotate-12">
//         <img
//           src="https://images.unsplash.com/photo-1485955900006-10f4d324d446?q=80&w=800"
//           alt="Plant"
//           className="w-full h-full object-contain filter brightness-75"
//         />
//       </div>

//       {/* Top Right: Coffee */}
//       <div className="absolute top-20 -right-20 w-64 h-64 opacity-50 pointer-events-none z-10 -rotate-12">
//         <img
//           src="https://images.unsplash.com/photo-1544787210-2213d2429f1b?q=80&w=800"
//           alt="Coffee"
//           className="w-full h-full object-contain filter brightness-90"
//         />
//       </div>

//       {/* Bottom Right: Polaroids */}
//       <div className="absolute bottom-20 -right-10 w-72 h-72 pointer-events-none z-10 hidden xl:block">
//         <div className="relative w-full h-full">
//           <div className="absolute top-0 right-0 w-44 bg-white p-2 pb-8 shadow-2xl transform rotate-6 border border-gray-100">
//             <img src={galleryImages[0]?.url} className="w-full h-32 object-cover" alt="Polaroid 1" />
//           </div>
//           <div className="absolute top-8 right-8 w-44 bg-white p-2 pb-8 shadow-2xl transform -rotate-12 border border-gray-100 z-10">
//             <img src={galleryImages[1]?.url} className="w-full h-32 object-cover" alt="Polaroid 2" />
//             <p className="mt-2 text-[10px] font-handwriting text-gray-500 text-center italic">Alpine Memories</p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-6 relative z-20">

//         {/* Header Branding */}
//         <div className="text-center mb-16">
//           <h2 className="text-cyan-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Field Documentation</h2>
//           <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6">Pinhole <span className="text-cyan-400">Archive</span></h1>
//           <div className="w-16 h-0.5 bg-cyan-500 mx-auto"></div>
//         </div>

//         {/* THE CENTRAL CARD CONTAINER */}
//         <div className="w-full max-w-4xl mx-auto bg-white rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col animate-slide-up">

//           {/* Card Navigation */}
//           <div className="border-b border-gray-100 px-8 py-6 flex items-center justify-between">
//             <div className="flex items-center gap-8">
//               <span className="text-gray-900 font-bold text-xl tracking-tighter">Archive 01</span>
//               <nav className="hidden md:flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-gray-400">
//                 <span className="text-gray-900">Featured</span>
//                 <span className="hover:text-gray-900 cursor-pointer transition-colors">Expeditions</span>
//                 <span className="hover:text-gray-900 cursor-pointer transition-colors">Moments</span>
//               </nav>
//             </div>

//             <Link
//               to="/trek-gallery"
//               className="text-[9px] font-black uppercase tracking-widest text-cyan-600 hover:text-cyan-700 flex items-center gap-2 group"
//             >
//               Enter Full Gallery <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>

//           {/* GRID CONTENT */}
//           <div className="p-8 lg:p-12">
//             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
//               {galleryImages.map((image, index) => (
//                 <div
//                   key={index}
//                   className="break-inside-avoid group relative cursor-pointer"
//                   onMouseEnter={() => setHoveredIndex(index)}
//                   onMouseLeave={() => setHoveredIndex(null)}
//                   onClick={() => {
//                     setSelectedImage(image.url);
//                     setSelectedImageData(image);
//                   }}
//                 >
//                   <div className="overflow-hidden bg-gray-50 rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
//                     <img
//                       src={image.url}
//                       alt={image.title}
//                       className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     />
//                     <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
//                       <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 transform scale-0 group-hover:scale-100 transition-transform duration-500">
//                         <ZoomIn size={18} />
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="mt-4 px-1">
//                     <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider">{image.title}</h4>
//                     <div className="flex items-center gap-2 mt-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                       <MapPin size={10} className="text-cyan-500" />
//                       {image.location}
//                     </div>
//                   </div> */}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Card Footer */}
//           <div className="border-t border-gray-100 px-8 py-4 bg-gray-50 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-gray-400">
//             <span>Archive Index: {galleryImages.length}</span>
//             <span>Vatadya Expeditions © 2024</span>
//           </div>
//         </div>

//       </div>

//       {/* Lightbox Modal */}
//       {selectedImage && selectedImageData && (
//         <div
//           className="fixed inset-0 z-[200] bg-[#020617]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fade-in"
//           onClick={() => {
//             setSelectedImage(null);
//             setSelectedImageData(null);
//           }}
//         >
//           <button
//             className="absolute top-8 right-8 text-white/50 hover:text-white transition-all z-30"
//             onClick={() => {
//               setSelectedImage(null);
//               setSelectedImageData(null);
//             }}
//           >
//             <X size={40} strokeWidth={1} />
//           </button>

//           <div className="relative max-w-5xl w-full flex items-center gap-6 z-20">
//             {/* Nav Left */}
//             <button
//               className="hidden md:flex w-12 h-24 bg-white/5 hover:bg-white/10 rounded-sm items-center justify-center transition-all border border-white/10"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
//                 const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
//                 setSelectedImage(galleryImages[prevIndex].url);
//                 setSelectedImageData(galleryImages[prevIndex]);
//               }}
//             >
//               <ChevronLeft size={24} className="text-white" />
//             </button>

//             {/* Image Card */}
//             <div
//               className="flex-1 bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row max-h-[85vh] animate-slide-up"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex-1 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
//                 <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-[60vh] object-contain shadow-2xl" />
//               </div>
//               <div className="w-full md:w-80 p-8 flex flex-col bg-white border-l border-gray-100">
//                 <div className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-4">Metadata</div>
//                 <h3 className="text-2xl font-serif italic text-gray-900 mb-6">{selectedImageData.title}</h3>

//                 <div className="space-y-5 flex-1">
//                   <div className="flex flex-col gap-1">
//                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
//                     <div className="text-gray-800 font-bold text-sm flex items-center gap-2">
//                       <MapPin size={14} className="text-cyan-500" /> {selectedImageData.location}
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Date</span>
//                     <div className="text-gray-800 font-bold text-sm flex items-center gap-2">
//                       <Calendar size={14} className="text-cyan-500" /> {selectedImageData.month} {selectedImageData.year}
//                     </div>
//                   </div>
//                 </div>

//                 <button className="mt-8 w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-colors">
//                   Explore Expedition
//                 </button>
//               </div>
//             </div>

//             {/* Nav Right */}
//             <button
//               className="hidden md:flex w-12 h-24 bg-white/5 hover:bg-white/10 rounded-sm items-center justify-center transition-all border border-white/10"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
//                 const nextIndex = (currentIndex + 1) % galleryImages.length;
//                 setSelectedImage(galleryImages[nextIndex].url);
//                 setSelectedImageData(galleryImages[nextIndex]);
//               }}
//             >
//               <ChevronRight size={24} className="text-white" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Embedded Styles */}
//       <style dangerouslySetInnerHTML={{
//         __html: `
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Reenie+Beanie&display=swap');

//         .font-serif { font-family: 'Playfair Display', serif; }
//         .font-handwriting { font-family: 'Reenie Beanie', cursive; }

//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(40px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-slide-up { animation: slide-up 1s ease-out forwards; }
//         .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
//       `}} />
//     </section>
//   );
// };

// export default Gallery;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Camera,
  MapPin,
  Calendar,
  ZoomIn,
} from "lucide-react";
import { fetchTrekGallery } from "../../api/galleryApi";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const result = await fetchTrekGallery();
        if (result && Array.isArray(result.data)) {
          const mappedImages = result.data.slice(0, 8).map((item, index) => ({
            id: index,
            url:
              item.photo?.cdnUrl ||
              "https://images.unsplash.com/photo-1551632811-561732d1e306",
            title: item.title || "Trek Moment",
            location: item.region || "Himalayas",
            month: item.month || "September",
            year: item.year || "2025",
          }));
          setGalleryImages(mappedImages);
        }
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="py-40 bg-[#020617] flex flex-col items-center justify-center gap-6">
        <Camera className="w-12 h-12 text-cyan-500 animate-bounce" />
        <p className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-[10px]">
          Developing Moments...
        </p>
      </div>
    );
  }

  const floatImg = (i) => galleryImages[i % galleryImages.length]?.url;

  return (
    <section className="relative py-16 bg-[#020617] overflow-hidden">

      {/* ================= FLOATING PHOTO CARDS ================= */}

      <div className="absolute top-10 left-10 w-50 rotate-[-6deg] opacity-80 hidden lg:block bg-white p-2 pb-8">
        <img src={floatImg(0)} className="shadow-2xl" />
      </div>

      <div className="absolute top-20 right-10 w-50 rotate-[8deg] opacity-70 hidden lg:block bg-white p-2 pb-8">
        <img src={floatImg(1)} className="rounded-lg shadow-2xl" />
      </div>

      {/* <div className="absolute bottom-20 left-16 w-44 rotate-[-10deg] opacity-60 hidden lg:block">
        <img src={floatImg(2)} className="rounded-lg shadow-2xl" />
      </div>

      <div className="absolute bottom-10 right-20 w-44 rotate-[-8deg] opacity-60 hidden lg:block">
        <img src={floatImg(3)} className="rounded-lg shadow-2xl" />
      </div> */}

      {/* ================= HEADER ================= */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-cyan-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
          Memories Gallery
        </h2>

        <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6">
          Trek <span className="text-cyan-400">Gallery</span>
        </h1>

        <div className="w-16 h-0.5 bg-cyan-500 mx-auto"></div>
      </div>

      {/* ================= CENTRAL CARD ================= */}
      <div className="w-full max-w-5xl mx-auto bg-white rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative z-20">

        {/* GRID */}
        <div className="p-8 lg:p-12">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">

            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid group relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setSelectedImage(image.url);
                  setSelectedImageData(image);
                }}
              >
                <div className="overflow-hidden bg-gray-50 rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">

                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <ZoomIn size={18} />
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* ================= LIGHTBOX ================= */}
      {selectedImage && selectedImageData && (
        <div
          className="fixed inset-0 z-[200] bg-[#020617]/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white max-w-5xl w-full flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              className="w-full md:w-2/3 object-cover"
              alt=""
            />

            <div className="p-6 md:w-1/3">
              <h2 className="text-2xl font-bold mb-4">
                {selectedImageData.title}
              </h2>

              <p className="flex items-center gap-2 text-sm mb-2">
                <MapPin size={14} /> {selectedImageData.location}
              </p>

              <p className="flex items-center gap-2 text-sm">
                <Calendar size={14} /> {selectedImageData.month}{" "}
                {selectedImageData.year}
              </p>

              <button className="mt-6 w-full py-3 bg-cyan-600 text-white text-sm font-bold rounded-sm hover:bg-cyan-700 transition">
                Explore
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Gallery;