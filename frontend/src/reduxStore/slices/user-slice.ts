import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/interfaces/states/IUserState";


const initialState:UserState = {
    user:null,
    token:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logingStart:(state)=>{
            state.error = null,
            state.loading = true
        },
        loginSuccess:(state,action:PayloadAction<{user:any;token:string}>)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false
        },
        loginFailure:(state,action:PayloadAction<string>)=>{
            state.loading = false
            state.error = action.payload
        },
        logout:(state)=>{
            state.error=null;
            state.loading=false;
            state.token=null;
            state.user=null
        }
    }
})

export const {logingStart,loginSuccess,loginFailure,logout} = userSlice.actions
export default userSlice.reducer
