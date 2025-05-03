import { IAvailabilityDocument } from "../../models/availability/IavailabilityModel";

export interface IAvailabilityService{
    getAvailability(trainerId:string):Promise<IAvailabilityDocument|null>
}