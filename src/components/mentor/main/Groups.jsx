import React, { useEffect, useState } from 'react';
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
    let navigate = useNavigate();
    const [groupData, setGroupData] = useState([]);
    const groups = useSelector((state) => state.groups.groups);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getGroupData());
        };
        fetchData();
    }, [dispatch]);

    const [searchedItem, setSearchedItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [activeCategories, setActiveCategories] = useState([]);

    const groupCategory = [
        { "LIFE": "Yaşam" },
        { "LOCATION": "Yerləşmə" },
        { "LAW": "Qanunlar" },
        { "TRAVEL": "Səyahət" },
    ];
    const filteredGroups = groups.content?.filter(group => {
        console.log(group,'group')
        const matchesCountry = selectedCountry ? group.country === selectedCountry : true;
        const matchesCategory = activeCategories.length > 0
            ? activeCategories.includes(group.groupCategory)
            : true;
        const matchesSearch = searchedItem
            ? group.name?.toLowerCase().includes(searchedItem.toLowerCase())
            : true;
        return matchesCountry && matchesCategory && matchesSearch;
    }) || [];

    return (
        <>
            <Header />
            <Hero setGroupData={setGroupData} />
            <div className={styles["main"]}>
                <div className="container">
                    <div className={styles["main"]}>
                        <div className={styles["sidebar"]}>
                            <Sidebar
                                categoryData={groupCategory}
                                page={'qrup'}
                                setSearchedItem={setSearchedItem}
                                searchedItem={searchedItem}
                                setSelectedCountry={setSelectedCountry}
                                setActiveCategories={setActiveCategories}
                                activeCategories={activeCategories}
                            />
                        </div>
                        <div className={styles["cards"]}>
                            {filteredGroups.map((group, i) => (
                                <div key={i} onClick={() => navigate(`/qrup/${group.id}`)}>
                                    <Card sectionName="group" group={group} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Groups;
