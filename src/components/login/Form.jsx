import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../api.config";
import styles from "./style.module.scss";
import Warning from "../ui/Warning"
import PasswordEye from "../ui/PasswordEye"

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Düzgün e-poçt daxil edin")
    .required("e-poçt tələb olunur"),
  password: yup
    .string()
    .min(6, "Şifrə ən az 6 simvol olmalıdır")
    .required("şifrə tələb olunur"),
});

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [successState, setSuccessState] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const resp = await api.post("user/sign-in", data);
      if (resp.status === 200) {
        const { accessToken } = resp.data;

        if (checked) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("userInfo");
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userInfo", JSON.stringify(data));
        } else {
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("userInfo", JSON.stringify(data));
        }
        setSuccessState(true);
        reset();
      }
    } catch (error) {
      const findError = error.response?.data;
      if (findError?.status === 400) {
        findError.errors.forEach((err) => {
          setError(err.property, { message: err.message });
        });
        setSuccessState(false);
      } else if (findError?.status === 401) {
        setSuccessState(false);
      } else {
        setSuccessState(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Xoş Gəlmisiniz 👋🏻</h1>

      <div className={styles["input_field"]}>
        <input
          {...register("email")}
          type="text"
          id="email"
          placeholder="E-posta ünvanı"
          style={{color: `${errors.email && "red"}`, border: `1px solid ${errors.email && "red"}`}}
        />
        {errors.email && (
          <span>
       <Warning/>
            {errors.email.message}
          </span>
        )}
      </div>

      <div className={styles["input_field"]}>
      
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Şifrə"
          style={{color: `${errors.password && "red"}`, border: `1px solid ${errors.password && "red"}`}}
        />
        {errors.password && (
          <span>
       <Warning/>
            {errors.password.message}
          </span>
        )}
       <div className={styles["eye"]}>
       <PasswordEye/>
       </div>
      </div>

      <p className={styles["forgot"]}>Şifrənizi unutmusunuz?</p>

      <div className={styles["remember_me"]}>
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          type="checkbox"
          id="rememberme"
        />
        <p>Məni xatırla</p>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "yüklənir..." : "Giriş"}
      </button>

      {successState !== null && (
        <div className={styles["success__message"]}>
          <h1>{successState ? "Ugurlu!" : "Ugursuz!"}</h1>
        </div>
      )}
    </form>
  );
};

export default Form;
