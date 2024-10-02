import React from "react";
import hero from "../../../assets/img/abouthero.svg";
import styles from "./style.module.scss"
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className="container">
        <div className={styles["hero"]}>
          <img src={hero} alt="" />
         <div className={styles["detail"]}>
         <p>
            Yalli.org - dünyanın müxtəlif ölkələrində yaşayan azərbaycanlıları
            bir araya gətirən platformadır. Bizim məqsədimiz azərbaycanlıların
            birliyini möhkəmləndirmək, milli dəyərlərimizi qoruyub saxlamaq və
            dünyadakı azərbaycanlılar arasında güclü əlaqələr qurmaqdır.
          </p>
          <p>
            Yallı adı qədim Azərbaycan rəqsi olan, hətta Qobustan qayalarında
            belə əks olunan Yallı rəqsindən ilhamlanmışdır – birlik, güvən və
            həmrəylik simvoludur. Bu rəqs kimi biz də bütün dünyada olan
            Azərbaycan icmasının vahid bir ailə kimi birgə hərəkət etməsini
            istəyir, arzulayır və xoş niyyətlə bu yola çıxırıq.
          </p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
