import React, { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../Layout/Header/Header";
import Hero from "../../event/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import { getEventData } from "../../../redux/slice/event/event";
import Meal from "../../../assets/img/meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import axios from "axios";
import defaultEventImg from "../../../../src/assets/img/kitchen.svg";
import {
  IoBookmarkOutline,
  IoBookmarkSharp,
  IoSearchOutline,
} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const weekdays = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"
  ];
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${weekday}, ${day} ${month}`;
};
const Events = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [inputEventsTitle, setInputEventsTitle] = useState("");
  const [inputEventsCountry, setInputEventsCountry] = useState("");
  const [accessTokenLocal, setAccessTokenLocal] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [eventSaved, setEventSaved] = useState(false);
  console.log(events);
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessTokenLocal(accessToken);
    }
    fetchEvents();
  }, []);
  const eventCategory = [
    { EXPIRED: "Keçmiş" },
    { SOON: "Yaxınlaşan" },
    { POPULAR: "Populyar" },
    { SAVED: "Yadda saxlanılan" },
  ];
  const eventTitleChange = (e) => {
    setInputEventsTitle(e.target.value);
  };
  const eventCountryChange = (e) => {
    const value = e.target.value;
    setInputEventsCountry(value);
    const matchedCountries = countryCategory.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
    setSelectedCountry(matchedCountries);
    setShowDropDown(true);
  };
  const filterEvent = (
    country = inputEventsCountry,
    name = inputEventsTitle
  ) => {
    const result = events.filter((event) => {
      const matchesName = name
        ? event.title?.toLowerCase().startsWith(name.toLowerCase()) ||
          event.title?.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesCountry = country
        ? event.country?.toLowerCase().startsWith(country.toLowerCase()) ||
          event.country?.toLowerCase().includes(country.toLowerCase())
        : true;
      return matchesName && matchesCountry;
    });
    setFilteredEvents(result);
  };
  const handleCountrySelect = (country) => {
    setInputEventsCountry(country);
    setShowDropDown(false);
    filterEvent(country, inputEventsTitle);
  };
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://yalli-back-end.onrender.com/v1/events",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessTokenLocal}`,
          },
          params: {
            title: "",
            country: "",
            category: "",
          },
        }
      );
      if (response) {
        console.log(response);
        
        setEvents(response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (inputEventsTitle || inputEventsCountry) {
      filterEvent();
    } else {
      setFilteredEvents(events);
    }
  }, [inputEventsTitle, inputEventsCountry, events]);
  return (
    <>
      <Header />
      <Hero />
      <div className="events-page">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-12 col-12">
              <div className="event-left">
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
                      value={inputEventsCountry}
                      onChange={(e) => eventCountryChange(e)}
                      onFocus={() => setShowDropDown(true)}
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
                          style={{ padding: "8px", cursor: "pointer" }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-12 col-12">
              <div>
                <div className="row g-2">
                  {filteredEvents.map((event, index) => (
                    <div key={index} className="col-md-4 col-sm-12 col-12">
                      <div className="event-card">
                        <div className="img-block">
                          <img
                            src={
                              `https://minio-server-4oyt.onrender.com/yalli/${event.imageId}` ||
                              `${defaultEventImg}`
                            }
                            alt=""
                          />
                          <div
                            className="saved-icon"
                            onClick={() => setEventSaved(!eventSaved)}
                          >
                            {eventSaved ? (
                              <IoBookmarkSharp />
                            ) : (
                              <IoBookmarkOutline />
                            )}
                          </div>
                        </div>
                        <div>
                        <p>{formatDate(event.date)}</p>
                          <p className="event-title">{event.title}</p>
                          <p><CiLocationOn />{event.country}</p>
                        </div>
                        <div className="more-info">
                          <p>Daha Ətraflı</p>
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
      <Footer />
    </>
  );
};

export default Events;
