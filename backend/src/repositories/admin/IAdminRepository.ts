import { IAdminDocument } from "../../interfaces/adminInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";

export interface IAdminRepository{
    findAdminByEmail(email:string):Promise<IAdminDocument|null>;

}