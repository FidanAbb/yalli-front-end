import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Inst from "../ui/Inst";
import Wp from "../ui/Wp";
import Telegram from "../ui/Telegram";
import Fc from "../ui/Fc";
import { YalliContext } from "../../Context/YalliContext";
import axios from "axios";

const icons = [
  <Inst className={styles["icon"]} />,
  <Telegram className={styles["icon"]} />,
  <Wp className={styles["icon"]} />,
  <Fc className={styles["icon"]} width="24" />,
];


const MembersCard = ({ data ,country}) => {
  const { allUsers, setAllUsers } = useContext(YalliContext);
  const {profileImageState,setProfileImageState}=useState()

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const randomIcons = () => {
    const numIcons = Math.floor(Math.random() * 3) + 1; 
    const shuffledIcons = shuffleArray([...icons]); 
    return shuffledIcons.slice(0, numIcons);
  };

  const selectedIcons = randomIcons();

  return (
    <div  className={styles["container"]}>
    <div className={styles["left"]}>
      <img src={data.profilePicture?`https://yalli-back-end.onrender.com/v1/files/${data.profilePictureUrl}`:"../../../src/pages/Profile/assets/img/default-profile-img.webp"} alt="" className={styles["profile"]} />
      <div className={styles["content"]}>
        <p className={styles["name"]}>{data.fullName}</p>
        <p className={styles["location"]}>
          <span className={styles["flag"]}></span> {data.country}
        </p>
      </div>
    </div>

    <div className={styles["right"]}>
      {selectedIcons.map((icon, index) => (
        <span  className={styles.icon_box} key={index} onClick={()=> window.open("https://www.linkedin.com/in/fidan-abbasl%C4%B1-%C4%B1smay%C4%B1lzada/", "_blank")}>{icon}</span>
      ))}
    </div>
  </div>
  );
};

export default MembersCard;
