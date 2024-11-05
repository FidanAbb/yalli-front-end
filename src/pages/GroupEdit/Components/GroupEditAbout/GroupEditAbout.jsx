import { useContext, useEffect, useState } from "react";
import { YalliContext } from "../../../../Context/YalliContext";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const GroupEditAbout = () => {
  const { updateGroup, findGroupByUserId, userID, groupDetailsByUserID } =
    useContext(YalliContext);
  const { groupID } = useParams();
  console.log(groupDetailsByUserID);
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
  console.log(formData);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Yalnız dəyişdirilmiş sahələri toplayırıq
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
      
    } catch (error) {
      console.error("Qrup məlumatlarını yeniləyərkən xəta baş verdi:", error);
      toast.error("Qrup məlumatları yenilənmədi: " + error.message);
    }
  };

  return (
    <div className="group-about">
      <div className="about-con">
        <form onSubmit={handleSubmit} action="">
          <textarea onChange={handleInputChange} name="description" value={formData?.description} id=""></textarea>
          <div className="text-center mt-5">
            <div className="save-btn ">
              <button type="submit">Dəyişiklikləri yadda saxla</button>
            </div>
            <Link className="back-btn" to="/profile/profile-community-edit">
              Ləğv et
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupEditAbout;
