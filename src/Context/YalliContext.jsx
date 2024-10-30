import { createContext, useEffect, useState } from "react";




// Create the context
export const YalliContext = createContext();

// Define the context provider component
const ContextYalli = ({ children }) => {
    const [userInfoLogin, setUserInfoLogin] = useState(null);
    const localBase64Image=localStorage.getItem("profileImage");
    const [base64Image,setBase64Image]=useState()
    useEffect(()=>{
        const userInfoLoginLocal=localStorage.getItem("userInfoLogin")
        
        if(userInfoLoginLocal){
            setUserInfoLogin(JSON.parse(userInfoLoginLocal));
        }
        if (localBase64Image) {
            setBase64Image(localBase64Image); // base64 şəkli set edirik
            console.log(userInfoLogin?.image);
          }
    },[localBase64Image,base64Image])
    return (
        <YalliContext.Provider value={{ userInfoLogin, setUserInfoLogin ,setBase64Image,base64Image}}>
            {children}
        </YalliContext.Provider>
    );
};

export default ContextYalli