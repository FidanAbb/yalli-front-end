import { useContext, useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useSelector } from "react-redux";
const eventCategories = [
  { id: "POPULAR", label: "Populyar" },
  { id: "EXPIRED", label: "Keçmiş" },
  { id: "UPCOMING", label: "Yaxınlaşan" },
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
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
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
  const { userID } = useContext(YalliContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessTokenLocal(accessToken);
    }
    fetchEvents();
  }, []);
  useEffect(() => {
    if (inputEventsTitle || inputEventsCountry) {
      filterEvent();
    } else {
      setFilteredEvents(events);
    }
  }, [inputEventsTitle, inputEventsCountry, events, filteredEvents]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevSelected) => {
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId];
      fetchEvents(newSelected);
      return newSelected;
    });
  };
  const buildUrlWithCategories = (baseURL, categories = []) => {
    const url = new URL(baseURL);

    categories.forEach((category) => {
      url.searchParams.append("category", category);
    });

    return url.toString();
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

  const savedEventChange = (eventId, userId) => {
    if (!userId) {
      console.error("User ID is missing. Unable to save the event.");
      return;
    }
    const eventToToggle = filteredEvents.find((event) => event.id === eventId);
    console.log(eventToToggle);

    if (eventToToggle) {
      if (eventToToggle.saved) {
        unsaveEvent(eventId, userId);
      } else {
        saveEvent(eventId, userId);
      }
    }
  };
  const saveEvent = async (eventId, userId) => {
    if (!eventId || !userId) {
      console.error("Event ID and User ID are required to save an event.");
      return;
    }

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
            "Content-Type": "application/json",
            token: localStorage.getItem("accessToken"),
          },
        }
      );

      if (response.status === 200) {
        console.log("Event saved successfully:", response.data);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, saved: true } : event
          )
        );
        setFilteredEvents((prevFilteredEvents) =>
          prevFilteredEvents.map((event) =>
            event.id === eventId ? { ...event, saved: true } : event
          )
        );
      } else {
        console.warn("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error saving event:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      }
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
          },
        }
      );

      if (response.status === 200) {
        console.log("Unsave event response:", response.data);

        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, saved: false } : event
          )
        );
        setFilteredEvents((prevFilteredEvents) =>
          prevFilteredEvents.map((event) =>
            event.id === eventId ? { ...event, saved: false } : event
          )
        );
      } else {
        console.warn("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error unsaving event:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      }
    }
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
          token: localStorage.getItem("accessToken"),
        },
        params: {
          title: "",
          country: "",
        },
      });
      if (response) {
        console.log(response);
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

  return (
    <>
      {console.log(forServerError)}
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
                      onChange={eventCountryChange}
                      onFocus={() => {
                        setShowDropDown(true);
                        if (inputEventsCountry.trim() === "") {
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
                          if (inputEventsCountry.trim() === "") {
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
              <div className="cards">
                <div className="row" >
                  {filteredEvents?.map((event, index) => (
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
                            {event.saved ? (
                              <IoBookmarkSharp className="icon" />
                            ) : (
                              <IoBookmarkOutline className="icon" />
                            )}
                          </div>
                        </div>
                        <div>
                          <p>{formatDate(event.date)}</p>
                          <p className="event-title">
                            {event.title.length > 29
                              ? `${event.title.slice(0, 28)}...`
                              : event.title}
                          </p>
                          <p>
                            <CiLocationOn />
                            {event.country}
                          </p>
                        </div>
                        <Link to={`/event/${event.id}`} className="more-info">
                          <p>Daha Ətraflı</p>
                        </Link>
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
