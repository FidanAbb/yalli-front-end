import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import CreateGroup from "../../creategroup/CreateGroup";
import { useNavigate } from "react-router-dom";
const Hero = ({ setGroupData }) => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const loggedUser = localStorage.getItem("accessToken");
    if (loggedUser) {
      setUserData(loggedUser);
    }
  }, []);
  return (
    <div className={styles["hero"]}>
      <div className="my-container">
        <div className={styles["hero"]}>
          <div className={styles["detail"]}>
            <div className={styles["p"]}>
              Bizim platformamızda müxtəlif maraq və ehtiyaclara uyğun “
              <span className={styles["group_text"]}>İcmalar</span>” mövcuddur.
              Əyləncə, təhsil, iş imkanları və digər mövzularda yaradılmış
              qruplar vasitəsilə xaricdə yaşayan həmyerlilərimiz bir araya gələ,
              bilik və təcrübə paylaşa, yeni dostluqlar qura bilərlər.{" "}
            </div>
            <p>Həyatına dəyərli insanlar qat və birləşməyin gücünü hiss et!</p>
            <button
              onClick={() => (userData ? setModal(true) : navigate("/login"))}
            >
              Öz icmanı əlavə et
            </button>
          </div>
        </div>

        {modal && (
          <div
            className={styles["modalOverlay"]}
            onClick={() => setModal(false)}
          >
            <div
              className={styles["modalContent"]}
              onClick={(e) => e.stopPropagation()}
            >
              <CreateGroup setModal={setModal} setGroupumData={setGroupData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
