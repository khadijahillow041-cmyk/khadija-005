import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: "📅",
      title: "Online Appointments",
      desc: "Book, reschedule, or cancel appointments anytime from your personal dashboard.",
      features: ["24/7 booking", "Instant confirmation", "Easy cancellation"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "👨‍⚕️",
      title: "Specialist Consultations",
      desc: "Access board-certified specialists across all medical fields.",
      features: ["7 departments", "Verified doctors", "Follow-up care"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: "💊",
      title: "Digital Prescriptions",
      desc: "Receive prescriptions as professional, printable PDFs from your doctor.",
      features: ["Instant download", "Print-ready", "Share with pharmacy"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "🚑",
      title: "24/7 Emergency Care",
      desc: "Round-the-clock emergency services with rapid response teams.",
      features: ["Always open", "Rapid response", "Modern equipment"],
      color: "from-red-500 to-red-600",
    },
    {
      icon: "📋",
      title: "Medical Records",
      desc: "Your complete appointment and prescription history in one place.",
      features: ["Full history", "Secure access", "Search & filter"],
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: "🔬",
      title: "Diagnostics & Labs",
      desc: "Comprehensive diagnostic services with modern laboratory facilities.",
      features: ["Blood tests", "Imaging", "Quick results"],
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: "👶",
      title: "Pediatric Care",
      desc: "Compassionate healthcare for infants, children, and adolescents.",
      features: ["Child specialists", "Vaccinations", "Growth tracking"],
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: "🧠",
      title: "Mental Health Support",
      desc: "Confidential counseling and psychiatric care for mental wellness.",
      features: ["Private sessions", "Licensed experts", "Flexible hours"],
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: "🩺",
      title: "General Medicine",
      desc: "Everyday healthcare for common illnesses, checkups, and preventive care.",
      features: ["Walk-ins welcome", "Routine checkups", "Preventive care"],
      color: "from-amber-500 to-amber-600",
    },
  ];

  const process = [
    { step: "01", title: "Register", desc: "Create your free patient account", icon: "📝" },
    { step: "02", title: "Choose Doctor", desc: "Browse and pick a specialist", icon: "👨‍⚕️" },
    { step: "03", title: "Book Visit", desc: "Select date and time that works", icon: "📅" },
    { step: "04", title: "Get Care", desc: "Visit, then get your prescription PDF", icon: "💊" },
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <span className="badge bg-primary/20 text-primary mb-4">
            9 Comprehensive Services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Complete Healthcare Services
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Everything you need for your health — from booking appointments
            to downloading prescriptions — all in one secure platform.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/doctors" className="btn-primary">
              Find a Doctor
            </Link>
            <Link to="/departments" className="btn-outline">
              View Departments
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "👨‍⚕️", value: "50+", label: "Specialists" },
            { icon: "🧑", value: "10K+", label: "Patients Served" },
            { icon: "🚑", value: "24/7", label: "Emergency Care" },
            { icon: "⭐", value: "98%", label: "Satisfaction" },
          ].map((s, i) => (
            <div key={i} className="card text-center shadow-lg">
              <div className="text-3xl mb-1">{s.icon}</div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-white">
            What We Offer
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore our full range of medical services designed around your
            needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="group card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border-t-4 border-transparent hover:border-primary/40"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl mb-4 shadow-md group-hover:scale-110 transition`}
              >
                {s.icon}
              </div>
              <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-white">
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 flex-1">{s.desc}</p>

              <div className="space-y-1 mb-4">
                {s.features.map((f, j) => (
                  <p
                    key={j}
                    className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"
                  >
                    <span className="text-primary font-bold">✓</span>
                    {f}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-white">
              How It Works
            </h2>
            <p className="text-slate-500">
              Getting care in 4 simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div
                key={i}
                className="card text-center relative hover:shadow-lg transition"
              >
                <div className="text-5xl font-extrabold text-primary/20 mb-2">
                  {p.step}
                </div>
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-white">
            Why Choose MediCare Pro
          </h2>
          <p className="text-slate-500">
            What makes our healthcare different
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "Fast & Easy",
              desc: "Book appointments in under 60 seconds. No phone calls, no waiting rooms.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your medical records are protected with role-based access control.",
            },
            {
              icon: "👨‍⚕️",
              title: "Expert Doctors",
              desc: "Board-certified specialists with years of clinical experience.",
            },
            {
              icon: "📱",
              title: "Fully Responsive",
              desc: "Works on any device — phone, tablet, or desktop.",
            },
            {
              icon: "📄",
              title: "Digital Records",
              desc: "All your appointments and prescriptions in one place.",
            },
            {
              icon: "💬",
              title: "24/7 Support",
              desc: "Our team is available around the clock for emergencies.",
            },
          ].map((f, i) => (
            <div key={i} className="card hover:shadow-lg transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-white">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EMERGENCY BANNER ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-danger to-red-700 text-white rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              🚑 Emergency? We're Here 24/7
            </h3>
            <p className="opacity-90">
              Our emergency team is always available for urgent care.
            </p>
          </div>
          <a
            href="tel:+254700911911"
            className="bg-white text-red-700 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition whitespace-nowrap shadow-lg"
          >
            📞 Call +254 700 911 911
          </a>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Book an appointment with any of our specialists in minutes.
            Your health is one click away.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/doctors"
              className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition"
            >
              👨‍⚕️ Find a Doctor
            </Link>
            <Link
              to="/register"
              className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}