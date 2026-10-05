import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  
  const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/departments", label: "Departments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "doctor"
      ? "/doctor"
      : user?.role === "patient"
      ? "/patient"
      : null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const path = window.location.pathname;
  const isDashboardRoute =
    path.startsWith("/admin") ||
    path.startsWith("/doctor") ||
    path.startsWith("/patient");

  if (isDashboardRoute) return null;

  return (
    <nav className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="MediCare Pro"
            className="h-11 w-11 rounded-full object-cover border-2 border-primary"
          />
          <span className="text-xl font-extrabold hidden sm:inline">
            <span className="text-primary">Medi</span>Care{" "}
            <span className="text-secondary">Pro</span>
          </span>
        </Link>

        <ul className="hidden lg:flex gap-7 items-center">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-primary" : "hover:text-primary"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          {dashboardPath && (
            <li>
              <NavLink
                to={dashboardPath}
                className="text-sm font-medium text-secondary hover:text-primary"
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        <div className="hidden lg:flex gap-3 items-center">
          <button
            onClick={toggle}
            className="text-xl w-10 h-10 rounded-lg hover:bg-slate-700 transition"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <img
                src={user.avatar}
                alt=""
                className="w-9 h-9 rounded-full border-2 border-primary"
              />
              <div className="text-sm leading-tight">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-slate-400 capitalize">
                  {user.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-danger hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-primary">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary hover:bg-sky-600 px-5 py-2 rounded-lg text-sm font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xl w-10 h-10 rounded-lg hover:bg-slate-700"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="text-2xl" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-dark border-t border-slate-700 px-6 pb-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-3 border-b border-slate-700 text-sm"
            >
              {l.label}
            </NavLink>
          ))}
          {dashboardPath && (
            <NavLink
              to={dashboardPath}
              onClick={() => setOpen(false)}
              className="block py-3 border-b border-slate-700 text-sm text-secondary"
            >
              Dashboard
            </NavLink>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="mt-3 w-full bg-danger py-2 rounded-lg text-sm font-semibold"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-3 mt-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 text-center border border-primary py-2 rounded-lg text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex-1 text-center bg-primary py-2 rounded-lg text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}