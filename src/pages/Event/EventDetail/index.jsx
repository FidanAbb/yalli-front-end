import styles from './event.module.css'
import LocationIcon from "../../../components/icon/Location";
import UpperIcon from "../../../components/icon/UpperIcon";
import Hero from "../../../components/group/hero/Hero";
import React, {useEffect, useState} from "react";
import Footer from "../../../components/Layout/Footer/Footer";
import Header from "../../../components/Layout/Header/Header";
import {useLocation} from "react-router-dom";

export default function EventDetail() {
    const location = useLocation();
    const {event} = location.state || {};
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
            <div className={styles.event_box}>
                <div className={styles.event_left}>
                    <img src={event?.image} alt=""/>
                </div>
                <div className={styles.event_right}>
                    <div>
                        <h4>{event.title}</h4>
                        <div className={styles.subtitle}>
                            <p>{event.time} | {event.hour}</p>
                            <span className={styles.circle}></span>
                            <div className={styles.location}>
                                <LocationIcon/>
                                <span>{event.location}</span>
                            </div>
                        </div>
                        <p className={styles.main_text}>
                            It is a long established fact that a reader will be distracted by the readable content of a
                            page
                            when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                            normal
                            distribution of letters, as opposed to using 'Content here, content here', making it look
                            like
                            readable English. It is a long established fact that a reader will be distracted by the
                            readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum is that it has
                            a
                            more-or-less normal distribution of letters, as opposed to using 'Content here, content
                            here',
                            making it look like readable English.
                        </p>
                    </div>
                    {!userData &&
                    <div className={styles.btn_box}>
                        <button>
                            <span>Qeydiyyatdan keç</span>
                            <UpperIcon/>
                        </button>
                    </div>
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}