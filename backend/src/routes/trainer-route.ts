import express from "express"
import { Request,Response } from "express"
import { TrainerRepository } from "../repositories/trainer/trainerRepository"
import { TrainerService } from "../services/trainer/trainerService"
import { TrainerController } from "../controllers/trainer-controller"
import { UserRepository } from "../repositories/user/userRepository"
import { validate } from "../middlewares/validation-middleware"
import { loginSchema, trainerSignupSchema } from "../schema/validation-schema"
const trainerRoute = express.Router()

const trainerRepository = new TrainerRepository()
const userRepository = new UserRepository()
const trainerService = new TrainerService(trainerRepository,userRepository)
const trainerContrller = new TrainerController(trainerService)

trainerRoute.post('/auth/signup',validate(trainerSignupSchema),(req:Request,res:Response)=>trainerContrller.registerTrainer(req,res))
trainerRoute.post('/auth/login',validate(loginSchema),(req:Request,res:Response)=>trainerContrller.loginTrainer(req,res))

export default trainerRoute