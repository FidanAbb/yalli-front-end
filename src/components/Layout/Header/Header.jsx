import React, { useState , useEffect} from "react";
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
  const [userData, setUserData] = useState("")

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("userInfo");
    if (loggedUser) {
      setUserData(JSON.parse(loggedUser));
    }
  }, []);

  console.log(userData)

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
      <div className={styles["navbar"]}>
        <div className="container">
          <div className={styles["nav"]}>
            <div className={styles["left"]}>
              <div className={styles["logo_side"]}>
                <img className={styles["logo"]} src={navLogo} alt="Logo" onClick={()=>(
                  navigate("/")
                )}/>
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
              {!userData ? (
                <>
                  <p onClick={() => navigate("/auth")}>Giriş</p>
                  <button onClick={() => navigate("/auth")}>Qeydiyyat</button>
                </>
              ) : (
                <>
                  <Bell />
                  <div className={styles["user_img"]}>
                    <img
                      src={`https://minio-server-4oyt.onrender.com/yalli/${userData.image} `}
                      alt=""
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Header;
