import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice"
import trainerReducer from "./slices/trainer-slice"
export const store = configureStore({
    reducer:{
        user:userReducer,
        trainer:trainerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch