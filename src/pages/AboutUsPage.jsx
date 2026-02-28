import React, { useState } from "react";
import {
  Heart, ShieldCheck, Briefcase, Users, Zap, Star, Award,
  Leaf, Smile, Map, Globe, TrendingUp, ThumbsUp, CheckCircle, Gem,
  Activity, Target, Compass, Cpu, Layers, Radio, ArrowRight,
  Mountain, ChevronDown, Sparkles, Camera, Clock
} from "lucide-react";

const heroImages = [
  { img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800", label: "Himalayan Trails" },
  { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", label: "Alpine Peaks" },
  { img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800", label: "Forest Expeditions" },
];

const coreValues = [
  { title: "Safety First", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
  { title: "Integrity", icon: ShieldCheck, color: "text-sky-500", bg: "bg-sky-50", border: "border-sky-100" },
  { title: "Professionalism", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-100" },
  { title: "Team Synergy", icon: Users, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  { title: "Reliability", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
  { title: "Eco Stewardship", icon: Leaf, color: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
  { title: "Efficiency", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-100" },
  { title: "Excellence", icon: Star, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
  { title: "Premium Quality", icon: Gem, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100" },
  { title: "Sustainability", icon: TrendingUp, color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-100" },
];

const facilities = [
  { icon: Star, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100", label: "Expert Leaders", desc: "Certified mountaineers with Basic & Advanced Mountain certifications and Wilderness First Aid credentials." },
  { icon: Users, color: "text-sky-500", bg: "bg-sky-50", border: "border-sky-100", label: "Support Teams", desc: "Dedicated local specialists, culinary logistics crew, and heavy-gear support for every expedition." },
  { icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-100", label: "Optimized Nutrition", desc: "Caloric-dense, nutrient-rich field rations. Vegetarian-forward with high-protein options available." },
  { icon: Cpu, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-100", label: "Premium Gear", desc: "Tier-1 technical equipment — maintained sleeping chambers, dining pods, ropes, and crampons." },
  { icon: Activity, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100", label: "Medical Readiness", desc: "Stretchers, oxygen cylinders, and full-spectrum first-aid kits for immediate field response." },
  { icon: Mountain, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", label: "Altitude Chambers", desc: "GEMO compression bags deployed in high-altitude sectors like Roopkund & Stok Kangri." },
  { icon: Radio, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", label: "Weather Camps", desc: "Hardened base encampments engineered for maximum thermal retention in sub-zero zones." },
  { icon: Globe, color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-100", label: "Global Logistics", desc: "Safe, deterministic transport from extraction points to base camps using heavy-duty vehicles." },
];

const AboutUsPage = () => {
  const [activeValue, setActiveValue] = useState(null);

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-blue-50 min-h-screen overflow-x-hidden">

      {/* Decorative blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
      </div>

      {/* ─────────────── HERO (betravelish mountain-depth style) ─────────────── */}
      <section className="relative h-screen min-h-[640px] max-h-[900px] overflow-hidden flex flex-col items-center justify-center">

        {/* LAYER 1 — Sky / cloud gradient background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-200 via-sky-100 to-white" />

        {/* LAYER 2 — Far mountain background image (slightly transparent) */}
        <div className="absolute inset-0 z-[1]">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover object-center"
            style={{ animation: 'aboutSlowZoom 22s ease-in-out infinite', opacity: 0.55 }}
            alt="Sky background"
          />
          {/* Subtle sky overlay so clouds look misty */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-sky-50/10 to-white/60" />
        </div>

        {/* LAYER 3 — Huge animated brand name (sits BEHIND the mountains) */}
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-4 select-none">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/40 rounded-full px-5 py-2 mb-6 shadow-sm"
            style={{ animation: 'aboutFadeUp 0.9s ease-out 0.1s both' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase">About Vatadya</span>
          </div>

          {/* Brand name — betravelish style: yellow accent word + dark bold word */}
          <div className="text-center leading-[0.8] mb-4">
            {/* First word — Yellow/amber */}
            <div
              className="inline-block text-[clamp(2.5rem,10vw,7rem)] font-black tracking-tighter"
              style={{ animation: 'aboutFadeUp 0.8s ease-out 0.25s both', color: '#f59e0b' }}
            >
              {"VATA".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{ animation: `aboutLetterDrop 0.6s ease-out ${0.25 + i * 0.05}s both` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>

            {/* Example: adding DYA beside it */}
            <div
              className="inline-block text-[clamp(2.5rem,10vw,7rem)] font-black tracking-tighter text-sky-800 ml-2"
              style={{ animation: 'aboutFadeUp 0.8s ease-out 0.25s both' }}
            >
              {"DYA".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{ animation: `aboutLetterDrop 0.6s ease-out ${0.25 + i * 0.05}s both` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            {/* Second word — Dark/black */}
            {/* <div
              className="block text-[clamp(2.5rem,10vw,7rem)] font-black tracking-tighter text-slate-900"
              style={{ animation: 'aboutFadeUp 0.8s ease-out 0.5s both' }}
            >
              {"DYA".split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{ animation: `aboutLetterDrop 0.6s ease-out ${0.5 + i * 0.06}s both` }}
                >
                  {char}
                </span>
              ))}
            </div> */}
          </div>

          {/* Tagline */}
          <p
            className="text-slate-500 text-[11px] md:text-sm font-bold tracking-[0.4em] uppercase"
            style={{ animation: 'aboutFadeUp 0.8s ease-out 0.9s both' }}
          >
            Explore Peaks • Tread Mindfully • Trek With Purpose
          </p>
        </div>

        {/* LAYER 4 — Foreground mountain (sits ON TOP of text, creating depth illusion) */}
        <div className="absolute bottom-0 left-0 w-full z-[3] pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
            className="w-full object-cover object-top"
            style={{
              height: 'clamp(200px, 45vh, 420px)',
              objectPosition: 'center top',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
              animation: 'aboutSlowZoom 22s ease-in-out infinite reverse',
              filter: 'saturate(0.6) brightness(0.85)',
            }}
            alt="Mountain foreground"
          />
          {/* Bottom fade-to-page-bg */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-sky-50 to-transparent" />
        </div>

        {/* LAYER 5 — Scroll prompt */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
          onClick={() => document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ animation: 'aboutFadeUp 1s ease-out 1.3s both' }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─────────────── IDENTITY ─────────────── */}
      <section id="about-content" className="relative py-16 z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-6">
              <Target className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em]">Our Mission</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-sky-950 leading-[0.9] tracking-tight mb-6">
              Equipping the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Modern Pioneer</span>
            </h2>

            <p className="text-sky-800/70 text-base leading-relaxed mb-4 font-medium">
              Vatadya is a precision-engineered trekking platform designed for adventurers who demand curated expedition outcomes in the Himalayan and global theatre.
            </p>
            <p className="text-sky-600/50 text-xs leading-relaxed mb-8">
              Founded to transform traditional trekking, Vatadya synthesizes technical field wisdom with intelligent logistics. Every expedition is built on safety, sustainability, and unforgettable experiences.
            </p>

            <div className="flex items-center gap-5">
              <a href="/contact"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl
                           font-bold hover:from-sky-600 hover:to-blue-600 hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 transition-all group">
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-2 text-sky-600/60">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold">Always Online</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-sky-200/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-200/50 border border-sky-100 group-hover:border-sky-300 transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80"
                alt=""
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />

              {/* Status badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-md border border-white/50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-sky-800">All Systems Active</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-md border border-white/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-xs font-bold text-sky-700">Safety Certified</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white shadow-2xl border border-sky-100 rounded-2xl px-7 py-5 hidden xl:block">
                <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mb-1">Experience Level</div>
                <div className="text-2xl font-bold text-sky-900">TIER 1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── STATS (Delicate style) ─────────────── */}
      <section className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-sky-100/50 shadow-2xl shadow-sky-900/[0.04] overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sky-50">
              {[
                { val: "10K+", label: "Voyagers", icon: Smile, color: "text-sky-500", bg: "bg-sky-50/50" },
                { val: "150+", label: "Routes", icon: Map, color: "text-emerald-500", bg: "bg-emerald-50/50" },
                { val: "98%", label: "Success", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50/50" },
                { val: "15", label: "Regions", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50/50" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="group py-8 px-4 text-center hover:bg-white transition-colors cursor-default">
                    <div className={`w-10 h-10 mx-auto rounded-xl ${stat.bg} flex items-center justify-center mb-3
                      group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.val}</div>
                    <div className="text-[9px] text-sky-400 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── ADVANTAGES ─────────────── */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.3em]">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950 tracking-tight leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 font-black">Excellence</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Compass, title: "Precision Navigation", desc: "Trained guides with 1,000+ mission hours ensuring every step is carefully planned and executed.", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
              { icon: Activity, title: "Failsafe Safety", desc: "Integrated medical sync, extraction protocols, and professional emergency response with zero compromise.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              { icon: Leaf, title: "Eco Stewardship", desc: "Zero-footprint mission protocols and active ecosystem preservation in every region we operate.", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
              { icon: Cpu, title: "Custom Expeditions", desc: "Tailor-made itineraries for all experience levels — from first-time trekkers to seasoned adventurers.", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i}
                  className="group bg-white rounded-2xl border border-sky-100 shadow-md shadow-sky-100/60 p-8 overflow-hidden
                             hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50 transition-all duration-400">
                  <div className="flex gap-5 items-start">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0
                      group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-sky-900 mb-2 group-hover:text-sky-600 transition-colors">{item.title}</h4>
                      <p className="text-sky-600/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wide image */}
          <div className="mt-10 rounded-3xl overflow-hidden shadow-2xl shadow-sky-200/50 border border-sky-100">
            <img
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80"
              className="w-full h-[280px] object-cover"
              alt="Trekkers"
            />
          </div>
        </div>
      </section>

      {/* ─────────────── CORE VALUES ─────────────── */}
      <section className="relative z-10 py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-full px-4 py-2 mb-6">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em]">Principles</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950 tracking-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-black">Standard</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coreValues.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeValue === i;
              return (
                <div key={i}
                  onClick={() => setActiveValue(isActive ? null : i)}
                  className={`group bg-white rounded-2xl border shadow-md p-7 text-center cursor-pointer transition-all duration-400
                    ${isActive
                      ? `${item.border} ${item.bg} shadow-lg -translate-y-2 ring-2 ring-offset-2 ring-sky-300`
                      : 'border-sky-100 shadow-sky-100/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50 hover:border-sky-200'
                    }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                    ${isActive ? `${item.bg} border ${item.border} scale-125` : 'bg-sky-50 border border-sky-100 group-hover:scale-110'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-sky-400 group-hover:text-sky-600'} transition-colors`} />
                  </div>
                  <h3 className={`text-xs font-bold uppercase tracking-wide transition-colors ${isActive ? item.color : 'text-sky-600'}`}>
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── FACILITIES ─────────────── */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sky-950 tracking-tight">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 font-black">Logic</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {facilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i}
                  className="group bg-white rounded-2xl border border-sky-100 shadow-md shadow-sky-100/40 p-7 text-center
                             hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/50 hover:border-sky-200 transition-all duration-400">
                  <div className={`w-14 h-14 mx-auto rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mb-5
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h5 className="text-sm font-bold text-sky-900 mb-3 group-hover:text-sky-600 transition-colors">{item.label}</h5>
                  <p className="text-[11px] text-sky-500/70 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="relative z-10 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          {/* Decorative pill */}
          <div className="inline-flex items-center gap-3 bg-white border border-sky-100 shadow-sm rounded-full px-5 py-2 mb-8">
            <Mountain className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-sky-600 text-[10px] font-black uppercase tracking-[0.4em]">Initialize</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-sky-950 leading-tight mb-6 tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 font-black">Begin?</span>
          </h2>
          <p className="text-sky-600/60 text-sm md:text-base mb-10 leading-relaxed font-medium">
            Join thousands of adventurers who've trusted Vatadya for their most extraordinary journeys in the mountains.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-500
                       text-white rounded-xl font-black text-[11px] uppercase tracking-widest
                       hover:from-sky-600 hover:to-blue-600 hover:shadow-2xl hover:shadow-sky-200 hover:-translate-y-0.5 transition-all duration-300 group">
            Commence Expedition
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <style>{`
        @keyframes aboutSlowZoom {
          0%, 100% { transform: scale(1.04); }
          50% { transform: scale(1.12); }
        }
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes aboutLetterDrop {
          from { opacity: 0; transform: translateY(-40px) scaleY(1.3); }
          to { opacity: 1; transform: translateY(0) scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;
