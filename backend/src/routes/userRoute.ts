import express from "express"
import { Request,Response } from "express"
import { UserController } from "../controllers/userController"
import { UserService } from "../services/user/userSevice"
import { UserRepository } from "../repositories/user/userRepository"
import { validate } from "../middlewares/validation-middleware"
import { loginSchema, signUpSchema } from "../schema/validation-schema"
import { TrainerRepository } from "../repositories/trainer/trainerRepository"

const userRouter = express.Router()

const userRepository = new UserRepository()
const trainerRepository = new TrainerRepository()
const userService = new UserService(userRepository,trainerRepository)
const userController = new UserController(userService)


userRouter.post('/auth/signup',validate(signUpSchema),(req:Request,res:Response)=> userController.registerUser(req,res))
userRouter.post('/auth/login',validate(loginSchema),(req:Request,res:Response)=> userController.loginUser(req,res))
export default userRouter