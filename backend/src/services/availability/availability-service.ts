import { availabilityMessages } from "../../messages/availability-related";
import { availabilityModel } from "../../models/availability/availabilityModel";
import { IAvailabilityDocument } from "../../models/availability/IavailabilityModel";
import { IAvailabilityRepository } from "../../repositories/availability/IavailabilityRepository";
import { AppError } from "../../utils/handleResponse";
import { IAvailabilityService } from "./Iavailability-service";

export class AvailabilityService  implements IAvailabilityService{
    private availabilityRepo:IAvailabilityRepository
    constructor(availabilityRepository:IAvailabilityRepository){
      this.availabilityRepo = availabilityRepository
    }
    async getAvailability(trainerId:string): Promise<IAvailabilityDocument | null> {
        try {
            const availability = await this.availabilityRepo.findOne({trainerId:trainerId})
            if(!availability){
                throw new AppError(availabilityMessages.AVAILABILITY_NOT_FOUND,404)
            }
            return availability
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new Error('something went wrong while fetching availability')
        }
    }
}