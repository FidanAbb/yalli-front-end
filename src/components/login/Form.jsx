import React, { useState } from "react";
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

const Form = ({ isSignUp }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [successState, setSuccessState] = useState(null);

  const validationSchema = isSignUp
    ? signUpValidationSchema
    : loginValidationSchema;

  const { register, handleSubmit, reset, formState, setError, watch } = useForm(
    {
      resolver: yupResolver(validationSchema),
    }
  );

  const password = watch("password", "");
  const { errors, touchedFields } = formState;
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

      if (resp.status === 200) {
        console.log(resp.data, "lalalalla");
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
      <h1>{isSignUp ? "Hesabınızı yaradın" : "Xoş Gəlmisiniz 👋🏻"}</h1>

      {isSignUp && (
        <div className={styles["input_field"]}>
          <input
            {...register("fullName")}
            type="text"
            id="fullName"
            placeholder="Ad və Soyad"
            style={{
              color: `${errors.fullName && "red"}`,
              border: `1px solid ${errors.fullName && "red"}`,
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
            color: `${errors.email && "red"}`,
            border: `1px solid ${errors.email && "red"}`,
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
          {/* <div className={styles["input_field"]}>
            <input
              {...register("birthDate")}
              type="date"
              id="birthDate"
              placeholder="DD/MM/YY"
              style={{
                color: `${errors.birthDate && "red"}`,
                border: `1px solid ${errors.birthDate && "red"}`,
              }}
            />
            {errors.birthDate && (
              <span>
                <Warning />
                {errors.birthDate.message}
              </span>
            )}
          </div> */}

          <div className={styles["input_field"]}>
            <select
              {...register("country")}
              id="country"
              style={{
                color: `${errors.country ? "red" : ""}`,
                border: `1px solid ${errors.country ? "red" : ""}`,
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
          type="password"
          id="password"
          placeholder="Şifrə"
          style={{
            color: `${errors.password && "red"}`,
            border: `1px solid ${errors.password && "red"}`,
          }}
        />
        {touchedFields.password && errors.password && (
          <span>
            <Warning />
            {errors.password.message}
          </span>
        )}
        <div className={styles["eye"]}>
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
            type="password"
            id="confirmPassword"
            placeholder="Şifrəni təkrarlayın"
            style={{
              color: `${errors.confirmPassword && "red"}`,
              border: `1px solid ${errors.confirmPassword && "red"}`,
            }}
          />
          {errors.confirmPassword && (
            <span>
              <Warning />
              {errors.confirmPassword.message}
            </span>
          )}
          <div className={styles["eye"]}>
            <PasswordEye />
          </div>
        </div>
      )}
      <p className={styles["forgot"]}>
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

      <button type="submit" disabled={loading}>
        {loading ? "Yüklənir..." : isSignUp ? "Qeydiyyatdan Keç" : "Giriş"}
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
