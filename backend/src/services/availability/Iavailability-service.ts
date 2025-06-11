import { IAvailabilityDocument, IUserBookedSessionTableData,IBookedSessionDetails } from "../../models/availability/IavailabilityModel";

export interface IAvailabilityService{
    getAvailability(trainerId:string):Promise<IAvailabilityDocument|null>
    getBookedSessionDetails(trainerId:string,page:number,search:string,sortKey:string,sortAsc:string|boolean):Promise<IBookedSessionDetails|any[]>
    getUsersBookesSessions(userId:string,page:number,search:string,sortKey:string,sortAsc:string|boolean):Promise<IUserBookedSessionTableData|any[]>
    // IUserBookedSessionDetails
}
