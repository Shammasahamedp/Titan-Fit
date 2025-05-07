import { Types } from "mongoose";
import { IAvailabilityDocument, IAvailableDate } from "../../models/availability/IavailabilityModel";
import { IBaseRepository } from "../IbaseRepository";

export interface IAvailabilityRepository extends IBaseRepository<IAvailabilityDocument>{
    updateAvailability(trainerId:string,availableDate:IAvailableDate):Promise<IAvailabilityDocument|null>
    isDateExist(trainerId:string,date:string):Promise<boolean|null>
    updateExistingDateAvailability(trainerId:string,availableDate:IAvailableDate):Promise<IAvailabilityDocument|null>
    bookASession(trainerId:Types.ObjectId,userId:Types.ObjectId,date:string,startTime:string):Promise<IAvailabilityDocument|null>
}