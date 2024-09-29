import React from "react";
import styles from "./style.module.scss";
// import GroupCard from "./GroupCard/GroupCard";
import German from "../../../assets/img/German.svg";
import Abd from "../../../assets/img/Abd.svg";
import Network from "../../../assets/img/Network.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Card from "../../ui/card/Card";

const Group = () => {
  const groupData = [
    {
      title: "Almaniyada Ausbildung Edənlər",
      members: "9,856",
      country: "Almaniya 🇩🇪",
      image: German,
    },
    {
      title: "Amerikada PHD",
      members: "16,501",
      country: "Amerika 🇺🇸",
      image: Abd,
    },
    {
      title: "Berlində Networking",
      members: "1,374",
      country: "Almaniya 🇩🇪",
      image: Network,
    },
    {
      title: "Polşada İş",
      members: "10,692",
      country: "Polşa 🇵🇱",
      image: German,
    },
  ];

  return (
    <div className={styles["group"]}>
      <div className="container">
        <div className={styles["groups"]}>

        <div className={styles["headGroup"]}>
          <h2 className={styles["h2Group"]}>Qruplar</h2>
          <p className={styles["pGroup"]}>Hamısına bax</p>
        </div>


        <div className={styles["sliderContainer"]}>
          {/* <FaArrowLeftLong className={styles.arrow} /> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={3.5} 
            navigation={{
              nextEl: `.${styles.nextArrow}`,
              prevEl: `.${styles.prevArrow}`,
            }}
            modules={[Navigation]}
          >
            {groupData.map((group, index) => (
              <SwiperSlide key={index}>
                {/* <GroupCard data={group} className={styles.card} /> */}
                <Card sectionName={"group"} group={group}/>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* <FaArrowRightLong className={styles.arrow} /> */}
        </div>


        <button className={styles["createGroupBtn"]}>Öz qrupunu yarat →</button>
       
       
        </div>
      </div>
    </div>
  );
};

export default Group;
