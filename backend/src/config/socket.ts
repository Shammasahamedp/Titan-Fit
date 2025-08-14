import { Socket,Server } from "socket.io";
import { ChatService } from "../services/chatroom/chatroomService";
import { ChatRoomRepository } from "../repositories/chatroom/chatroomRepository";
import { AvailabilityRepository } from "../repositories/availability/availabilityRepository";
import { AvailabilityService } from "../services/availability/availability-service";
import { NotificationRepository } from "../repositories/notification/notificationRepository";
import { NotificationService } from "../services/notification/notification-service";

const chatRepository = new ChatRoomRepository()
const chatRoomService  = new ChatService(chatRepository)

const availabilityRepo = new AvailabilityRepository()
const availabilityService = new AvailabilityService(availabilityRepo)

const notificationRepo = new NotificationRepository()
const notificationService = new NotificationService(notificationRepo)

export const usersMap:Map<string,string> =new Map() 

export const setUpSocket = async (io:Server)=>{
        io.on('connection',(socket:Socket)=>{
           
           socket.on('register',(userId:string)=>{
              usersMap.set(userId,socket.id) 
           })

            socket.on('join_room',(roomId)=>{
                  try {
                     socket.join(roomId)
                  } catch (error) {
                     socket.emit('error_join_room','failed to join room')
                  }
            })

            socket.on('send_message',async (data)=>{
              try {
                     await chatRoomService.saveMessage(data.roomId,data.senderId,data.message)
                io.to(data.roomId).emit('receive_message',data)
              } catch (error) {
                socket.emit('error_send_message','failed to send message')
              }
            })

            socket.on('send_notification',async (data)=>{
                  try {
                   const sessionData = await availabilityService.checkSessionExistOrNot(data.userId,data.trainerId,data.date,data.time)
                     let socketId = usersMap.get(data.userId) as string
                     const notification = await notificationService.saveSessionNotification(data.trainerId,'trainer',data.userId,'user',data.date,data.time)
                    
                     io.to(socketId).emit('receive_notification',sessionData)
                  } catch (error) {
                     socket.emit('error_send_message','failed to send notification')
                  }
            })

            socket.on('disconnect',(reason:string)=>{
                 for(let [userId,socketId] of usersMap.entries()){
                    if(socketId === socket.id){
                       usersMap.delete(userId)
                      break
                    }
                 }
            })

            
        })
    
}
