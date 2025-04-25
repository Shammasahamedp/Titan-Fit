import { IAdminDocument } from "../../interfaces/adminInterfaces";
import { IAdminRepository } from "./IAdminRepository";
import { adminModel } from "../../models/admin/adminModel";
import { BaseRepository } from "../baseRepository";

export class AdminRepository extends BaseRepository<IAdminDocument> implements IAdminRepository{
  constructor(){
    super(adminModel)
  }
  // async  findAdminByEmail(email: string): Promise<IAdminDocument | null> {
  //           return await this.model.findOne({email})
  //       }

}