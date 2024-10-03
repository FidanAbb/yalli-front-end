import React, { useRef } from "react";
import styles from "./style.module.scss";
import German from "../../../assets/img/German.svg";
import Abd from "../../../assets/img/Abd.svg";
import Network from "../../../assets/img/Network.svg";
import Card from "../../ui/card/Card";
import Arrow from "../../ui/Arrow";

const Group = () => {
  const groupData = [
    {
      title: "Almaniyada Ausbildung Edənlər",
      members: "9k+ üzv",
      country: "Almaniya",
      image: German,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: Abd,
    },
    {
      title: "Berlində Networking",
      members: "1k üzv",
      country: "Almaniya",
      image: Network,
    },
    {
      title: "Polşada İş",
      members: "9k üzv",
      country: "Polşa",
      image: German,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika 🇺🇸",
      image: Abd,
    },
    {
      title: "Almaniyada Ausbildung Edənlər",
      members: "9k+ üzv",
      country: "Almaniya 🇩🇪",
      image: German,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika 🇺🇸",
      image: Abd,
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

  return (
    <div className={styles["main"]}>
      <div className={styles["group"]}>
        <div className="container">
          <div className={styles["groups"]}>
            <div className={styles["hero_text"]}>
              <h2>Qruplar</h2>
              <p>Hamısına bax</p>
            </div>
            <div className={styles["slider"]}>
              <div className={styles["left_arrow"]} onClick={scrollLeft}>
                <Arrow />
              </div>
              <div className={styles["cards"]} ref={sliderRef}>
                {groupData.map((group, index) => (
                  <Card key={index} sectionName={"group"} group={group} />
                ))}
              </div>
              <div className={styles["right_arrow"]} onClick={scrollRight}>
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
