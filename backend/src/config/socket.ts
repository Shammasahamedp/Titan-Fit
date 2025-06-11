import { Socket,Server } from "socket.io";

export const setUpSocket = async (io:Server)=>{
    try {
        io.on('connection',(socket:Socket)=>{
            console.log('connected',socket.id)
            socket.on('disconnect',(reason:string)=>{
                console.log(`disconnected because of the reason : ${reason}`)
            })
        })
    } catch (error) {
        console.log(error)
    }
}
