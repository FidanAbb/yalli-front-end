import React, { useEffect, useState, useContext } from "react";
import Card from "../../ui/card/Card";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import { getGroupData } from "../../../redux/slice/group/group";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../../group/hero/Hero";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
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

const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const loading = useSelector((state) => state.groups.loading);
  const [searchedItem, setSearchedItem] = useState("");
  const [showAllPages, setShowAllPages] = useState(false);
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);
  const location = useLocation();
  const [activeCategories, setActiveCategories] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [inputTitleState, setInputTitleState] = useState("");
  const [inputCountryState, setInputCountryState] = useState("");
  const [filteredData, setFilteredData] = useState(groups.content);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    filterData(inputCountryState, inputTitleState); // Məlumatları filtr et
  }, [activeCategories, inputCountryState, inputTitleState]);

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const allGroups = [];
        const totalPages = Math.ceil(groups.totalElements / 18);
        
        for (let i = 0; i < totalPages; i++) {
          const response = await dispatch(getGroupData({ page: i, size: 18 }));
          allGroups.push(...response.payload.content);
        }
        
        filterData(inputCountryState, inputTitleState, allGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
  
    fetchAllGroups();
  }, [dispatch, inputCountryState, inputTitleState]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);

  useEffect(() => {
    if (searchedItem) {
      dispatch(getGroupData({ page: 0, size: groups.totalElements || 1000 }));
    } else {
      dispatch(getGroupData({ page, size: 18 }));
    }
  }, [dispatch, searchedItem]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(getGroupData({ page: newPage, size: 18 })); // API çağırışı
  };
  useEffect(() => {
    if (inputTitleState || inputCountryState) {
      filterData();
    } else {
      setFilteredData(groups.content);
    }
  }, [inputTitleState, inputCountryState, groups.content]);

  const totalPages = Math.ceil(groups.totalElements / 18);

  const groupCategory = {
    LIFE: "Yaşam",
    CAREER: "Karyera",
    EDUCATION: "Təhsil",
    ENTERTAINMENT: "Əyləncə",
    TRAVEL: "Səyahət",
    LOCATION: "Yerləşmə",
    LAW: "Qanunlar",
    INNOVATION: "İnnovasiya",
    TECHNOLOGY: "Texnologiya",
    OTHER: "Digər",
  };

  const titleChangeInput = (e) => {
    setInputTitleState(e.target.value);
  };

  const countryChange = (e) => {
    const value = e.target.value;
    setInputCountryState(value);
    const matchedCountries = countryCategory.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
    setSelectedCountry(matchedCountries);
    setShowDropDown(true);
  };

  const handleCountrySelect = (country) => {
    setInputCountryState(country);
    setShowDropDown(false);
    filterData(country, inputTitleState);
  };

  const filterData = (country = inputCountryState, name = inputTitleState, allGroups = groups.content) => {
    if (!allGroups) return; // Əgər allGroups undefined və ya null-dursa, funksiyanı dayandır
  
    const result = allGroups.filter((group) => {
      const matchesName = name
        ? group.title?.toLowerCase().startsWith(name.toLowerCase()) || 
          group.title?.toLowerCase().includes(name.toLowerCase())
        : true;
  
      const matchesCountry = country
        ? group.country?.toLowerCase().startsWith(country.toLowerCase()) || 
          group.country?.toLowerCase().includes(country.toLowerCase())
        : true;
  
      const matchesCategory =
        activeCategories.length > 0
          ? activeCategories.some((cat) =>
              Array.isArray(group.groupCategory)
                ? group.groupCategory.includes(cat)
                : group.groupCategory === cat
            )
          : true;
  
      return matchesName && matchesCountry && matchesCategory;
    });
    setFilteredData(result);
  };
  

  const handleCategorySelect = (key) => {
    const isActive = activeCategories.includes(key);
    const updatedCategories = isActive
      ? activeCategories.filter((category) => category !== key) // Seçilmiş kateqoriyanı çıxar
      : [...activeCategories, key]; // Yeni kateqoriyanı əlavə et

    setActiveCategories(updatedCategories);
    filterData(inputCountryState, inputTitleState); // Məlumatları yenilə
  };

  return (
    <>
      {console.log(forServerError)}
      <Header />
      <Hero />
      <div className={styles["main"]}>
        <div className="container">
          <div className={styles["main"]}>
            <div className={styles["sidebar"]}>
              <div className="group-left">
                <div className="name-input">
                  <FiSearch className="icon" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Qrupu axtar"
                    onChange={(e) => titleChangeInput(e)}
                  />
                </div>
                <div className="country-con">
                  <div className="country-input">
                    <input
                      name="country"
                      type="text"
                      placeholder="Ölkə"
                      value={inputCountryState}
                      onChange={countryChange}
                      onFocus={() => {
                        setShowDropDown(true);
                        if (inputCountryState.trim() === "") {
                          setSelectedCountry(countryCategory);
                        }
                      }}
                      onBlur={() =>
                        setTimeout(() => setShowDropDown(false), 200)
                      }
                    />
                    {showDropDown ? (
                      <IoIosArrowUp onClick={() => setShowDropDown(false)} />
                    ) : (
                      <IoIosArrowDown
                        onClick={() => {
                          setShowDropDown(true);
                          if (inputCountryState.trim() === "") {
                            setSelectedCountry(countryCategory);
                          }
                        }}
                      />
                    )}
                  </div>
                  {showDropDown && (
                    <div className="dropdown-list">
                      {selectedCountry.map((country, index) => (
                        <div
                          key={index}
                          onClick={() => handleCountrySelect(country)}
                          onMouseDown={(e) => e.preventDefault()}
                          style={{ padding: "8px", cursor: "pointer" }}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="category-con">
                  <p className="category-text">Kateqoriyalar</p>
                  <div className="category-list">
                    {Object.entries(groupCategory).map(
                      ([key, value], index) => {
                        const isActive = activeCategories.includes(key);
                        return (
                          <button
                            key={index}
                            onClick={() => handleCategorySelect(key)}
                            className={isActive?"category-btn active":"category-btn"}
                          >
                            {value}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["cards"]}>
              {loading ? (
                <p>Loading...</p>
              ) : filteredData && filteredData.length === 0 ? (
                // Əgər filteredData boşdursa
                <p>Heç bir icma tapılmadı.</p>
              ) : (
                filteredData?.map((group, i) => (
                  <div
                    className={styles["group-cards-con"]}
                    key={i}
                    onClick={() => navigate(`/qrup/${group.id}`)}
                  >
                    <Card sectionName="group" group={group} />
                  </div>
                ))
              )}
            </div>
          </div>
          {activeCategories.length === 0 && (
            <div className="text-center pagination-con">
              {!inputTitleState &&
                !inputCountryState &&
                Array.from({ length: totalPages }, (_, index) => {
                  if (!showAllPages && index >= 5) return null; // İlk 5 düymə göstərilir
                  return (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      style={{
                        margin: "0 5px",
                        padding: "8px 12px",
                        backgroundColor: page === index ? "#FF0000" : "#fff",
                        color: page === index ? "#fff" : "#FF0000",
                        border: "1px solid #FF0000",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              {!inputTitleState &&
                !inputCountryState &&
                !showAllPages &&
                totalPages > 5 && (
                  <button
                    onClick={() => setShowAllPages(true)}
                    style={{
                      margin: "0 5px",
                      padding: "8px 12px",
                      backgroundColor: "#fff",
                      color: "#FF0000",
                      border: "1px solid #FF0000",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Daha çox
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Groups;
