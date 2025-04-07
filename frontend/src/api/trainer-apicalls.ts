import { ITrainerEditProfile } from "@/interfaces/trainer-interfaces"
import { axiosInstance } from "./axiosInstance"

export const getTrainerProfile = async ()=>{
    try {
        const response = await axiosInstance.get('http://localhost:3000/trainer/profile')
        if(response.data){
            return response.data
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const editTrainerProfile = async (trainerProfileData:ITrainerEditProfile)=>{
    try {
        const response = await axiosInstance.put('http://localhost:3000/trainer/editprofile',trainerProfileData)
        if(response.data){
            return response.data
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const uploadTrainerProfileImage = async (trainerProfileImage:string)=>{
    try {
        const response = await axiosInstance.post('http://localhost:3000/trainer/addprofilepic',trainerProfileImage)
        if(response.data){
            return response.data
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}