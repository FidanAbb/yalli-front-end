import React, { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import { getGroupData } from "../../../redux/slice/group/group";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Layout/Header/Header";
import Footer from "../../Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Hero from "../../group/hero/Hero";

const Groups = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State Management
  const groups = useSelector((state) => state.groups.groups);
  const loading = useSelector((state) => state.groups.loading);
  const [searchedItem, setSearchedItem] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);

  // Fetch Data on Mount
  useEffect(() => {
    dispatch(getGroupData());
  }, [dispatch]);

  // Category Definitions
  const groupCategory = [
    { LIFE: "Yaşam" },
    { LOCATION: "Yerləşmə" },
    { LAW: "Qanunlar" },
    { TRAVEL: "Səyahət" },
  ];

  // Filtering Logic
  const filterGroups = () => {
    return (
      groups.content?.filter((group) => {
        const matchesSearch = searchedItem ? group.name?.toLowerCase().includes(searchedItem.toLowerCase()) : true;
        const matchesCountry = selectedCountry ? group.country === selectedCountry : true;
        const matchesCategory = activeCategories.length > 0 ? activeCategories.includes(group.groupCategory) : true;
        return matchesCountry && matchesCategory && matchesSearch;
      }) || []
    );
  };

  const filteredGroups = filterGroups();

  return (
    <>
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
                  <div key={i} onClick={() => navigate(`/qrup/${group.id}`)}>
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
