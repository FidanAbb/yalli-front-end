import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../api.config";
import styles from "./style.module.scss";
import Warning from "../ui/Warning";
import PasswordEye from "../ui/PasswordEye";
import {
  loginValidationSchema,
  signUpValidationSchema,
} from "./validationSchema";
import Xicon from "../ui/Xicon";
import TrueIcon from "../ui/TrueIcon";
import DownArrow from "../ui/DownArrow";
import { useNavigate } from "react-router-dom";

const Form = ({ isSignUp }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [successState, setSuccessState] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const validationSchema = isSignUp
    ? signUpValidationSchema
    : loginValidationSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const password = watch("password", "");
  const { errors, touchedFields, isValid, isSubmitting } = formState;
  useEffect(() => {
    const currentErrors = Object.keys(errors).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setErrorFields(currentErrors);
  }, [errors]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const endpoint = isSignUp ? "/users/register" : "/users/login";

      const signUpdata = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        country: data.country,
        birthDate: data.birthDate,
      };

      const signIndata = {
        email: data.email,
        password: data.password,
      };

      const resp = isSignUp
        ? await api.post(endpoint, signUpdata)
        : await api.post(endpoint, signIndata);

      if (resp.status === 200 && !isSignUp) {
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
      } else if (resp.status === 201 && isSignUp) {
        localStorage.setItem("email-confirm", JSON.stringify(signUpdata.email));
        navigate("/confirm-email");
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
      <h1>{isSignUp ? "Hesabınızı yaradın" : "Xoş Gəlmisiniz 👋🏻"}</h1>

      {isSignUp && (
        <div className={styles["input_field"]}>
          <input
            {...register("fullName")}
            type="text"
            id="fullName"
            placeholder="Ad və Soyad"
            style={{
              color: `${errorFields.fullName && "red"}`,
              border: `1px solid ${errorFields.fullName && "red"}`,
            }}
          />
          {errors.fullName && (
            <span>
              <Xicon />
              {errors.fullName.message}
            </span>
          )}
        </div>
      )}

      <div className={styles["input_field"]}>
        <input
          {...register("email")}
          type="text"
          id="email"
          placeholder="E-posta ünvanı"
          style={{
            color: `${errorFields.email && "red"}`,
            border: `1px solid ${errorFields.email && "red"}`,
          }}
        />
        {errors.email && (
          <span>
            <Warning />
            {errors.email.message}
          </span>
        )}
      </div>

      {isSignUp && (
        <>
          <div className={styles["input_field"]}>
            <select
              {...register("country")}
              id="country"
              style={{
                color: `${errorFields.country ? "red" : ""}`,
                border: `1px solid ${errorFields.country ? "red" : ""}`,
              }}
            >
              <option value="" disabled selected hidden>
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
        </>
      )}

      <div className={styles["input_field"]}>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Şifrə"
          style={{
            color: `${errorFields.password && "red"}`,
            border: `1px solid ${errorFields.password && "red"}`,
          }}
        />
        {touchedFields.password && errors.password && (
          <span>
            <Warning />
            {errors.password.message}
          </span>
        )}
        <div
          className={styles["eye"]}
          onClick={() => setShowPassword(!showPassword)}
        >
          <PasswordEye />
        </div>
        {isSignUp && (
          <div
            className={
              styles[`${touchedFields.password && "password-requirements"}`]
            }
          >
            <div>
              {touchedFields.password &&
                (password.length >= 8 ? <TrueIcon /> : <Xicon />)}
              <span style={{ color: password.length >= 8 ? "green" : "red" }}>
                {touchedFields.password &&
                  (password.length >= 8
                    ? "Parol 8 simvoldan ibarət olmalıdır."
                    : "8 simvol")}
              </span>
            </div>
            <div>
              {touchedFields.password &&
                (password.length <= 20 ? <TrueIcon /> : <Xicon />)}
              <span style={{ color: password.length <= 20 ? "green" : "red" }}>
                {touchedFields.password &&
                  (password.length <= 20
                    ? "Parol 20 simvoldan çox olmamalıdır."
                    : "20 simvola qədər")}
              </span>
            </div>
            <div>
              {touchedFields.password &&
                (/[A-Z]/.test(password) ? <TrueIcon /> : <Xicon />)}
              <span style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
                {touchedFields.password &&
                  (/[A-Z]/.test(password)
                    ? "Parolda ən azı bir böyük hərf olmalıdır."
                    : "1 böyük hərf")}
              </span>
            </div>
            <div>
              {touchedFields.password &&
                (/[0-9!@%^&*()_+=-]/.test(password) ? <TrueIcon /> : <Xicon />)}
              <span
                style={{
                  color: /[0-9!@%^&*()_+=-]/.test(password) ? "green" : "red",
                }}
              >
                {touchedFields.password &&
                  (/[0-9!@%^&*()_+=-]/.test(password)
                    ? "Parolda ən azı bir rəqəm/simvol olmalıdır."
                    : "1 rəqəm/simvol")}
              </span>
            </div>
          </div>
        )}
      </div>

      {isSignUp && (
        <div className={styles["input_field"]}>
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Şifrəni təkrarlayın"
            style={{
              color: `${errorFields.confirmPassword && "red"}`,
              border: `1px solid ${errorFields.confirmPassword && "red"}`,
            }}
          />
          {errors.confirmPassword && (
            <span>
              <Warning />
              {errors.confirmPassword.message}
            </span>
          )}
          <div
            className={styles["eye"]}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <PasswordEye />
          </div>
        </div>
      )}

      <p
        className={styles["forgot"]}
        onClick={() => navigate("/forgot-password")}
      >
        {!isSignUp && "Şifrənizi unutmusunuz?"}
      </p>

      <div
        className={styles["remember_me"]}
        style={{ marginLeft: `${!isSignUp ? "-200px" : ""}` }}
      >
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          type="checkbox"
          id="rememberme"
        />
        <p>
          {!isSignUp ? (
            "Məni xatırla"
          ) : (
            <>
              {`Mən `}
              <span>Yalli-nin Məxfilik Siyasəti</span>
              {` və `}
              <span>Xidmət Şərtləri</span>
              {` ilə razıyam`}
            </>
          )}
        </p>
      </div>

      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={!isValid || isSubmitting || loading}
      >
        {loading ? "Göndərilir..." : isSignUp ? "Qeydiyyatdan keç" : "Giriş"}
      </button>

      {successState === false && (
        <div className={styles["error-message"]}>
          Xəta baş verdi. Yenidən cəhd edin.
        </div>
      )}

      {successState === true && (
        <div className={styles["success-message"]}>Uğurla tamamlandı!</div>
      )}
    </form>
  );
};

export default Form;
