import React from "react";

const categories = [
  {
    title: "Treks by Month",
    icon: "https://indiahikes.com/assets/icons/months.svg",
    items: [
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
    links: [
      "/tag/january",
      "/tag/february",
      "/tag/march",
      "/tag/april",
      "/tag/may",
      "/tag/june",
      "/tag/july",
      "/tag/august",
      "/tag/september",
      "/tag/october",
      "/tag/november",
      "/tag/december",
    ],
    columns: 2,
  },
  {
    title: "Treks by Difficulty",
    icon: "https://indiahikes.com/assets/icons/difficulty.svg",
    items: [
      "Easy",
      "Easy - Moderate",
      "Moderate",
      "Moderate - Difficult",
      "Difficult",
    ],
    links: [
      "/tag/easy",
      "/tag/easy-moderate",
      "/tag/moderate",
      "/tag/moderate-difficult",
      "/tag/difficult",
    ],
  },
  {
    title: "Treks by Experience",
    icon: "https://indiahikes.com/assets/icons/specialtreks.svg",
    items: [
      "Family Treks",
      "Stargazing Treks",
      "Senior Treks",
      "Adventure Therapy",
      "Summer Camps",
    ],
    links: [
      "/family-trek-page",
      "/stargazing-in-the-himalayas",
      "/trek-for-seniors",
      "/adventure-therapy-treks",
      "/himalayan-trekking-summer-camps-indiahikes",
    ],
  },
  {
    title: "Treks by Season",
    icon: "https://indiahikes.com/assets/icons/seasons.svg",
    items: ["Spring", "Summer", "Monsoon", "Autumn", "Winter"],
    links: [
      "/tag/spring",
      "/tag/summer",
      "/tag/monsoon",
      "/tag/autumn",
      "/tag/winter",
    ],
  },
  {
    title: "Treks by Duration",
    icon: "https://indiahikes.com/assets/icons/duration.svg",
    items: ["2 days", "3 days", "4 days", "5 days", "6 days", "7+ days"],
    links: [
      "/tag/2-days",
      "/tag/3-days",
      "/tag/4-days",
      "/tag/5-days",
      "/tag/6-days",
      "/tag/7-plus-days",
    ],
  },
  {
    title: "Treks by Region",
    icon: "https://indiahikes.com/assets/icons/region.svg",
    items: [
      "Uttarakhand",
      "Himachal Pradesh",
      "Lahaul and Spiti",
      "Jammu & Kashmir",
      "Sikkim",
      "West Bengal",
      "Chhattisgarh",
      "Madhya Pradesh",
      "Karnataka",
      "Tamil Nadu",
      "Nepal",
      "Georgia",
      "Indonesia",
    ],
    links: [
      "/tag/uttarakhand",
      "/tag/himachal-pradesh",
      "/tag/lahaul-and-spiti",
      "/tag/jammu-and-kashmir",
      "/tag/sikkim",
      "/tag/west-bengal",
      "/tag/chhattisgarh",
      "/tag/madhya-pradesh",
      "/tag/karnataka",
      "/tag/tamil-nadu",
      "/tag/nepal",
      "/tag/georgia",
      "/tag/indonesia",
    ],
    columns: 2,
  },
];

const TreksByCategory = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          Treks by Categories
        </h2>
        <div className="w-full h-0.5 bg-yellow-400 mt-4"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-3xl shadow-lg p-6 min-h-82.5 overflow-hidden"
          >
            {/* Background Icon */}
            <img
              src={cat.icon}
              alt={cat.title}
              className="
          absolute bottom-6 right-6 w-36
          opacity-90
          grayscale
          brightness-125
          contrast-50
          z-0
          pointer-events-none
          select-none
        "
              loading="lazy"
            />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cat.title}
              </h3>

              <div className="w-12 h-0.5 bg-yellow-300 mb-4"></div>

              <ul
                className={`text-sm text-gray-700 ${
                  cat.columns === 2 ? "columns-2 gap-x-8" : "space-y-2"
                }`}
              >
                {cat.items.map((item, i) => (
                  <li key={i} className="break-inside-avoid mb-2">
                    <a
                      href={cat.links[i]}
                      className="hover:text-yellow-500 transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TreksByCategory;
