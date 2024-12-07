import { MdOutlineDateRange } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoLogoInstagram,
} from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataById, patchUserData } from "../../../redux/slice/user/user";
import { CiEdit, CiLinkedin } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { YalliContext } from "../../../Context/YalliContext";
import profileDefaultImg from "../../../../src/pages/Profile/assets/img/default-profile-img.webp";
import { toast } from "react-toastify";
const ProfileInfo = () => {
  const wrapperRef = useRef(null);
  const [imgPop, setImgPop] = useState(false);
  const {
    localUserData,
    setLocalUserData,
    imageUrl,
    updateUserData,
    handleImageUpload,
    loadingImage,
    allUsers,
  } = useContext(YalliContext);
  const [showCountryDropDown, setShowCountryDropDown] = useState(false);
  const [showSocialMediaSide, setShowSocialMediaSide] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...localUserData, [name]: value };
    setLocalUserData(newFormData);
    updateUserData(newFormData);
    localStorage.setItem("userInfo", JSON.stringify(newFormData));
  };
  const handleDateChange = (date) => {
    const formattedDate = date ? date.toISOString().substring(0, 10) : "";
    const newFormDate = { ...localUserData, birthDate: formattedDate };
    setLocalUserData(newFormDate);
    updateUserData(newFormDate);
  };
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const newFormData = {
      ...localUserData,
      country: selectedCountry,
      city: "",
    };
    setLocalUserData(newFormData);
    updateUserData(newFormData);
  };
  const handleCountryChangeDrop = (selectedCountry) => {
    const newFormData = {
      ...localUserData,
      country: selectedCountry,
      city: "", // Ölkə dəyişəndə şəhəri sıfırlamaq üçün
    };
    setLocalUserData(newFormData);
    updateUserData(newFormData);
    setShowCountryDropDown(false); // Dropdown-u bağla
  };
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const newFormData = { ...localUserData, city: selectedCity };
    setLocalUserData(newFormData);
    updateUserData(newFormData);
  };
  function isValidSocialUrl(url, platform) {
    const regexPatterns = {
      FACEBOOK: /(?:http(s)?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/,
      INSTAGRAM:
        /(?:http(s)?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9(\.\?)?]/,
      WHATSAPP: /(?:http(s)?:\/\/)?api\.whatsapp\.com\/send\?phone=[0-9]+/,
      TELEGRAM: /(?:http(s)?:\/\/)?(?:www\.)?t\.me\/[a-zA-Z0-9(\.\?)?]/,
      LINKEDIN: /(?:http(s)?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+/,
    };

    const pattern = regexPatterns[platform];
    return pattern && pattern.test(url);
  }
  const socialMediaChange = (e) => {
    const { name, value } = e.target;

    const updatedSocialMediaAccounts = value
      ? { ...localUserData.socialMediaAccounts, [name]: value }
      : Object.fromEntries(
          Object.entries(localUserData.socialMediaAccounts || {}).filter(
            ([key]) => key !== name
          )
        );

    const newUserData = {
      ...localUserData,
      socialMediaAccounts: updatedSocialMediaAccounts,
    };

    setLocalUserData(newUserData);
    updateUserData(newUserData);

    if (value && !isValidSocialUrl(value, name.toUpperCase())) {
      toast.info(
        `Daxil edilmiş ${name} URL düzgün deyil və 5 saniyə ərzində silinəcək.`
      );
      setTimeout(() => {
        const cleanedSocialMediaAccounts = Object.fromEntries(
          Object.entries(localUserData.socialMediaAccounts || {}).filter(
            ([key]) => key !== name
          )
        );
        const cleanedUserData = {
          ...localUserData,
          socialMediaAccounts: cleanedSocialMediaAccounts,
        };

        setLocalUserData(cleanedUserData);
        updateUserData(cleanedUserData);
      }, 5000);
    }
  };
  const countries = [
    { name: "Azərbaycan", cities: ["Bakı", "Gəncə", "Sumqayıt"] },
    { name: "Türkiyə", cities: ["İstanbul", "Ankara", "İzmir"] },
    { name: "Rusiya", cities: ["Moskva", "Sankt-Peterburq", "Novosibirsk"] },
    { name: "Almaniya", cities: ["Berlin", "Hamburg", "Münhen"] },
    { name: "ABŞ", cities: ["Nyu York", "Los Anceles", "Çikaqo"] },
    { name: "Ukrayna", cities: ["Kiyev", "Xarkov", "Odesa"] },
    { name: "Böyük Britaniya", cities: ["London", "Mançester", "Birmingem"] },
    { name: "Kanada", cities: ["Toronto", "Vankuver", "Monreal"] },
    { name: "Fransa", cities: ["Paris", "Marsel", "Lion"] },
    { name: "İsrail", cities: ["Tel-Aviv", "Ierusəlim", "Xayfa"] },
    { name: "Gürcüstan", cities: ["Tbilisi", "Kutaisi", "Batumi"] },
    { name: "İtaliya", cities: ["Roma", "Milan", "Neapol"] },
    { name: "Avstraliya", cities: ["Sidney", "Melburn", "Brisben"] },
    { name: "İspaniya", cities: ["Madrid", "Barselona", "Valensiya"] },
    { name: "Niderland", cities: ["Amsterdam", "Rotterdam", "Xaaqa"] },
    { name: "Avstriya", cities: ["Vyan", "Qraz", "Lints"] },
    { name: "İsveç", cities: ["Stokholm", "Geteborq", "Malmö"] },
    { name: "Belçika", cities: ["Brüssel", "Antverpen", "Gent"] },
    { name: "Norveç", cities: ["Oslo", "Berqen", "Tronxeym"] },
    { name: "Finlandiya", cities: ["Helsinki", "Espoo", "Tampere"] },
    { name: "Polşa", cities: ["Varşava", "Krakov", "Vrotslav"] },
    { name: "Yunanıstan", cities: ["Afin", "Selanik", "Patra"] },
    { name: "Sinqapur", cities: ["Sinqapur"] },
    { name: "Braziliya", cities: ["Sao Paulo", "Rio de Janeiro", "Brasiliya"] },
    { name: "Argentina", cities: ["Buenos Aires", "Kordoba", "Rosario"] },
    { name: "Meksika", cities: ["Mexiko", "Ecatepec", "Guadalaxara"] },
    { name: "Macarıstan", cities: [] },
    { name: "Slovakiya", cities: [] },
    { name: "Litva", cities: [] },
    { name: "Latviya", cities: [] },
    { name: "Estoniya", cities: [] },
    { name: "Qazaxıstan", cities: [] },
    { name: "BƏƏ", cities: [] },
    { name: "Yaponiya", cities: [] },
    { name: "İran", cities: [] },
    { name: "Səudiyyə Ərəbistanı", cities: [] },
    { name: "Belarus", cities: [] },
    { name: "Moldova", cities: [] },
    { name: "Qırğızıstan", cities: [] },
    { name: "Tacikistan", cities: [] },
    { name: "Türkmənistan", cities: [] },
    { name: "Özbəkistan", cities: [] },
    { name: "Malayziya", cities: [] },
    { name: "Vietnam", cities: [] },
    { name: "Bali (İndoneziya)", cities: [] },
    { name: "İsveçrə", cities: [] },
    { name: "Portuqaliya", cities: [] },
    { name: "Cənubi Koreya", cities: [] },
  ];
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setImgPop(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  const deleteProfileImage = () => {
    const updatedUserData = { ...localUserData, profilePictureUrl: null };
    setLocalUserData(updatedUserData);
    updateUserData(updatedUserData);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
    toast.success("Şəkil uğurla silindi.");
  };
  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const closeDropdownOnOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropDown(false);
      }
    };

    document.addEventListener("mousedown", closeDropdownOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    };
  }, []);
  if (!localUserData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div
        className={showSocialMediaSide ? "profile-info none" : "profile-info"}
      >
        <h4>Profil Məlumatlarım</h4>
        <div className="row">
          <div className="col-md-8 col-sm-12 col-12">
            <div className="info-left dp-cloumn">
              <div className="row top">
                <div className="col-md-6 col-sm-12 col-12">
                  <div className="left">
                    <div className="img-block">
                      {loadingImage ? (
                        <p>Loading...</p>
                      ) : localUserData.profilePictureUrl ? (
                        <div
                          className="profile-image-container"
                          style={{
                            backgroundImage: `url(https://minio-server-4oyt.onrender.com/yalli/${localUserData.profilePictureUrl})`,
                          }}
                        ></div>
                      ) : (
                        <div className="profile-image-container profile-initials">
                          {getInitials(localUserData.fullName || "NN")}
                        </div>
                      )}
                      <div className="edit-icon dp-center">
                        <div
                          onClick={() => setImgPop((prevState) => !prevState)}
                          className="edit-con"
                        >
                          <CiEdit />
                        </div>
                        {imgPop && (
                          <div ref={wrapperRef} className="img-pop">
                            <div
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                            >
                              Şəkil Dəyişdir
                            </div>
                            {localUserData.profilePictureUrl && (
                              <div onClick={deleteProfileImage}>Şəkil Sil</div>
                            )}
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <p>
                      {localUserData?.fullName
                        ? localUserData?.fullName
                        : "No Name"}
                    </p>
                    <span>
                      {localUserData.country}
                      {/* {localUserData.city ? "," : ""}{" "} */}
                      {/* {localUserData.city ? localUserData.city : ""} */}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 col-12">
                  <div className="right dp-center">
                    <div>
                      <div className="input-con">
                        <input
                          type="text"
                          name="fullName"
                          value={localUserData?.fullName}
                          onChange={handleInputChange}
                          placeholder="Adınızı daxil edin"
                          className="profile-input"
                        />
                      </div>
                      <div className="date-con">
                        <DatePicker
                          selected={
                            localUserData.birthDate
                              ? new Date(localUserData.birthDate)
                              : null
                          }
                          onChange={handleDateChange}
                          dateFormat="yyyy-MM-dd"
                          className="profile-input"
                          placeholderText="Doğum tarixi"
                        />
                        <MdOutlineDateRange className="date-icon" />
                      </div>
                      <div className="input-con">
                        <input
                          type="email"
                          name="email"
                          value={localUserData?.email}
                          onChange={handleInputChange}
                          placeholder="E-poçt ünvanı"
                          className="profile-input"
                        />
                      </div>
                      <div
                        ref={dropdownRef}
                        className="country-drop-con dp-none"
                      >
                        <div
                          onClick={() => {
                            setShowCountryDropDown((prev) => !prev);
                          }}
                          className="head"
                        >
                          <p>{localUserData.country || "Ölkələr"}</p>
                          {showCountryDropDown ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </div>
                        {showCountryDropDown && (
                          <div className="body">
                            {countries.map((country, index) => (
                              <div
                                onClick={() => {
                                  setShowCountryDropDown(false);
                                  handleCountryChangeDrop(country.name);
                                }}
                                className="item"
                                key={index}
                              >
                                {country.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div
                  onClick={() => setShowSocialMediaSide(true)}
                  className="rp-social-text dp-none"
                >
                  <div>
                    <p>Sosial medialarım</p>
                    <span>
                      <IoIosArrowForward className="icon"/>
                    </span>
                  </div>
                </div>
                <ul className="dp-cloumn gap-2 rp-none">
                  <li>
                    <RiFacebookCircleLine className="icon" />
                    <input
                      onChange={socialMediaChange}
                      name="FACEBOOK"
                      type="text"
                      value={localUserData.socialMediaAccounts?.FACEBOOK || ""}
                    />
                  </li>
                  <li>
                    <div className="telegram-icon dp-center">
                      <BiLogoTelegram className="icon" />
                    </div>
                    <input
                      onChange={socialMediaChange}
                      name="TELEGRAM"
                      type="text"
                      value={localUserData.socialMediaAccounts?.TELEGRAM || ""}
                    />
                  </li>
                  <li>
                    <FaWhatsapp className="icon what-icon" />
                    <input
                      onChange={socialMediaChange}
                      name="WHATSAPP"
                      type="text"
                      value={localUserData.socialMediaAccounts?.WHATSAPP || ""}
                    />
                  </li>
                  <li>
                    <IoLogoInstagram className="icon" />
                    <input
                      onChange={socialMediaChange}
                      name="INSTAGRAM"
                      type="text"
                      value={localUserData.socialMediaAccounts?.INSTAGRAM || ""}
                    />
                  </li>
                  <li>
                    <CiLinkedin className="icon" />
                    <input
                      onChange={socialMediaChange}
                      name="LINKEDIN"
                      type="text"
                      value={localUserData.socialMediaAccounts?.LINKEDIN || ""}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-12 rp-none">
            <div className="info-right">
              <div className="dp-cloumn gap-2">
              <div
                        ref={dropdownRef}
                        className="country-drop-con rp-none"
                      >
                        <div
                          onClick={() => {
                            setShowCountryDropDown((prev) => !prev);
                          }}
                          className="head"
                        >
                          <p>{localUserData.country || "Ölkələr"}</p>
                          {showCountryDropDown ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </div>
                        {showCountryDropDown && (
                          <div className="body">
                            {countries.map((country, index) => (
                              <div
                                onClick={() => {
                                  setShowCountryDropDown(false);
                                  handleCountryChangeDrop(country.name);
                                }}
                                className="item"
                                key={index}
                              >
                                {country.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                {/* <div className="city-drop-con">
                <select
                  onChange={(e) => handleCityChange(e)}
                  className="profile-select"
                  value={localUserData.city}
                  disabled={!localUserData.country}
                >
                  {localUserData.city ? "" : <option value="">Seçin</option>}
                  {localUserData.country &&
                    countries
                      .find((c) => c.name === localUserData.country)
                      ?.cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSocialMediaSide && (
        <div className={"media-side dp-none"}>
          <div className="head">
            <span onClick={() => setShowSocialMediaSide(false)}>
              <IoIosArrowBack />
            </span>
            <p>Sosial medialarım</p>
          </div>
          <div className="bottom">
            <div className="rp-social-text dp-none"></div>
            <ul className="dp-cloumn gap-2 ">
              <li>
                <RiFacebookCircleLine className="icon" />
                <input
                  onChange={socialMediaChange}
                  name="FACEBOOK"
                  type="text"
                  value={localUserData.socialMediaAccounts?.FACEBOOK || ""}
                />
              </li>
              <li>
                <div className="telegram-icon dp-center">
                  <BiLogoTelegram className="icon" />
                </div>
                <input
                  onChange={socialMediaChange}
                  name="TELEGRAM"
                  type="text"
                  value={localUserData.socialMediaAccounts?.TELEGRAM || ""}
                />
              </li>
              <li>
                <FaWhatsapp className="icon what-icon" />
                <input
                  onChange={socialMediaChange}
                  name="WHATSAPP"
                  type="text"
                  value={localUserData.socialMediaAccounts?.WHATSAPP || ""}
                />
              </li>
              <li>
                <IoLogoInstagram className="icon" />
                <input
                  onChange={socialMediaChange}
                  name="INSTAGRAM"
                  type="text"
                  value={localUserData.socialMediaAccounts?.INSTAGRAM || ""}
                />
              </li>
              <li>
                <CiLinkedin className="icon" />
                <input
                  onChange={socialMediaChange}
                  name="LINKEDIN"
                  type="text"
                  value={localUserData.socialMediaAccounts?.LINKEDIN || ""}
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
