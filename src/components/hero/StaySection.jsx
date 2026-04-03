import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { MapPin, Star, Users, Briefcase, Loader2 } from "lucide-react";

const StaySection = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedStays = async () => {
      try {
        const response = await axiosInstance.get("/api/stays");
        if (response.data.success) {
          // Show only first 3 stays or featured ones
          const featured = response.data.data.filter(s => s.featured).slice(0, 3);
          setStays(featured.length > 0 ? featured : response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching featured stays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStays();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h4 className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">EXPERIENCE LUXURY</h4>
            <h2 className="text-4xl md:text-6xl font-black text-obsidian tracking-tighter leading-none">
              STAY IN THE <span className="text-primary italic">HEART</span> OF NATURE
            </h2>
            <p className="mt-6 text-gray-500 font-medium text-lg">
              Beyond just trekking, we provide handpicked accommodations that offer comfort and breathtaking views.
            </p>
          </div>
          <Link
            to="/stay"
            className="group flex items-center gap-4 text-obsidian font-black uppercase tracking-widest text-sm"
          >
            EXPLORE ALL STAYS
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
              →
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stays.map((stay, idx) => (
            <motion.div
              key={stay._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/stay/${stay._id}`} className="block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-2xl shadow-obsidian/10 bg-gray-100">
                  <img
                    src={stay.image?.cdnUrl || "https://placeholder.com/600x400"}
                    alt={stay.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60"></div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-1 shadow-lg border border-white">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-black text-obsidian">4.8</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-1 text-white/80 mb-2">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{stay.address.city}, {stay.address.state}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-none">{stay.title}</h3>
                    <div className="flex items-center justify-between border-t border-white/20 pt-6">
                      <p className="text-xl font-black text-white">₹{stay.price.toLocaleString()}<span className="text-[10px] font-medium text-white/60 ml-1.5 italic tracking-widest">/NIGHT</span></p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/70">
                          <Users className="w-3.5 h-3.5 text-primary" /> {((stay.adults || 0) + (stay.children || 0)) || String(stay.groupSize || "").split(' ')[0] || "0"}
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/70">
                          <Briefcase className="w-3.5 h-3.5 text-primary" /> {stay.duration?.split(' ')[0]} {stay.duration?.split(' ')[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaySection;
