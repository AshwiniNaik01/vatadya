import React from "react";
import {
  CheckCircle2,
  Map,
  Waves,
  Mountain as MountainIcon,
  Trees,
  Tent as TentIcon,
  Sparkles,
  ArrowRight
} from "lucide-react";
import TrekFeeSidebar from "./TrekFeeSidebar";

const trekDescription = [
  {
    type: "paragraph",
    content:
      "Some of our top treks are favourites because of the breathtaking mountain views they offer. Think of Chaukhambha from Deoriatal Chandrashila or Bandarpoonch from Dayara Bugyal.",
  },
  {
    type: "paragraph",
    content:
      "Brahmatal, however, takes the cake. You are surrounded by the majestic Mt Trishul and Mt Nanda Ghunti. The scenery here is unparalleled in its beauty.",
  },
  {
    type: "paragraph",
    content:
      "The trek takes you through serene forests and meadows, leading to a peaceful high-altitude lake. The views of the Trishul massif and surrounding peaks will leave you spellbound.",
  },
  {
    type: "list",
    title: "5 Things We Love About the Brahmatal Trek",
    items: [
      {
        title: "High-Altitude Lakes",
        content: "Visit two magical high-altitude lakes along this trek – rare and stunning.",
        icon: <Waves className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500"
      },
      {
        title: "Ridge Walk to Jhandi Top",
        content: "Enjoy the unforgettable ridge walk from Tilandi to Jhandi Top with panoramic peak views.",
        icon: <MountainIcon className="w-6 h-6" />,
        color: "from-emerald-500 to-teal-500"
      },
      {
        title: "Legendary Roopkund Trail",
        content: "Catch glimpses of the famous Roopkund trek trail from the high-altitude ridge.",
        icon: <Map className="w-6 h-6" />,
        color: "from-amber-500 to-orange-500"
      },
      {
        title: "Enchanting Forests",
        content: "Walk through some of the most vibrant and beautiful Rhododendron forests in the Himalayas.",
        icon: <Trees className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500"
      },
      {
        title: "Gujreni Campsite",
        content: "Stay at Gujreni, a perfect blend of seclusion and open grassy clearings.",
        icon: <TentIcon className="w-6 h-6" />,
        color: "from-rose-500 to-pink-500"
      },
    ],
  },
];

const TrekPageWithFees = ({ trek }) => {
  if (!trek) return null;

  const dynamicDescription = [
    {
      type: "paragraph",
      content: trek.description
    },
    {
      type: "paragraph",
      content: trek.bestFor
    },
    {
      type: "list",
      title: "What Makes This Trek Special",
      items: [
        {
          title: "Stunning High Altitude",
          content: `Reach a peak altitude of ${trek.altitude}, offering breathtaking views of the ${trek.location} range.`,
          icon: <MountainIcon className="w-6 h-6" />,
          color: "from-emerald-500 to-teal-500"
        },
        {
          title: "Managed Adventure",
          content: `Expertly planned ${trek.duration} journey with a group size of ${trek.groupSize} for a personalized experience.`,
          icon: <Waves className="w-6 h-6" />,
          color: "from-blue-500 to-cyan-500"
        },
        {
          title: "Seasonal Magic",
          content: `Experience the best of ${trek.season} with crystal clear views and professional guide support.`,
          icon: <Trees className="w-6 h-6" />,
          color: "from-green-500 to-emerald-500"
        }
      ]
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Visual Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-8xl mx-auto px-4 py-12 lg:py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT CONTENT */}
          <section className="lg:col-span-2 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-widest border border-emerald-100">
                <Sparkles size={10} className="animate-pulse" />
                Expert Recommendation
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.2] tracking-tight">
                {trek.highlight || `Explore the beauty of ${trek.location}`}
              </h2>
            </div>

            <div className="space-y-6">
              {dynamicDescription.map((item, index) => {
                if (item.type === "paragraph" && item.content) {
                  return (
                    <div key={index} className="relative pl-5 border-l-2 border-emerald-100">
                      <p className="text-lg leading-relaxed text-gray-600 font-medium">
                        {item.content}
                      </p>
                    </div>
                  );
                }

                if (item.type === "list") {
                  return (
                    <div key={index} className="pt-4 space-y-8">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-10 bg-emerald-500 rounded-full"></div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                          {item.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {item.items.map((li, idx) => (
                          <div
                            key={idx}
                            className="group relative bg-white p-6 rounded-lg border border-gray-100 hover:border-emerald-700 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.08)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-50 to-transparent -mr-10 -mt-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="relative z-10 flex flex-col gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${li.color} p-0.5 shadow-md group-hover:rotate-3 transition-transform duration-500`}>
                                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-gray-800 scale-90">
                                  {li.icon}
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                  {li.title}
                                </h4>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                  {li.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="relative lg:col-span-1">
            <div className="sticky top-15 space-y-6">
              <div className="p-0.5 bg-gradient-to-br from-white via-emerald-100 to-blue-100 rounded-[28px] shadow-xl">
                <div className="bg-white rounded-[26px] p-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>

                  <div className="relative z-10">
                    <TrekFeeSidebar trek={trek} />
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Certified Experts</p>
                  <p className="text-[10px] text-gray-500">Ensuring safety on every mountain trail</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TrekPageWithFees;
