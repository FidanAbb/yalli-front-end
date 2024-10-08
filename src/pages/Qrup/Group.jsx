import React,{useState} from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/group/hero/Hero";
import Main from "../../components/mentor/main/Main";
const Group = () => {
  const [groupData, setGroupData] = useState([])
  return (
    <>
      <Header />
      <Hero  setGroupData={setGroupData}/>
      <Main page="group" groupData={groupData} setGroupData={setGroupData}/>
      <Footer />
    </>
  );
};

export default Group;
