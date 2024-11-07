import { useContext, useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import "./style.css";
import { YalliContext } from "../../../Context/YalliContext";
import { IoLogoInstagram, IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";

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
};

const Members = () => {
  const { allUsers } = useContext(YalliContext);
  const [inputUserName, setInputUserName] = useState("");
  const [inputUserCounty, setInputUserCounty] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const userNameChange = (e) => {
    setInputUserName(e.target.value);
  };

  const userCountryChange = (e) => {
    const value = e.target.value;
    setInputUserCounty(value);
    const matchedCountries = countryCategory.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
    setSelectedCountry(matchedCountries);
    setShowDropdown(true);
  };

  const handleCountrySelect = (country) => {
    setInputUserCounty(country);
    setShowDropdown(false);
    filterUser(country, inputUserName);
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
    if (user.socialMediaLinks) {
      Object.keys(socialMedia).forEach((media) => {
        if (user.socialMediaLinks[media]) {
          links.push({
            icon: socialMedia[media],
            url: user.socialMediaLinks[media],
          });
        }
      });
    }
    return links;
  };

  return (
    <div>
      <Header />
      <div className="members-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
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
                      placeholder="Ölkə Axtarışı"
                      onChange={userCountryChange}
                      name="country"
                      type="text"
                      value={inputUserCounty}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 200)
                      }
                    />
                    {showDropdown && selectedCountry.length > 0 ? (
                      <IoIosArrowUp onClick={() => setShowDropdown(false)} />
                    ) : (
                      <IoIosArrowDown onClick={() => setShowDropdown(true)} />
                    )}
                  </div>
                  {showDropdown && selectedCountry.length > 0 && (
                    <div className="dropdown-list">
                      {selectedCountry.map((country, index) => (
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

            <div className="col-md-8">
              <div className="members-right">
                {filteredUsers.length <= 0 ? (
                  <div>
                    <h3>No Users</h3>
                  </div>
                ) : (
                  filteredUsers.map((user, index) => (
                    <div key={index} className="member-card">
                      <div className="left">
                        <div className="img-block">
                          <img
                            src={
                              user.profilePicture
                                ? `https://minio-server-4oyt.onrender.com/yalli/${user.profilePicture}`
                                : "../../../../src/pages/Profile/assets/img/default-profile-img.webp"
                            }
                            alt="Profile"
                          />
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
    </div>
  );
};

export default Members;
