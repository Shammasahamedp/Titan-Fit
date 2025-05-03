import { IAvailabilityService } from "../services/availability/Iavailability-service";
import { Request,Response } from "express";
import { handleError } from "../utils/handleResponse";
import { availabilityMessages } from "../messages/availability-related";
export class AvailabilityController{
    private availabilityService:IAvailabilityService

    constructor(availabilityService:IAvailabilityService){
        this.availabilityService = availabilityService
    }

    async getAvailbility(req:Request,res:Response){
        try {
            const availability = await this.availabilityService.getAvailability(res.locals.user.userId)
            res.status(200).json({success:true,message:availabilityMessages.AVAILABILITY_GET_SUCCESS,availability})
        } catch (error) {
            handleError(res,error)
        }
    }
}