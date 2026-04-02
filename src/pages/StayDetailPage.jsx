import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { 
  MapPin, Star, Wifi, Droplets, Car, Calendar, Users, Briefcase, 
  ChevronRight, Share, Heart, Wind, Tv, Trees, Flame, 
  Map, ChefHat, Shield, Thermometer, Tent, Info, CheckCircle, Navigation,
  Coffee, Dumbbell, Clock, Beer, Sprout, PawPrint, Laptop, Layout, Waves,
  Loader2, BadgePercent, Calculator
} from "lucide-react";

const StayDetailPage = () => {
    const { id } = useParams();
    const [stay, setStay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchStayDetail = async () => {
            try {
                const response = await axiosInstance.get(`/api/stays/${id}`);
                if (response.data.success) {
                    setStay(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching stay detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStayDetail();
    }, [id]);

    const getIcon = (name) => {
        const iconMap = {
            Waves: Waves, Wifi: Wifi, Wind: Wind, Utensils: ChefHat, Tv: Tv, Trees: Trees,
            Flame: Flame, Mountain: Navigation, PawPrint: PawPrint, Layout: Layout,
            Laptop: Laptop, Sprout: Sprout, Coffee: Coffee, Beer: Beer, Clock: Clock,
            Dumbbell: Dumbbell, Map: Map, Car: Car, Tent: Tent, Shield: Shield,
            Thermometer: Thermometer, ChefHat: ChefHat
        };
        return iconMap[name] || MapPin;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (!stay) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white flex-col gap-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <Info className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-3xl font-black text-obsidian uppercase tracking-tighter">Stay not found</h2>
                <Link to="/stay" className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20">BACK TO STAYS</Link>
            </div>
        );
    }

    // Process Gallery
    const allImages = [stay.image.cdnUrl, ...(stay.gallery?.map(g => g.cdnUrl) || [])];

    // Process Tags for Amenities (Parsing potentially double stringified tags)
    let processedTags = [];
    try {
        processedTags = stay.tags.flatMap(tagStr => {
            if (tagStr.startsWith('[')) return JSON.parse(tagStr);
            return tagStr;
        });
    } catch (e) {
        processedTags = stay.tags;
    }

    // Pricing calculation demo (simplified)
    const basePrice = stay.feeDetails?.basePrice?.amount || stay.price;
    const gstPrice = (basePrice * (stay.feeDetails?.gstPercent?.value || 0)) / 100;
    const totalPrice = basePrice + gstPrice;

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex gap-2 mb-4">
                            <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">{stay.category}</span>
                            <span className="px-4 py-1.5 bg-obsidian/5 text-obsidian/40 text-[10px] font-black uppercase tracking-widest rounded-full">{stay.reg_type}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-obsidian mb-4 tracking-tighter uppercase leading-[0.9]">{stay.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-obsidian text-sm">4.8</span>
                                <span className="text-gray-300">• 124 reviews</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="border-b border-gray-100 group-hover:border-primary">{stay.address.street}, {stay.address.city}, {stay.address.state}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-obsidian/5 font-black text-[10px] tracking-widest transition-all border border-gray-100">
                            <Share className="w-4 h-4 text-primary" /> SHARE
                        </button>
                        <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-obsidian/5 font-black text-[10px] tracking-widest transition-all border border-gray-100">
                            <Heart className="w-4 h-4 text-primary" /> SAVE
                        </button>
                    </div>
                </div>

                {/* Image Gallery - Airbnb Grid Style */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[600px] mb-16 rounded-4xl overflow-hidden shadow-2xl shadow-obsidian/10">
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
                        <img src={allImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="hidden md:block relative group overflow-hidden">
                        <img src={allImages[1] || allImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery 1" />
                    </div>
                    <div className="hidden md:block relative group overflow-hidden">
                        <img src={allImages[2] || allImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery 2" />
                    </div>
                    <div className="hidden md:block relative group overflow-hidden">
                        <img src={allImages[3] || allImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery 3" />
                    </div>
                    <div className="hidden md:block relative group overflow-hidden">
                        <img src={allImages[4] || allImages[1] || allImages[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery 4" />
                        <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
                            <button className="bg-white px-8 py-4 rounded-2xl text-obsidian text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
                                View Gallery
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        {/* Summary / Host Info */}
                        <div className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-12 rounded-4xl border border-primary/10">
                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <h2 className="text-3xl font-black text-obsidian tracking-tighter uppercase leading-[0.9]">
                                    Experience {stay.category} hosted by <span className="text-primary italic">Vatadya</span>
                                </h2>
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 font-black text-gray-400 uppercase tracking-widest text-[10px]">
                                    <span className="flex items-center gap-2.5"><Users className="w-4 h-4 text-primary" /> {stay.groupSize}</span>
                                    <span className="flex items-center gap-2.5"><Briefcase className="w-4 h-4 text-primary" /> {stay.duration}</span>
                                    <span className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-primary" /> {stay.startTime} - {stay.endTime}</span>
                                </div>
                            </div>
                            <div className="w-24 h-24 rounded-full bg-obsidian text-white flex items-center justify-center font-black text-4xl shadow-2xl border-8 border-white/50">
                                V
                            </div>
                        </div>

                        {/* Quick Perks */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: CheckCircle, title: "Self Check-in", desc: "Digital lock access" },
                                { icon: MapPin, title: "Great Location", desc: "Close to " + stay.address.nearbyLocation },
                                { icon: Calendar, title: "Booking Type", desc: "Instance " + stay.bookingType }
                            ].map((perk, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-3xl border border-gray-100 group hover:bg-white hover:shadow-2xl hover:shadow-obsidian/5 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <perk.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-sm font-black text-obsidian uppercase tracking-widest mb-1">{perk.title}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{perk.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-black text-obsidian mb-8 uppercase tracking-widest">About <span className="text-primary italic">the stay</span></h2>
                            <div 
                                className="text-gray-500 leading-[1.8] font-medium text-lg prose prose-primary max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-widest"
                                dangerouslySetInnerHTML={{ __html: stay.description }}
                            />
                        </section>

                        <div className="h-px bg-gray-100"></div>

                        {/* Highlights */}
                        <section>
                            <h2 className="text-2xl font-black text-obsidian mb-8 uppercase tracking-widest">Property <span className="text-primary italic">Highlights</span></h2>
                            <div 
                                className="bg-gray-50 p-10 rounded-4xl border border-gray-100 text-gray-500 font-bold uppercase tracking-widest text-xs leading-loose"
                                dangerouslySetInnerHTML={{ __html: stay.highlight }}
                            />
                        </section>

                        <div className="h-px bg-gray-100"></div>

                        {/* Features / Tags */}
                        <section>
                            <h2 className="text-2xl font-black text-obsidian mb-10 uppercase tracking-widest">Features <span className="text-primary italic">& Tags</span></h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {processedTags.map((tag, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-300 group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/5 transition-all flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <Sprout className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 group-hover:text-obsidian transition-colors uppercase tracking-widest">{tag}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="h-px bg-gray-100"></div>

                        {/* Map & Location Detail */}
                        <section>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                                <div>
                                    <h2 className="text-2xl font-black text-obsidian uppercase tracking-widest leading-none">Where <span className="text-primary italic">you'll be</span></h2>
                                    <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" /> {stay.address.address1}, {stay.address.nearbyLocation}, {stay.address.city}
                                    </p>
                                </div>
                                <a 
                                    href={stay.mapUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] pb-2 border-b-2 border-primary/20 hover:border-primary transition-all"
                                >
                                    OPEN IN GOOGLE MAPS <Navigation className="w-4 h-4" />
                                </a>
                            </div>
                            <div className="relative aspect-video rounded-4xl overflow-hidden shadow-2xl shadow-obsidian/10 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
                                <iframe 
                                    src={stay.mapUrl} 
                                    className="w-full h-full border-0" 
                                    allowFullScreen="" 
                                    loading="lazy"
                                />
                            </div>
                        </section>
                    </div>

                    {/* Pricing Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-white rounded-4xl border border-obsidian/5 shadow-3xl shadow-obsidian/10 p-10 space-y-10 overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-primary via-blue-400 to-primary/80"></div>
                            
                            <div className="flex items-baseline justify-between">
                                <div>
                                    <p className="text-4xl font-black text-obsidian tracking-tighter leading-none">₹{basePrice.toLocaleString()}</p>
                                    <p className="mt-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Base price per night</p>
                                </div>
                                <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10">
                                    <BadgePercent className="w-6 h-6 text-primary" />
                                </div>
                            </div>

                            {/* Booking Controls */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 border border-gray-100 rounded-2xl overflow-hidden text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 bg-gray-50/30">
                                    <div className="p-5 border-r border-gray-100 hover:bg-white transition-colors cursor-pointer group">
                                        <label className="mb-2 block group-hover:text-primary transition-colors">Check-in</label>
                                        <span className="text-obsidian text-xs">Pick date</span>
                                    </div>
                                    <div className="p-5 hover:bg-white transition-colors cursor-pointer group">
                                        <label className="mb-2 block group-hover:text-primary transition-colors">Check-out</label>
                                        <span className="text-obsidian text-xs">Pick date</span>
                                    </div>
                                    <div className="col-span-2 p-5 border-t border-gray-100 hover:bg-white transition-colors cursor-pointer flex justify-between items-center group">
                                        <div>
                                            <label className="mb-2 block group-hover:text-primary transition-colors">Guests</label>
                                            <span className="text-obsidian text-xs italic">{stay.groupSize}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>

                                <motion.button 
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-6 bg-obsidian hover:bg-black text-white font-black text-xs tracking-[0.3em] rounded-2xl shadow-2xl transition-all uppercase mt-4"
                                >
                                    Initialize Booking
                                </motion.button>
                                <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest italic">Instant confirmation via {stay.bookingType}</p>
                            </div>

                            {/* Fee Breakdown */}
                            <div className="space-y-5 pt-4">
                                <div className="flex justify-between font-black text-gray-400 text-[10px] uppercase tracking-widest">
                                    <span>Regular nightly rate</span>
                                    <span className="text-obsidian">₹{basePrice.toLocaleString()}</span>
                                </div>
                                {stay.feeDetails?.weekendCharge?.amount > 0 && (
                                    <div className="flex justify-between font-black text-gray-400 text-[10px] uppercase tracking-widest">
                                        <span>Weekend Surcharge</span>
                                        <span className="text-obsidian">₹{stay.feeDetails.weekendCharge.amount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-black text-green-500 text-[10px] uppercase tracking-widest">
                                    <span>Loyalty Discount ({stay.feeDetails?.discount?.value || 0}%)</span>
                                    <span className="text-green-600">-₹{((basePrice * (stay.feeDetails?.discount?.value || 0)) / 100).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-black text-gray-400 text-[10px] uppercase tracking-widest">
                                    <span>GST / Tax ({stay.feeDetails?.gstPercent?.value || 0}%)</span>
                                    <span className="text-obsidian">₹{gstPrice.toLocaleString()}</span>
                                </div>
                                
                                <div className="h-px bg-gray-100 my-6"></div>
                                
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 font-black italic">Final Amount</p>
                                        <h3 className="text-3xl font-black text-obsidian tracking-tighter">₹{totalPrice.toLocaleString()}</h3>
                                    </div>
                                    <Calculator className="w-8 h-8 text-primary/20 mb-1" />
                                </div>

                                {/* Addons */}
                                {stay.addons?.length > 0 && (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <p className="text-[10px] font-black text-obsidian uppercase tracking-widest mb-4">Available Addons</p>
                                        <div className="space-y-3">
                                            {stay.addons.map((addon, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:border-primary/20 transition-all cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-obsidian uppercase">{addon.name}</p>
                                                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{addon.type}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs font-black text-primary">+₹{addon.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StayDetailPage;