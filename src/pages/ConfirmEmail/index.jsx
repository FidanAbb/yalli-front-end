import React, { useState, useEffect } from "react";
import Arrow from "../../components/ui/Arrow";
import confirmEmail from "../../assets/img/confirmEmail.svg";
import styles from "./style.module.scss";
import { api } from "../../../api.config";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const otpString = otpCode.join("");

    try {
      const endpoint = !resetEmail
        ? "/users/confirm"
        : "/users/reset-password/verify";

      const response = resetEmail
        ? await api.post(endpoint, {
            email: resetEmail,
            otp: otpString,
          })
        : await api.post(endpoint, {
            email: email,
            otp: otpString,
          });

      if (response.status === 204 && !resetEmail) {
        setSuccess(true);
        navigate("/success");
      } else if (response.status === 204 && resetEmail) {
        navigate("/reset-password");
      }
    } catch (error) {
      setError("Xəta baş verdi. Yenidən cəhd edin.");
      setErrorOccurred(true);
      setCountdown(60); 
      setOtpSent(false);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setCountdown(60); 

    try {
      const response = await api.get(`/users/send-otp?email=${email}`);

      if (response.status === 200) {
        setOtpSent(true);
        setSuccess("Yeni OTP kodu göndərildi!");
      }
    } catch (error) {
      setError("OTP göndərmə zamanı xəta baş verdi. Yenidən cəhd edin.");
      setErrorOccurred(true);
      setCountdown(60);
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
        <p>
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
                maxLength="1"
              />
            ))}
          </div>
          {error && <span className={styles["error"]}>{error}</span>}
          {countdown < 60 && (
            <span>Kodu {countdown} saniyə sonra yenidən göndərin</span>
          )}
          {!otpSent ? (
            <button type="submit" disabled={loading || !otpInputFilled}>
              {loading ? "Göndərilir..." : "Təsdiq edin"}
            </button>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              disabled={loading || countdown > 0}
            >
              {loading ? "Göndərilir..." : "Yeni OTP göndərin"}
            </button>
          )}
          <button
            className={styles["legv"]}
            type="button"
            onClick={() => navigate("/register")}
          >
            Ləğv edin
          </button>
        </form>
        {otpSent && (
          <p className={styles["otp_sent"]}>Yeni OTP kodu göndərildi!</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
