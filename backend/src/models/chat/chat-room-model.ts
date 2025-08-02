import mongoose,{ Schema,Types} from "mongoose";
import { IChatRoom } from "./Ichat-room";

const ChatRoomSchema:Schema = new Schema(
    {
        roomId:{type:String,required:true},
        participants:[
            {type:Types.ObjectId,required:true}
        ],
        chats:[
            {
                senderId:{type:Types.ObjectId,required:true},
                message:{type:String,required:true},
                timeStamp:{type:Date,default:Date.now()}
            }
        ]

    },
    {timestamps:true}
)

export const chatRoomModel = mongoose.model<IChatRoom>(
    'Chatroom',
    ChatRoomSchema
)

// export interface IMessage{
//     senderId:Types.ObjectId,
//     message:string,
//     timeStamp:Date
// }