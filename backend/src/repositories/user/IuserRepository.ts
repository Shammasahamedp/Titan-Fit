import { IUserSignUp,IUserDocument, IUserProfile, IUserSubscriptionDetailsPopulated } from "../../interfaces/userInterfaces";
import { ISubscriptionDetails } from "../../models/user/IuserModel";
import { IBaseRepository } from "../IbaseRepository";

export interface IUserRepository extends IBaseRepository<IUserDocument>{
    // findUserByEmail(email:string):Promise<IUserDocument|null>;
    // createUser(data:IUserSignUp):Promise<IUserDocument>
    // findOne(googleId:string):Promise<IUserDocument|null>
    saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    getSubscriptionDetails(userId:string):Promise<IUserSubscriptionDetailsPopulated|null>
    // findUserById(userId:string):Promise<IUserDocument|null>
    editUserProfile(userId:string,profileData:IUserProfile):Promise<IUserDocument|null>
    addProfilePic(userId:string,profilePic:string):Promise<IUserDocument|null>
    updatePassword(id:string,password:string):Promise<IUserDocument|null>
    addSubscription(userId:string,subscriptionDetails:ISubscriptionDetails):Promise<void>
    getSubscribers():Promise<IUserDocument[]>
    // getUsers():Promise<IUserDocument[]|null>
    // userToggle(userId:string,blocked:boolean):Promise<IUserDocument|null>
}