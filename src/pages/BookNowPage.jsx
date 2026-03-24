import React, { useState } from "react";
import {
  Calendar,
  User,
  Phone,
  Shield,
  Zap,
  Activity,
  Target,
  ChevronRight,
  Sparkles,
  Lock,
  Globe,
  Star,
  Mountain,
  ArrowRight,
  CheckCircle,
  Compass,
  Award,
  HeartHandshake,
  Clock
} from "lucide-react";
import BookNowModal from "../components/modals/BookNowModal";

const BookNowPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const advantages = [
    {
      title: "Expert Guides",
      desc: "Certified mountaineers with 10,000+ hours of high-altitude experience.",
      icon: Award,
      gradient: "from-sky-400 to-blue-500",
      bg: "bg-sky-50",
      border: "border-sky-100",
      text: "text-sky-600"
    },
    {
      title: "Safety First",
      desc: "Real-time health monitoring, emergency protocols, and dedicated support crews.",
      icon: Shield,
      gradient: "from-emerald-400 to-teal-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-600"
    },
    {
      title: "Custom Routes",
      desc: "Tailored itineraries crafted for every experience level from beginner to elite.",
      icon: Compass,
      gradient: "from-amber-400 to-orange-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-600"
    },
  ];

  const features = [
    "Flexible booking & easy cancellations",
    "All equipment included in base package",
    "Private group options available",
    "24/7 expedition support line",
    "Digital trek documents & certificates",
    "Eco-certified trek protocols"
  ];

  const stats = [
    { value: "10K+", label: "Adventurers", icon: User },
    { value: "150+", label: "Trek Routes", icon: Mountain },
    { value: "98%", label: "Success Rate", icon: Target },
    { value: "15+", label: "Regions", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-linear-gradient-to-b from-sky-50 via-white to-blue-50 overflow-x-hidden">
      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-yellow-50/40 rounded-full blur-[120px]" />
      </div>

      <BookNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* ════════════ HERO SECTION ════════════ */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503416997304-4319c3f7c9ec?auto=format&fit=crop&q=80"
            alt="Mountain Expedition"
            className="w-full h-full object-cover"
            style={{ animation: 'bookZoom 20s ease-in-out infinite' }}
          />
          <div className="absolute inset-0 bg-linear-gradient-to-b from-sky-900/70 via-sky-800/60 to-sky-50" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-10"
            style={{ animation: 'bookFadeUp 0.7s ease-out 0.2s both' }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">Book Your Expedition</span>
          </div>

          <h1
            className="text-6xl md:text-[8rem] font-bold text-white leading-[0.85] tracking-tight mb-8"
            style={{ animation: 'bookFadeUp 0.7s ease-out 0.3s both' }}
          >
            Start Your
            <br />
            <span className="text-transparent bg-clip-text bg-linear-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
              Journey
            </span>
          </h1>

          <p
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ animation: 'bookFadeUp 0.7s ease-out 0.4s both' }}
          >
            Secure your spot in one of our legendary Himalayan expeditions.
            Expert guides, world-class equipment, unforgettable moments.
          </p>

          <div style={{ animation: 'bookFadeUp 0.7s ease-out 0.5s both' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-4 bg-linear-gradient-to-r from-yellow-400 to-orange-400 text-sky-900
                         px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest
                         hover:from-yellow-300 hover:to-orange-300 hover:shadow-2xl hover:shadow-yellow-400/30
                         hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Book Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Wave curve divider */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[80px] block">
            <path fill="#f0f9ff" d="M0,60L60,65C120,70,240,80,360,78C480,76,600,62,720,55C840,48,960,48,1080,55C1200,62,1320,76,1380,83L1440,90L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* ════════════ STATS STRIP ════════════ */}
      <section className="relative z-10 -mt-2 max-w-5xl mx-auto px-6 mb-20" style={{ animation: 'bookFadeUp 0.7s ease-out 0.6s both' }}>
        <div className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-sky-100">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="group p-8 text-center hover:bg-sky-50/60 transition-colors cursor-default">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="text-3xl font-bold text-sky-700 mb-1">{stat.value}</div>
                  <div className="text-xs text-sky-400 font-semibold uppercase tracking-widest">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ ADVANTAGES SECTION ════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 bg-sky-100 border border-sky-200 rounded-full px-5 py-2.5 mb-7">
            <Shield className="w-4 h-4 text-sky-600" />
            <span className="text-sky-700 text-xs font-bold uppercase tracking-widest">Why Book With Us</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-sky-900 leading-tight">
            Expedition
            <span className="block text-transparent bg-clip-text bg-linear-gradient-to-r from-sky-500 to-blue-600">Assurance</span>
          </h2>
          <p className="text-sky-600/60 text-base mt-4 max-w-xl mx-auto">
            Every booking comes with our full promise of safety, expertise, and unforgettable experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {advantages.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group bg-white rounded-2xl border ${item.border} shadow-md shadow-sky-100/50 p-8 overflow-hidden
                            hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-200/50 transition-all duration-500 cursor-default`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top gradient stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-gradient-to-r ${item.gradient} rounded-t-2xl`} />

                <div className={`w-16 h-16 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mb-6
                  group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${item.text}`} />
                </div>
                <h3 className={`text-xl font-bold text-sky-900 mb-3 group-hover:${item.text} transition-colors`}>{item.title}</h3>
                <p className="text-sky-600/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Feature checklist + CTA */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Feature list */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-lg shadow-sky-100/50 p-10">
            <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest">What's Included</span>
            </div>
            <h3 className="text-2xl font-bold text-sky-900 mb-7">Every Booking Includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-sky-800">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative bg-linear-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-10 shadow-2xl shadow-blue-500/30 overflow-hidden flex flex-col justify-between">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/5 rounded-full" />
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <HeartHandshake className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Secure Booking</span>
              </div>
              <h3 className="text-4xl font-bold text-white leading-tight mb-4">
                Ready to Begin<br />
                <span className="text-yellow-300">Your Trek?</span>
              </h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Join thousands of adventurers who've trusted Vatadya for the journey of a lifetime.
              </p>
              <div className="flex items-center gap-3 text-white/60 text-xs mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure payments · SSL encrypted</span>
              </div>
              {/* <div className="flex items-center gap-3 text-white/60 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Free cancellation within 48 hours</span>
              </div> */}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 mt-10 group flex items-center justify-center gap-3 w-full py-4 bg-white text-sky-700
                         rounded-2xl font-bold text-sm uppercase tracking-widest
                         hover:bg-yellow-300 hover:text-sky-900 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              BOOK NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bookZoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
        }
        @keyframes bookFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BookNowPage;
