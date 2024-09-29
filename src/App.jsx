import { useState } from 'react'
import './App.css'
import Login from './pages/Auth'
import Home from "./pages/Home/Home.jsx";
import Header from "./components/Layout/Header/Header.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";

function App() {

  return (
    <>
      {/* <Login/> */}

      <Header />
      <Home />
      <Footer/>
    </>
  )
}

export default App
