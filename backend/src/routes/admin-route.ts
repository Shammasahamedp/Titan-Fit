import express from 'express'
import { validate } from '../middlewares/validation-middleware'
import { loginSchema } from '../schema/validation-schema'
import { AdminRepository } from '../repositories/admin/adminRepository'
import { AdminService } from '../services/admin/adminService'
import { AdminController } from '../controllers/admin-controller'
import { Request,Response } from 'express'
import { jwtTokenVerify } from '../middlewares/jwt-token-validation'
import { UserRepository } from '../repositories/user/userRepository'
import { TrainerRepository } from '../repositories/trainer/trainerRepository'
const adminRoute = express.Router()


const adminRepository = new AdminRepository()
const userRepository = new UserRepository()
const trainerRepository = new TrainerRepository()
const adminService = new AdminService(adminRepository,userRepository,trainerRepository)
const adminController = new AdminController(adminService)

adminRoute.post('/auth/login',validate(loginSchema),(req:Request,res:Response)=>adminController.loginAdmin(req,res))
adminRoute.get('/get-users',jwtTokenVerify(['admin']),(req:Request,res:Response)=>adminController.getUsers(req,res))
adminRoute.get('/get-trainers',jwtTokenVerify(['admin']),(req:Request,res:Response)=>adminController.getTrainers(req,res))
adminRoute.put('/change-approval',jwtTokenVerify(['admin']),(req:Request,res:Response)=>adminController.changeTrainerApproval(req,res))
adminRoute.put('/user-toggle',jwtTokenVerify(['admin']),(req:Request,res:Response)=>adminController.userToggle(req,res))
adminRoute.get('/get-subscribers',jwtTokenVerify(['admin']),(req:Request,res:Response)=>adminController.getSubscribers(req,res))
adminRoute.get('/get-subscribers/:id',jwtTokenVerify(['admin']),(req:Request,res:Response)=>adminController.getSingleUserSubscriptions(req,res))

export default adminRoute