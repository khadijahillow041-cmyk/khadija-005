import { useEffect, useState } from "react";
import api from "../../api/axios";
import DoctorCard from "../../components/DoctorCard";
import Loader from "../../components/Loader";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users?role=doctor").then((r) => {
      setDoctors(r.data);
      setFiltered(r.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const cleanSearch = search.toLowerCase().replace(/[^a-z0-9 ]/g, "");

    let result = doctors.filter((d) => {
      const cleanName = d.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");
      const matchesSearch = cleanName.includes(cleanSearch);
      const matchesSpecialty =
        specialty === "All" || d.specialty === specialty;
      return matchesSearch && matchesSpecialty;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "fee-low") return (a.fee || 0) - (b.fee || 0);
      if (sortBy === "fee-high") return (b.fee || 0) - (a.fee || 0);
      if (sortBy === "experience")
        return (b.experience || 0) - (a.experience || 0);
      return 0;
    });

    setFiltered(result);
  }, [search, specialty, sortBy, doctors]);

  const specialties = [
    "All",
    ...new Set(doctors.map((d) => d.specialty).filter(Boolean)),
  ];

  const resetFilters = () => {
    setSearch("");
    setSpecialty("All");
    setSortBy("name");
  };

  if (loading) return <Loader />;

  const hasActiveFilters =
    search !== "" || specialty !== "All" || sortBy !== "name";

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <span className="badge bg-primary/20 text-primary mb-4">
            {doctors.length} Specialists Available
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Meet Our Doctors
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Find the right specialist for your needs. Our board-certified
            doctors are here to provide the best care possible.
          </p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="card shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="label">🔍 Search</label>
              <input
                placeholder="Search by doctor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="label">🏥 Specialty</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="input"
              >
                {specialties.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="label">📊 Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="name">Name (A-Z)</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-low">Fee (Low to High)</option>
                <option value="fee-high">Fee (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Results bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500">
              Showing <b className="text-slate-800 dark:text-white">{filtered.length}</b>{" "}
              of <b className="text-slate-800 dark:text-white">{doctors.length}</b> doctors
            </p>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary font-semibold hover:underline"
              >
                ↺ Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
              No doctors found
            </h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              We couldn't find any doctors matching your search. Try adjusting
              your filters.
            </p>
            <button onClick={resetFilters} className="btn-primary">
              ↺ Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Can't find the right specialist?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our team will help you find the right doctor for your needs.
            Contact us for personalized assistance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/contact" className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition">
              📞 Contact Us
            </a>
            <a href="/departments" className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded-lg transition">
              🏥 View Departments
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}