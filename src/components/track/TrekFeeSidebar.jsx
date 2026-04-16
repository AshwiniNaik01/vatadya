import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Calendar,
  ChevronDown,
  Activity,
  CheckCircle,
  AlertCircle,
  Zap,
  IndianRupee,
  Users,
  ArrowRight,
  Mountain,
  Compass,
  MapPin,
  Sun,
  Cloud,
  Wind,
} from "lucide-react";

const TrekFeeSidebar = ({ trek }) => {
  const [openMonth, setOpenMonth] = useState(null);
  if (!trek) return null;

  const totalFee = trek?.feeDetails?.totalFee || 0;
  const trekMonths = trek.months || [];

  // Helper to get season icon
  const getSeasonIcon = (season) => {
    switch (season?.toLowerCase()) {
      case "spring":
        return <Sun className="w-3.5 h-3.5" />;
      case "summer":
        return <Sun className="w-3.5 h-3.5" />;
      case "autumn":
        return <Wind className="w-3.5 h-3.5" />;
      case "winter":
        return <Cloud className="w-3.5 h-3.5" />;
      default:
        return <Calendar className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-5 font-sans">
      {/* ===== PRICE CARD ===== */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 overflow-hidden shadow-sm">
        {/* Decorative mountain silhouette */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <Mountain className="w-24 h-24 text-amber-700" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[10px] font-medium text-amber-600 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded-full">
              Expedition Fee
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-amber-700 font-semibold text-lg">₹</span>
            <span className="text-3xl font-bold text-amber-900">
              {totalFee.toLocaleString()}
            </span>
            <span className="text-amber-600 text-xs font-medium ml-1">
              /person
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium">Includes GST & basic insurance</span>
          </div>
        </div>
      </div>

      {/* ===== FEE BREAKDOWN ===== */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
          Fee Details
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            {
              icon: ShieldCheck,
              label: "Insurance",
              value: trek.feeDetails?.insurance?.amount
                ? `₹${trek.feeDetails.insurance.amount.toLocaleString()}`
                : "Included",
              color: "emerald",
            },
            {
              icon: Clock,
              label: "Discount",
              value: trek.feeDetails?.discount?.value
                ? `${trek.feeDetails.discount.value}%`
                : "No discount",
              color: "amber",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`bg-${item.color}-50 rounded-lg p-3 border border-${item.color}-100`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-3.5 h-3.5 text-${item.color}-600`} />
                  <span className="text-[10px] font-medium text-slate-500 uppercase">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold text-${item.color}-700 block`}
                >
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== BATCHES SECTION ===== */}
      {trekMonths.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
              Available Batches
            </h4>
            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
              {trekMonths.length}{" "}
              {trekMonths.length === 1 ? "window" : "windows"}
            </span>
          </div>

          <div className="space-y-2">
            {trekMonths.map((m, i) => (
              <div
                key={i}
                className={`border rounded-lg overflow-hidden transition-all duration-200 cursor-pointer
                  ${
                    openMonth === i
                      ? "border-amber-200 bg-amber-50/30 shadow-sm"
                      : "border-slate-200 bg-white hover:border-amber-200"
                  }`}
                onClick={() => setOpenMonth(openMonth === i ? null : i)}
              >
                {/* Batch Header */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                      ${openMonth === i ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"}`}
                    >
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${openMonth === i ? "text-amber-700" : "text-slate-700"}`}
                      >
                        {m.month}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        {getSeasonIcon(m.season)}
                        <span>{m.season || "All Season"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {m.badge && (
                      <span className="text-[9px] font-medium bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                        {m.badge}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 
                      ${openMonth === i ? "rotate-180 text-amber-500" : ""}`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {openMonth === i && (
                  <div className="px-3 pb-3 pt-0">
                    <div className="bg-white rounded-lg border border-slate-200 p-3">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center gap-1.5">
                          <Activity
                            className={`w-3.5 h-3.5 ${m.slotsAvailable ? "text-emerald-500" : "text-rose-500"}`}
                          />
                          <span
                            className={`font-medium ${m.slotsAvailable ? "text-emerald-600" : "text-rose-600"}`}
                          >
                            {m.slotsAvailable
                              ? "Slots Available"
                              : "Fully Booked"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Max 12</span>
                        </div>
                      </div>

                      <button
                        disabled={!m.slotsAvailable}
                        className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5
                          ${
                            m.slotsAvailable
                              ? "bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                      >
                        {m.slotsAvailable ? (
                          <>
                            <span>Book This Batch</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          "Batch Full"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== QUICK LINKS ===== */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-3">
          <span className="w-1 h-4 bg-amber-400 rounded-full"></span>
          Quick Links
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Inclusions", key: "inclusions", icon: CheckCircle },
            { label: "Cancellation", key: "cancellation", icon: AlertCircle },
            { label: "Terms", key: "terms", icon: ShieldCheck },
          ].map((link) => {
            const fileData = trek.links?.[link.key];
            const cdnUrl = fileData?.cdnUrl || null;
            const Icon = link.icon;

            return (
              <a
                key={link.key}
                href={cdnUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all group
                  ${
                    cdnUrl
                      ? "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                      : "text-slate-300 cursor-not-allowed"
                  }`}
                onClick={(e) => !cdnUrl && e.preventDefault()}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${cdnUrl ? "group-hover:text-amber-500" : ""}`}
                />
                <span className="font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ===== TREKKING TIP ===== */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 mt-4">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
              Trekker's Tip
            </p>
            <p className="text-xs text-slate-600">
              Book at least 30 days in advance for best batch availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekFeeSidebar;
