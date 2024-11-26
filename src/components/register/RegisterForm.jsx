import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api.config";
import styles from "./style.module.scss";
import { signUpValidationSchema } from "./validationSchema";
import Warning from "../ui/Warning";
import PasswordEye from "../ui/PasswordEye";
import PasswordEyeOpen from "../ui/PasswordEyeOpen";
import DownArrow from "../ui/DownArrow";
import { toast } from "react-toastify";
import { YalliContext } from "../../Context/YalliContext";
import "./register.css";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const countryCategory = [
  "Azərbaycan",
  "Türkiyə",
  "Rusiya",
  "Almaniya",
  "ABŞ",
  "Ukrayna",
  "Böyük Britaniya",
  "Kanada",
  "Fransa",
  "İsrail",
  "Gürcüstan",
  "İtaliya",
  "Avstraliya",
  "İspaniya",
  "Niderland",
  "Avstriya",
  "İsveç",
  "Belçika",
  "Norveç",
  "Finlandiya",
  "Macarıstan",
  "Polşa",
  "Yunanıstan",
  "Slovakiya",
  "Litva",
  "Latviya",
  "Estoniya",
  "Qazaxıstan",
  "BƏƏ",
  "Yaponiya",
  "İran",
  "Səudiyyə Ərəbistanı",
  "Belarus",
  "Moldova",
  "Qırğızıstan",
  "Tacikistan",
  "Türkmənistan",
  "Özbəkistan",
  "Malayziya",
  "Sinqapur",
  "Braziliya",
  "Argentina",
  "Meksika",
  "Vietnam",
  "Bali (İndoneziya)",
  "İsveçrə",
  "Portuqaliya",
  "Cənubi Koreya",
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [checked, setChecked] = useState(false);
  const { isRegisterOtp, setIsRegisterOtp } = useContext(YalliContext);
  const [policyState, setPolicyState] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onBlur",
  });

  const password = watch("password", "");
  const selectedCountry = watch("country");

  const onSubmit = async (data) => {
    try {
      if (!checked) {
        toast.info("Şərtləri qəbul etməlisiniz");
        return;
      }
      setLoading(true);
      const response = await api.post("/users/register", data);

      if (response.status === 201) {
        localStorage.setItem("email-confirm", JSON.stringify(data.email));
        navigate("/confirm-email");
        setIsRegisterOtp(true);
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
      <h1 style={{ fontWeight: "700", fontSize: "28px", textAlign: "center" }}>
        Hesabınızı yaradın
      </h1>

      <div className={styles["input_field"]}>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Ad və Soyad"
          style={{ width: "100%" }}
        />
        {errors.fullName && <span>{errors.fullName.message}</span>}
      </div>

      <div className={styles["input_field"]}>
        <input
          {...register("email")}
          type="email"
          placeholder="E-posta ünvanı"
          style={{ width: "100%" }}
        />
        {errors.email && (
          <span>
            <Warning />
            {errors.email.message}
          </span>
        )}
      </div>

      {policyState && (
        <div className="Privacy-Policy">
          <PrivacyPolicy setPolicyState={setPolicyState} />
          <div
            onClick={() => {
              setPolicyState(false);
            }}
            className="my-bg-color"
          ></div>
        </div>
      )}
      {/* <div className={styles["input_field"]}>
        <select
          {...register("country")}
          id="country"
          style={{
            color: `${errors.country ? "red" : ""}`,
            border: `1px solid ${errors.country ? "red" : ""}`,
            width: "100%",
            padding: "1rem .8rem",
          }}
        >
          <option value="" disabled hidden>
            Ölkə seçin
          </option>
          {countryCategory.map((c, i) => (
            <option key={i} value="azerbaijan">
              {c}
            </option>
          ))}
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
      </div> */}

      <div className="register-drop-down">
        <div>
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`head ${errors.country ? "error" : ""}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedCountry || "Ölkə Seçin"}
            {showDropdown ? (
              <IoIosArrowUp onClick={() => setShowDropdown(true)} />
            ) : (
              <IoIosArrowDown onClick={() => setShowDropdown(false)} />
            )}
          </div>

          {showDropdown && (
            <div className="body">
              <div className="body-con">
                {countryCategory.map((c, i) => (
                  <div
                    className="item"
                    key={i}
                    onClick={() => {
                      setValue("country", c); // Hook Form-a dəyər təyin edilir
                      setShowDropdown(false); // Dropdown bağlanır
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {errors.country && (
          <span className="error">{errors.country.message}</span>
        )}
      </div>

      <div className={styles["input_field"]}>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Şifrə"
          style={{ width: "100%" }}
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={styles["eye"]}
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

      <div className={styles["input_field"]}>
        <input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Şifrəni təkrarlayın"
          style={{ width: "100%" }}
        />
        <div
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className={styles["eye"]}
        >
          {showConfirmPassword ? <PasswordEyeOpen /> : <PasswordEye />}
        </div>
        {errors.confirmPassword && (
          <span>
            <Warning />
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div
        className={styles["remember_me"]}
        // style={{ marginLeft: `${!isSignUp ? "-200px" : ""}` }}
      >
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          type="checkbox"
          id="rememberme"
        />
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPolicyState(true);
          }}
        >
          <>
            {`Mən `}
            <span>Yalli-nin Məxfilik Siyasəti</span>
            {` və `}
            <span>Xidmət Şərtləri</span>
            {` ilə razıyam`}
          </>
        </p>
      </div>

      {apiError && <p className={styles["error-message"]}>{apiError}</p>}

      <button
        type="submit"
        className={styles["submit-button"]}
        disabled={!isValid || loading}
        style={{
          marginTop: "2rem",
        }}
      >
        {loading ? "Göndərilir..." : "Qeydiyyatdan keç"}
      </button>
    </form>
  );
};

export default RegisterForm;
