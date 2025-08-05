import { ITrainerAvailableSlots, ITrainerEditProfile } from "@/interfaces/trainer-interfaces"
import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL

export const getTrainerProfile = async ()=>{
    try {
        const response = await axiosInstance.get(`${API}/trainer/profile`)
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
        console.log('thiis is trainerprofiledata',trainerProfileData)//trainerProfileData
        const response = await axiosInstance.put(`${API}/trainer/editprofile`,trainerProfileData)
        if(response.data){
            console.log(response.data)
            return response.data
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const uploadTrainerProfileImage = async (trainerProfileImage:string)=>{
    try {
        const response = await axiosInstance.post(`${API}/trainer/addprofilepic`,{trainerProfileImage})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const uploadTrainerCertificate = async(trainerCertificate:string)=>{
    try {
        const response = await axiosInstance.post(`${API}/trainer/addcertificate`,{trainerCertificate})
        if(response.data){
            return response
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkPasswordMatching = async(password:string)=>{
    try {
        const response = await axiosInstance.post(`${API}/trainer/check-password`,{password})
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}

export const resetPassword = async (password:string)=>{
    try {
        const response = await axiosInstance.put(`${API}/trainer/reset-password`,{password})
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}

export const    uploadAvailability = async (availableSlots:ITrainerAvailableSlots)=>{
    try {
        console.log('avalable slots',availableSlots)
        const response = await axiosInstance.put(`${API}/trainer/update-availability`,availableSlots)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}

export const getBookedUsersForChat = async ()=>{
    try {
        const response = await axiosInstance.get(`${API}/chat/users`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error 
    }
}



