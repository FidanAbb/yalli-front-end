import React,{useState,useEffect} from 'react'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/event/hero/Hero";
import Main from "../../components/mentor/main/Main";
import { useSelector } from 'react-redux';
const Event = () => {
  const [eventData, setEventData] = useState([])
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
  <Header/>
    <Hero/>
    <Main page="event" eventsData={eventData} setEventData={setEventData}/>
    <Footer />
  </>
  )
}

export default Event