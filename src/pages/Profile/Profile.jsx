import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header/Header";
import "./assets/css/profile.css"
import ProfileLeft from "./Components/ProfileLeft";
import ProfileRight from "./Components/ProfileRight";
import {useEffect,useState} from "react";
const Profile = () => {
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  return <div className="profile">
  {console.log(forServerError)}
    <Header/>
    <div className="container">
    <div className="profile-con row">
      <ProfileLeft />
      <ProfileRight />
    </div>
    </div>
  </div>;
}

export default Profile
