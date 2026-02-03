// import {
//   ArrowRight,
//   Clock,
//   Compass,
//   Mountain,
//   Snowflake,
//   Sparkles,
//   Sun,
//   Tent,
//   Users,
// } from "lucide-react";
// import { useState } from "react";

// const TrekCategories = () => {
//   const [activeCategory, setActiveCategory] = useState("all");

//   const categories = [
//     {
//       id: "beginner",
//       title: "Beginner Friendly",
//       description: "Perfect for first-time trekkers with gentle slopes",
//       icon: <Sparkles className="w-8 h-8" />,
//       count: 28,
//       gradient: "from-green-400 to-emerald-500",
//       bgColor: "bg-green-50",
//       textColor: "text-green-700",
//       duration: "1-3 Days",
//       difficulty: "Easy",
//       image: "https://completewellbeing.com/wp-content/uploads/2014/04/discover-the-beauty-of-trekking.jpg",
//     },
//     {
//       id: "family",
//       title: "Family Treks",
//       description: "Safe adventures for all ages and skill levels",
//       icon: <Users className="w-8 h-8" />,
//       count: 15,
//       gradient: "from-blue-400 to-cyan-500",
//       bgColor: "bg-blue-50",
//       textColor: "text-blue-700",
//       duration: "1-2 Days",
//       difficulty: "Easy",
//       image: "https://t4.ftcdn.net/jpg/06/29/70/93/360_F_629709390_1LI5fFne2VrDaJTjcLG4UcbySJLLOnqT.jpg",
//     },
//     {
//       id: "high-altitude",
//       title: "High Altitude",
//       description: "Challenging climbs above 4000m with stunning views",
//       icon: <Mountain className="w-8 h-8" />,
//       count: 42,
//       gradient: "from-purple-400 to-indigo-500",
//       bgColor: "bg-purple-50",
//       textColor: "text-purple-700",
//       duration: "7-14 Days",
//       difficulty: "Challenging",
//       image: "https://www.discoveraltai.com/wp-content/uploads/2023/11/pexels-photo-2450296-1024x769.jpg",
//     },
//     {
//       id: "weekend",
//       title: "Weekend Escapes",
//       description: "Quick getaways perfect for busy schedules",
//       icon: <Sun className="w-8 h-8" />,
//       count: 35,
//       gradient: "from-amber-400 to-orange-500",
//       bgColor: "bg-amber-50",
//       textColor: "text-amber-700",
//       duration: "2-3 Days",
//       difficulty: "Moderate",
//       image: "https://media.istockphoto.com/id/2024101729/photo/four-young-friends-are-enjoying-sunrise-sea-and-islands.jpg?s=612x612&w=0&k=20&c=ahjr7RjYq_kp9FLQXNbAfExQZmCc_oSFS4CLmatHvAA=",
//     },
//     {
//       id: "winter",
//       title: "Winter Treks",
//       description: "Snow-covered trails and frozen landscapes",
//       icon: <Snowflake className="w-8 h-8" />,
//       count: 18,
//       gradient: "from-cyan-400 to-blue-500",
//       bgColor: "bg-cyan-50",
//       textColor: "text-cyan-700",
//       duration: "3-5 Days",
//       difficulty: "Difficult",
//       image:
//         "https://himalayandaredevils.com/storage/uploads/68b96c71bc5d2.webp",
//     },
//     {
//       id: "camping",
//       title: "Camping Treks",
//       description: "Overnight stays under the stars",
//       icon: <Tent className="w-8 h-8" />,
//       count: 24,
//       gradient: "from-emerald-400 to-teal-500",
//       bgColor: "bg-emerald-50",
//       textColor: "text-emerald-700",
//       duration: "2-4 Days",
//       difficulty: "Moderate",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLj0bNhYpmnbYiqbOwOd04G4zHfmzy2bKj1w&s",
//     },
//     {
//       id: "expedition",
//       title: "Expeditions",
//       description: "Professional grade adventures for experts",
//       icon: <Compass className="w-8 h-8" />,
//       count: 12,
//       gradient: "from-red-400 to-rose-500",
//       bgColor: "bg-red-50",
//       textColor: "text-red-700",
//       duration: "10-21 Days",
//       difficulty: "Expert",
//       image: "https://5.imimg.com/data5/AK/MC/EJ/SELLER-48927985/trekking-expedition-all-over-india.jpeg",
//     },
//     {
//       id: "day-treks",
//       title: "Day Treks",
//       description: "Return the same day, perfect for beginners",
//       icon: <Clock className="w-8 h-8" />,
//       count: 31,
//       gradient: "from-lime-400 to-green-500",
//       bgColor: "bg-lime-50",
//       textColor: "text-lime-700",
//       duration: "4-8 Hours",
//       difficulty: "Easy",
//       image: "https://media1.thrillophilia.com/filestore/8c4endyet4gv16wx0d1otkevk90l_pexels-saikat-ghosh-914128.jpg?w=400&dpr=2",
//     },
//   ];

//   const filterButtons = [
//     {
//       id: "all",
//       label: "All Treks",
//       count: categories.reduce((sum, cat) => sum + cat.count, 0),
//     },
//     { id: "easy", label: "Easy", count: 74 },
//     { id: "moderate", label: "Moderate", count: 59 },
//     { id: "challenging", label: "Challenging", count: 42 },
//     { id: "expert", label: "Expert", count: 12 },
//   ];

//   return (
//     <section className="py-10 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
//             <Sparkles className="w-5 h-5" />
//             <span className="font-semibold">EXPLORE CATEGORIES</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Find Your Perfect
//             <span className="text-emerald-700"> Trek Type</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Discover treks tailored to your experience level, time availability,
//             and adventure preferences
//           </p>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {filterButtons.map((filter) => (
//             <button
//               key={filter.id}
//               onClick={() => setActiveCategory(filter.id)}
//               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === filter.id
//                   ? "bg-emerald-600 text-white shadow-lg"
//                   : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
//                 }`}
//             >
//               {filter.label}
//               <span
//                 className={`ml-2 px-2 py-1 text-xs rounded-full ${activeCategory === filter.id
//                     ? "bg-emerald-500"
//                     : "bg-gray-100 text-gray-600"
//                   }`}
//               >
//                 {filter.count}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Categories Grid */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className={`group relative bg-emerald-50 rounded-lg overflow-hidden shadow-lg border-4 border-emerald-700 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl  cursor-pointer`}
//               onClick={() => setActiveCategory(category.id)}
//             >
//               {/* Category Image/Background */}
//               <div className="h-50 relative overflow-hidden">
//                 <img
//                   src={category.image}
//                   alt={category.title}
//                   loading="lazy"
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black/30"></div>{" "}
//                 {/* overlay for contrast */}
//                 {/* <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div> */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-white p-4 rounded-full bg-black/30">
//                     {category.icon}
//                   </div>
//                 </div>
//                 {/* Difficulty Badge */}
//                 <div className="absolute top-4 right-4">
//                   <span
//                     className={`px-3 py-1 ${category.bgColor} ${category.textColor} text-sm font-semibold rounded-full`}
//                   >
//                     {category.difficulty}
//                   </span>
//                 </div>
//                 {/* Count Badge */}
//                 <div className="absolute bottom-4 left-4">
//                   <span className="px-3 py-1 bg-black/30 text-white text-sm font-semibold rounded-full">
//                     {category.count} Treks
//                   </span>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
//                   {category.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4 text-sm">
//                   {category.description}
//                 </p>

//                 {/* Duration */}
//                 <div className="flex items-center text-gray-500 mb-4">
//                   <Clock className="w-4 h-4 mr-2" />
//                   <span className="text-sm">{category.duration}</span>
//                 </div>

//                 {/* CTA */}
//                 <div className="flex items-center justify-between pt-1 border-t border-gray-100">
//                   <span className="text-sm text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
//                     Explore Treks
//                   </span>
//                   <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-2 transition-all duration-300" />
//                 </div>
//               </div>

//               {/* Active Indicator */}
//               {activeCategory === category.id && (
//                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Recommended Treks Section */}

//         {/* Seasonal Categories */}

//         {/* CTA */}
//       </div>
//     </section>
//   );
// };

// export default TrekCategories;

import {
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
// import { fetchTrekCategories } from "../../api/trekCategoryApi";
import { DIR } from "../../config/constants";
import { fetchTrekCategories } from "./trekCategoryApi";

const TrekCategories = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchTrekCategories();

        if (!data || !data.message) throw new Error("Invalid API data");

        const mappedCategories = data.message.map(cat => ({
          id: cat.categoryId,
          title: cat.title,
          description: cat.description,
          icon: <Sparkles className="w-8 h-8" />, // assign default icon
          count: cat.trekCount || 0,
          gradient: "from-green-400 to-emerald-500",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          duration: "1-3 Days",
          difficulty: cat.difficulty || "Easy",
          image: `${DIR.CategoryImage}${cat.catImage}`,
        }));

        setCategories(mappedCategories);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filterButtons = [
    {
      id: "all",
      label: "All Treks",
      count: categories.reduce((sum, cat) => sum + cat.count, 0),
    },
    { id: "easy", label: "Easy", count: categories.filter(c => c.difficulty === "Easy").length },
    { id: "moderate", label: "Moderate", count: categories.filter(c => c.difficulty === "Moderate").length },
    { id: "challenging", label: "Challenging", count: categories.filter(c => c.difficulty === "Challenging").length },
    { id: "expert", label: "Expert", count: categories.filter(c => c.difficulty === "Expert").length },
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">EXPLORE CATEGORIES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-emerald-700"> Trek Type</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover treks tailored to your experience level, time availability,
            and adventure preferences
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterButtons.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === filter.id
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {filter.label}
              <span
                className={`ml-2 px-2 py-1 text-xs rounded-full ${activeCategory === filter.id
                  ? "bg-emerald-500"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`group relative bg-emerald-50 rounded-lg overflow-hidden shadow-lg border-4 border-emerald-700 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
                onClick={() => setActiveCategory(category.id)}
              >
                {/* Category Image */}
                <div className="h-50 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white p-4 rounded-full bg-black/30">
                      {category.icon}
                    </div>
                  </div>
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 ${category.bgColor} ${category.textColor} text-sm font-semibold rounded-full`}
                    >
                      {category.difficulty}
                    </span>
                  </div>
                  {/* Count Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-black/30 text-white text-sm font-semibold rounded-full">
                      {category.count} Treks
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{category.duration}</span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-sm text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                      Explore Treks
                    </span>
                    <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>

                {/* Active Indicator */}
                {activeCategory === category.id && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrekCategories;
