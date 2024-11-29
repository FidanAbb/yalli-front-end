import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { YalliContext } from "../../../../Context/YalliContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const GroupEditGallery = () => {
  const { updateGroup, findGroupByUserId, userID, groupDetailsByUserID } =
    useContext(YalliContext);
  const { groupID } = useParams();
  const [initialFormData, setInitialFormData] = useState({});
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCheckedImage, setIsCheckedImage] = useState(false);
  const [changesDetected, setChangesDetected] = useState(false);

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
  const [selectMode, setSelectMode] = useState(false); 

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
          toast.error("Qrup məlumatları yüklənə bilmədi:");
        });
    }
  }, [groupID, userID]);

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
      } catch (err) {
        console.error("upload da problem", err);
        toast.error("Şəkil yüklənərkən problem oldu.");
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    toast.info("Dəyişikliklər ləğv edildi.");
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

    if (Object.keys(changes).length === 0) {
      toast.info("Heç bir dəyişiklik aşkarlanmadı.");
      return;
    }

    try {
      await updateGroup(groupID, changes);
      setChangesDetected(false); 
    } catch (error) {
      console.error("Qrup məlumatlarını yeniləyərkən xəta baş verdi:", error);
      toast.error("Qrup məlumatları yenilənmədi: " + error.message);
    }
  };

  const deletSelectedImages = () => {
    const newGallery = formData.gallery.filter(
      (img) => !selectedImages?.includes(img)
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      gallery: newGallery,
    }));
    setSelectedImages([]);
    toast.info("Seçilmiş şəkillər silindi.");
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

  const checkForChanges=()=>{
    return JSON.stringify(initialFormData) !== JSON.stringify(formData)
  }
  useEffect(() => {
    setChangesDetected(checkForChanges());
  }, [formData, initialFormData]);
  return (
    <div className="group-gallery h-100">
      <div className="gallery-con h-100">
        <div className="head">
          <div className="info-icon">
            <IoInformationCircleOutline />
          </div>
          <div>
            <button
              style={{ zIndex: "1000", position: "relative" }}
              onClick={() => setSelectMode((prev) => !prev)}
              className="select-btn"
            >
              {selectMode ? "Ləğv et" : "Seç"}
            </button>
          </div>
        </div>
        <div className="body h-100">
          <form onSubmit={handleSubmit} action="" className="h-100 relative">
            <div className="row g-4">
              <div className="col-md-3 col-sm-6 col-12">
                <label htmlFor="file-input" className="create-image box">
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
              {formData.gallery?.map((imageUrl, index) => (
                <div key={index} className="col-md-3 col-sm-6 col-12">
                  <div className="img-block">
                    <div className="images box">
                      <img
                        src={`https://minio-server-4oyt.onrender.com/yalli/${imageUrl}`}
                        alt={`Gallery image ${index}`}
                      />
                      {selectMode && (
                        <div
                          className={`checkbox ${
                            selectedImages.includes(imageUrl) ? "active" : ""
                          }`}
                        >
                          <input
                            checked={selectedImages?.includes(imageUrl)}
                            onChange={() => toggleImageSelection(imageUrl)}
                            style={{ opacity: "0", userSelect: "none" }}
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
            <div className="btns-con">
              {(changesDetected || selectMode) && (
                <div>
                  <div className="save-btn">
                    <button
                      onClick={() =>
                        selectMode ? deletSelectedImages() : handleSubmit()
                      }
                    >
                      {selectMode
                        ? "Seçilənləri sil"
                        : "Dəyişiklikləri yadda saxla"}
                    </button>
                  </div>
                  <Link
                    className={selectMode?"back-btn none":"back-btn"}
                    onClick={handleCancel}
                  >
                    Ləğv et
                  </Link>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupEditGallery;
