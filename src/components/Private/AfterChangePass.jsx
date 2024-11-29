import { Navigate, Outlet } from "react-router-dom";

export const HideAfterChangePass = () => {
  const afterChangePass = localStorage.getItem("afterChangePass");
  
  console.log("After Register:", afterChangePass);

  // afterRegister-in 
  return afterChangePass === "true" ? <Navigate to="/login" /> : <Outlet />;
};