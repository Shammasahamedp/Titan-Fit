import {axiosInstance} from "./axiosInstance"

export const sendOtp = async(email:string)=>{
    return axiosInstance.post('http://localhost:3000/otp/send',{email})
}

export const verifyOtp = async(email:string,otp:string)=>{
    console.log('this is verifyotp')
    return axiosInstance.post('http://localhost:3000/otp/verify',{email,otp})
}

