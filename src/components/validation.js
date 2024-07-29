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
  contact: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      "Contact number must be exactly 10 digits and contain only numbers"
    )
    .required("Contact number is required"),
});

const newsLetterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const enquirySchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "Only alphabets without spaces and special characters are allowed"
    )
    .required("This field is required"),
  lastName: yup
    .string()
    .matches(
      /^[a-zA-Z]+$/,
      "Last Name should contain only alphabets without spaces or special characters"
    )
    .required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  message: yup.string().required("This field is required"),
});

const locationSchema = yup.object().shape({
  flate: yup.string().required("this field is required"),
  landmark: yup.string().required("this field is required"),
  name: yup.string().required("this field is required"),
});

const validateOrder = yup.object().shape({
  selectedOption: yup.string().required("Please select an option."),
  selectedAddress: yup.string().when("selectedOption", {
    is: "delivery",
    then: yup
      .string()
      .required("Please select a shipping address for delivery."),
  }),
  selectedFranchise: yup.string().when("selectedOption", {
    is: "pickup",
    then: yup.string().required("Please select a shop for pickup."),
  }),
  orderTime: yup.string().required("Please select an order time."),
  orderDate: yup.string().required("Please select an order date."),
});

export {
  loginSchema,
  otpSchema,
  profileSchema,
  validationSchema,
  newsLetterSchema,
  enquirySchema,
  locationSchema,
  validateOrder,
};
