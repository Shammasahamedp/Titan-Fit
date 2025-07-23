import mongoose, { Schema, Types } from "mongoose";
import {  IAvailabilityDocument } from "./IavailabilityModel";


const AvailabilitySchema:Schema = new Schema(
    {
        trainerId:{type:Types.ObjectId},
        availability:[
            {
                date:{type:Date,required:true},
                timeSlots:[{
                    startTime:{type:String},
                    isBooked:{type:Boolean,default:false},
                    userId:{type:Types.ObjectId}
                    
                }],
                isCompleted:{type:Boolean,default:false}
            }
        ]
    },
    {timestamps:true}
)

export const availabilityModel = mongoose.model<IAvailabilityDocument>(
    'Availability',
    AvailabilitySchema
)