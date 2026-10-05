import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contacts", {
        ...form,
        date: new Date().toISOString().slice(0, 10),
      });
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send message");
    } finally {
      setSending(false);
    }
  };

  const contactCards = [
    {
      icon: "📞",
      title: "Call Us",
      value: "+254 700 911 911",
      sub: "Mon-Fri, 8AM - 8PM",
      link: "tel:+254700911911",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "📧",
      title: "Email Us",
      value: "hello@medicarepro.com",
      sub: "We reply within 24 hours",
      link: "mailto:hello@medicarepro.com",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: "📍",
      title: "Visit Us",
      value: "Upper Hill, Nairobi",
      sub: "Kenya Medical Plaza",
      link: "#",
      color: "from-green-500 to-green-600",
    },
  ];

  const faqs = [
    {
      q: "How quickly do you respond?",
      a: "We typically respond within 24 hours on business days. For urgent matters, please call our emergency line.",
    },
    {
      q: "Can I reschedule an appointment?",
      a: "Yes. You can cancel and rebook directly from your patient dashboard — no need to contact us.",
    },
    {
      q: "Do you accept insurance?",
      a: "We accept most major insurance providers. Please contact us directly for specific details.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <span className="badge bg-primary/20 text-primary mb-4">
            We're here to help
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Get in Touch
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Have a question, feedback, or need assistance? Reach out — our team
            is here to help.
          </p>
        </div>
      </section>

      {/* ===== CONTACT CARDS ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {contactCards.map((c, i) => (
            <a
              key={i}
              href={c.link}
              className="card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition`}
              >
                {c.icon}
              </div>
              <h3 className="font-bold text-lg mb-1 text-slate-800 dark:text-white">
                {c.title}
              </h3>
              <p className="text-primary font-semibold text-sm mb-1">
                {c.value}
              </p>
              <p className="text-xs text-slate-500">{c.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="card border-2 border-primary/10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
                Send Us a Message 💬
              </h2>
              <p className="text-sm text-slate-500">
                Fill out the form and we'll get back to you shortly.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="label">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  required
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="input"
                  placeholder="How can we help you?"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {form.message.length}/500 characters
                </p>
              </div>

              <button
                disabled={sending}
                className="btn-primary w-full py-3 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle"></span>
                    Sending...
                  </>
                ) : (
                  "📤 Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800"
              alt="Contact"
              className="rounded-2xl shadow-lg w-full h-48 object-cover"
            />

            {/* Office Hours */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  🕐
                </span>
                Office Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
                  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
                  { day: "Sunday", time: "Emergency only" },
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm py-1"
                  >
                    <span className="text-slate-500">{h.day}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {h.time}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-3 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 font-semibold">
                    🚑 Emergency
                  </span>
                  <span className="font-bold text-danger">24/7</span>
                </div>
              </div>
            </div>

            {/* Trusted Resources */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  🌍
                </span>
                Trusted Resources
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "World Health Organization",
                    handle: "who.int",
                    url: "https://www.who.int",
                    emoji: "🌍",
                  },
                  {
                    name: "Mayo Clinic",
                    handle: "mayoclinic.org",
                    url: "https://www.mayoclinic.org",
                    emoji: "🏥",
                  },
                  {
                    name: "Kenya Ministry of Health",
                    handle: "health.go.ke",
                    url: "https://www.health.go.ke",
                    emoji: "🇰🇪",
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 transition group"
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-xl shrink-0">
                      {s.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800 dark:text-white truncate">
                        {s.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {s.handle}
                      </p>
                    </div>
                    <span className="text-slate-400 group-hover:text-primary transition">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-semibold text-slate-800 dark:text-white pr-4">
                    {f.q}
                  </span>
                  <span className="text-primary text-2xl font-bold">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-sm text-slate-500 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EMERGENCY CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-danger to-red-700 text-white rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              🚑 Need Emergency Care?
            </h3>
            <p className="opacity-90">
              Don't wait — our emergency team is available 24/7.
            </p>
          </div>
          <a
            href="tel:+254700911911"
            className="bg-white text-red-700 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition whitespace-nowrap shadow-lg"
          >
            📞 Call Emergency Line
          </a>
        </div>
      </section>
    </div>
  );
}