import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import PatientLayout from "../../components/PatientLayout";

export default function PatientProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    age: user.age || "",
    bloodGroup: user.bloodGroup || "",
  });
  const [saving, setSaving] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch("/users/" + user.id, form);
      const updated = { ...user, ...form };
      updateUser(updated);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    form.name !== user.name ||
    form.email !== user.email ||
    form.phone !== (user.phone || "") ||
    String(form.age) !== String(user.age || "") ||
    form.bloodGroup !== (user.bloodGroup || "");

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white/30 object-cover shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border-4 border-white/30">
                {initials}
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {user.name}
              </h1>
              <p className="text-white/80 text-sm mb-3">
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="badge bg-white/20 text-white capitalize">
                  🧑 {user.role}
                </span>
                {user.bloodGroup && (
                  <span className="badge bg-white/20 text-white">
                    🩸 {user.bloodGroup}
                  </span>
                )}
                {user.age && (
                  <span className="badge bg-white/20 text-white">
                    🎂 {user.age} years
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== INFO BANNER ===== */}
        <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-blue-900 dark:text-blue-300 text-sm">
              Keep your profile up to date
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Your doctor uses this information to provide better care. It's
              only visible to you and your assigned specialists.
            </p>
          </div>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={submit} className="card space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base">
                👤
              </span>
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="input"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-700"></div>

          {/* Health Information */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-base">
                🩺
              </span>
              Health Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Age</label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: e.target.value })
                  }
                  className="input"
                  placeholder="e.g. 30"
                />
              </div>
              <div>
                <label className="label">Blood Group</label>
                <select
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({ ...form, bloodGroup: e.target.value })
                  }
                  className="input"
                >
                  <option value="">-- Select --</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-700"></div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving || !hasChanges}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle"></span>
                  Saving...
                </>
              ) : hasChanges ? (
                "💾 Save Changes"
              ) : (
                "✓ All Changes Saved"
              )}
            </button>

            {hasChanges && (
              <button
                type="button"
                onClick={() =>
                  setForm({
                    name: user.name,
                    email: user.email,
                    phone: user.phone || "",
                    age: user.age || "",
                    bloodGroup: user.bloodGroup || "",
                  })
                }
                className="btn-outline sm:w-auto"
              >
                ↺ Reset
              </button>
            )}
          </div>
        </form>

        {/* ===== SIDEBAR INFO CARDS ===== */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-xl">
                🔐
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                Privacy
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Your information is private. Only you and your assigned
              doctors can view your medical records.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                ✏️
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                Edit Anytime
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              You can update your personal details, phone number, and
              health information at any time.
            </p>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}