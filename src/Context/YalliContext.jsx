import { createContext, useEffect, useState } from "react";

// Create the context
export const YalliContext = createContext();

// Define the context provider component
const ContextYalli = ({ children }) => {
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

  return (
    <YalliContext.Provider
      value={{
        setUserID,
        userID,
        localUserData,
        setLocalUserData,
        setImageUrl,
        imageUrl,
      }}
    >
      {children}
    </YalliContext.Provider>
  );
};

export default ContextYalli;
