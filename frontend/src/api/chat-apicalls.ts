import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL


export const getChatRoom = async (roomId:string)=>{
    try {
        const response = await axiosInstance.get(`${API}/chat/${roomId}`)
        if(response.data){
           return response
        }
    } catch (error) {
        throw error
    }
}