import { MdOutlineDateRange } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataById, patchUserData } from "../../../redux/slice/user/user";
import { CiEdit } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { YalliContext } from "../../../Context/YalliContext";
import profileDefaultImg from "../../../../src/pages/Profile/assets/img/default-profile-img.webp";
import { toast } from "react-toastify";
const ProfileInfo = () => {
  const {
    localUserData,
    setLocalUserData,
    imageUrl,
    updateUserData,
    handleImageUpload,
    loadingImage,
    allUsers,
  } = useContext(YalliContext);
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

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const newFormData = { ...localUserData, city: selectedCity };
    setLocalUserData(newFormData);
    updateUserData(newFormData);
  };
  function isValidSocialUrl(url, platform) {
    const regexPatterns = {
      FACEBOOK: /(?:http(s)?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/,
      INSTAGRAM: /(?:http(s)?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9(\.\?)?]/,
      WHATSAPP: /(?:http(s)?:\/\/)?api\.whatsapp\.com\/send\?phone=[0-9]+/,
      TELEGRAM: /(?:http(s)?:\/\/)?(?:www\.)?t\.me\/[a-zA-Z0-9(\.\?)?]/
    };
  
    const pattern = regexPatterns[platform];
    return pattern && pattern.test(url);
  }
  const socialMediaChange = (e) => {
    const { name, value } = e.target;
    if (!isValidSocialUrl(value, name)) {
      toast.error(`Daxil edilmiş ${name} URL düzgün deyil.`);
      return;
    }
  
    const updatedSocialMediaAccounts = {
      ...localUserData.socialMediaAccounts,
      [name]: value,
    };
  
    const newUserData = {
      ...localUserData,
      socialMediaAccounts: updatedSocialMediaAccounts,
    };
    setLocalUserData(newUserData);
    updateUserData(newUserData);
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

  if (!localUserData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-info">
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
                    ) : (
                      <img
                        src={
                          `https://minio-server-4oyt.onrender.com/yalli/${localUserData.profilePictureUrl}` ||
                          `${profileDefaultImg}`
                        }
                        alt="Profile"
                      />
                    )}
                    <div
                      className="edit-icon dp-center"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      <CiEdit />
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
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <ul className="dp-cloumn gap-3">
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
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-12">
          <div className="info-right">
            <div className="dp-cloumn gap-2">
              <div className="country-drop-con">
                <select
                  value={localUserData.country}
                  onChange={(e) => handleCountryChange(e)}
                  className="profile-select"
                >
                  {localUserData.country ? "" : <option value="">Seçin</option>}
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
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
  );
};

export default ProfileInfo;
