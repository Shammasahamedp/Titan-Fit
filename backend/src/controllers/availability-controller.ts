import { IAvailabilityService } from "../services/availability/Iavailability-service";
import { Request, Response } from "express";
import { handleError } from "../utils/handleResponse";
import { availabilityMessages } from "../messages/availability-related";
export class AvailabilityController {
  private availabilityService: IAvailabilityService;

  constructor(availabilityService: IAvailabilityService) {
    this.availabilityService = availabilityService;
  }

  async getAvailbility(req: Request, res: Response) {
    try {
      const availability = await this.availabilityService.getAvailability(
        res.locals.user.userId
      );
      res
        .status(200)
        .json({
          success: true,
          message: availabilityMessages.AVAILABILITY_GET_SUCCESS,
          availability,
        });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getBookedSessions(req: Request, res: Response) {
    try {
      const {
        page = 1,
        search = "",
        sortKey = "availability.date",
        sortAsc = true,
      } = req.query;
      const trainerId = res.locals.user.userId;
      const bookedData = await this.availabilityService.getBookedSessionDetails(
        trainerId,
        Number(page),
        String(search),
        String(sortKey),
        sortAsc === "true" || sortAsc === true
      );
      res
        .status(200)
        .json({
          success: true,
          message: availabilityMessages.BOOKES_SESSION_GET_SUCCESSFUL,
          bookedData,
        });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getTrainerBookedSessions(req: Request, res: Response) {
    try {
      const {
        page = 1,
        search = "",
        sortKey = "availability.date",
        sortAsc = true,
        trainerId
      } = req.query;
      console.log(req.query,'query')
      console.log(trainerId,'trainerId')

      const bookedData = await this.availabilityService.getBookedSessionDetails(
        trainerId as string,
        Number(page),
        String(search),
        String(sortKey),
        sortAsc === "true" || sortAsc === true
      );
      res
        .status(200)
        .json({
          success: true,
          message: availabilityMessages.BOOKES_SESSION_GET_SUCCESSFUL,
          bookedData,
        });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUserBookedSession(req: Request, res: Response) {
    try {
      const {
        page = 1,
        search = "",
        sortKey = "availability.date",
        sortAsc = true,
      } = req.query;

      const userId = res.locals.user.userId
     const userBookedSessions =  await this.availabilityService.getUsersBookesSessions(userId,Number(page),search as string,sortKey as string,sortAsc === "true" || sortAsc === true)
     res.status(200).json({success:true,message:availabilityMessages.USER_BOOKEDSESSION_GET_SUCCESSFULL,userBookedSessions})
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUserBookedSessionAdmin(req:Request,res:Response){
  try {
    const {
        page = 1,
        search = "",
        sortKey = "availability.date",
        sortAsc = true,
        userId
      } = req.query;
    
       const userBookedSessions =  await this.availabilityService.getUsersBookesSessions(userId as string,Number(page),search as string,sortKey as string,sortAsc === "true" || sortAsc === true)
            res.status(200).json({success:true,message:availabilityMessages.USER_BOOKEDSESSION_GET_SUCCESSFULL,userBookedSessions})

  } catch (error) {
    handleError(res,error)
  }
}
}


