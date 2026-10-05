import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import PatientLayout from "../../components/PatientLayout";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api
      .get("/appointments?patientId=" + user.id)
      .then((r) => setAppointments(r.data));
    api.get("/users?role=doctor").then((r) => setDoctors(r.data));
  }, [user.id]);

  // ---- Core stats ----
  const pending = appointments.filter((a) => a.status === "pending").length;
  const approved = appointments.filter((a) => a.status === "approved").length;
  const rejected = appointments.filter((a) => a.status === "rejected").length;

  // ---- This month ----
  const now = new Date();
  const thisMonthVisits = appointments.filter((a) => {
    const d = new Date(a.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  // ---- Upcoming (approved with future date) ----
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = appointments
    .filter((a) => {
      if (a.status !== "approved") return false;
      return new Date(a.date) >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const nextAppointment = upcoming[0] || null;

  // ---- Countdown for next appointment ----
  const getCountdown = () => {
    if (!nextAppointment) return null;
    const apptDate = new Date(`${nextAppointment.date}T${nextAppointment.time || "00:00"}`);
    const diff = apptDate - new Date();
    if (diff < 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  // ---- Total spent on consultations (approved appts) ----
  const totalSpent = appointments
    .filter((a) => a.status === "approved")
    .reduce((sum, a) => {
      const doc = doctors.find((d) => d.id === a.doctorId);
      return sum + (doc?.fee || 0);
    }, 0);

  // ---- Favourite doctor (most visits) ----
  const doctorVisitCount = {};
  appointments.forEach((a) => {
    if (a.doctorName) {
      doctorVisitCount[a.doctorName] = (doctorVisitCount[a.doctorName] || 0) + 1;
    }
  });

  const favouriteDoctor =
    Object.keys(doctorVisitCount).length > 0
      ? Object.entries(doctorVisitCount).sort((a, b) => b[1] - a[1])[0]
      : null;

  // ---- Recent activity ----
  const recent = [...appointments]
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    .slice(0, 3);

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 object-cover shadow-lg"
              />
            )}
            <div className="flex-1">
              <p className="text-white/80 text-sm mb-1">Welcome back,</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {user.name} 👋
              </h1>
              <p className="text-white/90 text-sm">
                Here's a summary of your health records and upcoming visits.
              </p>
            </div>
            <Link
              to="/patient/book"
              className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition shadow-lg whitespace-nowrap"
            >
              ➕ Book New
            </Link>
          </div>
        </div>

        {/* ===== NEXT APPOINTMENT ALERT ===== */}
        {nextAppointment && (
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-3xl">📅</span>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">
                    Next appointment in{" "}
                    <span className="text-primary">{getCountdown()}</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    {nextAppointment.doctorName} · {nextAppointment.date} at{" "}
                    {nextAppointment.time} · {nextAppointment.department}
                  </p>
                </div>
              </div>
              <Link
                to="/patient/appointments"
                className="btn-primary text-sm whitespace-nowrap"
              >
                View Details
              </Link>
            </div>
          </div>
        )}

        {/* ===== STATS (6 cards) ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-3xl opacity-10">📅</div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Total
            </p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {appointments.length}
            </p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-3xl opacity-10">📆</div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              This Month
            </p>
            <p className="text-2xl font-bold text-primary">
              {thisMonthVisits}
            </p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-3xl opacity-10">🔜</div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Upcoming
            </p>
            <p className="text-2xl font-bold text-accent">
              {upcoming.length}
            </p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-3xl opacity-10">⏳</div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Pending
            </p>
            <p className="text-2xl font-bold text-yellow-600">{pending}</p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-3xl opacity-10">✅</div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Approved
            </p>
            <p className="text-2xl font-bold text-green-600">{approved}</p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-3xl opacity-10">💰</div>
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Spent
            </p>
            <p className="text-lg font-bold text-secondary">
              {totalSpent.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">KES total</p>
          </div>
        </div>

        {/* ===== HEALTH SUMMARY ===== */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xl">
                🩸
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                Blood Group
              </h3>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {user.bloodGroup || "—"}
            </p>
            <p className="text-xs text-slate-400">Your blood type</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">
                🎂
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                Age
              </h3>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {user.age || "—"}
            </p>
            <p className="text-xs text-slate-400">Years old</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                👨‍⚕️
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                Favourite Doctor
              </h3>
            </div>
            {favouriteDoctor ? (
              <>
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                  {favouriteDoctor[0]}
                </p>
                <p className="text-xs text-slate-400">
                  {favouriteDoctor[1]} visit
                  {favouriteDoctor[1] > 1 ? "s" : ""}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-400">No visits yet</p>
            )}
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/patient/book"
              className="group card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-3 group-hover:bg-primary/20 transition">
                ➕
              </div>
              <h3 className="font-bold text-base mb-1 text-slate-800 dark:text-white">
                Book Appointment
              </h3>
              <p className="text-sm text-slate-500">
                Schedule a visit with a specialist
              </p>
            </Link>

            <Link
              to="/patient/appointments"
              className="group card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl mb-3 group-hover:bg-secondary/20 transition">
                📋
              </div>
              <h3 className="font-bold text-base mb-1 text-slate-800 dark:text-white">
                My Appointments
              </h3>
              <p className="text-sm text-slate-500">
                View and cancel your bookings
              </p>
            </Link>

            <Link
              to="/patient/prescriptions"
              className="group card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl mb-3 group-hover:bg-accent/20 transition">
                💊
              </div>
              <h3 className="font-bold text-base mb-1 text-slate-800 dark:text-white">
                Prescriptions
              </h3>
              <p className="text-sm text-slate-500">
                View and download your PDFs
              </p>
            </Link>

            <Link
              to="/patient/profile"
              className="group card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl mb-3 group-hover:bg-slate-300 dark:group-hover:bg-slate-600 transition">
                👤
              </div>
              <h3 className="font-bold text-base mb-1 text-slate-800 dark:text-white">
                My Profile
              </h3>
              <p className="text-sm text-slate-500">
                Update your personal info
              </p>
            </Link>
          </div>
        </div>

        {/* ===== UPCOMING + RECENT ===== */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">
                🔜 Upcoming Appointments
              </h3>
              <Link
                to="/patient/appointments"
                className="text-xs text-primary font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>

            {upcoming.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-sm text-slate-500 mb-4">
                  No upcoming appointments
                </p>
                <Link to="/patient/book" className="btn-primary text-sm">
                  Book Now
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.slice(0, 3).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">
                      👨‍⚕️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate text-slate-800 dark:text-white">
                        {a.doctorName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {a.date} at {a.time} · {a.department}
                      </p>
                    </div>
                    <span className="badge bg-accent/10 text-accent text-xs shrink-0">
                      Upcoming
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">
                🕐 Recent Activity
              </h3>
              <Link
                to="/patient/appointments"
                className="text-xs text-primary font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>

            {recent.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-sm text-slate-500">
                  No activity yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">
                      🧑
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate text-slate-800 dark:text-white">
                        {a.doctorName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {a.department} · {a.date}
                      </p>
                    </div>
                    <span
                      className={
                        "badge text-xs shrink-0 " +
                        (a.status === "approved"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : a.status === "rejected"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400")
                      }
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== HEALTH TIPS ===== */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-700">
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">
              Stay Hydrated
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Drink at least 8 glasses of water daily.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-700 border-green-200 dark:border-slate-700">
            <div className="text-3xl mb-2">🥗</div>
            <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">
              Eat Well
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A balanced diet boosts immunity.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-800 dark:to-slate-700 border-purple-200 dark:border-slate-700">
            <div className="text-3xl mb-2">😴</div>
            <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">
              Sleep Well
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Aim for 7-9 hours of restful sleep.
            </p>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}