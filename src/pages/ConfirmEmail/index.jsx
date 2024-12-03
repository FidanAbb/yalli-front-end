import React, { useState, useEffect, useContext } from "react";
import Arrow from "../../components/ui/Arrow";
import confirmEmail from "../../assets/img/confirmEmail.svg";
import styles from "./style.module.scss";
import { api } from "../../../api.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { YalliContext } from "../../Context/YalliContext";
import "./style.css";
const ConfirmEmail = () => {
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [otpInputFilled, setOtpInputFilled] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false); 
  const [blockTime, setBlockTime] = useState(null); 
  const { isRegisterOtp, setIsRegisterOtp, setAfterRegisterState } =
    useContext(YalliContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email-confirm");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setResetEmail(JSON.parse(storedEmail));
    }
  }, []);

  useEffect(() => {
    let timer;

    if (blocked) {
      setCountdown(5 * 60); 
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer); 
            setBlocked(false); 
            setAttempts(0); 
            return 0;
          }
          return prev - 1; // Geri sayım
        });
      }, 1000);
    } else {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [blocked]);

  const formatEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    return `${username.slice(0, 2)}**@${domain.slice(-1)}`;
  };

  const handleOtpChange = (index, value) => {
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value.slice(-1);
    setOtpCode(newOtpCode);
    setOtpInputFilled(newOtpCode.every((digit) => digit !== ""));

    if (value && index < otpCode.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otpCode[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("Text").slice(0, 6);
    const newOtpCode = pastedData.split("");
    while (newOtpCode.length < 6) newOtpCode.push("");
    setOtpCode(newOtpCode);
    setOtpInputFilled(newOtpCode.every((digit) => digit !== ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blocked) {
      setError("Hesab 5 dəqiqəlik bloklanıb. Zəhmət olmasa gözləyin.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    const otpString = otpCode.join("");

    try {
      // Endpointi və emaili `isRegisterOtp`-ə görə seçirik
      const endpoint = isRegisterOtp
        ? "/users/confirm"
        : "/users/reset-password/verify";
      const payloadEmail = isRegisterOtp ? email : resetEmail;

      const response = await api.post(endpoint, {
        email: payloadEmail,
        otp: otpString,
      });

      if (response.status === 204 && isRegisterOtp) {
        setSuccess(true);
        navigate("/success");
        localStorage.setItem("afterRegister", true);
      } else if (response.status === 204 && !isRegisterOtp) {
        navigate("/reset-password");
        localStorage.setItem("afterRegister", true);
        localStorage.setItem("afterChangePass", false);
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      if (attempts + 1 >= 3) {
        setBlocked(true);
        setBlockTime(Date.now());
        setError("3 cəhddən sonra hesab 5 dəqiqəlik bloklanıb.");
      } else {
        setError(`Zəhmət olmasa kodu düzgün daxil edin (${attempts + 1}/3)`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (countdown > 0) return; // Əgər geri sayım bitməyibsə, funksiya işləməsin
    try {
      setLoading(true);
      setError(null);
      const endpoint = isRegisterOtp
        ? "/users/register/resend-otp"
        : "/users/reset-password/request";
      const payloadEmail = isRegisterOtp ? email : resetEmail;

      await api.post(endpoint, { email: payloadEmail });
      setCountdown(60); // Yenidən geri sayımı başlat
      setSuccess("Kod yenidən göndərildi!");
    } catch (error) {
      setError(
        "Kodun yenidən göndərilməsi mümkün olmadı. Zəhmət olmasa sonra cəhd edin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["confirm_email"]}>
      <div className={styles["confirm_window"]}>
        <div className={styles["arrow"]}  onClick={() => navigate(`${isRegisterOtp ?"/register":"/forgot-password"}`)}>
          <Arrow />
        </div>
        <img src={confirmEmail} alt="" />
        <h1>Zəhmət olmasa hesabı doğrulayın!</h1>
        <p className="mx-auto">
          Biz indicə sizə doğrulama kodunu {formatEmail(email)} ünvanına
          göndərdik
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles["otp_code"]}>
            {otpCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                className={styles["otp"]}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(e)}
                maxLength="1"
                disabled={blocked}
              />
            ))}
          </div>
          <p
            onClick={countdown === 0 ? handleResendOtp : null} 
            className={"resend-text"}
            style={{
              color: countdown === 0 ? "#ff4d4f" : "#A2A2A2", 
              cursor: countdown === 0 ? "pointer" : "default", 
              pointerEvents: countdown === 0 ? "auto" : "none", 
            }}
          >
            {countdown > 0
              ? `Kodu ${countdown} saniyə sonra yenidən göndərin`
              : "Otp yenidən göndər"}
          </p>
          {error && <span className={styles["error"]}>{error}</span>}
          <button
            type="submit"
            disabled={loading || blocked || !otpInputFilled}
          >
            {loading ? "Göndərilir..." : "Təsdiq edin"}
          </button>
          <button
            className={styles["legv"]}
            type="button"
            onClick={() => navigate(`${isRegisterOtp ?"/register":"/forgot-password"}`)}
          >
            Ləğv edin
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmail;
