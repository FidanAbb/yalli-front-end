import React from "react";
import styles from "./style.module.scss";
const PageSideBar = ({categoryData }) => {
  return (
    <div className={styles["sidebar"]}>
      <input type="text" name="" id="" placeholder="Ad və Soyad" />
      <select name="" id="">
        <option value=""></option>
        <option value=""></option>
      </select>

      <p className={styles["category_text"]}>Kateqoriyalar</p>

      <div className={styles["categories"]}>
        {categoryData
          && categoryData.map((m) => (
              <div className={styles["category"]}>
                <p>{m}</p>
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default PageSideBar;
