import { createContext, useEffect, useState } from "react";




// Create the context
export const YalliContext = createContext();

// Define the context provider component
const ContextYalli = ({ children }) => {
    const [userInfoLogin, setUserInfoLogin] = useState(null);
    useEffect(()=>{
        const userInfoLoginLocal=localStorage.getItem("userInfoLogin")
        
        if(userInfoLoginLocal){
            setUserInfoLogin(JSON.parse(userInfoLoginLocal));
        }
    },[])
    return (
        <YalliContext.Provider value={{ userInfoLogin, setUserInfoLogin}}>
            {children}
        </YalliContext.Provider>
    );
};

export default ContextYalli