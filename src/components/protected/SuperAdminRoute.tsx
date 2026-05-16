import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function UserRoute() {
  const location = useLocation();
  const token = getToken();

  const { isUser } = useAuth();

  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const roles = user?.roles || [];

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}