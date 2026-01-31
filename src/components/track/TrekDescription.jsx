import React from "react";
import { FaCheckCircle } from "react-icons/fa";
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
        content:
          "Visit two magical high-altitude lakes along this trek – rare and stunning.",
      },
      {
        title: "Ridge Walk to Jhandi Top",
        content:
          "Enjoy the unforgettable ridge walk from Tilandi to Jhandi Top with panoramic views.",
      },
      {
        title: "Legendary Roopkund Trail Views",
        content:
          "Catch glimpses of the famous Roopkund trek trail from the ridge.",
      },
      {
        title: "Enchanting Rhododendron Forests",
        content:
          "Walk through some of the most vibrant and beautiful forests in the Himalayas.",
      },
      {
        title: "Gujreni Campsite",
        content:
          "Stay at Gujreni, a perfect blend of seclusion and open grassy clearings.",
      },
    ],
  },
];

const TrekPageWithFees = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* LEFT CONTENT */}
      <section className="lg:col-span-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-8">
          Trek to a high-altitude lake in{" "}
          <span className="text-yellow-600">Mt Trishul's shadow</span>
        </h2>

        <div className="space-y-7 text-[17px] leading-relaxed text-gray-700">
          {trekDescription.map((item, index) => {
            if (item.type === "paragraph") {
              return <p key={index}>{item.content}</p>;
            }

            if (item.type === "highlight") {
              return (
                <div
                  key={index}
                  className="flex gap-4 bg-yellow-50 border border-yellow-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <img src={item.icon} alt="icon" className="w-7 h-7 mt-1" />
                  <p className="font-medium text-gray-800">
                    {item.content}
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-yellow-700 underline underline-offset-2 ml-1 hover:text-yellow-800"
                    >
                      {item.link.text}
                    </a>
                  </p>
                </div>
              );
            }

            if (item.type === "list") {
              return (
                <div key={index} className="mt-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 ">
                    {item.title}
                  </h3>

                  <div className="space-y-4">
                    {item.items.map((li, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
                      >
                        <FaCheckCircle className="text-yellow-500 mt-1 text-lg" />
                        <div>
                          <h4 className="font-semibold text-xl text-gray-900  ">
                            {li.title}
                          </h4>
                          <p className="text-gray-700">{li.content}</p>
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
      <aside className=" sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-24 h-fit">
        <TrekFeeSidebar />
      </aside>
    </div>





  );
};

export default TrekPageWithFees;
