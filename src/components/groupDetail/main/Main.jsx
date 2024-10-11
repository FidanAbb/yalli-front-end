import React, { useState } from "react";
import About from "../about/About";
import Galery from "../galery/Galery";
import styles from "./style.module.scss";
const Main = ({group}) => {
  const [isActive, setIsActive] = useState(0);

  return (
    <div className={styles["main"]}>
      <div className="container">
        <div className={styles["main"]}>
          <div className={styles["texts"]}>
            <p
              className={styles[`${isActive == 0 ? "isActive" : ""}`]}
              onClick={() => setIsActive(0)}
            >
              Haqqımızda
            </p>
            <p
              className={styles[`${isActive == 1 ? "isActive" : ""}`]}
              onClick={() => setIsActive(1)}
            >
              Qalereya
            </p>
          </div>
          <div className={styles["down"]}>
            {isActive == 0 ? <About group={group}/> : <Galery group={group}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
