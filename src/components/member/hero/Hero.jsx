import React from "react";
import styles from "./style.module.scss";

const Hero = () => {
  return <div className={styles["main"]}>
    <div className={styles["left"]}></div>
    <div className={styles["right"]}>Yaşadığın ölkədəki üzvlərimiz</div>

  </div>;
};

export default Hero;
