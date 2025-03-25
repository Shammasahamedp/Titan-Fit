import { setToken,clearToken } from "./localStorage";
import { axiosInstance } from "./axiosInstance";
import { SignupFormatInputs } from "@/interfaces/user/IsignUpFomatInput";
import { LoginFormInput } from "@/interfaces/IloginFormInput";
import { TrainerSignupData } from "@/interfaces/trainer/ItrainerSignupInputs";
import { AdminLoginFormInput } from "@/interfaces/admin/ILoginFormInput";

export const login = async(data:LoginFormInput)=>{
    try {
        const response = await axiosInstance.post(`http://localhost:3000/${data.role}/auth/login`,{email:data.email,password:data.password})
    setToken(response.data.accessToken)
    return response
    } catch (error) {
        throw error
    }
}

export const adminLogin = async(data:AdminLoginFormInput)=>{
   try {
    const response = await axiosInstance.post('http://localhost:3000/admin/auth/login',data,{withCredentials:true})
    setToken(response.data.accessToken)
    return response
   } catch (error) {

     throw error
   }
}

export const signUp = async(data:SignupFormatInputs)=>{
    try {
        const response = await axiosInstance.post('http://localhost:3000/user/auth/signup',data,{withCredentials:true})
    if(response.data)
    return response
    } catch (error) {
        throw error
    }
}

export const trainerSignup = async(data:TrainerSignupData)=>{
    try {
        const response = await axiosInstance.post('http://localhost:3000/trainer/auth/signup',data)
    if(response.data){
        return response
    }
    } catch (error) {
        throw error
    }
}

export const googleLogin = async(token:string)=>{
    try {
        
    } catch (error) {
        console.log('error in googlesign',error)
    }
}

export const logout = ()=>{
    clearToken()

}

export const refreshToken = async()=>{
    
    try {
        const {data} = await axiosInstance.post('http://localhost:3000/token/refresh',{},{withCredentials:true})
        setToken(data.accessToken)
        return data.accessToken
    } catch (error) {
        logout()
        throw error
    }
}