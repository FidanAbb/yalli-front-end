import React from "react";
import styles from "./style.module.scss";
import MentorsCard from "../../ui/MentorsCard/MentorsCard";

const Mentors = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.mentor}>Mentorlar</p>
        <p className={styles.all}>Hamısına bax</p>
      </div>
      <MentorsCard />
    </div>
  );
};

export default Mentors;
