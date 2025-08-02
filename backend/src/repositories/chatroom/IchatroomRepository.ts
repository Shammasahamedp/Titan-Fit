import { IChatRoom, IMessage } from "../../models/chat/Ichat-room";
import { IBaseRepository } from "../IbaseRepository";

export interface IChatRoomRepository extends IBaseRepository<IChatRoom>{
    addMessage(roomId:string,message:IMessage):Promise<IChatRoom|null>
}