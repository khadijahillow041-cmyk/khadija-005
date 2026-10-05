/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ===== LIGHT BLUE — Primary brand color =====
        primary: "#3b82f6",           // Blue 500 — Main brand
        "primary-dark": "#2563eb",    // Blue 600 — Hover
        "primary-light": "#93c5fd",   // Blue 300 — Light backgrounds
        "primary-50": "#eff6ff",      // Blue 50 — Very light
        "primary-100": "#dbeafe",     // Blue 100 — Light backgrounds
        "primary-200": "#bfdbfe",     // Blue 200
        "primary-300": "#93c5fd",     // Blue 300
        "primary-400": "#60a5fa",     // Blue 400
        "primary-500": "#3b82f6",     // Blue 500 — Same as primary
        "primary-600": "#2563eb",     // Blue 600 — Hover
        "primary-700": "#1d4ed8",     // Blue 700 — Active
        "primary-800": "#1e40af",     // Blue 800
        "primary-900": "#1e3a8a",     // Blue 900

        // ===== SECONDARY — Teal =====
        secondary: "#14b8a6",
        "secondary-dark": "#0d9488",
        "secondary-light": "#5eead4",

        // ===== ACCENT — Indigo =====
        accent: "#6366f1",
        "accent-dark": "#4f46e5",
        "accent-light": "#a5b4fc",

        // ===== DARK — Slate =====
        dark: "#0f172a",
        "dark-light": "#1e293b",

        // ===== STATUS =====
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};