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
  YAŞAM: "LIFE",
  TƏHSİL: "EDUCATION",
  KARYERA: "CAREER",
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

  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const {countries} = useContext(YalliContext);

  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMentors([]);
  }, [inputMentorsTitle]);


  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevSelected) => {
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      filterMentors(inputMentorsCountry, inputMentorsTitle);
      return newSelected;
    });
  };

 

  const eventCountryChange = (e) => {
    const value = e.target.value.toLowerCase();
  
    const matchedCountries = countryCategory.filter((country) => {
      const translatedCountry =
        Object.keys(countryTranslations).find(
          (key) => countryTranslations[key]?.toLowerCase() === country.toLowerCase()
        ) || country;
  
      return (
        translatedCountry.toLowerCase().startsWith(value) ||
        translatedCountry.toLowerCase().includes(value)
      );
    });
  
    setInputMentorsCountry(value);
    setSelectedCountry(matchedCountries);
    setShowDropDown(true);
  };
  const handleCountrySelect = (country) => {
    setInputMentorsCountry(country);
    setShowDropDown(false);
    filterMentors(country, inputMentorsTitle);
  };

  const eventTitleChange = (e) => {
    setInputMentorsTitle(e.target.value);
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.get(
        "https://yalli-back-end.onrender.com/v1/mentors/search",
        {
          headers: {
            Accept: "application/json",
          },
          params: {
            page: 0,
            size: 100,
            sort: "id",
            
          },
        }
      );

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

  return (
    <>
    {console.log(forServerError)}
      <Header />
      <Hero />
      <div className="mentor-page">
        <div className="container">
          <div className="mentor-con">
            <div className="row">
              <div className="col-md-3 col-sm-12 col-12">
                <div className="mentor-left">
                  <div className="name-input">
                    <IoSearchOutline className="icon" />
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
                        value={inputMentorsCountry}
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
                        {selectedCountry.map((country, index) => (
                          <div
                            key={index}
                            onClick={() => handleCountrySelect(country)}
                            onMouseDown={(e) => e.preventDefault()}
                            style={{ padding: "8px", cursor: "pointer" }}
                          >
                            {countryTranslations[country] || country}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="category-list">
                    {mentorCategory.map((category) => (
                      <a
                        className="event-category-link"
                        key={category.id}
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handleCategorySelect(category.id);
                        }}
                        style={{
                          cursor: "pointer",
                          backgroundColor: selectedCategory.includes(
                            category.id
                          )
                            ? "#FA4500"
                            : "transparent",
                          color: selectedCategory.includes(category.id)
                            ? "#fff"
                            : "#A2A2A2",
                        }}
                      >
                        {category.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-sm-12 col-12">
                <div className="mentor-right">
                  <div className="row">
                    {mentors.map((item, index) => (
                      <div key={index} className="col-md-4 col-sm-6 col-12">
                        <div
                          onClick={() => {
                            navigate(`/mentor/${item.id}`);
                          }}
                          className="mentor-card text-center"
                        >
                          <div className="img-block">
                            <img
                              src={`https://minio-server-4oyt.onrender.com/yalli/${item.profilePicture}`}
                              alt={`${item.fullName} profile`}
                              style={{ width: "100%", height: "auto" }} // Mentorun şəkli
                            />
                          </div>
                          <div className="text-con">
                            <h5>{item.fullName}</h5>
                            <p>
                              <img
                                src={
                                  countries[index]|| "#"
                                }
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
