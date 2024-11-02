import React, { useState, useEffect, useContext } from "react";
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
import { getUserDataById } from "../../redux/slice/user/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  
  const {setUserID}=useContext(YalliContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    
    try {
      setLoading(true);
      const response = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { accessToken } = response.data;
        sessionStorage.setItem("accessToken", accessToken);
        if(response.data.id){
          setUserID(response.data.id);
          localStorage.setItem("userID", JSON.stringify(response.data.id));
          getUserDataById(response.data.id)
        }
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setApiError("Yanlış e-poçt və ya şifrə.");
      } else {
        setApiError("Bir xəta baş verdi. Yenidən cəhd edin.");
      }
      console.error("Login Error: ", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Xoş Gəlmisiniz 👋🏻</h1>

      <div className={styles["input_field"]}>
        <input
          {...register("email")}
          type="email"
          placeholder="E-posta ünvanı"
        />
        {errors.email && (
          <span>
            <Warning />
            {errors.email.message}
          </span>
        )}
      </div>

      <div className={styles["input_field"]}>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Şifrə"
        />
        <div
          className={styles["eye"]}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <PasswordEyeOpen /> : <PasswordEye />}
        </div>
        {touchedFields.password && errors.password && (
          <span>
            <Warning />
            {errors.password.message}
          </span>
        )}
      </div>

      <p
        className={styles["forgot"]}
        onClick={() => navigate("/forgot-password")}
      >
        Şifrənizi unutmusunuz?
      </p>

      {apiError && <p className={styles["error-message"]}>{apiError}</p>}

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
