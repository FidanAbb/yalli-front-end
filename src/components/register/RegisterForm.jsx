import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api.config";
import styles from "./style.module.scss";
import { signUpValidationSchema } from "./validationSchema";
import Warning from "../ui/Warning";
import PasswordEye from "../ui/PasswordEye";
import PasswordEyeOpen from "../ui/PasswordEyeOpen";
import Xicon from "../ui/Xicon";
import TrueIcon from "../ui/TrueIcon";
import DownArrow from "../ui/DownArrow";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onBlur",
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/users/register", data);

      if (response.status === 201) {
        localStorage.setItem("email-confirm", JSON.stringify(data.email));
        navigate("/confirm-email");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "EMAIL_ALREADY_EXISTS"
      ) {
        setApiError("Bu e-poçt artıq qeydiyyatdadır.");
      } else {
        setApiError("Bir xəta baş verdi. Birdaha sınayın.");
      }
      console.error("Registration Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Hesabınızı yaradın</h1>

      <div className={styles["input_field"]}>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Ad və Soyad"
        />
        {errors.fullName && <span>{errors.fullName.message}</span>}
      </div>

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
        <select
          {...register("country")}
          id="country"
          style={{
            color: `${errors.country ? "red" : ""}`,
            border: `1px solid ${errors.country ? "red" : ""}`,
          }}
        >
          <option value="" disabled hidden>
            Ölkə seçin
          </option>
          <option value="azerbaijan">Azərbaycan</option>
          <option value="turkey">Türkiyə</option>
          <option value="usa">ABŞ</option>
          <option value="uk">Böyük Britaniya</option>
        </select>
        <div className={styles["downarrow"]}>
          <DownArrow />
        </div>
        {errors.country && (
          <span>
            <Warning />
            {errors.country.message}
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
    onClick={() => setShowPassword(!showPassword)}
    className={styles["eye"]}
  >
   {
            showPassword ? <PasswordEyeOpen />: <PasswordEye />
        }
  </div>
  {touchedFields.password && errors.password && (
    <span>
      <Warning />
      {errors.password.message}
    </span>
  )}

</div>


      <div className={styles["input_field"]}>
        <input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Şifrəni təkrarlayın"
        />
        <div
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className={styles["eye"]}
        >
          {
            showConfirmPassword ? <PasswordEyeOpen />: <PasswordEye />
        }
        </div>
        {errors.confirmPassword && (
          <span>
            <Warning />
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {apiError && <p className={styles["error-message"]}>{apiError}</p>}

      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={!isValid || loading}
      >
        {loading ? "Göndərilir..." : "Qeydiyyatdan keç"}
      </button>
    </form>
  );
};

export default RegisterForm;