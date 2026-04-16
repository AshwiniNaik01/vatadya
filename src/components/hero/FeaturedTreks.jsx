// import React, { useState, useEffect, useRef } from "react";
// import { Player } from "@lottiefiles/react-lottie-player";
// import {
//   Cpu,
//   Compass,
//   Shield,
//   Microscope,
//   Zap,
//   Award,
//   Sparkles,
//   Activity,
// } from "lucide-react";
// import axios from "axios";

// import mountainAnimation from "../../lotties/mountain.json";
// import compassAnimation from "../../lotties/compass.json";
// import shieldAnimation from "../../lotties/shield.json";
// import radarAnimation from "../../lotties/radar.json";
// import zapAnimation from "../../lotties/electricity.json";
// import awardAnimation from "../../lotties/award.json";
// import axiosInstance from "../../api/axiosInstance";

// const Features = () => {
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [features, setFeatures] = useState([]);
//   const [mainTitle, setMainTitle] = useState("");
//   const sectionRef = useRef(null);

//   // Map titles to Lottie animations dynamically
//   const lottieMap = {
//     "Adventure Treks": mountainAnimation,
//     "GPS Array V4": compassAnimation,
//     "Failsafe Protocols": shieldAnimation,
//     "Sector Intelligence": radarAnimation,
//     "Rapid Deployment": zapAnimation,
//     "Verified Standards": awardAnimation,
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         setMousePosition({
//           x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
//           y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
//         });
//       }
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Fetch features from API
//   useEffect(() => {
//     const fetchFeatures = async () => {
//       try {
//         const res = await axiosInstance.get(`/api/our-features`);

//         console.log("API RESPONSE:", res.data); // 👈 VERY IMPORTANT

//         const apiData = res.data?.data;

//         if (!apiData || !apiData.features) {
//           console.warn("Invalid API structure", apiData);
//           return;
//         }

//         const lotties = [
//           mountainAnimation,
//           compassAnimation,
//           shieldAnimation,
//           radarAnimation,
//           zapAnimation,
//           awardAnimation,
//         ];

//         const colors = [
//           "from-sky-400 to-blue-400",
//           "from-blue-400 to-indigo-400",
//           "from-indigo-400 to-purple-400",
//           "from-purple-400 to-pink-400",
//           "from-pink-400 to-rose-400",
//           "from-rose-400 to-orange-400",
//         ];

//         const mappedFeatures = apiData.features.map((feature, index) => ({
//           title: feature.title,
//           description: feature.description,
//           stats: feature.statValue,
//           statLabel: feature.statLabel,
//           metric: feature.achievementMetric,
//           lottie: lottieMap[feature.title] || lotties[index % lotties.length],
//           icon: Cpu,
//           color: colors[index % colors.length],
//           delay: `${index * 0.1}s`,
//           // code: `CODE_${index + 1}`
//         }));

//         setFeatures(mappedFeatures);
//         setMainTitle(apiData.mainTitle || "");
//       } catch (err) {
//         console.error("Error fetching features:", err);
//       }
//     };

//     fetchFeatures();
//   }, []);
//   // Lottie fallback component
//   const LottieFallback = ({ icon: Icon, color }) => (
//     <div
//       className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${color} rounded-2xl bg-opacity-10`}
//     >
//       <Icon className="w-10 h-10 text-white" />
//     </div>
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="relative py-12 overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)",
//       }}
//     >
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 opacity-[0.08]"
//           style={{
//             backgroundImage: `
//             linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
//           `,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-6 py-3 mb-6 shadow-lg shadow-sky-100">
//             <Sparkles className="w-5 h-5 text-sky-500 animate-sparkle" />
//             <span className="text-sky-700 text-sm font-medium tracking-wide">
//               OUR ESSENTIALS
//             </span>
//             <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
//           </div>

//           <h2 className="text-4xl md:text-6xl font-bold text-sky-900 leading-tight mb-4">
//             <span>{mainTitle?.split(" ")[0]} </span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
//               {mainTitle?.split(" ").slice(1).join(" ")}
//             </span>
//           </h2>
//           {/* 
          
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             const isActive = activeFeature === index;

//             // Map colors for border safely
//             const borderColors = [
//               "border-sky-400",
//               "border-blue-400",
//               "border-indigo-400",
//               "border-purple-400",
//               "border-pink-400",
//               "border-rose-400",
//             ];

//             return (
//               <div
//                 key={index}
//                 onMouseEnter={() => setActiveFeature(index)}
//                 onMouseLeave={() => setActiveFeature(null)}
//                 className="group relative perspective-1000"
//               >
//                 <div
//                   className="relative transition-transform duration-500"
//                   style={{
//                     transform: isActive
//                       ? `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) scale(1.02)`
//                       : "none",
//                   }}
//                 >
//                   <div
//                     className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl transition-opacity duration-500 ${isActive ? "opacity-50" : "opacity-0"}`}
//                   />

//                   <div
//                     className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${isActive ? borderColors[index % borderColors.length] : "border-sky-100 hover:border-sky-300"}`}
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       {/* <span className="text-xs font-mono text-sky-400 bg-sky-50 px-2 py-1 rounded-md">{feature.code}</span> */}
//           <div className="flex items-center gap-1">
//             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//             <span className="text-xs font-medium text-sky-600">
//               {feature.metric}
//             </span>
//           </div>
//         </div>

//         <div className="relative w-20 h-20 mx-auto mb-4">
//           <div
//             className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity`}
//           />
//           {feature.lottie ? (
//             <Player
//               autoplay
//               loop
//               src={feature.lottie}
//               className="w-full h-full"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <Icon className={`w-10 h-10 text-sky-400`} />
//             </div>
//           )}
//         </div>

//         <h3 className="text-lg font-bold text-sky-900 text-center mb-2 group-hover:text-sky-600 transition-colors">
//           {feature.title}
//         </h3>
//         <p
//           className="text-sm text-sky-600/70 text-center mb-4 leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: feature.description }}
//         ></p>

//         <div className="flex items-center justify-center gap-3 pt-4 border-t border-sky-100">
//           <div className="text-center">
//             <div
//               className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
//             >
//               {feature.stats}
//             </div>
//             <div className="text-xs text-sky-500 mt-1">{feature.statLabel}</div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-100 rounded-b-2xl overflow-hidden">
//           <div
//             className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-700 ease-out ${isActive ? "w-full" : "w-0"}`}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;

import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Cpu,
  Compass,
  Shield,
  Microscope,
  Zap,
  Award,
  Sparkles,
  Activity,
} from "lucide-react";
import axios from "axios";

import mountainAnimation from "../../lotties/mountain.json";
import compassAnimation from "../../lotties/compass.json";
import shieldAnimation from "../../lotties/shield.json";
import radarAnimation from "../../lotties/radar.json";
import zapAnimation from "../../lotties/electricity.json";
import awardAnimation from "../../lotties/award.json";
import axiosInstance from "../../api/axiosInstance";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [features, setFeatures] = useState([]);
  const [mainTitle, setMainTitle] = useState("");
  const sectionRef = useRef(null);

  const lottieMap = {
    "Adventure Treks": mountainAnimation,
    "GPS Array V4": compassAnimation,
    "Failsafe Protocols": shieldAnimation,
    "Sector Intelligence": radarAnimation,
    "Rapid Deployment": zapAnimation,
    "Verified Standards": awardAnimation,
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axiosInstance.get(`/api/our-features`);
        const apiData = res.data?.data;

        if (!apiData || !apiData.features) return;

        const lotties = [
          mountainAnimation,
          compassAnimation,
          shieldAnimation,
          radarAnimation,
          zapAnimation,
          awardAnimation,
        ];

        const colors = [
          "from-sky-400 to-blue-400",
          "from-blue-400 to-indigo-400",
          "from-indigo-400 to-purple-400",
          "from-purple-400 to-pink-400",
          "from-pink-400 to-rose-400",
          "from-rose-400 to-orange-400",
        ];

        const mappedFeatures = apiData.features.map((feature, index) => ({
          title: feature.title,
          description: feature.description,
          stats: feature.statValue,
          statLabel: feature.statLabel,
          metric: feature.achievementMetric,
          lottie: lottieMap[feature.title] || lotties[index % lotties.length],
          icon: Cpu,
          color: colors[index % colors.length],
          delay: `${index * 0.1}s`,
        }));

        setFeatures(mappedFeatures);
        setMainTitle(apiData.mainTitle || "");
      } catch (err) {
        console.error("Error fetching features:", err);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)",
      }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-6 py-3 mb-6 shadow-lg shadow-sky-100">
            <Sparkles className="w-5 h-5 text-sky-500 animate-sparkle" />
            <span className="text-sky-700 text-sm font-medium tracking-wide">
              OUR ESSENTIALS
            </span>
            <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-sky-900 leading-tight mb-4">
            <span>{mainTitle?.split(" ")[0]} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              {mainTitle?.split(" ").slice(1).join(" ")}
            </span>
          </h2>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;

            const borderColors = [
              "border-sky-400",
              "border-blue-400",
              "border-indigo-400",
              "border-purple-400",
              "border-pink-400",
              "border-rose-400",
            ];

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                className="group relative perspective-1000"
              >
                <div
                  className="relative transition-transform duration-500"
                  style={{
                    transform: isActive
                      ? `rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) scale(1.02)`
                      : "none",
                  }}
                >
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl transition-opacity duration-500 ${
                      isActive ? "opacity-50" : "opacity-0"
                    }`}
                  />

                  <div
                    className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isActive
                        ? borderColors[index % borderColors.length]
                        : "border-sky-100 hover:border-sky-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-sky-600">
                          {feature.metric}
                        </span>
                      </div>
                    </div>

                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-10 group-hover:opacity-20`}
                      />
                      {feature.lottie ? (
                        <Player autoplay loop src={feature.lottie} />
                      ) : (
                        <Icon className="w-10 h-10 text-sky-400" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-sky-900 text-center mb-2">
                      {feature.title}
                    </h3>

                    <p
                      className="text-sm text-sky-600/70 text-center mb-4"
                      dangerouslySetInnerHTML={{
                        __html: feature.description,
                      }}
                    />

                    <div className="flex justify-center pt-4 border-t border-sky-100">
                      <div className="text-center">
                        <div
                          className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                        >
                          {feature.stats}
                        </div>
                        <div className="text-xs text-sky-500">
                          {feature.statLabel}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-100 rounded-b-2xl overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-700 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
