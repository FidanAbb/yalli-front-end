import React from "react";
import styles from "./style.module.scss";
// import EventsCard from "./EventsCard/EventsCard";
import Meal from "../../../assets/img/Meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
// import { CiLocationOn } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Card from "../../ui/card/Card";

const Events = () => {
  const eventsData = [
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

  return (
    <div className={styles.Container}>
      <div className={styles.groupContainer}>
        <div className={styles.headGroup}>
          <h2 className={styles.h2Group}>Tədbirlər</h2>
          <p className={styles.pGroup}>Hamısına bax</p>
        </div>
        <div className={styles.sliderContainer}>
          {/* <FaArrowLeftLong className={styles.arrow} /> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={3.5}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetweenSlides: 0,
              },
              600: {
                slidesPerView: 1.5,
                spaceBetweenSlides: 0,
              },
              750: {
                slidesPerView: 2,
                spaceBetweenSlides: 0,
              },
              950: {
                slidesPerView: 2.5,
                spaceBetweenSlides: 0,
              },
              1100: {
                slidesPerView: 3,
                spaceBetweenSlides: 40,
              },
              1400:{
                slidesPerView: 3.5,
                spaceBetweenSlides: 50,
              }
            }}
            navigation={{
              nextEl: `.${styles.nextArrow}`,
              prevEl: `.${styles.prevArrow}`,
            }}
            modules={[Navigation]}
          >
            {eventsData.map((event, index) => (
              <SwiperSlide key={index} style={{display:"flex", justifyContent:"center"
              }}>
                {/* <EventsCard data={group} className={styles.card} /> */}
                <Card sectionName={"event"} event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <FaArrowRightLong className={styles.arrow} /> */}
        </div>
      </div>
    </div>
  );
};

export default Events;
