import { Types,Document } from "mongoose";

export interface IMessage{
    senderId:Types.ObjectId|string,
    message:string,
    timeStamp?:Date
}

export interface IChatRoom extends Document{
   roomId:string,
   participants:Types.ObjectId[],
   chats:IMessage[]
}

