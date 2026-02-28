import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import {
  Mountain,
  Camera,
  Sparkles,
  Compass,
  ArrowRight,
  Maximize2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddSiderForm = ({ trek }) => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  if (!trek) return null;

  const galleryImages = trek.gallery ? trek.gallery.map(img => img.cdnUrl) : [];
  const mainImage = trek.image?.cdnUrl;

  const slides = mainImage ? [
    { img: mainImage, title: trek.title, subtitle: "Epic Journey Awaits" },
    ...(galleryImages.slice(0, 3).map((img, i) => ({
      img,
      title: trek.title,
      subtitle: i === 0 ? "High Altitude Discovery" : i === 1 ? "Breathtaking Vistas" : "Untamed Wilderness"
    })))
  ] : [
    { img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600", title: trek.title, subtitle: "Start Your Adventure" },
  ];

  const gridImages = galleryImages.length > 0 ? galleryImages : [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200",
  ];

  return (
    <div className="relative max-w-7xl px-4 md:px-6 mb-24 mx-auto grid grid-cols-12 gap-4 mt-8">
      {/* BIG IMAGE SWIPER - CINEMATIC CAROUSEL */}
      <div className="col-span-12 lg:col-span-8 relative rounded-3xl overflow-hidden h-[500px] shadow-2xl shadow-sky-200/50 group/swiper">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop
          className="h-full w-full"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i} className="h-full">
              <div className="relative w-full h-full">
                <img
                  src={s.img}
                  className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover/swiper:scale-110"
                  alt={s.title}
                />

                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-sky-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/30 via-transparent to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                  <div className="flex items-center gap-3 mb-4 opacity-0 group-hover/swiper:opacity-100 transition-all duration-700 translate-y-4 group-hover/swiper:translate-y-0">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-sky-900 shadow-lg shadow-yellow-400/30">
                      <Sparkles size={18} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300 drop-shadow-md">{s.subtitle}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-2 drop-shadow-xl">{s.title}</h3>
                  <div className="flex items-center gap-2 text-sky-100/80 text-sm font-medium">
                    <Compass size={16} />
                    <span>Himalayan Sector Explorer</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Controls Overlay (Visible on Hover) */}
        <div className="absolute top-6 right-6 z-10 opacity-0 group-hover/swiper:opacity-100 transition-all duration-500">
          <button
            onClick={() => navigate("/treks")}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl text-white text-xs font-bold hover:bg-white/40 transition-all"
          >
            <Maximize2 size={14} /> Full View
          </button>
        </div>
      </div>

      {/* RIGHT GRID - INNOVATIVE MOMENTS NODES */}
      <div className="col-span-12 lg:col-span-4 grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
        {gridImages.slice(0, 4).map((img, i) =>
          i === 3 ? (
            <div
              key={i}
              onClick={() => navigate("/trek-gallery")}
              className="relative cursor-pointer group/node overflow-hidden rounded-3xl shadow-xl shadow-sky-100 group-hover/node:shadow-sky-200 transition-all duration-500"
            >
              <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover/node:scale-110" alt="" />
              <div className="absolute inset-0 bg-sky-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-2 group-hover/node:bg-sky-600/40 transition-all duration-500">
                <div className="text-4xl font-black text-yellow-400 drop-shadow-lg">+{Math.max(0, galleryImages.length - 3)}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-50">View Gallery</div>
              </div>
              <div className="absolute bottom-4 right-4 text-white/40 text-[10px] group-hover/node:text-yellow-300 transition-colors">
                <ArrowRight size={14} />
              </div>
            </div>
          ) : (
            <div key={i} className="relative group/node overflow-hidden rounded-3xl shadow-lg shadow-sky-100/50 hover:shadow-2xl hover:shadow-sky-200/50 transition-all duration-500">
              <img
                src={img}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/node:scale-110"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent"></div>

              {/* Badge on hover */}
              <div className="absolute top-4 left-4 opacity-0 group-hover/node:opacity-100 transition-all duration-500 -translate-x-2 group-hover/node:translate-x-0">
                <div className="bg-white/30 backdrop-blur-md border border-white/20 p-2 rounded-lg text-white">
                  <Camera size={14} />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-white text-[10px] font-bold opacity-0 group-hover/node:opacity-100 transition-all duration-500 translate-y-2 group-hover/node:translate-y-0 tracking-widest uppercase">
                Moment {i + 1}
              </div>
            </div>
          )
        )}
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #fbbf24 !important;
          opacity: 1;
          width: 24px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default AddSiderForm;
