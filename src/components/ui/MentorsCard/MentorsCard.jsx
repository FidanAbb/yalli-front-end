import React from "react";
import styles from "./style.module.scss";
import Jalal from "../../../assets/img/Jalal.svg";
import Lale from "../../../assets/img/Lale.svg";
import Emil from "../../../assets/img/Emil.svg";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";

const MentorsCard = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.groupCard}>
        <img src={Jalal} alt="Jalal" className={styles.mentorImg} />
        <h3 className={styles.mentorName}>Jalal Naghiyev</h3>
        <p className={styles.country}>🇺🇸</p>
        <p className={styles.status}>Yasam</p>
      </div>
      <div className={styles.groupCard}>
        <img src={Lale} alt="Lale" className={styles.mentorImg} />
        <h3 className={styles.mentorName}>Lalə Əzimli</h3>
        <p className={styles.country}>🇨🇦</p>
        <p className={styles.status}>Yasam</p>
      </div>
      <div className={styles.groupCard}>
        <img src={Emil} alt="Emil" className={styles.mentorImg} />
        <h3 className={styles.mentorName}>Emil Cahangirli</h3>
        <p className={styles.country}>🇵🇱</p>
        <p className={styles.status}>Yasam</p>
      </div>
      <div className={styles.groupCard}>
        <img src={Fidan} alt="Fidan" className={styles.mentorImg} />
        <h3 className={styles.mentorName}>Fidan Abbaslı</h3>
        <p className={styles.country}>🇩🇪</p>
        <p className={styles.status}>Yasam</p>
      </div>
      <div className={styles.groupCard}>
        <img src={Vuqar} alt="Vuqar" className={styles.mentorImg} />
        <h3 className={styles.mentorName}>Vugar Aghayev</h3>
        <p className={styles.country}>🇩🇪</p>
        <p className={styles.status}>Yasam</p>
      </div>
    </div>
  );
};

export default MentorsCard;
