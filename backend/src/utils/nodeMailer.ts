import nodemailer from "nodemailer"
import { emailMessages } from "../messages/mail-related"
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})


export const sendMail = async (to:string,subject:string=emailMessages.OTP_SUBJECT,text:string) =>{
    try {
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject,
            text
        })

    } catch (error) {
        throw error
        
    }
}