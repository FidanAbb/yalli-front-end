import React from "react";
import GroupIcon from "../GroupIcon";
import Location from "../Location";
import EventArrow from "../EventArrow";
import saveBtn from "../../../assets/img/saveBtn.png"
import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
const Card = ({ sectionName, event, group }) => {
    let navigate = useNavigate()
    return (
        <div className={sectionName === "group" ? styles["card_group"] : styles["card_event"]}>
            {sectionName !== "group" && (
                <button className={styles["save_btn"]}>
                    <div className={styles["save_img"]}>
                        <img src={saveBtn} alt="save" width={22} height={22} />
                    </div>
                </button>
            )}
            <img
                src={
                    sectionName === "group"
                        ? `https://minio-server-4oyt.onrender.com/yalli/${group?.imageId}`
                        : event?.image
                }
                alt={group ? group.title : event?.title}
                className={styles["groupImage"]}
            />
            <p className={styles[`${sectionName === "group" ? "group_title" : "event_title"}`]}>
                {sectionName === "group" ? group?.title : event?.title}
            </p>
            <div className={styles["card_detail"]}>
                {sectionName === "group" ? <GroupIcon /> : <Location />}
                {sectionName === "group" ? (
                    <p>{group?.memberCount} üzv</p>
                ) : (
                    <p>{event?.location}</p>
                )}
            </div>
            {sectionName === "group" ? (
                <p className={styles["card_footer"]}>{group?.country}</p>
            ) : (
                <button onClick={() => navigate(`/event/${event.id}`, { state: { event } })} className={styles["daha_etrafli"]}>
                    Daha Ətraflı
                </button>
            )}
        </div>
    );
};

export default Card;