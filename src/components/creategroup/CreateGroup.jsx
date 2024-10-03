import React from "react";
import styles from "./style.module.scss";
import PlusIcon from "../ui/PlusIcon"
const CreateGroup = () => {
  return (
    <div className={styles["create_group"]}>
      <h1>Öz icmanı yarat</h1>
      <div className={styles["form"]}>
        <form action="">
          <div className={styles["img"]}>
            <PlusIcon/>
          </div>
          <input
            type="text"
            name=""
            id=""
            placeholder="İcmanın adı"
            className={styles["inp"]}
          />
          <select
            name="country"
            id="country"
            placeholder="Ölkə"
            className={styles["inp"]}
          >
            <option value=""></option>
            <option value="">AZ</option>
          </select>
          <select
            name="category"
            id="category"
            placeholder="Kateqoriya"
            className={styles["inp"]}
          >
            <option value=""></option>
            <option value=""></option>
          </select>
          <input
            type="url"
            name=""
            id=""
            placeholder="Link"
            className={styles["inp"]}
          />
          <input
            type="number"
            name=""
            id=""
            placeholder="Üzv sayı"
            className={styles["inp"]}
          />
          <textarea
            name=""
            id=""
            placeholder="Haqqında (50-160 simvol)"
          ></textarea>
          <button type="submit">Yarat</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
