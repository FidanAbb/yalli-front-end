import React from "react";
import styles from "./style.module.scss";

const MentorsCard = ({ data }) => {
  return (
    <div className={styles["mentor"]}>
      <img src={data.image} alt="" />
      <h3>{data.name}</h3>
      <span>{data.flag}</span>
      <p>{data.detail}</p>
    </div>
  );
};

export default MentorsCard;
