// import React, { useEffect, useState } from "react";
// import { Calendar, Layers, MapPin, Sparkles, Wind } from "lucide-react";
// import { fetchTrekGallery } from "./galleryApi";
// // import { fetchTrekGallery } from "../../api/galleryApi";

// // const GalleryFilters = ({ filters, setFilters }) => {
// // const uniqueWithAll = (items) => [
// //   "All",
// //   ...Array.from(new Set(items.filter(Boolean))),
// // ];


// //     const filterSections = [
// //         {
// //             id: "season",
// //             label: "Season",
// //             icon: <Wind size={16} className="text-blue-400" />,
// //             options: ["All", "Winter", "Spring", "Summer", "Autumn"],
// //         },
// //         {
// //             id: "month",
// //             label: "Month",
// //             icon: <Calendar size={16} className="text-emerald-400" />,
// //             options: [
// //                 "All", "January", "February", "March", "April", "May", "June",
// //                 "July", "August", "September", "October", "November", "December"
// //             ],
// //         },
// //         {
// //             id: "year",
// //             label: "Year",
// //             icon: <Sparkles size={16} className="text-amber-400" />,
// //             options: ["All", "2023", "2024", "2025"],
// //         },
// //         {
// //             id: "experience",
// //             label: "Experience",
// //             icon: <Layers size={16} className="text-indigo-400" />,
// //             options: ["All", "Beginner", "Moderate", "Advanced"],
// //         },
// //         {
// //             id: "region",
// //             label: "Region",
// //             icon: <MapPin size={16} className="text-rose-400" />,
// //             options: ["All", "Uttarakhand", "Himachal", "Kashmir", "Nepal", "Sikkim"],
// //         },
// //     ];

// //     return (
// //         <div className="space-y-6">
// //             {filterSections.map((section) => (
// //                 <div key={section.id} className="space-y-3">
// //                     <div className="flex items-center gap-2 px-1">
// //                         {section.icon}
// //                         <label className="text-xs font-black uppercase tracking-widest text-gray-400">
// //                             {section.label}
// //                         </label>
// //                     </div>

// //                     <select
// //                         value={filters[section.id]}
// //                         onChange={(e) => setFilters({ ...filters, [section.id]: e.target.value })}
// //                         className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJncmF5Ij48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE5IDlsLTcgNy03LTciLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1em]"
// //                     >
// //                         {section.options.map((opt) => (
// //                             <option key={opt} value={opt}>
// //                                 {opt}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// const GalleryFilters = ({ filters, setFilters }) => {
//   const [options, setOptions] = useState({
//     season: ["All"],
//     month: ["All"],
//     year: ["All"],
//     experience: ["All"],
//     region: ["All"],
//   });

//   useEffect(() => {
//     const loadFilters = async () => {
//       try {
//         const result = await fetchTrekGallery();

//         if (!Array.isArray(result.data)) return;

//         setOptions({
//           season: uniqueWithAll(result.data.map((i) => i.season)),
//           month: uniqueWithAll(result.data.map((i) => i.month)),
//           year: uniqueWithAll(result.data.map((i) => i.year)),
//           experience: uniqueWithAll(result.data.map((i) => i.experience)),
//           region: uniqueWithAll(result.data.map((i) => i.region)),
//         });
//       } catch (error) {
//         console.error("Failed to load filter options", error);
//       }
//     };

//     loadFilters();
//   }, []);

//   const filterSections = [
//     {
//       id: "season",
//       label: "Season",
//       icon: <Wind size={16} className="text-blue-400" />,
//       options: options.season,
//     },
//     {
//       id: "month",
//       label: "Month",
//       icon: <Calendar size={16} className="text-emerald-400" />,
//       options: options.month,
//     },
//     {
//       id: "year",
//       label: "Year",
//       icon: <Sparkles size={16} className="text-amber-400" />,
//       options: options.year,
//     },
//     {
//       id: "experience",
//       label: "Experience",
//       icon: <Layers size={16} className="text-indigo-400" />,
//       options: options.experience,
//     },
//     {
//       id: "region",
//       label: "Region",
//       icon: <MapPin size={16} className="text-rose-400" />,
//       options: options.region,
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {filterSections.map((section) => (
//         <div key={section.id} className="space-y-3">
//           <div className="flex items-center gap-2 px-1">
//             {section.icon}
//             <label className="text-xs font-black uppercase tracking-widest text-gray-400">
//               {section.label}
//             </label>
//           </div>

//           <select
//             value={filters[section.id]}
//             onChange={(e) =>
//               setFilters({ ...filters, [section.id]: e.target.value })
//             }
//             className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
//           >
//             {section.options.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//     </div>
//   );
// };


// export default GalleryFilters;


import React from "react";
import { Calendar, Layers, MapPin, Sparkles, Wind } from "lucide-react";

const GalleryFilters = ({ filters, setFilters }) => {
  // Static filter options
  const filterSections = [
    {
      id: "season",
      label: "Season",
      icon: <Wind size={16} className="text-blue-400" />,
      options: ["All", "Winter", "Spring", "Summer", "Autumn"],
    },
    {
      id: "month",
      label: "Month",
      icon: <Calendar size={16} className="text-emerald-400" />,
      options: [
        "All",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    {
      id: "year",
      label: "Year",
      icon: <Sparkles size={16} className="text-amber-400" />,
      options: ["All", "2023", "2024", "2025"],
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Layers size={16} className="text-indigo-400" />,
      options: ["All", "Beginner", "Moderate", "Advanced"],
    },
    {
      id: "region",
      label: "Region",
      icon: <MapPin size={16} className="text-rose-400" />,
      options: ["All", "Uttarakhand", "Himachal", "Kashmir", "Nepal", "Sikkim"],
    },
  ];

  return (
    <div className="space-y-6">
      {filterSections.map((section) => (
        <div key={section.id} className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            {section.icon}
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              {section.label}
            </label>
          </div>

          <select
            value={filters[section.id]}
            onChange={(e) =>
              setFilters({ ...filters, [section.id]: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-sm outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJncmF5Ij48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE5IDlsLTcgNy03LTciLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1em]"
          >
            {section.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default GalleryFilters;
