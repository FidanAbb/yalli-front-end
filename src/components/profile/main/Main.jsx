import React from "react";
import styles from "./style.module.scss";
import Profilemelumatlari from "../Profilemelumatlari/Profilemelumatlari";
import Bildirisler from "../Bildirisler/Bildirisler";
import Mentorluq from "../Mentorluq/Mentorluq";
import Qruplariredakteet from "../Qruplariredakteet/Qruplariredakteet";
import Parametrler from "../Parametrler/Parametrler";
import Komekvedestek from "../Komekvedestek/Komekvedestek";

const Main = ({ page }) => {
  return (
    <div className="main_page">
      {page == "Profilemelumatlari" ? (
        <Profilemelumatlari />
      ) : page == "Bildirisler" ? (
        <Bildirisler />
      ) : page == "Mentorluq" ? (
        <Mentorluq />
      ) : page == "Qruplariredakteet" ? (
        <Qruplariredakteet />
      ) : page == "Parametrler" ? (
        <Parametrler />
      ) : (
        <Komekvedestek />
      )}
    </div>
  );
};

export default Main;
