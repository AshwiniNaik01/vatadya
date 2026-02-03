import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, X, ArrowRight, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
      category: "Mountain Views",
      title: "Majestic Peaks"
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
      category: "Summit",
      title: "The Final Ascent"
    },
    {
      url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
      category: "Trails",
      title: "Valley Walk"
    },
    {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
      category: "Camping",
      title: "Starry Nights"
    },
    {
      url: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
      category: "Base Camp",
      title: "Climbers Rest"
    },
    {
      url: "https://images.pexels.com/photos/914128/pexels-photo-914128.jpeg?cs=srgb&dl=pexels-saikat-ghosh-323099-914128.jpg&fm=jpg",
      category: "Himalayas",
      title: "Everest Mist"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
              <Sparkles size={12} className="animate-pulse" />
              Visual Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
              Moments of <span className="text-emerald-700">Adventure</span>
            </h2>
            <p className="text-gray-500 max-w-xl text-lg font-medium leading-relaxed">
              Every trail tells a story through the lens of those who walk it. Explore our most iconic captures.
            </p>
          </div>

          <Link
            to="/trek-gallery"
            className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all duration-500 shadow-2xl hover:shadow-emerald-200"
          >
            Explore Full Gallery
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[3/4] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.1)] transition-all duration-700 hover:-translate-y-2 border border-gray-100"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">{image.category}</span>
                <span className="text-white font-bold text-sm leading-tight">{image.title}</span>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <ImageIcon size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-xl flex items-center justify-center p-6">
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>

          <div className="relative max-w-5xl w-full flex items-center gap-4">
            <button
              className="w-14 h-14 bg-white/5 text-white hover:bg-emerald-500 rounded-full shrink-0 flex items-center justify-center transition-all duration-300"
              onClick={() => {
                const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
                const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                setSelectedImage(galleryImages[prevIndex].url);
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <div className="w-full relative group shadow-2xl rounded-3xl overflow-hidden border border-white/10">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            <button
              className="w-14 h-14 bg-white/5 text-white hover:bg-emerald-500 rounded-full shrink-0 flex items-center justify-center transition-all duration-300"
              onClick={() => {
                const currentIndex = galleryImages.findIndex(img => img.url === selectedImage);
                const nextIndex = (currentIndex + 1) % galleryImages.length;
                setSelectedImage(galleryImages[nextIndex].url);
              }}
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
