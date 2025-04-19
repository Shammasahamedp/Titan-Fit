import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/interfaces/states/IUserState";


const initialState:UserState = {
    user:null,
    token:null,
    error:null,
    userLoading:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logingStart:(state)=>{
            state.error = null,
            state.userLoading = true
        },
        loginSuccess:(state,action:PayloadAction<{user:any;token:string}>)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.userLoading = false
        },
        loginFailure:(state,action:PayloadAction<string>)=>{
            state.userLoading = false
            state.error = action.payload
           
        },
        updateUserProfile:(state,action:PayloadAction<Partial<UserState["user"]>>)=>{
           if(state.user){
            state.user={
                ...state.user,
                ...action.payload
            }
           }
        },
        logout:(state)=>{
            state.error=null;
            state.userLoading=false;
            state.token=null;
            state.user=null
        }
    }
})

export const {logingStart,loginSuccess,loginFailure,logout,updateUserProfile} = userSlice.actions
export default userSlice.reducer
