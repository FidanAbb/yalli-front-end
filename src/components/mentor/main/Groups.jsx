import React, { useEffect, useState, useContext } from "react";
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
  const [showAllPages, setShowAllPages] = useState(false);
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);
  console.log();

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [page, setPage] = useState(0);
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getGroupData({ page, size: 18 }));
  }, [dispatch, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(groups.totalElements / 18);
  console.log(totalPages);

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
    { OTHER: "Digər" },
  ];

  const filterGroups = () => {
    return (
      groups.content?.filter((group) => {
        const matchesSearch = group.title
          ?.toLowerCase()
          ?.startsWith(searchedItem?.toLowerCase());
        const matchesCountry = selectedCountry
          ? group.country?.toLowerCase() === selectedCountry?.toLowerCase()
          : true;
        const matchesCategory =
          activeCategories.length > 0
            ? activeCategories?.some((cat) =>
                group.groupCategory?.includes(cat)
              )
            : true;
        return matchesSearch && matchesCountry && matchesCategory;
      }) || []
    );
  };

  const filteredGroups = filterGroups();

  return (
    <>
      {console.log(forServerError)}
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
                  <div
                    className={styles["group-cards-con"]}
                    key={i}
                    onClick={() => navigate(`/qrup/${group.id}`)}
                  >
                    <Card sectionName="group" group={group} />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="text-center pagination-con">
            {Array.from({ length: totalPages }, (_, index) => {
              if (!showAllPages && index >= 5) return null; // İlk 5 düymə göstərilir
              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  style={{
                    margin: "0 5px",
                    padding: "8px 12px",
                    backgroundColor: page === index ? "#FF0000" : "#fff",
                    color: page === index ? "#fff" : "#FF0000",
                    border: "1px solid #FF0000",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
            {!showAllPages && totalPages > 5 && (
              <button
                onClick={() => setShowAllPages(true)}
                style={{
                  margin: "0 5px",
                  padding: "8px 12px",
                  backgroundColor: "#fff",
                  color: "#FF0000",
                  border: "1px solid #FF0000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ...
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Groups;
