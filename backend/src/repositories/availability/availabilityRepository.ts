import { TypeOf } from "zod";
import { availabilityModel } from "../../models/availability/availabilityModel";
import { IAvailabilityDocument, IAvailableDate } from "../../models/availability/IavailabilityModel";
import { BaseRepository } from "../baseRepository";
import { IAvailabilityRepository } from "./IavailabilityRepository";
import { Types } from "mongoose";



export class AvailabilityRepository extends BaseRepository<IAvailabilityDocument> implements IAvailabilityRepository{
    constructor(){
        super(availabilityModel)
    }

    async updateAvailability(trainerId: string, availableDate: IAvailableDate): Promise<IAvailabilityDocument | null> {
      return await availabilityModel.findOneAndUpdate({trainerId:trainerId},{$push:{availability:availableDate}},{new:true,upsert:true})
    }
    
    async isDateExist(trainerId: string, date: string): Promise<boolean|null> {
        console.log(trainerId,'id','date',date)
        return   await availabilityModel.findOne({
            trainerId: trainerId,
            availability: {
              $elemMatch: {
                date: {
                  $eq: new Date(date), 
                },
              },
            },
          });
    }

    async updateExistingDateAvailability(trainerId: string, availableDate: IAvailableDate): Promise<IAvailabilityDocument | null> {
        return await availabilityModel.findOneAndUpdate({trainerId:trainerId,'availability.date':availableDate.date},{$set:{'availability.$.timeSlots':availableDate.timeSlots}},{new:true})
    }

    async bookASession(trainerId: Types.ObjectId,userId:Types.ObjectId, date: string, startTime: string): Promise<IAvailabilityDocument | null> {
      const [year, month, day] = date.split('-');
      const formatted = `${year}-${month}-${day}`;
      
      return await availabilityModel.findOneAndUpdate({
        trainerId: trainerId,
        $expr: {
          $in: [
            formatted,
            {
              $map: {
                input: "$availability",
                as: "a",
                in: { $dateToString: { date: "$$a.date", format: "%Y-%m-%d" } }
              }
            }
          ]
        }
      },
      {
        $set: {
          'availability.$[outer].timeSlots.$[slot].isBooked': true,
          'availability.$[outer].timeSlots.$[slot].userId': userId
        }
      },
      {
        arrayFilters: [
          { 'outer.date': { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } },
          { 'slot.startTime': startTime, 'slot.isBooked': false }
        ],
        new: true
      });
      
       
    }

}