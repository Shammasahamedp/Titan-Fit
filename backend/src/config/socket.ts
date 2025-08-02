import { Socket,Server } from "socket.io";

export const setUpSocket = async (io:Server)=>{
    try {
        io.on('connection',(socket:Socket)=>{
            console.log('connected',socket.id)

            socket.on('join_room',(roomId)=>{
                   socket.join(roomId)
            })

            socket.on('send_message',(data)=>{
                io.to(data.roomId).emit('recieve_message',data)
            })

            socket.on('disconnect',(reason:string)=>{
                console.log(`disconnected because of the reason : ${reason}`)
            })

            
        })
    } catch (error) {
        console.log(error)
    }
}
