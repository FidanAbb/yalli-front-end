import React, { useState ,useContext} from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Warning from "../../components/ui/Warning";
import { api } from "../../../api.config";
import { YalliContext } from "../../Context/YalliContext";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
const {setIsRegisterOtp}=useContext(YalliContext)
  const API_ENDPOINT = "/users/reset-password/request";

  const ERROR_MESSAGES = {
    empty: "E-poçt daxil edin",
    invalid: "Düzgün e-poçt daxil edin",
    notFound: "E-poçt ünvanı tapılmadı",
    serverError: "Serverə qoşulmadı",
    unknown: "E-poçt ünvanı yalnışdır",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage(ERROR_MESSAGES.empty);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(ERROR_MESSAGES.invalid);
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(API_ENDPOINT, { email });
      switch (response.status) {
        case 204:
          localStorage.setItem("resetEmail", JSON.stringify(email));
          setIsRegisterOtp(false)
          navigate("/confirm-email");
          localStorage.setItem("afterRegister",false)
          break;
          
        case 404:
          setErrorMessage(ERROR_MESSAGES.notFound);
          break;
        default:
          setErrorMessage(ERROR_MESSAGES.unknown);
          break;
      }
    } catch (error) {
      setErrorMessage(ERROR_MESSAGES.serverError);
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Girişə qayıt</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
