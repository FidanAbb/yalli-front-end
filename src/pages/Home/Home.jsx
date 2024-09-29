import React from "react";
import Hero from "../../components/home/Hero/Hero";
import FindLocation from "../../components/home/FindLocation/FindLocation";
import Group from "../../components/home/Group/Group";
import Events from "../../components/home/Event/Events";
import Border from "../../components/home/Border/Border";
import Mentors from "../../components/home/Mentors/Mentors";

const Home = () => {
  return (
    <div>
      <Hero />
      <FindLocation />
      <Group />
      <Events />
      <Border />
      <Mentors />
    </div>
  );
};

export default Home;
