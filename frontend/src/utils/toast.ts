import {toast} from "react-toastify"
import { AxiosError } from "axios"
export const showSuccessToast = (message:string)=>{
    toast.success(message,{
        position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    })
}

export const showErrorToast = (error:unknown)=>{
    let message;
    if(error instanceof AxiosError){
        message = error.response?.data.message || error.message||message
    }else if(error instanceof Error){
        message = error.message
    }
    else if(typeof error === 'string'){
        message = error
    }else{
        message = 'Something went wrong..'
    }
    console.log('this is message',message)
    toast.error(message,{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}