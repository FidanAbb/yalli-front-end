import React from "react";
import styles from "./style.module.scss";
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>
          <div className={styles["detail"]}>
            <p>
              Bizim platformamızda müxtəlif maraq və ehtiyaclara uyğun “Qruplar”
              mövcuddur. Əyləncə, təhsil, iş imkanları və digər mövzularda
              yaradılmış qruplar vasitəsilə xaricdə yaşayan həmyerlilərimiz bir
              araya gələ, bilik və təcrübə paylaşa, yeni dostluqlar qura
              bilərlər.{" "}
            </p>
            <p>
              Həyatına dəyərli insanlar qat və birləşməyin gücünü hiss et!
            </p>
            <button>Öz icmanı əlavə et</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
