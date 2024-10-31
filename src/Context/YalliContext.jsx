import { createContext, useEffect, useState } from "react";




// Create the context
export const YalliContext = createContext();

// Define the context provider component
const ContextYalli = ({ children }) => {
    const [userInfoLogin, setUserInfoLogin] = useState(null);
    const [userID,setUserID]=useState(null)
    useEffect(()=>{
        if(userID){
            localStorage.setItem("userID", JSON.stringify(userID));        
        }
    },[userID])
    useEffect(()=>{
        const userIdLocal=localStorage.getItem("userID"); 
        if(userIdLocal){
            setUserID(JSON.parse(userIdLocal))
        }
    },[])
    useEffect(()=>{
        const userInfoLoginLocal=localStorage.getItem("userInfoLogin")
        
        if(userInfoLoginLocal){
            setUserInfoLogin(JSON.parse(userInfoLoginLocal));
        }
    },[])
    return (
        <YalliContext.Provider value={{ userInfoLogin, setUserInfoLogin,setUserID,userID}}>
            {children}
        </YalliContext.Provider>
    );
};

export default ContextYalli