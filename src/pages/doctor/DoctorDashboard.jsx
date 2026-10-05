import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DoctorLayout from "../../components/DoctorLayout";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api
      .get("/appointments?doctorId=" + user.id)
      .then((r) => setAppointments(r.data));
    api
      .get("/prescriptions?doctorId=" + user.id)
      .then((r) => setPrescriptions(r.data));
  }, [user.id]);

  const pending = appointments.filter((a) => a.status === "pending").length;
  const approved = appointments.filter((a) => a.status === "approved").length;
  const rejected = appointments.filter((a) => a.status === "rejected").length;

  // Unique patients
  const uniquePatients = new Set(appointments.map((a) => a.patientId)).size;

  // Today's appointments
  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(
    (a) => a.date === today && a.status === "approved"
  );

  // Upcoming appointments
  const upcoming = appointments
    .filter((a) => a.status === "approved" && a.date >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // Recent pending requests
  const recentPending = appointments
    .filter((a) => a.status === "pending")
    .slice(0, 3);

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
            <div className="flex-1">
              <p className="text-white/80 text-sm mb-1">
                Welcome back, doctor 👋
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {user.specialty && (
                  <span className="badge bg-white/20 text-white">
                    🩺 {user.specialty}
                  </span>
                )}
                {user.experience && (
                  <span className="badge bg-white/20 text-white">
                    ⭐ {user.experience} years
                  </span>
                )}
                {user.fee && (
                  <span className="badge bg-white/20 text-white">
                    💰 KES {user.fee}
                  </span>
                )}
              </div>
            </div>
            <Link
              to="/doctor/appointments"
              className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition shadow-lg whitespace-nowrap"
            >
              📋 View Requests
              {pending > 0 && (
                <span className="ml-2 bg-danger text-white text-xs px-2 py-0.5 rounded-full">
                  {pending}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ===== ALERT — TODAY'S APPOINTMENTS ===== */}
        {todaysAppointments.length > 0 && (
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div className="flex-1">
                <p className="font-bold text-slate-800 dark:text-white">
                  You have {todaysAppointments.length} appointment
                  {todaysAppointments.length > 1 ? "s" : ""} today
                </p>
                <p className="text-sm text-slate-500">
                  First visit at {todaysAppointments[0].time} with{" "}
                  {todaysAppointments[0].patientName}
                </p>
              </div>
              <Link
                to="/doctor/appointments"
                className="btn-primary text-sm whitespace-nowrap"
              >
                View
              </Link>
            </div>
          </div>
        )}

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-4xl opacity-10">
              📅
            </div>
            <p className="text-sm text-slate-500 mb-1">Appointments</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-white">
              {appointments.length}
            </p>
            <p className="text-xs text-slate-400 mt-1">All time</p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-4xl opacity-10">
              ⏳
            </div>
            <p className="text-sm text-slate-500 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{pending}</p>
            <p className="text-xs text-slate-400 mt-1">Awaiting action</p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-4xl opacity-10">
              🧑‍🤝‍🧑
            </div>
            <p className="text-sm text-slate-500 mb-1">Patients</p>
            <p className="text-3xl font-bold text-primary">
              {uniquePatients}
            </p>
            <p className="text-xs text-slate-400 mt-1">Unique patients</p>
          </div>

          <div className="card relative overflow-hidden hover:shadow-md transition">
            <div className="absolute top-3 right-3 text-4xl opacity-10">
              💊
            </div>
            <p className="text-sm text-slate-500 mb-1">Prescriptions</p>
            <p className="text-3xl font-bold text-secondary">
              {prescriptions.length}
            </p>
            <p className="text-xs text-slate-400 mt-1">Written by you</p>
          </div>
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/doctor/appointments"
              className="group card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-primary/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:bg-primary/20 transition">
                  📋
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-slate-800 dark:text-white">
                    Appointment Requests
                  </h3>
                  <p className="text-sm text-slate-500">
                    Review, approve, or reject patient requests
                  </p>
                </div>
                {pending > 0 && (
                  <span className="badge bg-danger text-white">
                    {pending}
                  </span>
                )}
              </div>
            </Link>

            <Link
              to="/doctor/patients"
              className="group card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-secondary/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-3xl group-hover:bg-secondary/20 transition">
                  🧑‍🤝‍🧑
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-slate-800 dark:text-white">
                    My Patients
                  </h3>
                  <p className="text-sm text-slate-500">
                    View patient records and history
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ===== UPCOMING + PENDING ===== */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">
                📅 Upcoming Appointments
              </h3>
              <Link
                to="/doctor/appointments"
                className="text-xs text-primary font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>

            {upcoming.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-sm text-slate-500">
                  No upcoming appointments
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">
                      🧑
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate text-slate-800 dark:text-white">
                        {a.patientName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {a.date} at {a.time} · {a.department}
                      </p>
                    </div>
                    <Link
                      to={"/doctor/prescribe?appointment=" + a.id}
                      className="text-xs text-primary font-semibold hover:underline shrink-0"
                    >
                      Prescribe
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent pending */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">
                ⏳ Awaiting Your Action
              </h3>
              <Link
                to="/doctor/appointments"
                className="text-xs text-primary font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>

            {recentPending.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-sm text-slate-500">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPending.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center text-lg shrink-0">
                      ⏳
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate text-slate-800 dark:text-white">
                        {a.patientName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {a.date} at {a.time}
                      </p>
                    </div>
                    <Link
                      to="/doctor/appointments"
                      className="text-xs text-primary font-semibold hover:underline shrink-0"
                    >
                      Review →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== HEALTH TIPS FOR DOCTOR ===== */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-700">
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">
              Stay Hydrated
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Long shifts are easier with regular water breaks.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-700 border-green-200 dark:border-slate-700">
            <div className="text-3xl mb-2">🩺</div>
            <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">
              Keep Records Updated
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Accurate patient records ensure better follow-up care.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-800 dark:to-slate-700 border-purple-200 dark:border-slate-700">
            <div className="text-3xl mb-2">😴</div>
            <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">
              Rest Well
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Quality rest improves focus and patient care.
            </p>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}