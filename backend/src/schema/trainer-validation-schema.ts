import {z} from "zod"
import { validationMessage } from "../messages/validation-message"


export const trainerSignupSchema = z.object({
    name:z.string().min(4,{message:validationMessage.INVALID_NAME}).nonempty('Name is required'),
    email:z.string().email({message:validationMessage.INVALID_EMAIL}).nonempty('Email is required'),
    password:z.string().min(8,{message:validationMessage.INVALID_PASSWORD}).nonempty('Password is required'),
    confirmPassword:z.string().nonempty('Confirm password is required'),
    gender:z.string().nonempty('Gender is required'),
    age:z.number().min(15,{message:validationMessage.INVALID_AGE}),
    bio:z.string().nonempty('bio is required'),
    yearsOfExperience:z.number().positive({message:validationMessage.NEGETIVE_YEARSOF_EXP}),
    trainerCertificate:z.string({message:validationMessage.REQUIRE_SINGLE_FILE}).nonempty('Cerificate is required')
})

export const trainerProfileSchema = z.object({
    name:z.string().min(4,{message:validationMessage.INVALID_NAME}).nonempty('Name is required'),
    email:z.string().email({message:validationMessage.INVALID_EMAIL}).nonempty('Email is required'),
    gender:z.string().nonempty('Gender is required'),
    age:z.number().min(15,{message:validationMessage.INVALID_AGE}),
    yearsOfExperience:z.number().positive({message:validationMessage.NEGETIVE_YEARSOF_EXP}),
    bio:z.string().nonempty('bio is required'),
    phone:z.string()
    .nonempty("Phone number is required")
    .regex(/^(\+91)?\d{10}$/, "Phone number must be 10 digits (with optional +91)"),
})