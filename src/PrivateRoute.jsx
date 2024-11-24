import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken"); // Bu hissədə istifadəçi məlumatlarınızın yoxlanılması
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}