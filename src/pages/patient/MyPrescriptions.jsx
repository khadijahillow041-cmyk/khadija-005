import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import PatientLayout from "../../components/PatientLayout";

export default function MyPrescriptions() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api
      .get("/prescriptions?patientId=" + user.id)
      .then((r) => {
        const sorted = r.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPrescriptions(sorted);
        setLoading(false);
      });
  }, [user.id]);

  const downloadPDF = (p) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("MediCare Pro", 15, 18);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Smart Healthcare Management", 15, 26);
    doc.text("Nairobi, Kenya - +254 700 911 911", 15, 32);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("MEDICAL PRESCRIPTION", 15, 55);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Date: " + p.date, 15, 68);
    doc.text("Prescription ID: #" + p.id, 15, 75);

    doc.setFont("helvetica", "bold");
    doc.text("Patient:", 15, 90);
    doc.text("Prescribed by:", 120, 90);
    doc.setFont("helvetica", "normal");
    doc.text(p.patientName, 15, 97);
    doc.text(p.doctorName, 120, 97);
    if (p.doctorSpecialty) {
      doc.text(p.doctorSpecialty, 120, 104);
    }

    doc.setFont("helvetica", "bold");
    doc.text("Diagnosis:", 15, 120);
    doc.setFont("helvetica", "normal");
    const diagLines = doc.splitTextToSize(p.diagnosis || "N/A", 180);
    doc.text(diagLines, 15, 127);

    let y = 145;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Medications", 15, y);
    y += 8;

    doc.setDrawColor(14, 165, 233);
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
    y += 5;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Medication", 15, y);
    doc.text("Dosage", 75, y);
    doc.text("Frequency", 115, y);
    doc.text("Duration", 165, y);
    y += 4;
    doc.line(15, y, 195, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    (p.medications || []).forEach((m) => {
      if (y > 260) {
        doc.addPage();
        y = 30;
      }
      doc.text(m.name || "-", 15, y);
      doc.text(m.dosage || "-", 75, y);
      doc.text(m.frequency || "-", 115, y);
      doc.text(m.duration || "-", 165, y);
      y += 8;
    });

    if (p.notes) {
      y += 10;
      if (y > 250) {
        doc.addPage();
        y = 30;
      }
      doc.setFont("helvetica", "bold");
      doc.text("Notes:", 15, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const noteLines = doc.splitTextToSize(p.notes, 180);
      doc.text(noteLines, 15, y);
    }

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "This is a digitally generated prescription. For emergencies, call +254 700 911 911.",
      15,
      285
    );

    doc.save("prescription-" + p.id + "-" + p.date + ".pdf");
    toast.success("PDF downloaded!");
  };

  const filtered = prescriptions.filter(
    (p) =>
      p.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
      p.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
      p.medications?.some((m) =>
        m.name?.toLowerCase().includes(search.toLowerCase())
      )
  );

  const stats = {
    total: prescriptions.length,
    thisYear: prescriptions.filter((p) =>
      p.date?.startsWith(new Date().getFullYear().toString())
    ).length,
    medications: prescriptions.reduce(
      (acc, p) => acc + (p.medications?.length || 0),
      0
    ),
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-secondary text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-8 w-56 h-56 bg-white/5 rounded-full"></div>

          <div className="relative">
            <span className="badge bg-white/20 text-white mb-3">
              {stats.total} prescriptions · {stats.medications} medications
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              My Prescriptions 💊
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              View and download your medical prescriptions as professional PDFs.
            </p>
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">💊</div>
            <p className="text-sm text-slate-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {stats.total}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">📅</div>
            <p className="text-sm text-slate-500 mb-1">This Year</p>
            <p className="text-2xl font-bold text-primary">
              {stats.thisYear}
            </p>
          </div>
          <div className="card relative overflow-hidden">
            <div className="absolute top-3 right-3 text-3xl opacity-10">📋</div>
            <p className="text-sm text-slate-500 mb-1">Medications</p>
            <p className="text-2xl font-bold text-secondary">
              {stats.medications}
            </p>
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        {prescriptions.length > 0 && (
          <div className="card">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by diagnosis, doctor, or medication..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
              />
            </div>
          </div>
        )}

        {/* ===== LIST ===== */}
        {prescriptions.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">💊</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              No prescriptions yet
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Your prescriptions will appear here after you visit a doctor.
              Once your doctor writes one, you can download it as a PDF.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
              No matching prescriptions
            </h3>
            <p className="text-slate-500">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="card hover:shadow-md transition border-l-4 border-accent/40"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-2xl shrink-0">
                      💊
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">
                        {p.diagnosis}
                      </h3>
                      <p className="text-sm text-slate-500">
                        By <b>{p.doctorName}</b>
                        {p.doctorSpecialty && ` · ${p.doctorSpecialty}`}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        📅 {p.date} · ID #{p.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadPDF(p)}
                    className="btn-primary text-sm whitespace-nowrap"
                  >
                    📄 Download PDF
                  </button>
                </div>

                {/* Medications */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      💊 Medications ({p.medications?.length || 0})
                    </p>
                    <button
                      onClick={() =>
                        setExpanded(expanded === p.id ? null : p.id)
                      }
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      {expanded === p.id ? "Hide" : "Details"}
                    </button>
                  </div>

                  {/* Compact view */}
                  <div className="space-y-2">
                    {p.medications?.slice(0, expanded === p.id ? undefined : 2).map((m, i) => (
                      <div
                        key={i}
                        className="flex flex-wrap items-center gap-2 text-sm"
                      >
                        <span className="w-2 h-2 rounded-full bg-accent shrink-0"></span>
                        <span className="font-semibold text-slate-800 dark:text-white">
                          {m.name}
                        </span>
                        <span className="text-slate-500">
                          {m.dosage} · {m.frequency}
                        </span>
                        <span className="badge bg-primary/10 text-primary text-xs">
                          {m.duration}
                        </span>
                      </div>
                    ))}
                    {p.medications?.length > 2 && expanded !== p.id && (
                      <p className="text-xs text-slate-400 pl-4">
                        +{p.medications.length - 2} more medication
                        {p.medications.length - 2 > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {p.notes && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                    <span className="text-lg shrink-0">📝</span>
                    <div className="text-sm">
                      <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-0.5">
                        Doctor's Notes
                      </p>
                      <p className="text-yellow-700 dark:text-yellow-400">
                        {p.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ===== INFO BOX ===== */}
        {prescriptions.length > 0 && (
          <div className="card bg-slate-50 dark:bg-slate-800">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="text-4xl">📌</div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  About your prescriptions
                </h3>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    All prescriptions are digitally signed by your doctor.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Download and show the PDF at any pharmacy.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    Keep these records for your medical history.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}