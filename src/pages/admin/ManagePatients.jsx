import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => {
    api.get("/users?role=patient").then((r) => setPatients(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (window.confirm("Delete this patient?")) {
      await api.delete("/users/" + id);
      toast.success("Patient deleted");
      load();
    }
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Patients</h1>

        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input mb-6"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="card">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={p.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.email}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-1">
                📞 {p.phone || "N/A"}
              </p>
              <p className="text-sm text-slate-500 mb-3">
                🩸 {p.bloodGroup || "N/A"} · Age {p.age || "N/A"}
              </p>
              <button
                onClick={() => del(p.id)}
                className="text-danger text-sm font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 py-10">
            No patients found.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}