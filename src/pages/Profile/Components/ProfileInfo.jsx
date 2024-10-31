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
const ProfileInfo = () => {
  const initialData = {
    fullName: "",
    email: "",
    birthDate: "",
    city: "",
    country: "",
    profilePictureUrl: "",
    socialMediaAccounts: null,
  };
  const dispatch = useDispatch();
  const userFromStore = useSelector((state) => state.users.user);
  const [localUserData, setLocalUserData] = useState(initialData);
  console.log(localUserData);

  const { userInfoLogin, userID } = useContext(YalliContext);
  const [base64Image, setBase64Image] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  console.log(imageUrl);

  useEffect(() => {
    if (base64Image) {
      setImageUrl(base64Image);
    }
  }, [base64Image]);
  useEffect(() => {
    const localUserDataJson = localStorage.getItem("userInfo");
    if (localUserDataJson) {
      const localUserDataParsed = JSON.parse(localUserDataJson);
      setLocalUserData(localUserDataParsed);
    }
  }, []);

  // useEffect(() => {
  //   if (base64Image) {
  //     const newFormData = { ...localUserData, profilePictureUrl: base64Image };
  //     setLocalUserData(newFormData);
  //     localStorage.setItem("userInfo", JSON.stringify(newFormData));
  //     updateUserData(newFormData);
  //   }
  // }, [base64Image, localUserData]);

  useEffect(() => {
    if (userID) {
      dispatch(getUserDataById(userID));
    }
  }, [userID]);

  const updateUserData = (data) => {
    dispatch(patchUserData({ id: data.id, updatedData: data }));
    localStorage.setItem("userInfo", JSON.stringify(data));
  };
  useEffect(() => {
    if (userFromStore) {
      setLocalUserData(userFromStore);
      localStorage.setItem("userInfo", JSON.stringify(userFromStore));
    }
  }, [userFromStore]);
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (file) {
      try {
        console.log(file);
        const response = await axios.post(
          "https://yalli-back-end.onrender.com/v1/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = response.data;
        const updateUserDataOb = {
          ...localUserData,
          profilePictureUrl: imageUrl,
        };
        imagePatch(response.data);
        updateUserData(updateUserDataOb);
      } catch (errr) {
        console.log("upload da problem", errr);
      }
    }
  };
  const imagePatch = async (imageStirng) => {
    try {
      const response = await axios.patch(
        `https://yalli-back-end.onrender.com/v1/users/${userID}`,
        { profilePictureUrl: imageStirng }
      );
      console.log("Sekil yuklendi");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getImageName = async () => {
    setIsLoadingImage(true);
    try {
      const response = await axios.get(
        `https://yalli-back-end.onrender.com/v1/files/${localUserData.profilePictureUrl}`,
        { responseType: "text" } // SVG-ni mətn kimi qəbul et
      );
      console.log(response.data);
  
      // SVG məlumatını doğrudan base64 formatına çevirmək
      const svgBase64 = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(response.data)))}`;
      if (svgBase64) {
        setBase64Image(svgBase64);
      }
      setIsLoadingImage(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setIsLoadingImage(false);
    }
  };
  useEffect(() => {
    if (localUserData.profilePictureUrl) {
      getImageName();
    }
  }, [localUserData.profilePictureUrl]);

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
                    {isLoadingImage ? (
                      <p>Loading...</p> // Yüklənmə zamanı mesaj
                    ) : (
                      <img
                        src={
                          base64Image ||
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
