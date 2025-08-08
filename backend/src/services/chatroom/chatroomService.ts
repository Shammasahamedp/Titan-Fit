import { chatMessages } from "../../messages/chat-related";
import { IChatRoom } from "../../models/chat/Ichat-room";
import { IChatRoomRepository } from "../../repositories/chatroom/IchatroomRepository";
import { AppError } from "../../utils/handleResponse";
import { IChatRoomService } from "./IchatroomService";

export class ChatService implements IChatRoomService{

    private chatRepo : IChatRoomRepository
    constructor(chatroomRepo:IChatRoomRepository){
        this.chatRepo = chatroomRepo
    }
    async getMessages(roomId: string): Promise<IChatRoom | null> {
       try {
         let room = await this.chatRepo.findOne({roomId})
        if(!room){
           let message=await this.chatRepo.create({roomId:roomId})
           return message
        }
        return room
       } catch (error) {
          if(error instanceof AppError){
            throw  error
          }

          throw  new Error('something went wrong while fetching the messages')
       }
    }

    async saveMessage(roomId: string, senderId: string, message: string): Promise<string> {
        try {
            let room = await this.chatRepo.findOne({roomId})
            if(!room){
                throw new AppError(chatMessages.ROOM_NOT_FOUND,404)
            }
             const chat = {
                senderId:senderId,
                message:message,

             }

             let messages = await this.chatRepo.addMessage(roomId,chat)
             if(!message){
                throw new AppError(chatMessages.MESSAGE_NOT_FOUND,404)
             }
             if(messages?.chats[messages.chats.length-1].message){
                return messages?.chats[messages.chats.length-1].message
             }else {
                throw new AppError(chatMessages.MESSAGE_NOT_FOUND,404)
             }
        } catch (error){
            if(error instanceof AppError){
                throw error
            }
            throw new Error('something went wrong while saving the message')
        }
    }
}
