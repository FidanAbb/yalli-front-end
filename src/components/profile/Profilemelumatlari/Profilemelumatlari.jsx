import React, { useState, useEffect } from "react";
import Fc from "../../ui/Fc";
import Tg from "../../ui/Telegram";
import Wp from "../../ui/Wp";
import Inst from "../../ui/Ins";
import styles from "./style.module.scss";
import DownArrow from "../../ui/DownArrow";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { getUserDataById, patchUserData } from "../../../redux/slice/user/user";
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
const links = [
  {
    icon: <Fc />,
  },
  {
    icon: <Tg />,
  },
  {
    icon: <Wp />,
  },
  {
    icon: <Inst />,
  },
];

const cityCategory = {
  Azərbaycan: ["Bakı", "Gəncə", "Sumqayıt", "Şəki", "Mingəçevir"],
  Türkiyə: ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa"],
  Rusiya: ["Moskva", "Sankt-Peterburq", "Kazan", "Soçi", "Novosibirsk"],
  Almaniya: ["Berlin", "Münhen", "Frankfurt", "Hamburg", "Stuttgart"],
  ABŞ: ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"],
  Ukrayna: ["Kiyev", "Xarkov", "Odessa", "Lvov", "Dnepropetrovsk"],
  "Böyük Britaniya": [
    "Londres",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Glasgow",
  ],
  Kanada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  Fransa: ["Paris", "Marsilya", "Lyon", "Toulouse", "Nice"],
  İsrail: ["Təl-Əviv", "Hayfa", "Yerusalim", "Beer-Sheva", "Nazaret"],
  Gürcüstan: ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Zugdidi"],
  İtaliya: ["Roma", "Milan", "Napoli", "Florensiya", "Torino"],
  Avstraliya: ["Sidney", "Melburn", "Brisbane", "Perth", "Adelaide"],
  İspaniya: ["Madrid", "Barselona", "Valensiya", "Sevilla", "Malaga"],
  Niderland: ["Amsterdam", "Rotterdam", "Lahey", "Utrecht", "Eindhoven"],
  Avstriya: ["Vyana", "Graz", "Linz", "Salzburg", "Innsbruck"],
  İsveç: ["Stokholm", "Göteborg", "Malmö", "Uppsala", "Västerås"],
  Belçika: ["Brüssel", "Antwerpen", "Gent", "Liège", "Brugge"],
  Norveç: ["Oslo", "Bergen", "Stavanger", "Trondheim", "Drammen"],
  Finlandiya: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
  Macarıstan: ["Budapeşt", "Debrecen", "Szeged", "Miskolc", "Pécs"],
  Polşa: ["Varşava", "Krakow", "Wroclaw", "Poznan", "Gdansk"],
  Yunanıstan: ["Afina", "Selanik", "Patras", "Larisa", "Heraklion"],
  Slovakiya: ["Bratislava", "Košice", "Prešov", "Nitra", "Žilina"],
  Litva: ["Vilnius", "Kaunas", "Klaipeda", "Šiauliai", "Panevėžys"],
  Latviya: ["Riga", "Daugavpils", "Liepaja", "Jelgava", "Ventspils"],
  Estoniya: ["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve"],
  Qazaxıstan: ["Almatı", "Nur-Sultan", "Şımkent", "Karaqanda", "Aktobe"],
  BƏƏ: ["Dubay", "Əbu-Dabi", "Şarika", "Əl-Ayn", "Füceyre"],
  Yaponiya: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo"],
  İran: ["Tehran", "İsfahan", "Şiraz", "Təbriz", "Meşhed"],
  "Səudiyyə Ərəbistanı": ["Riyad", "Ciddə", "Məkkə", "Medinə", "Dammam"],
  Belarus: ["Minsk", "Brest", "Hrodna", "Vitebsk", "Gomel"],
  Moldova: ["Kişinev", "Tiraspol", "Bălți", "Cahul", "Orhei"],
  Qırğızıstan: ["Bişkek", "Oş", "Jalal-Abad", "Karakol", "Tokmok"],
  Tacikistan: ["Düşənbə", "Xucənd", "Bokhtar", "Kulob", "Tursunzoda"],
  Türkmənistan: ["Aşqabad", "Daşoğuz", "Mary", "Balkanabat", "Türkmenabat"],
  Özbəkistan: ["Daşkənd", "Səmərqənd", "Buxara", "Xivə", "Fərgana"],
  Malayziya: ["Kuala Lumpur", "George Town", "Ipoh", "Kuching", "Malacca"],
  Sinqapur: ["Sinqapur Şəhəri"],
  Braziliya: [
    "Sao Paulo",
    "Rio de Janeiro",
    "Brasilia",
    "Salvador",
    "Fortaleza",
  ],
  Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
  Meksika: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Cancún"],
  Vietnam: ["Hanoi", "Ho Chi Minh", "Da Nang", "Haiphong", "Nha Trang"],
  "Bali (İndoneziya)": ["Denpasar", "Ubud", "Seminyak", "Kuta", "Jimbaran"],
  İsveçrə: ["Zürih", "Cenevrə", "Bazel", "Lozan", "Bern"],
  Portuqaliya: ["Lissabon", "Porto", "Braga", "Coimbra", "Faro"],
  "Cənubi Koreya": ["Seul", "Busan", "Incheon", "Daegu", "Daejeon"],
};

const Profilemelumatlari = ({ userData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [searchCountry, setSearchCountry] = useState("");
  const [showCountryOptions, setShowCountryOptions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryCategory);

  const [searchCity, setSearchCity] = useState("");
  const [showCityOptions, setShowCityOptions] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [allUserData, setAllUserData] = useState({
    ...user,
  });

  useEffect(() => {
    dispatch(getUserDataById(parseInt(userData.id)));
  }, [dispatch]);

  useEffect(() => {
    setAllUserData(user);
  }, [user]);

  console.log(allUserData)

  const handleCountryChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCountry(value);

    const filtered = countryCategory.filter((country) =>
      country.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };

  const handleCityChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCity(value);

    const filtered = (cityCategory[searchCountry] || []).filter((city) =>
      city.toLowerCase().includes(value)
    );
    setFilteredCities(filtered);
  };

  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState("");
  const [image, setImage] = useState(null);
  


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://yalli-back-end.onrender.com/v1/files/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          setImageId(response.data);
          console.log(imageId)
        }

        dispatch(patchUserData({ 
          id: parseInt(allUserData.id), 
          updatedData: { profilePictureUrl: `https://minio-server-4oyt.onrender.com/yalli/${imageId}`} } 
        ));
      } catch (error) {
        console.error("Image upload failed", error);
      }

    }
  };

  return (
    <div className={styles["profile_melumatlari"]}>
      <section>
        <h1>Profil Məlumatlarım</h1>

        <div className={styles["left_side"]}>
          <div className={styles["user_card"]}>
            <div className={styles["left"]}>
              <img src={`https://minio-server-4oyt.onrender.com/yalli/${allUserData.profilePictureUrl}` || imagePreview} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles["image_inp"]}
              />
              <h2>{allUserData?.fullName}</h2>
              <p>
                {allUserData?.country?.charAt(0).toUpperCase() +
                  allUserData?.country?.slice(1).toLowerCase()}
              </p>
            </div>
            <div className={styles["right"]}>
              <input
                type="text"
                name=""
                id=""
                placeholder={`${allUserData.fullName}`}
              />
              <input type="date" name="" id="" />
              <input type="email" name="" id="" placeholder={`${allUserData.email || "E-poçt ünvanı"}`} />
            </div>
          </div>
        </div>
        <div className={styles["right_side"]}>
          <div className={styles["left"]}>
              <ul>
            {links.map((link,i) => (
                <li key={i}>{link.icon}</li>
              ))}
              </ul>
          </div>
          <div className={styles["right"]}>
            <input type="url" name="" id="" placeholder="facebook" />
            <input type="url" name="" id="" placeholder="telegram" />
            <input type="url" name="" id="" placeholder="whatsapp" />
            <input type="url" name="" id="" placeholder="instagram" />
          </div>
        </div>
      </section>

      <div className={styles["right_sidee"]}>
        <div className={styles["country_select"]}>
          <input
            type="text"
            className={styles["select"]}
            placeholder="Ölkə"
            value={
              !searchCountry
                ? userData.country?.charAt(0).toUpperCase() +
                  userData?.country?.slice(1).toLowerCase()
                : searchCountry
            }
            onChange={handleCountryChange}
            onClick={() => setShowCountryOptions(!showCountryOptions)}
            onBlur={() => setTimeout(() => setShowCountryOptions(false), 200)}
          />

          {showCountryOptions && (
            <div className={styles["options"]}>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, i) => (
                  <div
                    key={i}
                    className={styles["p"]}
                    onClick={() => {
                      setSearchCountry(country);
                      setShowCountryOptions(false);
                      setFilteredCities(cityCategory[country] || []); // Şehir listesini güncelle
                    }}
                  >
                    {country}
                  </div>
                ))
              ) : (
                <div className={styles["p"]}>Heç bir ölkə tapılmadı</div>
              )}
            </div>
          )}

          <div
            className={styles["down_arrow"]}
            onClick={() => setShowCountryOptions(!showCountryOptions)}
          >
            <DownArrow />
          </div>
        </div>
        <div className={styles["country_select"]}>
          <input
            type="text"
            className={styles["select"]}
            placeholder="Şəhər"
            value={searchCity}
            onChange={handleCityChange}
            onClick={() => setShowCityOptions(!showCityOptions)}
            onBlur={() => setTimeout(() => setShowCityOptions(false), 200)}
          />

          {showCityOptions && (
            <div className={styles["options"]}>
              {filteredCities.length > 0 ? (
                filteredCities.map((city, i) => (
                  <div
                    key={i}
                    className={styles["p"]}
                    onClick={() => {
                      setSearchCity(city);
                      setShowCityOptions(false);
                    }}
                  >
                    {city}
                  </div>
                ))
              ) : (
                <div className={styles["p"]}>Heç bir şəhər tapılmadı</div>
              )}
            </div>
          )}

          <div
            className={styles["down_arrow"]}
            onClick={() => setShowCityOptions(!showCityOptions)}
          >
            <DownArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilemelumatlari;
