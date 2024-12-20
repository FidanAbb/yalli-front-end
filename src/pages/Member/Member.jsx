import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Layout/Header/Header";
import Main from "../../components/mentor/main/Main";
import Footer from "../../components/Layout/Footer/Footer";
import memberImg from "../../assets/img/member.png";
import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import { YalliContext } from "../../Context/YalliContext";
import { useSelector } from "react-redux";
const Member = () => {
   
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  let navigate= useNavigate()
  const [userData, setUserData] = useState("");
  
  useEffect(() => {
    const loggedUser = localStorage.getItem("userInfo");

    if (loggedUser) {
      setUserData(JSON.parse(loggedUser));
    }
  }, []);
  return (
    <>
      <Header />
      {!userData ? (
        <div className={styles["before_login"]}>
          <div className="container">
            <div onClick={()=>navigate('/login')} style={{cursor:'pointer'}}>
              {console.log(forServerError)}
              
              <img

                  src={memberImg}
                  alt="member"
                  className={`${styles["selectDisable"]} ${styles.blurImage}`}
              />
            </div>

          </div>
        </div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Main page="member" />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Member;
