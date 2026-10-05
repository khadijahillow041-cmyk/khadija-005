import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import DoctorLayout from "../../components/DoctorLayout";

export default function MyPatients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/appointments?doctorId=" + user.id),
      api.get("/users?role=patient"),
    ]).then(([apptRes, userRes]) => {
      const appointments = apptRes.data;
      const allUsers = userRes.data;

      // Group appointments by patient
      const patientMap = {};
      appointments.forEach((a) => {
        if (!patientMap[a.patientId]) {
          const userInfo = allUsers.find((u) => u.id === a.patientId);
          patientMap[a.patientId] = {
            id: a.patientId,
            name: a.patientName,
            email: userInfo?.email || "",
            phone: userInfo?.phone || "",
            age: userInfo?.age || "",
            bloodGroup: userInfo?.bloodGroup || "",
            avatar: userInfo?.avatar || "",
            department: a.department,
            totalVisits: 0,
            lastVisit: a.date,
            appointments: [],
          };
        }
        patientMap[a.patientId].totalVisits += 1;
        patientMap[a.patientId].appointments.push(a);

        // Keep most recent visit
        if (new Date(a.date) > new Date(patientMap[a.patientId].lastVisit)) {
          patientMap[a.patientId].lastVisit = a.date;
        }
      });

      const list = Object.values(patientMap).sort(
        (a, b) => new Date(b.lastVisit) - new Date(a.lastVisit)
      );
      setPatients(list);
      setLoading(false);
    });
  }, [user.id]);

  const filtered = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.department?.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const stats = {
    total: patients.length,
    thisMonth: patients.filter((p) => {
      const now = new Date();
      const visit = new Date(p.lastVisit);
      return (
        visit.getMonth() === now.getMonth() &&
        visit.getFullYear() === now.getFullYear()
      );
    }).length,
    totalVisits: patients.reduce((sum, p) => sum + p.totalVisits, 0),
  };

  if (loading) {
    return (
      <DoctorLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-accent text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative">
            <span className="badge bg-white/20 text-white mb-3">
              {stats.total} patients · {stats.totalVisits} total visits
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              My Patients 🧑‍🤝‍🧑
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              All the patients who have booked appointments with you.
            </p>
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">
              🧑‍🤝‍🧑
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Patients</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {stats.total}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">📅</div>
            <p className="text-sm text-slate-500 mb-1">This Month</p>
            <p className="text-2xl font-bold text-primary">
              {stats.thisMonth}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">
              📋
            </div>
            <p className="text-sm text-slate-500 mb-1">Total Visits</p>
            <p className="text-2xl font-bold text-secondary">
              {stats.totalVisits}
            </p>
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        {patients.length > 0 && (
          <div className="card">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
              />
            </div>
          </div>
        )}

        {/* ===== PATIENTS ===== */}
        {patients.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🧑‍🤝‍🧑</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              No patients yet
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Once patients book appointments with you, their details will
              appear here. You can then view their history and manage their
              care.
            </p>
            <Link to="/doctor/appointments" className="btn-primary">
              📋 View Appointment Requests
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              No matching patients
            </h3>
            <p className="text-slate-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="card hover:shadow-md transition border-l-4 border-primary/30"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  {p.avatar ? (
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-14 h-14 rounded-full border-2 border-primary/20 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-0.5">
                      {p.name}
                    </h3>
                    {p.email && (
                      <p className="text-xs text-slate-500 truncate">
                        📧 {p.email}
                      </p>
                    )}
                    <p className="text-xs text-primary font-semibold">
                      🏥 {p.department}
                    </p>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-0.5">
                      📅 Last Visit
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {p.lastVisit}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-0.5">
                      📋 Total Visits
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {p.totalVisits}
                    </p>
                  </div>
                </div>

                {/* Bio info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.age && (
                    <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
                      🎂 {p.age} years
                    </span>
                  )}
                  {p.bloodGroup && (
                    <span className="badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs">
                      🩸 {p.bloodGroup}
                    </span>
                  )}
                  {p.phone && (
                    <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                      📞 {p.phone}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <a
                    href={p.phone ? `tel:${p.phone}` : "#"}
                    className={`text-xs font-semibold ${
                      p.phone
                        ? "text-primary hover:underline"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    📞 Call
                  </a>
                  <a
                    href={p.email ? `mailto:${p.email}` : "#"}
                    className={`text-xs font-semibold ${
                      p.email
                        ? "text-primary hover:underline"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    📧 Email
                  </a>
                  <Link
                    to="/doctor/appointments"
                    className="text-xs font-semibold text-primary hover:underline ml-auto"
                  >
                    View Records →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== INFO BOX ===== */}
        {patients.length > 0 && (
          <div className="card bg-slate-50 dark:bg-slate-800">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  About your patient list
                </h3>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Patients appear here automatically after their first
                    booking with you.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Contact information is only visible to you for the
                    appointments they've booked.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Visit counts help you track follow-ups and continuity of
                    care.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
}