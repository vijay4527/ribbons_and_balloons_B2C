import * as yup from "yup";

const loginSchema = yup.object().shape({
  mobile: yup.string().required("Mobile or Email is required"),
 
});


const otpSchema = yup.object().shape({
  otp1: yup.string().required("otp is required").matches(/^\d{1}$/),
  otp2: yup.string().required("otp is required").matches(/^\d{1}$/),
  otp3: yup.string().required("otp is required").matches(/^\d{1}$/),
  otp4: yup.string().required("otp is required").matches(/^\d{1}$/),

})

export { loginSchema,otpSchema
     };
