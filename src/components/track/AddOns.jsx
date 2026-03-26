import React from "react";
import { CheckCircle, Star } from "lucide-react";

const AddOns = ({ addons }) => {
  if (!addons?.length) return null;

  return (
    <section className="my-16">
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl md:text-3xl font-bold text-sky-900">
          Optional Add-Ons
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {addons.map((addon) => (
          <div
            key={addon._id}
            className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 border border-sky-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group"
          >
            {/* Decorative Circle */}
            <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-tr from-cyan-300 to-blue-400 rounded-full opacity-30 blur-xl group-hover:opacity-60 transition-all"></div>

            {/* Addon Name */}
            <h3 className="text-lg font-bold text-sky-900 mb-2">{addon.name}</h3>

            {/* Description */}
            <p className="text-sky-700 text-sm mb-4">{addon.description}</p>

            {/* Price Tag */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-emerald-600">
                ₹{addon.price.toLocaleString()}
              </span>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddOns;