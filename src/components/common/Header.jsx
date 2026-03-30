import { Heart, LogOut, User, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginModal,
  closeLoginModal,
  logout,
  setLoginState,
} from "../../store/slices/authSlice";
// import { fetchWishlistAsync } from "../../store/slices/wishlistSlice";
import LoginModal from "../modals/LoginModal";
import BookNowModal from "../modals/BookNowModal";
import Cookies from "js-cookie";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, isLoginModalOpen } = useSelector((state) => state.auth);

  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "TREKS", href: "/treks" },
    { name: "GALLERY", href: "/trek-gallery" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const showSolidBackground = isScrolled || location.pathname !== "/";

  return (
    <>
      <BookNowModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          dispatch(closeLoginModal());
          dispatch(setLoginState(!!Cookies.get("token")));
        }}
      />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showSolidBackground
            ? "bg-obsidian/90 py-3 border-b border-white/5"
            : "bg-black/90 py-4"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="/vatadya_logo.png"
              alt="VataDya Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-black text-white uppercase tracking-tighter">
              VATADYA
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-5 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider
                transition-all duration-300 border
                 ${
                   location.pathname === item.href
                     ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                     : "bg-white/5 text-white/80 border-white/10 hover:bg-white hover:text-white hover:border-white/30"
                 }`}
              >
                <span className="transition-colors duration-300 group-hover:text-white">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative" ref={userMenuRef}>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setIsUserMenuOpen(!isUserMenuOpen);
                } else {
                  dispatch(openLoginModal());
                }
              }}
              className="w-11 h-11 hud-panel flex items-center justify-center border-white/10 text-white hover:border-white/30"
            >
              <User className="w-5 h-5" />
            </button>

            {isUserMenuOpen && isLoggedIn && (
              <div className="absolute right-0 mt-4 w-56 bg-black/50 backdrop-blur-3xl hud-panel border-primary/20 py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
                <button
                  onClick={() => {
                    navigate("/wishlist");
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-5 py-4 data-text text-xs font-black text-white hover:bg-primary/5 hover:text-primary flex items-center justify-between uppercase tracking-[0.2em]"
                >
                  WISHLIST
                  <Heart className="w-4 h-4" />
                </button>
                <div className="h-px bg-white/5 mx-5 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-4 data-text text-xs font-black text-rose-100 hover:bg-red-500/5 hover:text-red-400 flex items-center justify-between uppercase tracking-[0.2em]"
                >
                  LOGOUT
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden w-11 h-11 hud-panel flex items-center justify-center text-white/70"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-white/70" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-500 ${
            isMenuOpen
              ? "max-h-screen opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="mx-6 mt-4 bg-obsidian/95 backdrop-blur-3xl hud-panel p-8 border-primary/40 shadow-2xl flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="py-5 px-6 hud-panel border-white/5 text-white/40 hover:text-white hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="w-full mt-6 py-6 bg-primary text-obsidian font-bold uppercase tracking-[0.5em]"
            >
              INITIALIZE_DEPLOYMENT
            </button> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
