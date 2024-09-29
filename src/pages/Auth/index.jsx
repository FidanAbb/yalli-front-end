import React from "react";
import styles from "./style.module.scss";
import Form from "../../components/login/Form";
import Arrow from "../../components/ui/Arrow";
import { useState } from "react";
const Login = () => {
  const [authClick, setAuthClick] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleAuthClick = () => {
    setAuthClick(!authClick);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={styles["login"]}>
      <div className={styles["login_window"]}>
        <div className={styles["arrow"]}>
          <Arrow />
        </div>
        <div className={styles["navigate_btns"]}>
          <button
            className={`${styles["btn"]} ${authClick && styles["active"]}`}
            onClick={() => AuthBtnClick()}
          >
            Giriş
          </button>
          <button
            className={`${styles["btn"]} ${!authClick && styles["active"]}`}
            onClick={() => AuthBtnClick()}
          >
            Qeydiyyat
          </button>
        </div>
        <div className={`${styles.formContainer} ${initialLoad ? styles.slideInFromLeft : (authClick ? styles.slideInFromRight : styles.slideOutToLeft)}`}>
          <Form isSignUp={!authClick} />
        </div>
      </div>
    </div>
  );
};

export default Login;
