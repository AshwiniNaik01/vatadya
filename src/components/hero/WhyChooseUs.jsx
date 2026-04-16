import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  Shield,
  Users,
  Gem,
  Leaf,
  Award,
  Zap,
  Activity,
  CheckCircle,
  Star,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const WhyChooseUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWhyUs = async () => {
      try {
        const res = await axiosInstance.get(`/api/why-choose-us`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching Why Choose Us data:", err);
      }
    };

    fetchWhyUs();
  }, []);

  if (!data) return null; // or loading spinner

  // Map API data to features
  const features = data.whyUsItems.map((item, index) => {
    const icons = [Shield, Users, Gem, Leaf, Award, Zap];
    const colors = [
      "from-sky-400 to-blue-400",
      "from-blue-400 to-indigo-400",
      "from-indigo-400 to-purple-400",
      "from-emerald-400 to-teal-400",
      "from-amber-400 to-orange-400",
      "from-rose-400 to-pink-400",
    ];
    const Icon = icons[index % icons.length];
    return {
      icon: <Icon className="w-6 h-6" />,
      title: item.title,
      description: item.description,
      color: colors[index % colors.length],
    };
  });

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <Activity className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
            {data.mainTitle.split(" ").slice(0, 3).join(" ")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              {data.mainTitle.split(" ").slice(3).join(" ")}
            </span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mx-auto max-w-7xl">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 via-blue-200 to-transparent"></div>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative flex items-start gap-6 pl-16 group"
                >
                  <div
                    className={`absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} 
                                  flex items-center justify-center text-white shadow-lg
                                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    {feature.icon}
                  </div>
                  <div
                    className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4
                                  border border-sky-100 shadow-lg hover:shadow-xl 
                                  transition-all duration-500 group-hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-bold text-sky-900 mb-2">
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm text-sky-700/70 mb-3"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image + Stats */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
              <div
                className="relative aspect-square rounded-full overflow-hidden
                              border-8 border-white shadow-2xl"
              >
                <img
                  src={data.image.cdnUrl || data.image.fullS3URL}
                  alt="Why Choose Us"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent"></div>
              </div>

              {/* Floating Stat Cards */}
              <div
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm 
                              rounded-2xl p-4 shadow-xl border border-sky-100
                              animate-float"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 
                                  flex items-center justify-center"
                  >
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-900">
                      {data.expeditions}
                    </div>
                    <div className="text-xs text-sky-600">Expeditions</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm 
                              rounded-2xl p-4 shadow-xl border border-sky-100
                              animate-float-delayed"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 
                                  flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-900">
                      {data.happyTrekkers}
                    </div>
                    <div className="text-xs text-sky-600">Happy Trekkers</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm 
                              rounded-xl px-4 py-2 shadow-lg border border-sky-100"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-sky-900">
                    {data.rating}
                  </span>
                  <span className="text-xs text-sky-600">(Reviews)</span>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm 
                              rounded-xl px-4 py-2 shadow-lg border border-sky-100"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-sky-900">
                    100% Safety
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
