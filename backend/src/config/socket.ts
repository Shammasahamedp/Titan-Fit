import { Socket,Server } from "socket.io";
import { ChatService } from "../services/chatroom/chatroomService";
import { ChatRoomRepository } from "../repositories/chatroom/chatroomRepository";

const chatRepository = new ChatRoomRepository()
const chatRoomService  = new ChatService(chatRepository)

export const setUpSocket = async (io:Server)=>{
        io.on('connection',(socket:Socket)=>{

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
            socket.on('disconnect',(reason:string)=>{
                console.log(`disconnected because of the reason : ${reason}`)
            })

            
        })
    
}
