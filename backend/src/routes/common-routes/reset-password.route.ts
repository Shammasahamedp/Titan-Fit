import express from 'express'
import { ResetPasswordController } from '../../controllers/reset-password.controller'
import { ResetPasswordService } from '../../services/reset-password/reset-password.service'
import { RedisRepository } from '../../repositories/redis/redis-repository'
import { Request,Response } from 'express'
import { UserRepository } from '../../repositories/user/userRepository'
import { TrainerRepository } from '../../repositories/trainer/trainerRepository'
const resetPasswordRepository = new RedisRepository()
const userRepository = new UserRepository()
const trainerRepository = new TrainerRepository()
const resetPasswordService  = new ResetPasswordService(resetPasswordRepository,userRepository,trainerRepository)
const resetPasswordController = new ResetPasswordController(resetPasswordService)

const resetPasswordRoute = express.Router()

resetPasswordRoute.post('/send-link',(req:Request,res:Response)=>resetPasswordController.sendLink(req,res))
resetPasswordRoute.post('/verify',(req:Request,res:Response)=>resetPasswordController.verifyLink(req,res))
export default resetPasswordRoute