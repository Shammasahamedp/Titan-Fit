import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { TrainerState } from "@/interfaces/states/ITrainerState";

const initialState:TrainerState={
    trainer:null,
    token:null,
    trainerLoading:false,
    error:null
}

const trainerSlice = createSlice({
    name:"trainer",
    initialState,
    reducers:{
        trainerLoginStart:(state)=>{
            state.error = null,
            state.trainerLoading = true
        },
        trainerLoginSuccess:(state,action:PayloadAction<{trainer:any,token:string}>)=>{
            state.trainer = action.payload.trainer;
            state.token = action.payload.token;
            state.trainerLoading = false
        },
        trainerLoginFailure:(state,action:PayloadAction<string>)=>{
            state.trainerLoading = false
            state.error = action.payload
            
        },
        trainerLogout:(state)=>{
            state.error = null
            state.trainerLoading = false
            state.token = null
            state.trainer= null
        }
    }
})

export const {trainerLoginStart,trainerLoginFailure,trainerLoginSuccess,trainerLogout} = trainerSlice.actions
export default trainerSlice.reducer