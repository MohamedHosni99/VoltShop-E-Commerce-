import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../../store/slices/authSlice";

// لو مش مسجل دخول → يروح صفحة الـ Login
export default function ProtectedRoute() {
  const user = useSelector(selectUser);
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}
