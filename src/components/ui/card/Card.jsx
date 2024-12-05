import { useContext } from "react";
import GroupIcon from "../GroupIcon";
import Location from "../Location";
import EventArrow from "../EventArrow";
import saveBtn from "../../../assets/img/saveBtn.png";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import "./card.css";
import { YalliContext } from "../../../Context/YalliContext";
const Card = ({
  sectionName,
  event,
  group,
  setIsSelectGroup,
  isSelectGroup,
  setSelectedGroupsID,
  selectedGroupsID,
}) => {
  console.log(selectedGroupsID);

  let navigate = useNavigate();
  const { userID, setGroupID, groupID,setGroupEditModal } = useContext(YalliContext);
  const toggleImageSelection = (groupID) => {
    if (selectedGroupsID?.includes(groupID)) {
      setSelectedGroupsID(selectedGroupsID?.filter((id) => id !== groupID));
    } else {
      setSelectedGroupsID([...selectedGroupsID, groupID]);
    }
  };
  const isSelectGroupSecond = selectedGroupsID?.includes(group.id);
  return (
    <div
      className={
        sectionName === "group" ? styles["card_group"] : styles["card_event"]
      }
      onClick={() => {
        if (isSelectGroup) {
          toggleImageSelection(group.id);
          setGroupEditModal(false)
        }else{
          setGroupID(group.id);
          setGroupEditModal(true)
        }
      }}
    >
      {sectionName !== "group" && (
        <button className={styles["save_btn"]}>
          <div className={styles["save_img"]}>
            <img src={saveBtn} alt="save" width={22} height={22} />
          </div>
        </button>
      )}
      <div className="img-block">
        <img
          src={
            sectionName === "group"
              ? `https://minio-server-4oyt.onrender.com/yalli/${group?.imageId}`
              : event?.image
          }
          alt={group ? group.title : event?.title}
          className={styles["groupImage"]}
        />
        {isSelectGroup && (
          <div
            onClick={() => {
              toggleImageSelection(group.id);
            }}
            className={isSelectGroupSecond ? "checkbox active" : "checkbox"}
          ></div>
        )}
      </div>
      <div style={{ height: "55%" }} onClick={() => setGroupID(group.id)}>
        <p
          className={
            styles[`${sectionName === "group" ? "group_title" : "event_title"}`]
          }
        >
          {sectionName === "group" ? group?.title : event?.title}
        </p>
        <div className={styles["card_detail"]}>
          {sectionName === "group" ? <GroupIcon /> : <Location />}
          {sectionName === "group" ? (
            <p>{group?.memberCount} üzv</p>
          ) : (
            <p>{event?.country}</p>
          )}
        </div>
        {sectionName === "group" ? (
          <p className={styles["card_footer"]}>{group?.country}</p>
        ) : (
          <button
            onClick={() => navigate(`/event/${event.id}`, { state: { event } })}
            className={styles["daha_etrafli"]}
          >
            Daha Ətraflı
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
