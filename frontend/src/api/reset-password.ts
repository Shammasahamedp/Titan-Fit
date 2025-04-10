import { axiosInstance } from "./axiosInstance"

export const sendLinkToMail = async (email:string)=>{
    return axiosInstance.post('http://localhost:3000/reset-password/send-link',{email})
}

export const verifyLinkAndSetPassword = async (email:string,password:string,token:string)=>{
    return axiosInstance.post('http://localhost:3000/reset-password/verify',{email,password,token})
}