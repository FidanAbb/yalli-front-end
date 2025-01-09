import { useRef, useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import Card from "../../ui/card/Card";
import Arrow from "../../ui/Arrow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGroupData } from "../../../redux/slice/group/group";
import { YalliContext } from "../../../Context/YalliContext";

const Group = () => {
  const groups = useSelector((state) => state.groups.groups);
  const { allGroups } = useContext(YalliContext);
  const dispatch = useDispatch();
  const [allData, setAllGroupData] = useState({
    ...groups,
  });

  useEffect(() => {
    dispatch(
      getGroupData({
        page: 0,
        size: 18,
        title: "",
        country: "",
        categories: [""],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setAllGroupData(groups);
  }, [groups]);

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
    navigate(`/qrup/${id}`);
  };

  return (
    <div>
      {
        <div className={styles["group"]}>
          <div className={allGroups?.length > 0 ? "container" : "dp-none"}>
            <div className={styles["groups"]}>
              <div className={styles["hero_text"]}>
                <h2>İcmalar</h2>
                <p
                  onClick={() =>
                    navigate("/groups")
                  }
                >
                  Hamısına bax
                </p>
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
                      <div
                        key={index}
                        onClick={() => handleCardClick(group.id)}
                      >
                        <Card key={index} sectionName={"group"} group={group} />
                      </div>
                    ))}
                </div>
                <div className={styles["right_arrow"]} onClick={scrollRightBtn}>
                  <Arrow />
                </div>
              </div>
              <div className="response-group">
                {allData &&
                  allData.content?.slice(0, 4).map((group, index) => (
                    <div key={index} onClick={() => handleCardClick(group.id)}>
                      <Card key={index} sectionName={"group"} group={group} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Group;
