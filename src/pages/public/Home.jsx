import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import DoctorCard from "../../components/DoctorCard";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    api.get("/users?role=doctor").then((r) => setDoctors(r.data.slice(0, 3)));
    api.get("/departments").then((r) => setDepartments(r.data.slice(0, 6)));
  }, []);

  const faqs = [
    {
      q: "How do I book an appointment?",
      a: "Create a free account, browse our specialists, and select a date and time that works for you. You'll get a confirmation instantly.",
    },
    {
      q: "Is my medical data secure?",
      a: "Yes. We use role-based access control, so only you and your assigned doctor can view your medical records.",
    },
    {
      q: "Can I download my prescriptions?",
      a: "Absolutely. Every prescription is available as a professional PDF that you can download, print, or share with any pharmacy.",
    },
    {
      q: "What if I need to cancel an appointment?",
      a: "You can cancel any pending appointment from your dashboard with a single click. No phone calls needed.",
    },
    {
      q: "Do you offer emergency services?",
      a: "Yes. Our emergency department operates 24/7. Call our emergency line at +254 700 911 911 for immediate assistance.",
    },
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="badge bg-primary/20 text-primary mb-4">
              Trusted Healthcare Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
              Your Health, <br />
              Our <span className="text-primary">Priority</span>
            </h1>
            <p className="text-slate-300 mb-8 text-lg">
              Book appointments with top specialists, access your medical
              records, and manage your health — all in one secure place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/doctors" className="btn-primary">
                Find a Doctor
              </Link>
              <Link to="/departments" className="btn-outline">
                Our Departments
              </Link>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
            alt="Doctor"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Specialists", value: "50+", icon: "👨‍⚕️" },
          { label: "Patients Served", value: "10K+", icon: "🧑‍🤝‍🧑" },
          { label: "Departments", value: "12+", icon: "🏥" },
          { label: "Emergency", value: "24/7", icon: "🚑" },
        ].map((s, i) => (
          <div key={i} className="card text-center">
            <div className="text-3xl mb-1">{s.icon}</div>
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted By Leading Health Organizations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          {[
            { name: "WHO", icon: "🌍" },
            { name: "Red Cross", icon: "🩸" },
            { name: "Mayo Clinic", icon: "🏥" },
            { name: "NHS", icon: "⚕️" },
            { name: "CDC", icon: "🦠" },
          ].map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2 py-4 px-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 opacity-70 hover:opacity-100 hover:border-primary/30 transition"
            >
              <span className="text-2xl">{p.icon}</span>
              <span className="font-bold text-sm text-slate-500 dark:text-slate-400">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700"
            alt="Hospital"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <span className="badge bg-primary/10 text-primary mb-3">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A Modern Hospital Built Around You
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              MediCare Pro is a digital hospital management platform that
              connects patients, doctors, and administrators on a single
              secure network. From booking appointments to downloading
              prescriptions, every step of your healthcare journey is
              designed to be simple, fast, and transparent.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our mission is to eliminate the paperwork, waiting times, and
              confusion that plague traditional hospitals — replacing them
              with a clean, modern experience.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">15+</p>
                <p className="text-sm text-slate-500">Years of Service</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm text-slate-500">Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">Why Choose MediCare Pro?</h2>
          <p className="section-subtitle">
            Modern healthcare built around you
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Fast Booking",
                desc: "Book an appointment with any specialist in under 60 seconds.",
              },
              {
                icon: "🔒",
                title: "Secure Records",
                desc: "Your medical data is protected with role-based access control.",
              },
              {
                icon: "📄",
                title: "Digital Prescriptions",
                desc: "Download professional PDF prescriptions anytime, anywhere.",
              },
              {
                icon: "📊",
                title: "Real-Time Analytics",
                desc: "Doctors and admins get live insights on every interaction.",
              },
            ].map((f, i) => (
              <div key={i} className="card hover:shadow-lg transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Everything you need for complete healthcare
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "📅",
              title: "Online Appointments",
              desc: "Book, reschedule, or cancel appointments anytime from your dashboard.",
            },
            {
              icon: "👨‍⚕️",
              title: "Specialist Consultations",
              desc: "Access board-certified specialists across all medical fields.",
            },
            {
              icon: "💊",
              title: "Digital Prescriptions",
              desc: "Receive prescriptions as downloadable PDFs from your doctor.",
            },
            {
              icon: "🚑",
              title: "24/7 Emergency Care",
              desc: "Round-the-clock emergency services with rapid response teams.",
            },
            {
              icon: "📋",
              title: "Medical Records",
              desc: "Your complete appointment and prescription history in one place.",
            },
            {
              icon: "🔬",
              title: "Diagnostics & Labs",
              desc: "Comprehensive diagnostic services with modern laboratory facilities.",
            },
          ].map((s, i) => (
            <div key={i} className="card hover:shadow-lg transition">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DEPARTMENTS ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">Our Departments</h2>
          <p className="section-subtitle">
            Specialized care across every medical field
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => (
              <div key={d.id} className="card hover:shadow-lg transition">
                <div className="text-4xl mb-3">{d.icon}</div>
                <h3 className="font-bold text-lg mb-1">{d.name}</h3>
                <p className="text-sm text-slate-500">{d.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/departments" className="btn-outline">
              View All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MEET OUR SPECIALISTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="section-title">Meet Our Specialists</h2>
        <p className="section-subtitle">
          Experienced doctors ready to help you
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/doctors" className="btn-primary">
            View All Doctors
          </Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting the care you need in 4 simple steps
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Register",
                desc: "Create a free patient account in seconds.",
              },
              {
                step: "02",
                title: "Choose a Doctor",
                desc: "Browse specialists and pick the right one.",
              },
              {
                step: "03",
                title: "Book Appointment",
                desc: "Pick a date and time that works for you.",
              },
              {
                step: "04",
                title: "Get Care",
                desc: "Visit, then download your prescription PDF.",
              },
            ].map((s, i) => (
              <div key={i} className="card text-center relative">
                <div className="text-5xl font-extrabold text-primary/20 mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">Real feedback from real people</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Mary Wanjiku",
              role: "Patient",
              text: "Booking appointments has never been easier. The PDF prescriptions are a game changer!",
              avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Dr. James Kimani",
              role: "Cardiologist",
              text: "The dashboard gives me full control over my schedule. Approving appointments is instant.",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Khadija Jibriel",
              role: "Patient",
              text: "I love that I can access my entire medical history from one place. Modern and clean.",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
          ].map((t, i) => (
            <div key={i} className="card">
              <div className="text-yellow-500 text-lg mb-3">★★★★★</div>
              <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about MediCare Pro
          </p>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="card cursor-pointer">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-semibold pr-4">{f.q}</span>
                  <span className="text-primary text-xl">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-sm text-slate-500 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EMERGENCY BANNER ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-danger to-red-700 text-white rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              🚑 24/7 Emergency Care
            </h3>
            <p className="opacity-90">
              Our emergency team is available around the clock.
            </p>
          </div>
          <a
            href="tel:+254700911911"
            className="bg-white text-danger font-bold px-8 py-3 rounded-lg hover:bg-slate-100 whitespace-nowrap"
          >
            Call +254 700 911 911
          </a>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to Take Charge of Your Health?
        </h2>
        <p className="mb-8 opacity-90">
          Register today and book your first appointment in minutes.
        </p>
        <Link
          to="/register"
          className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-slate-100 inline-block"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}