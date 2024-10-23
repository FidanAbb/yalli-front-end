import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import styles from './mentor.module.css'
import UpperIcon from "../../../components/icon/UpperIcon";
import StarIcon from "../../../components/icon/StarIcon";
import {useLocation} from "react-router-dom";

export default function MentorDetail() {
    const location = useLocation();
    const { id, name, detail,desc,flag,image } = location.state || {};
    return (
        <>
            <Header/>
            <div className={styles.mentors_container}>
                <div className={styles.mentor_box}>
                    <div className={styles.mentor_left}>
                        <img src={image} alt="" className={styles.mentor_main}/>
                        <h4>{name}</h4>
                        {flag}
                        <p>{detail}</p>
                    </div>
                    <div className={styles.mentor_right}>
                        <p>{desc}</p>
                        <div className={styles.mentor_btn}>
                            <button>
                                <span>Əlaqəyə keç</span>
                                <UpperIcon/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.comment_box}>
                    <div className={styles.comment_count}>
                        <div className={styles.count_left}>
                            <ul>
                                <li className={styles.active}><StarIcon/></li>
                                <li className={styles.active}><StarIcon/></li>
                                <li className={styles.active}><StarIcon/></li>
                                <li className={styles.active}><StarIcon/></li>
                                <li><StarIcon/></li>
                            </ul>
                            <p>4.0 </p>
                            <span></span>
                            <p>2 dəyərləndirmə</p>
                            <span></span>
                            <p>2 rəy</p>
                        </div>
                        <div className={styles.count_right}>
                            <a href="#">Rəy bildir</a>
                        </div>
                    </div>
                    <div className={styles.comment_list}>
                        <h4>Bütün dəyərləndirmələr</h4>
                        <ul>
                            <li>
                                <div className={styles.comment_top}>
                                    <div className={styles.star_list}>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p className={styles.active}><StarIcon/></p>
                                    </div>
                                    <span></span>
                                    <p>1 Sentyabr 2024</p>
                                </div>
                                <div className={styles.comment_text}>
                                    <span>Z****** M*****</span>
                                    <p>Mentor yaxşıdır. Əlaqə yeri whatsapp olsa daha yaxşı olardı</p>
                                </div>
                            </li>
                            <li>
                                <div className={styles.comment_top}>
                                    <div className={styles.star_list}>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p className={styles.active}><StarIcon/></p>
                                        <p><StarIcon/></p>
                                        <p><StarIcon/></p>
                                    </div>
                                    <span></span>
                                    <p>1 Sentyabr 2024</p>
                                </div>
                                <div className={styles.comment_text}>
                                    <span>Z****** M*****</span>
                                    <p>Mentor yaxşıdır. Əlaqə yeri whatsapp olsa daha yaxşı olardı</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}