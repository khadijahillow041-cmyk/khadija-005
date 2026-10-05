
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [doctorCounts, setDoctorCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/departments"),
      api.get("/users?role=doctor"),
    ]).then(([deptRes, docRes]) => {
      setDepartments(deptRes.data);

      // Count doctors per department
      const counts = {};
      docRes.data.forEach((doc) => {
        const deptId = doc.departmentId;
        if (deptId) {
          counts[deptId] = (counts[deptId] || 0) + 1;
        }
      });
      setDoctorCounts(counts);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-secondary/40 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <span className="badge bg-secondary/20 text-secondary mb-4">
            {departments.length} Medical Departments
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Our Medical Departments
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Comprehensive care across every medical specialty — from
            cardiology to emergency services. All staffed by
            board-certified specialists.
          </p>
        </div>
      </section>

      {/* ===== QUICK STATS ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🏥", label: "Departments", value: departments.length },
            {
              icon: "👨‍⚕️",
              label: "Specialists",
              value: Object.values(doctorCounts).reduce(
                (a, b) => a + b,
                0
              ),
            },
            { icon: "🚑", label: "Emergency", value: "24/7" },
            { icon: "🌍", label: "Patients Served", value: "10K+" },
          ].map((s, i) => (
            <div key={i} className="card text-center shadow-lg">
              <div className="text-3xl mb-1">{s.icon}</div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DEPARTMENTS GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 dark:text-white">
            Browse by Specialty
          </h2>
          <p className="text-slate-500">
            Each department is led by experienced specialists
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d) => (
            <div
              key={d.id}
              className="group card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-transparent hover:border-primary/40"
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl group-hover:bg-primary/20 transition">
                  {d.icon}
                </div>
                {doctorCounts[d.id] > 0 && (
                  <span className="badge bg-secondary/10 text-secondary text-xs">
                    👨‍⚕️ {doctorCounts[d.id]}{" "}
                    {doctorCounts[d.id] === 1 ? "doctor" : "doctors"}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
                {d.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 mb-4 min-h-[60px]">
                {d.description}
              </p>

              {/* Availability badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                  ● Available
                </span>
                <span className="badge bg-primary/10 text-primary text-xs">
                  24/7 Emergency
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Link
                  to="/doctors"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  👨‍⚕️ View Doctors →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-slate-100 dark:bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 dark:text-white">
              Why Our Departments Stand Out
            </h2>
            <p className="text-slate-500">
              Every department is equipped with modern facilities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎯",
                title: "Specialized Care",
                desc: "Each department focuses on its medical field with deep expertise.",
              },
              {
                icon: "🏥",
                title: "Modern Facilities",
                desc: "Latest diagnostic and treatment equipment across all units.",
              },
              {
                icon: "⚡",
                title: "Fast Service",
                desc: "Online booking means less waiting time at the hospital.",
              },
              {
                icon: "👥",
                title: "Expert Team",
                desc: "Board-certified doctors with years of clinical experience.",
              },
            ].map((f, i) => (
              <div key={i} className="card text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Not sure which department you need?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our team will help you find the right specialist for your
            symptoms. Reach out and we'll guide you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/doctors"
              className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition"
            >
              👨‍⚕️ Browse Doctors
            </Link>
            <Link
              to="/contact"
              className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              📞 Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}