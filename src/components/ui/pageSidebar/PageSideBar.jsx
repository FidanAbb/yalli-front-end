import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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

const PageSideBar = ({
  categoryData,
  page,
  setSearchedItem,
  setSelectedCountry,
  setActiveCategories,
  activeCategories,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryCategory);

  const handleCountryChange = (country) => {
    setSearchItem(country);
    setSelectedCountry(country);
    localStorage.setItem("searchedCountry", JSON.stringify(country));
    setShowOptions(false);
  };

  const toggleCategory = (categoryKey) => {
    if (activeCategories?.includes(categoryKey)) {
      setActiveCategories(
        activeCategories?.filter((cat) => cat !== categoryKey)
      );
    } else {
      setActiveCategories([...activeCategories, categoryKey]);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    setSearchedItem(value);
    setFilteredCountries(
      countryCategory.filter((country) =>
        country?.toLowerCase()?.includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className={styles["sidebar"]}>
      <input
        type="text"
        placeholder={page === "qrup" ? "Qrup axtar" : "Axtar"}
        onChange={(e) => setSearchedItem(e.target.value)}
      />

      <div className={styles["country_select"]}>
        <div className={styles["select_with_icon"]}>
          <input
            type="text"
            className={styles["select"]}
            placeholder="Ölkə"
            value={searchItem}
            onChange={handleInputChange}
            onClick={() => setShowOptions(!showOptions)}
            style={{ border: "none" }}
            onBlur={() => setTimeout(() => setShowOptions(false), 300)}
          />
          {showOptions ? (
            <IoIosArrowUp
              className={styles["dropdown_icon"]}
              onClick={() => setShowOptions(false)}
            />
          ) : (
            <IoIosArrowDown
              className={styles["dropdown_icon"]}
              onClick={() => setShowOptions(true)}
            />
          )}
        </div>

        {showOptions && (
          <div className={styles["options"]}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, i) => (
                <div
                  key={i}
                  className={styles["p"]}
                  onClick={() => handleCountryChange(country)}
                >
                  {country}
                </div>
              ))
            ) : (
              <div className={styles["p"]}>Heç bir ölkə tapılmadı</div>
            )}
          </div>
        )}
      </div>

      {page !== "member" && (
        <p className={styles["category_text"]}>Kateqoriyalar</p>
      )}
      <div className={styles["categories"]}>
        {categoryData &&
          page !== "member" &&
          categoryData.map((categoryObj, i) => {
            const categoryKey = Object.keys(categoryObj)[0];
            const categoryLabel = categoryObj[categoryKey];
            return (
              <div
                key={i}
                className={`${styles["category"]} ${
                  activeCategories.includes(categoryKey) ? styles["active"] : ""
                }`}
                onClick={() => toggleCategory(categoryKey)}
              >
                <p>{categoryLabel}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PageSideBar;
