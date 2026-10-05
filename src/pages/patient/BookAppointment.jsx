import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import PatientLayout from "../../components/PatientLayout";

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preselectedDoctor = params.get("doctor");

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    doctorId: preselectedDoctor || "",
    departmentId: "",
    date: "",
    time: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get("/users?role=doctor").then((r) => setDoctors(r.data));
    api.get("/departments").then((r) => setDepartments(r.data));
  }, []);

  useEffect(() => {
    const doc = doctors.find((d) => d.id === parseInt(form.doctorId));
    if (doc) setForm((f) => ({ ...f, departmentId: doc.departmentId }));
  }, [form.doctorId, doctors]);

  const selectedDoctor = doctors.find(
    (d) => d.id === parseInt(form.doctorId)
  );

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const doctor = doctors.find((d) => d.id === parseInt(form.doctorId));
    const department = departments.find(
      (d) => d.id === parseInt(form.departmentId)
    );

    const payload = {
      patientId: user.id,
      patientName: user.name,
      doctorId: parseInt(form.doctorId),
      doctorName: doctor?.name || "",
      departmentId: parseInt(form.departmentId),
      department: department?.name || "",
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: "pending",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    try {
      await api.post("/appointments", payload);
      toast.success("Appointment booked successfully!");
      setSuccess(true);
      setTimeout(() => navigate("/patient/appointments"), 1500);
    } catch (err) {
      setError("Failed to book. Please try again.");
      toast.error("Booking failed");
    }
  };

  // Quick date options
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (d) => d.toISOString().split("T")[0];

  return (
    <PatientLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative">
            <span className="badge bg-white/20 text-white mb-3">
              Step 1 of 1 · Book in 30 seconds
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Book an Appointment 📅
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Choose a doctor, pick a time, and tell us what's wrong.
              We'll handle the rest.
            </p>
          </div>
        </div>

        {/* ===== ALERTS ===== */}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold">Appointment booked!</p>
              <p className="text-sm opacity-80">Redirecting to your appointments...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* ===== FORM ===== */}
          <div className="md:col-span-2 card">
            <h2 className="text-lg font-bold mb-5 text-slate-800 dark:text-white">
              Appointment Details
            </h2>

            <form onSubmit={submit} className="space-y-5">
              {/* Doctor selection */}
              <div>
                <label className="label">
                  👨‍⚕️ Select Doctor <span className="text-danger">*</span>
                </label>
                <select
                  required
                  value={form.doctorId}
                  onChange={(e) =>
                    setForm({ ...form, doctorId: e.target.value })
                  }
                  className="input"
                >
                  <option value="">-- Choose a doctor --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick date picker */}
              <div>
                <label className="label">
                  📅 Date <span className="text-danger">*</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, date: formatDate(today) })
                    }
                    className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white transition"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, date: formatDate(tomorrow) })
                    }
                    className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white transition"
                  >
                    Tomorrow
                  </button>
                </div>
                <input
                  required
                  type="date"
                  value={form.date}
                  min={formatDate(today)}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="input"
                />
              </div>

              {/* Time picker */}
              <div>
                <label className="label">
                  🕐 Time <span className="text-danger">*</span>
                </label>
                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                  className="input"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="label">
                  📝 Reason for Visit <span className="text-danger">*</span>
                </label>
                <textarea
                  required
                  rows="4"
                  value={form.reason}
                  onChange={(e) =>
                    setForm({ ...form, reason: e.target.value })
                  }
                  className="input"
                  placeholder="Briefly describe your symptoms or reason for the visit..."
                />
                <p className="text-xs text-slate-400 mt-1">
                  {form.reason.length}/300 characters
                </p>
              </div>

              <button className="btn-primary w-full text-base py-3">
                ✅ Confirm Appointment
              </button>
            </form>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="space-y-6">
            {/* Selected doctor preview */}
            {selectedDoctor ? (
              <div className="card border-2 border-primary/20 bg-primary/5">
                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-3">
                  Selected Doctor
                </p>
                <img
                  src={selectedDoctor.avatar}
                  alt={selectedDoctor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-primary/20"
                />
                <p className="font-bold text-center text-slate-800 dark:text-white">
                  {selectedDoctor.name}
                </p>
                <p className="text-sm text-primary text-center font-semibold mb-3">
                  {selectedDoctor.specialty}
                </p>
                <div className="text-xs text-slate-500 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <p className="flex justify-between">
                    <span>Experience</span>
                    <span className="font-semibold">
                      {selectedDoctor.experience} years
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Fee</span>
                    <span className="font-semibold">
                      KES {selectedDoctor.fee}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="card text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                <div className="text-5xl mb-3">👨‍⚕️</div>
                <p className="text-sm text-slate-500">
                  Select a doctor to see their profile
                </p>
              </div>
            )}

            {/* Info box */}
            <div className="card bg-slate-50 dark:bg-slate-800">
              <h3 className="font-bold text-sm mb-3 text-slate-800 dark:text-white">
                📌 Good to Know
              </h3>
              <ul className="text-xs text-slate-500 space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Your appointment will be marked <b>pending</b> until the doctor approves it.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  You can cancel pending appointments anytime.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Prescriptions become available after your visit.
                </li>
              </ul>
            </div>

            {/* Emergency */}
            <div className="card bg-gradient-to-br from-red-500 to-red-700 text-white border-none">
              <p className="text-xs uppercase tracking-wide opacity-90 mb-1">
                Emergency?
              </p>
              <p className="font-bold text-sm mb-2">
                Don't book — call now
              </p>
              <a
                href="tel:+254700911911"
                className="block text-center bg-white text-red-700 font-bold py-2 rounded-lg text-sm hover:bg-slate-100 transition"
              >
                📞 +254 700 911 911
              </a>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}