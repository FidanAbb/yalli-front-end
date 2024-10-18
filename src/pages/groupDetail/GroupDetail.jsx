import React,{useEffect} from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Hero from "../../components/groupDetail/hero/Hero";
import Main from "../../components/groupDetail/main/Main";
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getGroupDataById } from "../../redux/slice/group/group";
const GroupDetail = () => {
  let { id } = useParams();
  const group = useSelector((state) => state.groups.group);
  const dispatch = useDispatch();

  // const [allData, setAllData] = useState({
  //   ...groups,
  // });

  useEffect(() => {
    dispatch(getGroupDataById(id));
  }, [dispatch]);

  return (
    <>
     <Header/>
      <Hero group={group}/>
      <Main group={group}/>
      <Footer />
    </>
  );
};

export default GroupDetail;
