import { IChatRoom } from "../../models/chat/Ichat-room";

export interface IChatRoomService{
    getMessages(roomId:string):Promise<IChatRoom|null>
    saveMessage(roomId:string,senderId:string,message:string):Promise<string>
}