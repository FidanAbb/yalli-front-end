import React from "react";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";

const countryCategory = [
  "Polşa",
  "Almaniya",
  "Amerika",
  "Kanada",
  "Avstraliya",
  "İngiltərə",
  "Fransa",
  "İspaniya",
  "İtaliya",
  "Çin",
  "Hindistan",
  "Rusiya",
  "Qazaxıstan",
];

const PageSideBar = ({ categoryData, page, setSearchedItem }) => {
  return (
    <div className={styles["sidebar"]}>
      <input
        type="text"
        name=""
        id=""
        placeholder={`${
          page === "member" || page === "mentor"
            ? "Ad və Soyad"
            : page == "event"
            ? "Tədbir axtar"
            : "Qrup axtar"
        }`}
        onChange={(e) => setSearchedItem(e.target.value)}
      />

      <div className={styles["country_select"]}>
        <div className={styles["country_text"]}>Ölkə</div>
        <select name="" id="">
          {countryCategory.map((c) => (
            <option value="">{c}</option>
          ))}
        </select>
        <div className={styles["down_arrow"]}>
          <DownArrow />
        </div>
      </div>
      {page !== "member" && (
        <p className={styles["category_text"]}>Kateqoriyalar</p>
      )}

      <div className={styles["categories"]}>
        {categoryData &&
          page !== "member" &&
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
