
export const getAccessToken = ()=> localStorage.getItem("accessToken")


export const setToken = (accessToken:string)=>{
    localStorage.setItem("accessToken",accessToken)

}

export const clearToken = ()=>{
    localStorage.removeItem("accessToken")
    
}