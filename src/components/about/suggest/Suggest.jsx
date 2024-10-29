import React from "react";
import earth from "../../../assets/img/aboutEarth.svg";
import hand from "../../../assets/img/aboutHand.svg";
import love from "../../../assets/img/aboutLove.svg";
import styles from "./style.module.scss";
const suggestData = [
  {
    icon: earth,
    title: "Qlobal icma",
    detail:
      "Dünyanın müxtəlif ölkələrində yaşayan həmvətənlərinizlə tanış olma, yeni əlaqələr qurma və təcrübə mübadiləsi aparma fürsəti.",
  },
  {
    icon: hand,
    title: "Milli Dəyərlər",
    detail:
      "Platformamız, Azərbaycan mədəniyyətini, ənənələrini və dilini yaşatmaq və təbliğ etmək məqsədi daşıyır.",
  },
  {
    icon: love,
    title: "Dəstək və İnkişaf",
    detail:
      "Platformamız, Azərbaycan mədəniyyətini, ənənələrini və dilini yaşatmaq və təbliğ etmək məqsədi daşıyır.",
  },
];
const Suggest = () => {
  return (
    <div className={styles["suggest"]}>
      <div className="container">
        <div className={styles["suggest"]}>
          <h1>Bizim təklifimiz</h1>
          <div className={styles["cards"]}>
            {suggestData.map((s, index) => (
              <div key={index} className={styles["card"]}>
                <img src={s.icon} alt="" />
                <h2>{s.title}</h2>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
