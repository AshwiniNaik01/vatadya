// import React from 'react';
// import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Terminal, Shield, Activity, Zap, Compass, Globe, Radio } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="relative bg-obsidian text-white pt-32 pb-12 overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
//       {/* Tactical Background Elements */}
//       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
//         <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"></div>
//         <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
//         {/* Pulsing radar rings in corner */}
//         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border border-primary/20 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

//           {/* Mission Control HQ Info */}
//           <div className="lg:col-span-5 space-y-10">
//             <div className="flex items-center gap-4 group cursor-pointer">
//               <div className="hud-panel p-3 border-primary/20 bg-primary/5 group-hover:bg-primary group-hover:text-obsidian transition-all duration-700">
//                 <Compass className="w-8 h-8 text-primary group-hover:text-obsidian" />
//               </div>
//               <h2 className="data-text text-3xl font-black tracking-tighter uppercase italic">
//                 Trekk<span className="text-primary">Vede</span>
//               </h2>
//             </div>

//             <p className="data-text text-[11px] text-white/30 max-w-md leading-relaxed uppercase tracking-widest">
//               [MISSION_STATEMENT] {">"} Established operational window: 2013-Present.
//               Engineering high-altitude expedition success through technical
//               sovereignty and deterministic mission architecture.
//             </p>

//             <div className="flex gap-4">
//               {[
//                 { icon: Facebook, label: "COMM_FB" },
//                 { icon: Instagram, label: "COMM_IG" },
//                 { icon: Twitter, label: "COMM_TW" },
//                 { icon: Youtube, label: "COMM_YT" }
//               ].map((social, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   className="hud-panel p-4 border-white/5 bg-white/5 text-white/30 hover:text-primary hover:border-primary/40 hover:glow-primary transition-all duration-500 group"
//                 >
//                   <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   <span className="sr-only">{social.label}</span>
//                 </a>
//               ))}
//             </div>

//             {/* System Status Readout */}
//             <div className="hud-panel p-6 bg-white/[0.01] border-white/5 inline-flex flex-col gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                 <span className="data-text text-[9px] text-white/60 font-black uppercase tracking-widest">SECTOR_UPTIME: 99.98%</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Activity size={12} className="text-primary animate-pulse" />
//                 <span className="data-text text-[9px] text-white/30 uppercase tracking-widest">ACTIVE_FEEDS: VERIFIED</span>
//               </div>
//             </div>
//           </div>

//           {/* Nav Nodes - Sector 1 */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="flex items-center gap-3">
//               <Terminal size={14} className="text-secondary" />
//               <h3 className="data-text text-[11px] font-black uppercase tracking-[0.4em] text-white/20">QUICK_NODES</h3>
//             </div>
//             <ul className="space-y-4">
//               {["RECON_HOME", "MISSION_SECTORS", "VISUAL_LOGS", "INTEL_HUB", "SIGNAL_SYNC"].map((item) => (
//                 <li key={item}>
//                   <Link
//                     to="/"
//                     className="data-text text-[10px] text-white/40 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-3 group"
//                   >
//                     <div className="w-1.5 h-1.5 bg-white/5 group-hover:bg-primary transition-all"></div>
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Nav Nodes - Sector 2 */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="flex items-center gap-3">
//               <Zap size={14} className="text-primary" />
//               <h3 className="data-text text-[11px] font-black uppercase tracking-[0.4em] text-white/20">RESOURCES</h3>
//             </div>
//             <ul className="space-y-4">
//               {["GEAR_CHECKLIST", "SAFETY_PROTO", "MISSION_FAQS", "ECO_SYNC", "TECH_DOCS"].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="data-text text-[10px] text-white/40 hover:text-secondary transition-colors uppercase tracking-widest flex items-center gap-3 group"
//                   >
//                     <div className="w-1.5 h-1.5 bg-white/5 group-hover:bg-secondary transition-all"></div>
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Comms Uplink */}
//           <div className="lg:col-span-3 space-y-8">
//             <div className="flex items-center gap-3">
//               <Radio size={14} className="text-secondary" />
//               <h3 className="data-text text-[11px] font-black uppercase tracking-[0.4em] text-white/20">SIGNAL_UPLINK</h3>
//             </div>
//             <ul className="space-y-6">
//               <li className="flex items-start gap-4 group">
//                 <div className="hud-panel p-2.5 border-white/5 text-secondary group-hover:text-primary transition-colors">
//                   <Phone size={16} />
//                 </div>
//                 <div className="space-y-1">
//                   <div className="data-text text-[8px] text-white/20 uppercase">SECURE_VOICE</div>
//                   <div className="data-text text-sm font-black text-white">+91 99224 45566</div>
//                 </div>
//               </li>
//               <li className="flex items-start gap-4 group">
//                 <div className="hud-panel p-2.5 border-white/5 text-secondary group-hover:text-primary transition-colors">
//                   <Mail size={16} />
//                 </div>
//                 <div className="space-y-1">
//                   <div className="data-text text-[8px] text-white/20 uppercase">DATA_TRANSFER</div>
//                   <div className="data-text text-sm font-black text-white italic underline underline-offset-4 decoration-primary/20 hover:decoration-primary/60 transition-all cursor-pointer">hq@trekkvede.com</div>
//                 </div>
//               </li>
//               <li className="flex items-start gap-4 group">
//                 <div className="hud-panel p-2.5 border-white/5 text-secondary group-hover:text-primary transition-colors">
//                   <MapPin size={16} />
//                 </div>
//                 <div className="space-y-1">
//                   <div className="data-text text-[8px] text-white/20 uppercase">HQ_COORD</div>
//                   <div className="data-text text-[10px] text-white/50 leading-relaxed uppercase tracking-widest">
//                     123 Alpine Terminal <br />
//                     Base Station, Sector 7 <br />
//                     INDIA_v01
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Tactical Footer Bar */}
//         <div className="pt-12 border-t border-white/5">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-10">
//             <div className="flex items-center gap-6">
//               <div className="data-text text-[9px] text-white/20 uppercase tracking-[0.4em]">© 2026 TREKKVEDE_HQ</div>
//               <div className="hidden md:block w-[1px] h-4 bg-white/5"></div>
//               <div className="flex items-center gap-2">
//                 <Shield size={10} className="text-primary opacity-40" />
//                 <span className="data-text text-[7px] text-white/10 uppercase tracking-[0.2em]">ENCR_SYNC_V7.2</span>
//               </div>
//             </div>

//             <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-[0.3em]">
//               {["PRIVACY_PROTO", "TERM_COND", "COOKIE_SYNC", "SITE_MAP"].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="text-white/20 hover:text-primary transition-colors"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>

//             <div className="flex items-center gap-4 opacity-20">
//               <Globe size={14} className="animate-spin-slow" />
//               <span className="data-text text-[8px] uppercase tracking-widest">GLOBAL_DEB_ARCHIVE</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default Footer;


import React, { useState } from 'react';
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
  Navigation
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const [isNewsletterHovered, setIsNewsletterHovered] = useState(false);
  const location = useLocation();
  const currentYear = new Date().getFullYear();

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
    { icon: Facebook, href: "#", label: "FACEBOOK", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "INSTAGRAM", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", label: "TWITTER", color: "hover:text-sky-400" },
    { icon: Youtube, href: "#", label: "YOUTUBE", color: "hover:text-red-500" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            backgroundSize: '60px 60px'
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
                <div className="relative w-14 h-14 rounded-xl  
                    flex items-center justify-center group-hover:scale-110 transition-transform
                    shadow-lg shadow-sky-500/30">
                  {/* Replace Compass icon with public image */}
                  <img
                    src="/vatadya_logo.jpeg" // path to your image in public folder
                    alt="VataDya Logo"
                    className="w-10 h-10 object-contain group-hover:rotate-180 transition-transform duration-700 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  VATA<span className="text-sky-400">DYA</span>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <p className="text-[8px] text-white/40 font-bold uppercase tracking-[0.3em]">
                    OPERATIONAL SINCE 2013
                  </p>
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed">
              Engineering high-altitude expedition success through technical
              sovereignty and deterministic mission architecture. Every summit,
              every story, every adventure.
            </p>



            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-sky-400/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-10 h-10 rounded-lg bg-white/5 
                                  border border-sky-400/30 flex items-center justify-center
                                  hover:border-sky-400/60 hover:bg-white/10 
                                  transition-all group/icon">
                      <Icon className={`w-5 h-5 text-white/60 group-hover/icon:scale-110 
                                      transition-transform ${social.color}`} />
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
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.3em]">QUICK LINKS</h3>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`group flex items-center gap-3 text-sm transition-all
                              ${location.pathname === link.path
                        ? 'text-sky-400'
                        : 'text-white/60 hover:text-white'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all
                                    ${location.pathname === link.path
                        ? 'bg-sky-400'
                        : 'bg-white/20 group-hover:bg-sky-400'}`} />
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
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.3em]">RESOURCES</h3>
            </div>
            <ul className="space-y-3">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="group flex items-center gap-3 text-sm text-white/60 
                               hover:text-white transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 
                                   group-hover:bg-sky-400 transition-all" />
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
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.3em]">SIGNAL UPLINK</h3>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a href="tel:+919689333996"
                className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-xl transition-all">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 
                              flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-wider">SECURE VOICE</div>
                  <div className="text-lg font-bold text-white">+91 9689333996</div>
                </div>
              </a>

              <a href="mailto:hq@vatadya.com"
                className="flex items-center gap-4 group hover:bg-white/5 p-3 rounded-xl transition-all">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 
                              flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-wider">DATA TRANSFER</div>
                  <div className="text-lg font-bold text-white underline underline-offset-4 
                                 decoration-sky-400/30 group-hover:decoration-sky-400 transition-all">
                    hq@vatadya.com
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 
                              flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-wider mb-1">HQ COORDINATES</div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    123 Alpine Terminal<br />
                    Base Station, Sector 7<br />
                    INDIA - 400001
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="pt-6">
              <div className="relative group"
                   onMouseEnter={() => setIsNewsletterHovered(true)}
                   onMouseLeave={() => setIsNewsletterHovered(false)}>
                <div className={`absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-400 
                                rounded-xl blur-lg transition-opacity duration-500
                                ${isNewsletterHovered ? 'opacity-50' : 'opacity-0'}`} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-sky-400/30 
                                rounded-xl p-6 hover:border-sky-400/60 transition-all">
                  <h4 className="text-sm font-bold text-white mb-2">Mission Updates</h4>
                  <p className="text-xs text-white/60 mb-4">
                    Get expedition alerts and sector intel directly to your terminal.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="YOUR_EMAIL@DOMAIN.COM"
                      className="flex-1 bg-white/5 border border-sky-400/30 rounded-lg 
                                 px-4 py-3 text-xs text-white placeholder:text-white/20
                                 focus:border-sky-400 focus:outline-none transition-all"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 
                                       rounded-lg text-white text-sm font-medium
                                       hover:from-sky-600 hover:to-blue-600 transition-all
                                       flex items-center gap-2 group/btn">
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* ===== Footer Bottom Bar ===== */}
        <div className="pt-8 mt-8 border-t border-sky-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Copyright */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/40 tracking-wider">
                © {currentYear} VATADYA_HQ
              </span>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400/60" />
                <span className="text-[8px] text-white/30 uppercase tracking-wider">ENCRYPTED CONNECTION</span>
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
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-sky-400/30 
                            flex items-center justify-center group-hover:bg-sky-500/20 
                            group-hover:border-sky-400 transition-all">
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