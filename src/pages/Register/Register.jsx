import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import RegisterForm from "../../components/register/RegisterForm";
import Arrow from "../../components/ui/Arrow";

const Register = () => {
  const [authClick, setAuthClick] = useState(true);
  const handleAuthClick = (status) => {
    setAuthClick(status);
  };

  const navigate = useNavigate();

  return (
    <div className={styles["register"]}>
      <div className={styles["register_window"]}>
        <div className={styles["arrow"]} onClick={() => navigate(`/`)}>
          <Arrow />
        </div>
        <div className={styles["navigate_btns"]}>
          <button
            className={`${styles["btn"]} ${!authClick && styles["active"]}`}
            onClick={() => {
              navigate("/login");
              handleAuthClick(false);
            }}
          >
            Giriş
          </button>
          <button
            className={`${styles["btn"]} ${authClick && styles["active"]}`}
            onClick={() => {
              navigate("/register");
              handleAuthClick(true);
            }}
          >
            Qeydiyyat
          </button>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
