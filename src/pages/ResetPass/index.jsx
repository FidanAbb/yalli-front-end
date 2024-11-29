import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Warning from "../../components/ui/Warning";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { api } from "../../../api.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./resetpass.css";
import PasswordEye from "../../components/ui/PasswordEye";
import PasswordEyeOpen from "../../components/ui/PasswordEyeOpen";
const ResetPass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState({});
  const [isPassword, setIsPassword] = useState(false);
  const [isPassowrdOne,setIsPassowrdOne]=useState()
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Parol tələb olunur")
      .min(8, "Parol ən azı 8 simvol olmalıdır")
      .max(20, "Parol ən çox 20 simvol olmalıdır")
      .matches(/[A-Z]/, "Parolda ən azı bir böyük hərf olmalıdır")
      .matches(
        /[0-9!@%^&*()_+=-]/,
        "Parolda ən azı bir rəqəm və ya simvol olmalıdır"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifrələr uyğun deyil")
      .required("Şifrəni təkrarlamaq tələb olunur"),
  });

  const { register, handleSubmit, formState, setError, watch } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { errors, touchedFields } = formState;
  const password = watch("password", "");

  useEffect(() => {
    const currentErrors = Object.keys(errors).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setErrorFields(currentErrors);
  }, [errors]);

  const onSubmit = async (data) => {
    setLoading(true);
    const resetEmail = localStorage.getItem("resetEmail");

    try {
      const response = await api.post("/users/reset-password", {
        email: JSON.parse(resetEmail),
        newPassword: data.password,
      });

      if (response.status === 204) {
        localStorage.setItem("pass", true);
        navigate("/success");
        localStorage.setItem("afterChangePass",true)
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Unexpected error:", error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["forgot_pass"]}>
      <div className={styles["forgot_window"]}>
        <h1>Yeni parol yaradın</h1>
        <p>
          Yeni parol daxil edin. Yeni parol əvvəlki istifadə etdiyiniz paroldan
          fərqli olmalıdır.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input_field"]}>
            <div className="password-eye">
              <input
                {...register("password")}
                type={isPassowrdOne ? "password" : "text"}
                id="password"
                placeholder="Şifrə"
                style={{
                  color: errorFields.password ? "red" : "inherit",
                  border: `1px solid ${
                    errorFields.password ? "red" : "inherit"
                  }`,
                }}
              />
               <div
                className="icon"
                onClick={() => setIsPassowrdOne((prev) => !prev)}
              >
                {isPassowrdOne ? <PasswordEyeOpen /> : <PasswordEye />}
              </div>
            </div>
            {touchedFields.password && errors.password && (
              <span>
                <Warning />
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles["input_field"]}>
            <div className="password-eye">
              <input
                {...register("confirmPassword")}
                type={isPassword ? "password" : "text"}
                id="confirmPassword"
                placeholder="Şifrəni təkrarlayın"
                style={{
                  color: errorFields.confirmPassword ? "red" : "inherit",
                  border: `1px solid ${
                    errorFields.confirmPassword ? "red" : "inherit"
                  }`,
                }}
              />
              <div
                className="icon"
                onClick={() => setIsPassword((prev) => !prev)}
              >
                {isPassword ?<PasswordEyeOpen  /> : <PasswordEye />}
              </div>
            </div>
            {touchedFields.confirmPassword && errors.confirmPassword && (
              <span>
                <Warning />
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Göndərilir..." : "Şifrəni sıfırla"}
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

export default ResetPass
