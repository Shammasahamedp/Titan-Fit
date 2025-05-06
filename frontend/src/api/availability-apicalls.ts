import { axiosInstance } from "./axiosInstance"

const API = import.meta.env.VITE_BASE_URL

export const getAvailability = async()=>{
    try {
        const response = await axiosInstance.get(`${API}/availability/get`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}