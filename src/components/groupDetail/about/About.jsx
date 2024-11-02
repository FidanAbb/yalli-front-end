import React, { useContext } from "react";
import styles from "./style.module.scss";
import { YalliContext } from "../../../Context/YalliContext";
const About = ({group}) => {
  const {aboutRef}=useContext(YalliContext);
  return (
    <div ref={aboutRef} className={styles["about"]}>
      <div className="container">
        <div className={styles["about"]}>
          <div>
            {group.description}
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
