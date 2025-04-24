import express from "express"
import { Request,Response } from "express"
import { TrainerRepository } from "../repositories/trainer/trainerRepository"
import { TrainerService } from "../services/trainer/trainerService"
import { TrainerController } from "../controllers/trainer-controller"
import { UserRepository } from "../repositories/user/userRepository"
import { validate } from "../middlewares/validation-middleware"
import { loginSchema } from "../schema/validation-schema"
import { jwtTokenVerify } from "../middlewares/jwt-token-validation"
import { trainerProfileSchema, trainerSignupSchema } from "../schema/trainer-validation-schema"
const trainerRoute = express.Router()

const trainerRepository = new TrainerRepository()
const userRepository = new UserRepository()
const trainerService = new TrainerService(trainerRepository,userRepository)
const trainerContrller = new TrainerController(trainerService)

trainerRoute.post('/auth/signup',validate(trainerSignupSchema),(req:Request,res:Response)=>trainerContrller.registerTrainer(req,res))
trainerRoute.post('/auth/login',validate(loginSchema),(req:Request,res:Response)=>trainerContrller.loginTrainer(req,res))
trainerRoute.get('/profile',jwtTokenVerify(['trainer']),(req:Request,res:Response)=>trainerContrller.getTrainerProfile(req,res))
trainerRoute.put('/editprofile',jwtTokenVerify(['trainer']),validate(trainerProfileSchema),(req:Request,res:Response)=>trainerContrller.editTrainerProfile(req,res))
trainerRoute.post('/addprofilepic',jwtTokenVerify(['trainer']),(req:Request,res:Response)=>trainerContrller.addTrainerProfilImage(req,res))
trainerRoute.post('/addcertificate',jwtTokenVerify(['trainer']),(req:Request,res:Response)=>trainerContrller.addCertificate(req,res))
trainerRoute.post('/check-password',jwtTokenVerify(['trainer']),(req:Request,res:Response)=>trainerContrller.checkPassword(req,res))
trainerRoute.put('/reset-password',jwtTokenVerify(['trainer']),(req:Request,res:Response)=>trainerContrller.resetPassword(req,res))
export default trainerRoute