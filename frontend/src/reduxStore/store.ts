import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice"
import trainerReducer from "./slices/trainer-slice"
import adminReducer from './slices/admin-slice'
import storage from "redux-persist/lib/storage"
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist"


const rootReducer = combineReducers({
    user:userReducer,
    trainer:trainerReducer,
    admin:adminReducer
})

const persistConfig = {
    key:"root",
    storage,
    whitelist:['user','trainer','admin']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store  = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
            }
        })
    
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch