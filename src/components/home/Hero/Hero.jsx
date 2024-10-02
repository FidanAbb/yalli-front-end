import React from "react";
import styles from "./style.module.scss";
// import { FaArrowRightLong } from "react-icons/fa6";
import heroBackk from "../../../assets/img/heroBackk.svg";
import Arrow from "../../ui/Arrow";
import DownArrow from "../../ui/DownArrow";
import HeroLeftCircle from "../../ui/HeroLeftCircle";
import HeroRightCircle from "../../ui/HeroRightCircle";
import EarthIcon from "../../ui/EarthIcon";
import HeroElp from "../../ui/HeroElp";
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className={styles["hero_left_circle"]}>
        <HeroLeftCircle />
      </div>
      <div className={styles["hero_right_circle"]}>
        <HeroRightCircle />
      </div>

      <div className="container">
        <div className={styles["heroside"]}>
          <h1>World Azerbaijanis Hub</h1>
          <p>
            Birləşmək başlanğıcdır, birliyi davam etdirmək inkişaf, birlikdə
            işləmək isə müvəffəqiyyətdir!
          </p>

          <div className={styles["find_box"]}>
            <h2>Yaşadığın ölkədə yerlilərini tap</h2>
            <div className={styles["find_inp"]}>
              <EarthIcon />
              <select name="" id="">
                <option value=""></option>
                <option value="">ENG</option>
              </select>
              <div className={styles["down_arrow"]}>
                <DownArrow />
              </div>
            </div>
          </div>
          <div className={styles["ellipsis"]}>
            <HeroElp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
