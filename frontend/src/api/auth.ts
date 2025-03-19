import { setToken,getRefreshToken,clearToken } from "./localStorage";
import { axiosInstance } from "./axiosInstance";
import { SignupFormatInputs } from "@/interfaces/IsignUpFomatInput";

export const signUp = async(data:SignupFormatInputs)=>{
    const response = await axiosInstance.post('http://localhost:3000/auth/signup',data)
    if(response.data)
    return response
}
export const login = async(email:string,password:string)=>{
    const response = await axiosInstance.post('/auth/login',{email,password})
    setToken(response.data.accessToken,response.data.refreshToken)
    return response.data
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
        const {data} = await axiosInstance.post('/auth/refresh',{refreshToken})
        setToken(data.accessToken,data.refreshToken)
        return data.accessToken
    } catch (error) {
        logout()
        throw error
    }
}