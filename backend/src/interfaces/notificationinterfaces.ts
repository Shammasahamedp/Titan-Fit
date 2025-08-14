import { IAvailabilityDocument } from "../models/availability/IavailabilityModel";
import { ITrainerDocument } from "./trainerInterfaces";

export interface IPopulatedAvailability extends Omit<IAvailabilityDocument,'trainerId'>{
    trainerId:ITrainerDocument
}

export interface INotificationSessionDetails{
    trainer:string,
    time:string,
    date:string|Date
}