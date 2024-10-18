import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import LoginForm from "../../components/login/LoginForm";
import Arrow from "../../components/ui/Arrow";

const Login = () => {
  const [authClick, setAuthClick] = useState(true);
  const handleAuthClick = (status) => {
    setAuthClick(status);
  };

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
            onClick={() => {
              navigate("/login");
              handleAuthClick(true);
            }}
          >
            Giriş
          </button>
          <button
            className={`${styles["btn"]} ${!authClick && styles["active"]}`}
            onClick={() => {
              navigate("/register");
              handleAuthClick(false);
            }}
          >
            Qeydiyyat
          </button>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
