import React from "react";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";
const PageSideBar = ({ categoryData, page }) => {
  return (
    <div className={styles["sidebar"]}>
      <input
        type="text"
        name=""
        id=""
        placeholder={`${
          page === "member" || page === "mentor"
            ? "Ad və Soyad"
            : page == "event" ? "Tədbir axtar" : "Qrup axtar"
        }`}
      />

      <div className={styles["country_select"]}>
        <div className={styles["country_text"]}>
        Ölkə
        </div>
        <select name="" id="">
          <option value=""></option>
          <option value="">ENG</option>
        </select>
        <div className={styles["down_arrow"]}>
          <DownArrow />
        </div>
      </div>

      <p className={styles["category_text"]}>Kateqoriyalar</p>

      <div className={styles["categories"]}>
        {categoryData &&
          categoryData.map((m) => (
            <div className={styles["category"]}>
              <p>{m}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PageSideBar;
