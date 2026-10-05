import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import AdminLayout from "../../components/AdminLayout";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    patients: 0,
    appointments: 0,
    departments: 0,
    contacts: 0,
  });
  const [appointmentsByStatus, setAppointmentsByStatus] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/users"),
      api.get("/users?role=doctor"),
      api.get("/users?role=patient"),
      api.get("/appointments"),
      api.get("/departments"),
      api.get("/contacts"),
    ]).then(([u, d, p, a, dept, c]) => {
      setStats({
        users: u.data.length,
        doctors: d.data.length,
        patients: p.data.length,
        appointments: a.data.length,
        departments: dept.data.length,
        contacts: c.data.length,
      });

      const statusCounts = { pending: 0, approved: 0, rejected: 0 };
      a.data.forEach((apt) => {
        statusCounts[apt.status] = (statusCounts[apt.status] || 0) + 1;
      });
      setAppointmentsByStatus([
        { name: "Pending", value: statusCounts.pending, color: "#f59e0b" },
        { name: "Approved", value: statusCounts.approved, color: "#10b981" },
        { name: "Rejected", value: statusCounts.rejected, color: "#ef4444" },
      ]);

      const deptMap = {};
      a.data.forEach((apt) => {
        deptMap[apt.department] = (deptMap[apt.department] || 0) + 1;
      });
      const deptData = Object.keys(deptMap).map((name) => ({
        name,
        appointments: deptMap[name],
      }));
      setDepartmentLoad(deptData);
    });
  }, []);

  const roleData = [
    { name: "Doctors", value: stats.doctors, color: "#0ea5e9" },
    { name: "Patients", value: stats.patients, color: "#14b8a6" },
    {
      name: "Admins",
      value: stats.users - stats.doctors - stats.patients,
      color: "#6366f1",
    },
  ];

  const cards = [
    { label: "Total Users", value: stats.users, to: "/admin/patients", color: "bg-blue-500" },
    { label: "Doctors", value: stats.doctors, to: "/admin/doctors", color: "bg-green-500" },
    { label: "Patients", value: stats.patients, to: "/admin/patients", color: "bg-purple-500" },
    { label: "Appointments", value: stats.appointments, to: "/admin/appointments", color: "bg-yellow-500" },
    { label: "Departments", value: stats.departments, to: "/admin/departments", color: "bg-pink-500" },
    { label: "Messages", value: stats.contacts, to: "/admin/messages", color: "bg-slate-500" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-500">
            Overview of the entire MediCare Pro system
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className={`${c.color} text-white rounded-xl p-6 shadow hover:shadow-lg transition`}
            >
              <p className="text-sm opacity-90 mb-1">{c.label}</p>
              <p className="text-4xl font-bold">{c.value}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="card">
            <h3 className="font-bold text-lg mb-4">User Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(e) => `${e.name}: ${e.value}`}
                >
                  {roleData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-4">Appointments by Status</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={appointmentsByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {appointmentsByStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card mb-10">
          <h3 className="font-bold text-lg mb-4">
            Appointments by Department
          </h3>
          {departmentLoad.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No department data yet. Book some appointments to see analytics.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentLoad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="appointments"
                  fill="#0ea5e9"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/admin/doctors"
            className="card hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-3">👨‍⚕️</div>
            <h3 className="font-bold mb-1">Manage Doctors</h3>
            <p className="text-sm text-slate-500">Add, edit, remove doctors</p>
          </Link>
          <Link
            to="/admin/patients"
            className="card hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-3">🧑‍🤝‍🧑</div>
            <h3 className="font-bold mb-1">Manage Patients</h3>
            <p className="text-sm text-slate-500">View and edit patient data</p>
          </Link>
          <Link
            to="/admin/departments"
            className="card hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="font-bold mb-1">Departments</h3>
            <p className="text-sm text-slate-500">Manage hospital departments</p>
          </Link>
          <Link
            to="/admin/appointments"
            className="card hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-3">📅</div>
            <h3 className="font-bold mb-1">Appointments</h3>
            <p className="text-sm text-slate-500">Manage all appointments</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}