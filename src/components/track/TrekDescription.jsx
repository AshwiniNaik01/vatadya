import React from "react";
import {
  Mountain as MountainIcon, Trees, Users, CheckCircle, Info,
  MapPin, ArrowRight, Zap, Leaf, Shield
} from "lucide-react";
import TrekFeeSidebar from "./TrekFeeSidebar";

const TrekPageWithFees = ({ trek }) => {
  if (!trek) return null;

  const highlights = [
    {
      icon: MountainIcon,
      title: "Peak Altitude",
      content: `Reach a peak altitude of ${trek.altitude} in the stunning ${trek.location} range — a milestone in alpine trekking.`,
      color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100", gradient: "from-sky-400 to-blue-500"
    },
    {
      icon: Users,
      title: "Group & Duration",
      content: `A ${trek.duration} journey with a curated group size of ${trek.groupSize} — balanced for camaraderie and safety.`,
      color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: Trees,
      title: "Best Season",
      content: `Optimized for ${trek.season} with verified meteorological stability — ideal conditions guaranteed.`,
      color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", gradient: "from-amber-400 to-orange-400"
    },
  ];

const inclusions =
  trek?.inclusions?.length > 0
    ? trek.inclusions
    : [
        "Expert certified mountain guides",
        "All meals during the trek",
        "Accommodation at campsites",
        "Emergency first-aid & medical support",
      ];

const exclusions =
  trek?.exclusions?.length > 0
    ? trek.exclusions
    : [
        "Personal trekking gear & clothing",
        "Travel insurance (recommended)",
        "Travel to/from base camp",
        "Personal expenses",
      ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── LEFT CONTENT ── */}
        <section className="lg:col-span-8 space-y-12">

          {/* Description */}
          {trek.description && (
            <div className="bg-gradient-to-br from-sky-50 to-blue-50/50 rounded-2xl border border-sky-100 p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sky-900 font-bold text-base">About This Trek</h3>
              </div>
              <p className="text-sky-700/70 leading-relaxed text-[15px]">{trek.description}</p>
            </div>
          )}

          {/* Best For */}
          {trek.bestFor && (
            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sky-900 font-bold">Best Suited For</h3>
              </div>
              <p className="text-sky-700/70 leading-relaxed">{trek.bestFor}</p>
            </div>
          )}

          {/* Highlight cards */}
  {/* <div>
  <h3 className="text-sky-900 font-bold mb-5 flex items-center gap-2">
    <MapPin className="w-4 h-4 text-sky-500" />
    Trek Highlights
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    {trek?.highlight?.length ? (
      trek.highlight.map((item, i) => (
        <div
          key={i}
          className="relative bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden group
          hover:-translate-y-1 hover:shadow-md hover:shadow-sky-100 transition-all duration-300"
        >
          {/* Top gradient stripe */}
          {/* <div className="h-1.5 bg-gradient-to-r from-sky-400 to-blue-500" />

          <div className="p-6">

            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4
              group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 text-sky-600" />
            </div>

            <h4 className="font-bold text-sky-900 text-sm mb-2">
              Highlight {i + 1}
            </h4>

            <p className="text-sky-500/70 text-xs leading-relaxed">
              {item}
            </p>

          </div>
        </div>
      ))
    ) : (
      <p className="text-sky-400 text-sm">No highlights available</p>
    )}

  </div>
</div> */}

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-emerald-800">What's Included</h4>
              </div>
              <ul className="space-y-3">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-emerald-800">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-rose-50 rounded-2xl border border-rose-100 p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-rose-400 flex items-center justify-center">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-rose-800">Not Included</h4>
              </div>
              <ul className="space-y-3">
                {exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-rose-700">
                    <div className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400">✕</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </section>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="relative lg:col-span-4">
          <div className="sticky top-[140px] lg:top-[160px] space-y-5 z-4">
            {/* Fee sidebar */}
            <div className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-900/[0.04] p-8">
              <TrekFeeSidebar trek={trek} />
            </div>

            {/* Verified badge */}
            {/* <div className="bg-white rounded-2xl border border-sky-100 p-5 flex items-center gap-4
                            hover:border-sky-200 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-sky-900">Verified & Safe</p>
                <p className="text-xs text-sky-500/60 leading-tight">Expert-led, safety-certified, fully insured expeditions.</p>
              </div>
            </div> */}

            {/* Eco badge */}
            {/* <div className="bg-white rounded-2xl border border-sky-100 p-5 flex items-center gap-4
                            hover:border-sky-200 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-sky-900">Eco-Responsible</p>
                <p className="text-xs text-sky-500/60 leading-tight">Leave-no-trace policy. Zero-footprint expedition protocols.</p>
              </div>
            </div> */}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default TrekPageWithFees;
