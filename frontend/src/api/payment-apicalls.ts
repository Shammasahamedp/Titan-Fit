import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL
export const makeStripeSession = async (planId:string)=>{
    try {
        const response = await axiosInstance.post(`${API}/payment/create-checkout-session`,{planId})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getSessionDetails = async (sessionId:string)=>{
    try {
        const response = await axiosInstance.get(`${API}/payment/session-details/${sessionId}`)
        if(response.data){
            return response
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}
