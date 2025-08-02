import { IChatRoomService } from "../services/chatroom/IchatroomService";
import { Request,Response } from "express";
import { handleError } from "../utils/handleResponse";
import { chatMessages } from "../messages/chat-related";
import { IUserService } from "../services/user/IuserService";
import { TrainerService } from "../services/trainer/trainerService";
export class ChatRoomController{
    private chatRoomService :  IChatRoomService
    private trainerService : TrainerService
    private userService : IUserService
    constructor(chatService:IChatRoomService,trainerService:TrainerService,userService:IUserService){
        this.chatRoomService = chatService
        this.trainerService = trainerService
        this.userService = userService
    }

    async getChatRoom(req:Request,res:Response){
        try {
            console.log('req.params',req.params)
            const chatRoom = await this.chatRoomService.getMessages(req.params.roomId)
            console.log('chatroom',chatRoom)
            res.status(200).json({success:true,message:chatMessages.CHAT_ROOM_FOUND,chatRoom})
        } catch (error) {
            handleError(res,error)
        }
    }

    async saveMessage(req:Request,res:Response){
        try {
            const {roomId,senderId,message} = req.body
            const savedMessage = await this.chatRoomService.saveMessage(roomId,senderId,message)
            res.status(200).json({success:true,savedMessage:savedMessage})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getTrainers(req:Request,res:Response){
        try {
            console.log('this is get trainers method')
            const trainers = await this.trainerService.getTrainersForChat()
            console.log('trainers',trainers)
            res.status(200).json({success:true,trainers})
        } catch (error) {
            handleError(res,error)
        }
    }

    async getUsers(req:Request,res:Response){
        try {
            
            const users = await this.userService.getUsersForChat(res.locals.user.userId)
            res.status(200).json({success:true,users})
        } catch (error) {
            handleError(res,error)
        }
    }
}