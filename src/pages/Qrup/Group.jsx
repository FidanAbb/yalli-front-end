import React, {useState,useEffect} from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/group/hero/Hero";
import Main from "../../components/mentor/main/Main";
import { useSelector } from "react-redux";
const Group = () => {
  const [groupData, setGroupData] = useState([])
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  return (
    <>
    {console.log(forServerError)}
    
    <Header/>
      <Hero  setGroupData={setGroupData}/>
      <Main page="group" groupData={groupData} setGroupData={setGroupData}/>
      <Footer />
    </>
  );
};

export default Group