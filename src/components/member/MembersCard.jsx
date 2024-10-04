import React from "react";
import styles from "./style.module.scss";
import Inst from "../ui/Inst";
import Wp from "../ui/Wp";
import Telegram from "../ui/Telegram";

const MembersCard = ({ data }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["left"]}>
          <img src={data.image} alt="" className={styles["profile"]} />
        <div className={styles["content"]}>
          <p className={styles["name"]}>{data.name}</p>
          <p className={styles["location"]}>
            <span className={styles["flag"]}>{data.flag}</span> {data.location}
          </p>
        </div>
      </div>
      
      <div className={styles["right"]}>
        <Telegram className={styles["icon"]} />
        <Inst className={styles["icon"]} />
        <Wp className={styles["icon"]} />
      </div>
    </div>
  );
};

export default MembersCard;
