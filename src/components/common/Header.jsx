import { Heart, LogOut, User, Menu, X, FileText, Package } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginModal,
  closeLoginModal,
  logout,
  setLoginState,
} from "../../store/slices/authSlice";
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
    { name: "STAYS", href: "/stay" },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 py-3 ${
          showSolidBackground
            ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="max-w-8xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-20 group-hover:opacity-40 transition"></div>

              <img
                src="/vatadya_logo.png"
                alt="VataDya Logo"
                className="relative w-12 h-12 object-contain rounded-xl drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
              />
            </div>

            <h1 className="text-xl animate-glow font-bold tracking-[0.1em] text-white group-hover:text-white transition">
              VATADYA
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
                  location.pathname === item.href
                    ? "text-white bg-amber-700/90 rounded-full"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {/* {item.name} */}
                <span className="relative z-10">{item.name}</span>

                <div className="absolute inset-0 rounded-full bg-amber-600/90 scale-0 group-hover:scale-100 transition-transform duration-300"></div>

                <div className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4 relative" ref={userMenuRef}>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setIsUserMenuOpen(!isUserMenuOpen);
                } else {
                  dispatch(openLoginModal());
                }
              }}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border-2 border-amber-700/80 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition "></div>
              <User className="w-5 h-5" />
            </button>

            {isUserMenuOpen && isLoggedIn && (
              <div className="absolute right-0 top-14 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-2 z-[999]">
                {/* HEADER */}
                {/* <div className="px-4 py-3 border-b border-white/10">
      <p className="text-sm text-white font-medium">Welcome</p>
    </div> */}

                {/* PROFILE */}
                {/* <button
                  onClick={() => navigate("/profile")}
                  className="group flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">Profile</span>
                  </div>
                </button> */}

                {/* BOOKINGS */}
                {/* <button
                  onClick={() => navigate("/bookings")}
                  className="group flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">Bookings</span>
                  </div>
                </button> */}

                {/* WISHLIST */}
                <button
                  onClick={() => navigate("/wishlist")}
                  className="group flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">Wishlist</span>
                  </div>
                </button>

                {/* INVOICES */}
                {/* <button
                  onClick={() => navigate("/invoices")}
                  className="group flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    <span className="text-sm">Invoices</span>
                  </div>
                </button> */}

                {/* DIVIDER */}
                <div className="h-px bg-white/10 my-2"></div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-between w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                    <span className="text-sm">Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ${
            isMenuOpen
              ? "max-h-screen opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <div className="mx-6 mt-4 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="py-4 px-4 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
