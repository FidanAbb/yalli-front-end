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
const ProfileInfo = () => {
  const {
    localUserData,
    setLocalUserData,
    imageUrl,
    updateUserData,
    handleImageUpload,
    loadingImage,
    allUsers
  } = useContext(YalliContext);
console.log(allUsers);

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
    console.log(selectedCountry);

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

  const countries = [
    { name: "Canada", cities: ["Toronto", "Vancouver", "Montreal"] },
    { name: "USA", cities: ["New York", "Los Angeles", "Chicago"] },
    { name: "Turkey", cities: ["Istanbul", "Ankara", "Izmir"] },
  ];

  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   if (file) {
  //     try {
  //       console.log(file);
  //       const response = await axios.post(
  //         "https://yalli-back-end.onrender.com/v1/files/upload",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       const imageUrl = response.data;
  //       const updateUserDataOb = {
  //         ...localUserData,
  //         profilePictureUrl: imageUrl,
  //       };
  //       imagePatch(response.data);
  //       updateUserData(updateUserDataOb);
  //     } catch (errr) {
  //       console.log("upload da problem", errr);
  //     }
  //   }
  // };
  // const getImageName = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://yalli-back-end.onrender.com/v1/files/${localUserData.profilePictureUrl}`,
  //       { responseType: "text" }
  //     );

  //     const svgBase64 = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(response.data)))}`;
  //     if (svgBase64) {
  //       setBase64Image(svgBase64);
  //       localStorage.setItem("profileImg",JSON.stringify(svgBase64))
  //       setImageUrl(svgBase64)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //   }
  // };

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
                      <p>Loading...</p> // Yüklənmə zamanı mesaj
                    ) : (
                      <img
                        src={
                          imageUrl ||
                          "../../../../src/pages/Profile/assets/img/default-profile-img.webp"
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
                    {localUserData.city ? "," : ""}{" "}
                    {localUserData.city ? localUserData.city : ""}
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
                  <p>Facebook</p>
                </li>
                <li>
                  <div className="telegram-icon dp-center">
                    <BiLogoTelegram className="icon" />
                  </div>
                  <p>Telegram</p>
                </li>
                <li>
                  <FaWhatsapp className="icon what-icon" />
                  <p>Whatsapp</p>
                </li>
                <li>
                  <IoLogoInstagram className="icon" />
                  <p>Instagram</p>
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
              <div className="city-drop-con">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
