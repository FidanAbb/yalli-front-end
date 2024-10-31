import React from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const MentorsCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles["mentor"]}
            onClick={() => navigate(`/mentor/${data.id}`, {
                state: {
                    id: data.id,
                    name: data.name,
                    detail: data.detail,
                    image: data.image
                }
            })}
        >
            <img src={data?.image} alt="" />
            <h3>{data.name}</h3>
            <span>{data.flag}</span>
            <p>{data.detail}</p>
        </div>
    );
};

export default MentorsCard;
