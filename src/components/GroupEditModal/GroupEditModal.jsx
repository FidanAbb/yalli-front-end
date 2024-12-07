import { YalliContext } from "../../Context/YalliContext";
import { useContext, useEffect, useState } from "react";
import "./editmodal.css";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { MdInfoOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
const GroupEditModal = () => {
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
  const {
    updateGroup,
    findGroupByUserId,
    userID,
    groupDetailsByUserID,
    groupsByUserID,
    groupID,
    setGroupEditModal,
    setGroupsByUserID,
    setEditGroupAfter
  } = useContext(YalliContext);
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
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    formData?.country || ""
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    formData?.category || ""
  );
  const [activeTab, setActiveTab] = useState("Ümumi Məlumat");
  const toggleCountryDropdown = () => setIsOpenCountry(!isOpenCountry);
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCheckedImage, setIsCheckedImage] = useState(false);
  const [changesDetected, setChangesDetected] = useState(false);

  const showToast = () => {
    toast.info(
      "Dəyişiklikləri yadda saxlamadan şəkli seçdiniz! Zəhmət olmasa, dəyişiklikləri yadda saxlayın."
    );
  };

  const handleCountryOptionClick = (option) => {
    setSelectedCountry(option);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: option,
    }));

    setIsOpenCountry(false);
  };
  const handleCategoryOptionClick = (value) => {
    setSelectedCategory(value);
    handleInputChange({ target: { name: "category", value } });
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
    setIsCategoryOpen(false);
  };

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
  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);
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
      setInitialFormData(formData);
      toast.success("Qrup məlumatları uğurla yeniləndi.");
      setEditGroupAfter(prev=>!prev)
    } catch (error) {
      console.error("Qrup məlumatlarını yeniləyərkən xəta baş verdi:", error);
      toast.error("Qrup məlumatları yenilənmədi: " + error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (file) {
      try {
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
          gallery: [...prevFormData.gallery, imageUrl],
        }));

        toast.success("Qrup məlumatları uğurla yeniləndi.");
        setSelectMode(false);
      } catch (err) {
        console.error("upload da problem", err);
        toast.error("Şəkil yüklənərkən problem oldu.");
      }
    }
  };
  const deletSelectedImages = () => {
    if (selectedImages.length <= 0) {
      toast.info("Zəhmət olmasa, şəkil seçin.");
    } else {
      const newGallery = formData.gallery.filter(
        (img) => !selectedImages?.includes(img)
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        gallery: newGallery,
      }));
      setSelectedImages([]);
      setSelectMode(false);
      // toast.info("Seçilmiş şəkillər silindi.");
    }
  };
  const toggleImageSelection = (imageId) => {
    setIsCheckedImage((prev) => !prev);
    setSelectedImages((prev) => {
      if (prev?.includes(imageId)) {
        return prev?.filter((id) => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  return (
    <div>
      <div className="editmodal">
        <div className="editmodal-con h-100">
        <div onClick={() => setGroupEditModal(false)} className="close-btn-rp ">
              <IoIosCloseCircleOutline className="icon" />
            </div>
          <div className="editmodal-left">
            <ul>
              <li
                onClick={() => setActiveTab("Ümumi Məlumat")}
                style={{
                  fontWeight: activeTab === "Ümumi Məlumat" ? 600 : "normal",
                }}
              >
                Ümumi Məlumat
              </li>
              <li
                onClick={() => setActiveTab("Haqqımızda")}
                style={{
                  fontWeight: activeTab === "Haqqımızda" ? 600 : "normal",
                }}
              >
                Haqqımızda
              </li>
              <li
                onClick={() => setActiveTab("Qalereya")}
                style={{
                  fontWeight: activeTab === "Qalereya" ? 600 : "normal",
                }}
              >
                Qalereya
              </li>
            </ul>
          </div>
          <div className="editmodal-right">
            <div onClick={() => setGroupEditModal(false)} className="close-btn rp-none">
              <IoIosCloseCircleOutline className="icon" />
            </div>
            <div className="right-con">
              {activeTab === "Ümumi Məlumat" && (
                <div className="group-edit-info">
                  <div className="top">
                    <div className="img-block">
                      <div className="img">
                        <img
                          src={
                            formData.imageId
                              ? `https://minio-server-4oyt.onrender.com/yalli/${formData.imageId}`
                              : ""
                          }
                          alt=""
                        />
                      </div>
                      <div className="change-img-btn">
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
                    </div>
                    <form onSubmit={handleSubmit} className="inputs-con">
                      <div className="input-con">
                        <input
                          name="title"
                          value={formData?.title}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </div>
                      <div className="country-con">
                        <div className="head" onClick={toggleCountryDropdown}>
                          <p>{formData.country || "Ölkələr"}</p>
                          <IoIosArrowDown />
                        </div>
                        {isOpenCountry && (
                          <div className="body">
                            {options.map((option, index) => (
                              <div
                                key={index}
                                className="option"
                                onClick={() => handleCountryOptionClick(option)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="category-con">
                        <div className="head" onClick={toggleCategoryDropdown}>
                          <div>
                            {selectedCategory
                              ? Object.keys(groupCategoryOptions).find(
                                  (key) =>
                                    groupCategoryOptions[key] ===
                                    selectedCategory
                                )
                              : "Kateqoriya"}
                          </div>
                          <IoIosArrowDown />
                        </div>
                        {isCategoryOpen && (
                          <div className="body">
                            {Object.entries(groupCategoryOptions).map(
                              ([az, en], index) => (
                                <div
                                  key={index}
                                  className="option"
                                  onClick={() => handleCategoryOptionClick(en)}
                                >
                                  {az}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <div className="input-con">
                        <input
                          name="link"
                          onChange={handleInputChange}
                          value={formData?.link}
                          type="text"
                        />
                      </div>
                      {hasChanges && (
                        <div className="bottom">
                          <div className="my-btns">
                            <button>Dəyişiklikləri yadda saxla</button>
                            <p onClick={() => setFormData(initialFormData)}>
                              Ləğv et
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}
              {activeTab === "Haqqımızda" && (
                <div className="about">
                  <div className="top">
                    <form onSubmit={handleSubmit}>
                      <textarea
                        name="description"
                        onChange={handleInputChange} // Bu hissəni düzgün bağladıq
                        value={formData?.description} // Dəyişiklikləri göstərmək üçün formData-dan istifadə edin
                        className="textarea"
                      />
                      {hasChanges && (
                        <div className="bottom">
                          <div className="my-btns">
                            <button>Dəyişiklikləri yadda saxla</button>
                            <p onClick={() => setFormData(initialFormData)}>
                              Ləğv et
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}
              {activeTab === "Qalereya" && (
                <div className="galery">
                  <div className="galery-con">
                    <div className="top-btns-con">
                      <div className="info-icon">
                        <MdInfoOutline />
                      </div>
                      <div className="select-btn">
                        <button
                          onClick={() => {
                            if (hasChanges) {
                              toast.info(
                                "Zəhmət olmasa, dəyişiklikləri yadda saxlayın və ya ləğv edin."
                              );
                              setSelectMode(false);
                            }else{
                              setSelectMode((prev) => !prev);
                            }
                          }}
                        >
                          {selectMode ? "Ləğv et" : "Seç"}
                        </button>
                      </div>
                    </div>
                    <div className="galery-img-con">
                      <form
                        onSubmit={handleSubmit}
                        action=""
                        className="h-100 relative"
                      >
                        <div className="row  g-4">
                          <div className="col-md-4 col-sm-6 col-6">
                            <div>
                              <label
                                htmlFor="file-input"
                                className="create-image box"
                              >
                                <FaPlus className="icon" />
                                <input
                                  id="file-input"
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={handleImageUpload}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                          {formData.gallery?.map((imageUrl, index) => (
                            <div
                              key={index}
                              className="col-md-4 col-sm-6 col-6"
                              onClick={() => toggleImageSelection(imageUrl)}
                            >
                              <div className="img-block">
                                <div className="images box">
                                  <img
                                    src={`https://minio-server-4oyt.onrender.com/yalli/${imageUrl}`}
                                    alt={`Gallery image ${index}`}
                                  />
                                  {selectMode && (
                                    <div
                                      className={`checkbox ${
                                        selectedImages.includes(imageUrl)
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <input
                                        checked={selectedImages?.includes(
                                          imageUrl
                                        )}
                                        onChange={() =>
                                          toggleImageSelection(imageUrl)
                                        }
                                        style={{
                                          opacity: "0",
                                          userSelect: "none",
                                        }}
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          {hasChanges && (
                            <div className="bottom">
                              <div className="my-btns">
                                <button>Dəyişiklikləri yadda saxla</button>
                                <p onClick={() => setFormData(initialFormData)}>
                                  Ləğv et
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                      {selectMode && (
                        <div className="bottom">
                          <div className="my-btns">
                            <button onClick={() => deletSelectedImages()}>
                              Seçilənləri sil
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setGroupEditModal(false)}
        className="black-background"
      ></div>
    </div>
  );
};

export default GroupEditModal;
