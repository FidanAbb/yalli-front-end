import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import MentorCard from "../../ui/MentorsCard/MentorsCard";
import Arrow from "../../ui/Arrow";

import Emil from "../../../assets/img/Emil.svg";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import { useNavigate } from "react-router-dom";
import Germany from "../../ui/countries/Germany";
import Polsa from "../../ui/countries/Polsa";
import Usa from "../../ui/countries/Usa";
const Mentor = () => {
  const mentorData = [
    {
      name: "Emil Cahangirli",
      flag: <Germany />,
      detail: "Yaşam",
      image: Emil,
    },
    {
      name: "Fidan Abbaslı",
      flag: <Polsa />,
      detail: "Təhsil",
      image: Fidan,
    },
    {
      name: "Rahman Gasımlı",
      flag: <Polsa />,
      detail: "Yaşam",
      image: Vuqar,
    },
    {
      name: "Fidan Abbaslı",
      flag: <Germany />,
      detail: "Yaşam",
      image: Fidan,
    },
    {
      name: "Emil Cahangirli",
      flag: <Germany />,
      detail: "Yaşam",
      image: Emil,
    },
    {
      name: "Rahman Gasımlı",
      flag: <Polsa />,
      detail: "Yaşam",
      image: Vuqar,
    },
  ];
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
    const walk = (x - startX) * 2; // Sürükleme hızı (isteğe bağlı artırılabilir/azaltılabilir)
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
            <h2>Mentorlar</h2>
            <p onClick={() => 
              // window.location.href = "/mentor"
              navigate("/mentors")
              }>
              Hamısına bax
            </p>
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
              {mentorData.map((group, index) => (
                <MentorCard key={index} data={group} />
              ))}
            </div>
            <div className={styles["right_arrow"]} onClick={scrollRightBtn}>
              <Arrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
