// components/Events/Events.jsx
import React, { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../Layout/Header/Header";
import Hero from "../../mentor/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import Germany from "../../ui/countries/Germany";
import Emil from "../../../assets/img/Emil.svg";
import Polsa from "../../ui/countries/Polsa";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import MentorsCard from "../../ui/MentorsCard/MentorsCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const mentorData = [
  {
    id: 1,
    name: "Emil Cahangirli",
    flag: <Germany />,
    country: "Almaniya", // Bayraqa əsasən ölkə adını əlavə etmək
    detail: "Yaşam",
    desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
    image: Emil,
    category: "KARYERA",
  },
  {
    id: 2,
    name: "Fidan Abbaslı",
    flag: <Polsa />,
    country: "Polşa", // Bayraqa əsasən ölkə adını əlavə etmək
    detail: "Təhsil",
    desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
    image: Fidan,
    category: "KARYERA",
  },
  {
    id: 3,
    name: "Rahman Gasımlı",
    flag: <Polsa />,
    country: "Polşa", // Bayraqa əsasən ölkə adını əlavə etmək
    detail: "Yaşam",
    desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
    image: Vuqar,
    category: "TƏHSİL",
  },
  {
    id: 4,
    name: "Fidan Abbaslı",
    flag: <Germany />,
    country: "Almaniya", // Bayraqa əsasən ölkə adını əlavə etmək
    detail: "Yaşam",
    desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
    image: Fidan,
    category: "TƏHSİL",
  },
  {
    id: 5,
    name: "Emil Cahangirli",
    flag: <Germany />,
    country: "Almaniya", // Bayraqa əsasən ölkə adını əlavə etmək
    detail: "Yaşam",
    desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
    image: Emil,
    category: "YAŞAM",
  },
  {
    id: 6,
    name: "Rahman Gasımlı",
    flag: <Polsa />,
    country: "Polşa", // Bayraqa əsasən ölkə adını əlavə etmək
    detail: "Yaşam",
    desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
    image: Vuqar,
    category: "YAŞAM",
  },
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
const categoryTranslations = {
  YAŞAM: "Yaşam",
  TƏHSİL: "Təhsil",
  KARYERA: "Karyera",
  LIFE: "Yaşam",
  EDUCATION: "Təhsil",
  CAREER: "Karyera",
};
const mentorCategory = [
  { id: "LIFE", label: "Yaşam" },
  { id: "EDUCATION", label: "Təhsil" },
  { id: "CAREER", label: "Karyera" },
];

const Mentors = () => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [inputMentorsTitle, setInputMentorsTitle] = useState("");
  const [inputMentorsCountry, setInputMentorsCountry] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedCategory, setSelectedCategory] = useState([]);

  console.log(filteredMentors);

  useEffect(() => {
    fetchMentors();
  }, []);
  useEffect(() => {
    if (inputMentorsTitle || inputMentorsCountry) {
      filterMentors();
    } else {
      setFilteredMentors(mentors);
    }
  }, [inputMentorsTitle, inputMentorsCountry, mentors]);
  const filterMentors = (
    country = inputMentorsCountry,
    name = inputMentorsTitle
  ) => {
    const result = mentors.filter((mentor) => {
      const matchesName = name
        ? mentor.fullName?.toLowerCase().startsWith(name.toLowerCase()) ||
          mentor.fullName?.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesCountry = country
        ? mentor.country?.toLowerCase().startsWith(country.toLowerCase()) ||
          mentor.country?.toLowerCase().includes(country.toLowerCase())
        : true;
      return matchesName && matchesCountry;
    });
    setFilteredMentors(result);
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevSelected) => {
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      filterMentors(inputMentorsCountry, inputMentorsTitle); // Call filterMentors after updating categories
      return newSelected;
    });
  };

  const eventCountryChange = (e) => {
    const value = e.target.value;
    setInputMentorsCountry(value);
    const matchedCountries = countryCategory.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
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

// Utility function to build URL with categories as query parameters
const buildUrlWithCategories = (baseURL, categories = []) => {
    const url = new URL(baseURL);
  
    // Append each category as a separate query parameter
    categories.forEach((category) => {
      url.searchParams.append("category", category);
    });
  
    return url.toString();
  };
  
  // Modified fetchMentors function
  const fetchMentors = async (categories = []) => {
    try {
      // Build the URL with selected categories
      const url = buildUrlWithCategories(
        "https://yalli-back-end.onrender.com/v1/mentors/search?page=0&size=10&sort=id",
        categories
      );
  
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
        },
      });
  
      if (response) {
        setMentors(response.data.content); // Update mentors state with the API response
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };
  
  

  return (
    <>
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
                      placeholder="Tədbir axtar"
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
                        <IoIosArrowDown onClick={() => setShowDropDown(true)} />
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
                    {filteredMentors.map((item, index) => (
                      <div key={index} className="col-md-3 col-sm-6 col-12">
                        <div className="mentor-card text-center">
                          <div className="img-block">
                            <img
                              style={{ width: "10rem" }}
                              src={`https://minio-server-4oyt.onrender.com/yalli/${item.profilePicture}`}
                              alt=""
                            />
                          </div>
                          <div className="text-con">
                            <h5>{item.fullName}</h5>
                            <p>{item.country}</p>
                            <p>
                              {categoryTranslations[item.mentorCategory]
                                ? categoryTranslations[item.mentorCategory]
                                : "N/A"}
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
