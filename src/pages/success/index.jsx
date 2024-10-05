import React,{useState, useEffect} from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  useEffect(() => {
    const pass = localStorage.getItem("pass");
    if (pass) {
      setPass(pass);
    }
  }, []);

  return (
    <div className={styles["success"]}>
      <div className={styles["success_window"]}>
        <h1>{pass ? "Şifrə sıfırlandı!" : "Təbrik edirik!"}</h1>
        {!pass && <h1>Bitirdiniz!</h1>}

        <p>
          {pass
            ? "Şifrəniz uğurla sıfırlandı, girişinizə davam etmək üçün aşağıya klikləyin."
            : "Hesabınızı uğurla yaratdınız!"}
        </p>
        <button onClick={() => navigate("/auth")}>Davam edin</button>
      </div>
    </div>
  );
};

export default Success;
