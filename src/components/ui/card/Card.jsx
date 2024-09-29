import React from "react";
import GroupIcon from "../GroupIcon";
import Location from "../Location";
import PageArrow from "../PageArrow";
import styles from "./style.module.scss";
const Card = ({ sectionName, event, group }) => {
  return (
    <div
      className={
        sectionName == "group" ? styles["card_group"] : styles["card_event"]
      }
    >
      <img
        src={sectionName == "group" ? group?.image : event?.image}
        alt={group ? group.title : event.title}
        className={styles["groupImage"]}
      />

      {sectionName !== "group" && (
        <p className={styles["event_time"]}>
          {event?.time} | {event?.hour}
        </p>
      )}

      <p
        className={
          styles[`${sectionName == "group" ? "group_title" : "event_title"}`]
        }
      >
        {sectionName == "group" ? group?.title : event?.title}
      </p>

      <div className={styles["card_detail"]}>
        {sectionName == "group" ? <GroupIcon /> : <Location />}
        {sectionName == "group" ? (
          <p>{group?.members} üzv</p>
        ) : (
          <p>{event?.location}</p>
        )}
      </div>

      {sectionName == "group" ? (
        <p className={styles["card_footer"]}>{group?.country}</p>
      ) : (
        <button>
          Daha Ətraflı <PageArrow />
        </button>
      )}
    </div>
  );
};

export default Card;
