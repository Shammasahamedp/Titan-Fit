import { setToken,getRefreshToken,clearToken } from "./localStorage";
import { axiosInstance } from "./axiosInstance";
import { SignupFormatInputs } from "@/interfaces/IsignUpFomatInput";
import { LoginFormInput } from "@/interfaces/IloginFormInput";
import { TrainerSignupData } from "@/interfaces/ItrainerSignupInputs";

export const login = async(data:LoginFormInput)=>{
    const response = await axiosInstance.post(`http://localhost:3000/${data.role}/auth/login`,{email:data.email,password:data.password})
    setToken(response.data.accessToken,response.data.refreshToken)
    return response
}

export const signUp = async(data:SignupFormatInputs)=>{
    const response = await axiosInstance.post('http://localhost:3000/user/auth/signup',data)
    if(response.data)
    return response
}

export const trainerSignup = async(data:TrainerSignupData)=>{
    const response = await axiosInstance.post('http://localhost:3000/trainer/auth/signup',data)
    if(response.data){
        return response
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
    const refreshToken = getRefreshToken()

    if(!refreshToken){
        logout()
        return 
    }

    try {
        const {data} = await axiosInstance.post('/token/refresh',{refreshToken})
        setToken(data.accessToken,data.refreshToken)
        return data.accessToken
    } catch (error) {
        logout()
        throw error
    }
}