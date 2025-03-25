import { IAdminLogin, IAdminLoginResponse } from "../../interfaces/adminInterfaces";
import { AdminRepository } from "../../repositories/admin/adminRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IAdminService } from "./IadminService";


export class AdminService implements IAdminService{
    private adminRepository : AdminRepository
    constructor(adminRepository:AdminRepository){
        this.adminRepository = adminRepository
    }
   async loginAdmin(data: IAdminLogin): Promise<IAdminLoginResponse> {
        const admin = await this.adminRepository.findAdminByEmail(data.email)
        if(!admin){
            throw new Error ('invalide credentials')
        }
       
        const accessToken = generateAccessToken(admin._id.toString())
        const refreshToken = generateRefreshToken(admin._id.toString())

        return {admin,accessToken,refreshToken}
    }
 
}