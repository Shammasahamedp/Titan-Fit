import {axiosInstance} from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL

export const sendOtp = async(email:string)=>{
    return axiosInstance.post(`${API}/otp/send`,{email})
}

export const verifyOtp = async(email:string,otp:string)=>{
    console.log('this is verifyotp')
    return axiosInstance.post(`${API}/otp/verify`,{email,otp})
}

