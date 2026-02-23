// components/Hero.jsx
import React from "react";
import { Play, ArrowRight, Shield, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute backdrop-blur-sm inset-0 bg-linear-to-r from-black/20 to-black/60 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://www.w3schools.com/howto/rain.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-4 py-2 my-4">
            <Shield className="w-4 h-4 text-amber-300 mr-2" />
            <span className="text-amber-100 text-sm font-medium">
              Trusted by 10,000+ Adventurers
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover the
            <span className="block text-amber-300">Mountain Trails</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Experience breathtaking landscapes, challenge your limits, and
            create unforgettable memories with our expert-guided treks across
            the world's most spectacular mountains.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => {
                // Smooth scroll to #treks section
                const element = document.getElementById("treks");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/trek-gallery")}
              className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300/10 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Adventure
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-300">150+</div>
              <div className="text-sm text-emerald-100">Treks Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-300">98%</div>
              <div className="text-sm text-emerald-100">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="text-sm text-emerald-100">Expert Guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Star className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="text-sm text-emerald-100">5-Star Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
