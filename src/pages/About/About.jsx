import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import CenterText from "../../components/about/center/CenterText";
import Hero from "../../components/about/hero/Hero";
import Suggest from "../../components/about/suggest/Suggest";
import Mission from "../../components/about/mission/Mission";
import Join from "../../components/about/join/Join";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation(); 
  console.log();
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
      <Header />
      <CenterText />
      <Hero />
      <Suggest />
      <Mission />
      <Join />
      <Footer />
    </>
  );
};

export default About;
