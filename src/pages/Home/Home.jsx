import React, { useRef } from "react";
import Header from "../../components/Layout/Header/Header";
import Hero from "../../components/home/Hero/Hero";
import Group from "../../components/home/Group/Group";
import Event from "../../components/home/Event/Event";
import Mentor from "../../components/home/Mentor/Mentor";
import Footer from "../../components/Layout/Footer/Footer";
const Home = () => {
  const groupRef = useRef(null);
  const eventRef = useRef(null);
  const mentorRef = useRef(null);
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header
        scrollToSection={scrollToSection}
        groupRef={groupRef}
        eventRef={eventRef}
        mentorRef={mentorRef}
      />
      <Hero />
      <div ref={groupRef}>
        <Group />
      </div>
      <div ref={eventRef}>
        <Event />
      </div>
      <div ref={mentorRef}>
        <Mentor />
      </div>
      <Footer />
    </>
  );
};

export default Home;
