import React from "react";
import {
  FaFlag,
  FaUsers,
  FaUtensils,
  FaBeer,
  FaFirstAid,
  FaMountain,
  FaCampground,
  FaCar,
} from "react-icons/fa";
import {
  Heart,
  ShieldCheck,
  Briefcase,
  Users,
  Clock,
  Zap,
  Star,
  Award,
  Leaf,
  Smile,
  Map,
  Globe,
  TrendingUp,
  ThumbsUp,
  CheckCircle,
  Gem
} from "lucide-react";

const heroCards = [
  { img: "/demo2.webp", delay: "delay-0" },
  { img: "/image2.jpg", delay: "delay-300" },
  { img: "/Demo1.webp", delay: "delay-600" },
];

const teamFacilities = [
  {
    icon: <FaFlag className="w-12 h-12 mx-auto text-green-800" />,
    title: "Trek Leaders",
    desc: "Qualified with Basic Mountaineering Course and Advanced Mountaineering Course. Each of the Trek Leaders holds Wilderness First Aid Responder Certification.",
  },
  {
    icon: <FaUsers className="w-12 h-12 mx-auto text-green-800" />,
    title: "Team",
    desc: "Besides Trek Leaders, every batch has sufficient support staff including local guides, cooks and helpers.",
  },
  {
    icon: <FaUtensils className="w-12 h-12 mx-auto text-green-800" />,
    title: "Food",
    desc: "Hygienic, energising and majorly vegetarian food with the occasional egg dishes.",
  },
  {
    icon: <FaBeer className="w-12 h-12 mx-auto text-green-800" />,
    title: "Equipment",
    desc: "High-end and well maintained sleeping, dining and toilet tents and other equipment like climbing ropes and crampons.",
  },
  {
    icon: <FaFirstAid className="w-12 h-12 mx-auto text-green-800" />,
    title: "Emergency Equipment",
    desc: "Stretcher, oxygen cylinders and well-stocked First Aid kits.",
  },
  {
    icon: <FaMountain className="w-12 h-12 mx-auto text-green-800" />,
    title: "High Altitude Chambers",
    desc: "(GEMO Bag) in certain high altitude treks. (Specially in Roopkund and Stok Kangri).",
  },
  {
    icon: <FaCampground className="w-12 h-12 mx-auto text-green-800" />,
    title: "Accommodation",
    desc: "Hygienic, energising and majorly vegetarian food with the occasional egg dishes.",
  },
  {
    icon: <FaCar className="w-12 h-12 mx-auto text-green-800" />,
    title: "Transport",
    desc: "From pick-up point to base camp in MUV or smaller vehicles for safe and comfortable rides.",
  },
];

// ================= TEAM & FACILITIES COMPONENT =================
const TeamFacilitiesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-6 bg-gradient-to-br from-white via-emerald-50 to-white">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
        Team and Facilities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {teamFacilities.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            {item.icon}
            <h5 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 mb-2">
              {item.title}
            </h5>
            <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ================= ABOUT US PAGE =================
const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src="./about.jpg"
          className="absolute inset-0 w-full h-full object-cover animate-[slowzoom_20s_ease-in-out_infinite]"
          alt="TrekVede"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          <h1 className="text-5xl md:text-6xl font-extrabold 
    bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 
    bg-clip-text text-transparent drop-shadow-lg">
            TrekkVede
          </h1>

          <div className="w-24 h-1 rounded-full mt-4 mb-6 
       bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

          <p className="text-lg md:text-2xl tracking-widest uppercase font-medium
          bg-gradient-to-r from-yellow-200 to-yellow-400
           bg-clip-text text-transparent">
            Explore the Himalayas with Experts
          </p>



        </div>


        {/* HERO IMAGE CARDS */}
        <div className="absolute bottom-8 w-full z-20">
          <div className="max-w-6xl mx-auto flex justify-center gap-8 px-6">
            {heroCards.map((card, i) => (
              <div
                key={i}
                className={`w-[240px] h-[180px] rounded-2xl overflow-hidden border-4 border-white/80 shadow-2xl animate-slideUp opacity-0 ${card.delay}`}
                style={{ animationFillMode: "forwards" }}
              >
                <img
                  src={card.img}
                  alt="trek"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="relative py-16 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 overflow-hidden">
        {/* Decorative blurred blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-28 items-center">
            {/* -------- LEFT CONTENT -------- */}
            <div>
              <span className="inline-block text-sm uppercase tracking-widest text-emerald-700 font-semibold bg-emerald-100 px-4 py-1 rounded-full">
                About TrekVede
              </span>

              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-6 leading-tight">
                Who <span className="text-emerald-700">We Are</span>
              </h2>

              {/* Accent line */}
              <div className="w-24 h-1.5 bg-emerald-600 mt-6 rounded-full" />

              <p className="text-gray-700 mt-10 leading-relaxed text-lg">
                TrekVede is a premium trekking platform crafted for explorers
                who crave authentic Himalayan adventures. We are not just a
                trekking company — we are a community of passionate
                mountaineers, nature lovers, and travel professionals who
                believe that the mountains are best experienced with respect,
                responsibility, and preparation.
              </p>

              <p className="text-gray-700 mt-6 leading-relaxed text-lg">
                Founded with a vision to redefine trekking standards in India,
                TrekVede bridges the gap between adventure and professionalism.
                Every trek we design is thoughtfully curated, blending raw
                Himalayan beauty with structured planning, modern safety
                protocols, and ethical tourism practices.
              </p>
            </div>

            {/* -------- RIGHT IMAGES -------- */}
            <div className="relative group">
              {/* Main Image */}
              <img
                src="/Sample1.heic"
                alt="Trekking Adventure"
                className="rounded-3xl shadow-2xl w-full object-cover
          transform group-hover:scale-[1.02] transition duration-700"
              />

              {/* Overlapping Image */}
              <img
                src="/Sample1.heic"
                alt="Himalayan Trek"
                className="absolute -bottom-20 -left-20 w-72 h-72 object-cover
          rounded-3xl shadow-2xl border-8 border-white
          hidden md:block transform group-hover:rotate-1 transition duration-700"
              />

              {/* Floating Badge */}
              <div
                className="absolute top-6 right-6 bg-white/70 backdrop-blur-lg
        px-6 py-4 rounded-2xl shadow-xl border border-white/60"
              >
                <p className="text-sm text-gray-500">Trusted by</p>
                <p className="text-xl font-bold text-gray-900">
                  Adventure Lovers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="w-full py-14 px-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-green-800">
            Why Choose TrekVede
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Experience the Himalayas with safety, sustainability and expert guidance
          </p>

          {/* CONTENT GRID */}
          <div className="mt-10 grid lg:grid-cols-3 gap-8 items-center justify-center">
            {/* LEFT CARDS */}
            <div className="grid gap-5">
              <div className="bg-green-800 text-white rounded-2xl p-5 flex gap-4 shadow-lg hover:-translate-y-1 transition justify-center text-left">
                <div className="text-2xl">🌞</div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Certified Trek Leaders
                  </h3>
                  <p className="text-sm mt-1 text-green-100">
                    Trained in mountaineering, safety & first aid.
                  </p>
                </div>
              </div>

              <div className="bg-white text-gray-900 rounded-2xl p-5 flex gap-4 border border-gray-200 shadow hover:-translate-y-1 transition justify-center text-left">
                <div className="text-2xl">⏰</div>
                <div>
                  <h3 className="font-semibold text-lg">Safety First</h3>
                  <p className="text-sm mt-1 text-gray-600">
                    Medical kits, oxygen cylinders & protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER IMAGE */}
            <div className="flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white max-w-sm">
                <img
                  src="/Demo1.webp"
                  alt="Trekking"
                  className="w-full h-[300px] object-cover hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="grid gap-5">
              <div className="bg-emerald-700 text-white rounded-2xl p-5 flex gap-4 shadow-lg hover:-translate-y-1 transition justify-center text-left">
                <div className="text-2xl">📅</div>
                <div>
                  <h3 className="font-semibold text-lg">Eco-Friendly Treks</h3>
                  <p className="text-sm mt-1 text-emerald-100">
                    Responsible trekking & sustainability.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 text-white rounded-2xl p-5 flex gap-4 shadow-lg hover:-translate-y-1 transition justify-center text-left">
                <div className="text-2xl">⚙️</div>
                <div>
                  <h3 className="font-semibold text-lg">Custom Itineraries</h3>
                  <p className="text-sm mt-1 text-gray-300">
                    Tailor-made experiences for all levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <div className="relative max-w-7xl mx-auto -mt-10 mb-20 px-6 z-20">
        {/* Animated Background Blobs */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-emerald-300 rounded-full blur-2xl opacity-40 animate-pulse delay-75"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-blue-300 rounded-full blur-2xl opacity-40 animate-pulse delay-300"></div>

        <div className="relative bg-white/90 backdrop-blur-xl border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-10 flex flex-wrap justify-around items-center gap-8">
          <div className="text-center group cursor-default">
            <div className="w-12 h-12 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-sm border border-emerald-100">
              <Smile className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">10K+</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Happy Trekkers</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>
          <div className="text-center group cursor-default">
            <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-sm border border-blue-100">
              <Map className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">150+</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Treks Completed</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>
          <div className="text-center group cursor-default">
            <div className="w-12 h-12 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-sm border border-amber-100">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">98%</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Success Rate</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200"></div>
          <div className="text-center group cursor-default">
            <div className="w-12 h-12 mx-auto bg-rose-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 shadow-sm border border-rose-100">
              <Globe className="w-6 h-6 text-rose-600" />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">15</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Countries Covered</div>
          </div>
        </div>
      </div>

      {/* ================= CORE VALUES ================= */}
      <section className="relative px-6 pb-10 pt-6 overflow-hidden bg-gray-50">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#059669 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-emerald-100/40 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Our DNA</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Customer Care", icon: Heart },
              { title: "Integrity", icon: ShieldCheck },
              { title: "Professionalism", icon: Briefcase },
              { title: "Teamwork", icon: Users },
              { title: "Safety", icon: CheckCircle },
              { title: "Reliability", icon: ThumbsUp },
              { title: "Efficiency", icon: Zap },
              { title: "Excellence", icon: Star },
              { title: "Quality", icon: Gem },
              { title: "Sustainability", icon: Leaf },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-1 rounded-2xl bg-white hover:bg-emerald-50/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer border border-gray-100 hover:border-emerald-200"
              >
                <div className="relative h-full rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50/50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-gray-700 group-hover:text-emerald-900 transition-colors">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM & FACILITIES ================= */}
      <TeamFacilitiesSection />

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes slowzoom {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.25); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
            animation: slideUp 0.8s ease-out forwards;
        }
        .delay-0 { animation-delay: 0ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-600 { animation-delay: 600ms; }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
