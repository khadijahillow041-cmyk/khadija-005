import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const roleRedirect =
      user.role === "admin"
        ? "/admin"
        : user.role === "doctor"
        ? "/doctor"
        : "/patient";

    console.warn(
      `[Auth] Access denied: ${user.role} tried to visit ${location.pathname}`
    );
    return <Navigate to={roleRedirect} replace />;
  }

  return children;
};

export default RoleRoute;