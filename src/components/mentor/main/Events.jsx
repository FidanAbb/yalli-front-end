import React, { useEffect, useState } from 'react';
import Card from '../../ui/card/Card';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../Layout/Header/Header";
import Hero from "../../event/hero/Hero";
import Footer from "../../Layout/Footer/Footer";
import { getEventData } from "../../../redux/slice/event/event";
import Meal from "../../../assets/img/meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import styles from "./style.module.scss";
import Sidebar from "../../ui/pageSidebar/PageSideBar";

const eventData = [
    {
        id: 1,
        time: "Monday, 9 September",
        hour: "19:00",
        title: "Azərbaycanlıların Şam Yeməyi",
        location: "Koln",
        country: "Almaniya", // Ölkə əlavə edildi
        image: Meal,
        category: 'EXPIRED'
    },
    {
        id: 2,
        time: "Friday, 25 October",
        hour: "14:00",
        title: "Badminton Yarışı | Southland Stadion",
        location: "Calgary",
        country: "Kanada", // Ölkə əlavə edildi
        image: badminton,
        category: 'SAVED'
    },
    {
        id: 3,
        time: "Friday, 8 November",
        hour: "16:00",
        title: "Milli Mətbəx Yığıncağı",
        location: "Poznan",
        country: "Polşa", // Ölkə əlavə edildi
        image: kitchen,
        category: 'POPULAR'
    },
    {
        id: 4,
        time: "Monday, 9 September",
        hour: "19:00",
        title: "Futbol Yarışı | Warszawianka Football Center",
        location: "Varşava",
        country: "Polşa", // Ölkə əlavə edildi
        image: Meal,
        category: 'SOON'
    },
];


const Events = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchedItem, setSearchedItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [activeCategories, setActiveCategories] = useState([]);

    const eventCategory = [
        {"EXPIRED": "Keçmiş"},
        {"SOON": "Yaxınlaşan"},
        {"POPULAR": "Populyar"},
        {"SAVED": "Yadda saxlanılan"},
    ];

    useEffect(() => {
        dispatch(getEventData());
    }, [dispatch]);

    const filterEvents = () => {
        return eventData?.filter(event => {
            const matchesSearch = event.title?.toLowerCase().startsWith(searchedItem?.toLowerCase());
            const matchesCountry = selectedCountry ? event.country?.toLowerCase() === selectedCountry?.toLowerCase() : true;;
            const matchesCategory = activeCategories.length > 0 ? activeCategories?.some(cat => event.groupCategory?.includes(cat)) : true;
            return matchesSearch && matchesCountry && matchesCategory;
        }) || [];
    };

    const filteredEvents = filterEvents();

    return (
        <>
            <Header />
            <Hero />
            <div className={styles["main"]}>
                <div className="container">
                    <div className={styles["main"]}>
                        <Sidebar
                            categoryData={eventCategory}
                            page="event"
                            setSearchedItem={setSearchedItem}
                            searchedItem={searchedItem}
                            setSelectedCountry={setSelectedCountry}
                            setActiveCategories={setActiveCategories}
                            activeCategories={activeCategories}
                        />
                        <div className={styles["cards"]}>
                            {filteredEvents.length > 0 ? filteredEvents.map((event, i) => (
                                <Card key={i} sectionName="event" event={event} onClick={() => navigate(`/event/${event.id}`)} />
                            )) : (
                                <p>No events found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Events;
