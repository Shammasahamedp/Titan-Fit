import { IAdminLogin, IAdminLoginResponse } from "../../interfaces/adminInterfaces";
import { ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";
import { AdminRepository } from "../../repositories/admin/adminRepository";
import { TrainerRepository } from "../../repositories/trainer/trainerRepository";
import { UserRepository } from "../../repositories/user/userRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IAdminService } from "./IadminService";


export class AdminService implements IAdminService{
    private adminRepository : AdminRepository
    private userRepository : UserRepository
    private trainerRepository:TrainerRepository
    constructor(adminRepository:AdminRepository,userRepository:UserRepository,trainerRepository:TrainerRepository){
        this.adminRepository = adminRepository
        this.userRepository = userRepository
        this.trainerRepository = trainerRepository
    }
   async loginAdmin(data: IAdminLogin): Promise<IAdminLoginResponse> {
        const admin = await this.adminRepository.findOne({email:data.email})
        if(!admin){
            throw new Error ('invalide credentials')
        }
       
        const accessToken = generateAccessToken(admin._id.toString(),'admin')
        const refreshToken = generateRefreshToken(admin._id.toString(),'admin')

        return {admin,accessToken,refreshToken}
    }
   async getUsers(): Promise<IUserDocument[]> {
        try {
            const users = await this.userRepository.find({})
            if(!users){
                throw new Error()
            }
            return users
        } catch (error) {
            throw new Error()
        }
    }
   async getTrainers(): Promise<ITrainerDocument[]> {
        try {
            const trainers = await this.trainerRepository.find({})
            if(!trainers){
                throw new Error()
            }
            return trainers
        } catch (error) {
            throw new Error()
        }
    }
   
   async  changeTrainerApproval(trainerId: string,approved:boolean): Promise<ITrainerDocument> {
        try {
           const trainer= await this.trainerRepository.findByIdAndUpdate(trainerId,{approved:!approved},{new:true})
           if(!trainer){
            throw new Error()
           }
           return trainer
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    async userToggle(userId: string, blocked: boolean): Promise<IUserDocument> {
        try {
            const user = await this.userRepository.findByIdAndUpdate(userId,{blocked:!blocked},{new:true})
            if(!user){
                throw new Error()
            }
            return user
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
    
}