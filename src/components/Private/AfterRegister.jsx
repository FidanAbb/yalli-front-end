import { Navigate, Outlet } from "react-router-dom";

export const HideAfterRegisterRoute = () => {
  const afterRegister = localStorage.getItem("afterRegister");
  
  console.log("After Register:", afterRegister);

  // afterRegister-in 
  return afterRegister === "true" ? <Navigate to="/login" /> : <Outlet />;
};