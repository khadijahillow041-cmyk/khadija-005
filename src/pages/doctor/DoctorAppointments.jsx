import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import DoctorLayout from "../../components/DoctorLayout";

export default function DoctorAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const load = () => {
    api
      .get("/appointments?doctorId=" + user.id)
      .then((r) => {
        const sorted = r.data.sort(
          (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );
        setAppointments(sorted);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, [user.id]);

  const updateStatus = async (id, status) => {
    await api.patch("/appointments/" + id, { status });
    toast.success(`Appointment ${status}`);
    load();
  };

  const badgeColor = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (status === "rejected")
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
  };

  const statusIcon = (status) => {
    if (status === "approved") return "✅";
    if (status === "rejected") return "❌";
    return "⏳";
  };

  // Stats
  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    approved: appointments.filter((a) => a.status === "approved").length,
    rejected: appointments.filter((a) => a.status === "rejected").length,
  };

  // Filtered
  const filtered = appointments.filter((a) => {
    const matchesFilter = filter === "all" || a.status === filter;
    const matchesSearch =
      a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      a.reason?.toLowerCase().includes(search.toLowerCase()) ||
      a.department?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        <div className="relative overflow-hidden bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative">
            <span className="badge bg-white/20 text-white mb-3">
              {stats.pending} pending · {stats.approved} approved
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Appointment Requests 📋
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Review, approve, and manage your patient appointments.
            </p>
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">📋</div>
            <p className="text-sm text-slate-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {stats.total}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">⏳</div>
            <p className="text-sm text-slate-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">✅</div>
            <p className="text-sm text-slate-500 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.approved}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">❌</div>
            <p className="text-sm text-slate-500 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-500">
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <div className="card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by patient, reason, or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all", label: "All", count: stats.total },
                { key: "pending", label: "Pending", count: stats.pending },
                { key: "approved", label: "Approved", count: stats.approved },
                { key: "rejected", label: "Rejected", count: stats.rejected },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-semibold capitalize transition whitespace-nowrap " +
                    (filter === f.key
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600")
                  }
                >
                  {f.label}
                  <span
                    className={
                      "ml-2 text-xs px-1.5 py-0.5 rounded-full " +
                      (filter === f.key
                        ? "bg-white/20"
                        : "bg-white dark:bg-slate-800")
                    }
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== LIST ===== */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              {appointments.length === 0
                ? "No appointments yet"
                : "No matching appointments"}
            </h3>
            <p className="text-slate-500">
              {appointments.length === 0
                ? "Appointments from patients will appear here."
                : "Try a different filter or search term."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((a) => (
              <div
                key={a.id}
                className={
                  "card hover:shadow-md transition border-l-4 " +
                  (a.status === "pending"
                    ? "border-yellow-400"
                    : a.status === "approved"
                    ? "border-green-500"
                    : "border-red-500")
                }
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                    🧑
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                          {a.patientName}
                        </h3>
                        <p className="text-sm text-primary font-semibold">
                          {a.department}
                        </p>
                      </div>
                      <span className={"badge " + badgeColor(a.status)}>
                        {statusIcon(a.status)} {a.status}
                      </span>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-0.5">
                          📅 Date
                        </p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {a.date}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-0.5">
                          🕐 Time
                        </p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {a.time}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 col-span-2 md:col-span-1">
                        <p className="text-xs text-slate-500 mb-0.5">
                          📆 Requested
                        </p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {a.createdAt || "—"}
                        </p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-slate-500 mb-1">
                        📝 Patient's Reason
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {a.reason}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {a.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(a.id, "approved")}
                            className="btn-primary text-sm"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => updateStatus(a.id, "rejected")}
                            className="btn-danger text-sm"
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}
                      {a.status === "approved" && (
                        <>
                          <Link
                            to={"/doctor/prescribe?appointment=" + a.id}
                            className="btn-secondary text-sm"
                          >
                            📝 Write Prescription
                          </Link>
                          <button
                            onClick={() => updateStatus(a.id, "rejected")}
                            className="btn-outline text-sm"
                          >
                            ↩️ Mark Rejected
                          </button>
                        </>
                      )}
                      {a.status === "rejected" && (
                        <button
                          onClick={() => updateStatus(a.id, "approved")}
                          className="btn-primary text-sm"
                        >
                          ✅ Reconsider & Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== HELP BOX ===== */}
        {appointments.length > 0 && (
          <div className="card bg-slate-50 dark:bg-slate-800">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  Quick Tips
                </h3>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Review pending appointments daily for faster patient care.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Approved appointments can receive prescriptions anytime.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Rejected appointments can be reconsidered if needed.
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