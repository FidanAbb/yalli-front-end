import React,{useState, useEffect,useContext} from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { YalliContext } from "../../Context/YalliContext";

const Success = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const {isRegisterOtp,setIsRegisterOtp}=useContext(YalliContext)
  useEffect(() => {
    const pass = localStorage.getItem("pass");
    if (pass) {
      setPass(pass);
    }
  }, []);

  return (
    <div className={styles["success"]}>
      <div className={styles["success_window"]}>
        <h1>{!isRegisterOtp ? "Şifrə sıfırlandı!" : "Təbrik edirik!"}</h1>
    

        <p style={{fontSize:"1.2rem"}}>
          {isRegisterOtp
             ?"Hesabınızı uğurla yaratdınız!"
             :"Şifrəniz uğurla sıfırlandı, girişinizə davam etmək üçün aşağıya klikləyin."
             }
        </p>
        <button onClick={() => {
          navigate("/login")
          setIsRegisterOtp(false)
        }}>Davam edin</button>
      </div>
    </div>
  );
};

export default Success
