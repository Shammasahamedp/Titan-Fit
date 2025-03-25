import { IAdminLoginResponse, IAdminLogin, IAdminDocument } from "../../interfaces/adminInterfaces";


export interface IAdminService{
    loginAdmin(data:IAdminLogin):Promise<IAdminLoginResponse>
}
