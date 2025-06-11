import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string().trim().min(4,'name cannot be empty or below 4 character').required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  age: yup.number()
    .typeError('Age must be a number')
    .min(10,'You must be at least 10 year old to proceed ')
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .required("Age is required"),
  fitnessGoal: yup.string().required("Please select your fitness goal"),
  fitnessLevel: yup.string().required("Please select your fitness level"),
});