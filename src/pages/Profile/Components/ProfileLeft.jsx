import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import mentorIcon from "../../../../src/pages/Profile/assets/img/mentor-icon.svg";
import mentorIconDark from "../../../../src/pages/Profile/assets/img/mentor-icon-dark.svg";
import { GoPeople } from "react-icons/go";
import { CiCircleQuestion } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext, useState } from "react";
import { YalliContext } from "../../../Context/YalliContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileLeft = () => {
  const navigate = useNavigate();
  const { userID } = useContext(YalliContext);
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userID");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  const [deltePopap, setDeletePopap] = useState(false);
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `https://yalli-back-end-7v7d.onrender.com/v1/users/delete/${userID}`
      );
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
                onClick={() => {
                  const section = document.getElementById(
                    "profile-info-section"
                  );
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <FaRegUserCircle className="user-icon" />
                Profil Məlumatları
              </NavLink>
            </li>
            <li className="disabled-link">
              <NavLink
                className="link"
                to="/profile/profile-notification"
                activeClassName="active-link"
                onClick={() => {
                  const section = document.getElementById(
                    "profile-notification-section"
                  );
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <IoNotificationsOutline className="notif-icon" />
                Bildirişlər
              </NavLink>
            </li>
            <li className="disabled-link">
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
                onClick={() => {
                  const section = document.getElementById(
                    "profile-community-section"
                  );
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
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
            <li
              onClick={() => {
                const section = document.getElementById("profile-help-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
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
          <div onClick={() => setDeletePopap(true)} className="dp-align ">
            <RiDeleteBin6Line />
            <p>Hesabı sil</p>
          </div>
          {deltePopap && (
            <div>
              <div className="delte-popap">
                <h4>
                  Siz həqiqətən hesabınızı silmək istədiyinizdən əminsinizmi?
                </h4>
                <p>
                  Hesabınızı silmək bütün məlumatlarınızın, daxil olmaq
                  qabiliyyətinizin və xidmətlərdən istifadənin daimi olaraq
                  itirilməsinə səbəb olacaq. Bu addımı geri ala bilməyəcəksiniz.
                </p>
                <div className="btn-con dp-center gap-2 ">
                  <button onClick={() => setDeletePopap(false)}>Xeyr</button>
                  <button onClick={handleDeleteAccount}>Bəli</button>
                </div>
              </div>
              <div
                onClick={() => setDeletePopap(false)}
                className="back-black"
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
