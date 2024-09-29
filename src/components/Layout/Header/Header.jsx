import React, { useState } from "react";
import logo from "../../../assets/Logo/logo.svg";
import navLogo from "../../../assets/Logo/navLogo.svg";
import languageAz from "../../../assets/img/AzFlag.svg";
import styles from "./style.module.scss";

const navLinks = [
  "Əsas səhifə",
  "Haqqımızda",
  "Üzvlər",
  "Mentorlar",
  "Qruplar",
  "Tədbirlər",
];

const Header = () => {
  const [isActive, setisActive] = useState(0);

  return (
    <>
      {/* <div className={styles.container}>
        <section className={styles["navbar"]}>
          <div className={styles["left"]}>
            <img className={styles["logo"]} src={navLogo} alt="Logo" />

            <ul>
              {navLinks.map((link, i) => (
                <li
                  onClick={() => setisActive(i)}
                  key={i}
                  style={{ color: `${isActive === i ? "#ff4b2b" : "#a2a2a2"}` }}
                >
                  {link}
                  {isActive === i && <div className={styles["line"]}></div>}
                </li>
              ))}

              <li className={styles["language"]}>
                AZ <img src={languageAz} alt="az" />
              </li>
            </ul>
          </div>

          <div className={styles["auth_btns"]}>
            <button>Giriş</button>
            <button className={styles["register_btn"]}>Qeydiyyat</button>
          </div>
        </section>
      </div> */}

      <div className={styles["navbar"]}>
        <div className="container">
          <div className={styles["nav"]}>
            <div className={styles["left"]}>
            <img className={styles["logo"]} src={navLogo} alt="Logo" />

              <ul>
                {navLinks.map((link, i) => (
                  <li
                    onClick={() => setisActive(i)}
                    key={i}
                    style={{
                      color: `${isActive === i ? "#ff4b2b" : "#a2a2a2"}`,
                    }}
                  >
                    {link}
                    {isActive === i && <div className={styles["line"]}></div>}
                  </li>
                ))}

                <li className={styles["language"]}>
                  AZ <img src={languageAz} alt="az" />
                </li>
              </ul>
            </div>

            <div className={styles["right"]}>
              <button>Giriş</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
