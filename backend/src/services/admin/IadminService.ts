import { IAdminLoginResponse, IAdminLogin } from "../../interfaces/adminInterfaces";
import { ISingleUserSubscriptions, ISubscriptionTableData } from "../../interfaces/subscriptionInterfaces";
import { ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";


export interface IAdminService{
    loginAdmin(data:IAdminLogin):Promise<IAdminLoginResponse>;
    getUsers():Promise<IUserDocument[]|null>
    getTrainers():Promise<ITrainerDocument[]>
    changeTrainerApproval(trainerId:string,approved:boolean):Promise<ITrainerDocument>
    userToggle(userId:string,blocked:boolean):Promise<IUserDocument>
    getSubscribers():Promise<ISubscriptionTableData[]|null[]>
    getSingleUserSubscriptions(userId:string):Promise<ISingleUserSubscriptions[]|null[]>
}
