import React, { useEffect, useState } from "react";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
import MentorsCard from "../../ui/MentorsCard/MentorsCard";
import MembersCard from "../../member/MembersCard";
import Card from "../../ui/card/Card";
import styles from "./style.module.scss";
import Emil from "../../../assets/img/Emil.svg";
import Fidan from "../../../assets/img/Fidan.svg";
import Vuqar from "../../../assets/img/Vuqar.svg";
import Meal from "../../../assets/img/meal.svg";
import badminton from "../../../assets/img/badminton.svg";
import kitchen from "../../../assets/img/kitchen.svg";
import German from "../../../assets/img/German.svg";
import Abd from "../../../assets/img/Abd.svg";
import Network from "../../../assets/img/Network.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGroupData } from "../../../redux/slice/group/group";
import { getEventData, getEventDataById } from "../../../redux/slice/event/event";
import Germany from "../../ui/countries/Germany";
import Polsa from "../../ui/countries/Polsa";
const mentorData = [
  {
    name: "Emil Cahangirli",
    flag: <Germany />,
    detail: "Yaşam",
    image: Emil,
  },
  {
    name: "Fidan Abbaslı",
    flag: <Polsa />,
    detail: "Təhsil",
    image: Fidan,
  },
  {
    name: "Rahman Gasımlı",
    flag: <Polsa />,
    detail: "Yaşam",
    image: Vuqar,
  },
  {
    name: "Fidan Abbaslı",
    flag: <Germany />,
    detail: "Yaşam",
    image: Fidan,
  },
  {
    name: "Emil Cahangirli",
    flag: <Germany />,
    detail: "Yaşam",
    image: Emil,
  },
  {
    name: "Rahman Gasımlı",
    flag: <Polsa />,
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

const memberData = [
  {
    name: "Humay Mustafazadə",
    flag: <Polsa/>,
    location: "Varşava, Polşa",
    image: Fidan,
  },
  {
    name: "Elmir Əliyev",
    flag: <Polsa/>,
    location: "Belostok, Polşa",
    image: Vuqar,
  },
  {
    name: "Fidan Abbaslı",
    flag: <Polsa/>,
    location: "Poznan, Polşa",
    image: Fidan,
  },
  {
    name: "Tural Jafarli",
    flag: <Polsa/>,
    location: "Belostok, Polşa",
    image: Vuqar,
  },
  {
    name: "Rəvanə Kərimova",
    flag: <Polsa/>,
    location: "Krakov, Polşa",
    image: Fidan,
  },
  {
    name: "Vüsal İslamzadə",
    flag: <Polsa/>,
    location: "Lodz, Polşa",
    image: Vuqar,
  },
  {
    name: "Nigar Qasımova",
    flag: <Polsa/>,
    location: "Varşova, Polşa",
    image: Fidan,
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
];
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
  "Cənubi Koreya"
];


const Main = ({ page, setGroupData = () => {}, groupData }) => {
  const [categoryData, setCategoryData] = useState(null);
  const navigate = useNavigate();

  const groups = useSelector((state) => state.groups.groups);
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const [countrySearch, setCountrySearch] = useState("");

  useEffect(() => {
    const updateCountrySearch = () => {
      const searchedCountry = JSON.parse(localStorage.getItem("searchedCountry")) || "";
      setCountrySearch(searchedCountry);
    };

    updateCountrySearch();

    const intervalId = setInterval(updateCountrySearch, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // const [allData, setAllData] = useState({
  //   ...groups,
  // });

  console.log("yei", countrySearch)

  useEffect(() => {
    dispatch(getGroupData());
    dispatch(getEventData());
  }, [dispatch]);

  useEffect(() => {
      if (setCategoryData) {
      setGroupData(groups);
    }
    }, [groups]);

  useEffect(() => {
    if (page === "mentor") {
      setCategoryData(mentorCategory);
    } else if (page === "group") {
      setCategoryData(groupCategory);
    } else if (page === "event") {
      setCategoryData(eventCategory);
    } else if (page === "member") {
      setCategoryData(countryCategory);
    }
  }, [page]);
  const handleCardClick = (id) => {
    navigate(`/qrup/${id}`);
  };
  const [searchedItem, setSearchedItem] = useState("")

  const filteredGroupData = groupData?.content?.filter((g) => {
    const matchesSearchItem = g.title.toLowerCase().includes(searchedItem.toLowerCase());
    const matchesCountry = countrySearch ? g.country.toLowerCase() === countrySearch.toLowerCase() : true;
    return matchesSearchItem && matchesCountry;
  });
  
  // const filteredMentorData = mentorData.filter((m) => {
  //   const matchesName = m.name.toLowerCase().includes(searchedItem.toLowerCase());
  //   const matchesCountry = countrySearch ? m.country.toLowerCase() === countrySearch.toLowerCase() : true;
  //   return matchesName && matchesCountry;
  // });

  const filteredMentorData = mentorData.filter((m) =>
    m.name.toLowerCase().includes(searchedItem?.toLowerCase())
  );

  const filteredEventData = eventData.filter((e) => {
    const matchesTitle = e.title.toLowerCase().includes(searchedItem?.toLowerCase());
    const matchesCountry = countrySearch ? e.location.toLowerCase().includes(countrySearch.toLowerCase()) : true;
    return matchesTitle && matchesCountry;
  });

  const filteredMemberData = memberData.filter((c) => {
    const matchesSearchItem = c.name.toLowerCase().includes(searchedItem.toLowerCase());
    const matchesCountry = countrySearch ? c.location.toLowerCase().includes(countrySearch.toLowerCase()) : true;
    return matchesSearchItem && matchesCountry;
  });

  console.log(events)
  return (
    <div className={styles["main"]}>
      <div className="container">
        <div className={styles["main"]}>
          <div className={styles["sidebar"]}>
            <Sidebar categoryData={categoryData} page={page} setSearchedItem={setSearchedItem} searchedItem={searchedItem}/>
          </div>
          <div className={styles[`${page === "member" ? "member_cards" : "cards"}`]}>
            {page === "mentor" ? (
              filteredMentorData.map((m, i) => <MentorsCard key={i} data={m} />)
            ) : page === "group" ? (
              filteredGroupData? filteredGroupData.map((g, i) => (
                <div key={i} onClick={() => handleCardClick(g.id)}>
                  <Card sectionName="group" group={g} />
                </div>
              )) : groupData?.content?.map((g, i) => (
                <div key={i} onClick={() => handleCardClick(g.id)}>
                  <Card sectionName="group" group={g} />
                </div>
              ))
            ) : page === "event" ? (
              filteredEventData.map((e, i) => <Card key={i} sectionName="event" event={e} />)
            ) : page === "member" ? (
              filteredMemberData.map((c, i) => <MembersCard key={i} data={c} />)
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
