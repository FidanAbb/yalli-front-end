import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import FetchCountries from "../../Countrys/FetchCountryCodes";
import { YalliContext } from "../../../Context/YalliContext";

const MentorsCard = ({ data ,index}) => {
  const navigate = useNavigate();

  const {countries,mentors,setLocalMentorFlags,localMentorFlags}=useContext(YalliContext)
  const categoryTranslations = {
    LIFE: "YAŞAM",
    EDUCATION: "TƏHSİL",
    CAREER: "KARYERA",
  };

  useEffect(() => {
    const localMentorsFlag = localStorage.getItem("mentorFlags");
    if(localMentorsFlag){
      setLocalMentorFlags(JSON.parse(localMentorsFlag));

    }
  }, [mentors]);
  const findMentorFlag = (mentorFullName) => {
    if (localMentorFlags) {
      const filter = localMentorFlags.find(
        (item) => item.mentorName === mentorFullName
      );
      return filter;
    }
  };
  
  const translateCategory = (category) => {
    return categoryTranslations[category] || category;
  };
  return (
    <div
      className={styles["mentor"]}
      onClick={() => navigate(`/mentor/${data.id}`, {})}
    >
      <img
        src={`https://yalli-back-end-7v7d.onrender.com/v1/files/${data.profilePicture}`}
        alt=""
      />
      <p className={styles["name"]}>{data.fullName}</p>
      <img
        src={
          findMentorFlag(data.fullName)?.flag || "#"
        }
        alt={`${data.country} flag`}
        style={{ width: "3rem", height: "auto" }} // Bayraq genişliyi
      />
      <FetchCountries />
      <p>{translateCategory(data.mentorCategory)}</p>
    </div>
  );
};

export default MentorsCard;
