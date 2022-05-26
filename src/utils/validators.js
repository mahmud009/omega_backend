import * as yup from "yup";
import { yupInputValidate } from "./utils";

const passwordSchema =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g;

export const RegisterValidate = yupInputValidate(
  yup.object().shape({
    name: yup.string().required("Please enter your name."),
    phone: yup.string().required("Please enter your phone."),
    email: yup.string().email("Email is not valid.").required("Please enter your email."),
    password: yup
      .string()
      .required("Please enter your password.")
      .matches(
        passwordSchema,
        "Password must contain uppercase and lowercase letter, number, special chars and must be 8 digit length."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type your password."),
  })
);

export const LoginValidate = yupInputValidate(
  yup.object().shape({
    email: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
  })
);
