import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Phone, Mail, MapPin, Globe, Send, ArrowRight, Clock, MessageSquare,
  ChevronRight, CheckCircle, Activity, Instagram, Twitter, Youtube, Sparkles
} from "lucide-react";
import { addContact, getContactUs  } from "../api/contactApi";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile_no: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [contactData, setContactData] = useState(null);

  const heroRef = useRef(null);
  const elementsRef = useRef([]);

useEffect(() => {
  const fetchContactData = async () => {
    try {
      const data = await getContactUs();
      setContactData(data);
    } catch (error) {
      console.error("Failed to fetch contact data", error);
    }
  };

  fetchContactData();
}, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for foreground elements
      gsap.fromTo(elementsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.4,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // // Subtle parallax on mouse move for the hero section
      // const handleMouseMove = (e) => {
      //   const { clientX, clientY } = e;
      //   const xPos = (clientX / window.innerWidth - 0.5) * 20;
      //   const yPos = (clientY / window.innerHeight - 0.5) * 20;

      //   gsap.to(heroRef.current, {
      //     x: xPos,
      //     y: yPos,
      //     duration: 1,
      //     ease: "power2.out"
      //   });
      // };

      // window.addEventListener("mousemove", handleMouseMove);
      // return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });
    try {
      await addContact(formData);
      setSubmitStatus({ type: "success", message: "Message sent! Our expedition experts will contact you within 24 hours." });
      setFormData({ name: "", email: "", mobile_no: "", message: "" });
    } catch (error) {
      setSubmitStatus({ type: "error", message: error.response?.data?.message || "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name) => `
    w-full px-5 py-4 rounded-xl text-sm text-sky-900 transition-all duration-300 outline-none resize-none
    placeholder:text-sky-300 border bg-sky-50/50
    ${focusedField === name
      ? 'border-sky-400 bg-white shadow-lg shadow-sky-100 ring-4 ring-sky-100'
      : 'border-sky-200 hover:border-sky-300'
    }
  `;

const contactChannels = contactData
  ? [
      {
        icon: Phone,
        label: "Call Us",
        title: contactData.contactInfo?.callUs?.value,
        sub: contactData.contactInfo?.callUs?.subValue,
        color: "text-sky-600",
        bg: "bg-sky-50",
        border: "border-sky-100",
        gradient: "from-sky-400 to-blue-500",
      },
      {
        icon: Mail,
        label: "Email Us",
        title: contactData.contactInfo?.emailUs?.value,
        sub: contactData.contactInfo?.emailUs?.subValue,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        gradient: "from-emerald-400 to-teal-500",
      },
      {
        icon: MapPin,
        label: "Visit Us",
        title: contactData.contactInfo?.visitUs?.value,
        sub: contactData.contactInfo?.visitUs?.subValue,
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-100",
        gradient: "from-rose-400 to-pink-500",
      },
    ]
  : [];

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-blue-50 min-h-screen overflow-x-hidden ">

      {/* Decorative blobs */}
      {/* <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/60 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
      </div> */}

      {/* ──────────── CINEMATIC HERO ──────────── */}
<section className="relative h-[65vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-slate-900">

  {/* Main Background Layer */}
  <div className="absolute inset-0 scale-100" ref={heroRef}>
    <img
      src={contactData?.contactMainImage?.cdnUrl}
      className="w-full h-full object-cover"
      alt="Contact Background"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
  </div>


  {/* Foreground Elements */}
  <div className="absolute bottom-0 left-0 w-full px-6 md:px-20 pb-12 z-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-around gap-8 md:gap-4 pointer-events-none">

      {/* Image 1 */}
      <div
        ref={el => elementsRef.current[0] = el}
        className="w-40 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200 backdrop-blur-sm"
      >
        <img
          src={contactData?.contactOtherImages?.[0]?.cdnUrl}
          className="w-full h-full object-cover"
          alt="Explorer"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-white text-[10px] font-bold uppercase tracking-widest">
            The Voyager
          </span>
        </div>
      </div>


      {/* Image 2 */}
      <div
        ref={el => elementsRef.current[1] = el}
        className="w-40 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200 backdrop-blur-sm"
      >
        <img
          src={contactData?.contactOtherImages?.[1]?.cdnUrl}
          className="w-full h-full object-cover"
          alt="Gear"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-white text-[10px] font-bold uppercase tracking-widest">
            The Foundation
          </span>
        </div>
      </div>


      {/* Image 3 (fallback if only 2 images) */}
      <div
        ref={el => elementsRef.current[2] = el}
        className="w-40 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-200 backdrop-blur-sm"
      >
        <img
          src={contactData?.contactOtherImages?.[2]?.cdnUrl || contactData?.contactOtherImages?.[0]?.cdnUrl}
          className="w-full h-full object-cover"
          alt="Adventure"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-white text-[10px] font-bold uppercase tracking-widest">
            The Arsenal
          </span>
        </div>
      </div>

    </div>
  </div>


  {/* Heading */}
  <div className="relative z-30 text-center px-6 max-w-4xl mx-auto mb-20 md:mb-52">
    <div className="text-center mb-16">

      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
        <span className="text-white">
          {contactData?.mainTitle?.split(" ")[0]}
        </span>

        <span className="bg-gradient-to-r from-blue-400 via-sky-200 to-blue-400 bg-clip-text text-transparent">
          {" "}
          {contactData?.mainTitle?.split(" ").slice(1).join(" ")}
        </span>
      </h1>

    </div>
  </div>


  {/* Wave Divider */}
  <div className="absolute bottom-0 w-full overflow-hidden z-[40]">
    <svg viewBox="0 0 1200 80" className="w-full h-[60px]" preserveAspectRatio="none">
      <path d="M0,40 C300,90 900,0 1200,50 L1200,80 L0,80 Z" fill="#f0f9ff" />
    </svg>
  </div>

</section>
      {/* ──────────── CONTACT CARDS ──────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-2 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactChannels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <div key={i}
                className="group bg-white rounded-2xl border border-sky-100 shadow-lg shadow-sky-100/60 p-7 overflow-hidden
                           hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/60 transition-all duration-400 cursor-pointer">
                {/* Top gradient stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${ch.gradient} rounded-t-2xl`} />

                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${ch.bg} border ${ch.border} flex items-center justify-center flex-shrink-0
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${ch.color}`} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.35em] mb-1">{ch.label}</div>
                    <div className="text-base font-bold text-sky-900 mb-1 group-hover:text-sky-600 transition-colors">{ch.title}</div>
                    <div className="text-xs text-sky-500/70">{ch.sub}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ──────────── MAIN CONTENT ──────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* ── LEFT: Info Panel ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Intro card */}
            <div className="bg-white rounded-2xl border border-sky-100 shadow-lg shadow-sky-100/60 p-8">
              <h2 className="text-3xl font-bold text-sky-900 leading-tight mb-4">
                Plan Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">Next Trek</span>
              </h2>
              <p className="text-sky-600/60 text-sm leading-relaxed mb-7">
                Whether it's gear advice, route planning, group bookings, or a custom itinerary — our adventure specialists are one message away.
              </p>

              {/* Response time */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-50 border border-sky-100">
                <Clock className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <div>
                  <div className="text-md font-bold text-sky-700">Response Time</div>
                  <div className="text-sm text-sky-500/70">Usually within 24 hours</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-emerald-600">Online</span>
                </div>
              </div>
            </div>

            {/* Social links */}
           <div className="bg-white rounded-2xl border border-sky-100 shadow-lg shadow-sky-100/60 p-8">
  <div className="text-sm text-sky-400 font-bold uppercase tracking-[0.35em] mb-5">
    Connect With Us
  </div>

  <div className="space-y-3">
    {contactData?.connectWithUs?.map((s, i) => {
      
      const getIcon = () => {
        const name = s.name?.toLowerCase();
        if (name.includes("instagram")) return Instagram;
        if (name.includes("youtube")) return Youtube;
        if (name.includes("twitter") || name.includes("x")) return Twitter;
        return Globe;
      };

      const getHoverStyle = () => {
        const name = s.name?.toLowerCase();
        if (name.includes("instagram")) return "hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50";
        if (name.includes("youtube")) return "hover:text-red-500 hover:border-red-200 hover:bg-red-50";
        if (name.includes("twitter") || name.includes("x")) return "hover:text-sky-500 hover:border-sky-200 hover:bg-sky-50";
        return "hover:text-indigo-500 hover:border-indigo-200 hover:bg-indigo-50";
      };

      const Icon = getIcon();

      return (
        <a
          key={i}
          href={s.value}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-xl border border-sky-100 bg-sky-50/50 text-sky-600 transition-all duration-300 group ${getHoverStyle()}`}
        >
          <Icon className="w-5 h-5 flex-shrink-0 transition-colors" />

          <div>
            <div className="text-md font-bold text-sky-800 group-hover:text-current transition-colors">
              {s.name}
            </div>
            <div className="text-sm text-sky-400">
              {s.value}
            </div>
          </div>

          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </a>
      );
    })}
  </div>
</div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-sky-100 shadow-xl shadow-sky-100/60 p-8 md:p-12 relative overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-t-2xl" />

              {/* Form header */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-full px-4 py-2 mb-5">
                  <Send className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-sky-700 text-[10px] font-bold uppercase tracking-widest">Send a Message</span>
                </div>
                <h3 className="text-3xl font-bold text-sky-900 mb-2">Let's Start a Conversation</h3>
                <p className="text-sky-500/70 text-sm">Fill in the form below and we'll reach you promptly.</p>
              </div>

              {/* Alert */}
              {submitStatus.message && (
                <div className={`mb-8 p-5 rounded-xl flex items-start gap-4 border text-sm font-semibold
                  ${submitStatus.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}>
                  {submitStatus.type === "success"
                    ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    : <Activity className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  }
                  {submitStatus.message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-sky-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      placeholder="John Doe" required className={inputClass('name')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-sky-500 uppercase tracking-widest pl-1">Email Address</label>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com" required className={inputClass('email')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-sky-500 uppercase tracking-widest pl-1">Phone Number</label>
                  <input
                    type="tel" name="mobile_no" value={formData.mobile_no}
                    onChange={handleChange} onFocus={() => setFocusedField('mobile_no')} onBlur={() => setFocusedField(null)}
                    placeholder="+91 90000 00000" required className={inputClass('mobile_no')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-sky-500 uppercase tracking-widest pl-1">Your Message</label>
                  <textarea
                    name="message" value={formData.message} rows="5"
                    onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your next adventure, questions, or how we can help..."
                    required className={inputClass('message')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300
                    ${isSubmitting
                      ? 'bg-sky-100 text-sky-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600 hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 group'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-sky-300 border-t-sky-600 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── MAP ──────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-full px-5 py-2.5 mb-5">
            <Globe className="w-4 h-4 text-sky-600" />
            <span className="text-sky-700 text-xs font-bold uppercase tracking-[0.35em]">Our Location</span>
          </div>
          <h2 className="text-3xl font-bold text-sky-900 mb-2">Find Us</h2>
          <p className="text-sky-500/70 text-sm">Visit our headquarters to plan your expedition in person.</p>
        </div>

        <div className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/60 p-2.5 overflow-hidden
                       hover:shadow-2xl hover:shadow-sky-200/60 hover:border-sky-200 transition-all duration-500">
          <iframe
            title="Vatadya Location"
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.533352239882!2d73.77337899999999!3d18.504785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2be418f1ad253%3A0xd92f0e453c276c97!2sNyati%20Tower%20Bavdhan!5e0!3m2!1sen!2sin!4v1772252530921!5m2!1sen!2sin"
           src={contactData?.findUs?.embeddedMapLocation}
            className="w-full h-[450px] rounded-2xl border-0"
            loading="lazy"
          />
        </div>
      </section>

    </div>
  );
};

export default ContactUsPage;
