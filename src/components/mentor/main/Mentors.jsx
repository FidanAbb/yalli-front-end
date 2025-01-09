// components/Events/Events.jsx
import React, { useContext, useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/Header/Header";
import Hero from "../../mentor/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { YalliContext } from "../../../Context/YalliContext";
import FetchCountries from "../../Countrys/FetchCountryCodes";
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
const categoryTranslations = {
  LIFE: "Yaşam",
  EDUCATION: "Təhsil",
  CAREER: "Karyera",
};
const categoryTranslationsTwo = {
  YAŞAM: "Yaşam",
  TƏHSİL: "Təhsil",
  KARYERA: "Karyera",
  LIFE: "Yaşam",
  EDUCATION: "Təhsil",
  CAREER: "Karyera",
};

const countryTranslations = {
  Almanya: "Almaniya",
  Azerbaijan: "Azərbaycan",
  Turkey: "Türkiyə",
  Russia: "Rusiya",
  Germany: "Almaniya",
  "United States": "ABŞ",
  Ukraine: "Ukrayna",
  "United Kingdom": "Böyük Britaniya",
  Canada: "Kanada",
  France: "Fransa",
  Israel: "İsrail",
  Georgia: "Gürcüstan",
  Italy: "İtaliya",
  Australia: "Avstraliya",
  Spain: "İspaniya",
  Netherlands: "Niderland",
  Austria: "Avstriya",
  Sweden: "İsveç",
  Belgium: "Belçika",
  Norway: "Norveç",
  Finland: "Finlandiya",
  Hungary: "Macarıstan",
  Poland: "Polşa",
  Greece: "Yunanıstan",
  Slovakia: "Slovakiya",
  Lithuania: "Litva",
  Latvia: "Latviya",
  Estonia: "Estoniya",
  Kazakhstan: "Qazaxıstan",
  "United Arab Emirates": "Birləşmiş Ərəb Əmirlikləri",
  Japan: "Yaponiya",
  Iran: "İran",
  "Saudi Arabia": "Səudiyyə Ərəbistanı",
  Belarus: "Belarus",
  Moldova: "Moldova",
  Kyrgyzstan: "Qırğızıstan",
  Tajikistan: "Tacikistan",
  Turkmenistan: "Türkmənistan",
  Uzbekistan: "Özbəkistan",
  Malaysia: "Malayziya",
  Singapore: "Sinqapur",
  Brazil: "Braziliya",
  Argentina: "Argentina",
  Mexico: "Meksika",
  Vietnam: "Vietnam",
  "Bali (Indonesia)": "Bali (İndoneziya)",
  Switzerland: "İsveçrə",
  Portugal: "Portuqaliya",
  "South Korea": "Cənubi Koreya",
};
const mentorCategory = [
  { id: "YAŞAM", label: "Yaşam" },
  { id: "TƏHSİL", label: "Təhsil" },
  { id: "KARYERA", label: "Karyera" },
];
const Mentors = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [inputMentorsTitle, setInputMentorsTitle] = useState("");
  const [inputMentorsCountry, setInputMentorsCountry] = useState("");
  const [inputCountryState, setInputCountryState] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { countries } = useContext(YalliContext);
  console.log(selectedCategory);

  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);
  const [localMentorFlags, setLocalMentorFlags] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    const localMentorsFlag = localStorage.getItem("mentorFlags");
    if(localMentorsFlag){
      setLocalMentorFlags(JSON.parse(localMentorsFlag));
    }
      
  }, [mentors]);
  useEffect(() => {
    if (inputCountryState !== selectedCountry) {
      setSelectedCountry("");
    }
  }, [selectedCountry, inputCountryState]);
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMentors([]);
  }, [inputMentorsTitle, selectedCountry, activeCategories]);

  const handleCategorySelect = (key) => {
    const isActive = activeCategories.includes(key);
    const updatedCategories = isActive
      ? activeCategories.filter((category) => category !== key)
      : [...activeCategories, key];

    setActiveCategories(updatedCategories);
  };

  const eventCountryChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputCountryState(value);
  };
  const handleCountrySelect = (country) => {
    setInputCountryState(country);
    setSelectedCountry(country);
    setShowDropDown(false);
  };
  const eventTitleChange = (e) => {
    setInputMentorsTitle(e.target.value);
  };
  const fetchMentors = async () => {
    try {
      const response = await axios.get(
        "https://yalli-back-end-7v7d.onrender.com/v1/mentors/search",
        {
          headers: {
            Accept: "application/json",
          },
          params: {
            page: 0,
            size: 100,
            fullName: inputMentorsTitle,
            country: selectedCountry,
            category:activeCategories.join(","),
          },
        }
      );
console.log(response);

      if (response) {
        console.log("Fetched Data:", response.data.content);
        setMentors(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
      }
    }
  };

  const findMentorFlag = (mentorFullName) => {
    if (localMentorFlags) {
      const filter = localMentorFlags.find(
        (item) => item.mentorName === mentorFullName
      );
      return filter;
    }
  };
  return (
    <>
      {/* {console.log(forServerError)} */}
      <Header />
      <Hero />
      <div className="mentor-page">
        <div className="container">
          <div className="mentor-con">
            <div className="row">
              <div className="col-md-3 col-sm-12 col-12">
                <div className="mentor-left">
                  <div className="name-input">
                    <FiSearch  className="icon" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Ad və Soyad"
                      onChange={(e) => eventTitleChange(e)}
                    />
                  </div>
                  <div className="country-con">
                    <div className="country-input">
                      <input
                        name="country"
                        type="text"
                        placeholder="Ölkə"
                        value={inputCountryState}
                        onChange={eventCountryChange}
                        onFocus={() => {
                          setShowDropDown(true);
                          if (inputMentorsCountry.trim() === "") {
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
                            if (inputMentorsCountry.trim() === "") {
                              setSelectedCountry(countryCategory);
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
                              .includes(inputCountryState.toLowerCase())
                          )
                          .map((country, index) => (
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
                  <div className="category-list">
                    {Object.entries(categoryTranslations).map(
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
              <div className="col-md-9 col-sm-12 col-12">
                <div className="mentor-right">
                  <div className="row">
                    {mentors.length<=0?<p>Bu məlumat tapılmadı!</p>:mentors.map((item, index) => (
                      <div key={index} className="col-md-4 col-sm-6 col-12">
                        <div
                          onClick={() => {
                            navigate(`/mentor/${item.id}`);
                          }}
                          className="mentor-card text-center"
                        >
                          <div className="img-block">
                            <img
                              src={`https://yalli-back-end-7v7d.onrender.com/v1/files/${item.profilePicture}`}
                              alt={`${item.fullName} profile`}
                              style={{ width: "100%", height: "auto" }} // Mentorun şəkli
                            />
                          </div>
                          <div className="text-con">
                            <h5>{item.fullName}</h5>
                            <p>
                              <img
                                src={findMentorFlag(item.fullName)?.flag || "#"}
                                alt={`${item.country} flag`}
                                style={{ width: "2rem", height: "auto" }} // Bayraq genişliyi
                              />
                              <FetchCountries />
                            </p>
                            <p>
                              {categoryTranslationsTwo[item.mentorCategory] ||
                                "N/A"}
                            </p>
                            {/* Translated category */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mentors;
