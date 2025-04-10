import express from "express"
import { OtpController } from "../../controllers/otp-controller"
import { OtpService } from "../../services/otp/OtpService"
import { RedisRepository } from "../../repositories/redis/redis-repository"
import { Request,Response } from "express"

const otpRoute = express.Router()

const redisRepository = new RedisRepository()
const otpService = new OtpService(redisRepository)
const otpController = new OtpController(otpService)

otpRoute.post('/send',(req:Request,res:Response)=>otpController.sendOtp(req,res))
otpRoute.post('/verify',(req:Request,res:Response)=>otpController.verifyOtp(req,res))

export default otpRoute
