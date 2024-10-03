import React, { useRef } from "react";
import styles from "./style.module.scss";
import Meal from "../../../assets/img/meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import Card from "../../ui/card/Card";
import Arrow from "../../ui/Arrow";
import { useNavigate } from "react-router-dom";

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
  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };
  const navigate = useNavigate();


  return (
   <div className={styles["main"]}>
     <div className={styles["group"]}>
      <div className="container">
        <div className={styles["groups"]}>
          <div className={styles["hero_text"]}>
            <h2>Tədbirlər</h2>
            <p onClick={() => navigate(`/event`)}>Hamısına bax</p>
          </div>
          <div className={styles["slider"]}>
            <div className={styles["left_arrow"]} onClick={scrollLeft}>
              <Arrow />
            </div>
            <div className={styles["cards"]} ref={sliderRef}>
              {eventData.map((event, index) => (
                <Card key={index} sectionName={"event"} event={event} />
              ))}
            </div>
            <div className={styles["right_arrow"]} onClick={scrollRight}>
              <Arrow />
            </div>
          </div>
        </div>
        <div className={styles["text_box"]}>
          <h2>
            Sərhədləri aşır, xoş niyyət və sevgi ilə dünyanın fərqli
            nöqtələrində həmvətənlilərimizi bir araya gətiririk!
          </h2>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Event;
