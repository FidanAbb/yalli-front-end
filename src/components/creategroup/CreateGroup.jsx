import React, { useState } from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon";
import { useDispatch } from "react-redux";
import { postGroupData } from "../../redux/slice/group/group";
import axios from "axios";

const CreateGroup = ({ setModal }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...groupData,
        memberCount: parseInt(groupData.memberCount, 10),
        category: "LIFE",
        imageId: imageId,
      };

      dispatch(postGroupData(formattedData));
      setModal(false);
    } catch (error) {
      console.log(error);
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
          <select
            name="country"
            id="country"
            value="Ölkə"
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
            className={styles["inpp"]}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Yarat</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
