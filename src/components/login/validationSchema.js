import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signUpValidationSchema = Yup.object().shape({
  fullname: Yup.string()
  .matches(/^[a-zA-ZşŞğĞöÖçÇıİ]+$/, "Zəhmət olmasa yalnız hərf daxil edin")
  .required("Adınız tələb olunur"),
  email: Yup.string().email("Düzgün e-poçt daxil edin").required("E-poçt tələb olunur"),
  birthdate: Yup.date().required("Doğum tarixi tələb olunur"),
  country: Yup.string().required("Ölkə tələb olunur"),
  password: Yup.string()
  .required("Parol tələb olunur")
  .min(8, "Parol ən azı 8 simvol olmalıdır")
  .max(20, "Parol ən çox 20 simvol olmalıdır")
  .matches(/[A-Z]/, "Parolda ən azı bir böyük hərf olmalıdır")
  .matches(/[0-9!@%^&*()_+=-]/, "Parolda ən azı bir rəqəm və ya simvol olmalıdır"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifrələr uyğun deyil")
    .required("Şifrəni təkrarlamaq tələb olunur"),
});
