import { useContext, useEffect, useState } from "react";
import { YalliContext } from "../../../../Context/YalliContext";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  const { updateGroup ,findGroupByUserId,userID,groupDetailsByUserID} = useContext(YalliContext);
  const { groupID, } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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
  console.log(formData);
  useEffect(() => {
    if (groupDetailsByUserID) {
      const newFormData = {
        title: groupDetailsByUserID.title || "",
        description: groupDetailsByUserID.description || "",
        imageId: groupDetailsByUserID.imageId || "",
        link: groupDetailsByUserID.link || "",
        about: groupDetailsByUserID.about || "",
        gallery: groupDetailsByUserID.gallery || [],
        country: groupDetailsByUserID.country || "",
        category: groupDetailsByUserID.category || "LIFE",
      };
      setFormData(newFormData);
      setInitialFormData(newFormData); // Başlanğıc dəyərləri qurun
    }
  }, [groupDetailsByUserID]);

  useEffect(() => {
    if (groupID && userID) {
      findGroupByUserId(groupID, userID).then(data => {
        setFormData({ ...data });
      }).catch(error => {
        console.error('Error fetching group details:', error);
        toast.error('Qrup məlumatları yüklənə bilmədi: ' + error.message);
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
        setFormData({
          ...formData,
          imageId: imageUrl,
        });
      } catch (errr) {
        console.log("upload da problem", errr);
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== initialFormData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});
  
    if (Object.keys(changes).length === 0) {
      toast.info("Heç bir dəyişiklik aşkarlanmadı.");
      return;
    }
  console.log(changes);
  
    try {
      
      await updateGroup(groupID, changes);
      setInitialFormData(formData); // Yenilənmiş məlumatları başlanğıc kimi saxlayın
      toast.success("Qrup məlumatları uğurla yeniləndi!");
    } catch (error) {
      console.error("Formu təqdim etmək mümkün olmadı", error);
      toast.error("Qrup məlumatlarını yeniləmək mümkün olmadı: " + error.message);
    }
  };
  

  return (
    <div className="all-info">
      <div>
        <div className="image-block">
          <img src="../../../../../src/assets/img/event_detail.png" alt="" />
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
                defaultValue="Kateqoriya"
                value={formData?.category}
                onChange={handleInputChange}
              >
                {Object.entries(groupCategoryOptions).map(([az, en], index) => (
                  <option key={index} value={az}>
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
            <p>Ləğv et</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupEditAllInfo;
