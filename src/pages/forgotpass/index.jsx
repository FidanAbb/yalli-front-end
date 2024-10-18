import React, { useState } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Warning from "../../components/ui/Warning";
import { api } from "../../../api.config";
const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("E-poçt daxil edin");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Düzgün e-poçt daxil edin");
      return;
    }

    try {
        
      setLoading(true);
      const response = await api.post(`/users/reset-password/request?email=${email}`);

      if (response.status === 204) {
        localStorage.setItem("resetEmail", JSON.stringify(email));
        navigate("/confirm-email");
      } else if (response.status === 404) {
        setErrorMessage("E-poçt ünvanı tapılmadı");
      } else {
        setErrorMessage("E-poçt ünvanı yalnışdır");
      }
    } catch (error) {
      setErrorMessage("Serverə qoşulmadı");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles["forgot_pass"]}>
      <div className={styles["forgot_window"]}>
        <h1>Şifrənizi unutmusunuz?</h1>
        <p>Narahat olmayın, biz sizə sıfırlama təlimatlarını göndərəcəyik.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles["input_field"]}>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta ünvanı"
              style={{
                border: `1px solid ${errorMessage ? "red" : ""}`,
              }}
            />
            {errorMessage && (
              <span style={{ color: "red" }}>
                {" "}
                <Warning />
                {errorMessage}
              </span>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Göndərilir..." : "Təqdim edin"}
          </button>
        </form>
        <div className={styles["giris"]} onClick={() => navigate("/login")}>
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
