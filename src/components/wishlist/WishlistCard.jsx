
import { useState } from "react";
import { Heart, MapPin, Calendar, Users } from "react-feather";

const WishlistCard = ({ trek, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

return (
  <div
    className="group relative overflow-hidden rounded-sm transition-all duration-500 hover:scale-[1.02]"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* ❤️ Heart Button – Top Right */}
    <button
      onClick={() => onRemove(trek.id)}
      title="Remove from wishlist"
      className="absolute top-4 right-4 z-50 p-2 rounded-full backdrop-blur-md
                 bg-black/40 border border-white/20
                 transition-all duration-300 hover:bg-red-500/20 hover:border-red-400"
    >
      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
    </button>

    {/* 🔴 Discount Ribbon – Top Left */}
    {trek.discount && (
      <div className="absolute top-0 left-0 z-40 w-32 h-32 overflow-visible pointer-events-none">
        <span
          className="absolute top-4 left-[-45px] w-[180px]
                     text-white font-bold uppercase text-xs text-center leading-[22px]
                     px-6 py-1 shadow-lg"
          style={{
            background: "linear-gradient(45deg, #dc2626 0%, #b91c1c 100%)",
            transform: "rotate(-45deg)",
            boxShadow: "0 3px 10px -5px rgba(0,0,0,1)",
          }}
        >
          FLAT {trek.discount}% OFF
        </span>
      </div>
    )}

    {/* 🖼 Background Image */}
    <div className="absolute inset-0">
      <img
        src={trek.image}
        alt={trek.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
    </div>

    {/* 📦 Card Content */}
    <div className="relative z-10 h-full flex flex-col justify-end p-6 min-h-[500px]">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
        {trek.title}
      </h3>

      <div className="flex items-center text-gray-300 mb-4">
        <MapPin className="w-5 h-5 mr-2 text-amber-400" />
        <span className="font-medium">{trek.location}</span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-xs text-gray-300">DURATION</span>
          </div>
          <div className="text-white font-bold">{trek.duration}</div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-xs text-gray-300">GROUP</span>
          </div>
          <div className="text-white font-bold">{trek.groupSize}</div>
        </div>
      </div>

      {/* 💰 Price & CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
        <div>
          <div className="text-sm text-gray-100">FROM</div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white">
              ${trek.price.toLocaleString()}
            </span>
            {trek.originalPrice && (
              <span className="text-lg text-gray-400 line-through ml-2">
                ${trek.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <button 
          disabled={trek.status?.toLowerCase() === 'completed'}
          className={`bg-gradient-to-r from-amber-500 to-orange-500
                           hover:from-amber-600 hover:to-orange-600
                           text-white px-6 py-3 rounded-xl font-bold text-sm
                           transition-all duration-300 shadow-lg hover:shadow-xl ${trek.status?.toLowerCase() === 'completed' ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {trek.status?.toLowerCase() === 'completed' ? 'Completed' : 'Book Now'}
        </button>
      </div>
    </div>

    {/* ✨ Hover Glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-orange-500/5 to-transparent" />
    </div>
  </div>
);

};

export default WishlistCard;
