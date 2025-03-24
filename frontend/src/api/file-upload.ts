import { axiosInstance } from "./axiosInstance";
export const uploadFile = (fileList:FileList,field:string)=>{
    const formData = new FormData()
    console.log(fileList[0])
    formData.append(field,fileList[0])
    console.log('this is field',field,'and this is file fileList[0]',fileList[0])
    return  axiosInstance.post(`http://localhost:3000/upload/${field}`,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    })

}