import React from 'react'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/mentor/hero/Hero"
import Main from "../../components/mentor/main/Main"
const Mentor = () => {
  return (
   <>
   <Header/>
   <Hero/>
   <Main page="mentor"/>
   <Footer/>
   </>
  )
}

export default Mentor