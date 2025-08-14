import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL


export const getNotification = async ()=>{
  try {
    const response = await axiosInstance.get(`${API}/notification/`)
    if(response.data){
      return response
    }
  } catch (error) {
    throw error
  }
}

export const getNotificationCount = async ()=>{
    try {
        const response = await axiosInstance.get(`${API}/notification/count/`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}

export const markNotificationAsRead = async (notificationId:string)=>{
  try {
    const response = await axiosInstance.patch(`${API}/notification/${notificationId}`)
    if(response.data){
      return response
    }
  } catch (error) {
    throw error 
  }
}