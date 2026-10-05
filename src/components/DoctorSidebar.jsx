import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DoctorSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: "/doctor", label: "Dashboard", icon: "📊" },
    { to: "/doctor/appointments", label: "Appointments", icon: "📋" },
    { to: "/doctor/patients", label: "My Patients", icon: "🧑‍🤝‍🧑" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-dark text-white h-full flex flex-col">
      <Link
        to="/doctor"
        className="px-6 py-5 border-b border-slate-700 shrink-0 block"
      >
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="MediCare Pro"
            className="h-11 w-11 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <span className="text-lg font-extrabold block">
              <span className="text-primary">Medi</span>Care
            </span>
            <span className="text-xs font-normal text-slate-400">
              Doctor Panel
            </span>
          </div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto py-4">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-primary/20 text-primary border-r-4 border-primary"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-700 p-4 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm bg-danger hover:bg-red-600 font-semibold"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}