import express from "express"
import { OtpController } from "../controllers/otp-controller"
import { OtpService } from "../services/otp/OtpService"
import { OtpRepository } from "../repositories/otp/otp-repository"
import { Request,Response } from "express"

const otpRoute = express.Router()

const otpRepository = new OtpRepository()
const otpService = new OtpService(otpRepository)
const otpController = new OtpController(otpService)

otpRoute.post('/send',(req:Request,res:Response)=>otpController.sendOtp(req,res))
otpRoute.post('/verify',(req:Request,res:Response)=>otpController.verifyOtp(req,res))

export default otpRoute
