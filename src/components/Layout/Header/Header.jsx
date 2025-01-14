import { useState, useEffect, useContext, useRef } from "react";
import navLogo from "../../../assets/Logo/navLogo.svg";
import styles from "./style.module.scss";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import mentorIcon from "../../../../src/pages/Profile/assets/img/mentor-icon.svg";
import { IoCloseCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { YalliContext } from "../../../Context/YalliContext";
import { FaBars } from "react-icons/fa6";
import "./header.css";
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
    link: "/members",
  },
  {
    page: "İcmalar",
    link: "/groups",
  },
  {
    page: "Tədbirlər",
    link: "/events",
  },
  {
    page: "Mentorlar",
    link: "/mentors",
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
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const {
    userID,
    localUserData,
    setLocalUserData,
    setImageUrl,
    imageUrl,
    setAccessToken,
    loadingImage,
  } = useContext(YalliContext);
  console.log(userID);
  
  useEffect(() => {
    const localProfileImage = localStorage.getItem("profileImg");
    if (localProfileImage) {
      setImageUrl(JSON.parse(localProfileImage));
    }
    const localUserInfo = localStorage.getItem("userInfo");
    if (localUserInfo) {
      setLocalUserData(JSON.parse(localUserInfo));
    }
  }, []);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  console.info();
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userID");
    navigate("/login");
    setProfileDropDown(false);
  };
  const localUserId=localStorage.getItem("userID");
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0); // Yuxarı sürüşdürmək üçün
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      // Təmizlik funksiyası
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);
  const [userDataa, setUserData] = useState("");
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setUserData(true);
      } else {
        setUserData(false);
      }
    };

    checkUserLoggedIn();

    window.addEventListener("storage", checkUserLoggedIn);

    return () => {
      window.removeEventListener("storage", checkUserLoggedIn);
    };
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
        scrollToSection(groupRef);
      } else if (index === 4) {
        scrollToSection(eventRef);
      } else if (index === 5) {
        scrollToSection(mentorRef);
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

  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };
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

              {/* <li className={styles["language"]}>
                AZ <img src={languageAz} alt="az" />
              </li> */}
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
              <div className={styles["user_img"]} onClick={profileDropDownFunc}>
                {loadingImage ? (
                  <p>Loading...</p>
                ) : localUserData.profilePictureUrl ? (
                  <div
                    className="profile-image-container-header"
                    style={{
                      backgroundImage: `url(https://yalli-back-end-7v7d.onrender.com/v1/files/${localUserData.profilePictureUrl})`,
                    }}
                  ></div>
                ) : (
                  <div className="no-image">
                    {getInitials(localUserData.fullName || "NN")}
                  </div>
                )}
              </div>
            )}
            <FaBars
              onClick={() => setIsMenuOpen(true)}
              className={styles["menu-icon"]}
            />

            <div
              className={
                profileDropDown
                  ? styles["profile-dropdown-active"]
                  : styles["profile-dropdown"]
              }
            >
              <div className={styles[""]} style={{ zIndex: "10000" }}>
                <NavLink
                  onClick={() => setProfileDropDown(false)}
                  to={"/profile"}
                  style={{ textDecoration: "none" }}
                  className={styles["link-profile"]}
                >
                  <div className={styles["user-info"]}>
                    <div>
                      {loadingImage ? (
                        <p>Loading...</p>
                      ) : localUserData.profilePictureUrl ? (
                        <div
                          className="profile-image-container-header"
                          style={{
                            backgroundImage: `url(https://yalli-back-end-7v7d.onrender.com/v1/files/${localUserData.profilePictureUrl})`,
                          }}
                        ></div>
                      ) : (
                        <div className="no-image">
                          {getInitials(localUserData.fullName || "NN")}
                        </div>
                      )}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <h5>{localUserData.fullName}</h5>
                      <p>{localUserData.email}</p>
                    </div>
                  </div>
                </NavLink>
                {isMenuOpen&&<div className="bg-black-color"></div>}
                <ul className="p-3">
                  <li>
                    <NavLink
                      onClick={() => setProfileDropDown(false)}
                      className="link dp-align gap-2"
                      to="/profile/profile-community-edit"
                      activeClassName="active-link"
                    >
                      <GoPeople />
                      <p>İcmaları redaktə et</p>
                    </NavLink>
                  </li>
                  <li className="disabled-link">
                    <NavLink
                      onClick={() => setProfileDropDown(false)}
                      className={styles["mentor-link"]}
                      to="/profile/profile-mentoring"
                      activeClassName="active-link"
                    >
                      <img src={mentorIcon} className="mentor-icon" alt="" />
                      <p>Mentorluq</p>
                    </NavLink>
                  </li>
                  <li className="disabled-link">
                    <NavLink
                      onClick={() => setProfileDropDown(false)}
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
                      onClick={() => setProfileDropDown(false)}
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
      <div ref={wrapperRef} className={!isMenuOpen ? "menu active" : "menu"}>
        <div className="menu-con">
          <div className="close-btn">
            <IoCloseCircleOutline onClick={() => setIsMenuOpen(false)} />
          </div>

          <ul>
            {navLinks.map((link, i) => (
              <li
                key={i}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(link.link);
                }}
                style={{
                  backgroundColor:
                    location.pathname === link.link ? "#FA4500" : "transparent",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: location.pathname === link.link ? "#fff" : "black",
                }}
              >
                {link.page}
              </li>
            ))}
           {
            localUserId? <li className="menu-log-out">
             <div onClick={handleLogout} className={styles["log-out"]}>
               <div>
                 <IoIosLogOut className={styles["icon"]} />
                 <span>Çıxış</span>
               </div>
             </div>
           </li>:""
           }
          </ul>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
