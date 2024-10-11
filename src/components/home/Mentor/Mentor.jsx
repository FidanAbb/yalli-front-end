import React, { useRef } from "react";
import styles from "./style.module.scss";
import MentorCard from "../../ui/MentorsCard/MentorsCard";
import Arrow from "../../ui/Arrow";

import Emil from "../../../assets/img/Emil.svg";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import { useNavigate } from "react-router-dom";
import Germany from "../../ui/countries/Germany"
import Polsa from "../../ui/countries/Polsa"
import Usa from "../../ui/countries/Usa"
const Mentor = () => {
  const mentorData = [
    {
      name: "Emil Cahangirli",
      flag: <Germany/>,
      detail: "Yaşam",
      image: Emil,
    },
    {
      name: "Fidan Abbaslı",
      flag: <Polsa/>,
      detail: "Təhsil",
      image: Fidan,
    },
    {
      name: "Rahman Gasımlı",
      flag: <Polsa/>,
      detail: "Yaşam",
      image: Vuqar,
    },
    {
      name: "Fidan Abbaslı",
      flag: <Germany/>,
      detail: "Yaşam",
      image: Fidan,
    },
    {
      name: "Emil Cahangirli",
      flag:<Germany/>,
      detail: "Yaşam",
      image: Emil,
    },
    {
      name: "Rahman Gasımlı",
      flag: <Polsa/>,
      detail: "Yaşam",
      image: Vuqar,
    },
  ];
  const navigate = useNavigate();
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

  return (
      <div className={styles["group"]}>
        <div className="container">
          <div className={styles["groups"]}>
            <div className={styles["hero_text"]}>
              <h2>Mentorlar</h2>
              <p onClick={() => navigate(`/mentor`)}>Hamısına bax</p>
            </div>
            <div className={styles["slider"]}>
              <div className={styles["left_arrow"]} onClick={scrollLeft}>
                <Arrow />
              </div>
              <div className={styles["cards"]} ref={sliderRef}>
                {mentorData.map((group, index) => (
                  <MentorCard key={index} data={group} />
                ))}
              </div>
              <div className={styles["right_arrow"]} onClick={scrollRight}>
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Mentor;
