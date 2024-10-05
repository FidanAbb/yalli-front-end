import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import heroBackk from "../../../assets/img/heroBackk.svg";
import Arrow from "../../ui/Arrow";
import DownArrow from "../../ui/DownArrow";
import HeroLeftCircle from "../../ui/HeroLeftCircle";
import HeroRightCircle from "../../ui/HeroRightCircle";
import EarthIcon from "../../ui/EarthIcon";
import HeroElp from "../../ui/HeroElp";
const texts = [
  "Ölkəni seç, orada yaşayan azərbaycanlılarla asanlıqla tanış ol!",
  "Maraq dairəni və şəhəri qeyd et, müvafiq icmalarla tanış ol!",
];
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
const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(""); 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);
  const handleSelectChange = (event) => {
    setSelectedCountry(event.target.value);
  };
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
            {selectedCountry === "" && (
                <div className={styles["texts"]}>
                  <p>{texts[currentTextIndex]}</p>
                </div>
              )}
              <div className={styles["earthicon"]}>
                <EarthIcon />
              </div>

              <select
                value={selectedCountry}
                onChange={handleSelectChange} 
              >
                <option value="" disabled>
                  
                </option>
                {countryCategory.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
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
