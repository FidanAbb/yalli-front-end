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
        detail: "Yaşam",
        desc: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It waspublishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It ",
        image: Emil,
        category: "CARRIER"
    },
    {
        id: 2,
        name: "Fidan Abbaslı",
        flag: <Polsa />,
        detail: "Təhsil",
        desc: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It waspublishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It ",
        image: Fidan,
        category: "CARRIER"
    },
    {
        id: 3,
        name: "Rahman Gasımlı",
        flag: <Polsa />,
        detail: "Yaşam",
        desc: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It waspublishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It ",
        image: Vuqar,
        category: "EDUCATION"
    },
    {
        id: 4,
        name: "Fidan Abbaslı",
        flag: <Germany />,
        detail: "Yaşam",
        desc: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It waspublishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It ",
        image: Fidan,
        category: "EDUCATION"
    },
    {
        id: 5,
        name: "Emil Cahangirli",
        flag: <Germany />,
        detail: "Yaşam",
        desc: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It waspublishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It ",
        image: Emil,
        category: "LIFE"
    },
    {
        id: 6,
        name: "Rahman Gasımlı",
        flag: <Polsa />,
        detail: "Yaşam",
        desc: "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It waspublishing software like Aldus PageMaker including versions of Lorem Ipsum.anged. It ",
        image: Vuqar,
        category: "LIFE"
    },
];
const mentorCategory = [
    { "LIFE": "Yaşam" },
    { "EDUCATION": "Təhsil" },
    { "CARRIER": "Karyera" }
    ]
const Mentors = () => {
    let navigate = useNavigate();
    const [groupData, setGroupData] = useState([]);

    const [searchedItem, setSearchedItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [activeCategories, setActiveCategories] = useState([]);

    const filteredEvents = mentorData?.filter(group => {

        const matchesCountry = selectedCountry ? group.country === selectedCountry : true;
        const matchesCategory = activeCategories.length > 0
            ? activeCategories.includes(group.category)
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
                                <div onClick={()=>navigate(`/mentor/${mentor.id}`)}>
                                    <MentorsCard key={i} data={mentor}  />
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