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
    age:z.number().min(15,{message:validationMessage.INVALID_AGE}),
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
    name:z.string().min(4,{message:validationMessage.INVALID_NAME}),
    email:z.string().email({message:validationMessage.INVALID_EMAIL}),
    password:z.string().min(8,{message:validationMessage.INVALID_PASSWORD}),
    confirmPassword:z.string(),
    gender:z.string(),
    age:z.number().min(15,{message:validationMessage.INVALID_AGE}),
    yearsOfExperience:z.number().positive({message:validationMessage.NEGETIVE_YEARSOF_EXP}),
    trainerCertificate:z.custom<FileList>((val)=>val instanceof FileList,{
        message:validationMessage.INVALID_FILE_TYPE
    }).refine((files)=>files.length === 1,{
        message:validationMessage.REQUIRE_SINGLE_FILE
    }).refine((files)=>files[0].type === 'application/pdf',{
        message:validationMessage.PDF_REQUIRED
    }).refine((files)=>files[0].size<= 5*1024*1024,{
        message:validationMessage.EXCESS_FILE_SIZE
    })
})