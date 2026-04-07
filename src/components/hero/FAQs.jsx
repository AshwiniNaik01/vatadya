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
//   Search,
//   MessageCircle,
//   Headphones,
//   BookOpen,
//   Video,
//   HelpCircle,
//   CheckCircle,
//   Mail,
//   Phone,
//   MessageSquare,
//   Star,
//   Award,
//   ThumbsUp,
//   Clock
// } from 'lucide-react';

// const FAQs = () => {
//   const [openItems, setOpenItems] = useState({});
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');

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
//       icon: <Shield className="w-6 h-6" />,
//       category: "safety",
//       categoryLabel: "Safety",
//       stats: "LEVEL_5_SAFETY",
//       code: "0xSF_01",
//       color: "from-sky-400 to-blue-400"
//     },
//     {
//       id: 2,
//       question: "What skill-index is required for mission entry?",
//       answer: "Our database contains mission parameters for every ambition level. From basic valley recon to extreme high-altitude endurance. Each sector is categorized by physiological demand and technical complexity.",
//       icon: <UserCheck className="w-6 h-6" />,
//       category: "requirements",
//       categoryLabel: "Requirements",
//       stats: "60%_INITIAL_ACCESS",
//       code: "0xSK_02",
//       color: "from-blue-400 to-indigo-400"
//     },
//     {
//       id: 3,
//       question: "How should personnel optimize for physical sync?",
//       answer: "We provide a technical training regimen optimized for your target sector. For advanced missions, we mandate a 4-week cardiovascular calibration sequence as detailed in our operational field manual.",
//       icon: <Heart className="w-6 h-6" />,
//       category: "preparation",
//       categoryLabel: "Preparation",
//       stats: "CUSTOM_CALIBRATION",
//       code: "0xVT_03",
//       color: "from-indigo-400 to-purple-400"
//     },
//     {
//       id: 4,
//       question: "What are the core mission cost parameters?",
//       answer: "Vatadya operates with full-stack mission transparency. Fees cover elite logistics, site permits, high-spec accommodation, caloric-optimized field rations, and heavy-duty base transport. Zero hidden overhead.",
//       icon: <DollarSign className="w-6 h-6" />,
//       category: "pricing",
//       categoryLabel: "Pricing",
//       stats: "NET_TRANSPARENCY",
//       code: "0xRS_04",
//       color: "from-emerald-400 to-teal-400"
//     },
//     {
//       id: 5,
//       question: "Can solo units execute missions?",
//       answer: "Many reconnaissance units arrive solo and are integrated into high-functioning tactical squads. We curate sector groups to ensure intellectual and physical synergy among all mission participants.",
//       icon: <Users className="w-6 h-6" />,
//       category: "general",
//       categoryLabel: "General",
//       stats: "40%_SOLO_ARTIFACTS",
//       code: "0xSQ_05",
//       color: "from-amber-400 to-orange-400"
//     },
//     {
//       id: 6,
//       question: "What is the optimal launch window?",
//       answer: "The mountains operate on their own temporal grid. We authorize missions only during hyper-stable meteorology windows to maximize safety and visual intelligence gathering in the sector.",
//       icon: <Calendar className="w-6 h-6" />,
//       category: "planning",
//       categoryLabel: "Planning",
//       stats: "SEASONAL_METRICS",
//       code: "0xLN_06",
//       color: "from-rose-400 to-pink-400"
//     }
//   ];

//   const categories = [
//     { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" />, color: "from-sky-400 to-blue-400" },
//     { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" />, color: "from-sky-400 to-blue-400" },
//     { id: 'requirements', label: 'Requirements', icon: <UserCheck className="w-4 h-4" />, color: "from-blue-400 to-indigo-400" },
//     { id: 'preparation', label: 'Preparation', icon: <Heart className="w-4 h-4" />, color: "from-indigo-400 to-purple-400" },
//     { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" />, color: "from-emerald-400 to-teal-400" },
//     { id: 'planning', label: 'Planning', icon: <Calendar className="w-4 h-4" />, color: "from-amber-400 to-orange-400" },
//   ];

//   const filteredFAQs = faqItems.filter(item => {
//     const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const supportOptions = [
//     {
//       icon: <Headphones className="w-6 h-6" />,
//       title: "Live Support",
//       description: "Chat with our mission specialists in real-time",
//       action: "Start Chat",
//       color: "from-sky-400 to-blue-400",
//       stats: "24/7 Available"
//     },
//     {
//       icon: <BookOpen className="w-6 h-6" />,
//       title: "Help Center",
//       description: "Browse detailed guides and documentation",
//       action: "Visit Help",
//       color: "from-blue-400 to-indigo-400",
//       stats: "200+ Articles"
//     },
//     {
//       icon: <Video className="w-6 h-6" />,
//       title: "Book a Demo",
//       description: "Schedule a personalized mission briefing",
//       action: "Book Now",
//       color: "from-indigo-400 to-purple-400",
//       stats: "30-min Session"
//     }
//   ];

//   return (
//     <section id="faqs" className="relative py-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">

//       {/* ===== Light Background Blobs ===== */}

//       <div className="container mx-auto px-6 relative z-10">

//         {/* ===== Header Section ===== */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
//             <HelpCircle className="w-4 h-4 text-sky-500" />
//             <span className="text-sky-700 text-xs font-medium tracking-wide">
//               EVERYTHING YOU WONDERED
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
//             Frequently Asked
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
//               Questions
//             </span>
//           </h2>

//         </div>

//         {/* ===== Main Content Grid ===== */}
//       <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

//   {/* FAQ Accordion Section */}
//   <div className="lg:col-span-3 space-y-4">
//     {filteredFAQs.length > 0 ? (
//       filteredFAQs.map((item) => {
//         const isOpen = openItems[item.id]; // ✅ define isOpen per item

//         return (
//           <div
//             key={item.id}
//             className={`relative rounded-xl overflow-hidden transition-all duration-300
//               ${isOpen ? 'shadow-lg shadow-sky-100' : 'hover:shadow-md'}`}
//           >
//            {/* White Card Content */}
//             <div className={`relative bg-white rounded-xl border-3 border-sky-300 transition-all duration-300
//               ${isOpen ? 'border-sky-200' : 'border-sky-100 hover:border-sky-200'} z-0`}
//             >
//               <button
//                 onClick={() => toggleItem(item.id)}
//                 className="w-full px-6 py-5 text-left flex items-center gap-4 relative z-10"
//               >
//                 {/* Icon */}
//                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
//                   bg-gradient-to-r ${item.color} text-white`}>
//                   {item.icon}
//                 </div>

//                 {/* Question */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-1">
//                     <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
//                       {item.categoryLabel}
//                     </span>
//                     <span className="text-xs text-sky-400">{item.code}</span>
//                   </div>
//                   <h3 className={`font-semibold transition-colors
//                     ${isOpen ? 'text-sky-900' : 'text-sky-700'}`}>
//                     {item.question}
//                   </h3>
//                 </div>

//                 {/* Chevron */}
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
//                   ${isOpen
//                     ? 'bg-gradient-to-r from-sky-400 to-blue-400 text-white rotate-180'
//                     : 'bg-sky-50 text-sky-400'}`}>
//                   <ChevronDown className="w-5 h-5" />
//                 </div>
//               </button>

//               {/* Answer */}
//               <div
//                 className={`transition-all duration-300 ease-in-out overflow-hidden
//                   ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
//               >
//                 <div className="px-6 pb-6 pl-[72px]">
//                   <div className="border-t border-sky-100 pt-4">
//                     <p className="text-sky-700 leading-relaxed">
//                       {item.answer}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//                 );
//               })
//             ) : (
//               <div className="bg-white rounded-xl border border-sky-100 p-12 text-center">
//                 <HelpCircle className="w-12 h-12 text-sky-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-sky-900 mb-2">No questions found</h3>
//                 <p className="text-sky-600">Try adjusting your search or filter</p>
//               </div>
//             )}
//           </div>

//         </div>

//       </div>

//       {/* ===== Custom Animations ===== */}
//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 5s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float 5s ease-in-out infinite;
//           animation-delay: 2s;
//         }
//           @keyframes rainbow {
//       0% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//       100% { background-position: 0% 50%; }
//     }
//     .animate-rainbow {
//       background-size: 400% 400%;
//       animation: rainbow 6s linear infinite;
//     }
//       `}</style>
//     </section>
//   );
// };

// export default FAQs;

import { useState, useEffect } from "react";
import axios from "axios";
import {
  ChevronDown,
  Shield,
  UserCheck,
  Heart,
  DollarSign,
  Users,
  Calendar,
  HelpCircle,
  Headphones,
  BookOpen,
  Video,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [mainTitle, setMainTitle] = useState("Frequently Asked Questions"); // header
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "{{baseurl}}";

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axiosInstance.get(`/api/faqs`);
        if (response.data.success && response.data.data) {
          setFaqs(response.data.data.faqs); // set only the array
          setMainTitle(response.data.data.mainTitle); // set the header separately
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Map category to icons and gradient colors
  const categoryConfig = {
    Safety: {
      icon: <Shield className="w-6 h-6" />,
      color: "from-sky-400 to-blue-400",
    },
    Requirements: {
      icon: <UserCheck className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-400",
    },
    Preparation: {
      icon: <Heart className="w-6 h-6" />,
      color: "from-indigo-400 to-purple-400",
    },
    Pricing: {
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-emerald-400 to-teal-400",
    },
    General: {
      icon: <Users className="w-6 h-6" />,
      color: "from-amber-400 to-orange-400",
    },
    Planning: {
      icon: <Calendar className="w-6 h-6" />,
      color: "from-rose-400 to-pink-400",
    },
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="faqs"
      className="relative py-12 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        {/* Header */}
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-5 py-2 mb-6 shadow-sm">
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span className="text-sky-700 text-xs font-medium tracking-wide">
              EVERYTHING YOU WONDERED
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
            {mainTitle
              ? mainTitle.split(" ").map((word, idx, arr) =>
                  idx === arr.length - 1 ? (
                    <span
                      key={idx}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600"
                    >
                      {word}
                    </span>
                  ) : (
                    <span key={idx}>{word} </span>
                  ),
                )
              : "Frequently Asked "}
          </h2>
        </div>

        {/* <div className="text-center max-w-3xl mx-auto mb-16">
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
        </div> */}

        {/* FAQ Accordion */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-3 space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item) => {
                const isOpen = openItems[item._id];
                const cat = categoryConfig[item.category] || {};
                return (
                  <div
                    key={item._id}
                    className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                      isOpen ? "shadow-lg shadow-sky-100" : "hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`relative bg-white rounded-xl border-3 border-sky-300 transition-all duration-300 ${
                        isOpen
                          ? "border-sky-200"
                          : "border-sky-100 hover:border-sky-200"
                      } z-0`}
                    >
                      <button
                        onClick={() => toggleItem(item._id)}
                        className="w-full px-6 py-5 text-left flex items-center gap-4 relative z-10"
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                          bg-gradient-to-r ${cat.color} text-white`}
                        >
                          {cat.icon}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                            <span className="text-xs text-sky-400">FAQ</span>
                          </div>
                          <h3
                            className={`font-semibold transition-colors ${
                              isOpen ? "text-sky-900" : "text-sky-700"
                            }`}
                          >
                            {item.question}
                          </h3>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isOpen
                              ? "bg-gradient-to-r from-sky-400 to-blue-400 text-white rotate-180"
                              : "bg-sky-50 text-sky-400"
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6 pl-[72px]">
                          <div className="border-t border-sky-100 pt-4">
                            <p
                              className="text-sky-700 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            ></p>
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
                <h3 className="text-lg font-semibold text-sky-900 mb-2">
                  No questions found
                </h3>
                <p className="text-sky-600">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
