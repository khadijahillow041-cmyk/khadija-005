import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";

const empty = { name: "", icon: "", description: "" };

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [doctorCounts, setDoctorCounts] = useState({});
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    Promise.all([
      api.get("/departments"),
      api.get("/users?role=doctor"),
    ]).then(([deptRes, docRes]) => {
      setDepartments(deptRes.data);
      const counts = {};
      docRes.data.forEach((doc) => {
        if (doc.departmentId) {
          counts[doc.departmentId] = (counts[doc.departmentId] || 0) + 1;
        }
      });
      setDoctorCounts(counts);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put("/departments/" + editing, form);
      toast.success("Department updated");
    } else {
      await api.post("/departments", form);
      toast.success("Department added");
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
    if (window.confirm("Delete this department?")) {
      await api.delete("/departments/" + id);
      toast.success("Department deleted");
      load();
    }
  };

  const filtered = departments.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="badge bg-white/20 text-white mb-3">
                {departments.length} departments
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Manage Departments 🏥
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                Organize your hospital's medical specialties.
              </p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditing(null);
                setForm(empty);
              }}
              className="bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition shadow-lg whitespace-nowrap"
            >
              {showForm ? "✕ Close Form" : "➕ Add Department"}
            </button>
          </div>
        </div>

        {/* ===== FORM ===== */}
        {showForm && (
          <div className="card border-2 border-purple-500/20">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">
              {editing ? "✏️ Edit Department" : "➕ Add New Department"}
            </h2>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    placeholder="e.g. Cardiology"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">
                    Icon (Emoji) <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    placeholder="e.g. ❤️"
                    value={form.icon}
                    onChange={(e) =>
                      setForm({ ...form, icon: e.target.value })
                    }
                    className="input"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  required
                  rows="2"
                  placeholder="Short description of the department..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="input"
                />
              </div>

              <div className="flex gap-3">
                <button className="btn-primary flex-1">
                  {editing ? "💾 Update Department" : "➕ Add Department"}
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
        {departments.length > 0 && (
          <div className="card">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                placeholder="Search departments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
              />
            </div>
            <p className="text-sm text-slate-500 mt-3">
              Showing <b className="text-slate-800 dark:text-white">{filtered.length}</b> of{" "}
              <b className="text-slate-800 dark:text-white">{departments.length}</b> departments
            </p>
          </div>
        )}

        {/* ===== DEPARTMENTS GRID ===== */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              {departments.length === 0
                ? "No departments yet"
                : "No matching departments"}
            </h3>
            <p className="text-slate-500 mb-6">
              {departments.length === 0
                ? "Add your first department to get started."
                : "Try a different search term."}
            </p>
            {departments.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                ➕ Add First Department
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="card hover:shadow-md transition border-l-4 border-purple-500/30"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl shrink-0">
                    {d.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white truncate">
                      {d.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      👨‍⚕️ {doctorCounts[d.id] || 0}{" "}
                      {doctorCounts[d.id] === 1 ? "doctor" : "doctors"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-4 min-h-[40px]">
                  {d.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
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

        {/* ===== INFO BOX ===== */}
        {departments.length > 0 && (
          <div className="card bg-slate-50 dark:bg-slate-800">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  Tips
                </h3>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Use clear, short names for each department.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Department icons display on the public departments page.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Deleting a department won't delete its doctors — reassign them instead.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}