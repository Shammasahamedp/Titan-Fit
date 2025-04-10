import * as yup from "yup";

export const userProfileEditSchema = yup.object().shape({
  name: yup.string().min(4,'Need atleast 4 characters').required("Name is required"),
  email: yup.string().min(8).required(),
  gender: yup.string().required("Gender is required"),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(10, "You must be at least 10 year old to proceed")
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .required("Age is required"),
  fitnessGoal: yup.string().required("select your fitness goal"),
  fitnessLevel: yup.string().required("select your fitness level"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+91)?\d{10}$/,
      "Phone number must be 10 digits (with optional +91)"
    ),
  weight: yup
    .number()
    .required("Your weight is required")
    .min(40, "Your weight must be atleast 40")
    .positive("Weight must be a positive number"),
  height: yup
    .number()
    .required("Your height is required")
    .min(120, "Your height should be atleast 120 cm")
    .positive("Height should be a positive value"),
});
