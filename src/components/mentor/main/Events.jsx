import { useContext, useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import { useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Hero from "../../event/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import axios from "axios";
import defaultEventImg from "../../../../src/assets/img/kitchen.svg";
import {
  IoBookmarkOutline,
  IoBookmarkSharp,
  IoSearchOutline,
} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { YalliContext } from "../../../Context/YalliContext";
const eventCategories = [
  { id: "POPULAR", label: "Populyar" },
  { id: "EXPIRED", label: "Keçmiş" },
  { id: "SOON", label: "Yaxınlaşan" },
  { id: "SAVED", label: "Yadda saxlanılan" },
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const weekdays = [
    "Bazar",
    "Bazar ertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə",
  ];
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avqust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${weekday}, ${day} ${month}`;
};

const Events = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [events, setEvents] = useState([]);
  const [inputEventsTitle, setInputEventsTitle] = useState("");
  const [inputEventsCountry, setInputEventsCountry] = useState("");
  const [accessTokenLocal, setAccessTokenLocal] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isEventSaved, setIsEventSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const {userID}=useContext(YalliContext)
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessTokenLocal(accessToken);
    }
    fetchEvents();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevSelected) => {
      // Toggle the category in the selection
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId) // Remove if already selected
        : [...prevSelected, categoryId]; // Add if not selected

      // Fetch events with the updated categories
      fetchEvents(newSelected);

      return newSelected;
    });
  };
  const buildUrlWithCategories = (baseURL, categories = []) => {
    const url = new URL(baseURL);

    // Add each category as a separate query parameter
    categories.forEach((category) => {
      url.searchParams.append("category", category);
    });

    return url.toString();
  };
  const fetchEvents = async (categories = []) => {
    try {
      const url = buildUrlWithCategories(
        "https://yalli-back-end.onrender.com/v1/events",
        categories
      );

      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessTokenLocal}`,
        },
        params: {
          title: "",
          country: "",
        },
      });
      if (response) {
        console.log(response );
        setEvents(response?.data?.content);
      }
    } catch (error) {
      console.log("Error fetching events:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("General error:", error.message);
      }
    }
  };

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

  useEffect(() => {
    if (inputEventsTitle || inputEventsCountry) {
      filterEvent();
    } else {
      setFilteredEvents(events);
    }
  }, [inputEventsTitle, inputEventsCountry, events]);

  const saveEvent = async (eventId, userId) => {
    try {
      const response = await axios.patch(
        "https://yalli-back-end.onrender.com/v1/events/saveEvent",
        {
          id: eventId,
          userId: userId,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessTokenLocal}`,
          },
        }
      );
      if (response.status === 200) {
        setFilteredEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, isSaved: true } : event
          )
        );

        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, isSaved: true } : event
          )
        );
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const unsaveEvent = async (eventId, userId) => {
    try {
      const response = await axios.patch(
        "https://yalli-back-end.onrender.com/v1/events/unsaveEvent",
        {
          id: eventId,
          userId: userId,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessTokenLocal}`,
          },
        }
      );
  
      if (response.status === 200) {
        setFilteredEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, isSaved: false } : event
          )
        );
  
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, isSaved: false } : event
          )
        );
      }
    } catch (error) {
      console.error("Error unsaving event:", error);
    }
  };
  const savedEventChange = (eventId, userId) => {
    const eventToToggle = filteredEvents.find((event) => event.id === eventId);
  
    if (eventToToggle) {
      if (eventToToggle.isSaved) {
        unsaveEvent(eventId, userId); 
      } else {
        saveEvent(eventId, userId);
      }
    }
  };
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
                <p className="category-text">Kateqoriyalar</p>
                <div className="category-list">
                  {eventCategories.map((category) => (
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
                        backgroundColor: selectedCategory.includes(category.id)
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
              <div>
                <div className="row g-2">
                  {filteredEvents.map((event, index) => (
                    <div key={index} className="col-md-4 col-sm-12 col-12">
                      <div className="event-card">
                        <div className="img-block">
                          <img
                            src={
                              `https://minio-server-4oyt.onrender.com/yalli/${event.imageId}` ||
                              defaultEventImg
                            }
                            alt=""
                          />
                          <div
                            className="saved-icon"
                            onClick={() => savedEventChange(event.id, userID)}
                          >
                            {event.isSaved ? (
                              <IoBookmarkSharp />
                            ) : (
                              <IoBookmarkOutline />
                            )}
                          </div>
                        </div>
                        <div>
                          <p>{formatDate(event.date)}</p>
                          <p className="event-title">{event.title}</p>
                          <p>
                            <CiLocationOn />
                            {event.country}
                          </p>
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
