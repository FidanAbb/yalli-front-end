import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon";
import DownArrow from "../../components/ui/DownArrow";
import { useDispatch } from "react-redux";
import { postGroupData } from "../../redux/slice/group/group";
import axios from "axios";
import { toast } from "react-toastify";

const groupCategory = [
  "Yaşam", "Əyləncə", "Karyera", "Təhsil", "Səyahət", "Yerləşmə", "Qanunlar",
];

const options = [
  "Azərbaycan", "Türkiyə", "Rusiya", "Almaniya", "ABŞ", "Ukrayna", "Böyük Britaniya", 
  "Kanada", "Fransa", "İsrail", "Gürcüstan", "İtaliya", "Avstraliya", "İspaniya", 
  "Niderland", "Avstriya", "İsveç", "Belçika", "Norveç", "Finlandiya", "Polşa", "Yunanıstan", 
  "Sinqapur", "Braziliya", "Argentina", "Meksika"
];

const CreateGroup = ({ setModal, setGroupumData }) => {
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const [groups,setGroups]=useState([]);
  const [loadingGroups,setLoadingGroups]=useState(true);
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    country: "",
    memberCount: 0,
    link: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState("");
  const maxDescriptionLength = 160;

  useEffect(()=>{
    const fetchGroups=async()=>{
      try{
        const response=await axios.get("https://yalli-back-end.onrender.com/v1/groups")
        console.log(response.data);
        setGroups(response.data);
      }catch(error){
        console.error("Qrupları çəkməkdə problem oldu", error)
      }finally{
        setLoadingGroups(false)
      }
    }
    fetchGroups()
  },[])
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
    setGroupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://yalli-back-end.onrender.com/v1/files/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.status === 201) {
          setImageId(response.data);
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error("Xahiş olunur bir şəkil seçin.");
      return;
    }
    if (!groupData.title.trim()) {
      toast.error("Xahiş olunur icmanın adını daxil edin.");
      return;
    }
    
    if (!groupData.country) {
      toast.error("Xahiş olunur ölkəni seçin.");
      return;
    }
    
    if (!groupData.category) {
      toast.error("Xahiş olunur kateqoriyanı seçin.");
      return;
    }
    
    if (!groupData.link.trim()) {
      toast.error("Xahiş olunur keçid (link) daxil edin.");
      return;
    }
    
    if (!groupData.memberCount || groupData.memberCount <= 0) {
      toast.error("Xahiş olunur üzv sayını daxil edin.");
      return;
    }
    
    if (!groupData.description.trim()) {
      toast.error("Xahiş olunur 'Haqqında' hissəsini doldurun.");
      return;
    }
    
    if (!imagePreview) {
      toast.error("Xahiş olunur bir şəkil seçin.");
      return;
    }
    
    const formattedData = {
      title: groupData.title, 
      description: groupData.description, 
      country: groupData.country,
      memberCount: parseInt(groupData.memberCount, 10), 
      link: groupData.link, 
      category: groupData.category || "LIFE", 
      imageId, 
      userId: 67, 
    };
    console.log(formattedData);
    
    try{
      const response =await axios.post("https://yalli-back-end.onrender.com/v1/groups",formattedData,{
        headers:{
          "Content-Type":"application/json",
        },
      })
      setGroupumData((prev) => ({
        ...prev,
        content: prev?.content ? [...prev.content, response.data] : [response.data],
      }));
      toast.success("Yeni qrup uğurla yaradıldı.");
      setModal(false);
    } catch(error){
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
              placeholder="Ölkə"
              onChange={handleChange}
              ref={selectRef}
              style={{ width: "350px", padding: ".8rem" }}
              defaultValue="Ölkə"
            >
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
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
              style={{ width: "350px", padding: ".8rem" }}
              defaultValue="Kateqoriya"
            >
              {groupCategory.map((ctgry, index) => (
                <option key={index} value={ctgry}>{ctgry}</option>
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
          <button type="submit">
            Yarat
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
