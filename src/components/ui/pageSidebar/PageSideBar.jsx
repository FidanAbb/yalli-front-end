import React from "react";
import styles from "./style.module.scss";
const PageSideBar = ({ mentorCategory, groupCategory, eventCategory }) => {
  return (
    <div className={styles["sidebar"]}>
      <input type="text" name="" id="" placeholder="Ad və Soyad" />
      <select name="" id="">
        <option value=""></option>
        <option value=""></option>
      </select>

      <p className={styles["category_text"]}>Kateqoriyalar</p>

      <div className={styles["categories"]}>
        {mentorCategory
          ? mentorCategory.map((m) => (
              <div className={styles["category"]}>
                <p>{m}</p>
              </div>
            ))
          : groupCategory
          ? groupCategory.map((g) => (
              <div className={styles["category"]}>
                <p>{g}</p>
              </div>
            ))
          : eventCategory
          ? eventCategory.map((e) => (
              <div className={styles["category"]}>
                <p>{e}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PageSideBar;
