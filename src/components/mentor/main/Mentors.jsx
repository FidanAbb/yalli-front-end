// components/Events/Events.jsx
import React, {useEffect, useState} from 'react';
import Card from '../../ui/card/Card';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Header from "../../Layout/Header/Header";
import Hero from "../../mentor/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import Germany from "../../ui/countries/Germany";
import Emil from "../../../assets/img/Emil.svg";
import Polsa from "../../ui/countries/Polsa";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import MentorsCard from "../../ui/MentorsCard/MentorsCard";


const mentorData = [
    {
        id: 1,
        name: "Emil Cahangirli",
        flag: <Germany />,
        country: "Almaniya", // Bayraqa əsasən ölkə adını əlavə etmək
        detail: "Yaşam",
        desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
        image: Emil,
        category: "KARYERA"
    },
    {
        id: 2,
        name: "Fidan Abbaslı",
        flag: <Polsa />,
        country: "Polşa", // Bayraqa əsasən ölkə adını əlavə etmək
        detail: "Təhsil",
        desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
        image: Fidan,
        category: "KARYERA"
    },
    {
        id: 3,
        name: "Rahman Gasımlı",
        flag: <Polsa />,
        country: "Polşa", // Bayraqa əsasən ölkə adını əlavə etmək
        detail: "Yaşam",
        desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
        image: Vuqar,
        category: "TƏHSİL"
    },
    {
        id: 4,
        name: "Fidan Abbaslı",
        flag: <Germany />,
        country: "Almaniya", // Bayraqa əsasən ölkə adını əlavə etmək
        detail: "Yaşam",
        desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
        image: Fidan,
        category: "TƏHSİL"
    },
    {
        id: 5,
        name: "Emil Cahangirli",
        flag: <Germany />,
        country: "Almaniya", // Bayraqa əsasən ölkə adını əlavə etmək
        detail: "Yaşam",
        desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
        image: Emil,
        category: "YAŞAM"
    },
    {
        id: 6,
        name: "Rahman Gasımlı",
        flag: <Polsa />,
        country: "Polşa", // Bayraqa əsasən ölkə adını əlavə etmək
        detail: "Yaşam",
        desc: "Sanayi. Lorem Ipsum, 1500-cü illərdən bəri sənaye standartı kimi istifadə olunur...",
        image: Vuqar,
        category: "YAŞAM"
    },
];

const mentorCategory = [
    { value: "LIFE", label: "Yaşam" },
    { value: "EDUCATION", label: "Təhsil" },
    { value: "CAREER", label: "Karyera" }
];

const Mentors = () => {
    const navigate = useNavigate();
    const [searchedItem, setSearchedItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [activeCategories, setActiveCategories] = useState([]);

 
    const filterEvents = () => {
        return mentorData.filter(mentor => {
            const matchesSearch = mentor.name.toLowerCase().includes(searchedItem.toLowerCase());
            const matchesCountry = selectedCountry ? mentor.toLowerCase().includes(selectedCountry.toLowerCase()) : true;
            const matchesCategory = activeCategories.length > 0 ? activeCategories.includes(mentor.category) : true;
            return matchesSearch && matchesCountry && matchesCategory;
        });
    };

    const filteredEvents = filterEvents();

    return (
        <>
            <Header />
            <Hero />
            <div className={styles["main"]}>
                <div className="container">
                    <div className={styles["main"]}>
                        <div className={styles["sidebar"]}>
                            <Sidebar
                                categoryData={mentorCategory}
                                page={'mentors'}
                                setSearchedItem={setSearchedItem}
                                searchedItem={searchedItem}
                                setSelectedCountry={setSelectedCountry}
                                setActiveCategories={setActiveCategories}
                                activeCategories={activeCategories}
                            />
                        </div>
                        <div className={styles["cards"]}>
                        {filteredEvents.map((mentor, i) => (
                                <div key={i} onClick={() => navigate(`/mentor/${mentor.id}`)}>
                                    <MentorsCard data={mentor} />
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

export default Mentors;