import express from "express"
import cors from "cors"
import dotenv from "dotenv"
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


const app = express()
app.use(cors())
connectDB()

app.use(express.json())
app.use('/',userRouter)
app.use('/otp',otpRoute)
app.listen(3000,async()=>{
    console.log("server is running on http://localhost:3000")
    
})

