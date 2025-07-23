import * as yup from "yup";

export const trainerSignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
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
    .oneOf([yup.ref("password")], "password must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .transform((value, originalValue) => {
      if (originalValue === "" || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue);
    })
    .max(50, "Age must be below 50")
    .min(20, "Age must be above 20")

    .positive("Age must be a positive number")
    .integer("Age must be a whole number"),

  yearsOfExperience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Years of experience is required")
    .transform((value, originalValue) => {
      if (originalValue === "" || isNaN(originalValue)) {
        return undefined;
      }
      return Number(originalValue);
    })
    .min(0, "Experience must be a positive number")
    .max(25, "Experience must be below 25 years"),

  trainerCertificate: yup
    .mixed<FileList>()
    .required("PDF File is required")
    .test("FileListType", "Only pdf FileLists are allowed", (value) => {
      if (!value) {
        return false;
      }
      return (
        value instanceof FileList &&
        value.length === 1 &&
        value[0].type === "application/pdf"
      );
    })
    .test("FileListSize", "FileList size must be less than 5MB", (value) => {
      if (!value[0]) {
        return false;
      }
      return value instanceof FileList && value[0].size <= 5 * 1024 * 1024;
    }),
  bio: yup
    .string()
    .required("Bio is required")
    .test("minWords", "Enter at least two words", (value: any) => {
      if (!value) {
        return false;
      }
      console.log(value);
      return value ? value.trim().split(/\s+/).length >= 2 : false;
    }),
});
