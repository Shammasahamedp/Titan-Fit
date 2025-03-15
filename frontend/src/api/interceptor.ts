import { getAccessToken } from "./localStorage";
import {refreshToken} from './auth'
import { axiosInstance } from "./axiosInstance";

let isRefreshing =false
let failedQueue:any[] = []

const processQueue = (error:any,token:string|null=null)=>{
    failedQueue.forEach((prom)=>{
        if(token) prom.resolve(token)
            else prom.reject(error)
    })

    failedQueue = []
}

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = getAccessToken()
        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>Promise.reject(error)
)


axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) =>{
        const originalRequest = error.config
        if(error.response?.status === 401 && !originalRequest._retry){
            if(isRefreshing){
                return new Promise((resolve,reject)=>{
                    failedQueue.push({resolve,reject})
                })

                .then((token)=>{
                    originalRequest.headers["Autherization"] = `Bearer ${token}`
                    return axiosInstance(originalRequest)
                })
                .catch((err)=>Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try{
                const newAccessToken = await refreshToken()
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
                processQueue(null,newAccessToken)
                return axiosInstance(originalRequest)
            }catch(err){
                processQueue(err,null)
                return Promise.reject(err)

            }finally{
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)