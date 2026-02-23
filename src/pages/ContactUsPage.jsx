import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { addContact } from "../api/contactApi"; // Adjust path as needed

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await addContact(formData);
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile_no: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-linear-to-b from-white to-emerald-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJla2tpbmd8ZW58MHx8MHx8fDA%3D"
          alt="TrekVede Contact"
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-[slowzoom_20s_ease-in-out_infinite]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/50"></div>

        {/* Hero Text */}
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-5 text-lg md:text-xl max-w-2xl mx-auto text-yellow-400 drop-shadow-sm">
            Let's plan your next unforgettable trekking adventure together
          </p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* LEFT */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-semibold text-emerald-700">
                Get in Touch
              </h2>
              <p className="mt-3 text-gray-600 text-lg">
                Our trekking experts are always ready to assist you.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: <Phone />, title: "Phone", value: "+91 98765 43210" },
                {
                  icon: <Mail />,
                  title: "Email",
                  value: "support@trekvede.com",
                },
                { icon: <MapPin />, title: "Location", value: "Pune, India" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-emerald-100 p-6 text-center transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Group Image */}
            <img
              src="/image2.jpg"
              alt="Trek Group"
              className="rounded-3xl shadow-xl w-full object-cover h-64 transform hover:scale-105 transition duration-500"
            />
          </div>

          {/* RIGHT : FORM */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-4 border-emerald-500">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h3>

            {/* Status Message */}
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm hover:shadow-md transition"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm hover:shadow-md transition"
              />

              <input
                type="tel"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm hover:shadow-md transition"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your Message"
                required
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm hover:shadow-md transition"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-emerald-700 text-center mb-8">
          Where to Find Us
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Visit us at our office or plan your trekking adventure with our team
        </p>

        <div className="w-full h-112.5 rounded-3xl overflow-hidden shadow-lg">
          <iframe
            title="TrekVede Location"
            src="https://www.google.com/maps?q=Pune,Maharashtra,India&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Tailwind custom animations */}
      <style>
        {`
          @keyframes slowzoom {
            0%, 100% { transform: scale(1.1); }
            50% { transform: scale(1.15); }
          }
          @keyframes floaty {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-[slowzoom_20s_ease-in-out_infinite] { animation: slowzoom 20s ease-in-out infinite; }
          .animate-[floaty_8s_ease-in-out_infinite] { animation: floaty 8s ease-in-out infinite; }
          .animate-[floaty_10s_ease-in-out_infinite] { animation: floaty 10s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default ContactUsPage;
