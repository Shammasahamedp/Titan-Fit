import mongoose,{Schema,Types} from "mongoose";
import { IsubscriptionModel } from "./IsubscriptionModel";

const SubscriptionSchema:Schema =  new Schema(
    {
         planName:{type:String,required:true},
         price:{type:Number,required:true},
         description:{type:String,required:true},
         durationInMonth:{type:Number,required:true},
         credits:{type:Number,required:true},
         isActive:{type:Boolean,required:true,default:true}
    },
    {timestamps:true}
);

export const subscriptionModel = mongoose.model<IsubscriptionModel>(
    'Subscription',
    SubscriptionSchema
)