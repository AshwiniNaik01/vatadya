import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Initial delay before starting the fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for fade out animation to finish before calling complete
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        {/* Cinematic Background Glow */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-150 animate-pulse"></div>

        {/* Logo Container */}
        <div className="relative group">
          {/* Animated Ring */}
          <div className="absolute -inset-8 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute -inset-12 border border-blue-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          {/* Logo Image */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl animate-logo-reveal">
            <img
              src="/vatadya_logo.png"
              alt="Vatadya Logo"
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Brand Name & Loading Bar */}
        <div className="mt-12 text-center space-y-6">
          <h1 className="text-white text-3xl md:text-5xl font-black tracking-[0.3em] uppercase italic animate-text-slide-up">
            VATA<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">DYA</span>
          </h1>

          <div className="w-48 md:w-64 h-[2px] bg-white/10 mx-auto relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full animate-loading-bar"></div>
          </div>

          <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] animate-pulse">
            Establishing Sector Link
          </p>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes logo-reveal {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }

        @keyframes text-slide-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-logo-reveal {
          animation: logo-reveal 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .animate-text-slide-up {
          animation: text-slide-up 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
