import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "@/interfaces/states/IAdminState";

const initialState:AdminState={
    admin:null,
    token:null,
    adminLoading:false,
    error:null
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        adminLoginStart:(state)=>{
            state.error = null,
            state.adminLoading = true
        },
        adminLoginSuccess:(state,action:PayloadAction<{admin:any,token:string}>)=>{
            state.admin = action.payload.admin;
            state.token = action.payload.token;
            state.adminLoading = false
        },
        adminLoginFailure:(state,action:PayloadAction<string>)=>{
            state.adminLoading = false;
            state.error = action.payload
        },
        adminLogout:(state)=>{
            state.error=null;
            state.admin=null;
            state.adminLoading=false;
            state.token=null
        }
    }
})

export const {adminLoginStart,adminLoginSuccess,adminLoginFailure,adminLogout} = adminSlice.actions
export default adminSlice.reducer