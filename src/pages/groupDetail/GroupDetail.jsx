import React,{useEffect,useState,useContext} from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/groupDetail/hero/Hero";
import Main from "../../components/groupDetail/main/Main";
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getGroupDataById } from "../../redux/slice/group/group";
import { YalliContext } from "../../Context/YalliContext";
const GroupDetail = () => {
  let { id } = useParams();
  const group = useSelector((state) => state.groups.group);
  const dispatch = useDispatch();
  const {hideGroupEdit,setHideGroupEdit}=useContext(YalliContext)

  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);

  // const [allData, setAllData] = useState({
  //   ...groups,
  // });
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); 
  useEffect(() => {
    dispatch(getGroupDataById(id));
  }, [dispatch]);


  useEffect(() => {
    if (location.pathname === "/groups") {
      setHideGroupEdit(false);
    } else {
      setHideGroupEdit(true);
    }
  }, [location.pathname, setHideGroupEdit]);
  return (
    <>
    {console.log(forServerError)}
     <Header/>
      <Hero group={group}/>
      <Main group={group}/>
      <Footer />
    </>
  );
};

export default GroupDetail;
