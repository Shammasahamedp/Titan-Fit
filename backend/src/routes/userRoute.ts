import express from "express"
import { Request,Response } from "express"
import { UserController } from "../controllers/userController"
import { UserService } from "../services/user/userSevice"
import { UserRepository } from "../repositories/user/userRepository"
import { validate } from "../middlewares/validation-middleware"
import { loginSchema, signUpSchema,userProfileEditSchema } from "../schema/validation-schema"
import { TrainerRepository } from "../repositories/trainer/trainerRepository"
import { jwtTokenVerify } from "../middlewares/jwt-token-validation"
import { checkIfUserBlocked } from "../middlewares/check-if-user-blocked"
import { AvailabilityRepository } from "../repositories/availability/availabilityRepository"

const userRouter = express.Router()

const userRepository = new UserRepository()
const trainerRepository = new TrainerRepository()
const availabilityRepository = new AvailabilityRepository()
const userService = new UserService(userRepository,trainerRepository,availabilityRepository)
const userController = new UserController(userService)


userRouter.post('/auth/signup',validate(signUpSchema),(req:Request,res:Response)=> userController.registerUser(req,res))
userRouter.post('/auth/login',validate(loginSchema),(req:Request,res:Response)=> userController.loginUser(req,res))
userRouter.get('/profile',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.getProfile(req,res))
userRouter.put('/editprofile',jwtTokenVerify(['user']),checkIfUserBlocked,validate(userProfileEditSchema),(req:Request,res:Response)=>userController.editProfile(req,res))
userRouter.post('/addprofilepic',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.addProfileImage(req,res))
userRouter.post('/check-password',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.checkPassword(req,res))
userRouter.put('/reset-password',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.resetPassword(req,res))
userRouter.get('/get-trainers',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.getApprovedTrainers(req,res))
userRouter.get('/get-single-trainer/:id',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.getSingleApprovedTrainer(req,res))
userRouter.put('/book-session',jwtTokenVerify(['user']),checkIfUserBlocked,(req:Request,res:Response)=>userController.bookATrainingSession(req,res))
export default userRouter