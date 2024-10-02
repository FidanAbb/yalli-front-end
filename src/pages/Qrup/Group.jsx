import React from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/group/hero/Hero";
import Main from "../../components/mentor/main/Main";
const Group = () => {
  return (
    <>
      <Header />
      <Hero />
      <Main page="group" />
      <Footer />
    </>
  );
};

export default Group;
