import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL

export const fetchUsers = async ()=>{
    try {
        const response = await axiosInstance.get(`${API}/admin/get-users`)
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchTrainers = async ()=>{
    try {
        const response = await  axiosInstance.get(`${API}/admin/get-trainers`)
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const toggleTrainer = async (trainerId:string,approved:boolean)=>{
    try {
        const response = await axiosInstance.put(`${API}/admin/change-approval`,{trainerId,approved})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const toggleUser = async(userId:string,blocked:boolean)=>{
    try {
        const response = await axiosInstance.put(`${API}/admin/user-toggle`,{userId,blocked})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

