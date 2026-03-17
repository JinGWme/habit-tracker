import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, hasPin } = useAuth();

  if (!hasPin) {
    return <Navigate to="/auth" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
