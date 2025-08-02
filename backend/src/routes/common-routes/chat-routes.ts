import express from 'express'
import { ChatRoomRepository } from '../../repositories/chatroom/chatroomRepository'
import { ChatService } from '../../services/chatroom/chatroomService'
import { ChatRoomController } from '../../controllers/chatroom-controller'
import { jwtTokenVerify } from '../../middlewares/jwt-token-validation'
import { Request,Response } from 'express'
import { TrainerService } from '../../services/trainer/trainerService'
import { TrainerRepository } from '../../repositories/trainer/trainerRepository'
import { UserRepository } from '../../repositories/user/userRepository'
import { AvailabilityRepository } from '../../repositories/availability/availabilityRepository'
import { UserService } from '../../services/user/userSevice'
const chatRoute = express.Router()
const chatRepository = new ChatRoomRepository()
const trainerRepository = new TrainerRepository()
const userRepository = new UserRepository()
const availabilityRepository = new AvailabilityRepository()
const chatService = new ChatService(chatRepository)
const trainerService = new TrainerService(trainerRepository,userRepository,availabilityRepository)
const userService = new UserService(userRepository,trainerRepository,availabilityRepository)
const chatController = new ChatRoomController(chatService,trainerService,userService)

chatRoute.get('/trainers',jwtTokenVerify(['user']),(req:Request,res:Response)=>chatController.getTrainers(req,res))
chatRoute.get('/users',jwtTokenVerify(['trainer']),(req:Request,res:Response)=>chatController.getUsers(req,res))
chatRoute.get('/:roomId',jwtTokenVerify(['user','trainer']),(req:Request,res:Response)=>chatController.getChatRoom(req,res))

export default chatRoute

