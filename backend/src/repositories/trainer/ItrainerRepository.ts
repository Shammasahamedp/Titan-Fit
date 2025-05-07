import { ITrainerSignUp,ITrainerDocument, ITrainerProfile } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";
import { IBaseRepository } from "../IbaseRepository";

export interface ITrainerRepository extends IBaseRepository<ITrainerDocument>{
    // findTrainerByEmail(email:string):Promise<ITrainerDocument|null>;
    // createTrainer(data:ITrainerSignUp):Promise<ITrainerDocument>
    // findOne(googleId:string):Promise<ITrainerDocument|null>
    // saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    // findTrainerById(trainerId:string):Promise<ITrainerDocument|null>
    // editTrainerProfile(trainerId:string,trainerProfileData:ITrainerProfile):Promise<ITrainerDocument|null>
    // addProfilePic(trainerId:string,profilePic:string):Promise<ITrainerDocument|null>
    // updatePassword(id:string,password:string):Promise<ITrainerDocument|null>
    addCertificate(trainerId:string,trainerCertificate:string):Promise<ITrainerDocument|null>
    getApprovedTrainer(trainerId:string):Promise<ITrainerDocument|null>
    getApprovedTrainers(skip:number):Promise<ITrainerDocument[]|null>
    // getTrainers():Promise<ITrainerDocument[]|null>
    // changeApproval(trainerId:string,approved:boolean):Promise<ITrainerDocument|null>
}