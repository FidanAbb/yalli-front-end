import React,{useEffect} from "react";
import styles from "./style.module.scss";
import Form from "../../components/login/Form";
import Arrow from "../../components/ui/Arrow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  
  const [authClick, setAuthClick] = useState(true);
  const handleAuthClick = () => {
    setAuthClick(!authClick);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();


  return (
    <div className={styles["login"]}>
      <div className={styles["login_window"]}>
        <div className={styles["arrow"]} onClick={() => navigate(`/`)}>
          <Arrow />
        </div>
        <div className={styles["navigate_btns"]}>
          <button
            className={`${styles["btn"]} ${authClick && styles["active"]}`}
            onClick={() => handleAuthClick()}
          >
            Giriş
          </button>
          <button
            className={`${styles["btn"]} ${!authClick && styles["active"]}`}
            onClick={() => handleAuthClick()}
          >
            Qeydiyyat
          </button>
        </div>
        <div
          className={`${styles.formContainer} ${
            initialLoad
              ? styles.slideInFromRight // Load from right initially
              : authClick
              ? styles.slideInFromLeft // Slide in from left when switching back to "Giriş"
              : styles.slideInFromRight // Slide in from right when switching to "Qeydiyyat"
          }`}
        >
          <Form isSignUp={!authClick} />
        </div>
      </div>
    </div>
  );
};

export default Login;
