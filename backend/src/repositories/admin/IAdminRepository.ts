import { IAdminDocument, IAdminLogin } from "../../interfaces/adminInterfaces";

export interface IAdminRepository{
    findAdminByEmail(email:string):Promise<IAdminDocument|null>
}