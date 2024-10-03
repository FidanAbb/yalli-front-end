import React from "react";
import styles from "./style.module.scss"
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>

     <div className={styles["detail"]}>
     <div className={styles["p"]}>Platformamızda yer alan “<span className={styles["mentor_text"]}>Mentorlar</span>” bölümü 3 sahəyə ayrılır (təhsil, karyera, yaşam). Mentorların əsas rolları sizlərə düzgün istiqamət göstərmək, dəstək vermək, öz sahələrində yığdıqları təcrübə və bilikləri sizinlə paylaşmaq və sizi motivasiya edərək potensiallarınızı reallaşdırmalarına yardım etməkdir.</div>
      <span>Unutma ki, hər bir çətinlik bizi daha güclü edir və hər bir uğursuzluq bizi bir addım irəli aparır.</span>
      {/* <button></button> */}
     </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
