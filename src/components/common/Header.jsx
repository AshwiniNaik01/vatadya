import {
  Heart,
  LogOut,
  MapPin,
  Menu,
  Phone,
  User,
  X,
} from "lucide-react";
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Treks", href: "/treks" },
    { name: "Gallery", href: "/trek-gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const alwaysScrolledPages = ["/treks", "/trek-gallery", "/wishlist", "/contact", "/book-now"];

  const isPageScrolledStyle = alwaysScrolledPages.includes(location.pathname);

  // Helper to determine if we should show the solid background
  const showSolidBackground = isScrolled || isPageScrolledStyle;

  return (
    <>
      <BookNowModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      <header
        className={`${location.pathname === "/treks" || location.pathname.startsWith("/trek/") ? "absolute" : "fixed"} top-0 left-0 w-full z-50 transition-all duration-300 ${showSolidBackground
          ? "bg-emerald-900/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-amber-500 p-2 rounded-lg group-hover:bg-amber-600 transition-colors">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TrekkVede</h1>
                <p className="text-xs text-amber-300">Adventure Awaits</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors duration-300 ${location.pathname === item.href
                    ? "text-amber-400"
                    : "text-amber-50 hover:text-amber-300"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact + CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-white font-medium text-sm">+91 XXXXX XXXXX</span>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                Book Now
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 border border-amber-300/50 text-amber-300 rounded-full hover:bg-amber-300/10 transition-colors duration-300"
                  aria-label="User Profile"
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                    <button
                      onClick={() => {
                        navigate('/wishlist');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-3 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      Wishlist
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        // Logout logic here
                        console.log("Logged out");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mx-4 mt-2 bg-emerald-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-emerald-700/50">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${location.pathname === item.href
                      ? "bg-emerald-800 text-amber-400"
                      : "text-white hover:bg-emerald-800/50 hover:text-amber-300"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  to="/wishlist"
                  className="py-3 px-4 rounded-xl font-medium text-white hover:bg-emerald-800/50 hover:text-amber-300 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </Link>

                <button
                  className="w-full text-left py-3 px-4 rounded-xl font-medium text-red-400 hover:bg-emerald-800/50 flex items-center gap-2"
                  onClick={() => {
                    console.log("Logout");
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

                <div className="pt-4 mt-2 border-t border-emerald-800 space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-amber-200 bg-emerald-950/30 py-2 rounded-lg">
                    <Phone className="w-4 h-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-amber-900/20 transition-all duration-300 active:scale-[0.98]"
                  >
                    Book Your Adventure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;