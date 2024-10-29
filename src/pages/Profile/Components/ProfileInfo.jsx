import { MdOutlineDateRange } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataById, patchUserData } from "../../../redux/slice/user/user";
import { CiEdit } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getImageFile, uploadImageFIle } from "../../../redux/slice/file/file";
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
  
  
  const imageSrc = useSelector(state => state.file.file); 
  console.log(imageSrc);
  
  useEffect(() => {
    const localUserDataJson = localStorage.getItem("userInfo");
    console.log("LocalStorage Data:", localUserDataJson);
    if (localUserDataJson) {
      const localUserDataParsed = JSON.parse(localUserDataJson);
      setLocalUserData(localUserDataParsed);
      dispatch(getUserDataById(67));
    }
  }, [dispatch]);
 
  const updateUserData = (data) => {
    dispatch(patchUserData({ id: data.id, updatedData: data }));
    localStorage.setItem("userInfo", JSON.stringify(data));
  };
  useEffect(() => {
    if (userFromStore) {
      setLocalUserData(userFromStore); // Redux-dan alınan məlumatları state-də saxlayır
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
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadImageFIle(file))
        .unwrap()
        .then(response => {
          dispatch(getImageFile(response));
  
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result; // Base64 formatında şəkil
            console.log(base64String);
  
            const updatedData = {
              ...localUserData,
              profilePictureUrl: base64String, // Base64 formatında şəkil URL-i
            };
  
            // localUserData state-ni yeniləyin
            setLocalUserData(updatedData);
            // localStorage-da saxlayın
            localStorage.setItem("userInfo", JSON.stringify(updatedData));
          };
  
          reader.readAsDataURL(file); // Bu çağırış burada olmalıdır
        })
        .catch(error => {
          console.log("Failed to upload file:", error);
        });
    }
  };
  
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
                    {imageSrc?
                  <img src={localUserData.profilePictureUrl} alt="Profile" />
                      :<img
                        src="../../../../src/pages/Profile/assets/img/default-profile-img.webp"
                        alt="Default Profile"
                      />
                    }
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
