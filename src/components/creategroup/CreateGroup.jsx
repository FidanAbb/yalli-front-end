import React, { useState, useRef } from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon";
import DownArrow from "../../components/ui/DownArrow";
import { useDispatch } from "react-redux";
import { postGroupData } from "../../redux/slice/group/group";
import axios from "axios";

const groupCategory = [
  "Yaşam",
  "Əyləncə",
  "Karyera",
  "Təhsil",
  "Səyahət",
  "Yerləşmə",
  "Qanunlar",
];

const CreateGroup = ({ setModal, setGroupumData }) => {
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    country: "",
    memberCount: 0,
    link: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState("");
  const [descriptionCount, setDescriptionCount] = useState(0);
  const maxDescriptionLength = 160;
  const minDescriptionLength = 50;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit description to maxDescriptionLength
    if (name === "description" && value.length <= maxDescriptionLength) {
      setGroupData({
        ...groupData,
        [name]: value,
      });
      setDescriptionCount(value.length); // Update character count
    } else if (name !== "description") {
      setGroupData({
        ...groupData,
        [name]: value,
      });
    }
  };

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
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        groupData.description.length < minDescriptionLength ||
        groupData.description.length > maxDescriptionLength
    ) {
      alert(`Description must be between ${minDescriptionLength} and ${maxDescriptionLength} characters.`);
      return;
    }

    try {
      const formattedData = {
        ...groupData,
        memberCount: parseInt(groupData.memberCount, 10),
        category: "LIFE",
        imageId: imageId,
      };

      dispatch(postGroupData(formattedData));
      setGroupumData((prev) => {
        if (prev && Array.isArray(prev.content)) {
          return {
            ...prev,
            content: [...prev.content, formattedData],
          };
        } else {
          return {
            ...prev,
            content: [formattedData],
          };
        }
      });
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    "Azərbaycan",
    "Türkiyə",
    "Rusiya",
    "Almaniya",
    "ABŞ",
    "Ukrayna",
    // more countries...
  ];
  const selectRef = useRef(null);

  const handleArrowClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
      <div className={styles["create_group"]}>
        <h1>Öz icmanı yarat</h1>
        <div className={styles["form"]}>
          <form onSubmit={handleSubmit}>
            <div
                className={styles["img"]}
                style={{
                  backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
            >
              {!imagePreview && <PlusIcon />}
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles["file_input"]}
              />
            </div>
            <input
                type="text"
                name="title"
                placeholder="İcmanın adı"
                className={styles["inp"]}
                onChange={handleChange}
            />

            <div className={styles["selected"]}>
              <select
                  name="country"
                  id="country"
                  placeholder="Ölkə"
                  onChange={handleChange}
                  ref={selectRef}
              >
                <option disabled selected>
                  Ölkə
                </option>
                {options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
              </select>
              <div className={styles["down_arrow"]} onClick={handleArrowClick}>
                <DownArrow />
              </div>
            </div>

            <div className={styles["selected"]}>
              <select
                  name="category"
                  id="category"
                  placeholder="Kateqoriya"
                  onChange={handleChange}
              >
                <option disabled selected>
                  Kateqoriya
                </option>
                {groupCategory.map((ctgry, index) => (
                    <option value={ctgry} key={index}>
                      {ctgry}
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
            />
            <input
                type="number"
                name="memberCount"
                placeholder="Üzv sayı"
                className={styles["inp"]}
                onChange={handleChange}
            />
            <div className={styles["textarea-container"]}>
            <textarea
                name="description"
                placeholder={`Haqqında (${minDescriptionLength}-${maxDescriptionLength} simvol)`}
                className={styles["inpp"]}
                onChange={handleChange}
                value={groupData.description}
                maxLength={maxDescriptionLength} // Ensures no more than 160 characters
            ></textarea>
              <div className={styles["char-counter"]}>
                {descriptionCount}/{maxDescriptionLength}
              </div>
              {descriptionCount < minDescriptionLength && (
                  <p className={styles["error"]}>
                    Minimum {minDescriptionLength} simvol daxil edin.
                  </p>
              )}
            </div>
            <button type="submit" disabled={descriptionCount < minDescriptionLength}>
              Yarat
            </button>
          </form>
        </div>
      </div>
  );
};

export default CreateGroup;
