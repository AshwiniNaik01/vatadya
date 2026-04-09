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
