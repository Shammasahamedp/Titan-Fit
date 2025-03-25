import express from 'express'
import { validate } from '../middlewares/validation-middleware'
import { loginSchema } from '../schema/validation-schema'
import { AdminRepository } from '../repositories/admin/adminRepository'
import { AdminService } from '../services/admin/adminService'
import { AdminController } from '../controllers/admin-controller'
import { Request,Response } from 'express'
const adminRoute = express.Router()


const adminRepository = new AdminRepository()
const adminService = new AdminService(adminRepository)
const adminController = new AdminController(adminService)

adminRoute.post('/auth/login',validate(loginSchema),(req:Request,res:Response)=>adminController.loginAdmin(req,res))
export default adminRoute