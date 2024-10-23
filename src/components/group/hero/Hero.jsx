
import React, {useState} from "react";
import styles from "./style.module.scss";
import CreateGroup from "../../creategroup/CreateGroup";
const Hero = ({setGroupData}) => {
  const [modal, setModal] = useState(false)
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>
          <div className={styles["detail"]}>
            <div className={styles["p"]}>
              Bizim platformamızda müxtəlif maraq və ehtiyaclara uyğun “<span className={styles["group_text"]}>İcmalar</span>”
              mövcuddur. Əyləncə, təhsil, iş imkanları və digər mövzularda
              yaradılmış qruplar vasitəsilə xaricdə yaşayan həmyerlilərimiz bir
              araya gələ, bilik və təcrübə paylaşa, yeni dostluqlar qura
              bilərlər.{" "}
            </div>
            <p>
              Həyatına dəyərli insanlar qat və birləşməyin gücünü hiss et!
            </p>
            <button onClick={()=> setModal(true)}>Öz icmanı əlavə et</button>
          </div>
        </div>

        {modal && (
          <div className={styles["modalOverlay"]} onClick={() => setModal(false)}>
            <div className={styles["modalContent"]} onClick={(e) => e.stopPropagation()}>
              <CreateGroup setModal={setModal} setGroupumData={setGroupData}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
