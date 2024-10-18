import React, { useState } from "react";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";

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
  "Cənubi Koreya"
];


const PageSideBar = ({ categoryData, page, setSearchedItem }) => {
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryCategory);
  const [showOptions, setShowOptions] = useState(false);
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchItem(value);

    const filtered = countryCategory.filter((country) =>
      country.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };

  const toggleCategory = (category) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((cat) => cat !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  };
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
        <input
          type="text"
          name=""
          id=""
          className={styles["select"]}
          placeholder="Ölkə"
          value={searchItem}
          onChange={handleInputChange}
          onClick={() => setShowOptions(!showOptions)}
          onBlur={() => setTimeout(() => setShowOptions(false), 200)}
        />

        {showOptions && (
          <div className={styles["options"]}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, i) => (
                <div
                  key={i}
                  className={styles["p"]}
                  onClick={() => {
                    setSearchItem(country);
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

        <div className={styles["down_arrow"]} onClick={() => setShowOptions(!showOptions)}>
          <DownArrow />
        </div>
      </div>
      {page !== "member" && (
        <p className={styles["category_text"]}>Kateqoriyalar</p>
      )}

      <div className={styles["categories"]}>
      {categoryData &&
          page !== "member" &&
          categoryData.map((m, i) => (
            <div
              key={i}
              className={`${styles["category"]} ${
                activeCategories.includes(m) ? styles["active"] : ""
              }`}
              onClick={() => toggleCategory(m)}
            >
              <p>{m}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PageSideBar;
