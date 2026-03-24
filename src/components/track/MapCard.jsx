const MapCard = ({ location }) => {
  return (
    <div
      className="relative overflow-hidden bg-blue-50 rounded-3xl p-6 text-blue-900 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border-4 border-blue-800/30"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)
        `,
        backgroundSize: "100% 100%",
      }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Soft Stains */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-blue-700/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-800/5 rounded-full blur-2xl"></div>

      {/* Edge Accents */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-900/15 via-blue-800/10 to-transparent rounded-bl-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-900/15 via-blue-800/10 to-transparent rounded-tr-[80px]"></div>

      {/* Creases */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-blue-800/20 rotate-12"></div>
      <div className="absolute top-2/3 right-0 w-full h-px bg-blue-800/20 -rotate-6"></div>

      {/* Title */}
      <div className="relative mb-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-blue-900 font-serif tracking-wide drop-shadow-lg"
          style={{ textShadow: "3px 3px 0 rgba(30, 64, 175, 0.15)" }}
        >
          {location || "The Unknown Lands"}
        </h2>
      </div>

      {/* Map */}
      <div className="relative mb-8">
        <svg className="w-full h-40" viewBox="0 0 400 100">
          
          {/* Topographic */}
          <path
            d="M 30,70 Q 80,40 130,65 T 220,45 T 310,70 L 350,60"
            stroke="#1E40AF"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.15"
            fill="none"
          />

          {/* Main Path */}
          <path
            d="M 25,65 
               C 45,45 65,80 85,55 
               C 105,30 125,70 145,50 
               C 165,30 185,65 205,45 
               C 225,25 245,60 265,40 
               C 285,20 305,55 325,35 
               L 355,45"
            stroke="#1E40AF"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            fill="none"
            className="animate-dash"
            style={{ strokeLinecap: "round" }}
          />

          {/* Secondary Path */}
          <path
            d="M 85,55 
               C 95,75 115,60 135,80 
               C 155,100 175,85 195,95 
               C 215,105 235,90 255,100 
               L 285,110"
            stroke="#1E40AF"
            strokeWidth="2"
            strokeDasharray="8 10"
            opacity="0.6"
            fill="none"
            className="animate-dash-slow"
          />

          {/* River */}
          <path
            d="M 45,75 
               Q 75,95 105,80 
               T 165,90 T 225,75 T 285,85"
            stroke="#0EA5E9"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            opacity="0.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Waypoints */}
          {[40, 90, 140, 190, 240, 290, 340].map((x, i) => {
            const y =
              i % 2 === 0
                ? 40 + Math.sin(i) * 15
                : 60 + Math.cos(i) * 10;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#1E40AF"
                  fillOpacity="0.1"
                  stroke="#1E40AF"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#1E40AF"
                  className="animate-pulse"
                />
              </g>
            );
          })}

          {/* Destination (UNCHANGED) */}
          <g
            transform="translate(355, 38)"
            className="group-hover:scale-125 transition-transform duration-500 origin-center"
          >
            <circle
              cx="0"
              cy="0"
              r="14"
              fill="#60A5FA"
              fillOpacity="0.15"
              className="animate-ping"
            />
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="#1E40AF"
              fillOpacity="0.1"
              stroke="#1E40AF"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <path
              d="M-6,-6 L6,6 M6,-6 L-6,6"
              stroke="#1E40AF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Bottom */}
      <div className="relative mt-4 flex justify-between items-center text-[10px] font-mono text-blue-700/50 border-t border-blue-800/20 pt-3">
        <span>◈ ◈ ◈ ◈ ◈</span>
        <span className="tracking-widest">EXPLORE BEYOND</span>
        <span>◈ ◈ ◈ ◈ ◈</span>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -200;
          }
        }
        @keyframes dash-slow {
          to {
            stroke-dashoffset: -300;
          }
        }
        .animate-dash {
          animation: dash 25s linear infinite;
        }
        .animate-dash-slow {
          animation: dash-slow 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MapCard;