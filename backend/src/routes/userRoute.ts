import express from "express"
import { Request,Response } from "express"
import { UserController } from "../controllers/userController"
import { UserService } from "../services/user/userSevice"
import { UserRepository } from "../repositories/user/userRepository"

const userRouter = express.Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)


userRouter.post('/auth/signup',(req:Request,res:Response)=> userController.registerUser(req,res))

export default userRouter