import { IAdminLoginResponse, IAdminLogin } from "../../interfaces/adminInterfaces";
import { ISingleUserSubscriptions, ISubscriptionTableData } from "../../interfaces/subscriptionInterfaces";
import { ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";
import { IAvailabilityDocument } from "../../models/availability/IavailabilityModel";


export interface IAdminService{
    loginAdmin(data:IAdminLogin):Promise<IAdminLoginResponse>;
    getUsers():Promise<IUserDocument[]|null>
    getSingleUser(userId:string):Promise<{user:IUserDocument}>
    getTrainers():Promise<ITrainerDocument[]>
    getSingleTrainer(trainerId:string):Promise<{trainer:ITrainerDocument,availability:IAvailabilityDocument}>
    changeTrainerApproval(trainerId:string,approved:boolean,reason:string):Promise<ITrainerDocument>
    userToggle(userId:string,blocked:boolean):Promise<IUserDocument>
    getSubscribers():Promise<ISubscriptionTableData[]|null[]>
    getSingleUserSubscriptions(userId:string):Promise<ISingleUserSubscriptions[]|null[]>
}
