import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL

export const sendLinkToMail = async (email:string)=>{
    return axiosInstance.post(`${API}/reset-password/send-link`,{email})
}

export const verifyLinkAndSetPassword = async (password:string,token:string)=>{
    return axiosInstance.post(`${API}/reset-password/verify`,{password,token})
}