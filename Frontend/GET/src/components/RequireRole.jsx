import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const { authState } = useAuth();
  const { role } = authState;
  return allowedRole == role ? (
    <Outlet />
  ) : (
    <Navigate to="unathorized" replace />
  );
};

export default RequireAuth;
