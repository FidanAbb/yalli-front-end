import React, {useState} from "react";
import Header from "../../components/Layout/Header/Header";
// import Footer from "../../components/Layout/Footer/Footer";
import ProfileSideBar from "../../components/profile/ProfileSideBar/ProfileSideBar";
import Main from "../../components/profile/main/Main";
import styles from "./style.module.scss";
import Profilemelumatlari from "../../components/profile/Profilemelumatlari/Profilemelumatlari"
const Profile = () => {
    const [page, setPage] = useState("");
  return (
    <>
      <Header />
      <div className={`container  ${styles["profile_page"]}`}>
      <ProfileSideBar 
          setPage={setPage}
        />
        <Main page={page}/>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Profile;
