import { useRef, useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Arrow from "../../ui/Arrow";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./event.css";
import { CiLocationOn } from "react-icons/ci";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import { YalliContext } from "../../../Context/YalliContext";
const Event = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [events, setEvents] = useState([]);
  const { userID } = useContext(YalliContext);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollLeftBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scrollLeftBtn();
      } else if (e.key === "ArrowRight") {
        scrollRightBtn();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);
  const buildUrlWithCategories = (baseURL, categories = []) => {
    const url = new URL(baseURL);

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
          token: localStorage.getItem("accessToken"),
        },
        params: {
          title: "",
          country: "",
        },
      });
      if (response) {
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
  const navigate = useNavigate();
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
  const savedEventChange = (eventId, userId) => {
    const eventToToggle = events.find((event) => event.id === eventId);
    console.log(eventToToggle);

    if (eventToToggle) {
      if (eventToToggle.saved) {
        unsaveEvent(eventId, userId);
      } else {
        saveEvent(eventId, userId);
      }
    }
  };

  const text =
    "Sərhədləri aşır, xoş niyyət və sevgi ilə dünyanın fərqli nöqtələrində həmvətənlilərimizi bir araya gətiririk!";
  const speed = 50;
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      document.getElementById("animatedText").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeEffect, speed);
    }
  }

  useEffect(() => {
    typeEffect();
  }, []);

  return (
    <div className={styles["group"]}>
      <div className={events.length > 0 ? "container" : "dp-none"}>
        <div className={styles["groups"]}>
          <div className={styles["hero_text"]}>
            <h2>Tədbirlər</h2>
            <p onClick={() => navigate("/events")}>Hamısına bax</p>
          </div>
          <div className={styles["slider"]}>
            <div className={styles["left_arrow"]} onClick={scrollLeftBtn}>
              <Arrow />
            </div>
            <div
              className={styles["cards"]}
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {events.map((event, index) => (
                <div className="event-card" key={index}>
                  <div className="img-block">
                    <img
                      src={`https://minio-server-4oyt.onrender.com/yalli/${event.imageId}`}
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
                    <p className="event-title">{event.title}</p>
                    <p>
                      <CiLocationOn />
                      {event.country}
                    </p>
                  </div>
                  <Link to={`/event/${event.id}`} className="btn-info">
                    <button className="w-100">Daha Ətraflı</button>
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles["right_arrow"]} onClick={scrollRightBtn}>
              <Arrow />
            </div>
          </div>
          <div className="response-event">
            {events.slice(0, 4).map((event, index) => (
              <div className="event-card" key={index}>
                <div className="img-block">
                  <img
                    src={`https://minio-server-4oyt.onrender.com/yalli/${event.imageId}`}
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
                  <p className="event-title">{event.title}</p>
                  <p>
                    <CiLocationOn />
                    {event.country}
                  </p>
                </div>
                <Link to={`/event/${event.id}`} className="btn-info">
                  <button className="w-100">Daha Ətraflı</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["text-box-con"]}>
          <div className={styles["text_box"] + " text-box"}>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.54792 36.0855C7.40208 33.8063 6.25 31.2501 6.25 27.1063C6.25 19.8146 11.3687 13.2792 18.8125 10.048L20.6729 12.9188C13.725 16.6771 12.3667 21.5542 11.825 24.6292C12.9437 24.0501 14.4083 23.848 15.8438 23.9813C19.6021 24.3292 22.5646 27.4146 22.5646 31.2501C22.5646 33.1839 21.7964 35.0386 20.4289 36.406C19.0615 37.7735 17.2068 38.5417 15.2729 38.5417C14.2034 38.5325 13.1465 38.3106 12.1636 37.8889C11.1807 37.4672 10.2916 36.8541 9.54792 36.0855ZM30.3813 36.0855C28.2354 33.8063 27.0833 31.2501 27.0833 27.1063C27.0833 19.8146 32.2021 13.2792 39.6458 10.048L41.5062 12.9188C34.5583 16.6771 33.2 21.5542 32.6583 24.6292C33.7771 24.0501 35.2417 23.848 36.6771 23.9813C40.4354 24.3292 43.3979 27.4146 43.3979 31.2501C43.3979 33.1839 42.6297 35.0386 41.2622 36.406C39.8948 37.7735 38.0401 38.5417 36.1062 38.5417C35.0368 38.5325 33.9798 38.3106 32.9969 37.8889C32.0141 37.4672 31.1249 36.8541 30.3813 36.0855Z"
                fill="#111111"
                fillOpacity="0.5"
              />
            </svg>
            <h2 id="animatedText"></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
