import * as yup from "yup";

const loginSchema = yup.object().shape({
  mobile: yup.string().required("Mobile or Email is required"),
  // password: yup.string().required("Password is required"),
});

// // Validation schema for registration
// const registrationSchema = yup.object().shape({
//   firstName: yup.string().required("First Name is required"),
//   // Add more fields and validation rules for registration here
//   mobile: yup.string().required("Mobile is required"),
//   // Add more fields and validation rules for registration here
// });

export { loginSchema,
    //  registrationSchema
     };
