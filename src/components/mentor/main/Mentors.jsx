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

const mentorCategory = [
  { id: "YAŞAM", label: "Yaşam" },
  { id: "TƏHSİL", label: "Təhsil" },
  { id: "KARYERA", label: "Karyera" },
];
const Mentors = () => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [inputMentorsTitle, setInputMentorsTitle] = useState("");
  const [inputMentorsCountry, setInputMentorsCountry] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const navigate = useNavigate();
  console.log(filteredMentors);

  useEffect(() => {
    fetchMentors([]);
  }, []);
  useEffect(() => {
    filterMentors(inputMentorsCountry, inputMentorsTitle);
  }, [inputMentorsTitle, inputMentorsCountry, selectedCategory, mentors]);

  useEffect(() => {
    setFilteredMentors(mentors);
  }, [mentors]);
  useEffect(() => {
    if (inputMentorsTitle || inputMentorsCountry) {
      filterMentors();
    } else {
      setFilteredMentors(mentors);
    }
  }, [inputMentorsTitle, inputMentorsCountry, mentors]);
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevSelected) => {
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      filterMentors(inputMentorsCountry, inputMentorsTitle);
      return newSelected;
    });
  };

  const filterMentors = (
    country = inputMentorsCountry,
    name = inputMentorsTitle
  ) => {
    console.log("Selected Category (Azerbaijani):", selectedCategory);

    // Translate selected categories from Azerbaijani to English
    const translatedCategories = selectedCategory.map((category) => {
      return categoryTranslations[category] || category;
    });
    console.log("Translated Categories (English):", translatedCategories);

    const result = mentors.filter((mentor) => {
      console.log("Mentor Category:", mentor.mentorCategory);

      const matchesName = name
        ? mentor.fullName?.toLowerCase().startsWith(name.toLowerCase()) ||
          mentor.fullName?.toLowerCase().includes(name.toLowerCase())
        : true;

      const matchesCountry = country
        ? mentor.country?.toLowerCase().startsWith(country.toLowerCase()) ||
          mentor.country?.toLowerCase().includes(country.toLowerCase())
        : true;

      // Check if mentor's category matches the translated categories
      const matchesCategory =
        translatedCategories.length > 0
          ? translatedCategories.includes(mentor.mentorCategory)
          : true;

      console.log(
        `Matches - Name: ${matchesName}, Country: ${matchesCountry}, Category: ${matchesCategory}`
      );
      return matchesName && matchesCountry && matchesCategory;
    });

    console.log("Filtered Mentors Result:", result);
    setFilteredMentors(result);
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
                              alt=""
                            />
                          </div>
                          <div className="text-con">
                            <h5>{item.fullName}</h5>
                            <p>{item.country}</p>
                            <p>
                              {categoryTranslationsTwo[item.mentorCategory]
                                ? categoryTranslationsTwo[item.mentorCategory]
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
