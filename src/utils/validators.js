import * as yup from "yup";
import { yupInputValidate } from "./utils";

export const RegisterValidate = yupInputValidate(
  yup.object().shape({
    userName: yup.string().required("Please enter your username."),
    email: yup.string().email("Email is not valid.").required("Please enter your email."),
    password: yup.string().required("Please enter your password."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type your password."),
  })
);

export const LoginValidate = yupInputValidate(
  yup.object().shape({
    userName: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
  })
);
