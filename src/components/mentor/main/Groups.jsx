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
import { YalliContext } from "../../../Context/YalliContext";
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
const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const loading = useSelector((state) => state.groups.loading);
  const [showAllPages, setShowAllPages] = useState(false);
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);
  const location = useLocation();

  const [activeCategories, setActiveCategories] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [inputTitleState, setInputTitleState] = useState("");
  const [page, setPage] = useState(0);

  const [selectCountyState, setSelectCountryState] = useState("");
  const [countyChangeInput, setCountyChangeInput] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, page]);
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    dispatch(getGroupData({ page: newPage, size: 18 }));
  };
  const totalPages = Math.ceil(groups.totalElements / 18);
  const titleChangeInput = (e) => {
    setInputTitleState(e.target.value);
  };
  
  const countryChange = (e) => {
    const value = e.target.value;
    setShowDropDown(true);
    setCountyChangeInput(value);
  };
  const handleCountrySelect = (country) => {
    setSelectCountryState(country); 
    setCountyChangeInput(country); 
    setShowDropDown(false); 
    setPage(0); 
    fetchGroupData(true); 
  };
  const fetchGroupData = (resetPage = false) => {
    const currentPage = resetPage ? 0 : page;
    dispatch(
      getGroupData({
        page: currentPage,
        size: 18,
        title: inputTitleState,
        country: selectCountyState,
        categories: activeCategories,
      })
    );
    if (resetPage) setPage(0);
  };
  useEffect(() => {
    const hasSearchCriteria =
      inputTitleState || activeCategories?.length > 0 || selectCountyState;
    fetchGroupData(hasSearchCriteria && page !== 0);
  }, [inputTitleState, activeCategories, page, selectCountyState]);
  const handleCategorySelect = (key) => {
    const isActive = activeCategories.includes(key);
    const updatedCategories = isActive
      ? activeCategories.filter((category) => category !== key)
      : [...activeCategories, key];

    setActiveCategories(updatedCategories);
  };
  console.log(groups.content);

  return (
    <>
      {/* {console.log(forServerError)} */}
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
                      onChange={countryChange}
                      value={countyChangeInput}
                      onFocus={() => {
                        setShowDropDown(true);
                        if (selectCountyState.trim() === "") {
                          setSelectCountryState(countryCategory);
                        }
                      }}
                      onBlur={(e) => {
                        const relatedTarget = e.relatedTarget; // Fokusun getdiyi element
                        const dropdownList =
                          document.querySelector(".dropdown-list");
                        if (
                          relatedTarget &&
                          dropdownList?.contains(relatedTarget)
                        ) {
                          // Drop-down-da başqa bir elementə fokuslanılıbsa, bağlama
                          return;
                        }
                        setShowDropDown(false);
                      }}
                    />
                    {showDropDown ? (
                      <IoIosArrowUp onClick={() => setShowDropDown(false)} />
                    ) : (
                      <IoIosArrowDown
                        onClick={() => {
                          setShowDropDown(true);
                          if (selectCountyState.trim() === "") {
                            setSelectCountryState(countryCategory);
                          }
                        }}
                      />
                    )}
                  </div>
                  {showDropDown && (
                    <div className="dropdown-list">
                      {countryCategory
                        .filter((country) =>
                          country
                            .toLowerCase()
                            .includes(countyChangeInput?.toLowerCase())
                        )
                        .map((country, index) => (
                          <div
                            key={index}
                            onClick={() => handleCountrySelect(country)}
                            onMouseDown={(e) => e.preventDefault()} // onBlur-un qabağını alır
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
                            className={
                              isActive ? "category-btn active" : "category-btn"
                            }
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
                <p>Yüklənir...</p>
              ) : !groups?.content || groups.content.length === 0 ? (
                <p>Heç bir icma tapılmadı.</p>
              ) : (
                groups.content.map((group, i) => (
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
          {activeCategories?.length === 0 && (
            <div className="text-center pagination-con">
              {!inputTitleState &&
                !selectCountyState &&
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
                !showAllPages &&
                selectCountyState &&
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
