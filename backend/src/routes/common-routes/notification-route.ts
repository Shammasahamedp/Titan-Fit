import express,{Request,Response} from 'express'
import { NotificationRepository } from '../../repositories/notification/notificationRepository'
import { NotificationService } from '../../services/notification/notification-service'
import { NotificationController } from '../../controllers/notification-controller'
import { jwtTokenVerify } from '../../middlewares/jwt-token-validation'
const notificationRoute = express.Router()
const notificationRepo = new NotificationRepository()
const notificationService = new NotificationService(notificationRepo)
const notificationController = new NotificationController(notificationService)

notificationRoute.get('/',jwtTokenVerify(['user','trainer']),(req:Request,res:Response)=>notificationController.getNotification(req,res))
notificationRoute.patch('/:id',jwtTokenVerify(['user','trainer']),(req:Request,res:Response)=>notificationController.changeNotificationStatus(req,res))
notificationRoute.get('/count/',jwtTokenVerify(['user','trainer']),(req:Request,res:Response)=>notificationController.getCount(req,res))
export default notificationRoute