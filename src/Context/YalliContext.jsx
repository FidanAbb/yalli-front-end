import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { getUserDataById, patchUserData } from "../redux/slice/user/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FetchCountries from "../components/Countrys/FetchCountryCodes";

export const YalliContext = createContext();
const ContextYalli = ({ children }) => {
  const dispatch = useDispatch();
  const userFromStore = useSelector((state) => state.users.user);
  const afterRegister = localStorage.getItem("afterRegister");

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
  const [loadingIamge, setLoadingImage] = useState(false);
  const [groupsByUserID, setGroupsByUserID] = useState();
  const [group, setGroup] = useState(null);
  const [groupDetailsByUserID, setGroupDetailsByUserID] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [myEvents, setMyEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isLogin, setIsLogin] = useState("");
  const [clickCountryToMembers, setClickCountryToMembers] = useState("");
  const [afterRegisterState, setAfterRegisterState] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [hideGroupEdit, setHideGroupEdit] = useState(true);
  const [isRegisterOtp, setIsRegisterOtp] = useState(() => {
    const savedValue = localStorage.getItem("isRegisterOtp");
    return savedValue ? JSON.parse(savedValue) : false;
  });
  const [allGroups,setAllGroups]=useState([])
  const [mentorCountrys,setMentorCountrys]=useState(null)
  const [mentors, setMentors] = useState([]);

  const [groupID,setGroupID]=useState(null)
  const [groupEditModal,setGroupEditModal]=useState(false)
console.log(groupID);
























  useEffect(() => {
    fetchMentors();
  }, []);
  const fetchMentors = async () => {
    try {
      const response = await axios.get(
        "https://yalli-back-end.onrender.com/v1/mentors/search",
        {
          headers: {
            Accept: "application/json",
          },
          params: {
            page: 0,
            size: 100,
            sort: "id",
          },
        }
      );

      if (response) {
        console.log("Fetched Data:", response.data.content);
        setMentors(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
      }
    }
  };
  
  useEffect(() => {
    localStorage.setItem("isRegisterOtp", JSON.stringify(isRegisterOtp));
  }, [isRegisterOtp]);

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const accessTokenStorage = localStorage.getItem("accessToken");
    if (accessTokenStorage) {
      setAccessToken(accessTokenStorage);
    }
  }, []);
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
        localStorage.setItem("imgUrl", response.data);
        updateUserData(updateUserDataOb);
        setLocalUserData(updateUserDataOb);
      } catch (errr) {
        console.log("upload da problem", errr);
      }
    }
  };
  const getGroupByUserID = async (userID) => {
    try {
      const response = await axios.get(
        `https://yalli-back-end.onrender.com/v1/groups/users/${userID}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.data.content) {
        setGroupsByUserID(response.data.content);
      }
    } catch (error) {
      console.error("Xəta baş verdi:", error.response);
    }
  };
  useEffect(() => {
    if (userID) {
      getGroupByUserID(userID);
    }
  }, [userID]);
  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const updateGroup = async (groupId, groupData) => {
    try {
      const response = await axios.put(
        `https://yalli-back-end.onrender.com/v1/groups/${groupId}`,
        groupData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setGroup(response.data);
      console.log("Qrup məlumatı yeniləndi:", response.data);
      
    } catch (error) {
      console.error("Qrupu yeniləmək alınmadı:", error);
      if (
        error.response &&
        error.response.data.message === "GROUP_RENAME_LIMIT_EXCEEDED"
      ) {
        toast.error(
          "Qrupun adının dəyişdirilməsi limiti keçildi. Lütfən, sonra yenidən cəhd edin."
        );
      } else {
        toast.error("Qrupu yeniləmək alınmadı: " + error.message);
      }
    }
  };
  const findGroupByUserId = useCallback(async (groupId, userId) => {
    try {
      const url = `https://yalli-back-end.onrender.com/v1/groups/${groupId}/users/${userId}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setGroupDetailsByUserID(response.data);
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
      throw error;
    }
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://yalli-back-end.onrender.com/v1/events?title=&country=&",
          {
            params: {
              page: 0,
              size: 10,
            },
            headers: {
              accept: "*/*",
              token: localStorage.getItem("accessToken"),
            },
          }
        );
        setMyEvents(response.data.content);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);
  const getAllGroups = async () => {
    try {
      const response = await axios.get('https://yalli-back-end.onrender.com/v1/groups');
      setAllGroups(response.data.content); 
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }
  
  useEffect(()=>{
    getAllGroups();
  },[])
  
  const fetchAllUsers = async () => {
    try {
      let page = 0;
      let allUsers = [];
      let hasMore = true;
      while (hasMore) {
        const response = await axios.get(
          `https://yalli-back-end.onrender.com/v1/users/search?page=${page}&size=20`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );

        allUsers = [...allUsers, ...response.data.content];
        page++;
        hasMore = !response.data.last;
      }

      return allUsers;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchAllUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);
  const deleteUserAccount = async (userID) => {
    try {
      const response = await axios.delete(
        `https://yalli-back-end.onrender.com/v1/users/delete/${userID}`
      );
      toast.success("İstifadəçi hesabı uğurla silindi.");
    } catch (error) {
      // Xəta baş verərsə, xəta mesajı göstərin
      console.error("Hesabı silmək mümkün olmadı:", error.response);
      toast.error(
        `Hesabı silmək mümkün olmadı: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

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
        setLoadingImage,
        loadingIamge,
        groupsByUserID,
        setGroupsByUserID,
        updateGroup,
        group,
        findGroupByUserId,
        groupDetailsByUserID,
        setGroupDetailsByUserID,
        aboutRef,
        scrollToAbout,
        allUsers,
        setAllUsers,
        deleteUserAccount,
        setIsLogin,
        isLogin,
        accessToken,
        setClickCountryToMembers,
        clickCountryToMembers,
        events,
        setEvents,
        filteredEvents,
        setFilteredEvents,
        setCountries,
        countries,
        setIsRegisterOtp,
        isRegisterOtp,
        setAfterRegisterState,
        afterRegisterState,
        hideGroupEdit,
        setHideGroupEdit,
        setMentorCountrys,
        mentorCountrys,
        setMentors,
        mentors,
        allGroups,
        setGroupEditModal,
        groupEditModal,
        groupID,
        setGroupID
      }}
    >
      {children}
    </YalliContext.Provider>
  );
};

export default ContextYalli;
