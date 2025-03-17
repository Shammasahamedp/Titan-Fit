import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./config/db"



const app = express()
app.use(cors())
connectDB()
app.use(express.json())


app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000")
})

