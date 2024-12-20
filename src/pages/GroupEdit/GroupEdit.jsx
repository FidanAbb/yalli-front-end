import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "./assets/Css/GroupEdit.css";
import GroupEditAllInfo from "./Components/GroupEditAllInfo/GroupEditAllInfo";
import GroupEditAbout from "./Components/GroupEditAbout/GroupEditAbout";
import GroupEditGallery from "./Components/GroupEditQalereya/GroupEditQalereya";
import { YalliContext } from "../../Context/YalliContext";
import { useSelector } from "react-redux";

// Komponentlər

const GroupEdit = () => {
  const { groupID,sectionGroup,groupDetailsByUserID } = useParams();
  const navigate = useNavigate();
  const {updateGroup}=useContext(YalliContext)
  
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageId: '',
    link: '',
    about: '',
    gallery: [],
    country: '',
    category: 'LIFE'
});
useEffect(() => {
  if (!sectionGroup ) {
    navigate(`/group-edit/${groupID}/all-info`);
  }

}, [groupID, sectionGroup, navigate,groupDetailsByUserID]);

  return (
    <div className="group-edit">
      {console.log(forServerError)
      }
      <div className="row h-100">
        <div className="col-md-2 col-sm-12 col-12 h-100">
          <div className="left">
            <ul className="dp-cloumn">
              <li>
                <NavLink
                  exact
                  className="link"
                  to={`/group-edit/${groupID}/all-info`}
                  activeClassName="active-link"
                >
                  Ümumi Məlumat
                </NavLink>
              </li>
              <hr className="hr" />
              <li>
                <NavLink
                  className="link"
                  to={`/group-edit/${groupID}/about`}
                  activeClassName="active-link"
                >
                  Haqqımızda
                </NavLink>
              </li>
              <hr className="hr" />
              <li>
                <NavLink
                  className="link"
                  to={`/group-edit/${groupID}/gallery`}
                  activeClassName="active-link"
                >
                  Qalereya
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9 col-sm-12 col-12">
          <div className="right">
            {sectionGroup === "all-info" && <GroupEditAllInfo />}
            {sectionGroup === "about" && <GroupEditAbout />}
            {sectionGroup === "gallery" && <GroupEditGallery />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupEdit;
