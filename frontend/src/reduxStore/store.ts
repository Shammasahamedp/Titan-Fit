import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice"
import trainerReducer from "./slices/trainer-slice"
import adminReducer from './slices/admin-slice'
export const store = configureStore({
    reducer:{
        user:userReducer,
        trainer:trainerReducer,
        admin:adminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch