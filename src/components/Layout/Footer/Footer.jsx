import React from "react";
import styles from "./style.module.scss";
import BigLogo from "../../../assets/img/BigLogo.svg";
import EmailIcon from "../../ui/EmailIcon";
import Fc from "../../ui/Fc";
import Ins from "../../ui/Ins";
import Tik from "../../ui/Tik";
import { useNavigate, useLocation } from "react-router-dom";
const pages = [
  {
    page: "Əsas səhifə",
    link: "/",
  },
  {
    page: "Haqqımızda",
    link: "/about",
  },
  {
    page: "Tədbirlər",
    link: "/event",
  },
  {
    page: "Üzvlər",
    link: "/member",
  },
  {
    page: "Qruplar",
    link: "/qrup",
  },
];
const support = [
  "Müştəri dəstəyi",
  "Şərtlər və Xidmətlər",
  "Məxfilik Siyasəti",
];

const Footer = () => {
  const navigate = useNavigate();
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
              {pages.map((p, i) => (
                <li key={i} onClick={()=>(
                  window.location.href = p.link
                  // navigate(`${p.link}`)
                )}>{p.page}</li>
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
                <Fc className={styles["icon"]}/>
                <Ins className={styles["icon"]}/>
                <Tik className={styles["icon"]} />
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
