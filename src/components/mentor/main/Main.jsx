import React from "react";
import Sidebar from "../../ui/pageSidebar/PageSideBar";
const Main = () => {
  return (
    <div className={styles["main"]}>
      <div className={styles["sidebar"]}>
        <Sidebar />
      </div>
      <div className="cards">
        {/* hansi sehifedeyemse o datani map edib card i cagirirsan.
        cagirdigin card qruplardisa card componentine qruplar datasini, 
        eventler sehifesidise event datasini gonderirsen props kimi.
        mentorlardisa MentorsCard componentini cagirib onu map edeceksen ve ora mentor datasi gondereceksen.
        datalari diger sehifeelrden goture bilersen
        map et, flew wrap ver asagi dussunler yerlesmeyende
        */}
      </div>
    </div>
  );
};

export default Main;
