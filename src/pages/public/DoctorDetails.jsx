import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    api.get("/users/" + id).then((r) => {
      setDoctor(r.data);
      // Fetch department
      if (r.data.departmentId) {
        api
          .get("/departments/" + r.data.departmentId)
          .then((dr) => setDepartment(dr.data))
          .catch(() => {});
      }
    });
  }, [id]);

  if (!doctor) return <Loader />;

  const bookNow = () => {
    if (!user) return navigate("/login");
    if (user.role !== "patient") {
      alert("Only patients can book appointments.");
      return;
    }
    navigate("/patient/book?doctor=" + doctor.id);
  };

  const isPatient = user?.role === "patient";

  // Availability (mock)
  const availableDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = ["09:00", "10:30", "14:00", "15:30", "17:00"];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Link
        to="/doctors"
        className="text-primary text-sm mb-6 inline-flex items-center gap-1 hover:underline"
      >
        ← Back to all doctors
      </Link>

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/30 object-cover object-top shadow-lg"
          />
          <div className="flex-1 text-center md:text-left">
            <span className="badge bg-white/20 text-white mb-2">
              🩺 Available for bookings
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              {doctor.name}
            </h1>
            <p className="text-white/90 text-lg mb-3">{doctor.specialty}</p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {doctor.experience && (
                <span className="badge bg-white/20 text-white">
                  ⭐ {doctor.experience} years exp
                </span>
              )}
              {doctor.fee && (
                <span className="badge bg-white/20 text-white">
                  💰 KES {doctor.fee}
                </span>
              )}
              {department && (
                <span className="badge bg-white/20 text-white">
                  🏥 {department.name}
                </span>
              )}
            </div>
          </div>

          {/* Book button in hero */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button
              onClick={bookNow}
              className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition shadow-lg whitespace-nowrap"
            >
              📅 Book Appointment
            </button>
            {isPatient && (
              <p className="text-xs text-white/70 text-center">
                Book in under 30 seconds
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT COLUMN — About + Details */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base">
                👤
              </span>
              About Dr. {doctor.name.split(" ").slice(-1)[0]}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {doctor.bio ||
                "This doctor hasn't added a bio yet. Please contact us for more information."}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card text-center">
              <div className="text-3xl mb-1">⭐</div>
              <p className="text-2xl font-bold text-primary">
                {doctor.experience || "—"}
              </p>
              <p className="text-xs text-slate-500">Years Exp.</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-1">💰</div>
              <p className="text-2xl font-bold text-secondary">
                {doctor.fee ? `${doctor.fee}` : "—"}
              </p>
              <p className="text-xs text-slate-500">KES Fee</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-1">🩺</div>
              <p className="text-2xl font-bold text-accent">100%</p>
              <p className="text-xs text-slate-500">Satisfaction</p>
            </div>
          </div>

          {/* Services offered */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base">
                💼
              </span>
              Services
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "General Consultation",
                "Follow-up Visits",
                "Prescription Writing",
                "Health Checkup",
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="text-primary">✓</span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-base">
                📅
              </span>
              Availability
            </h2>

            <p className="text-sm text-slate-500 mb-3">Available days</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span
                  key={d}
                  className={
                    "px-3 py-1.5 rounded-lg text-xs font-semibold " +
                    (availableDays.includes(d)
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-400 line-through")
                  }
                >
                  {d}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-500 mb-3">Time slots</p>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Booking + Contact */}
        <div className="space-y-6">
          {/* Booking card */}
          <div className="card border-2 border-primary/20 bg-primary/5">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <span>📅</span> Ready to book?
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Schedule an appointment with {doctor.name.split(" ")[0]}{" "}
              {doctor.name.split(" ").slice(-1)[0]} today.
            </p>
            <button
              onClick={bookNow}
              className="btn-primary w-full py-3"
            >
              Book Appointment
            </button>
            <p className="text-xs text-slate-400 text-center mt-2">
              Consultations from KES {doctor.fee || "—"}
            </p>
          </div>

          {/* Contact */}
          <div className="card">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span>📞</span> Contact
            </h3>
            <div className="space-y-3 text-sm">
              {doctor.phone && (
                <a
                  href={`tel:${doctor.phone}`}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-primary transition"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    📱
                  </span>
                  <span>{doctor.phone}</span>
                </a>
              )}
              {doctor.email && (
                <a
                  href={`mailto:${doctor.email}`}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-primary transition"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    📧
                  </span>
                  <span className="truncate">{doctor.email}</span>
                </a>
              )}
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  🏥
                </span>
                <span>MediCare Pro Hospital</span>
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div className="card bg-gradient-to-br from-red-500 to-red-700 text-white border-none">
            <p className="text-xs uppercase tracking-wide opacity-90 mb-1">
              Emergency?
            </p>
            <p className="font-bold text-sm mb-3">
              Don't wait — call us now
            </p>
            <a
              href="tel:+254700911911"
              className="block text-center bg-white text-red-700 font-bold py-2.5 rounded-lg text-sm hover:bg-slate-100 transition"
            >
              📞 +254 700 911 911
            </a>
          </div>

          {/* Related */}
          <div className="card">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3 text-sm">
              🔍 Explore More
            </h3>
            <div className="space-y-2">
              <Link
                to="/doctors"
                className="block text-sm text-primary hover:underline"
              >
                → All doctors
              </Link>
              <Link
                to="/departments"
                className="block text-sm text-primary hover:underline"
              >
                → View departments
              </Link>
              <Link
                to="/contact"
                className="block text-sm text-primary hover:underline"
              >
                → Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}