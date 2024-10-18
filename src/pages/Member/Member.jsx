import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header/Header";
import Main from "../../components/mentor/main/Main";
import Footer from "../../components/Layout/Footer/Footer";
import memberImg from "../../assets/img/member.png";
import styles from "./style.module.scss";
const Member = () => {
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
            <img src={memberImg} alt="member" className={styles["selectDisable"]}/>
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
