import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./style.module.scss";
import heroBackk from "../../../assets/img/heroBackk.svg";
import Arrow from "../../ui/Arrow";
import DownArrow from "../../ui/DownArrow";
import HeroLeftCircle from "../../ui/HeroLeftCircle";
import HeroRightCircle from "../../ui/HeroRightCircle";
import EarthIcon from "../../ui/EarthIcon";
import { useNavigate } from "react-router-dom";
import { YalliContext } from "../../../Context/YalliContext";
const texts = [
  "Ölkəni seç, orada yaşayan azərbaycanlılarla asanlıqla tanış ol!",
];
const countryCategory = [
  "Azərbaycan",
  "Türkiyə",
  "Rusiya",
  "Almaniya",
  "ABŞ",
  "Ukrayna",
  "Böyük Britaniya",
  "Kanada",
  "Fransa",
  "İsrail",
  "Gürcüstan",
  "İtaliya",
  "Avstraliya",
  "İspaniya",
  "Niderland",
  "Avstriya",
  "İsveç",
  "Belçika",
  "Norveç",
  "Finlandiya",
  "Macarıstan",
  "Polşa",
  "Yunanıstan",
  "Slovakiya",
  "Litva",
  "Latviya",
  "Estoniya",
  "Qazaxıstan",
  "BƏƏ",
  "Yaponiya",
  "İran",
  "Səudiyyə Ərəbistanı",
  "Belarus",
  "Moldova",
  "Qırğızıstan",
  "Tacikistan",
  "Türkmənistan",
  "Özbəkistan",
  "Malayziya",
  "Sinqapur",
  "Braziliya",
  "Argentina",
  "Meksika",
  "Vietnam",
  "Bali (İndoneziya)",
  "İsveçrə",
  "Portuqaliya",
  "Cənubi Koreya",
];

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [searchedItem, setSearchedItem] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryCategory);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const { setClickCountryToMembers } = useContext(YalliContext);
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchedItem(value);
    localStorage.setItem("searchedCountry", JSON.stringify(value));

    const filtered = countryCategory.filter((country) =>
      country.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };
  const currentTextIndexRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentTextIndexRef.current =
        currentTextIndexRef.current === texts.length - 1
          ? 0
          : currentTextIndexRef.current + 1;
      setCurrentTextIndex(currentTextIndexRef.current); // Only updates when needed
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles["hero"]}>
      <div className={styles["hero_left_circle"]}>
        <HeroLeftCircle />
      </div>
      <div className={styles["hero_right_circle"]}>
        <HeroRightCircle />
      </div>

      <div className="my-container">
        <div className={styles["heroside"]}>
          <h1>World Azerbaijanis Hub</h1>
          <p>
            Birləşmək başlanğıcdır, birliyi davam etdirmək inkişaf, birlikdə
            işləmək isə müvəffəqiyyətdir!
          </p>

          <div className={styles["find_box"]}>
            <h2>Yaşadığın ölkədə yerlilərini tap</h2>
            <div className={styles["find_inp"]}>
              {searchedItem === "" && !showOptions && (
                <div className={styles["texts"]}>
                  <p>{texts[currentTextIndex]}</p>
                </div>
              )}
              <div className={styles["earthicon"]}>
                <EarthIcon />
              </div>
              <input
                type="text"
                name=""
                id=""
                className={styles["select"]}
                placeholder=""
                value={searchedItem}
                onChange={handleInputChange}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 200)}
              />
              {showOptions && (
                <div className={styles["options"]}>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, i) => (
                      <div
                        key={i}
                        className={styles["p"]}
                        onMouseDown={() => {
                          navigate("/members");
                          setSearchedItem(country);
                          setClickCountryToMembers(country);
                          setShowOptions(false);
                        }}
                      >
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className={styles["p"]}>Heç bir ölkə tapılmadı</div>
                  )}
                </div>
              )}

              <div className={styles["down_arrow"]}>
                <DownArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
