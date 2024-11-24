import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BigLogo from "../../../assets/img/BigLogo.svg";
import EmailIcon from "../../ui/EmailIcon";
import Fc from "../../ui/Fc";
import Ins from "../../ui/Ins";
import Tik from "../../ui/Tik";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./footer.css";
import PrivacyPolicy from "../../PrivacyPolicy/PrivacyPolicy";
import { CiLinkedin } from "react-icons/ci";
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
    link: "/members",
  },
  {
    page: "İcma",
    link: "/groups",
  },
];
const support = [
  {
    page: "Müştəri dəstəyi",
    link: "/profile/profile-help",
  },
  { page: "Şərtlər və Xidmətlər", link: "/" },
  { page: "Məxfilik Siyasəti", link: "/" },
];

const Footer = () => {
  const navigate = useNavigate();
  const [policyState, setPolicyState] = useState(false);
  useEffect(() => {
    if (policyState) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    }
  }, [policyState]);
  return (
    <div style={{ position: "relative" }} className={styles["footer"]}>
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
                <li key={`footer-${i}`} onClick={() => navigate(`${p.link}`)}>
                  {p.page}
                </li>
              ))}
            </ul>

            <ul>
              <h4>Dəstək</h4>
              {policyState && (
                <div className="Privacy-Policy">
                  <PrivacyPolicy setPolicyState={setPolicyState} />
                  <div
                    onClick={() => {
                      setPolicyState(false);
                    }}
                    className="bg-color"
                  ></div>
                </div>
              )}
              <li className="my-li">
                <Link to="/profile/profile-help" className="link">
                  Müştəri dəstəyi
                </Link>
              </li>
              <li className="my-li">
                <Link
                  onClick={() => {
                    setPolicyState(true);
                  }}
                  className="link"
                >
                  Şərtlər və Xidmətlər
                </Link>
              </li>
              <li className="my-li">
                <Link
                  onClick={() => {
                    setPolicyState(true);
                  }}
                  className="link"
                >
                  Məxfilik Siyasəti
                </Link>
              </li>
            </ul>
            <ul>
              <h4>Əlaqə</h4>
              <li>
                <EmailIcon />
                info@yalli.org
              </li>
              <li className={styles["links"]}>
                <a href="https://www.facebook.com/profile.php?id=61567225002273&mibextid=LQQJ4d" target="_blank">
                  <Fc className={styles["icon"]} />
                </a>
                <a href="https://www.instagram.com/yalli.hub/" target="_blank">
                  <Ins className={styles["icon"]} />
                </a>
                <a href="https://www.linkedin.com/company/yalli-org/" target="_blank">
                  <CiLinkedin style={{fontSize:"2rem",color:"#000"}} className={styles["icon"]} />
                </a>
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
