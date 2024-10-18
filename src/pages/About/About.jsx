import React from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import CenterText from "../../components/about/center/CenterText";
import Hero from "../../components/about/hero/Hero";
import Suggest from "../../components/about/suggest/Suggest";
import Mission from "../../components/about/mission/Mission";
import Join from "../../components/about/join/Join";
const About = () => {
  return (
    <>
   <Header/>
      <CenterText />
      <Hero />
      <Suggest />
      <Mission />
      <Join/>
      <Footer />
    </>
  );
};

export default About;
