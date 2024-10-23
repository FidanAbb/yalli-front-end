import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import German from "../../../assets/img/German.svg";
import Abd from "../../../assets/img/Abd.svg";
import Network from "../../../assets/img/Network.svg";
import Card from "../../ui/card/Card";
import Arrow from "../../ui/Arrow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGroupData } from "../../../redux/slice/group/group";
import Germany from "../../ui/countries/Germany";
import Polsa from "../../ui/countries/Polsa";
import Usa from "../../ui/countries/Usa";

const Group = () => {
  const groups = useSelector((state) => state.groups.groups);
  const dispatch = useDispatch();

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
      image: <Germany />,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: <Usa />,
    },
    {
      title: "Berlində Networking",
      members: "1k üzv",
      country: "Almaniya",
      image: <Germany />,
    },
    {
      title: "Polşada İş",
      members: "9k üzv",
      country: "Polşa",
      image: <Polsa />,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: <Usa />,
    },
    {
      title: "Almaniyada Ausbildung Edənlər",
      members: "9k+ üzv",
      country: "Almaniya",
      image: <Germany />,
    },
    {
      title: "Amerikada PHD",
      members: "13k üzv",
      country: "Amerika",
      image: <Usa />,
    },
  ];

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollLeftBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scrollLeftBtn();
      } else if (e.key === "ArrowRight") {
        scrollRightBtn();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    // window.location.href = `/qrup/${id}`
    navigate(`/qrup/${id}`);
  };

  return (
    <div className={styles["group"]}>
      <div className="container">
        <div className={styles["groups"]}>
          <div className={styles["hero_text"]}>
            <h2>İcmalar</h2>
            <p onClick={() => 
              // window.location.href ="/qrup"
              navigate("/qrup")
              }>Hamısına bax</p>
          </div>
          <div className={styles["slider"]}>
            <div className={styles["left_arrow"]} onClick={scrollLeftBtn}>
              <Arrow />
            </div>
            <div
              className={styles["cards"]}
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {allData &&
                allData.content?.map((group, index) => (
                  <div key={index} onClick={() => handleCardClick(group.id)}>
                    <Card key={index} sectionName={"group"} group={group} />
                  </div>
                ))}
            </div>
            <div className={styles["right_arrow"]} onClick={scrollRightBtn}>
              <Arrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
