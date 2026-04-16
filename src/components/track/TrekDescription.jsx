import React from "react";
import {
  Mountain as MountainIcon,
  Trees,
  Users,
  CheckCircle,
  Info,
  MapPin,
  ArrowRight,
  Zap,
  Leaf,
  Shield,
} from "lucide-react";
import TrekFeeSidebar from "./TrekFeeSidebar";

const TrekPageWithFees = ({ trek }) => {
  if (!trek) return null;

  const highlights = [
    {
      icon: MountainIcon,
      title: "Peak Altitude",
      content: `Reach a peak altitude of ${trek.altitude} in the stunning ${trek.location} range — a milestone in alpine trekking.`,
      color: "text-sky-600",
      bg: "bg-sky-50",
      border: "border-sky-100",
      gradient: "from-sky-400 to-blue-500",
    },
    {
      icon: Users,
      title: "Group & Duration",
      content: `A ${trek.duration} journey with a curated group size of ${trek.groupSize} — balanced for camaraderie and safety.`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      icon: Trees,
      title: "Best Season",
      content: `Optimized for ${trek.season} with verified meteorological stability — ideal conditions guaranteed.`,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      gradient: "from-amber-400 to-orange-400",
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
                <h3 className="text-sky-900 font-bold text-base">
                  About This Trek
                </h3>
              </div>
              <div
                className="text-sky-700/70 leading-relaxed text-[15px] prose prose-sky max-w-none"
                dangerouslySetInnerHTML={{ __html: trek.description }}
              />
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
              <div
                className="text-sky-700/70 leading-relaxed prose prose-emerald max-w-none"
                dangerouslySetInnerHTML={{ __html: trek.bestFor }}
              />
            </div>
          )}

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
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-emerald-800"
                  >
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
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-rose-700"
                  >
                    <div className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400">
                      ✕
                    </div>
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
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TrekPageWithFees;
