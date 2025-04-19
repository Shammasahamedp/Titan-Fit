import { axiosInstance } from "./axiosInstance";

const API = import.meta.env.VITE_BASE_URL

export const uploadFile = (fileList:FileList,field:string)=>{
    const formData = new FormData()
    formData.append(field,fileList[0])
    return  axiosInstance.post(`${API}/upload/${field}`,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    })

}