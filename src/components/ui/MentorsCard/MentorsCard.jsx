import React, { useContext } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import FetchCountries from "../../Countrys/FetchCountryCodes";
import { YalliContext } from "../../../Context/YalliContext";

const MentorsCard = ({ data ,index}) => {
  const navigate = useNavigate();
  const {countries}=useContext(YalliContext)
  const categoryTranslations = {
    LIFE: "YAŞAM",
    EDUCATION: "TƏHSİL",
    CAREER: "KARYERA",
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
        src={`https://minio-server-4oyt.onrender.com/yalli/${data.profilePicture}`}
        alt=""
      />
      <p className={styles["name"]}>{data.fullName}</p>
      <img
        src={
          countries[index] ||
          "#"
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
