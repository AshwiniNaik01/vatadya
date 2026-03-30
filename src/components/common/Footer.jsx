import React, { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Terminal,
  Shield,
  Activity,
  Zap,
  Compass,
  Globe,
  Radio,
  ArrowRight,
  ChevronUp,
  Award,
  Users,
  Target,
  Navigation,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const brand = footerData?.brand;
  const socialLinksData = footerData?.socialLinks;
  const contact = footerData?.contact;
  const footerBottom = footerData?.footerBottom;

  const quickLinks = [
    { name: "HOME", path: "/", icon: <Terminal size={12} /> },
    { name: "TREKS", path: "/treks", icon: <Compass size={12} /> },
    { name: "GALLERY", path: "/trek-gallery", icon: <Activity size={12} /> },
    { name: "ABOUT US", path: "/about", icon: <Zap size={12} /> },
    { name: "CONTACT", path: "/contact", icon: <Phone size={12} /> },
  ];

  const resources = [
    { name: "GEAR GUIDE", icon: <Shield size={12} /> },
    { name: "SAFETY PROTOCOLS", icon: <Target size={12} /> },
    { name: "BLOG", icon: <Activity size={12} /> },
    { name: "FAQS", icon: <Radio size={12} /> },
    { name: "TECH DOCS", icon: <Terminal size={12} /> },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: socialLinksData?.facebook,
      label: "FACEBOOK",
      color: "hover:text-blue-500",
    },
    {
      icon: Instagram,
      href: socialLinksData?.instagram,
      label: "INSTAGRAM",
      color: "hover:text-pink-500",
    },
    {
      icon: Twitter,
      href: socialLinksData?.twitter,
      label: "TWITTER",
      color: "hover:text-sky-400",
    },
    {
      icon: Youtube,
      href: socialLinksData?.youtube,
      label: "YOUTUBE",
      color: "hover:text-red-500",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axiosInstance.get("/api/footer", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        console.log("Footer API response:", res.data);

        if (res.data.success) {
          setFooterData(res.data.data);
        }
      } catch (error) {
        console.error("Footer API error:", error.response || error);
      }
    };

    fetchFooter();
  }, []);

  if (!footerData) {
    return (
      <footer className="text-white text-center py-10">
        Loading footer...
      </footer>
    );
  }
  return (
    <footer className="relative bg-gradient-to-b from-[#0B2B4A] to-[#0A3B5E] text-white pt-20 pb-8 overflow-hidden border-t border-sky-400/20">
      {/* ===== Background Elements ===== */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-20 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container px-6 relative z-10  mx-auto max-w-7xl">
        {/* ===== Main Footer Content ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section - ColSpan 4 */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-400/20 rounded-xl blur-lg group-hover:opacity-100 transition-opacity"></div>
                <div
                  className="relative w-14 h-14 rounded-xl  
                    flex items-center justify-center group-hover:scale-110 transition-transform
                    shadow-lg shadow-sky-500/30"
                >
                  {/* Replace Compass icon with public image */}
                  <img
                    src="/vatadya_logo.png" // path to your image in public folder
                    alt="VataDya Logo"
                    className="w-10 h-10 object-contain group-hover:rotate-180 transition-transform duration-700 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  VATADYA
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <p className="text-[8px] text-white/40 font-bold uppercase tracking-[0.3em]">
                    {brand?.tagline}
                  </p>
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed">
              {brand?.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-sky-400/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div
                      className="relative w-10 h-10 rounded-lg bg-white/5 
                                  border border-sky-400/30 flex items-center justify-center
                                  hover:border-sky-400/60 hover:bg-white/10 
                                  transition-all group/icon"
                    >
                      <Icon
                        className={`w-5 h-5 text-white/60 group-hover/icon:scale-110 
                                      transition-transform ${social.color}`}
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links - ColSpan 2 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.3em]">
                QUICK LINKS
              </h3>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`group flex items-center gap-3 text-sm transition-all
                              ${
                                location.pathname === link.path
                                  ? "text-sky-400"
                                  : "text-white/60 hover:text-white"
                              }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all
                                    ${
                                      location.pathname === link.path
                                        ? "bg-sky-400"
                                        : "bg-white/20 group-hover:bg-sky-400"
                                    }`}
                    />
                    <span className="flex items-center gap-2">
                      {link.icon}
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - ColSpan 2 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.3em]">
                RESOURCES
              </h3>
            </div>
            <ul className="space-y-3">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="group flex items-center gap-3 text-sm text-white/60 
                               hover:text-white transition-all"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-white/20 
                                   group-hover:bg-sky-400 transition-all"
                    />
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter - ColSpan 4 */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-sky-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.3em]">
                SIGNAL UPLINK
              </h3>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href={`tel:${contact?.phone}`}
                className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-xl transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 
                              flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-wider">
                    SECURE VOICE
                  </div>
                  <div className="text-lg font-bold text-white">
                    {contact?.phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-xl transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 
                              flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-wider">
                    DATA TRANSFER
                  </div>
                  <div
                    className="text-lg font-bold text-white underline underline-offset-4 
                                 decoration-sky-400/30 group-hover:decoration-sky-400 transition-all"
                  >
                    {contact.email}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3">
                <div
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 
                              flex items-center justify-center shrink-0"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1">
                    {contact.address.line1}
                    <br />
                  </div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    {contact.address.line2}
                    <br />
                    <br />
                    {contact.address?.city}
                    <br />
                    {contact?.address.country} -{contact?.address?.pincode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Footer Bottom Bar ===== */}
        <div className="pt-8 mt-8 border-t border-sky-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40 tracking-wider">
                © {footerBottom?.year} {footerBottom?.companyName}
              </span>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400/60" />
                <span className="text-[8px] text-white/30 uppercase tracking-wider">
                  ENCRYPTED CONNECTION
                </span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {["PRIVACY", "TERMS", "COOKIES", "SITEMAP"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-white/40 hover:text-sky-400 transition-colors tracking-wider"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs text-white/40 
                         hover:text-sky-400 transition-colors"
            >
              <span>BACK TO TOP</span>
              <div
                className="w-8 h-8 rounded-lg bg-white/5 border border-sky-400/30 
                            flex items-center justify-center group-hover:bg-sky-500/20 
                            group-hover:border-sky-400 transition-all"
              >
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Global Archive Indicator */}
          <div className="flex justify-center mt-6 opacity-20">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 animate-spin-slow" />
              <span className="text-[8px] uppercase tracking-widest text-white/40">
                GLOBAL EXPEDITION ARCHIVE • {currentYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
