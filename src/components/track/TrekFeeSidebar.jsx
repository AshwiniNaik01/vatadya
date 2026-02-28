import React, { useState } from "react";
import {
  ShieldCheck, Clock, Calendar, ChevronDown, Activity,
  CheckCircle, AlertCircle, Zap, IndianRupee, Users, ArrowRight
} from "lucide-react";

const TrekFeeSidebar = ({ trek }) => {
  const [openMonth, setOpenMonth] = useState(null);
  if (!trek) return null;

  const totalFee = trek.price || 12999;
  const trekMonths = trek.months || [];

  return (
    <div className="space-y-6">
      {/* Price header */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-200 p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-sky-200/40 rounded-full translate-x-10 -translate-y-10 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="text-[10px] text-sky-500 font-bold uppercase tracking-widest mb-3">Total Package Price</div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sky-600 font-bold text-xl">₹</span>
            <span className="text-5xl font-bold text-sky-900 tracking-tight">{totalFee.toLocaleString()}</span>
            <span className="text-sky-400 text-sm font-semibold">/ person</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">Includes GST & Basic Insurance</span>
          </div>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="space-y-3">
        {[
          { icon: ShieldCheck, label: "Insurance Coverage", val: trek.feeDetails?.insurance ? `₹${trek.feeDetails.insurance}` : "Standard Plan", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { icon: Clock, label: "Transportation", val: trek.feeDetails?.transport ? `₹${trek.feeDetails.transport}` : "Base Logistics", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${item.bg} border ${item.border}`}>
              <div className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">{item.label}</div>
                <div className="text-sky-800 font-bold text-sm">{item.val}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Batch windows */}
      {trekMonths.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-500" />
              <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wider">Available Batches</h4>
            </div>
            <span className="px-2.5 py-1 bg-sky-100 text-sky-600 text-[10px] font-bold rounded-full">
              {trekMonths.length} windows
            </span>
          </div>

          <div className="space-y-2.5">
            {trekMonths.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer
                  ${openMonth === i
                    ? 'border-sky-300 bg-sky-50 shadow-md shadow-sky-100'
                    : 'border-sky-100 bg-white hover:border-sky-200'
                  }`}
                onClick={() => setOpenMonth(openMonth === i ? null : i)}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                      ${openMonth === i ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-500 border border-sky-200'}`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${openMonth === i ? 'text-sky-700' : 'text-sky-900'}`}>{m.month}</p>
                      <p className="text-[11px] text-sky-400 font-semibold">{m.season}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.badge && (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">{m.badge}</span>
                    )}
                    <ChevronDown className={`w-4 h-4 text-sky-400 transition-transform duration-300 ${openMonth === i ? 'rotate-180 text-sky-600' : ''}`} />
                  </div>
                </div>

                {openMonth === i && (
                  <div className="px-4 pb-4 pt-1">
                    <div className="bg-white rounded-xl border border-sky-200 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                          <Activity className="w-3.5 h-3.5 animate-pulse" />
                          {m.slotsAvailable ? 'Slots Available' : 'Fully Booked'}
                        </div>
                        <span className="text-sky-400">Max 12 people</span>
                      </div>
                      <button
                        disabled={!m.slotsAvailable}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                          ${m.slotsAvailable
                            ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600 hover:shadow-md hover:shadow-sky-200'
                            : 'bg-sky-50 text-sky-300 cursor-not-allowed border border-sky-100'
                          }`}
                      >
                        {m.slotsAvailable ? 'Book This Batch' : 'Batch Full'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sky-100">
        {["Inclusions", "Cancellation", "Terms", "Guidelines"].map((link) => (
          <a key={link} href="#"
            className="flex items-center gap-2 text-sky-500 text-xs font-semibold hover:text-sky-700 transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-200 group-hover:bg-sky-500 transition-colors" />
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrekFeeSidebar;
