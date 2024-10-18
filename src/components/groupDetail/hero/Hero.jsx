import React, {useState} from "react";
import styles from "./style.module.scss";
import JoinGroupIcon from "../../ui/JoinGroupIcon";
import ShareIcon from "../../ui/ShareIcon";
import GroupIcon from "../../ui/GroupIcon";
import HeroImg from "../../../assets/img/groupDetail.svg";
const Hero = ({ group }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>
          <div className={styles["card"]}>
            <div className={styles["upper"]}>
              <h1>{group.title}</h1>
              <button
                onClick={() => {
                  const url = group.link;
                  window.open(url, "_blank");
                }}
                onMouseLeave={() => setIsHover(false)}
                onMouseEnter={() => setIsHover(true)}
              >
                Qrupa qoşul <JoinGroupIcon isHover={isHover} />
              </button>
            </div>
            <div className={styles["down"]}>
              <img
                src={`https://minio-server-4oyt.onrender.com/yalli/${group?.imageId}`}
                alt=""
              />
              <div className={styles["detail"]}>
                <p>{group.description}</p>
                <div className={styles["foot"]}>
                  <p>
                    <GroupIcon color="#111111" />
                    {group.memberCount}+ üzv
                  </p>
                  <div>
                    <ShareIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
