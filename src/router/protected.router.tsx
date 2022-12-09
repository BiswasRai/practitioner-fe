import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/localStorage";

const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = getAccessToken();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
