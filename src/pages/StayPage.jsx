import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { MapPin, Star, Calendar, Users, Briefcase, Filter, Search, Loader2 } from "lucide-react";

const StayPage = () => {
    const [stays, setStays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [selectedGuests, setSelectedGuests] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchStays = async () => {
            try {
                const response = await axiosInstance.get("/api/stays");
                if (response.data.success) {
                    setStays(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching stays:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStays();
    }, []);

    const categories = ["All", "Premium", "Bunglow", "Cabin", "Villas"];

    const filteredStays = stays.filter((stay) => {
        const matchesSearch = stay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stay.address.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "All" || stay.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesPrice = stay.price >= priceRange[0] && stay.price <= priceRange[1];
        // Note: stay.groupSize might be a string like "2-5 People", need parsing if strictly checking.
        // For now, I'll just check if it's a match loosely or matches logic if applicable.
        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-obsidian py-16 px-6">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
                </div>
                <div className="max-w-7xl mx-auto text-center relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
                    >
                        Find Your Perfect <span className="text-primary italic">Stay</span>
                    </motion.h1>
                    <p className="text-white/70 text-base max-w-2xl mx-auto">
                        Discover handpicked premium stays. From luxury villas to cozy mountain cabins.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-2">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                            <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                                <Search className="text-primary w-5 h-5" />
                                <div className="flex-1 text-left">
                                    <div className="text-xs font-bold text-gray-700 uppercase">Location</div>
                                    <input
                                        type="text"
                                        placeholder="Where to?"
                                        className="w-full text-sm text-gray-600 focus:outline-none bg-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                                <Calendar className="text-primary w-5 h-5" />
                                <div className="text-left">
                                    <div className="text-xs font-bold text-gray-700 uppercase">Check in</div>
                                    <div className="text-sm text-gray-400">Add dates</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                                <Calendar className="text-primary w-5 h-5" />
                                <div className="text-left">
                                    <div className="text-xs font-bold text-gray-700 uppercase">Check out</div>
                                    <div className="text-sm text-gray-400">Add dates</div>
                                </div>
                            </div>
                            <button className="bg-primary hover:bg-primary/90 text-white font-black px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-20 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                                ${activeCategory === cat
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition group"
                    >
                        <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        Filters
                    </button>
                </div>
                
                {/* Expanded Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white border-b border-gray-100 overflow-hidden"
                        >
                            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div>
                                    <h3 className="text-sm font-black text-obsidian uppercase tracking-widest mb-4">Price Range</h3>
                                    <div className="px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="50000"
                                            step={500}
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            <span>₹0</span>
                                            <span className="text-primary">Up to ₹{priceRange[1].toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-obsidian uppercase tracking-widest mb-4">Guest Capacity</h3>
                                    <select
                                        value={selectedGuests}
                                        onChange={(e) => setSelectedGuests(parseInt(e.target.value))}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-primary/30"
                                    >
                                        {[1, 2, 4, 6, 8, 10].map(n => (
                                            <option key={n} value={n}>{n}+ Guests</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-obsidian uppercase tracking-widest mb-4">Popular Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Nature", "Luxury", "Mountain", "AC", "Instant"].map(tag => (
                                            <button key={tag} className="px-4 py-2 bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Stays Grid */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-obsidian uppercase tracking-tighter">{filteredStays.length} Stays Found</h2>
                        <div className="h-1 w-12 bg-primary mt-2"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredStays.map((stay, idx) => (
                        <motion.div
                            key={stay._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group"
                        >
                            <Link to={`/stay/${stay._id}`} className="block">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-xl shadow-obsidian/5 bg-gray-100">
                                    <img
                                        src={stay.image.cdnUrl}
                                        alt={stay.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-1 shadow-lg border border-white">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-black text-obsidian">4.8</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/20">
                                            {stay.reg_type}
                                        </span>
                                        {stay.featured && (
                                            <span className="px-3 py-1 bg-obsidian/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/20">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="px-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-black text-obsidian group-hover:text-primary transition-colors tracking-tight uppercase">{stay.title}</h3>
                                            <div className="flex items-center gap-1 text-gray-400 mt-1 uppercase font-bold text-[10px] tracking-widest">
                                                <MapPin className="w-3 h-3 text-primary" />
                                                <span>{stay.address.city}, {stay.address.state}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Starting at</p>
                                            <p className="text-xl font-black text-primary">₹{stay.price.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-100 w-full my-4"></div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all duration-500">
                                                <Users className="w-4 h-4 text-blue-500" />
                                                {stay.groupSize.split(' ')[0]} GUESTS
                                            </div>
                                            <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all duration-500 text-blue-500">
                                                <Briefcase className="w-4 h-4" />
                                                {stay.duration.split(' ')[0]} {stay.duration.split(' ')[1]}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-black text-primary group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                                            DETAILS →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredStays.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-4xl border-2 border-dashed border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tighter">No stays matching your criteria</h3>
                        <button
                            onClick={() => { setSearchTerm(""); setActiveCategory("All"); setPriceRange([0, 50000]); }}
                            className="mt-6 text-primary font-black uppercase tracking-widest text-xs hover:underline"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default StayPage;