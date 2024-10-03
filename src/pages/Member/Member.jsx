import React from "react";
import Header from "../../components/Layout/Header/Header";
import Main from "../../components/mentor/main/Main";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/member/hero/Hero";

const Member = () => {
  return (
    <>
      <Header />
      <Hero />
      <Main page="member" />
      <Footer />
    </>
  );
};

export default Member;
