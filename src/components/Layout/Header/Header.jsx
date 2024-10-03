import React, { useState } from "react";
import logo from "../../../assets/Logo/logo.svg";
import navLogo from "../../../assets/Logo/navLogo.svg";
import languageAz from "../../../assets/img/AzFlag.svg";
import Bell from "../../ui/Bell";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  {
    page: "Əsas səhifə",
    link: "/",
  },
  {
    page: "Haqqımızda",
    link: "/about",
  },
  {
    page: "Üzvlər",
    link: "/member",
  },
  {
    page: "Mentorlar",
    link: "/mentor",
  },
  {
    page: "Qruplar",
    link: "/qrup",
  },
  {
    page: "Tədbirlər",
    link: "/event",
  },
];

const Header = ({ scrollToSection, groupRef, eventRef, mentorRef }) => {
  const [isActive, setisActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const handleScroll = (index) => {
    if (location.pathname === "/") {
      setisActive(index);
      if (index === 3) {
        scrollToSection(mentorRef);
      } else if (index === 4) {
        scrollToSection(groupRef);
      } else if (index === 5) {
        scrollToSection(eventRef);
      } else {
        navigate(navLinks[index].link);
      }
    } else {
      setisActive(index);
      navigate(navLinks[index].link);
    }
  };

  const refs = { groupRef, eventRef, mentorRef };

  const [isLoged, setIsLoged] = useState(false);

  return (
    <div className={styles["main"]}>
      <div className={styles["navbar"]}>
        <div className="container">
          <div className={styles["nav"]}>
            <div className={styles["left"]}>
              <div className={styles["logo_side"]}>
                <img className={styles["logo"]} src={navLogo} alt="Logo" />
                <p>Polşa</p>
                <div className={styles["arrow_down"]}>
                  <DownArrow />
                </div>
              </div>

              <ul>
                {navLinks.map((link, i) => (
                  <li
                    onClick={() => {
                      setisActive(i);
                      handleScroll(i);
                      // navigate(`${link.link}`);
                    }}
                    key={i}
                    style={{
                      color:
                        location.pathname === link.link ? "#ff4b2b" : "#a2a2a2",
                    }}
                  >
                    {link.page}
                    {/* {isActive === i && <div className={styles["line"]}></div>} */}
                  </li>
                ))}

                <li className={styles["language"]}>
                  AZ <img src={languageAz} alt="az" />
                </li>
              </ul>
            </div>

            <div className={styles["right"]}>
              {!isLoged ? (
                <>
                  <p onClick={() => navigate("/auth")}>Giriş</p>
                  <button onClick={() => navigate("/auth")}>Qeydiyyat</button>
                </>
              ) : (
                <>
                  <Bell />
                  <div className={styles["user_img"]}>
                    <img
                      src="https://s3-alpha-sig.figma.com/img/d250/02ca/a486cbf1a8d2566983e8aa209f87c968?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ONtHBuMnW9ojHNwXDIdu0aZA87BqkwFEo8h0C6Wg6YB57gptRDNfJQ4XLS4-y52cmu8CmkpafMuR2xj2u4TTjI~AlJgrfNkX43o9zL2jG~7UR5yz8L0FPYvWWZkk63RYZzOfe-8aSC7YMxkhht5V945ONY4Zy1cBvUqlsocznQHUQjddDtINKt-czH7BZuGLuA7vHKE~O0kkdeCh0g1Q7OobAh3jHXL7~fnq~71l5rXHx-HGeHvTI4ElWKhWPyuF5DyRGiQSNIzU9Iy2YRtj9~iv2oC5OnUkFUdFWLj36Qd5eI0GWsuZoOda-gbV4Cx2w7Kvh7yENCkfDa8qsbH0ew__"
                      alt=""
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
