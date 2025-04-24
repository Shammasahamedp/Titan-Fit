import express from "express"
import { Request,Response } from "express"
import { jwtTokenVerify } from "../middlewares/jwt-token-validation"
import { SubscriptionController } from "../controllers/subscription-controller"
import { SubscriptionService } from "../services/subscription/subscriptionService"
import { SubscriptionRepository } from "../repositories/subscription/subscriptionRepository"

const subscriptionRoute = express.Router()
const subscriptionRepository = new SubscriptionRepository()
const subscriptionService = new SubscriptionService(subscriptionRepository)
const subscriptionController = new SubscriptionController(subscriptionService)
subscriptionRoute.post('/add',jwtTokenVerify(['admin']),(req:Request,res:Response)=>subscriptionController.addSubscription(req,res))
subscriptionRoute.get('/get-active',(req:Request,res:Response)=>subscriptionController.getActiveSubscription(req,res))
subscriptionRoute.get('/get',jwtTokenVerify(['admin']),(req:Request,res:Response)=>subscriptionController.getSubAllSubscription(req,res))
subscriptionRoute.put('/edit',jwtTokenVerify(['admin']),(req:Request,res:Response)=>subscriptionController.editSubscriptionPlan(req,res))
export default subscriptionRoute