import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import DoctorSidebar from "./DoctorSidebar";

export default function DoctorNavbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden text-2xl text-slate-700 dark:text-white"
        >
          ☰
        </button>

        <div className="hidden md:block">
          <h2 className="font-semibold text-slate-700 dark:text-white">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user.specialty || "Doctor"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xl w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <Link
            to="/"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary hidden md:inline"
          >
            🌐 Public Site
          </Link>
          <img
            src={user.avatar}
            alt=""
            className="w-9 h-9 rounded-full border-2 border-primary"
          />
          <button
            onClick={handleLogout}
            className="hidden md:inline-block bg-danger hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <DoctorSidebar />
          </div>
        </div>
      )}
    </>
  );
}