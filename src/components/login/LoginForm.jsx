import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "./validationSchema";
import { api } from "../../../api.config";
import styles from "./style.module.scss";
import Warning from "../ui/Warning";
import PasswordEye from "../ui/PasswordEye";
import PasswordEyeOpen from "../ui/PasswordEyeOpen";
import { useNavigate } from "react-router-dom";
import { YalliContext } from "../../Context/YalliContext";
import welcomeImage from "../../../src/assets/img/Xoş Gəlmisiniz 👋🏻.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isEmailError, setIsEmailError] = useState(""); // Yeni state
  const { setUserID, setAccessToken } = useContext(YalliContext);
  const [isPassWord, setIsPassWord] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setIsEmailError(""); // Reset email error
      const response = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { accessToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("accessToken", accessToken);

        if (response.data.id) {
          setUserID(response.data.id);
          localStorage.setItem("userID", JSON.stringify(response.data.id));
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.message === "INVALID_PASSWORD") {
          setIsPassWord("Şifrə düzgün daxil edilməyib");
        } else if (status === 404 && data.message === "User not found") {
          setIsEmailError("Bu e-poçt ünvanına aid hesab tapılmadı.");
        } else {
          setApiError("Bir xəta baş verdi. Yenidən cəhd edin.");
        }
      } else {
        setApiError("Serverə qoşulmaq mümkün olmadı.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: "2rem" }}
      className={styles.form}
    >
      <div className={styles["welcome-image"]}>
        <img src={welcomeImage} alt="Welcome" />
      </div>

      {/* Email Input */}
      <div className={styles["input_field"]}>
        <input
          {...register("email")}
          type="email"
          placeholder="E-posta ünvanı"
          style={{
            width: "100%",
            border:
              isEmailError || errors.email ? "1px solid red" : "1px solid #ccc",
            color: isEmailError || errors.email ? "red" : "#000",
          }}
          onChange={(e) => {
            setIsEmailError(""); // Email dəyişəndə error reset edilir
            register("email").onChange(e); // React Hook Form-un onChange hadisəsini saxlayır
          }}
        />
        {(errors.email || isEmailError) && (
          <span className={styles["error-message"]}>
            <Warning />
            {errors.email?.message || isEmailError}
          </span>
        )}
      </div>

      {/* Password Input */}
      <div className={styles["input_field"]}>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Şifrə"
          style={{
            width: "100%",
            border:
              isPassWord || errors.password
                ? "1px solid red"
                : "1px solid #ccc",
            color: isPassWord || errors.password ? "red" : "#000",
          }}
        />
        <div
          className={styles["eye"]}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <PasswordEyeOpen /> : <PasswordEye />}
        </div>
        {errors.password || isPassWord ? (
          <span className={styles["error-message"]}>
            <Warning />
            {errors.password ? errors.password.message : isPassWord}
          </span>
        ) : null}
      </div>

      <p
        className={styles["forgot"]}
        onClick={() => navigate("/forgot-password")}
      >
        Şifrənizi unutmusunuz?
      </p>

      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={!isValid || loading}
      >
        {loading ? "Göndərilir..." : "Giriş"}
      </button>
    </form>
  );
};

export default LoginForm;
