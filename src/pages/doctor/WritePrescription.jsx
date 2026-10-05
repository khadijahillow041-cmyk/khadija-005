import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import DoctorLayout from "../../components/DoctorLayout";

export default function WritePrescription() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const appointmentId = params.get("appointment");

  const [appointment, setAppointment] = useState(null);
  const [form, setForm] = useState({
    diagnosis: "",
    medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (appointmentId) {
      api
        .get("/appointments/" + appointmentId)
        .then((r) => setAppointment(r.data));
    }
  }, [appointmentId]);

  // Quick medication templates
  const templates = [
    {
      label: "Antibiotic",
      med: { name: "Amoxicillin", dosage: "500mg", frequency: "3x daily", duration: "7 days" },
    },
    {
      label: "Pain Relief",
      med: { name: "Paracetamol", dosage: "500mg", frequency: "Every 6h", duration: "3 days" },
    },
    {
      label: "Antihistamine",
      med: { name: "Cetirizine", dosage: "10mg", frequency: "1x daily", duration: "5 days" },
    },
    {
      label: "Stomach",
      med: { name: "Omeprazole", dosage: "20mg", frequency: "1x daily", duration: "14 days" },
    },
  ];

  const applyTemplate = (med) => {
    // Find first empty medication slot or add new
    const emptyIndex = form.medications.findIndex((m) => !m.name);
    const newMeds = [...form.medications];

    if (emptyIndex !== -1) {
      newMeds[emptyIndex] = { ...med };
    } else {
      newMeds.push({ ...med });
    }

    setForm({ ...form, medications: newMeds });
    toast.success(`${med.name} added`);
  };

  const addMedication = () => {
    setForm({
      ...form,
      medications: [
        ...form.medications,
        { name: "", dosage: "", frequency: "", duration: "" },
      ],
    });
  };

  const updateMed = (i, field, value) => {
    const meds = [...form.medications];
    meds[i][field] = value;
    setForm({ ...form, medications: meds });
  };

  const removeMed = (i) => {
    setForm({
      ...form,
      medications: form.medications.filter((_, idx) => idx !== i),
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const validMeds = form.medications.filter((m) => m.name);

    if (validMeds.length === 0) {
      toast.error("Add at least one medication");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        appointmentId: parseInt(appointmentId),
        patientId: appointment.patientId,
        patientName: appointment.patientName,
        doctorId: user.id,
        doctorName: user.name,
        doctorSpecialty: user.specialty,
        diagnosis: form.diagnosis,
        medications: validMeds,
        notes: form.notes,
        date: new Date().toISOString().slice(0, 10),
      };
      await api.post("/prescriptions", payload);
      toast.success("Prescription created!");
      navigate("/doctor/appointments");
    } catch (err) {
      toast.error("Failed to save prescription");
    } finally {
      setSaving(false);
    }
  };

  const filledMeds = form.medications.filter((m) => m.name).length;

  return (
    <DoctorLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="badge bg-white/20 text-white mb-3">
                {filledMeds} medication{filledMeds !== 1 ? "s" : ""} added
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Write Prescription 📝
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                Create a professional prescription for your patient.
              </p>
            </div>
            {appointment && (
              <Link
                to="/doctor/appointments"
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg text-sm transition whitespace-nowrap"
              >
                ← Back
              </Link>
            )}
          </div>
        </div>

        {/* ===== PATIENT INFO ===== */}
        {appointment && (
          <div className="card bg-primary/5 dark:bg-primary/10 border-l-4 border-primary">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                🧑
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                  Patient
                </p>
                <p className="font-bold text-lg text-slate-800 dark:text-white truncate">
                  {appointment.patientName}
                </p>
                <p className="text-xs text-slate-500">
                  📅 {appointment.date} at {appointment.time} · 🏥{" "}
                  {appointment.department}
                </p>
              </div>
            </div>

            {appointment.reason && (
              <div className="mt-3 pt-3 border-t border-primary/20">
                <p className="text-xs text-slate-500 mb-1">
                  📝 Reason for visit
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {appointment.reason}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ===== QUICK TEMPLATES ===== */}
        <div className="card">
          <p className="text-sm font-bold text-slate-800 dark:text-white mb-3">
            ⚡ Quick Add Common Medications
          </p>
          <div className="flex flex-wrap gap-2">
            {templates.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyTemplate(t.med)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white transition"
              >
                + {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={submit} className="space-y-6">
          {/* Diagnosis */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base">
                🔍
              </span>
              Diagnosis
            </h2>
            <input
              required
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              className="input"
              placeholder="e.g. Acute bronchitis, Hypertension, Urinary tract infection..."
            />
          </div>

          {/* Medications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-base">
                  💊
                </span>
                Medications ({filledMeds})
              </h2>
              <button
                type="button"
                onClick={addMedication}
                className="btn-primary text-sm"
              >
                + Add Row
              </button>
            </div>

            <div className="space-y-3">
              {form.medications.map((m, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-12 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700"
                >
                  {/* Row number */}
                  <div className="md:col-span-1 flex md:flex-col items-center md:justify-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  {/* Inputs */}
                  <div className="md:col-span-3">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block md:hidden">
                      Name
                    </label>
                    <input
                      placeholder="Medication name"
                      value={m.name}
                      onChange={(e) => updateMed(i, "name", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block md:hidden">
                      Dosage
                    </label>
                    <input
                      placeholder="500mg"
                      value={m.dosage}
                      onChange={(e) => updateMed(i, "dosage", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block md:hidden">
                      Frequency
                    </label>
                    <input
                      placeholder="2x daily"
                      value={m.frequency}
                      onChange={(e) => updateMed(i, "frequency", e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block md:hidden">
                      Duration
                    </label>
                    <input
                      placeholder="7 days"
                      value={m.duration}
                      onChange={(e) => updateMed(i, "duration", e.target.value)}
                      className="input"
                    />
                  </div>

                  {/* Remove */}
                  <div className="md:col-span-1 flex md:justify-center items-center">
                    {form.medications.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeMed(i)}
                        className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-danger hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center justify-center transition"
                        title="Remove"
                      >
                        ✕
                      </button>
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center text-slate-300">
                        —
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filledMeds === 0 && (
              <p className="text-xs text-slate-400 text-center mt-4">
                💡 Tip: Click a template above to quickly add a medication, or
                click "+ Add Row" to enter one manually.
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-base">
                📝
              </span>
              Additional Notes
            </h2>
            <textarea
              rows="4"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input"
              placeholder="Advice for the patient (e.g. drink plenty of water, take with food, complete the full course...)"
            />
            <p className="text-xs text-slate-400 mt-1">
              {form.notes.length} characters
            </p>
          </div>

          {/* Actions */}
          <div className="card flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving || filledMeds === 0}
              className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle"></span>
                  Saving Prescription...
                </>
              ) : (
                `💾 Save Prescription (${filledMeds} medication${
                  filledMeds !== 1 ? "s" : ""
                })`
              )}
            </button>
            <Link
              to="/doctor/appointments"
              className="btn-outline sm:w-auto py-3 text-center"
            >
              ✕ Cancel
            </Link>
          </div>
        </form>

        {/* ===== INFO BOX ===== */}
        <div className="card bg-slate-50 dark:bg-slate-800">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                Prescription guidelines
              </h3>
              <ul className="text-sm text-slate-500 space-y-1">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  At least one medication is required to save.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  The patient will receive a downloadable PDF instantly.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  Use clear dosages and durations for patient safety.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}