import { axiosInstance } from "./axiosInstance";
export const uploadFile = (fileList:FileList,field:string)=>{
    const formData = new FormData()
    formData.append(field,fileList[0])
    return  axiosInstance.post(`http://localhost:3000/upload/${field}`,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    })

}