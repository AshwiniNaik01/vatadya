import React from "react";
import { Calendar, Layers, MapPin, Sparkles, Wind, ChevronDown, Filter } from "lucide-react";

const GalleryFilters = ({ filters, setFilters }) => {
  const filterSections = [
    {
      id: "season",
      label: "Season",
      icon: <Wind size={16} className="text-sky-500" />,
      options: ["All", "Winter", "Spring", "Summer", "Autumn"],
    },
    {
      id: "month",
      label: "Month",
      icon: <Calendar size={16} className="text-blue-500" />,
      options: [
        "All", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
    },
    {
      id: "year",
      label: "Year",
      icon: <Sparkles size={16} className="text-indigo-500" />,
      options: ["All", "2023", "2024", "2025"],
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Layers size={16} className="text-cyan-500" />,
      options: ["All", "Beginner", "Moderate", "Advanced"],
    },
    {
      id: "region",
      label: "Region",
      icon: <MapPin size={16} className="text-teal-500" />,
      options: ["All", "Uttarakhand", "Himachal", "Kashmir", "Nepal", "Sikkim"],
    },
  ];

  const getActiveFilterCount = () => {
    return Object.values(filters).filter((value) => value !== "All").length;
  };
  const activeCount = getActiveFilterCount();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Filters</h3>
        </div>
        {activeCount > 0 && (
          <span className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-bold tracking-wide shadow-sm">
            {activeCount} Active
          </span>
        )}
      </div>

      <div className="w-full h-px bg-slate-100 mb-6" />

      {filterSections.map((section) => {
        const isActive = filters[section.id] !== "All";

        return (
          <div key={section.id} className="space-y-3 group">
            <div className="flex items-center gap-2 text-slate-600">
              {section.icon}
              <label className="text-sm font-bold tracking-wide">
                {section.label}
              </label>
            </div>

            <div className="relative">
              <select
                value={filters[section.id]}
                onChange={(e) =>
                  setFilters({ ...filters, [section.id]: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-2xl border appearance-none outline-none transition-all cursor-pointer font-medium text-sm shadow-sm
                  ${isActive
                    ? "bg-sky-50 border-sky-300 text-sky-800 shadow-sky-100"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-sky-300 focus:ring-4 focus:ring-sky-100"
                  }`}
              >
                {section.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-white text-slate-700">
                    {opt === "All" ? `All ${section.label}s` : opt}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown
                  className={`w-4 h-4 transition-colors ${isActive ? "text-sky-500" : "text-slate-400"
                    }`}
                />
              </div>
            </div>
          </div>
        );
      })}

      {activeCount > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (value === "All") return null;
              return (
                <div
                  key={key}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs font-bold text-sky-700 shadow-sm transition-all hover:bg-sky-100"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => setFilters({ ...filters, [key]: "All" })}
                    className="hover:text-rose-500 transition-colors bg-white rounded-full p-0.5"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryFilters;
