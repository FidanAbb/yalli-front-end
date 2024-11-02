import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import mentorIcon from "../../../../src/pages/Profile/assets/img/mentor-icon.svg";
import mentorIconDark from "../../../../src/pages/Profile/assets/img/mentor-icon-dark.svg";
import { GoPeople } from "react-icons/go";
import { CiCircleQuestion } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext } from "react";
import { YalliContext } from "../../../Context/YalliContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileLeft = () => {
  const navigate = useNavigate();
  const {userID}=useContext(YalliContext)
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`https://yalli-back-end.onrender.com/v1/users/delete/${userID}`);
      handleLogout();
      toast.success("Hesab uğurla silindi");
    } catch (error) {
      console.error("Hesab silinərkən xəta baş verdi:", error);
      toast.error("Hesab silinə bilmədi");
    }
  };
  return (
    <div className="col-md-3 col-sm-12 col-12">
      <div className="profile-left">
        <div className="top">
          <ul>
            <li>
              <NavLink
                className="link"
                to="/profile/profile-info"
                activeClassName="active-link"
              >
                <FaRegUserCircle className="user-icon" />
                Profil Məlumatları
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                to="/profile/profile-notification"
                activeClassName="active-link"
              >
                <IoNotificationsOutline className="notif-icon" />
                Notification
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                to="/profile/profile-mentoring"
                activeClassName="active-link"
              >
                <img src={mentorIcon} className="mentor-icon" alt="" />
                <img src={mentorIconDark} className="mentor-icon-dark" alt="" />
                <p>Mentorluq</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                to="/profile/profile-community-edit"
                activeClassName="active-link"
              >
                <GoPeople />
                <p>İcmaları redaktə et</p>
              </NavLink>
            </li>
            <li className="disabled-link">
              <NavLink
                className="link"
                to="/profile/profile-settings"
                activeClassName="active-link"
              >
                <IoSettingsOutline />
                Parametrlər
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                to="/profile/profile-help"
                activeClassName="active-link"
              >
                <CiCircleQuestion className="help-icon" />
                Kömək & Dəstək
              </NavLink>
            </li>
            <li>
              <div onClick={handleLogout} className="link log-out">
                <IoIosLogOut className="icon" />
                Çıxış
              </div>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div onClick={handleDeleteAccount} className="dp-align ">
          <RiDeleteBin6Line />
            <p>Hesabı sil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
