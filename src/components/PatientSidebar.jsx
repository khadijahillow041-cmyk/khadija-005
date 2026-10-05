import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PatientSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: "/patient", label: "Dashboard", icon: "📊" },
    { to: "/patient/book", label: "Book Appointment", icon: "➕" },
    { to: "/patient/appointments", label: "My Appointments", icon: "📋" },
    { to: "/patient/prescriptions", label: "Prescriptions", icon: "💊" },
    { to: "/patient/profile", label: "My Profile", icon: "👤" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full flex flex-col">
      {/* Logo */}
      <Link
        to="/patient"
        className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0 block hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
      >
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="MediCare Pro"
            className="h-11 w-11 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <span className="text-lg font-extrabold block leading-tight text-slate-800 dark:text-white">
              <span className="text-primary">Medi</span>Care
            </span>
            <span className="text-xs font-medium text-slate-400">
              Patient Portal
            </span>
          </div>
        </div>
      </Link>

      {/* User card */}
      {user && (
        <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate text-slate-800 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Menu
        </p>
        <div className="space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/patient"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary"
                }`
              }
            >
              <span className="text-lg">{l.icon}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Public Site */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mt-6 mb-2">
          More
        </p>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-all duration-200"
        >
          <span className="text-lg">🌐</span>
          <span>Public Site</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-100 dark:border-slate-700 p-4 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-danger/10 text-danger hover:bg-danger hover:text-white font-semibold transition-colors duration-200"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}