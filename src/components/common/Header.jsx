import { Heart, LogOut, MapPin, Menu, Phone, User, X, Terminal, Activity, Zap, Compass, Shield, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import BookNowModal from "../modals/BookNowModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "HOME", href: "/", icon: <Terminal size={14} /> },
    { name: "TREKS", href: "/treks", icon: <Compass size={14} /> },
    { name: "GALLERY", href: "/trek-gallery", icon: <Activity size={14} /> },
    { name: "ABOUT US", href: "/about", icon: <Zap size={14} /> },
    { name: "CONTACT US", href: "/contact", icon: <Phone size={14} /> },
  ];

  const showSolidBackground = isScrolled || location.pathname !== "/";

  return (
    <>
      <BookNowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <header
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${showSolidBackground
          ? "bg-obsidian/60 backdrop-blur-2xl py-3 border-b border-white/5"
          : "bg-black/50 py-4"
          }`}
      >
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Mission Critical Logo */}
            {/* Mission Critical Logo */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="hud-panel border-primary/20 bg-primary/5 group-hover:bg-primary group-hover:text-obsidian transition-all duration-700 overflow-hidden relative">
                {/* Replace Compass icon with public image */}
                <img
                  src="/vatadya_logo.jpeg" // path to your image in public folder
                  alt="VataDya Logo"
                  className="w-10 h-10 object-contain group-hover:rotate-180 transition-transform duration-1000"
                />
                {/* <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div> */}
              </div>
              <div>
                <h1 className="data-text text-xl font-black text-white uppercase tracking-tighter leading-none">
                  VATA<span className="text-primary italic">DYA</span>
                </h1>
              </div>
            </Link>

            {/* Tactical Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-6 py-2.5 group overflow-hidden transition-all duration-500 ${location.pathname === item.href
                    ? "text-primary"
                    : "text-white"
                    }`}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    <span className="data-text text-xs font-black">
                      {item.name}
                    </span>
                  </div>
                  {/* Underline indicator */}
                  <div className={`absolute bottom-0 left-6 right-6 h-[1px] bg-primary transition-all duration-500 scale-x-0 group-hover:scale-x-100 ${location.pathname === item.href ? 'scale-x-100' : ''}`}></div>
                  {/* Scanning micro-animation on hover */}
                  <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 opacity-20"></div>
                </Link>
              ))}
            </nav>

            {/* Operational Controls */}
            <div className="hidden lg:flex items-center gap-8">


              {/* User Terminal Trigger */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`w-11 h-11 hud-panel flex items-center justify-center transition-all duration-500 ${isUserMenuOpen ? 'border-primary bg-primary text-white glow-primary' : 'border-white/10 text-white hover:text-white hover:border-white/30'}`}
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Secure Dropdown Portal */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-black/50 backdrop-blur-3xl hud-panel border-primary/20 py-3 z-100 animate-in fade-in slide-in-from-top-4 duration-500">

                    <button
                      onClick={() => {
                        navigate("/wishlist");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-5 py-4 data-text text-xs font-black text-white hover:bg-primary/5 hover:text-primary flex items-center justify-between transition-colors uppercase tracking-[0.2em]"
                    >
                      WISHLIST
                      <Heart className="w-4 h-4" />
                    </button>
                    <div className="h-px bg-white/5 mx-5 my-1"></div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-5 py-4 data-text text-xs font-black text-rose-100 hover:bg-red-500/5 hover:text-red-400 flex items-center justify-between transition-colors uppercase tracking-[0.2em]"
                    >
                      LOGOUT
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-11 h-11 hud-panel border-white/10 flex items-center justify-center text-white/30 group active:scale-95 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 group-hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {/* Mobile Tactical Interface */}
          <div
            className={`md:hidden absolute left-0 right-0 top-full overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"}`}
          >
            <div className="mx-6 mt-4 bg-obsidian/95 backdrop-blur-3xl hud-panel p-8 border-primary/40 shadow-2xl">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`py-5 px-6 hud-panel border-white/5 group transition-all duration-300 ${location.pathname === item.href
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="data-text text-[10px] font-black uppercase tracking-[0.3em]">
                        {item.name}
                      </span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </div>
                  </Link>
                ))}

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full mt-6 py-6 bg-primary text-obsidian data-text text-[11px] font-black uppercase tracking-[0.5em] hover:glow-primary active:scale-[0.98] transition-all"
                >
                  INITIALIZE_DEPLOYMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
