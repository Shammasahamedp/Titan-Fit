import { ISubscriptionInput } from "@/interfaces/IsubscriptionInputs"
import { axiosInstance } from "./axiosInstance"
const API = import.meta.env.VITE_BASE_URL

export const addSubscriptionPlan = async (newSubscription:ISubscriptionInput)=>{
    try {
        const response = await axiosInstance.post(`${API}/subscription/add`,newSubscription)
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllSubscriptions = async ()=>{
    try {
        const response = await axiosInstance.get(`${API}/subscription/get`)
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getActiveSubscription = async ()=>{
    try {
        const response = await axiosInstance.get(`${API}/subscription/get-active`)
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const editSubscriptionPlan = async (toEditSubscription:ISubscriptionInput,id:string)=>{
    try {
        const response = await axiosInstance.put(`${API}/subscription/edit`,{toEditSubscription,id})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}