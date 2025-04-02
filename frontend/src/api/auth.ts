import { setToken } from "./localStorage";
import { axiosInstance } from "./axiosInstance";
import { SignupFormatInputs } from "@/interfaces/user/IsignUpFomatInput";
import { LoginFormInput } from "@/interfaces/IloginFormInput";
import { TrainerSignupData } from "@/interfaces/trainer/ItrainerSignupInputs";
import { AdminLoginFormInput } from "@/interfaces/admin/ILoginFormInput";




export const login = async(loginData:LoginFormInput)=>{
    try {
        const response = await axiosInstance.post(`http://localhost:3000/${loginData.role}/auth/login`,{email:loginData.email,password:loginData.password},{withCredentials:true})
        console.log(response)
    setToken(response.data.data.accessToken)
    return response
    } catch (error) {
        throw error
    }
}

export const authLogout = async()=>{
    try {
        const response = await axiosInstance.post('http://localhost:3000/auth/logout',{},{withCredentials:true})
        return(response.data.success)
    } catch (error) {
        throw error
    }
}

export const findByEmail = async(email:string)=>{
    try {
        return await axiosInstance.get(`http://localhost:3000/auth/check-email?email=${email}`)
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
        const response = await axiosInstance.post('http://localhost:3000/trainer/auth/signup',data,{withCredentials:true})
    if(response.data){
        return response
    }
    } catch (error) {
        throw error
    }
}

export const googleLogin = async(token:string,role:string)=>{
    try {
        const response = await axiosInstance.post(
            'http://localhost:3000/auth/google/gettoken',
            {token,role},{withCredentials:true}
        )
        if(response.data){
            console.log('this is response.data',response.data)
            setToken(response.data.data.accessToken)
            return response
        }

    } catch (error) {
        
        console.log('error in googlesign',error)
        throw error
    }
}



export const refreshToken = async()=>{
    
    try {
        console.log('thisi si refershtmethod ')
        const {data} = await axiosInstance.post('http://localhost:3000/token/refresh',{},{withCredentials:true})
        setToken(data.accessToken)
        return data.accessToken
    } catch (error) {
       
        throw error
    }
}