
import { Search, Calendar, Users, Mountain, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Select Your Royal Expedition",
      description: "Browse our curated collection of premium treks and choose your dream mountain adventure",
      icon: <Search className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      step: "02",
      title: "Customize & Book Seamlessly",
      description: "Personalize your experience with add-ons and book with our secure payment gateway",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500"
    },
    {
      step: "03",
      title: "Prepare with Expert Guidance",
      description: "Receive personalized training plans, gear lists, and pre-trek briefings from our experts",
      icon: <Users className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500"
    },
    {
      step: "04",
      title: "Experience Mountain Majesty",
      description: "Embark on your premium expedition with royal treatment and create lifelong memories",
      icon: <Mountain className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-emerald-950/10 to-blue-950/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
            <span className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
              Seamless Journey
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Your Premium Experience
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            From dream to summit - our streamlined process ensures a flawless and luxurious trekking journey
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/30 via-emerald-500/30 to-amber-500/30 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`mb-6 p-4 bg-gradient-to-r ${step.color}/20 rounded-2xl w-16 h-16 flex items-center justify-center`}>
                    <div className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Check Indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-emerald-400 font-medium">Completed</span>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4">
                    <div className="w-8 h-8">
                      <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-400">
                        <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <span className="flex items-center gap-3">
              Start Your Journey
              <Mountain className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 rounded-xl blur-xl group-hover:opacity-50 transition-opacity"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;