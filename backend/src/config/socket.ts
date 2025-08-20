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
interface ISocketObj {
   socketId:string,
   chatWindowOpen:boolean
}
export const usersMap:Map<string,ISocketObj> =new Map() 

export const setUpSocket = async (io:Server)=>{
        io.on('connection',(socket:Socket)=>{
           
           socket.on('register',(userId:string,callback)=>{
            console.log('socket register start')
              usersMap.set(userId,{
               socketId:socket.id,
               chatWindowOpen:false
              }) 
             if(typeof callback === 'function'){
                callback()
             }
              console.log('map',usersMap)
              console.log('socket register end')
           })

           socket.on('unregister',(id:string)=>{
            console.log('socket unregister start')
              usersMap.delete(id)
              console.log('socket unregister end')
           })

            socket.on('join_room',(roomId)=>{
                  try {
                     socket.join(roomId)
                  } catch (error) {
                     socket.emit('error_join_room','failed to join room')
                  }
            })

            socket.on('chatwindow:open',(userId)=>{
               try {
                  console.log('chatwindow open start')
                  let socketObj = usersMap.get(userId)
                  console.log('sock',socketObj)
                  if(socketObj){
                     usersMap.set(userId,{
                     socketId:socketObj?.socketId,
                     chatWindowOpen:true
                      
                  })
                  }
                  console.log('map',usersMap)
                  console.log('chatwindow open end')
               } catch (error) {
                  socket.emit('error_occured','')
               }
            })

            socket.on('chatwindow:close',(userId)=>{
                 try {
                  console.log('chatwindow close ,start')
                    let socketObj = usersMap.get(userId)
                    if(socketObj){
                     usersMap.set(userId,{
                        socketId:socketObj?.socketId,
                        chatWindowOpen:false
                     })
                    }
                    console.log('oog',usersMap)
                    console.log('chatwidnow close end')
                 } catch (error) {
                  socket.emit('error_occured')
                 }
            })

            socket.on('send_message',async (data)=>{
              try {
                     await chatRoomService.saveMessage(data.roomId,data.senderId,data.message)
                io.to(data.roomId).emit('receive_message',data)
                console.log('usermapoutside',usersMap)
                 if(usersMap.has(data.recieverId)&&!usersMap.get(data.recieverId)?.chatWindowOpen){
                  console.log('usermap',usersMap)
                  io.to(usersMap.get(data.recieverId)?.socketId as string).emit('receive_chat_notification')}
              } catch (error) {
                socket.emit('error_send_message','failed to send message')
              }
            })

            socket.on('send_notification',async (data)=>{
                  try {
                   const sessionData = await availabilityService.checkSessionExistOrNot(data.userId,data.trainerId,data.date,data.time)
                     let socketObj = usersMap.get(data.userId) as ISocketObj
                     const notification = await notificationService.saveSessionNotification(data.trainerId,'trainer',data.userId,'user',data.date,data.time)
                    
                     io.to(socketObj.socketId).emit('receive_notification',sessionData)
                  } catch (error) {
                     socket.emit('error_send_message','failed to send notification')
                  }
            })

            socket.on('disconnect',(reason:string)=>{
                 for(let [userId,socketObj] of usersMap.entries()){
                    if(socketObj.socketId === socket.id){
                       usersMap.delete(userId)
                      break
                    }
                 }
            })

            
        })
    
}
