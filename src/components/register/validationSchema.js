import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  fullName: Yup.string()
  .required('Adınız tələb olunur')
  .matches(/^[\p{L}\s]+$/u, "Zəhmət olmasa yalnız hərf daxil edin") 
  .test('Adınız tələb olunur', 'Adınız tələb olunur', value => {
    return value && value.trim().length > 0; 
  }),

  email: Yup.string().email("Düzgün e-poçt daxil edin").required("E-poçt tələb olunur"),
  // birthDate: Yup.date().required("Doğum tarixi tələb olunur"),
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
