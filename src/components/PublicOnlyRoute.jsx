import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    const roleRedirect =
      user.role === "admin"
        ? "/admin"
        : user.role === "doctor"
        ? "/doctor"
        : "/patient";
    return <Navigate to={roleRedirect} replace />;
  }

  return children;
};

export default PublicOnlyRoute;