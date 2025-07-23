import { IAdminLogin, IAdminLoginResponse } from "../../interfaces/adminInterfaces";
import { ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";
import { AppError } from "../../utils/handleResponse";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { IAdminService } from "./IadminService";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { AdminRepository } from "../../repositories/admin/adminRepository";
import { subscriptionMessage } from "../../messages/subscription-related";
import { ISingleUserSubscriptions, ISubscriptionTableData } from "../../interfaces/subscriptionInterfaces";
import { string } from "zod";
import { userMessages } from "../../messages/userRelated";
import { IAvailabilityDocument } from "../../models/availability/IavailabilityModel";
import { trainerMessages } from "../../messages/trainerRelated";
import { Types } from "mongoose";
import { AvailabilityRepository } from "../../repositories/availability/availabilityRepository";
import { IAvailabilityRepository } from "../../repositories/availability/IavailabilityRepository";
import { availabilityMessages } from "../../messages/availability-related";
import { sendMail } from "../../utils/nodeMailer";
export class AdminService implements IAdminService{
    private adminRepository : AdminRepository
    private userRepository : IUserRepository
    private trainerRepository:ITrainerRepository
    private availabilityRepository:IAvailabilityRepository
    constructor(adminRepository:AdminRepository,userRepository:IUserRepository,trainerRepository:ITrainerRepository,availabilityRepository:IAvailabilityRepository){
        this.adminRepository = adminRepository
        this.userRepository = userRepository
        this.trainerRepository = trainerRepository
        this.availabilityRepository = availabilityRepository
    }
   async loginAdmin(data: IAdminLogin): Promise<IAdminLoginResponse> {
        const admin = await this.adminRepository.findOne({email:data.email})
        if(!admin){
            throw new AppError ('invalide credentials,not autherised',401)
        }
       
        const accessToken = generateAccessToken(admin._id.toString(),'admin')
        const refreshToken = generateRefreshToken(admin._id.toString(),'admin')

        return {admin,accessToken,refreshToken}
    }
   async getUsers(): Promise<IUserDocument[]> {
        try {
            const users = await this.userRepository.find({})
            if(!users){
                throw new AppError('users not found',404)
            }
            return users
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetch users',500)
        }
    }
   async getTrainers(): Promise<ITrainerDocument[]> {
        try {
            const trainers = await this.trainerRepository.find({})
            if(!trainers){
                throw new AppError('trainers not found',404)
            }
            return trainers
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetching trainers',500)
        }
    }
    async getNewTrainers(): Promise<ITrainerDocument[]> {
        try {
            const trainers = await this.trainerRepository.find({new:true})
            if(!trainers){
                throw new AppError('trainers not found',404)
            }
            return trainers
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetching new trainers',500)
        }
    }
   
   async  changeTrainerApproval(trainerId: string,approved:boolean,reason:string): Promise<ITrainerDocument> {
        try {
            if(approved){
               await this.trainerRepository.findByIdAndUpdate(trainerId,{rejectedDate:new Date()})
            } 
           const trainer= await this.trainerRepository.findByIdAndUpdate(trainerId,{approved:!approved},{new:true})
           if(!trainer){
            throw new AppError('trainer not found',404)
           }
           if(!approved){
            await sendMail(trainer.email as string,'Titan Fit : Admin Approved',reason)
           }else {
            await sendMail(trainer.email as string,'Titan Fit : Admin Rejected',reason)
           }
           return trainer
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            console.log(error)
            throw new AppError('something went wrong while trainer approval',500)
        }
    }

    async userToggle(userId: string, blocked: boolean): Promise<IUserDocument> {
        try {
            const user = await this.userRepository.findByIdAndUpdate(userId,{blocked:!blocked},{new:true})
            if(!user){
                throw new AppError('user not found',404)
            }
            return user
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            console.log(error)
            throw new AppError('something went wrong while user toggle',500)
        }
    }

    async getSubscribers(): Promise<ISubscriptionTableData[] | null[]> {
        try {
            const subscribers = await this.userRepository.getSubscribers()
            const subscribersTableData = subscribers.map((user)=>{
                const {name,subscription,_id} = user
                 console.log('user',user,'sadf',subscription)
               if(subscription?.length){
                return {
                    id:String(_id),
                    name,
                    planName:subscription[subscription?.length-1]?.planName as string,
                    status:subscription[subscription.length-1]?.status as string,
                    totalCredits:subscription[subscription.length-1]?.totalCredits as number,
                    creditsRemaining:subscription[subscription.length-1]?.creditsRemaining as number
                }
               }else{
                return null
               }
            }).filter((item): item is ISubscriptionTableData => item !== null);
            console.log('table data',subscribersTableData)
            if(!subscribersTableData){
                throw new AppError(subscriptionMessage.SUBSCRIBERS_NOT_FOUND,404)
            }
            return subscribersTableData
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetching subscribers',500)
        }
    }
    async getSingleUserSubscriptions(userId: string): Promise<ISingleUserSubscriptions[]> {
        try {
            const user = await this.userRepository.getSubscriptionDetails(userId)
            if(!user){
                throw new AppError(userMessages.USER_NOT_FOUND,404)
            }
            console.log('userrrrrrrrrrrrr',user)
                        // console.log('userrrrrrrrrrrrr',user.subscriptionId)
                        //             console.log('userrrrrrrrrrrrr',user.paymentId)


            if( user.subscription){   
                console.log('user.subscription',user.subscription)
                 let userSubscriptionDetails = user.subscription.map((sub)=>({
                    ...sub,
                    subscriptionId:sub.subscriptionId._id,
                    
                    paymentId:sub.paymentId._id
                 }))
                // return userSubscriptionDetails
                console.log('userSubscriptionDetails',userSubscriptionDetails)
                return userSubscriptionDetails
            }
            throw new AppError(userMessages.SUBSCRIPTION_NOT_FOUND,404)
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetch subscriptions of the user',500)
        }
    }

    async getSingleTrainer(trainerId:string): Promise<{ trainer: ITrainerDocument; availability: IAvailabilityDocument; }> {
        try {
            const trainer = await this.trainerRepository.findById(trainerId)
            if(!trainer){
                throw new AppError(trainerMessages.TRAINER_NOT_FOUND,404)
            }
            let newTrainerId = new Types.ObjectId(trainerId)
            const availability = await this.availabilityRepository.findOne({trainerId:newTrainerId})
            let newAvailability
            if(!availability){
                newAvailability = await this.availabilityRepository.create(
                    {trainerId:newTrainerId,availability:[]}
                )

                if(newAvailability){
                    return {trainer,availability:newAvailability}
                }else{
                    throw new AppError(availabilityMessages.AVAILABILITY_NOT_FOUND,404)
                }
            }
            return {trainer,availability}
        } catch (error) {
            if(error instanceof AppError){
                throw error 
            }
            throw new AppError('something went wrong while fetching trainer details',500)
        }
    }

    async getSingleUser(userId: string): Promise<{ user: IUserDocument; } > {
        try {
            const user = await this.userRepository.findById(userId)
            if(!user){
                throw new AppError(userMessages.USER_NOT_FOUND,404)
            }
           
            return {user}
        } catch (error) {
            if(error instanceof AppError){
                throw error
            }
            throw new AppError('something went wrong while fetching user details',500)
        }
    }
    
}