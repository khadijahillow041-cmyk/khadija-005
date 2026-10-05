import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";

const empty = {
  name: "",
  email: "",
  password: "doctor123",
  phone: "",
  specialty: "",
  departmentId: "",
  bio: "",
  experience: "",
  fee: "",
};

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    api.get("/users?role=doctor").then((r) => setDoctors(r.data));
  };

  useEffect(() => {
    load();
    api.get("/departments").then((r) => setDepartments(r.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      role: "doctor",
      departmentId: parseInt(form.departmentId) || 0,
      experience: parseInt(form.experience) || 0,
      fee: parseInt(form.fee) || 0,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 90) + 1}.jpg`,
    };
    if (editing) {
      await api.put("/users/" + editing, payload);
      toast.success("Doctor updated");
    } else {
      await api.post("/users", payload);
      toast.success("Doctor added");
    }
    setForm(empty);
    setEditing(null);
    setShowForm(false);
    load();
  };

  const edit = (d) => {
    setForm(d);
    setEditing(d.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (id) => {
    if (window.confirm("Delete this doctor?")) {
      await api.delete("/users/" + id);
      toast.success("Doctor deleted");
      load();
    }
  };

  const filtered = doctors.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getDeptName = (id) => {
    const dept = departments.find((d) => d.id === id);
    return dept?.name || "—";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="badge bg-white/20 text-white mb-3">
                {doctors.length} doctors registered
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Manage Doctors 👨‍⚕️
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                Add, edit, or remove doctors from the platform.
              </p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditing(null);
                setForm(empty);
              }}
              className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition shadow-lg whitespace-nowrap"
            >
              {showForm ? "✕ Close Form" : "➕ Add Doctor"}
            </button>
          </div>
        </div>

        {/* ===== FORM ===== */}
        {showForm && (
          <div className="card border-2 border-green-500/20">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">
              {editing ? "✏️ Edit Doctor" : "➕ Add New Doctor"}
            </h2>

            <form onSubmit={submit} className="space-y-4">
              {/* Basic info */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Basic Information
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    required
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    required
                    placeholder="Specialty (e.g. Cardiology)"
                    value={form.specialty}
                    onChange={(e) =>
                      setForm({ ...form, specialty: e.target.value })
                    }
                    className="input"
                  />
                </div>
              </div>

              {/* Professional */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Professional Details
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <select
                    required
                    value={form.departmentId}
                    onChange={(e) =>
                      setForm({ ...form, departmentId: e.target.value })
                    }
                    className="input"
                  >
                    <option value="">-- Department --</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="number"
                    placeholder="Experience (years)"
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    required
                    type="number"
                    placeholder="Fee (KES)"
                    value={form.fee}
                    onChange={(e) =>
                      setForm({ ...form, fee: e.target.value })
                    }
                    className="input"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="label">Short Bio</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Brief description of the doctor's expertise..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="input"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="btn-primary flex-1">
                  {editing ? "💾 Update Doctor" : "➕ Add Doctor"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm(empty);
                    setShowForm(false);
                  }}
                  className="btn-outline"
                >
                  ✕ Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===== SEARCH ===== */}
        {doctors.length > 0 && (
          <div className="card">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                placeholder="Search by name, specialty, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
              />
            </div>
          </div>
        )}

        {/* ===== DOCTOR GRID ===== */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              {doctors.length === 0
                ? "No doctors yet"
                : "No matching doctors"}
            </h3>
            <p className="text-slate-500 mb-6">
              {doctors.length === 0
                ? "Add your first doctor to get started."
                : "Try a different search term."}
            </p>
            {doctors.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                ➕ Add First Doctor
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="card hover:shadow-md transition border-l-4 border-green-500/30"
              >
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={d.avatar}
                    alt={d.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-green-500/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-white truncate">
                      {d.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold">
                      {d.specialty}
                    </p>
                    <p className="text-xs text-slate-400">
                      {getDeptName(d.departmentId)}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-slate-500 mb-4">
                  <p className="truncate">📧 {d.email}</p>
                  <p>📞 {d.phone}</p>
                  <p>
                    💰 KES {d.fee} · ⭐ {d.experience} yrs
                  </p>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => edit(d)}
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => del(d.id)}
                    className="text-danger text-sm font-semibold hover:underline ml-auto"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}