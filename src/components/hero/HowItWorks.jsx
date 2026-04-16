import React, { useEffect, useState } from "react";
import { Target, Cpu, Map, Mountain, Flag, Zap } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [header, setHeader] = useState({ title: "", description: "" });
  const [phases, setPhases] = useState([]);

  // Default icons and colors (keep PHASE & icon order consistent)
  const icons = [Target, Cpu, Map, Mountain, Flag];
  const colors = [
    "from-yellow-300 to-orange-400",
    "from-cyan-400 to-blue-500",
    "from-indigo-400 to-purple-500",
    "from-pink-400 to-rose-500",
    "from-emerald-400 to-teal-500",
  ];

  useEffect(() => {
    const fetchHowWeWork = async () => {
      try {
        const response = await axiosInstance("/api/how-we-work");
        const result = response.data;

        if (result.success && result.data) {
          // Set header title & description
          setHeader({
            title: result.data.title,
            description: result.data.description,
          });

          // Map phases from backend
          const formattedPhases = result.data.phases.map((phase, idx) => ({
            id: (idx + 1).toString().padStart(2, "0"),
            title: phase.title,
            desc: phase.description,
            icon: icons[idx] || Target,
            color: colors[idx] || "from-yellow-300 to-orange-400",
          }));

          setPhases(formattedPhases);
        }
      } catch (error) {
        console.error("Error fetching How We Work data:", error);
      }
    };

    fetchHowWeWork();
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative py-12 overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-sky-700"
    >
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mountain Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover scale-105"
            alt="Mountain Trek"
          />
        </div>

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-blue-400/20 to-blue-900/80"></div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Scanline */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-yellow-300/10 to-transparent h-1/2 animate-scanline pointer-events-none opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* ===== Header ===== */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-3 
                          bg-white/10 backdrop-blur-sm 
                          border border-white/20 rounded-full 
                          px-6 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest">
              HOW WE WORK
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {header.title
              ? header.title.split(" ").map((word, index) => {
                  const isGradient = index === 1; // Highlight second word with gradient
                  return (
                    <span
                      key={index}
                      className={
                        isGradient
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 italic"
                          : ""
                      }
                    >
                      {word}{" "}
                    </span>
                  );
                })
              : "How The Expedition Works"}
          </h2>

          {header.description && (
            <p
              className="text-white/70 max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: header.description }}
            ></p>
          )}
        </div>

        {/* ===== Steps Grid ===== */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {phases.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`group relative p-6 rounded-2xl 
                            backdrop-blur-md border transition-all duration-500
                            ${
                              isActive
                                ? "bg-white/20 border-yellow-300 shadow-xl scale-105"
                                : "bg-white/10 border-white/20 hover:bg-white/20"
                            }`}
              >
                {/* Gradient Glow */}
                <div
                  className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity`}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4
                                bg-gradient-to-r ${step.color}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p
                    className="text-sm text-white/70 mb-4"
                    dangerouslySetInnerHTML={{ __html: step.desc }}
                  ></p>

                  <span className="text-xs font-bold text-yellow-300 tracking-widest">
                    PHASE {step.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scanline {
          0% { background-position-y: 0; }
          100% { background-position-y: 100%; }
        }
        .animate-scanline {
          animation: scanline 3s linear infinite;
          background-size: 100% 100%;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
