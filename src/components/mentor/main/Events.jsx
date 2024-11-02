// components/Events/Events.jsx
import React, {useEffect, useState} from 'react';
import Card from '../../ui/card/Card';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Header from "../../Layout/Header/Header";
import Hero from "../../event/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import {getEventData} from "../../../redux/slice/event/event";
import Meal from "../../../assets/img/meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";


const eventData = [
    {
        time: "Monday, 9 September",
        hour: "19:00",
        title: "Azərbaycanlıların Şam Yeməyi",
        location: "Koln,Almaniya",
        image: Meal,
        category: 'expired'
    },
    {
        time: "Friday, 25 October",
        hour: "14:00",
        title: "Badminton Yarışı | Southland Stadion",
        location: "Calgary, Kanada",
        image: badminton,
        category: 'saved'
    },
    {
        time: "Friday, 8 November",
        hour: "16:00",
        title: "Milli Mətbəx Yığıncağı",
        location: "Poznan, Polşa",
        image: kitchen,
        category: 'popular'
    },
    {
        time: "Monday, 9 September",
        hour: "19:00",
        title: "Futbol Yarışı | Warszawianka Football Center",
        location: "Varşava, Polşa",
        image: Meal,
        category: 'soon'
    },
];

const Events = () => {
    let navigate = useNavigate();
    const [groupData, setGroupData] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [activeCategories, setActiveCategories] = useState([]);

    const eventCategory = [
        {"expired": "Keçmiş"},
        {"soon": "Yaxınlaşan"},
        {"popular": "Populyar"},
        {"saved": "Yadda saxlanılan"},
    ];
    const filteredEvents = eventData?.filter(group => {

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
                                categoryData={eventCategory}
                                page={'event'}
                                setSearchedItem={setSearchedItem}
                                searchedItem={searchedItem}
                                setSelectedCountry={setSelectedCountry}
                                setActiveCategories={setActiveCategories}
                                activeCategories={activeCategories}
                            />
                        </div>
                        <div className={styles["cards"]}>
                            {filteredEvents.map((event, i) => (
                                <Card key={i} sectionName="event" event={event} onClick={()=>navigate(`/event/${event.id}`)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Events;