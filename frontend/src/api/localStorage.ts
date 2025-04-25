
export const getAccessToken = ()=> localStorage.getItem("accessToken")


export const setToken = (accessToken:string)=>{
    console.log('this is accessToken',accessToken)
    localStorage.setItem("accessToken",accessToken)

}

export const clearToken = ()=>{
    localStorage.removeItem("accessToken")
    
}

export const setProfileCompletionStatus = (userNew:string)=>{
    localStorage.setItem('user-new',userNew)
}

export const getProfileCompletionStatus = ()=>{
    return localStorage.getItem('user-new')
}

export const removeProfileCompletionStatus = ()=>{
    localStorage.removeItem('user-new')
}

