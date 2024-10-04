import React from 'react'
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["success"]}>
        <div className={styles["success_window"]}>
            <h1>Təbrik edirik!</h1>
            <h1> Bitirdiniz!</h1>
            <p>Hesabınızı uğurla yaratdınız!</p>
            <button onClick={()=> navigate("/auth")}>Davam edin</button>
        </div>
    </div>
  )
}

export default Success