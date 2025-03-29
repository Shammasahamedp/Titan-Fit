import express from "express"
import { AuthController } from "../../controllers/auth-controller"
import { AuthService } from "../../services/auth/auth-service"
import { UserRepository } from "../../repositories/user/userRepository"
import { TrainerRepository } from "../../repositories/trainer/trainerRepository"
import { Request,Response } from "express"
import { googleTokenVerify } from "../../middlewares/google-token-verify"

const userRepository = new UserRepository()
const trainerRepository = new TrainerRepository()
const authService = new AuthService(userRepository,trainerRepository)
const authController = new AuthController(authService)

const authRoute = express.Router()

authRoute.get('/check-email',(req:Request,res:Response)=>authController.findUserOrTrainerByEmail(req,res))
authRoute.post('/google/gettoken',googleTokenVerify,(req:Request,res:Response)=>authController.googleLogin(req,res))
export default authRoute