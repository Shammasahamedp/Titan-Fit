import { ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { IUserSignUp,IUserDocument, IUserLogin, ILoginResponse ,IUserProfile, IUsersForChat} from "../../interfaces/userInterfaces";
import { IAvailabilityDocument } from "../../models/availability/IavailabilityModel";


export interface IUserService{
    registerUser(data:IUserSignUp):Promise<IUserDocument|null>
    loginUser(data:IUserLogin):Promise<ILoginResponse|null>
    getUserProfile(userId:string):Promise<IUserProfile|null>
    editUserProfile(userId:string,userProfileData:IUserProfile):Promise<IUserProfile|null>
    addProfilePic(userId:string,userProfilePic:string):Promise<string|null>
    checkPassword(userId:string,password:string):Promise<boolean>
    resetPassword(userId:string,password:string):Promise<IUserDocument|null>
    getApprovedTrainers(page:number,limit:number,search:string,date:string):Promise<{trainers:ITrainerDocument[],total:number}|null>
    getSingleApprovedTrainer(trainerId:string):Promise<{trainer:ITrainerDocument,availability:IAvailabilityDocument}>
    bookASessionWithTrainer(trainerId:string,userId:string,date:string,startTime:string):Promise<boolean>
    cancelTrainingSession(trainerId:string,userId:string,date:string,startTime:string):Promise<boolean>
    updateExpiredSubscription():Promise<void>
    getUsersForChat(trainerId:string):Promise<IUsersForChat[]|null>
}