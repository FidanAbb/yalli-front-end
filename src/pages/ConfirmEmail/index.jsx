import React, { useState, useEffect, useContext } from "react";
import Arrow from "../../components/ui/Arrow";
import confirmEmail from "../../assets/img/confirmEmail.svg";
import styles from "./style.module.scss";
import { api } from "../../../api.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { YalliContext } from "../../Context/YalliContext";

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
  const [attempts, setAttempts] = useState(0); // Cəhdləri izləmək üçün
  const [blocked, setBlocked] = useState(false); // Bloklama statusu
  const [blockTime, setBlockTime] = useState(null); // Bloklama vaxtı
  const { isRegisterOtp, setIsRegisterOtp } = useContext(YalliContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email-confirm");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setResetEmail(JSON.parse(storedEmail));
    }
  }, []);

  useEffect(() => {
    if (blocked) {
      const unblockTime = setTimeout(() => {
        setBlocked(false);
        setAttempts(0); 
      }, 5 * 60 * 1000); 
      return () => clearTimeout(unblockTime);
    }
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
      } else if (response.status === 204 && !isRegisterOtp) {
        navigate("/reset-password"); // Şifrə sıfırlama üçün uğurlu səhifə
      }
    } catch (error) {
      setAttempts((prev) => prev + 1); // Cəhdləri artır
      if (attempts + 1 >= 3) {
        setBlocked(true);
        setBlockTime(Date.now());
        setError("3 cəhddən sonra hesab 5 dəqiqəlik bloklanıb.");
      } else {
        setError(`Xəta baş verdi. Yenidən cəhd edin. (${attempts + 1}/3)`);
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (blocked) {
      setError("Bu email bloklanıb. Zəhmət olmasa 5 dəqiqə gözləyin.");
      return;
    }
    if (countdown > 0 || loading) {
      // Yenidən göndərmək üçün countdown'un bitməsini və loading dəyişənin false olmasını gözləyirik
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    setCountdown(60); // Yenidən göndərildikdən sonra countdown'u yenidən 60 saniyəyə qururuq

    try {
      const response = await api.get(`/users/send-otp?email=${email}`);
      if (response.status === 200) {
        setOtpSent(true);
        setSuccess("Yeni OTP kodu göndərildi!");
      } else {
        throw new Error("OTP göndərilmədi");
      }
    } catch (error) {
      setError("OTP göndərmə zamanı xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["confirm_email"]}>
      <div className={styles["confirm_window"]}>
        <div className={styles["arrow"]} onClick={() => navigate(`/register`)}>
          <Arrow />
        </div>
        <img src={confirmEmail} alt="" />
        <h1>Zəhmət olmasa hesabı doğrulayın!</h1>
        <p className="mx-auto">
          Biz indicə sizə doğrulama kodunu {formatEmail(email)} ünvanına
          göndərdik
        </p>
        {blocked && (
          <p style={{width:"80%",margin:"0 auto",position:"relative",left:"5.7rem"}} className={`${styles.error} ${styles.errorHighlight}`}>
            Hesabınız 5 dəqiqəlik bloklanıb. Zəhmət olmasa gözləyin.
          </p>
        )}
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
            onClick={() => navigate("/register")}
          >
            Ləğv edin
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmail;
