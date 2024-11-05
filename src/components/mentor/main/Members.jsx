import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import Hero from "../../event/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import Polsa from "../../ui/countries/Polsa";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import MembersCard from "../../member/MembersCard";
import memberImg from "../../../assets/img/member.png";
import { YalliContext } from '../../../Context/YalliContext';

// const allUsers = [
//     {
//         name: "Humay Mustafazadə",
//         flag: <Polsa/>,
//         location: "Varşava, Polşa",
//         image: Fidan,
//         country: "Polşa" // Add country property
//     },
//     {
//         name: "Elmir Əliyev",
//         flag: <Polsa/>,
//         location: "Belostok, Polşa",
//         image: Vuqar,
//         country: "Polşa"
//     },
//     {
//         name: "Fidan Abbaslı",
//         flag: <Polsa/>,
//         location: "Poznan, Polşa",
//         image: Fidan,
//         country: "Türkiyə"
//     },
//     {
//         name: "Tural Jafarli",
//         flag: <Polsa/>,
//         location: "Belostok, Polşa",
//         image: Vuqar,
//         country: "Türkiyə"
//     },
//     {
//         name: "Rəvanə Kərimova",
//         flag: <Polsa/>,
//         location: "Krakov, Polşa",
//         image: Fidan,
//         country: "Azərbaycan"
//     },
//     {
//         name: "Vüsal İslamzadə",
//         flag: <Polsa/>,
//         location: "Lodz, Polşa",
//         image: Vuqar,
//         country: "Azərbaycan"
//     },
//     {
//         name: "Nigar Qasımova",
//         flag: <Polsa/>,
//         location: "Varşova, Polşa",
//         image: Fidan,
//         country: "Polşa"
//     },
// ];

const countryCategory = [
    "Azərbaycan",
    "Türkiyə",
    "Rusiya",
    "Almaniya",
    "ABŞ",
    "Ukrayna",
    "Böyük Britaniya",
    "Kanada",
    "Fransa",
    "İsrail",
    "Gürcüstan",
    "İtaliya",
    "Avstraliya",
    "İspaniya",
    "Niderland",
    "Avstriya",
    "İsveç",
    "Belçika",
    "Norveç",
    "Finlandiya",
    "Macarıstan",
    "Polşa",
    "Yunanıstan",
    "Slovakiya",
    "Litva",
    "Latviya",
    "Estoniya",
    "Qazaxıstan",
    "BƏƏ",
    "Yaponiya",
    "İran",
    "Səudiyyə Ərəbistanı",
    "Belarus",
    "Moldova",
    "Qırğızıstan",
    "Tacikistan",
    "Türkmənistan",
    "Özbəkistan",
    "Malayziya",
    "Sinqapur",
    "Braziliya",
    "Argentina",
    "Meksika",
    "Vietnam",
    "Bali (İndoneziya)",
    "İsveçrə",
    "Portuqaliya",
    "Cənubi Koreya",
];

const Members = () => {
    let navigate = useNavigate();
    const [groupData, setGroupData] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const {allUsers}=useContext(YalliContext)
    
    const filteredMembers = allUsers.filter(member => {
        const matchesCountry = selectedCountry ? member.country === selectedCountry : true;
        const matchesSearch = searchedItem
            ? member.fullName.toLowerCase().includes(searchedItem.toLowerCase())
            : true;
        return matchesCountry && matchesSearch;
    });

    const [userData, setUserData] = useState("");
    useEffect(() => {
        const loggedUser = localStorage.getItem("userInfo");
        if (loggedUser) {
            setUserData(JSON.parse(loggedUser));
        }
    }, []);

    return (
        <>
            <Header/>
            {!userData ? (
                <div className={styles["before_login"]}>
                    <div className="container">
                        <div onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                            <img
                                src={memberImg}
                                alt="member"
                                className={`${styles["selectDisable"]} ${styles.blurImage}`}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: "100px" }}>
                    <div className={styles["main"]}>
                        <div className="container">
                            <div className={styles["main"]}>
                                <div className={styles["sidebar"]}>
                                    <Sidebar
                                        categoryData={countryCategory}
                                        page={'member'}
                                        setSearchedItem={setSearchedItem}
                                        searchedItem={searchedItem}
                                        setSelectedCountry={setSelectedCountry}
                                    />
                                </div>
                                <div className={styles["member_cards"]}>
                                    {filteredMembers.map((member, i) => (
                                        <MembersCard key={i} data={member} onClick={() => navigate(`/member/${member.id}`)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    );
};

export default Members;
