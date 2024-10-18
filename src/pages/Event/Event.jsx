import React from 'react'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/event/hero/Hero";
import Main from "../../components/mentor/main/Main";
const Event = () => {
  return (
    <>
  <Header/>
    <Hero />
    <Main page="event" />
    <Footer />
  </>
  )
}

export default Event