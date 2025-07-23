import * as yup from "yup";

export const userProfileEditSchema = yup.object().shape({
  name: yup.string().transform((value, originalValue) => originalValue === '' ? undefined : (value)).min(4,'Need atleast 4 characters').required("Name is required"),
  email: yup.string().transform((value, originalValue) => originalValue === '' ? undefined : value).required(),
  gender: yup.string().transform((value, originalValue) => originalValue === '' ? undefined : value).required("Gender is required"),
  age: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : Number(value))
    .typeError('Age must be a number')
    .min(10, "You must be at least 10 year old to proceed")
    .max(100,'age must be below 100')
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .required("Age is required"),
  fitnessGoal: yup.string().required("select your fitness goal"),
  fitnessLevel: yup.string().required("select your fitness level"),
  phone: yup
    .string()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .required("Phone number is required")
    .matches(
      /^(\+91)?\d{10}$/,
      "Phone number must be 10 digits (with optional +91)"
    ),
  weight: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : Number(value))
    .required("Your weight is required")
    .min(40, "Your weight must be atleast 40")
    .max(300,'age must be below 300')
    .positive("Weight must be a positive number"),
  height: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : Number(value))
    .required("Your height is required")
    .min(120, "Your height should be atleast 120 cm")
    .max(250,'Height must be below 250 cm')
    .positive("Height should be a positive value"),
});
