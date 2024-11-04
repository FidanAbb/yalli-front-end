import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon";
import DownArrow from "../../components/ui/DownArrow";
import { useDispatch } from "react-redux";
import { postGroupData } from "../../redux/slice/group/group";
import axios from "axios";
import { toast } from "react-toastify";
import { YalliContext } from "../../Context/YalliContext";

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
  "Polşa",
  "Yunanıstan",
  "Sinqapur",
  "Braziliya",
  "Argentina",
  "Meksika",
];

const CreateGroup = ({ setModal, setGroupumData }) => {
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const { userID } = useContext(YalliContext);

  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    country: "",
    memberCount: 0,
    link: "",
    category: "",
  });
  console.log(groupData);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState("");
  console.log(imageId);

  const maxDescriptionLength = 160;
  console.log();

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
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
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
      groupData.memberCount <= 0 ||
      !groupData.description.trim()
    ) {
      toast.error("Bütün sahələri doldurun.");
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
      toast.success("Yeni qrup uğurla yaradıldı.");
      setModal(false);
    } catch (error) {
      console.error("Qrup yaratmaqda problem oldu", error);
      toast.error("Qrup yaratmaq uğursuz oldu.");
    }
  };

  const handleArrowClick = () => {
    selectRef.current?.focus();
  };
  return (
    <div className={styles["create_group"]}>
      <h1>Öz icmanı yarat</h1>
      <div className={styles["form"]}>
        <form onSubmit={handleSubmit}>
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
          <div className={styles["selected"]}>
            <select
              name="country"
              id="country"
              onChange={handleChange}
              ref={selectRef}
              style={{ width: "350px", padding: ".8rem" }}
              value={groupData.country || ""} // Bu, idarə olunan komponenti təmin edir
            >
              <option value="" disabled hidden>
                Ölkələr
              </option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles["selected"]}>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              ref={selectRef}
              style={{ width: "350px", padding: ".8rem" }}
              value={groupData.category} // Bu, idarə olunan komponenti təmin edir
            >
              <option value="" disabled hidden>
                Kateqoriya
              </option>
              {Object.entries(groupCategoryOptions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <div className={styles["down_arrow"]}>
              <DownArrow />
            </div>
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
              maxLength={maxDescriptionLength}
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
