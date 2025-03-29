import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import session from "express-session"
import cookieParser from "cookie-parser"
console.log('id',process.env.GOOGLE_CLIENT_ID)
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
import otpRoute from "./routes/common-routes/otp-route"
import trainerRoute from "./routes/trainer-route"
import uploadRoute from "./routes/common-routes/upload-file"
import tokenRoute from "./routes/common-routes/token-route"
import adminRoute from "./routes/admin-route"
import authRoute from "./routes/common-routes/auth-route"

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
connectDB()
app.use(session({
    secret:'adfarqwtgvbaa',
    resave:false,
    saveUninitialized:false
}))
app.use(cookieParser())
app.use(express.json())
app.use('/user',userRouter)
app.use('/trainer',trainerRoute)
app.use('/admin',adminRoute)
app.use('/otp',otpRoute)
app.use('/upload',uploadRoute)
app.use('/token',tokenRoute)
app.use('/auth',authRoute)
app.listen(3000,"0.0.0.0",async()=>{
    console.log("server is running on http://localhost:3000")
    
})

