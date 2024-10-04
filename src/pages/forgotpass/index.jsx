import React from "react";
import styles from "./style.module.scss"
import { useNavigate } from "react-router-dom";
const ForgotPass = () => {
    const navigate = useNavigate();
  return (
    <div className={styles["forgot_pass"]}>
      <div className={styles["forgot_window"]}>
        <h1>Şifrənizi unutmusunuz?</h1>
        <p>Narahat olmayın, biz sizə sıfırlama təlimatlarını göndərəcəyik.</p>

        <form action="">
          <div className={styles["input_field"]}>
            <input
            //   {...register("email")}
              type="text"
              id="email"
              placeholder="E-posta ünvanı"
            //   style={{
            //     color: `${errorFields.email && "red"}`,
            //     border: `1px solid ${errorFields.email && "red"}`,
            //   }}
            />
            {/* {errors.email && (
              <span>
                <Warning />
                {errors.email.message}
              </span>
            )} */}
          </div>

          <button type="submit">Təqdim edin</button>
        </form>
        <div className={styles["giris"]} onClick={()=> navigate("/auth")}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1666 10H3.83325M3.83325 10L8.83325 5M3.83325 10L8.83325 15"
              stroke="#FA4500"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Girişə qayıt</span>
        </div>
        
      </div>
    </div>
  );
};

export default ForgotPass;
