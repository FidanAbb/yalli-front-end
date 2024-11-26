import React, { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import { getGroupData } from "../../../redux/slice/group/group";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../../group/hero/Hero";

const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const loading = useSelector((state) => state.groups.loading);
  const [searchedItem, setSearchedItem] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);

  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getGroupData());
  }, [dispatch]);

  const groupCategory = [
    { LIFE: "Yaşam" },
    { CAREER: "Karyera" },
    { EDUCATION: "Təhsil" },
    { ENTERTAINMENT: "Əyləncə" },
    { TRAVEL: "Səyahət" },
    { LOCATION: "Yerləşmə" },
    { LAW: "Qanunlar" },
    { INNOVATION: "İnnovasiya" },
    { TECHNOLOGY: "Texnologiya" },
    { OTHER: "Digər" }
  ];

  const filterGroups = () => {
    return groups.content?.filter((group) => {
      const matchesSearch = group.title?.toLowerCase()?.startsWith(searchedItem?.toLowerCase());
      const matchesCountry = selectedCountry ? group.country?.toLowerCase() === selectedCountry?.toLowerCase() : true;
      const matchesCategory = activeCategories.length > 0 ? activeCategories?.some(cat => group.groupCategory?.includes(cat)) : true;
      return matchesSearch && matchesCountry && matchesCategory;
    }) || [];
  };

  
  const filteredGroups = filterGroups();

  return (
    <>
    {console.log(forServerError)
    }
      <Header />
      <Hero />
      <div className={styles["main"]}>
        <div className="container">
          <div className={styles["main"]}>
            <div className={styles["sidebar"]}>
              <Sidebar
                categoryData={groupCategory}
                page={"qrup"}
                setSearchedItem={setSearchedItem}
                searchedItem={searchedItem}
                setSelectedCountry={setSelectedCountry}
                setActiveCategories={setActiveCategories}
                activeCategories={activeCategories}
              />
            </div>
            <div className={styles["cards"]}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                filteredGroups.map((group, i) => (
                  <div className={styles["group-cards-con"]} key={i} onClick={() => navigate(`/qrup/${group.id}`)}>
                    <Card sectionName="group" group={group} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Groups;
