import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  const isDashboardRoute =
    path.startsWith("/admin") ||
    path.startsWith("/doctor") ||
    path.startsWith("/patient");

  // Dashboard pages render their OWN layout (sidebar + navbar)
  // So we only render the public layout for public pages
  if (isDashboardRoute) {
    return <AppRoutes />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}