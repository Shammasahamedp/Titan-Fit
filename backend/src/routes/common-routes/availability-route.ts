import express from 'express'
import { jwtTokenVerify } from '../../middlewares/jwt-token-validation'
import { AvailabilityRepository } from '../../repositories/availability/availabilityRepository'
import { AvailabilityService } from '../../services/availability/availability-service'
import { AvailabilityController } from '../../controllers/availability-controller'
import { Request,Response } from 'express'
const availabilityRouter = express.Router()

const availabilityRepository = new AvailabilityRepository()
const availabilityService = new AvailabilityService(availabilityRepository)
const availabilityController = new AvailabilityController(availabilityService)

availabilityRouter.get('/get',jwtTokenVerify(['user','trainer','admin']),(req:Request,res:Response)=>availabilityController.getAvailbility(req,res))

export default availabilityRouter