import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import German from "../../../assets/img/German.svg";
import Abd from "../../../assets/img/Abd.svg";
import Network from "../../../assets/img/Network.svg";
import Card from "../../ui/card/Card";
import Arrow from "../../ui/Arrow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getGroupData } from "../../../redux/slice/group/group";
import Germany from "../../ui/countries/Germany"
import Polsa from "../../ui/countries/Polsa"
import Usa from "../../ui/countries/Usa"

const Group = () => {
  const groups = useSelector((state) => state.groups.groups)
  const dispatch = useDispatch()

  const [allData, setAllGroupData] = useState({
    ...groups,
  });

  useEffect(() => {
    dispatch(getGroupData());
  }, [dispatch]);

  useEffect(() => {
    setAllGroupData(groups);
  }, [groups]);

  const groupData = [
    {
      title: "Almaniyada Ausbildung Edənlər",
      members: "9k+ üzv",
      country: "Almaniya",
      image: <Germany/>,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: <Usa/>,
    },
    {
      title: "Berlində Networking",
      members: "1k üzv",
      country: "Almaniya",
      image: <Germany/>,
    },
    {
      title: "Polşada İş",
      members: "9k üzv",
      country: "Polşa",
      image: <Polsa/>,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: <Usa/>,
    },
    {
      title: "Almaniyada Ausbildung Edənlər",
      members: "9k+ üzv",
      country: "Almaniya",
      image: <Germany/>,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: <Usa/>,
    },
  ];

  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };
  const handleCardClick = (id) => {
    navigate(`/qrup/${id}`);
  };

  return (
      <div className={styles["group"]}>
        <div className="container">
          <div className={styles["groups"]}>
            <div className={styles["hero_text"]}>
              <h2>Qruplar</h2>
              <p onClick={() => navigate(`/qrup`)}>Hamısına bax</p>
            </div>
            <div className={styles["slider"]}>
              <div className={styles["left_arrow"]} onClick={scrollLeft}>
                <Arrow />
              </div>
              <div className={styles["cards"]} ref={sliderRef}>
                {allData && allData.content?.map((group, index) => (
                  <div key={index} onClick={() => handleCardClick(group.id)}>
                  <Card key={index} sectionName={"group"} group={group} />
                  </div>
                ))}
              </div>
              <div className={styles["right_arrow"]} onClick={scrollRight}>
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Group;
