import express from 'express'
import { Request,Response } from 'express'
import { jwtTokenVerify } from '../../middlewares/jwt-token-validation'
import { PaymentController } from '../../controllers/payment-controller'
import { PaymentService } from '../../services/payment/paymentService'
import { PaymentRepository } from '../../repositories/payment/paymentRepository'
import { SubscriptionRepository } from '../../repositories/subscription/subscriptionRepository'
import { UserRepository } from '../../repositories/user/userRepository'


const paymentRepo = new PaymentRepository()
const subscriptionRepo = new SubscriptionRepository()
const userRepo = new UserRepository()
const paymentService = new PaymentService(paymentRepo,subscriptionRepo,userRepo)
const paymentController = new PaymentController(paymentService)
const paymentRoute = express.Router()
paymentRoute.post('/create-checkout-session',express.json(),jwtTokenVerify(['user']),(req:Request,res:Response)=>paymentController.createCheckoutSession(req,res))
paymentRoute.post('/webhook',express.raw(({type:'application/json'})),(req:Request,res:Response)=>paymentController.handleWebhook(req,res))
paymentRoute.get('/session-details/:id',jwtTokenVerify(['user']),(req:Request,res:Response)=>paymentController.getSessionDetails(req,res))
export default paymentRoute