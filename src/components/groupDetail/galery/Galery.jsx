import React from "react";
import HeroImg from "../../../assets/img/groupDetail.svg";
import styles from "./style.module.scss";

const cards = [1, 2, 3, 4, 5, 6, 7, 8];
const Galery = () => {
  return (
    <div className={styles["galery"]}>
      <div className="container">
        <div className={styles["galery"]}>
          <div className={styles["cards"]}>
            {cards.map((c, i) => (
              <div key={i} className={styles["card"]}>
                <img src={HeroImg} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galery;
