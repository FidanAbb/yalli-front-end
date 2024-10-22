import Header from "../../components/Layout/Header/Header";
import "./assets/css/profile.css"
import ProfileLeft from "./Components/ProfileLeft";
import ProfileRight from "./Components/ProfileRight";
const Profile = () => {
  return <div className="profile">
    <Header/>
    <div className="container">
    <div className="d-flex">
      <ProfileLeft />
      <ProfileRight />
    </div>
    </div>
  </div>;
};

export default Profile;
