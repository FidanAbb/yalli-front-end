import React from "react";
import styles from "./style.module.scss";
import msimg from "../../../assets/img/mission.svg";
const Mission = () => {
  return (
    <>
      <div className={styles["mission"]}>
        <div className="container">
          <div className={styles["mission"]}>
            <div className={styles["left"]}>
              <img src={msimg} alt="" />
              <h2>Vizyonumuz</h2>
            </div>
            <div className={styles["right"]}>
              <p>
                Azərbaycan icmalarını yalnız rəqəmsal məkanda birləşdirməklə
                kifayətlənməyərək, onları qlobal səviyyədə sosial, peşəkar və
                mədəniyyət səfirlərinə çevirməkdir. Bizim məqsədimiz Azərbaycan
                icmasını dünya miqyasında tanınan, həmrəy və güclü bir gücə
                çevirməkdir.{" "}
              </p>
              <p>
                Platformamız azərbaycanlıların hər hansı bir ölkədə bir-birinə
                dəstək olduğu, milli dəyərləri paylaşdığı və yeni imkanlar
                yaratdığı mərkəz olacaq. Bu platforma vasitəsilə gənclər peşəkar
                inkişaf edə biləcək, icmalar isə yeni layihələr, əməkdaşlıqlar
                və təşəbbüslər üçün təkan verəcək.{" "}
              </p>
              <p>
                Uzunmüddətli hədəfimiz, Yalli.org-un təkcə icmalar üçün bir
                görüş nöqtəsi deyil, həm də dünya miqyasında Azərbaycanlıların
                uğur hekayələrinin başladığı yer olmasıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["mission2"]}>
        <div className="container">
          <div className={styles["mission2"]}>
            <div className={styles["right"]}>
              <p>
                Dünyanın müxtəlif guşələrində yaşayan Azərbaycanlıları bir araya
                gətirərək onların birliyini, milli kimliyini və dəyərlərini
                qorumaqdır. Biz yalnız fərdləri deyil, eyni zamanda Azərbaycanlı
                icmaları (community-ləri) da toplamağı və onları vahid bir
                platformada birləşdirməyi hədəfləyirik.
              </p>
              <p>
                Bu icmaların güclənməsi və inkişafı üçün xüsusi imkanlar
                yaradırıq, xüsusilə də Mentorluq Proqramımız vasitəsilə gəncləri
                təcrübəli peşəkarlarla birləşdirərək onların xarici ölkələrdə
                professional və şəxsi inkişafına dəstək oluruq.
              </p>
            </div>

            <div className={styles["left"]}>
              <div className={styles["img"]}>
                <img src={msimg} alt="" />
              </div>

              <h2>Missiyamız</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mission;
