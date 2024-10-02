import React,{useEffect, useState} from "react";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import MentorsCard from "../../ui/MentorsCard/MentorsCard";
import Card from "../../ui/card/Card";
import styles from "./style.module.scss";
import Emil from "../../../assets/img/Emil.svg";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import Meal from "../../../assets/img/Meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import German from "../../../assets/img/German.svg";
import Abd from "../../../assets/img/Abd.svg";
import Network from "../../../assets/img/Network.svg";

const mentorData = [
  {
    name: "Emil Cahangirli",
    flag: "🇩🇪",
    detail: "Yaşam",
    image: Emil,
  },
  {
    name: "Fidan Abbaslı",
    flag: "🇵🇱",
    detail: "Təhsil",
    image: Fidan,
  },
  {
    name: "Rahman Gasımlı",
    flag: "🇺🇸",
    detail: "Yaşam",
    image: Vuqar,
  },
  {
    name: "Fidan Abbaslı",
    flag: "🇩🇪",
    detail: "Yaşam",
    image: Fidan,
  },
  {
    name: "Emil Cahangirli",
    flag: "🇩🇪",
    detail: "Yaşam",
    image: Emil,
  },
  {
    name: "Rahman Gasımlı",
    flag: "🇺🇸",
    detail: "Yaşam",
    image: Vuqar,
  },
];

const eventData = [
  {
    time: "Monday, 9 September",
    hour: "19:00",
    title: "Azərbaycanlıların Şam Yeməyi",
    location: "Koln,Almaniya",
    image: Meal,
  },
  {
    time: "Friday, 25 October",
    hour: "14:00",
    title: "Badminton Yarışı | Southland Stadion",
    location: "Calgary, Kanada",
    image: badminton,
  },
  {
    time: "Friday, 8 November",
    hour: "16:00",
    title: "Milli Mətbəx Yığıncağı",
    location: "Poznan, Polşa",
    image: kitchen,
  },
  {
    time: "Monday, 9 September",
    hour: "19:00",
    title: "Futbol Yarışı | Warszawianka Football Center",
    location: "Varşava, Polşa",
    image: Meal,
  },
];

const groupData = [
  {
    title: "Almaniyada Ausbildung Edənlər",
    members: "9k+ üzv",
    country: "Almaniya",
    image: German,
  },
  {
    title: "Amerikada PHD",
    members: "13k üzv",
    country: "Amerika",
    image: Abd,
  },
  {
    title: "Berlində Networking",
    members: "1k üzv",
    country: "Almaniya",
    image: Network,
  },
  {
    title: "Polşada İş",
    members: "9k üzv",
    country: "Polşa",
    image: German,
  },
  {
    title: "Amerikada PHD",
    members: "13k üzv",
    country: "Amerika 🇺🇸",
    image: Abd,
  },
  {
    title: "Almaniyada Ausbildung Edənlər",
    members: "9k+ üzv",
    country: "Almaniya 🇩🇪",
    image: German,
  },
  {
    title: "Amerikada PHD",
    members: "13k üzv",
    country: "Amerika 🇺🇸",
    image: Abd,
  },
];

const mentorCategory = ["Yaşam", "Karyera", "Təhsil"];
const groupCategory = [
  "Yaşam",
  "Əyləncə",
  "Karyera",
  "Təhsil",
  "Səyahət",
  "Yerləşmə",
  "Qanunlar",
];
const eventCategory = [
  "Keçmiş",
  "Yaxınlaşan",
  "Populyar",
  "Yadda saxlanılan",
  "Keçmiş",
];

const Main = ({ page }) => {

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (page === "mentor") {
      setCategoryData(mentorCategory);
    } else if (page === "group") {
      setCategoryData(groupCategory);
    } else if (page === "event") {
      setCategoryData(eventCategory);
    }
  }, [page]); 
  return (
    <div className={styles["main"]}>
      <div className="container">
        <div className={styles["main"]}>
          <div className={styles["sidebar"]}>
            <Sidebar
              categoryData={categoryData}
            />
          </div>
          <div className={styles["cards"]}>
            {page === "mentor"
              ? mentorData.map((m, i) => <MentorsCard key={i} data={m} />)
              : page === "group"
              ? groupData.map((g, i) => (
                  <Card key={i} sectionName="group" group={g} />
                ))
              : page === "event"
              ? eventData.map((e, i) => (
                  <Card key={i} sectionName="event" event={e} />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
