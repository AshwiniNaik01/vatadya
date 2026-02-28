// import React from "react";
// import { Maximize2, MapPin, Calendar } from "lucide-react";

// const GalleryGrid = ({ images }) => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//             {images.map((img, index) => (
//                 <div
//                     key={img.id}
//                     className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-2"
//                 >
//                     {/* Image Container */}
//                     <div className="relative aspect-[4/5] overflow-hidden">
//                         <img
//                             src={img.url}
//                             alt={img.title}
//                             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
//                         />
//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
//                             <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
//                                     <MapPin size={12} />
//                                     {img.region}
//                                 </div>
//                                 <h3 className="text-2xl font-black leading-tight">
//                                     {img.title}
//                                 </h3>
//                                 <div className="flex items-center gap-3 text-xs opacity-80">
//                                     <span className="flex items-center gap-1">
//                                         <Calendar size={12} /> {img.month} {img.year}
//                                     </span>
//                                     <span className="px-2 py-0.5 bg-white/20 rounded-md backdrop-blur-md">
//                                         {img.experience}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* View Button */}
//                         <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-emerald-500 transition-all duration-300 transform scale-75 group-hover:scale-100">
//                             <Maximize2 size={20} />
//                         </button>
//                     </div>

//                     {/* Info Section (Visible on Hover/Light variant) */}
//                     <div className="p-6 bg-white border-t border-gray-50 flex items-center justify-between">
//                         <div className="space-y-1">
//                             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{img.season} Season</p>
//                             <h4 className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{img.title}</h4>
//                         </div>
//                         <div className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
//                             {img.year}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default GalleryGrid;


import React, { useState, useEffect } from "react";
import {
    Maximize2,
    MapPin,
    Calendar,
    Heart,
    Eye,
    Download,
    Camera,
    Star,
    Clock,
    Aperture,
    Film,
    Share2,
    Bookmark,
    X
} from "lucide-react";
import { DIR } from "../../config/constants";
import { fetchTrekGallery } from "../../api/galleryApi";

const GalleryGrid = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [likedImages, setLikedImages] = useState({});
    const [savedImages, setSavedImages] = useState({});
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                setLoading(true);
                const result = await fetchTrekGallery();

                if (Array.isArray(result.data) && result.data.length > 0) {
                    const galleryItems = result.data.map((item, index) => ({
                        id: `${item.photo}-${index}`,
                        url: item.photo.cdnUrl || "",
                        title: item.title,
                        month: item.month,
                        year: item.year,
                        season: item.season,
                        experience: item.experience,
                        region: item.region,
                        // Photography metadata
                        photographer: ["Alex Rivera", "Maya Chen", "James Wilson"][index % 3],
                        photographerAvatar: `https://i.pravatar.cc/150?img=${index + 10}`,
                        camera: ["SONY α7 IV", "FUJIFILM X-T5", "CANON EOS R5"][index % 3],
                        aperture: ["f/2.8", "f/4", "f/5.6"][index % 3],
                        shutter: ["1/1000s", "1/500s", "1/250s"][index % 3],
                        iso: ["100", "200", "400"][index % 3],
                        likes: Math.floor(Math.random() * 500) + 200,
                        views: Math.floor(Math.random() * 2000) + 500,
                    }));

                    setImages(galleryItems);
                } else {
                    setError("No gallery items found");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load gallery");
            } finally {
                setLoading(false);
            }
        };

        loadGallery();
    }, []);

    const handleLike = (id, e) => {
        e.stopPropagation();
        setLikedImages(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleSave = (id, e) => {
        e.stopPropagation();
        setSavedImages(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-sky-200/50 rounded-full blur-3xl animate-pulse"></div>
                    <Camera className="relative w-16 h-16 text-sky-400 animate-pulse mb-4" />
                </div>
                <p className="text-sky-600/60 text-sm font-light">Loading gallery...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-rose-600 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {images.map((img, idx) => {
                    const isHovered = hoveredId === img.id;
                    const isLiked = likedImages[img.id];
                    const isSaved = savedImages[img.id];

                    return (
                        <div
                            key={img.id}
                            className="group relative bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                            onMouseEnter={() => setHoveredId(img.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setSelectedImage(img)}
                            style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.05}s forwards`, opacity: 0 }}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

                                {/* Top Bar - Photographer Info */}
                                <div className={`absolute top-4 left-4 right-4 flex justify-between items-center transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                                        <img
                                            src={img.photographerAvatar}
                                            alt={img.photographer}
                                            className="w-6 h-6 rounded-full border-2 border-white"
                                        />
                                        <span className="text-xs font-medium text-white">{img.photographer}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => handleSave(img.id, e)}
                                            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-sky-500/50 transition-colors border border-white/20"
                                        >
                                            <Bookmark className={`w-4 h-4 transition-colors ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
                                        </button>
                                        <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-sky-500/50 transition-colors border border-white/20">
                                            <Share2 className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Instagram-style Like/View Overlay */}
                                <div className={`absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex items-center gap-2 text-white">
                                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                                        <span className="font-bold text-lg">{img.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white">
                                        <Eye className="w-6 h-6" />
                                        <span className="font-bold text-lg">{img.views}</span>
                                    </div>
                                </div>

                                {/* Bottom Metadata */}
                                <div className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent transition-all duration-500 transform ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}>
                                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{img.title}</h3>
                                    <div className="flex items-center gap-3 text-white/80 text-xs">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>{img.region}</span>
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{img.month} {img.year}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Season Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                                        {img.season}
                                    </span>
                                </div>

                                {/* Expand Button */}
                                <button className="absolute bottom-20 right-5 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                                    <Maximize2 size={18} />
                                </button>
                            </div>

                            {/* EXIF Data */}
                            <div className="p-4 border-t border-sky-100">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-sky-600">
                                            <Camera className="w-3 h-3" />
                                            <span className="font-medium">{img.camera.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sky-600">
                                            <Aperture className="w-3 h-3" />
                                            <span>{img.aperture}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sky-600">
                                            <Clock className="w-3 h-3" />
                                            <span>{img.shutter}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sky-600">
                                            <Film className="w-3 h-3" />
                                            <span>ISO {img.iso}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Engagement Bar */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-sky-100">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={(e) => handleLike(img.id, e)}
                                            className="flex items-center gap-1.5 text-sm"
                                        >
                                            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-sky-400 hover:text-rose-500'
                                                }`} />
                                            <span className="text-sky-700 font-medium">{img.likes + (isLiked ? 1 : 0)}</span>
                                        </button>
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Eye className="w-5 h-5 text-sky-400" />
                                            <span className="text-sky-700 font-medium">{img.views}</span>
                                        </div>
                                    </div>
                                    <button className="text-sky-400 hover:text-sky-600 transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="grid md:grid-cols-2">
                            {/* Image Side */}
                            <div className="relative h-[500px] md:h-[600px] bg-black">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.title}
                                    className="w-full h-full object-contain"
                                />

                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-500/80 transition-colors border border-white/20"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Details Side */}
                            <div className="p-6 overflow-y-auto max-h-[600px]">
                                <h2 className="text-2xl font-bold text-sky-900 mb-4">{selectedImage.title}</h2>

                                {/* Photographer Info */}
                                <div className="flex items-center gap-4 mb-6 p-4 bg-sky-50 rounded-xl">
                                    <img
                                        src={selectedImage.photographerAvatar}
                                        alt={selectedImage.photographer}
                                        className="w-16 h-16 rounded-full border-2 border-sky-200"
                                    />
                                    <div>
                                        <div className="text-sm text-sky-600">Photographer</div>
                                        <div className="text-xl font-bold text-sky-900">{selectedImage.photographer}</div>
                                    </div>
                                </div>

                                {/* EXIF Data Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {[
                                        { label: 'Camera', value: selectedImage.camera, icon: Camera },
                                        { label: 'Aperture', value: selectedImage.aperture, icon: Aperture },
                                        { label: 'Shutter', value: selectedImage.shutter, icon: Clock },
                                        { label: 'ISO', value: selectedImage.iso, icon: Film },
                                    ].map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={idx} className="bg-sky-50 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-sky-600 mb-1">
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-xs">{item.label}</span>
                                                </div>
                                                <div className="text-sm font-bold text-sky-900">{item.value}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Location & Date */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sky-700">
                                        <MapPin className="w-4 h-4" />
                                        <span>{selectedImage.region}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sky-700">
                                        <Calendar className="w-4 h-4" />
                                        <span>{selectedImage.month} {selectedImage.year}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sky-700">
                                        <Star className="w-4 h-4" />
                                        <span>{selectedImage.season} Season</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex gap-6 mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-sky-900">{selectedImage.likes}</div>
                                        <div className="text-xs text-sky-600">Likes</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-sky-900">{selectedImage.views}</div>
                                        <div className="text-xs text-sky-600">Views</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white py-4 rounded-xl font-medium hover:from-sky-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2">
                                        <Download className="w-5 h-5" />
                                        Download
                                    </button>
                                    <button className="px-6 py-4 border-2 border-sky-200 text-sky-700 rounded-xl font-medium hover:bg-sky-50 transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

export default GalleryGrid;


// import React, { useState, useEffect } from "react";
// import { Maximize2, MapPin, Calendar } from "lucide-react";
// import { DIR } from "../../config/constants";
// import { fetchTrekGallery } from "../../api/galleryApi";
// // import { fetchTrekGallery } from "../../api/galleryApi";

// const GalleryGrid = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadGallery = async () => {
//             try {
//                 setLoading(true);

//                 const result = await fetchTrekGallery();

//                 if (Array.isArray(result.data) && result.data.length > 0) {
//                     const galleryItems = result.data.map((item, index) => ({
//                         id: `${item.photo}-${index}`,
//                         url: item.photo.cdnUrl || "", // ✅ CDN image URL
//                         title: item.title,
//                         month: item.month,
//                         year: item.year,
//                         season: item.season,
//                         experience: item.experience,
//                         region: item.region,
//                     }));

//                     setImages(galleryItems);
//                 } else {
//                     setError("No gallery items found");
//                 }
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to load gallery");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadGallery();
//     }, []);

//     if (loading) return <p className="text-center text-gray-500">Loading gallery...</p>;
//     if (error) return <p className="text-center text-red-500">{error}</p>;

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//             {images.map((img) => (
//                 <div
//                     key={img.id}
//                     className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-xl transition-all"
//                 >
//                     <div className="relative aspect-[4/5] overflow-hidden">
//                         <img
//                             src={img.url}
//                             alt={img.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                         />

//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
//                             <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
//                                 <div className="flex items-center gap-2 text-xs text-emerald-400">
//                                     <MapPin size={12} /> {img.region}
//                                 </div>
//                                 <h3 className="text-xl font-bold">{img.title}</h3>
//                                 <div className="flex items-center gap-3 text-xs">
//                                     <Calendar size={12} /> {img.month} {img.year}
//                                 </div>
//                             </div>
//                         </div>

//                         <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
//                             <Maximize2 size={18} />
//                         </button>
//                     </div>

//                     <div className="p-4 flex justify-between items-center">
//                         <div>
//                             <p className="text-xs text-emerald-600 font-semibold">
//                                 {img.season} Season
//                             </p>
//                             <p className="text-sm font-bold truncate">{img.title}</p>
//                         </div>
//                         <span className="text-xs text-gray-400 font-bold">{img.year}</span>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default GalleryGrid;
