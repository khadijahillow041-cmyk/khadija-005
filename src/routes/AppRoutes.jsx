import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Services from "../pages/public/Services";
import Departments from "../pages/public/Departments";
import Doctors from "../pages/public/Doctors";
import DoctorDetails from "../pages/public/DoctorDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Blog from "../pages/public/Blog";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import RoleRoute from "../components/RoleRoute";

import PatientDashboard from "../pages/patient/PatientDashboard";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import PatientProfile from "../pages/patient/PatientProfile";
import MyPrescriptions from "../pages/patient/MyPrescriptions";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/DoctorAppointments";
import MyPatients from "../pages/doctor/MyPatients";
import WritePrescription from "../pages/doctor/WritePrescription";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageDoctors from "../pages/admin/ManageDoctors";
import ManagePatients from "../pages/admin/ManagePatients";
import ManageDepartments from "../pages/admin/ManageDepartments";
import ManageAppointments from "../pages/admin/ManageAppointments";
import ManageMessages from "../pages/admin/ManageMessages";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PATIENT */}
      <Route
        path="/patient"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/patient/book"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <BookAppointment />
          </RoleRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <MyAppointments />
          </RoleRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <PatientProfile />
          </RoleRoute>
        }
      />
      <Route
        path="/patient/prescriptions"
        element={
          <RoleRoute allowedRoles={["patient"]}>
            <MyPrescriptions />
          </RoleRoute>
        }
      />

      {/* DOCTOR */}
      <Route
        path="/doctor"
        element={
          <RoleRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <RoleRoute allowedRoles={["doctor"]}>
            <DoctorAppointments />
          </RoleRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <RoleRoute allowedRoles={["doctor"]}>
            <MyPatients />
          </RoleRoute>
        }
      />
      <Route
        path="/doctor/prescribe"
        element={
          <RoleRoute allowedRoles={["doctor"]}>
            <WritePrescription />
          </RoleRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <ManageDoctors />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/patients"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <ManagePatients />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/departments"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <ManageDepartments />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <ManageAppointments />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <ManageMessages />
          </RoleRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="p-20 text-center">
            <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
            <a href="/" className="btn-primary">
              Go Home
            </a>
          </div>
        }
      />
    </Routes>
  );
}