import React, { useState } from "react";
import { Calendar, User, Phone } from "lucide-react";
import BookNowModal from "../components/modals/BookNowModal";

const BookNowPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-linear-to-b from-white to-emerald-50 min-h-screen">
      <BookNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503416997304-4319c3f7c9ec?fm=jpg&q=60&w=3000"
          alt="Book Trek"
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-[slowzoom_25s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            Book Your Trek
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-yellow-400 drop-shadow-sm">
            Secure your spot for an unforgettable trekking adventure
          </p>

          {/* Book Now Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* ================= TREK HIGHLIGHTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-emerald-700 text-center mb-10">
          Why Trek With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { title: "Expert Guides", icon: <User size={30} /> },
            { title: "Safety First", icon: <Phone size={30} /> },
            { title: "Best Trails", icon: <Calendar size={30} /> },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TAILWIND CUSTOM ANIMATIONS ================= */}
      <style>
        {`
          @keyframes slowzoom {
            0%,100% { transform: scale(1.1); }
            50% { transform: scale(1.15); }
          }
          .animate-[slowzoom_25s_ease-in-out_infinite] { animation: slowzoom 25s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default BookNowPage;
