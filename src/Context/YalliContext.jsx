import { createContext, useEffect, useState } from "react";
import { getUserDataById, patchUserData } from "../redux/slice/user/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Create the context
export const YalliContext = createContext();
// Define the context provider component
const ContextYalli = ({ children }) => {
  const dispatch=useDispatch()
  const userFromStore = useSelector((state) => state.users.user);
  const initialData = {
    fullName: "",
    email: "",
    birthDate: "",
    city: "",
    country: "",
    profilePictureUrl: "",
    socialMediaAccounts: null,
  };
  const [userID, setUserID] = useState(null);
  const [localUserData, setLocalUserData] = useState(initialData);
  const [imageUrl, setImageUrl] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [loadingIamge,setLoadingImage]=useState(false)
  useEffect(() => {
    if (userID) {
      const imageKey = `profileImg-${userID}`; 
      const storedImage = localStorage.getItem(imageKey);
      if (storedImage) {
        setImageUrl(JSON.parse(storedImage));
      }
    }
  }, [userID]);
  useEffect(() => {
    if (base64Image && userID) {
      const imageKey = `profileImg-${userID}`; 
      localStorage.setItem(imageKey, JSON.stringify(base64Image));
      setImageUrl(base64Image);
    }
  }, [base64Image, userID]);
  useEffect(() => {
    const localUserDataJson = localStorage.getItem("userInfo");
    if (localUserDataJson) {
      const localUserDataParsed = JSON.parse(localUserDataJson);
      setLocalUserData(localUserDataParsed);
    }
  }, []);
  useEffect(() => {
    if (userID) {
      dispatch(getUserDataById(userID));
    }
  }, [userID]);
  useEffect(() => {
    if (userFromStore) {
      setLocalUserData(userFromStore);
      localStorage.setItem("userInfo", JSON.stringify(userFromStore));
    }
  }, [userFromStore]);
  useEffect(() => {
    if (userID) {
      localStorage.setItem("userID", JSON.stringify(userID));
    }
  }, [userID]);
  useEffect(() => {
    const userIdLocal = localStorage.getItem("userID");
    if (userIdLocal) {
      setUserID(JSON.parse(userIdLocal));
    }
  }, []);
  const updateUserData = (data) => {
    dispatch(patchUserData({ id: data.id, updatedData: data }));
    localStorage.setItem("userInfo", JSON.stringify(data));
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
        const updateUserDataOb = {
          ...localUserData,
          profilePictureUrl: imageUrl,
        };
        updateUserData(updateUserDataOb);
      } catch (errr) {
        console.log("upload da problem", errr);
      }
    }
  };
  const getImageName = async () => {
    setLoadingImage(true)
    try {
      const response = await axios.get(
        `https://yalli-back-end.onrender.com/v1/files/${localUserData.profilePictureUrl}`,
        { responseType: "arraybuffer" }
      );
      const contentType = response.headers['content-type'];
      const base64 = btoa(
        new Uint8Array(response.data) 
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
  
      const imageSrc = `data:${contentType};base64,${base64}`;
      if (imageSrc) {
        setBase64Image(imageSrc);
        localStorage.setItem("profileImg", JSON.stringify(imageSrc));
        setImageUrl(imageSrc);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }finally{
      setLoadingImage(false)
    }
  };
  useEffect(() => {
    if (localUserData.profilePictureUrl) {
      getImageName();
    }
  }, [localUserData.profilePictureUrl]);

  return (
    <YalliContext.Provider
      value={{
        setUserID,
        userID,
        localUserData,
        setLocalUserData,
        setImageUrl,
        imageUrl,
        updateUserData,
        setBase64Image,
        base64Image,
        handleImageUpload,
        getImageName,
        setLoadingImage,
        loadingIamge
      }}
    >
      {children}
    </YalliContext.Provider>
  );
};

export default ContextYalli;