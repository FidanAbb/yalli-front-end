import React, { useState, useEffect, useRef } from "react";
import About from "../about/About";
import Galery from "../galery/Galery";
import styles from "./style.module.scss";

const Main = ({ group }) => {
  const [isActive, setIsActive] = useState(0);
  const aboutRef = useRef(null); // Haqqında bölümü üçün referans yaradır

  // Aktiv bölmə dəyişdikdə skroll funksiyasını çağırır
  useEffect(() => {
    if (isActive === 0 && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isActive]);

  return (
    <div className={styles["main"]}>
      <div className="my-container">
        <div className={styles["main"]}>
          <div className={styles["texts"]}>
            <p
              className={styles[`${isActive === 0 ? "isActive" : ""}`]}
              onClick={() => setIsActive(0)}
            >
              Haqqımızda
            </p>
            <p
              className={styles[`${isActive === 1 ? "isActive" : ""}`]}
              onClick={() => setIsActive(1)}
            >
              Qalereya
            </p>
          </div>
          <div className={styles["down"]}>
            {isActive === 0 ? (
              <div ref={aboutRef}><About group={group} /></div>
            ) : (
              <Galery group={group} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
