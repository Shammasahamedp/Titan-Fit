import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
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
import chatRoute from "./routes/common-routes/chat-routes"
import authRoute from "./routes/common-routes/auth-route"
import resetPasswordRoute from "./routes/common-routes/reset-password.route"
import subscriptionRoute from "./routes/subscription-route"
import paymentRoute from "./routes/common-routes/payment-route"
import availabilityRouter from "./routes/common-routes/availability-route"
import './utils/subscription-status'
import http from 'http'
import {Server} from 'socket.io'
import { setUpSocket } from "./config/socket"
const app = express()
const server = http.createServer(app)

const io = new Server(server,{
   cors:{
    origin:'http://localhost:5173',
    credentials:true,
   }
})

setUpSocket(io)

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE']
}))
connectDB()
app.use(cookieParser())
app.use('/payment',paymentRoute)
app.use(express.json())
app.use('/user',userRouter)
app.use('/trainer',trainerRoute)
app.use('/admin',adminRoute)
app.use('/otp',otpRoute)
app.use('/upload',uploadRoute)
app.use('/token',tokenRoute)
app.use('/auth',authRoute)
app.use('/chat',chatRoute)
app.use('/reset-password',resetPasswordRoute)
app.use('/subscription',subscriptionRoute)
app.use('/availability',availabilityRouter)
server.listen(3000,"0.0.0.0",async()=>{
    console.log("server is running on http://localhost:3000")
})

