import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
import { connectDB } from "./config/db"
import { connectRedis } from "./config/redis"
(async ()=>{
    try {
        await connectRedis()
    } catch (error) {
        console.log('error in redis',error)
    }
})()
import userRouter from "./routes/userRoute"
import otpRoute from "./routes/otp-route"
import trainerRoute from "./routes/trainer-route"
import uploadRoute from "./routes/upload-file"
import tokenRoute from "./routes/token-route"
import adminRoute from "./routes/admin-route"


const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
connectDB()
app.use(cookieParser())
app.use(express.json())
app.use('/user',userRouter)
app.use('/trainer',trainerRoute)
app.use('/admin',adminRoute)
app.use('/otp',otpRoute)
app.use('/upload',uploadRoute)
app.use('/token',tokenRoute)
app.listen(3000,async()=>{
    console.log("server is running on http://localhost:3000")
    
})

