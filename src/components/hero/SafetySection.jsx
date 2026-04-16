import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const SafetySection = () => {
  const [protocols, setProtocols] = useState([]);
  const [protocolsHeader, setProtocolsHeader] = useState({
    title: "",
    description: "",
  }); // Added state

  useEffect(() => {
    const fetchSafetyStandards = async () => {
      try {
        const response = await axiosInstance("/api/safety-standards");
        const result = response.data;

        if (result.success && result.data) {
          // MAIN TITLE & DESCRIPTION FROM BACKEND
          setProtocolsHeader({
            title: result.data.title,
            description: result.data.description,
          });

          // CARDS FROM BACKEND
          const formattedProtocols = result.data.standards.map((item) => ({
            title: item.title,
            desc: item.description,
            image: item.image?.cdnUrl || "",
          }));
          setProtocols(formattedProtocols);
        }
      } catch (error) {
        console.error("Error fetching safety standards:", error);
      }
    };

    fetchSafetyStandards();
  }, []);

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700">
      <div className="flex justify-center items-center">
        <div className="inline-flex items-center gap-2 bg-sky-900/80 backdrop-blur-sm border border-white rounded-full px-5 py-2 mb-6 shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-bold tracking-wide">
            OUR SAFETY STANDARDS
          </span>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070"
          alt="Mountain Background"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-blue-400/20 to-blue-900/80"></div>

      {/* Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {protocolsHeader.title ? (
              protocolsHeader.title.split(" ").map((word, index) => {
                const isGradient = index === 1; // apply gradient to 2nd word
                return (
                  <span
                    key={index}
                    className={
                      isGradient
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 italic"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                );
              })
            ) : (
              <>
                Core{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 italic">
                  Safety Protocols
                </span>
              </>
            )}
          </h2>
          <p
            className="text-white/70 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: protocolsHeader.description }}
          ></p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {protocols.map((item, index) => {
            // Dark gray shades for cards
            const cardShades = [
              "bg-gray-800",
              "bg-gray-700",
              "bg-gray-900",
              "bg-gray-800",
            ];
            const bgClass = cardShades[index % cardShades.length];

            return (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden group shadow-xl ${bgClass}`}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>

                {/* Left Accent Border */}
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-300 to-orange-400"></div>

                {/* Content */}
                <div className="relative z-10 p-8 text-white h-full flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p
                    className="text-sm text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  ></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
