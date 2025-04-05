import { IUserSignUp,IUserDocument, IUserLogin, ILoginResponse ,IUserProfile} from "../../interfaces/userInterfaces";


export interface IUserService{
    registerUser(data:IUserSignUp):Promise<IUserDocument|null>
    loginUser(data:IUserLogin):Promise<ILoginResponse|null>
    getUserProfile(userId:string):Promise<IUserProfile|null>
    editUserProfile(userId:string,userProfileData:IUserProfile):Promise<IUserProfile|null>
}