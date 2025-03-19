import {axiosInstance} from "./axiosInstance"

export const sendOtp = async(email:string)=>{
    return axiosInstance.post('/otp/send',{email})
}

export const verifyOtp = async(email:string,otp:string)=>{
    return axiosInstance.post('/otp/verify',{email,otp})
}