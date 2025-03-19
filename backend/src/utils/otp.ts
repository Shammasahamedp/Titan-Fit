import { sendMail } from "./nodeMailer";

export const generateOtp = ()=>Math.floor(100000+Math.random()*900000).toString()

export const sendOtpEmail = async(email:string,otp:string)=>{
    const subject = "Your OTP Code";
    const message = `Your OTP code is : ${otp} ,it will expire in 5 minutes`
    await sendMail(email,subject,message)
    return true
}