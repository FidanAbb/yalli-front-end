import React, { useRef, useState , useEffect} from "react";
import styles from "./style.module.scss";
import Meal from "../../../assets/img/meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import Card from "../../ui/card/Card";
import Arrow from "../../ui/Arrow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEventData } from "../../../redux/slice/event/event";

const Event = () => {
  const eventData = [
    {
      time: "Monday, 9 September",
      hour: "19:00",
      title: "Azərbaycanlıların Şam Yeməyi",
      location: "Koln,Almaniya",
      image: Meal,
    },
    {
      time: "Friday, 25 October",
      hour: "14:00",
      title: "Badminton Yarışı | Southland Stadion",
      location: "Calgary, Kanada",
      image: badminton,
    },
    {
      time: "Friday, 8 November",
      hour: "16:00",
      title: "Milli Mətbəx Yığıncağı",
      location: "Poznan, Polşa",
      image: kitchen,
    },
    {
      time: "Monday, 9 September",
      hour: "19:00",
      title: "Futbol Yarışı | Warszawianka Football Center",
      location: "Varşava, Polşa",
      image: Meal,
    },
    {
      time: "Monday, 9 September",
      hour: "19:00",
      title: "Azərbaycanlıların Şam Yeməyi",
      location: "Koln,Almaniya",
      image: Meal,
    },
    {
      time: "Friday, 25 October",
      hour: "14:00",
      title: "Badminton Yarışı | Southland Stadion",
      location: "Calgary, Kanada",
      image: badminton,
    },
    {
      time: "Friday, 8 November",
      hour: "16:00",
      title: "Milli Mətbəx Yığıncağı",
      location: "Poznan, Polşa",
      image: kitchen,
    },
    {
      time: "Monday, 9 September",
      hour: "19:00",
      title: "Futbol Yarışı | Warszawianka Football Center",
      location: "Varşava, Polşa",
      image: Meal,
    },
  ];

  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const [allData, setAllEventpData] = useState({
    ...events,
  });

  useEffect(() => {
    dispatch(getEventData());
  }, [dispatch]);

  useEffect(() => {
    setAllEventpData(events);
  }, [events]);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const navigate = useNavigate();
  return (
    <div className={styles["group"]}>
      <div className="container">
        <div className={styles["groups"]}>
          <div className={styles["hero_text"]}>
            <h2>Tədbirlər</h2>
            <p onClick={() => 
              // window.location.href ="/event"
              navigate("/event")
              }>Hamısına bax</p>
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
              {eventData.map((event, index) => (
                <Card key={index} sectionName={"event"} event={event} />
              ))}
            </div>
            <div className={styles["right_arrow"]} onClick={scrollRightBtn}>
              <Arrow />
            </div>
          </div>
        </div>
        <div className={styles["text_box"]}>
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
              fill-opacity="0.5"
            />
          </svg>

          <h2>
            Sərhədləri aşır, xoş niyyət və sevgi ilə dünyanın fərqli
            nöqtələrində həmvətənlilərimizi bir araya gətiririk!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Event;
