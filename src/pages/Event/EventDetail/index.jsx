import styles from "./event.module.css";
import LocationIcon from "../../../components/icon/Location";
import UpperIcon from "../../../components/icon/UpperIcon";
import Hero from "../../../components/group/hero/Hero";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/Layout/Footer/Footer";
import Header from "../../../components/Layout/Header/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import defaultEventImg from "../../../../src/assets/img/kitchen.svg";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
export default function EventDetail() {
  const [userData, setUserData] = useState("");
  const [eventById, setEventById] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const navigete = useNavigate();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
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
  const eventId = useParams();
  const fetchEventById = async () => {
    try {
      const response = await axios.get(
        `https://yalli-back-end-7v7d.onrender.com/v1/events/${eventId.id}`,
        {
          headers: {
            Accept: "application/json",
            token: localStorage.getItem("accessToken"), // Add token for authorization if needed
          },
        }
      );

      setEventById(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      }
    }
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("userInfo");
    if (loggedUser) {
      setUserData(JSON.parse(loggedUser));
    }
    fetchEventById();
  }, []);
  return (
    <>
      <Header />
      <div className={styles.event_box}>
        <div onClick={() => window.history.back()} className={"back-btn-event"}>
          <FaArrowLeftLong />
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 col-12">
            <div className={styles.event_left}>
              <img
                src={
                  `https://yalli-back-end-7v7d.onrender.com/v1/files/${eventById?.imageId}` ||
                  defaultEventImg
                }
                alt=""
              />
            </div>
          </div>
          <div className="col-md-8 col-sm-12 col-12">
          <div className={styles.event_right}>
          <div>
            <h4>{eventById?.title}</h4>
            <div className={styles?.subtitle}>
              <p>{formatDate(eventById.date)}</p>
              <span className={styles.circle}></span>
              <div className={styles.location}>
                <LocationIcon />
                <span>{eventById?.country}</span>
              </div>
            </div>
            <p className={styles.main_text}>{eventById?.description}</p>
          </div>
          {userData ? (
            <div className={styles.btn_box}>
              {accessToken ? (
                <a target="_blank" href={eventById.link}>
                  <span>Qeydiyyatdan keç</span>
                  <UpperIcon />
                </a>
              ) : (
                <a onClick={() => navigete("/login")}>
                  <span>Qeydiyyatdan keç</span>
                  <UpperIcon />
                </a>
              )}
            </div>
          ) : (
            <div className={styles.btn_box}>
              <Link target="_blank" to="/login">
                <span>Qeydiyyatdan keç</span>
                <UpperIcon />
              </Link>
            </div>
          )}
        </div>
          </div>
        </div>

        
      </div>
      <Footer />
    </>
  );
}
