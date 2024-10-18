import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Düzgün e-poçt daxil edin").required("E-poçt tələb olunur"),
  password: Yup.string()
  .required("Parol tələb olunur")
  .min(8, "Parol ən azı 8 simvol olmalıdır")
  .max(20, "Parol ən çox 20 simvol olmalıdır")
  .matches(/[A-Z]/, "Parolda ən azı bir böyük hərf olmalıdır")
  .matches(/[0-9!@%^&*()_+=-]/, "Parolda ən azı bir rəqəm və ya simvol olmalıdır"),
});


