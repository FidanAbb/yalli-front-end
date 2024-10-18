import React from "react";
import Header from "../../components/Layout/Header/Header";
import Main from "../../components/mentor/main/Main";
import Footer from "../../components/Layout/Footer/Footer";

const Member = () => {
  return (
    <>
     <Header/>
      <div style={{marginTop:"100px"}}>
        <Main page="member" />
      </div>
      <Footer />
    </>
  );
};

export default Member;
