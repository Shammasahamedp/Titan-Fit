import { IUserProfile } from "@/interfaces/user-interfaces"
import { axiosInstance } from "./axiosInstance"

export const getProfile = async()=>{
  console.log('hello this si')
  try {
      const response = await axiosInstance.get('http://localhost:3000/user/profile')
      console.log('this is response in profile',response)
      if(response.data){
        return response.data.userProfile as IUserProfile
      }
      
  } catch (error) {
    throw error
  }
}