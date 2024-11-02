import React from "react";
import styles from "./style.module.scss";
const About = ({group}) => {
  return (
    <div className={styles["about"]}>
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
