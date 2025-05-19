import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function ProtectedRoute() {
    const {isAuthenticated} = useAppSelector((state)=>state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
