import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/AdminLayout";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  const load = () => {
    api.get("/appointments").then((r) => setAppointments(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch("/appointments/" + id, { status });
    toast.success(`Marked as ${status}`);
    load();
  };

  const del = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      await api.delete("/appointments/" + id);
      toast.success("Appointment deleted");
      load();
    }
  };

  const badgeColor = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "px-4 py-2 rounded-lg text-sm font-semibold capitalize " +
                (filter === f
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700")
              }
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-slate-500">No appointments.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-soft">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold">Patient</th>
                  <th className="text-left p-4 text-sm font-semibold">Doctor</th>
                  <th className="text-left p-4 text-sm font-semibold">Date</th>
                  <th className="text-left p-4 text-sm font-semibold">Status</th>
                  <th className="text-left p-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100 dark:border-slate-700">
                    <td className="p-4 text-sm">{a.patientName}</td>
                    <td className="p-4 text-sm">
                      {a.doctorName}
                      <span className="block text-xs text-slate-500">
                        {a.department}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {a.date}
                      <span className="block text-xs text-slate-500">
                        {a.time}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={"badge " + badgeColor(a.status)}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm space-x-3">
                      {a.status === "pending" && (
                        <button
                          onClick={() => updateStatus(a.id, "approved")}
                          className="text-green-600 font-semibold hover:underline"
                        >
                          Approve
                        </button>
                      )}
                      {a.status === "pending" && (
                        <button
                          onClick={() => updateStatus(a.id, "rejected")}
                          className="text-yellow-600 font-semibold hover:underline"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => del(a.id)}
                        className="text-danger font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}