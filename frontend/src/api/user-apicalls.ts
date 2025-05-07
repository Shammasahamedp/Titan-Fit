import { IUserProfile,IUserEditProfile } from "@/interfaces/user-interfaces"
import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL

export const getProfile = async()=>{
  console.log('hello this si')
  try {
      const response = await axiosInstance.get(`${API}/user/profile`)
      if(response.data){
        return response.data.userProfile as IUserProfile
      }
      
  } catch (error) {
    throw error
  }
}

export const editUserProfile = async(userProfileData:IUserEditProfile)=>{
  try {
    const response = await axiosInstance.put(`${API}/user/editprofile`,userProfileData)
    if(response.data){
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const uploadUserProfileImage = async(userProfileImage:string) =>{
  try {

    const response = await axiosInstance.post(`${API}/user/addprofilepic`,{userProfileImage:userProfileImage})
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
        const response = await axiosInstance.post(`${API}/user/check-password`,{password})
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}

export const resetPassword = async (password:string)=>{
    try {
        const response = await axiosInstance.put(`${API}/user/reset-password`,{password})
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}



export const getApprovedTrainers = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`${API}/user/get-trainers?page=${page}&limit=${limit}`);
    if (response.data) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const getApprovedSingleTrainer = async (trainerId:string)=>{
  try {
    const response = await axiosInstance.get(`${API}/user/get-single-trainer/${trainerId}`)
    if(response.data){
      return response
    }
  } catch (error) {
    throw error
  }
}

export const bookATrainingSession = async (trainerId:string,date:string,startTime:string)=>{
  try {
    const response = await axiosInstance.put(`${API}/user/book-session`,{trainerId,date,startTime})

    if(response.data){
      console.log(response.data)
      return response
    }
  } catch (error) {
    throw error
  }
}