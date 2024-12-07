import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon";
import DownArrow from "../../components/ui/DownArrow";
import { useDispatch } from "react-redux";
import { postGroupData } from "../../redux/slice/group/group";
import axios from "axios";
import { toast } from "react-toastify";
import { YalliContext } from "../../Context/YalliContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

const groupCategoryOptions = {
  LIFE: "Yaşam",
  CAREER: "Karyera",
  EDUCATION: "Təhsil",
  ENTERTAINMENT: "Əyləncə",
  TRAVEL: "Səyahət",
  LOCATION: "Yerləşmə",
  LAW: "Qanunlar",
  INNOVATION: "İnnovasiya",
  TECHNOLOGY: "Texnologiya",
  OTHER: "Digər",
};

const options = [
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

const CreateGroup = ({ setModal, setGroupumData }) => {
  const selectRef = useRef(null);
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const countryDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const { userID ,getCreatedGruopState,setGetCreatedGruopState} = useContext(YalliContext);

  const [showCountryDrop, setShowCountryDrop] = useState(false);
  const [showCategoryDrop, setShowCategoryDrop] = useState(false);
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    country: "",
    memberCount: 0,
    link: "",
    category: "",
  });
  const [imageId, setImageId] = useState("");
 
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://yalli-back-end.onrender.com/v1/groups"
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Qrupları çəkməkdə problem oldu", error);
      } finally {
        setLoadingGroups(false);
      }
    };
    fetchGroups();
  }, [getCreatedGruopState, groupData]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDrop(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDrop(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        setImageId(imageUrl);
      } catch (errr) {
        console.log("upload da problem", errr);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !groupData.title.trim() ||
      !groupData.link.trim() ||
      !groupData.memberCount ||
      !groupData.country ||
      groupData.memberCount <= 0 ||
      !groupData.description.trim()
    ) {
      toast.info("Bütün sahələri doldurun.");
      return;
    }
    const formattedData = {
      title: groupData.title,
      description: groupData.description,
      country: groupData.country,
      memberCount: parseInt(groupData.memberCount, 10),
      link: groupData.link,
      category: groupData.category || "LIFE",
      imageId: imageId,
      userId: userID,
    };
    try {
      const response = await axios.post(
        "https://yalli-back-end.onrender.com/v1/groups",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setGetCreatedGruopState(true);
      toast.success("Yeni qrup uğurla yaradıldı.");
      setModal(false);
    } catch (error) {
      console.error("Qrup yaratmaqda problem oldu", error);
      toast.error("Qrup yaratmaq uğursuz oldu.");
    }
  };
  const handleCountrySelect = (country) => {
    setGroupData((prevData) => ({
      ...prevData,
      country: country,
    }));
    setShowCountryDrop(false);
  };
 
  return (
    <div className={styles["create_group"]}>
      <h1>Öz icmanı yarat</h1>

      <div className={styles["form"]}>
        <form onSubmit={handleSubmit}>
          <div onClick={() => setModal(false)} className={styles["close-btn"]}>
            <IoIosCloseCircleOutline />
          </div>
          <div
            className={styles["img"]}
            style={{
              backgroundImage: imageId
                ? `url(https://yalli-back-end.onrender.com/v1/files/${imageId})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!imageId && <PlusIcon />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles["file_input"]}
              style={{ padding: "1rem 0" }}
            />
          </div>
          <input
            type="text"
            name="title"
            style={{ width: "350px", padding: ".8rem" }}
            placeholder="İcmanın adı"
            onChange={handleChange}
          />
          <div
            className={styles["country-dropdown"]}
            ref={countryDropdownRef}
            onClick={() => setShowCountryDrop(!showCountryDrop)}
          >
            <div
              style={{ width: "350px", padding: ".8rem" }}
              className={styles["head"]}
            >
              <div>
                <p style={{ color: groupData.country ? "black" : "#a2a2a2" }}>
                  {groupData.country || "Ölkə"}
                </p>
              </div>
              <DownArrow />
            </div>
            {showCountryDrop && (
              <div className={styles["body"]}>
                {options.map((option, index) => (
                  <div key={index} onClick={() => handleCountrySelect(option)}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className={styles["category-dropdown"]}
            ref={categoryDropdownRef}
            onClick={() => setShowCategoryDrop(!showCategoryDrop)}
          >
            <div
              style={{ width: "350px", padding: ".8rem" }}
              className={styles["category-head"]}
            >
              <div>
                <p style={{ color: groupData.category ? "black" : "#a2a2a2" }}>
                  {groupCategoryOptions[groupData.category] || "Kateqoriya"}
                </p>
              </div>
              <DownArrow />
            </div>
            {showCategoryDrop && (
              <div className={styles["category-body"]}>
                {Object.entries(groupCategoryOptions).map(([key, label]) => (
                  <div
                    key={key}
                    onClick={() =>
                      setGroupData((prevData) => ({
                        ...prevData,
                        category: key,
                      }))
                    }
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="url"
            name="link"
            placeholder="Link"
            className={styles["link"]}
            onChange={handleChange}
            style={{ width: "350px", padding: ".8rem" }}
          />
          <input
            type="number"
            name="memberCount"
            placeholder="Üzv sayı"
            className={styles["inp"]}
            onChange={handleChange}
            style={{ width: "350px", padding: ".8rem" }}
            min={0}
          />
          <div className={styles["textarea-container"]}>
            <textarea
              name="description"
              placeholder="Haqqında"
              className={styles["inpp"]}
              onChange={handleChange}
              value={groupData.description}
              style={{ width: "350px", padding: ".7rem" }}
            ></textarea>
          </div>
          <button type="submit">Yarat</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
