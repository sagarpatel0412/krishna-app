import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function CentreAdminRoute() {
  const location = useLocation();
  const token = getToken();

  const { loading, isCenterAdmin } = useAuth();

  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const roles = user?.roles || [];

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (loading) {
    return <div className="p-10 text-center">Checking access...</div>;
  }

  if (!isCenterAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}