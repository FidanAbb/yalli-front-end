import { useContext, useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import "./style.css";
import { YalliContext } from "../../../Context/YalliContext";
import { IoLogoInstagram, IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import profileDefaultImg from "../../../../src/pages/Profile/assets/img/default-profile-img.webp";
import notLoginImage from "../../../../src/assets/img/member.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AiOutlineLinkedin } from "react-icons/ai";
import { CiLinkedin } from "react-icons/ci";
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

const socialMedia = {
  FACEBOOK: <RiFacebookCircleLine className="icon" />,
  INSTAGRAM: <IoLogoInstagram className="icon" />,
  TELEGRAM: <BiLogoTelegram className="icon" />,
  WHATSAPP: <FaWhatsapp className="icon what-icon" />,
  LINKEDIN: <AiOutlineLinkedin className="icon linkedin-icon" />, 
};

const Members = () => {
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  const { allUsers, localUserData, clickCountryToMembers, loadingImage } =
    useContext(YalliContext);
  const [inputUserName, setInputUserName] = useState("");
  const [inputUserCounty, setInputUserCounty] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const navigate = useNavigate();
console.log(clickCountryToMembers);

  useEffect(() => {
    const accessTokenStorage = localStorage.getItem("accessToken");
    if (accessTokenStorage) {
      setIslogin(true);
    }
  }, []);

  useEffect(() => {
    if (clickCountryToMembers) {
      // Əgər clickCountryToMembers mövcuddursa, onu təyin edirik
      setInputUserCounty(clickCountryToMembers);
      setSelectedCountry([clickCountryToMembers]);
    } else if (localUserData?.country) {
      // Əks halda, localUserData.country dəyərini istifadə edirik
      setInputUserCounty(localUserData.country);
      setSelectedCountry([localUserData.country]);
    }
  }, [clickCountryToMembers, localUserData]);
  

  const userNameChange = (e) => {
    setInputUserName(e.target.value);
  };
  const userCountryChange = (e) => {
    const value = e.target.value;
    setInputUserCounty(value);

    if (value.trim() === "") {
      if (clickCountryToMembers) {
        setSelectedCountry([clickCountryToMembers]);
      }else if(localUserData?.country){
        setSelectedCountry([localUserData.country]);
        
      } else {
        setSelectedCountry(countryCategory);
      }
    } else {
      const matchedCountries = countryCategory.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setSelectedCountry(matchedCountries);
    }

    setShowDropdown(true); 
  };

  const handleCountrySelect = (country) => {
    setInputUserCounty(country); 
    setShowDropdown(false); 
  };

  const filterUser = (country = inputUserCounty, name = inputUserName) => {
    const result = allUsers.filter((user) => {
      const matchesName = name
        ? user.fullName.toLowerCase().startsWith(name.toLowerCase()) ||
          user.fullName.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesCountry = country
        ? user.country.toLowerCase().startsWith(country.toLowerCase()) ||
          user.country.toLowerCase().includes(country.toLowerCase())
        : true;
      return matchesName && matchesCountry;
    });
    setFilteredUsers(result);
  };

  useEffect(() => {
    if (inputUserName || inputUserCounty) {
      filterUser();
    } else {
      setFilteredUsers(allUsers);
    }
  }, [inputUserName, inputUserCounty, allUsers]);

  const getCurrentMediaLinks = (user) => {
    const links = [];
    if (user?.socialMediaLinks) {
      Object.keys(socialMedia).forEach((media) => {
        if (user?.socialMediaLinks[media]) {
          links.push({
            icon: socialMedia[media],
            url: user?.socialMediaLinks[media],
          });
        }
      });
    }
    return links;
  };
  useEffect(() => {
    if (localUserData) {
      getCurrentMediaLinks();
    }
  }, [localUserData]);

  const getInitials = (name) => {
    const words = name?.split(/\s+/);
    const initials = words?.map((word) => word[0]?.toUpperCase()).join("");
    return initials;
  };

  return (
    <div className="members">
      {console.log(forServerError)}
      <Header />
      {isLogin ? (
        <div className="members-page">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="members-left">
                  <div className="name-input">
                    <IoSearchOutline className="icon" />
                    <input
                      onChange={userNameChange}
                      name="name"
                      type="text"
                      placeholder="Ad və Soyad"
                    />
                  </div>
                  <div className="country-con">
                    <div className="country-input">
                      <input
                        placeholder="Ölkə"
                        onChange={userCountryChange}
                        name="country"
                        type="text"
                        value={inputUserCounty}
                        onFocus={() => {
                          setShowDropdown(true);
                          
                          if (clickCountryToMembers) {
                            // Əgər clickCountryToMembers varsa, onu seçirik
                            setSelectedCountry([clickCountryToMembers]);
                          } else if (localUserData?.country) {
                            // Əgər clickCountryToMembers yoxdursa, localUserData.country istifadə olunur
                            setSelectedCountry([localUserData.country]);
                          } else {
                            // Əgər heç biri yoxdursa, bütün ölkələr göstərilir
                            setSelectedCountry(countryCategory);
                          }
                        }}
                        onBlur={() =>
                          setTimeout(() => setShowDropdown(false), 200)
                        }
                      />
                      {showDropdown ? (
                        <IoIosArrowUp className="icon" onClick={() => setShowDropdown(false)} />
                      ) : (
                        <IoIosArrowDown
                        className="icon"
                          onClick={() => {
                            setShowDropdown(true);
                            if (inputUserCounty.trim() === "") {
                              setSelectedCountry(countryCategory);
                            }
                          }}
                        />
                      )}
                    </div>
                    {showDropdown && (
                      <div className="dropdown-list">
                        {Array.isArray(selectedCountry) &&
                          selectedCountry.map((country, index) => (
                            <div
                              key={index}
                              onClick={() => handleCountrySelect(country)}
                              style={{ padding: "8px", cursor: "pointer" }}
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              {country}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="members-right">
                  {filteredUsers.length <= 0 ? (
                    <div>
                      <h3>Üzv tapılmadı</h3>
                    </div>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <div key={index} className="member-card">
                        <div className="left">
                          <div>
                            <div>
                              {loadingImage ? (
                                <p>Loading...</p>
                              ) :user.profilePicture ? (
                                <div
                                  className="profile-image-container-member"
                                  style={{
                                    backgroundImage: `url(https://yalli-back-end-7v7d.onrender.com/v1/files/${user.profilePicture})`,
                                  }}
                                ></div>
                              ) : (
                                <div className="no-image">
                                  {getInitials(user.fullName || "NN")}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="user-name">{user.fullName}</p>
                            <span>{user.country}</span>
                          </div>
                        </div>
                        <div className="right">
                          {getCurrentMediaLinks(user).map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-icon"
                            >
                              {link.icon}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/login");
          }}
          className="not-login h-100"
        >
          <div className="container h-100">
            <div className="not-login-con h-100">
              <div className="card h-100">
                <div className="img-block h-100">
                  <div className="h-100">
                    <img src={notLoginImage} alt="" />
                  </div>
                  <div className="blur-side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
