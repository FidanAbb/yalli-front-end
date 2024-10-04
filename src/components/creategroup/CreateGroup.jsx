import React, { useState } from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon";
import { useDispatch } from "react-redux";
import { postGroupData } from "../../redux/slice/group/group";
const CreateGroup = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const formattedData = {
      ...groupData,
      memberCount: parseInt(groupData.memberCount, 10),
      category: "LIFE",
    };

    formData.append("data", JSON.stringify(formattedData));
    if (image) {
      formData.append("image", image);
    }
    dispatch(postGroupData(formData));
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
          <select
            name="country"
            id="country"
            placeholder="Ölkə"
            className={styles["inp"]}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="AZ">AZ</option>
          </select>
          <select
            name="category"
            id="category"
            placeholder="Kateqoriya"
            className={styles["inp"]}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="yaşam">Yaşam</option>
            <option value="əyləncə">Əyləncə</option>
          </select>
          <input
            type="url"
            name="link"
            placeholder="Link"
            className={styles["inp"]}
            onChange={handleChange}
          />
          <input
            type="number"
            name="memberCount"
            placeholder="Üzv sayı"
            className={styles["inp"]}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Haqqında (50-160 simvol)"
            className={styles["inp"]}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Yarat</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
