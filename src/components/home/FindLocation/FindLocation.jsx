import React from "react";
import styles from "./style.module.scss";
// import { TfiWorld } from "react-icons/tfi";
import EarthIcon from "../../ui/EarthIcon"
const FindLocation = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Yaşadığın yerdə yerlilərini tap</p>
      <div className={styles.searchBox}>
        <div className={styles.icon}>
          {/* <TfiWorld /> */}
          <EarthIcon/>

        </div>
        <select className={styles.dropdown}>
          <option value=""></option>
          <option value="germany">Almaniya</option>
          <option value="usa">Amerika</option>
          <option value="poland">Polşa</option>
        </select>
      </div>
    </div>
  );
};

export default FindLocation;
