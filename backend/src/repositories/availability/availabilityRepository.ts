import { availabilityModel } from "../../models/availability/availabilityModel";
import { IAvailabilityDocument, IAvailableDate } from "../../models/availability/IavailabilityModel";
import { BaseRepository } from "../baseRepository";
import { IAvailabilityRepository } from "./IavailabilityRepository";



export class AvailabilityRepository extends BaseRepository<IAvailabilityDocument> implements IAvailabilityRepository{
    constructor(){
        super(availabilityModel)
    }

    async updateAvailability(trainerId: string, availableDate: IAvailableDate): Promise<IAvailabilityDocument | null> {
        return await availabilityModel.findOneAndUpdate({trainerId:trainerId},{$push:{availability:availableDate}},{new:true,upsert:true})
    }
    
    async isDateExist(trainerId: string, date: string): Promise<boolean|null> {
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

    async updateExistingDateAvailability(trainerId: string, availableDate: IAvailableDate): Promise<any | null> {
        return await availabilityModel.updateOne({trainerId:trainerId,'availability.date':availableDate.date},{$set:{'availability.$.timeSlots':availableDate.timeSlots}},{new:true})
    }

}