import React from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const MentorsCard = ({ data }) => {
    const navigate = useNavigate();
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
            <img src={`https://minio-server-4oyt.onrender.com/yalli/${data.profilePicture}`} alt="" />
            <p className={styles["name"]}>{data.fullName}</p>
            <p className="country">{data.country}</p>
            <p>{translateCategory(data.mentorCategory)}</p>
        </div>
    );
};

export default MentorsCard;
