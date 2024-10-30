import React, { useState, useEffect, useContext } from "react";
import logo from "../../../assets/Logo/logo.svg";
import navLogo from "../../../assets/Logo/navLogo.svg";
import languageAz from "../../../assets/img/AzFlag.svg";
import Bell from "../../ui/Bell";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import mentorIcon from "../../../../src/pages/Profile/assets/img/mentor-icon.svg";
import mentorIconDark from "../../../../src/pages/Profile/assets/img/mentor-icon-dark.svg";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { YalliContext } from "../../../Context/YalliContext";
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
    page: "İcma",
    link: "/qrup",
  },
  {
    page: "Tədbirlər",
    link: "/event",
  },
];

const countryCategory = [
  "Azərbaycan",
  "Türkiyə",
  "Rusiya",
  "Almaniya",
  "ABŞ",
  "Ukrayna",
  "Böyük Britaniya",
  "Kanada",
  "Fransa",
  "İsrail",
  "Gürcüstan",
  "İtaliya",
  "Avstraliya",
  "İspaniya",
  "Niderland",
  "Avstriya",
  "İsveç",
  "Belçika",
  "Norveç",
  "Finlandiya",
  "Macarıstan",
  "Polşa",
  "Yunanıstan",
  "Slovakiya",
  "Litva",
  "Latviya",
  "Estoniya",
  "Qazaxıstan",
  "BƏƏ",
  "Yaponiya",
  "İran",
  "Səudiyyə Ərəbistanı",
  "Belarus",
  "Moldova",
  "Qırğızıstan",
  "Tacikistan",
  "Türkmənistan",
  "Özbəkistan",
  "Malayziya",
  "Sinqapur",
  "Braziliya",
  "Argentina",
  "Meksika",
  "Vietnam",
  "Bali (İndoneziya)",
  "İsveçrə",
  "Portuqaliya",
  "Cənubi Koreya",
];

const Header = ({ scrollToSection, groupRef, eventRef, mentorRef }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryCategory);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const {userInfoLogin}=useContext(YalliContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfoLogin");
    navigate("/login");
    setProfileDropDown(false)
  };
  const [userDataa, setUserData] = useState("");
  const [base64Image, setBase64Image] = useState();

  useEffect(() => {
    const localBase64Image = localStorage.getItem("profileImage");
    setBase64Image(localBase64Image);
  }, []);
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("userInfo")) || "";
    setUserData(loggedUser);
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchItem(value);
    const filtered = countryCategory.filter((country) =>
      country.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };

  const [isActive, setisActive] = useState(0);
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

  const profileDropDownFunc = () => {
    setProfileDropDown((prevState) => !prevState);
  };
  const refs = { groupRef, eventRef, mentorRef };

  const [isLoged, setIsLoged] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  return (
    <div className={styles["navbar"]}>
      <div className="container">
        <div className={styles["nav"]}>
          <div className={styles["left"]}>
            <div className={styles["logo_side"]}>
              <img
                className={styles["logo"]}
                src={navLogo}
                alt="Logo"
                onClick={() => navigate("/")}
              />
              {!!userDataa && (
                <div className={styles["country_select"]}>
                  {/*<input*/}
                  {/*    type="text"*/}
                  {/*    name=""*/}
                  {/*    id=""*/}
                  {/*    className={styles["select"]}*/}
                  {/*    placeholder="Ölkə"*/}
                  {/*    value={searchItem}*/}

                  {/*/>*/}
                  <button
                    className={styles["country_select"]}
                    onChange={handleInputChange}
                    onClick={() => setShowOptions(!showOptions)}
                    onBlur={() => setTimeout(() => setShowOptions(false), 200)}
                  >
                    <span>{searchItem ? searchItem : "Ölkə"}</span>{" "}
                    <DownArrow />
                  </button>
                  {showOptions && (
                    <div className={styles["options"]}>
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, i) => (
                          <div
                            key={i}
                            className={styles["p"]}
                            onClick={() => {
                              setSearchItem(country);
                              setShowOptions(false);
                            }}
                          >
                            {country}
                          </div>
                        ))
                      ) : (
                        <div className={styles["p"]}>
                          Heç bir ölkə tapılmadı
                        </div>
                      )}
                    </div>
                  )}

                  {/*<div*/}
                  {/*    className={styles["down_arrow"]}*/}
                  {/*    onClick={() => setShowOptions(!showOptions)}*/}
                  {/*>*/}
                  {/*  <DownArrow/>*/}
                  {/*</div>*/}
                </div>
              )}
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

          <div
            className={styles["right"]}
            style={{ position: "relative", userSelect: "none" }}
          >
            {!userDataa ? (
              <>
                <p onClick={() => navigate("/login")}>Giriş</p>
                <button onClick={() => navigate("/register")}>Qeydiyyat</button>
              </>
            ) : (
              <>
                <Bell />
                <div
                  className={styles["user_img"]}
                  onClick={profileDropDownFunc}
                >
                  <img
                    src={`${
                      userInfoLogin?.image ? userInfoLogin?.image : "/src/assets/img/nouser.webp"
                    } `}
                    alt=""
                  />
                </div>
              </>
            )}
            <div
              className={
                profileDropDown
                  ? styles["profile-dropdown-active"]
                  : styles["profile-dropdown"]
              }
            >
              <div className={styles[""]} style={{ zIndex: "10000" }}>
                <NavLink onClick={()=>setProfileDropDown(false)} to={"/profile"} style={{textDecoration:"none"} } className={styles["link-profile"]}>
                  <div  className={styles["user-info"]}>
                    <div>
                      <img
                        src={`${
                          userInfoLogin.image
                            ? userInfoLogin.image
                            : "/src/assets/img/nouser.webp"
                        } `}
                        className={styles["drop-down-img"]}
                        alt=""
                      />
                    </div>
                    <div>
                      <h5>Lale</h5>
                      <p>email@gmal</p>
                    </div>
                  </div>
                </NavLink>
                <ul className="p-3">
                  <li>
                    <NavLink
                     onClick={()=>setProfileDropDown(false)}
                      className="link dp-align gap-2"
                      to="/profile/profile-community-edit"
                      activeClassName="active-link"
                    >
                      <GoPeople />
                      <p>İcmaları redaktə et</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                     onClick={()=>setProfileDropDown(false)}
                      className={styles["mentor-link"]}
                      to="/profile/profile-mentoring"
                      activeClassName="active-link"
                    >
                      <img src={mentorIcon} className="mentor-icon" alt="" />
                      <p>Mentorluq</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                     onClick={()=>setProfileDropDown(false)}
                      className="link dp-align gap-2"
                      to="/profile/profile-settings"
                      activeClassName="active-link"
                    >
                      <IoSettingsOutline />
                      Parametrlər
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                     onClick={()=>setProfileDropDown(false)}
                      className={styles["link-help"]}
                      to="/profile/profile-help"
                      activeClassName="active-link"
                    >
                      <CiCircleQuestion className={styles["help-icon"]} />
                      Kömək & Dəstək
                    </NavLink>
                  </li>
                </ul>
                <li>
                  <div onClick={handleLogout} className={styles["log-out"]}>
                    <div>
                      <IoIosLogOut className={styles["icon"]} />
                      <span>Çıxış</span>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
