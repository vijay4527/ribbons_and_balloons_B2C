import * as yup from "yup";

const loginSchema = yup.object().shape({
  mobile: yup
    .number()
    .typeError("Mobile number must be a number")
    .positive("Mobile number must be a positive number")
    .integer("Mobile number must be an integer")
    .required("Mobile Number is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val.toString().length === 10
    ),
});

const otpSchema = yup.object().shape({
      otp:  yup.string()
      .typeError("Otp must be a number")
      .required("Otp is required")
      .test(
        "len",
        "otp must be 4 digit",
        (val) => val.toString().length === 4
      ),
    })
 
export { loginSchema, otpSchema };
