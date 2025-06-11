import { clearToken, getAccessToken } from "./localStorage";
import {authLogout, logoutTrainer, refreshToken} from './auth'
import { axiosInstance } from "./axiosInstance";
import { logout } from "@/reduxStore/slices/user-slice";
import { store } from "@/reduxStore/store";
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
        console.log('token',accessToken)
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
                const state = store.getState()
                let role:string|null = null
                if (state.user?.user?.role) {
                    role = state.user.user.role;
                  } else if (state.trainer?.trainer?.role) {
                    role = state.trainer.trainer.role;
                    } else if (state.admin?.admin?.role) {
                    role = state.admin.admin.role;
                  }
                  if(!role) throw new Error('Role is required to refresh the token')
                const newAccessToken = await refreshToken(role )
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
        if(error.response?.status===403 && error.response.data.role === 'user'){
            authLogout()
           clearToken()
           store.dispatch(logout())
        }
        return Promise.reject(error)
    }
)