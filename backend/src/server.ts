import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./config/db"
import userRouter from "./routes/userRoute"
import { connectRedis } from "./config/redis"


const app = express()
app.use(cors())
connectDB()

app.use(express.json())
app.use('/',userRouter)

app.listen(3000,async()=>{
    console.log("server is running on http://localhost:3000")
    await connectRedis()
})

