import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import LoginForm from "../../components/login/LoginForm";
import Arrow from "../../components/ui/Arrow";
import { useSelector } from "react-redux";

const Login = () => {
  const [forServerError, setForServerError] = useState();
  const user = useSelector((state) => state.users.user);
  
  
  useEffect(() => {
    if (user) {
      setForServerError(user);
    }
  }, [user]);
  const [authClick, setAuthClick] = useState(true);
  const handleAuthClick = (status) => {
    setAuthClick(status);
  };

  const navigate = useNavigate();

  return (
    <div className={styles["login"]}>
      {console.log(forServerError)}
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
