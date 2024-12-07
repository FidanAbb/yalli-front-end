import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header/Header";
import "./assets/css/profile.css";
import ProfileLeft from "./Components/ProfileLeft";
import ProfileRight from "./Components/ProfileRight";
import { useEffect, useState, useContext } from "react";
import { YalliContext } from "../../Context/YalliContext";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);
  const { hideGroupEdit, setHideGroupEdit } = useContext(YalliContext);
  const location = useLocation(); 


  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === "/profile") {
      setHideGroupEdit(true);
    } else {
      setHideGroupEdit(false);
    }
  }, [location.pathname, setHideGroupEdit]);

  return (
    <div className="profile">
      {console.log(forServerError)}
      <Header />
      <div className="container">
        <div className="profile-con row">
          <ProfileLeft />
          <ProfileRight />
        </div>
      </div>
    </div>
  );
};

export default Profile;
