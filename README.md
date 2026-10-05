# 🏥 MediCare Pro — Hospital Management System

A modern, full-featured hospital management system built with **React**, **Tailwind CSS**, and **React Router**. This is a frontend-focused project with a mock REST API (JSON Server) for development.

![MediCare Pro](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Status](https://img.shields.io/badge/status-complete-success)

---

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Test Accounts](#test-accounts)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [What I Learned](#what-i-learned)

---

## 🎯 Overview

MediCare Pro is a comprehensive hospital management platform with **three role-based dashboards** — Admin, Doctor, and Patient. It demonstrates real-world frontend engineering: authentication flows, protected routes, CRUD operations, data visualization, dark mode, PDF generation, and a fully responsive UI.

The app uses **JSON Server** as a mock REST API for development — this keeps the project 100% frontend (no custom backend code needed).

---

## ✨ Features

### 🔐 Authentication & Authorization
- Login / Register with localStorage session
- Role-based access control (Admin, Doctor, Patient)
- Protected routes with `ProtectedRoute` and `RoleRoute`
- Auto-redirect based on user role

### 🩺 Patient Dashboard
- View upcoming and past appointments
- Book new appointments
- Cancel pending appointments
- Edit personal profile (name, phone, age, blood group)
- Download prescriptions as PDF

### 👨‍⚕️ Doctor Dashboard
- View appointment requests
- Approve or reject appointments
- Filter appointments by status (all / pending / approved / rejected)
- View patient list
- Write prescriptions for approved appointments

### 👑 Admin Dashboard
- Real-time statistics (users, doctors, patients, appointments, departments, messages)
- **Interactive charts**:
  - Pie chart — user distribution
  - Bar chart — appointments by status
  - Bar chart — appointments by department
- Manage Doctors (Create, Read, Update, Delete)
- Manage Patients (Read, Delete)
- Manage Departments (Create, Read, Update, Delete)
- Manage Appointments (Read, Update status, Delete)

### 🌐 Public Pages
1. **Home** — Hero, stats, featured doctors, departments preview
2. **Departments** — All 6 hospital departments
3. **Doctors** — 6 doctors with live search + specialty filter
4. **Doctor Details** — Full profile + "Book Appointment" button
5. **About** — Company story and values
6. **Contact** — Form that saves to database
7. **Blog** — Health articles from doctors

### 🎨 UI/UX Enhancements
- **Dark mode** toggle with persistent preference (localStorage)
- **Toast notifications** for all actions (react-hot-toast)
- **PDF prescription generation** with branded header (jsPDF)
- **Loading states** with skeleton loaders
- **Responsive design** — mobile, tablet, desktop
- **Smooth transitions** and hover effects

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 |
| **Routing** | React Router v6 |
| **Styling** | Tailwind CSS 3 |
| **HTTP Client** | Axios |
| **Charts** | Recharts |
| **PDF Generation** | jsPDF |
| **Notifications** | react-hot-toast |
| **Build Tool** | Vite |
| **Mock API** | JSON Server |
| **Icons/Images** | Emoji + Unsplash + randomuser.me |

---

## 📸 Screenshots

> Add your screenshots to a `/screenshots` folder and reference them here.

### Home Page (Light Mode)
![Home Light](screenshots/home-light.png)

### Home Page (Dark Mode)
![Home Dark](screenshots/home-dark.png)

### Doctors List with Search & Filter
![Doctors](screenshots/doctors.png)

### Patient Dashboard
![Patient Dashboard](screenshots/patient-dashboard.png)

### Doctor — Appointment Requests
![Doctor Appointments](screenshots/doctor-appointments.png)

### Admin Dashboard with Charts
![Admin Dashboard](screenshots/admin-dashboard.png)

### PDF Prescription
![PDF Prescription](screenshots/prescription-pdf.png)

---

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@medicare.com` | `admin123` |
| **Doctor** | `doctor@medicare.com` | `doctor123` |
| **Patient** | `patient@medicare.com` | `patient123` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Dreamer gwal/medicare-pro.git
cd medicare-pro

# Install dependencies
npm install

# Start both servers (frontend + JSON Server)
npm start
```

The app will be available at:
- **Frontend:** http://localhost:5173
- **Backend (JSON Server):** http://localhost:5000

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run frontend + backend together |
| `npm run dev` | Run only Vite (frontend) |
| `npm run server` | Run only JSON Server |
| `npm run build` | Build production frontend |

---

## 📁 Project Structure

```
medicare-pro/
├── public/
├── src/
│   ├── api/
│   │   └── axios.js                  # Axios instance
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RoleRoute.jsx
│   │   ├── DoctorCard.jsx
│   │   └── StatCard.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── public/          # 7 public pages
│   │   ├── auth/            # Login, Register
│   │   ├── patient/         # 5 pages
│   │   ├── doctor/          # 4 pages
│   │   └── admin/           # 5 pages
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json                            # Mock database
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## 🧠 What I Learned

- **Role-based routing** — Building a secure `RoleRoute` wrapper that checks `user.role` before rendering protected pages
- **Context API** — Managing global auth and theme state without Redux
- **Data fetching patterns** — Using `useEffect` + Axios for loading, filtering, and refreshing data
- **CRUD operations** — Full create/read/update/delete flows with optimistic UI updates
- **State management** — Managing forms, loading, error, and success states cleanly
- **Dark mode** — Using Tailwind's `darkMode: "class"` strategy with a custom `ThemeContext` for global theming
- **PDF generation** — Building a professional document layout with jsPDF (headers, tables, page breaks)
- **Data visualization** — Rendering responsive charts with Recharts
- **UX polish** — Toast notifications, loading skeletons, empty states, and animations
- **Component design** — Reusable components (`Card`, `Input`, `Button`) via Tailwind utility classes

---

## 🎯 Project Highlights

- ✅ **21 page components** — well-organized by feature (public / auth / patient / doctor / admin)
- ✅ **Role-based access control** — 3 distinct dashboards with different permissions
- ✅ **Full CRUD** — on doctors, patients, departments, and appointments
- ✅ **Real-time search and filters** — with instant UI updates
- ✅ **Dark mode** — persisted via localStorage
- ✅ **PDF prescriptions** — branded, professional output
- ✅ **Toast notifications** — every action gives visual feedback
- ✅ **Charts** — admin analytics with Recharts
- ✅ **Fully responsive** — mobile-first design
- ✅ **Clean architecture** — separation of concerns across folders

---

## 📝 Notes

- This project uses **JSON Server** as a development mock API. It's a widely-used frontend tool that simulates a REST backend without requiring any custom server code. All business logic, routing, and state live in the React frontend.
- The API base URL is `http://localhost:5000` and can be changed in `src/api/axios.js`.

---

## 📜 License

This project is open source and available for educational and portfolio use.

---

**Built with ❤️ by [**Built with ❤️ by Dream Girl**]**

© 2026 MediCare Pro