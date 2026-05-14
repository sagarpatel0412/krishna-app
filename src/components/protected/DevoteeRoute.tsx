import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../../services/authService";

export default function DevoteeRoute() {
  const location = useLocation();
  const token = getToken();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const roles = user?.roles || [];

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!roles.includes("VERIFIED_DEVOTEE")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}