import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import PatientSidebar from "./PatientSidebar";

export default function PatientNavbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 py-3 flex items-center justify-between shrink-0 z-30 shadow-sm">
        {/* Left — Menu + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-2xl text-slate-700 dark:text-white"
          >
            ☰
          </button>

          <div>
            <h2 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base leading-tight">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Here's your health overview
            </p>
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggle}
            className="text-xl w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <Link
            to="/"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <span>🌐</span>
            <span>Public Site</span>
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-primary object-cover"
              />
              <span className="hidden md:block text-sm font-semibold text-slate-700 dark:text-white max-w-[100px] truncate">
                {user.name.split(" ")[0]}
              </span>
              <span className="hidden md:block text-xs text-slate-400">
                ▼
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                  <span className="inline-block mt-2 badge bg-primary/10 text-primary text-[10px] capitalize">
                    {user.role}
                  </span>
                </div>

                <Link
                  to="/patient/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <span>👤</span> My Profile
                </Link>

                <Link
                  to="/patient/appointments"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <span>📋</span> My Appointments
                </Link>

                <Link
                  to="/patient/prescriptions"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <span>💊</span> Prescriptions
                </Link>

                <div className="border-t border-slate-100 dark:border-slate-700 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold flex items-center gap-2 transition"
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <PatientSidebar />
          </div>
        </div>
      )}
    </>
  );
}