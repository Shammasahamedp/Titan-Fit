import { clearToken, getAccessToken } from "./localStorage";
import {authLogout, refreshToken} from './auth'
import { axiosInstance } from "./axiosInstance";
import { logout } from "@/reduxStore/slices/user-slice";
import { store } from "@/reduxStore/store";
import {jwtDecode} from 'jwt-decode'
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
            console.log('this isintrceproiiojfadcc',accessToken)
            console.log('',jwtDecode(accessToken))
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
        const authEndPoints = ['/user/auth/login','/trainer/auth/login','/admin/auth/login','/auth/google/gettoken']
        if(authEndPoints.some((endPoint)=>originalRequest.url.includes(endPoint))){
            return Promise.reject(error)
        }
        if(error.response?.status === 401 && !originalRequest._retry){
            if(isRefreshing){
                return new Promise((resolve,reject)=>{
                    failedQueue.push({resolve,reject})
                })

                .then((token)=>{
                    originalRequest.headers["Authorization"] = `Bearer ${token}`
                    return axiosInstance(originalRequest)
                })
                .catch((err)=>Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try{
                const newAccessToken = await refreshToken()
                console.log('new accesstoken',newAccessToken)
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
        if(error.response?.status===403){
            authLogout()
           clearToken()
           store.dispatch(logout())
        }
        return Promise.reject(error)
    }
)