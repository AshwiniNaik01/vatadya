import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaMountain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddSiderForm = ({ trek }) => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  if (!trek) return null;

  const galleryImages = trek.gallery ? trek.gallery.map(img => img.cdnUrl) : [];
  const mainImage = trek.image?.cdnUrl;

  const slides = mainImage ? [
    { img: mainImage, title: trek.title },
    ...(galleryImages.slice(0, 1).map(img => ({ img, title: trek.title })))
  ] : [
    { img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600", title: trek.title },
  ];

  const gridImages = galleryImages.length > 0 ? galleryImages : [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200",
  ];

  return (
    <div className="relative max-w-7xl px-6 mb-20 mx-auto grid grid-cols-12 gap-1 h-[260px]">
      {/* BIG IMAGE SWIPER */}
      <div className="col-span-6 bg-gray-100 rounded-l-2xl overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i} className="h-full">
              <div className="relative w-full h-full">
                <img
                  src={s.img}
                  className="w-full h-[50] object-fill"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                  <FaMountain size={28} className="mb-2" />
                  <h3 className="text-xl font-bold uppercase">{trek.title}</h3>
                  <p className="opacity-90 text-sm">Experience the Ultimate Adventure</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT GRID - STATIC */}
      <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-1 rounded-r-2xl overflow-hidden">
        {gridImages.slice(0, 4).map((img, i) =>
          i === 3 ? (
            <div
              key={i}
              onClick={() => navigate("/trek-gallery")}
              className="relative cursor-pointer"
            >
              <img src={img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-3xl font-bold">
                +{Math.max(0, galleryImages.length - 3)} More
              </div>
            </div>
          ) : (
            <img
              key={i}
              src={img}
              className="w-full h-full object-cover"
              alt=""
            />
          )
        )}
      </div>
    </div>
  );
};

export default AddSiderForm;
