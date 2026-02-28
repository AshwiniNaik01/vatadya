// import { useState } from 'react';
// import {
//   ChevronDown,
//   Shield,
//   UserCheck,
//   Heart,
//   DollarSign,
//   Users,
//   Calendar,
//   Sparkles,
//   ArrowRight,
//   Terminal,
//   Activity,
//   Cpu,
//   Target,
//   Zap,
//   Lock,
//   Search
// } from 'lucide-react';

// const FAQs = () => {
//   const [openItems, setOpenItems] = useState({ 1: true });

//   const toggleItem = (id) => {
//     setOpenItems(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const faqItems = [
//     {
//       id: 1,
//       question: "Is high-altitude deployment safe for entry-level units?",
//       answer: "Affirmative. All expeditions are managed by Tier-1 technical leads with redundant certification. We maintain a 1:4 guide-to-personnel ratio, ensuring failsafe operational readiness and emergency extraction protocols.",
//       icon: <Shield className="w-8 h-8" />,
//       category: "PROTOCOL_ALPHA",
//       stats: "LEVEL_5_SAFETY",
//       code: "0xSF_01"
//     },
//     {
//       id: 2,
//       question: "What skill-index is required for mission entry?",
//       answer: "Our database contains mission parameters for every ambition level. From basic valley recon to extreme high-altitude endurance. Each sector is categorized by physiological demand and technical complexity.",
//       icon: <UserCheck className="w-8 h-8" />,
//       category: "UNIT_CAPACITY",
//       stats: "60%_INITIAL_ACCESS",
//       code: "0xSK_02"
//     },
//     {
//       id: 3,
//       question: "How should personnel optimize for physical sync?",
//       answer: "We provide a technical training regimen optimized for your target sector. For advanced missions, we mandate a 4-week cardiovascular calibration sequence as detailed in our operational field manual.",
//       icon: <Heart className="w-8 h-8" />,
//       category: "VITAL_SYNC",
//       stats: "CUSTOM_CALIBRATION",
//       code: "0xVT_03"
//     },
//     {
//       id: 4,
//       question: "What are the core mission cost parameters?",
//       answer: "Vatadya operates with full-stack mission transparency. Fees cover elite logistics, site permits, high-spec accommodation, caloric-optimized field rations, and heavy-duty base transport. Zero hidden overhead.",
//       icon: <DollarSign className="w-8 h-8" />,
//       category: "RESOURCE_ALLOC",
//       stats: "NET_TRANSPARENCY",
//       code: "0xRS_04"
//     },
//     {
//       id: 5,
//       question: "Can solo units execute missions?",
//       answer: "Many reconnaissance units arrive solo and are integrated into high-functioning tactical squads. We curate sector groups to ensure intellectual and physical synergy among all mission participants.",
//       icon: <Users className="w-8 h-8" />,
//       category: "SQUAD_DYNAMIC",
//       stats: "40%_SOLO_ARTIFACTS",
//       code: "0xSQ_05"
//     },
//     {
//       id: 6,
//       question: "What is the optimal launch window?",
//       answer: "The mountains operate on their own temporal grid. We authorize missions only during hyper-stable meteorology windows to maximize safety and visual intelligence gathering in the sector.",
//       icon: <Calendar className="w-8 h-8" />,
//       category: "LAUNCH_TIMING",
//       stats: "SEASONAL_METRICS",
//       code: "0xLN_06"
//     }
//   ];

//   return (
//     <section id="faqs" className="py-32 bg-obsidian relative overflow-hidden border-t border-white/5 selection:bg-primary selection:text-obsidian">
//       {/* Background HUD Matrix & Glitch Accents */}
//       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
//         style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
//       </div>
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
//       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="flex flex-col lg:flex-row gap-24">
//           {/* Technical Header Column */}
//           <div className="lg:w-1/3 animate-fade-in">
//             <div className="sticky top-32">
//               <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-sm px-4 py-2 mb-8 hud-corners">
//                 <Terminal className="w-4 h-4 text-primary" />
//                 <span className="data-text text-primary text-[10px] font-black tracking-[0.4em]">SYSTEM_PROTOCOLS_V9.2</span>
//               </div>
//               <h2 className="text-4xl md:text-8xl font-black text-white mb-10 leading-none tracking-tighter uppercase italic">
//                 Query <br />
//                 <span className="command-gradient">Database</span>
//               </h2>
//               <p className="data-text text-primary/40 text-sm md:text-xl md:leading-relaxed mb-16 uppercase tracking-widest">
//                 [SYS_INTEL] {">"} Decrypting core operational data for mission
//                 readiness. Review verified parameters before initializing
//                 sector deployment.
//               </p>

//               <div className="hud-panel p-10 bg-white/[0.01] backdrop-blur-3xl border-white/5 group relative overflow-hidden">
//                 {/* Background scanline for the card */}
//                 <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 opacity-20"></div>

//                 <div className="relative z-10">
//                   <div className="flex items-center gap-4 mb-8">
//                     <div className="w-12 h-12 hud-panel border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-obsidian transition-all duration-700">
//                       <Zap size={20} className="animate-pulse" />
//                     </div>
//                     <h4 className="data-text text-2xl font-black text-white uppercase tracking-tight italic">Mission Contact</h4>
//                   </div>
//                   <p className="data-text text-[11px] text-white/30 mb-12 leading-relaxed uppercase tracking-widest">
//                     Our mission tactical leads are available for secure comms sync 24/7 if current database logs are insufficient.
//                   </p>
//                   <button className="w-full py-5 hud-panel border-primary/40 bg-primary/5 text-primary data-text text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-obsidian hover:glow-primary transition-all duration-700 flex items-center justify-center gap-4">
//                     SYNC_WITH_COMMAND <ArrowRight size={16} />
//                   </button>
//                 </div>
//               </div>

//               {/* Technical Indicator Readout */}
//               <div className="mt-12 flex items-center gap-6 opacity-20">
//                 <div className="data-text text-[8px] text-white/40 uppercase tracking-[0.5em]">BUFFER_CLEARANCE: LEVEL_9</div>
//                 <div className="h-px flex-1 bg-white/10"></div>
//                 <Activity size={14} className="text-secondary animate-pulse" />
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Accordion Data Terminal */}
//           <div className="lg:w-2/3">
//             <div className="space-y-8">
//               {/* Search Interface for FAQs */}
//               <div className="hud-panel px-10 py-6 border-white/5 bg-white/[0.01] mb-12 flex items-center gap-6 group hover:border-primary/20 transition-all">
//                 <Search size={18} className="text-white/20 group-hover:text-primary transition-colors" />
//                 <div className="data-text text-[11px] text-white/20 uppercase tracking-[0.4em] flex-1">SEARCH_QUERY_PROTOCOL...</div>
//                 <Lock size={14} className="text-white/10" />
//               </div>

//               {faqItems.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className={`group hud-panel transition-all duration-700 overflow-hidden animate-slide-up relative ${openItems[item.id]
//                     ? "bg-primary/[0.03] border-primary/40"
//                     : "bg-white/[0.01] border-white/5 hover:border-primary/20"
//                     }`}
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <button
//                     onClick={() => toggleItem(item.id)}
//                     className="w-full p-10 text-left flex items-start gap-12 relative z-10"
//                   >
//                     <div className={`w-16 h-16 hud-panel border-primary/10 flex items-center justify-center transition-all duration-700 shadow-2xl relative overflow-hidden ${openItems[item.id] ? "bg-primary text-obsidian glow-primary scale-110" : "bg-white/5 text-primary/40 group-hover:text-primary group-hover:border-primary/30"
//                       }`}>
//                       {item.icon}
//                       {/* Internal light scanning for active icon */}
//                       {openItems[item.id] && (
//                         <div className="absolute inset-0 bg-white/20 -translate-x-full animate-scanline opacity-30"></div>
//                       )}
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex items-center gap-6 mb-4">
//                         <span className="data-text text-[9px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary/70 transition-colors">
//                           {item.category}
//                         </span>
//                         <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
//                         <span className="data-text text-[9px] font-black uppercase tracking-widest text-secondary opacity-60">
//                           {item.stats}
//                         </span>
//                         <div className="ml-auto data-text text-[8px] text-white/5 font-black uppercase group-hover:opacity-100 transition-opacity">{item.code}</div>
//                       </div>
//                       <h3 className={`data-text text-xl md:text-2xl font-black uppercase tracking-tighter transition-all duration-500 italic ${openItems[item.id] ? "text-white" : "text-white/40 group-hover:text-white/70"
//                         }`}>
//                         {item.question}
//                       </h3>
//                     </div>

//                     <div className={`w-12 h-12 hud-panel border-white/5 bg-white/5 flex items-center justify-center transition-all duration-700 ${openItems[item.id] ? "rotate-180 border-primary/40 text-primary bg-primary/10" : "text-white/10 group-hover:text-primary group-hover:border-primary/20"
//                       }`}>
//                       <ChevronDown size={24} />
//                     </div>
//                   </button>

//                   <div
//                     className={`transition-all duration-700 ease-in-out relative z-10 ${openItems[item.id] ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
//                       }`}
//                   >
//                     <div className="px-10 pb-12 md:pl-36">
//                       <div className="w-full h-px bg-white/5 mb-10 group-hover:bg-primary/20 transition-all"></div>
//                       <p className="data-text text-base text-white/40 leading-relaxed mb-12 uppercase tracking-widest group-hover:text-white/60 transition-colors">
//                         [RESPONSE] {">"} {item.answer}
//                       </p>

//                       <div className="flex flex-col sm:flex-row items-center gap-8">
//                         <button className="flex items-center gap-4 data-text text-[10px] font-black uppercase tracking-[0.4em] text-primary group/link cursor-pointer hover:glow-primary transition-all">
//                           DECRYPT_FULL_PROTOCOL_DATA <ArrowRight size={14} className="group-hover/link:translate-x-3 transition-transform" />
//                         </button>
//                         <div className="data-text text-[8px] text-white/10 uppercase tracking-[0.5em] hidden sm:block">VALIDATED_BY_CMD_HQ</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Subtle background scanner line for active item */}
//                   {openItems[item.id] && (
//                     <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-24 animate-scanline pointer-events-none opacity-20"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQs;


import { useState } from 'react';
import {
  ChevronDown,
  Shield,
  UserCheck,
  Heart,
  DollarSign,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Terminal,
  Activity,
  Cpu,
  Target,
  Zap,
  Lock,
  Search,
  MessageCircle,
  Headphones,
  BookOpen,
  Video,
  HelpCircle,
  CheckCircle,
  Mail,
  Phone,
  MessageSquare,
  Star,
  Award,
  ThumbsUp,
  Clock
} from 'lucide-react';

const FAQs = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqItems = [
    {
      id: 1,
      question: "Is high-altitude deployment safe for entry-level units?",
      answer: "Affirmative. All expeditions are managed by Tier-1 technical leads with redundant certification. We maintain a 1:4 guide-to-personnel ratio, ensuring failsafe operational readiness and emergency extraction protocols.",
      icon: <Shield className="w-6 h-6" />,
      category: "safety",
      categoryLabel: "Safety",
      stats: "LEVEL_5_SAFETY",
      code: "0xSF_01",
      color: "from-sky-400 to-blue-400"
    },
    {
      id: 2,
      question: "What skill-index is required for mission entry?",
      answer: "Our database contains mission parameters for every ambition level. From basic valley recon to extreme high-altitude endurance. Each sector is categorized by physiological demand and technical complexity.",
      icon: <UserCheck className="w-6 h-6" />,
      category: "requirements",
      categoryLabel: "Requirements",
      stats: "60%_INITIAL_ACCESS",
      code: "0xSK_02",
      color: "from-blue-400 to-indigo-400"
    },
    {
      id: 3,
      question: "How should personnel optimize for physical sync?",
      answer: "We provide a technical training regimen optimized for your target sector. For advanced missions, we mandate a 4-week cardiovascular calibration sequence as detailed in our operational field manual.",
      icon: <Heart className="w-6 h-6" />,
      category: "preparation",
      categoryLabel: "Preparation",
      stats: "CUSTOM_CALIBRATION",
      code: "0xVT_03",
      color: "from-indigo-400 to-purple-400"
    },
    {
      id: 4,
      question: "What are the core mission cost parameters?",
      answer: "Vatadya operates with full-stack mission transparency. Fees cover elite logistics, site permits, high-spec accommodation, caloric-optimized field rations, and heavy-duty base transport. Zero hidden overhead.",
      icon: <DollarSign className="w-6 h-6" />,
      category: "pricing",
      categoryLabel: "Pricing",
      stats: "NET_TRANSPARENCY",
      code: "0xRS_04",
      color: "from-emerald-400 to-teal-400"
    },
    {
      id: 5,
      question: "Can solo units execute missions?",
      answer: "Many reconnaissance units arrive solo and are integrated into high-functioning tactical squads. We curate sector groups to ensure intellectual and physical synergy among all mission participants.",
      icon: <Users className="w-6 h-6" />,
      category: "general",
      categoryLabel: "General",
      stats: "40%_SOLO_ARTIFACTS",
      code: "0xSQ_05",
      color: "from-amber-400 to-orange-400"
    },
    {
      id: 6,
      question: "What is the optimal launch window?",
      answer: "The mountains operate on their own temporal grid. We authorize missions only during hyper-stable meteorology windows to maximize safety and visual intelligence gathering in the sector.",
      icon: <Calendar className="w-6 h-6" />,
      category: "planning",
      categoryLabel: "Planning",
      stats: "SEASONAL_METRICS",
      code: "0xLN_06",
      color: "from-rose-400 to-pink-400"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" />, color: "from-sky-400 to-blue-400" },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" />, color: "from-sky-400 to-blue-400" },
    { id: 'requirements', label: 'Requirements', icon: <UserCheck className="w-4 h-4" />, color: "from-blue-400 to-indigo-400" },
    { id: 'preparation', label: 'Preparation', icon: <Heart className="w-4 h-4" />, color: "from-indigo-400 to-purple-400" },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" />, color: "from-emerald-400 to-teal-400" },
    { id: 'planning', label: 'Planning', icon: <Calendar className="w-4 h-4" />, color: "from-amber-400 to-orange-400" },
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const supportOptions = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Live Support",
      description: "Chat with our mission specialists in real-time",
      action: "Start Chat",
      color: "from-sky-400 to-blue-400",
      stats: "24/7 Available"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Help Center",
      description: "Browse detailed guides and documentation",
      action: "Visit Help",
      color: "from-blue-400 to-indigo-400",
      stats: "200+ Articles"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Book a Demo",
      description: "Schedule a personalized mission briefing",
      action: "Book Now",
      color: "from-indigo-400 to-purple-400",
      stats: "30-min Session"
    }
  ];

  return (
    <section id="faqs" className="relative py-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      
      {/* ===== Light Background Blobs ===== */}
      
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* ===== Header Section ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              EVERYTHING YOU WONDERED
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Questions
            </span>
          </h2>
          
          
        </div>


        {/* ===== Main Content Grid ===== */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

  {/* FAQ Accordion Section */}
  <div className="lg:col-span-3 space-y-4">
    {filteredFAQs.length > 0 ? (
      filteredFAQs.map((item) => {
        const isOpen = openItems[item.id]; // ✅ define isOpen per item

        return (
          <div
            key={item.id}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 
              ${isOpen ? 'shadow-lg shadow-sky-100' : 'hover:shadow-md'}`}
          >
           {/* White Card Content */}
            <div className={`relative bg-white rounded-xl border-3 border-sky-300 transition-all duration-300
              ${isOpen ? 'border-sky-200' : 'border-sky-100 hover:border-sky-200'} z-0`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 text-left flex items-center gap-4 relative z-10"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                  bg-gradient-to-r ${item.color} text-white`}>
                  {item.icon}
                </div>

                {/* Question */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                      {item.categoryLabel}
                    </span>
                    <span className="text-xs text-sky-400">{item.code}</span>
                  </div>
                  <h3 className={`font-semibold transition-colors
                    ${isOpen ? 'text-sky-900' : 'text-sky-700'}`}>
                    {item.question}
                  </h3>
                </div>

                {/* Chevron */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${isOpen
                    ? 'bg-gradient-to-r from-sky-400 to-blue-400 text-white rotate-180'
                    : 'bg-sky-50 text-sky-400'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden
                  ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pl-[72px]">
                  <div className="border-t border-sky-100 pt-4">
                    <p className="text-sky-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl border border-sky-100 p-12 text-center">
                <HelpCircle className="w-12 h-12 text-sky-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-sky-900 mb-2">No questions found</h3>
                <p className="text-sky-600">Try adjusting your search or filter</p>
              </div>
            )}
          </div>

       
        </div>

      </div>

      {/* ===== Custom Animations ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2s;
        }
          @keyframes rainbow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-rainbow {
      background-size: 400% 400%;
      animation: rainbow 6s linear infinite;
    }
      `}</style>
    </section>
  );
};

export default FAQs;