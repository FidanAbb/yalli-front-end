import React from "react";
import styles from "./style.module.scss";
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>
          <div className={styles["detail"]}>
            <div className={styles["p"]}>
            Burada siz xaricdə yaşayan həmyerlilərimiz üçün təşkil olunan müxtəlif “<span className={styles["event_text"]}>Tədbirlər</span>” görə bilərsiniz. Tədbirlər arasında seminarlar, workshoplar, mədəni tədbirlər, idman fəaliyyətləri, əyləncəli görüşlər və daha çoxu yer alır. İştirakçılarımız öz bilik və bacarıqlarını artırmaq, yeni dostlar qazanmaq və xaricdə yaşamağın üstünlüklərindən faydalanmaq üçün bu tədbirlərdən yararlana bilərlər. 
            </div>
            <p>
            Tədbirlərə qoşulun və icmamızın bir parçası olun!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
