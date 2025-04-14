import { axiosInstance } from "./axiosInstance"

export const fetchUsers = async ()=>{
    try {
        const response = await axiosInstance.get('http://localhost:3000/admin/get-users')
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
        const response = await  axiosInstance.get('http://localhost:3000/admin/get-trainers')
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
        const response = await axiosInstance.put('http://localhost:3000/admin/change-approval',{trainerId,approved})
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
        const response = await axiosInstance.put('http://localhost:3000/admin/user-toggle',{userId,blocked})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}