import React from "react";
import styles from "./style.module.scss";
import JoinGroupIcon from "../../ui/JoinGroupIcon";
import ShareIcon from "../../ui/ShareIcon";
import GroupIcon from "../../ui/GroupIcon";
import HeroImg from "../../../assets/img/groupDetail.svg"
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>
          <div className={styles["card"]}>
            <div className={styles["upper"]}>
              <h1>Varşavada Asudə vaxt</h1>
              <button>
                Qrupa qoşul <JoinGroupIcon />
              </button>
            </div>
            <div className={styles["down"]}>
                <img src={HeroImg} alt="" />
                <div className={styles["detail"]}>
                    <p>Varşavada yaşayan Azərbaycanlılar üçün bu qrup, şəhərdə asudə vaxtlarını səmərəli və maraqlı keçirmək istəyənlərin bir araya gəldiyi məkandır. Burada müxtəlif fəaliyyətlər, görüşlər, və tədbirlər planlanır, mədəniyyətimizi bölüşmək və dostluq bağlarını gücləndirmək üçün şərait yaradılır. </p>
                <div className={styles["foot"]}>
                    <p><GroupIcon color="#111111"/>3k+ üzv</p>
                    <ShareIcon/>
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
