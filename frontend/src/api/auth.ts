import { setProfileCompletionStatus, setToken } from "./localStorage";
import { axiosInstance } from "./axiosInstance";
import { SignupFormatInputs } from "@/interfaces/user/IsignUpFomatInput";
import { LoginFormInput } from "@/interfaces/IloginFormInput";
import { TrainerSignupData } from "@/interfaces/trainer/ItrainerSignupInputs";
import { AdminLoginFormInput } from "@/interfaces/admin/ILoginFormInput";
import { trainerLogout } from "@/reduxStore/slices/trainer-slice";
import { logout } from "@/reduxStore/slices/user-slice";
import { adminLogout } from "@/reduxStore/slices/admin-slice";
import { store } from "@/reduxStore/store";

const API = import.meta.env.VITE_BASE_URL
export const login = async(loginData:LoginFormInput)=>{
    try {
        const response = await axiosInstance.post(`${API}/${loginData.role}/auth/login`,{email:loginData.email,password:loginData.password},{withCredentials:true})
    setToken(response.data.data.accessToken)
    return response
    } catch (error) {
        throw error
    }
}

export const authLogout = async()=>{
    try {
        const response = await axiosInstance.post(`${API}/auth/logout`,{},{withCredentials:true})
        return(response.data.success)
    } catch (error) {
        throw error
    }
}

export const findByEmail = async(email:string)=>{
    try {
        return await axiosInstance.get(`${API}/auth/check-email?email=${email}`)
    } catch (error) {
        throw error
    }
}
export const adminLogin = async(data:AdminLoginFormInput)=>{
   try {
    const response = await axiosInstance.post(`${API}/admin/auth/login`,data,{withCredentials:true})
    setToken(response.data.accessToken)
    return response
   } catch (error) {

     throw error
   }
}

export const signUp = async(data:SignupFormatInputs)=>{
    try {
        const response = await axiosInstance.post(`${API}/user/auth/signup`,data,{withCredentials:true})
    if(response.data)
    return response
    } catch (error) {
        throw error
    }
}

export const trainerSignup = async(data:TrainerSignupData)=>{
    try {
        const response = await axiosInstance.post(`${API}/trainer/auth/signup`,data,{withCredentials:true})
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
            `${API}/auth/google/gettoken`,
            {token,role},{withCredentials:true}
        )
        if(response.data){
            setToken(response.data.data.accessToken)
            setProfileCompletionStatus(response.data.data.userNew)
            return response
        }

    } catch (error) {
        
        throw error
    }
}



export const refreshToken = async(role:string)=>{
    
    try {
        console.log('thisi si refershtmethod ')
        const {data} = await axiosInstance.post(`${API}/token/refresh/${role}`,{},{withCredentials:true})
        setToken(data.accessToken)
        return data.accessToken
    } catch (error) {
       
        throw error
    }
}

export const logoutTrainer = async ()=>{
    store.dispatch(trainerLogout())
    authLogout()
}

export const logoutUser = async ()=>{
    store.dispatch(logout())
    authLogout()
}

export const logoutAdmin = async()=>{
    store.dispatch(adminLogout())
    authLogout()
}