import { IUserProfile,IUserEditProfile } from "@/interfaces/user-interfaces"
import { axiosInstance } from "./axiosInstance"

export const getProfile = async()=>{
  console.log('hello this si')
  try {
      const response = await axiosInstance.get('http://localhost:3000/user/profile')
      if(response.data){
        return response.data.userProfile as IUserProfile
      }
      
  } catch (error) {
    throw error
  }
}

export const editUserProfile = async(userProfileData:IUserEditProfile)=>{
  try {
    const response = await axiosInstance.put('http://localhost:3000/user/editprofile',userProfileData)
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

    const response = await axiosInstance.post('http://localhost:3000/user/addprofilepic',{userProfileImage:userProfileImage})
    if(response.data){
      return response
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}