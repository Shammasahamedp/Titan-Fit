
export const getAccessToken = ()=> localStorage.getItem("accessToken")


export const setToken = (accessToken:string)=>{
    console.log('this is accessToken',accessToken)
    localStorage.setItem("accessToken",accessToken)

}

export const clearToken = ()=>{
    localStorage.removeItem("accessToken")
    
}