import { IAdminDocument, IAdminLogin } from "../../interfaces/adminInterfaces";
import { IAdminRepository } from "./IAdminRepository";
import { adminModel } from "../../models/admin/adminModel";
export class AdminRepository implements IAdminRepository{
  async  findAdminByEmail(email: string): Promise<IAdminDocument | null> {
        return await adminModel.findOne({email})
    }
    
}