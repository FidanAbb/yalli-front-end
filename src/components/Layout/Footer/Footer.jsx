import React from "react";
import styles from "./style.module.scss";
import BigLogo from "../../../assets/img/BigLogo.svg";
// import { RiFacebookCircleLine } from "react-icons/ri";
// import { IoLogoInstagram } from "react-icons/io";
// import { SiTiktok } from "react-icons/si";
// import { MdOutlineLocalPostOffice } from "react-icons/md";

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer>
        <div className={styles.containerImg}>
          <img src={BigLogo} alt="BigLogo" className={styles.logo} />
          <p>Dünyanın hər yerindən fərqli icmaları burada kəşf et!</p>
        </div>
        <div className={styles.containerUl}>
          <ul>
            <p>Əsas səhifə</p>
            <li>Haqqımızda</li>
            <li>Tədbirlər</li>
            <li>Qaydalar</li>
            <li>Üzvlər</li>
            <li>Qruplar</li>
          </ul>

          <ul>
            <p>Dəstək</p>
            <li>Müştəri dəstəyi</li>
            <li>Şərtlər və Xidmətlər</li>
            <li>Məxfilik Siyasəti</li>
          </ul>
          <ul>
            <p>Əlaqə</p>
            <li className={styles.letterCont}>
              {/* <MdOutlineLocalPostOffice className={styles.letter} /> */}
              info@yalli.org
            </li>
            <div className={styles.social}>
              {/* <RiFacebookCircleLine className={styles.icon} />
              <IoLogoInstagram className={styles.icon} />
              <SiTiktok className={styles.icon} /> */}
            </div>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
