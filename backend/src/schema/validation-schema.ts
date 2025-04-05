import {z} from "zod"
import { validationMessage } from "../messages/validation-message"

export const loginSchema = z.object({
    email:z.string().email({message:validationMessage.INVALID_EMAIL}),
    password:z.string().min(8,{message:validationMessage.INVALID_PASSWORD})
})

export const signUpSchema = z.object({
    name:z.string().min(4,{message:validationMessage.INVALID_NAME}),
    email:z.string().email({message:validationMessage.INVALID_EMAIL}),
    password:z.string().min(8,{message:validationMessage.INVALID_PASSWORD}),
    confirmPassword:z.string(),
    gender:z.string(),
    age:z.number().min(10,{message:validationMessage.INVALID_AGE}),
    fitnessGoal:z.enum(['fatloss','buildmuscle','maintenance'],{
        errorMap:()=>({message:validationMessage.INVALID_FITNESSGOAL})
    }),
    fitnessLevel:z.enum(['beginner','intermediate','advanced'],{
        errorMap:()=>({message:validationMessage.INVALID_FITNESSLEVEL})
    })

}).refine((data)=>data.password === data.confirmPassword,{
    message:validationMessage.PASSWORD_MISMATCH,
    path:["confirmPassword"]
})

export const trainerSignupSchema = z.object({
    name:z.string().min(4,{message:validationMessage.INVALID_NAME}).nonempty('Name is required'),
    email:z.string().email({message:validationMessage.INVALID_EMAIL}).nonempty('Email is required'),
    password:z.string().min(8,{message:validationMessage.INVALID_PASSWORD}).nonempty('Password is required'),
    confirmPassword:z.string().nonempty('Confirm password is required'),
    gender:z.string().nonempty('Gender is required'),
    age:z.number().min(15,{message:validationMessage.INVALID_AGE}),
    yearsOfExperience:z.number().positive({message:validationMessage.NEGETIVE_YEARSOF_EXP}),
    trainerCertificate:z.string({message:validationMessage.REQUIRE_SINGLE_FILE}).nonempty('Cerificate is required')
})


export const userProfileEditSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().min(8, "Email must be at least 8 characters").nonempty("Email is required"),
  gender: z.string().nonempty("Gender is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .int("Age must be a whole number")
    .positive("Age must be a positive number")
    .min(10, "You must be at least 10 year old to proceed"),
  fitnessGoal: z.string().nonempty("select your fitness goal"),
  fitnessLevel: z.string().nonempty("select your fitness level"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^(\+91)?\d{10}$/, "Phone number must be 10 digits (with optional +91)"),
  weight: z
    .number({ invalid_type_error: "Weight must be a number" })
    .min(40, "Your weight must be atleast 40")
    .positive("Weight must be a positive number"),
  height: z
    .number({ invalid_type_error: "Height must be a number" })
    .min(120, "Your height should be atleast 120 cm")
    .positive("Height should be a positive value"),
});
