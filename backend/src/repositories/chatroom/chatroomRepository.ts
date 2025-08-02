import { chatRoomModel } from "../../models/chat/chat-room-model";
import { IChatRoom, IMessage } from "../../models/chat/Ichat-room";
import { BaseRepository } from "../baseRepository";
import { IChatRoomRepository } from "./IchatroomRepository";

export class ChatRoomRepository extends BaseRepository<IChatRoom> implements IChatRoomRepository{
    constructor(){
        super(chatRoomModel)
    }

    async addMessage(roomId: string, message: IMessage): Promise<IChatRoom | null> {
       return await chatRoomModel.findOneAndUpdate(
            {roomId},
            {$push:{chats:message}},
            {new:true}
        )
    }

    
}