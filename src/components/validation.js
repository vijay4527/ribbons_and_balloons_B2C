import * as yup from "yup";

const loginSchema = yup.object().shape({
  mobile: yup
  .string() // Convert mobile number to string
  .required("Mobile Number is required")
  .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
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
