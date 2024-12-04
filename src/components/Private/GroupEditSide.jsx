import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { YalliContext } from "../../Context/YalliContext";
import { useContext, useEffect } from "react";

export const HideGroupEditRoute = () => {
  const { groupID,sectionGroup } = useParams();
  console.log(groupID,sectionGroup);

  const { hideGroupEdit, setHideGroupEdit, groupDetailsByUserID } =
    useContext(YalliContext);

  
  return hideGroupEdit ? <Navigate to="/groups" /> : <Outlet />;
};
