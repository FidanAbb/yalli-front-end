import { useContext, useEffect, useState } from "react";
import { YalliContext } from "../../../../Context/YalliContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const groupCategoryOptions = {
  Yaşam: "LIFE",
  Əyləncə: "ENTERTAINMENT",
  Karyera: "CAREER",
  Təhsil: "EDUCATION",
  Səyahət: "TRAVEL",
  Yerləşmə: "LOCATION",
  Qanunlar: "LAW",
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
const GroupEditAllInfo = () => {
  const { updateGroup, findGroupByUserId, userID, groupDetailsByUserID } =
    useContext(YalliContext);
  const { groupID } = useParams();
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageId: "",
    link: "",
    about: "",
    gallery: [],
    country: "",
    category: "LIFE",
  });
  useEffect(() => {
    if (groupDetailsByUserID) {
      const newFormData = {
        title: groupDetailsByUserID.title,
        description: groupDetailsByUserID.description,
        imageId: groupDetailsByUserID.imageId,
        link: groupDetailsByUserID.link,
        about: groupDetailsByUserID.about,
        gallery: groupDetailsByUserID.gallery || [],
        country: groupDetailsByUserID.country,
        category: groupDetailsByUserID.category,
      };
      setFormData(newFormData);
      setInitialFormData(newFormData);
    }
  }, [groupDetailsByUserID]);

  useEffect(() => {
    if (groupID && userID) {
      findGroupByUserId(groupID, userID)
        .then((data) => {
          setFormData({ ...data });
        })
        .catch((error) => {
          console.error("Error fetching group details:", error);
          toast.error("Qrup məlumatları yüklənə bilmədi: " + error.message);
        });
    }
  }, [groupID, userID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageId: imageUrl,
        }));
      } catch (err) {
        console.log("upload da problem", err);
        toast.error("Şəkil yüklənərkən problem oldu.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== initialFormData[key]) {
        acc[key] = formData[key];
      } else {
        acc[key] = initialFormData[key];
      }
      return acc;
    }, {});
    console.log(changes);

    if (Object.keys(changes).length === 0) {
      toast.info("Heç bir dəyişiklik aşkarlanmadı.");
      return;
    }

    try {
      await updateGroup(groupID, changes);
    } catch (error) {
      console.error("Qrup məlumatlarını yeniləyərkən xəta baş verdi:", error);
      toast.error("Qrup məlumatları yenilənmədi: " + error.message);
    }
  };

  return (
    <div className="all-info">
      <div>
        <div className="image-block">
          <img
            src={
              formData.imageId
                ? `https://minio-server-4oyt.onrender.com/yalli/${formData.imageId}`
                : ""
            }
            alt=""
          />
        </div>
        <div className="image-change-btn">
          <label htmlFor="file-input" className="button">
            Şəkili dəyişdir
          </label>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
        <div>
          <form onSubmit={handleSubmit} action="" className="form">
            <div>
              <input
                name="title"
                value={formData?.title}
                onChange={handleInputChange}
                className="group-name-input"
                type="text"
              />
            </div>
            <div className="select">
              <select
                name="country"
                id="country"
                style={{ width: "350px", padding: ".8rem" }}
                value={formData?.country}
                onChange={handleInputChange}
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
            <div>
              <select
                name="category"
                id="category"
                style={{ width: "350px", padding: ".8rem" }}
                value={formData?.category}
                onChange={handleInputChange}
              >
                {Object.entries(groupCategoryOptions).map(([az, en], index) => (
                  <option key={index} value={en}>
                    {az}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input type="text" name="" id="" />
            </div>
            <div className="save-btn ">
              <button>Dəyişiklikləri yadda saxla</button>
            </div>
            <Link className="back-btn" to="/profile/profile-community-edit">
              Ləğv et
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupEditAllInfo;
