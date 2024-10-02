import React from "react";
import styles from "./style.module.scss";
import BigLogo from "../../../assets/img/BigLogo.svg";
import EmailIcon from "../../ui/EmailIcon";
import Fc from "../../ui/Fc";
import Ins from "../../ui/Ins";
import Tik from "../../ui/Tik";
const pages = ["Əsas səhifə", "Haqqımızda", "Tədbirlər", "Üzvlər", "Qruplar"];
const support = [
  "Müştəri dəstəyi",
  "Şərtlər və Xidmətlər",
  "Məxfilik Siyasəti",
];

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className="container">
        <div className={styles["footer"]}>
          <div className={styles["left"]}>
            <img src={BigLogo} alt="" />
            <p>Dünyanın hər yerindən fərqli icmaları burada kəşf et!</p>
          </div>
          <div className={styles["right"]}>
            <ul>
              <h4>Səhifələr</h4>
              {pages.map((p) => (
                <li>{p}</li>
              ))}
            </ul>

            <ul>
              <h4>Dəstək</h4>
              {support.map((s) => (
                <li>{s}</li>
              ))}
            </ul>

            <ul>
              <h4>Əlaqə</h4>
              <li>
                <EmailIcon />
                info@yalli.org
              </li>
              <li className={styles["links"]}>
                <Fc />
                <Ins />
                <Tik />
              </li>
            </ul>
          </div>
        </div>
        <p className={styles["copy_right"]}>
          Müəllif hüququ © Bütün hüquqlar qorunur
        </p>
      </div>
    </div>
  );
};

export default Footer;
