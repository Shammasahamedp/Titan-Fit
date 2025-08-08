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


export const getBookedSessionDetails = async (trainerId:string,page:number,search:string,sortKey:string,sortAsc:boolean)=>{
    try {
        const response = await axiosInstance.get(`${API}/availability/get-trainer-sessions?page=${page}&search=${search}&sortKey=${sortKey}&sortAsc=${sortAsc}&trainerId=${trainerId}`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
} 
export const getSessionDetails = async (page:number,search:string,sortKey:string,sortAsc:boolean)=>{
    try {
        const response = await axiosInstance.get(`${API}/availability/get-booked-sessions?page=${page}&search=${search}&sortKey=${sortKey}&sortAsc=${sortAsc}`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
} 

export const getUsersBookedSession = async (page:number,search:string,sortKey:string,sortAsc:boolean)=>{
    try {
        const response = await axiosInstance.get(`${API}/availability/get-user-booked-sessions?page=${page}&search=${search}&sortKey=${sortKey}&sortAsc=${sortAsc}`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}

export const getUsersBookesSessionForAdmin = async(userId:string,page:number,search:string,sortKey:string,sortAsc:boolean)=>{
    try {
        const response = await axiosInstance.get(`${API}/availability/get-user-booked-session-admin?page=${page}&search=${search}&sortKey=${sortKey}&sortAsc=${sortAsc}&userId=${userId}`)
        if(response.data){
            return response
        }
    } catch (error) {
        throw error
    }
}