import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import mentorIcon from "../../../../src/pages/Profile/assets/img/mentor-icon.svg"
const ProfileLeft = () => {
  return (
    <div className="col-md-6 col-sm-6 col-12">
      <div className="profile-left">
        <div className="top">
          <ul>
            <li>
              <Link className="link" to="/profile/profile-info">
                <FaRegUserCircle className="user-icon"/>
                Profil Məlumatları
              </Link>
            </li>
            <li>
              <Link className="link" to="/profile/profile-notification">
                <IoNotificationsOutline className="notif-icon" />
                Notification
              </Link>
            </li>
            <li>
              <Link className="link" to="/profile/profile-mentoring">
              <img src={mentorIcon} className="mentor-icon" alt="" />
                Mentoring
              </Link>
            </li>
            <li>
              <Link className="link" to="/profile/profile-community-edit">
                Community Edit
              </Link>
            </li>
            <li>
              <Link className="link" to="/profile/profile-help">
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default ProfileLeft;
