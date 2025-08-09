// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const user = useSelector((state) => state.user); // or use your auth context
  
  // If logged in, redirect to app/dashboard
  return user ? <Navigate to="/app" replace /> : <Outlet />;
}
