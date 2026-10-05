import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="badge bg-primary/20 text-primary mb-4">
            About MediCare Pro
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Redefining Healthcare
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Bringing modern technology to traditional healthcare — one
            patient at a time.
          </p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🏥", label: "Departments", value: "7+" },
            { icon: "👨‍⚕️", label: "Specialists", value: "50+" },
            { icon: "🧑", label: "Patients", value: "10K+" },
            { icon: "📅", label: "Since", value: "2024" },
          ].map((s, i) => (
            <div key={i} className="card text-center shadow-lg">
              <div className="text-3xl mb-1">{s.icon}</div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600"
            alt="Hospital"
            className="rounded-2xl shadow-xl"
          />
          <div>
            <span className="badge bg-primary/10 text-primary mb-3">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">
              Built to Make Healthcare Simple
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              MediCare Pro was founded in 2024 with a simple mission: to make
              healthcare accessible, transparent, and efficient for everyone.
              We connect patients with trusted specialists through a seamless
              digital experience.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              From booking appointments to downloading prescriptions, our
              platform empowers patients and healthcare providers to focus on
              what matters most — quality care.
            </p>
            <Link to="/doctors" className="btn-primary inline-block">
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MISSION / VISION / VALUES ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-white">
              What Drives Us
            </h2>
            <p className="text-slate-500">
              Three pillars behind everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                desc: "Deliver world-class healthcare access to every patient, regardless of location or income.",
                color: "bg-blue-100 dark:bg-blue-900/30",
              },
              {
                icon: "👁️",
                title: "Our Vision",
                desc: "A future where booking a doctor is as easy as ordering a ride — instant, reliable, transparent.",
                color: "bg-green-100 dark:bg-green-900/30",
              },
              {
                icon: "💎",
                title: "Our Values",
                desc: "Trust, transparency, and compassion in every interaction. Patients come first, always.",
                color: "bg-purple-100 dark:bg-purple-900/30",
              },
            ].map((item, i) => (
              <div key={i} className="card text-center hover:shadow-lg transition">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl ${item.color} flex items-center justify-center text-4xl mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center border border-primary/10">
          <div>
            <span className="badge bg-secondary/10 text-secondary mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
              What Makes Us Different
            </h2>
            <ul className="space-y-4">
              {[
                "Board-certified specialists across all departments",
                "24/7 emergency response teams",
                "Secure patient data with role-based access",
                "Real-time appointment tracking",
                "Downloadable PDF prescriptions",
                "Transparent pricing — no hidden fees",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500"
            alt="Doctors"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* ===== VALUES IN ACTION ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-white">
              Trusted by Thousands
            </h2>
            <p className="text-slate-500">
              What our patients and partners say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Mary Wanjiku",
                role: "Patient",
                text: "The easiest way to book a doctor I've ever used. And the PDF prescriptions are so convenient!",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "Dr. James Kimani",
                role: "Cardiologist",
                text: "My dashboard gives me full control over my schedule. Approving appointments takes seconds.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Khadija Jibriel",
                role: "Patient",
                text: "I can access my entire medical history from my phone. This is healthcare done right.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              },
            ].map((t, i) => (
              <div key={i} className="card">
                <div className="text-yellow-500 text-lg mb-3">★★★★★</div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
          Ready to Experience Better Healthcare?
        </h3>
        <p className="text-slate-500 mb-8">
          Join thousands of patients and doctors already using MediCare Pro.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/register" className="btn-primary">
            Get Started Free
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}