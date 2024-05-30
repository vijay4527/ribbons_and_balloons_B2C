import * as yup from "yup";

const loginSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .typeError("Otp must be a number")
    .required("Otp is required")
    .test("len", "otp must be 4 digit", (val) => val.toString().length === 4),
});

const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  pinCode: yup
    .string()
    .matches(/^\d{6}$/, "Pin code must be exactly 6 digits")
    .required("Pin code is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  country: yup.string().required("country is required"),
});

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup.string().required("Pin code is required"),
  country: yup.string().required("Country is required"),
  address: yup.string().required("Address is required"),
});

const newsLetterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export { loginSchema, otpSchema, profileSchema, validationSchema,newsLetterSchema };
