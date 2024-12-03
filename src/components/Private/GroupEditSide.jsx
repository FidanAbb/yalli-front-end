import { Navigate, Outlet } from "react-router-dom";
import { YalliContext } from "../../Context/YalliContext";
import {useContext} from "react"
export const HideGroupEditRoute = () => {
    const {hideGroupEdit,setHideGroupEdit}=useContext(YalliContext)
    console.log(hideGroupEdit);
    
  return hideGroupEdit ? <Navigate to="/groups" /> : <Outlet />;
};