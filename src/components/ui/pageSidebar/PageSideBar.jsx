import React, { useState } from "react";
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
  const [activeCategory, setActiveCategory] = useState(null);
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
        {/* <div className={styles["country_text"]}>Ölkə</div> */}
        {/* <select name="" id="">
          <option value="" disabled selected hidden>
            Ölkə
          </option>
          {countryCategory.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select> */}

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
                activeCategory === i ? styles["active"] : ""
              }`}
              onClick={() => setActiveCategory(i)}
            >
              <p>{m}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PageSideBar;
