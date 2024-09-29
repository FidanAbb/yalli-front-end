import React from "react";
import styles from "./style.module.scss";
// import { FaArrowRightLong } from "react-icons/fa6";
import heroBackk from "../../../assets/img/heroBackk.svg";
import Arrow from "../../ui/Arrow"
const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>
          <p className={styles.first}>
            World <br /> Azerbaijanis Hub<br /> 
          </p>
          <p className={styles.second}>
            Birləşmək başlanğıcdır, birliyi davam <br /> etdirmək inkişaf,
            birlikdə işləmək isə <br /> müvəffəqiyyətdir!
          </p>
        </div>
        <button className={styles.button}>
          <p className={styles.btnText}>Bizə qoşul</p>
          {/* <FaArrowRightLong className={styles.arrow} /> */}
         <div className={styles["btn_arrow"]}>
         <Arrow color="#fff"/>
         </div>
        </button>
      </div>

      <div className={styles.right}>
        <img src={heroBackk} alt="" className={styles.heroback} />
      </div>

    </div>
  );
};

export default Hero;
