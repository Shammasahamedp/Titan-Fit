import {
  IUserSignUp,
  IUserDocument,
  IUserLogin,
  ILoginResponse,
  IUserProfile,
} from "../../interfaces/userInterfaces";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { IUserService } from "./IuserService";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { userMessages } from "../../messages/userRelated";
import { AppError } from "../../utils/handleResponse";
import { ITrainerDocument } from "../../interfaces/trainerInterfaces";
import { trainerMessages } from "../../messages/trainerRelated";
import { IAvailabilityDocument } from "../../models/availability/IavailabilityModel";
import { IAvailabilityRepository } from "../../repositories/availability/IavailabilityRepository";
import { availabilityMessages } from "../../messages/availability-related";
import { Types } from "mongoose";
export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private trainerRepository: ITrainerRepository;
  private trainerAvailability : IAvailabilityRepository
  constructor(
    userRepository: IUserRepository,
    trainerRepository: ITrainerRepository,
    trainerAvailability:IAvailabilityRepository
  ) {
    this.userRepository = userRepository;
    this.trainerRepository = trainerRepository;
    this.trainerAvailability = trainerAvailability
  }

  async registerUser(data: IUserSignUp): Promise<IUserDocument|null> {
    const existingUser = await this.userRepository.findOne({email:data.email});
    const existingTrainer = await this.trainerRepository.findOne(
      {email:data.email}
    );
    if (existingUser || existingTrainer) {
      throw new Error("User already exist");
    }
    data.password = await hashPassword(data.password);
    return await this.userRepository.create(data);
  }

  async loginUser(data: IUserLogin): Promise<ILoginResponse> {
    try {
      const user = await this.userRepository.findOne({email:data.email});
    console.log('thi sis user',user)
    if (!user) {
      throw new AppError("User not found",404);
    }else if(user.blocked){
      throw new AppError('User is blocked , contact admin',403)
    }
    const isValid = comparePassword(data.password, user.password);
    if (!isValid) {
      throw new AppError("Invalid credentials",401);
    }
    const accessToken = generateAccessToken(user._id.toString(),'user');
    const refreshToken = generateRefreshToken(user._id.toString(),'user');

    return { user, accessToken, refreshToken };
    } catch (error) {
      if(error instanceof AppError){
        throw error
      }
      throw new AppError('something went wrong while login user',500)
    }
  }
  async getUserProfile(userId: string): Promise<IUserProfile | null> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AppError(userMessages.USER_NOT_FOUND,404);
        
      }
      const {
        name,
        email,
        gender,
        age,
        fitnessGoal,
        fitnessLevel,
        phone,
        profilePicture,
        weight,
        height,
        subscription
      } = user;

      const userProfile = {
        name,
        email,
        gender,
        age,
        fitnessGoal,
        fitnessLevel,
        phone,
        profilePicture,
        weight,
        height,
        subscription
      };
      return userProfile
    } catch (error) {
      if(error instanceof AppError){
        throw error
      }
         throw new AppError(userMessages.ERROR_GET_PROFILE,500)
    }
  }

 async editUserProfile(userId:string,userProfileData: IUserProfile): Promise<IUserProfile | null> {
      try {
          const editedProfileData = await this.userRepository.editUserProfile(userId,userProfileData)
          if(!editedProfileData){
            throw new AppError('failed to edit user data , new edited user not found',404)
          }
          return editedProfileData
      } catch (error) {
        if(error instanceof AppError){
          throw error
        }
          throw new AppError(userMessages.EDIT_PROFILE_FAILURE,500)
      }
  }
  async addProfilePic(userId: string, userProfilePic: string): Promise<string | null> {
      try {
        console.log('this isserviceurl',userProfilePic)
        const userData = await this.userRepository.addProfilePic(userId,userProfilePic)
        console.log('this is userdata',userData)
         if(!userData){
            throw new AppError('user not found',404)
         }
         return userData?.profilePicture as string
      } catch (error) {
        if(error instanceof AppError){
          throw error
        }
        console.log(error)
        throw new AppError(userMessages.ADD_PROFILE_IMAGE_FAILURE,500)
      }
  }
  async checkPassword(userId: string, password: string): Promise<boolean> {
      try {
        const user = await this.userRepository.findById(userId)
        if(!user){
          return false
        }
        const isValid = await comparePassword(password,user.password as string)
        if(!isValid){
          return false
        }
        return true
      } catch (error) {
        throw new AppError('something went wrong while cheking password',500)
      }
  }
  async resetPassword(userId: string, password: string): Promise<IUserDocument | null> {
      try {
        const hashedPassword = await hashPassword(password)
        const user = await this.userRepository.updatePassword(userId,hashedPassword)
        if(!user){
          throw new AppError('user not found',404)
        }
        return user
      } catch (error) {
        if(error instanceof AppError){
          throw error
        }
        throw new AppError('something went wrong while reseting password',500)
      }
  }
  async getApprovedTrainers(page:number,limit:number,search:string,date:string): Promise<{trainers:ITrainerDocument[],total:number} | null> {
      try {
        const skip = (page -1) * limit
        // const skip = 2
        console.log('skip',skip,'search',search,'date',date)
        const [trainers, total] = await Promise.all([
          this.trainerRepository.getApprovedAvailableTrainers(skip,search,date),
          this.trainerRepository.countDocuments({ approved: true }),
        ]);
        console.log('trainers and total',trainers,total)
        if(!trainers){
          throw new AppError(trainerMessages.APPROVED_TRAINERS_NOT_FOUND,404)
        }
        if(typeof total === 'number'){
          return {trainers,total }
        }
        throw new AppError('total document not found',404)
      } catch (error) {
        console.log(error)
        if(error instanceof AppError){
          throw error
        }
        throw new AppError('something went wrong while fetching trainers',500)
      }
  }
  async getSingleApprovedTrainer(trainerId: string): Promise<{ trainer: ITrainerDocument; availability: IAvailabilityDocument; }> {
      try {
        const trainer = await this.trainerRepository.getApprovedTrainer(trainerId)
        if(!trainer){
          throw new AppError(trainerMessages.APPROVED_TRAINERS_NOT_FOUND,404)
        }
       let newTrainerId = new Types.ObjectId(trainerId)
        const availability = await this.trainerAvailability.findOne({trainerId:newTrainerId})
        let newAvailability
        if(!availability){
          newAvailability= await this.trainerAvailability.create(
            {
                trainerId:newTrainerId,availability:[]
            })

            if(newAvailability){
        
              return {trainer,availability:newAvailability }
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

  async bookASessionWithTrainer(trainerId: string,userId:string, date: string, startTime: string): Promise<boolean> {
      try {
         const trainerRefId = new Types.ObjectId(trainerId)
         const userRefId = new Types.ObjectId(userId)
         const user = await this.userRepository.findById(userId)
          let lastIndex = 0
          if(user?.subscription){
            lastIndex = user.subscription.length-1
            if(user?.subscription[lastIndex]?.status !== 'active'){
              throw new AppError(userMessages.SUBSCRIPTION_INACTIVE,402)
             }
             const availability = await this.trainerAvailability.bookASession(trainerRefId,userRefId,date,startTime)
             if(!availability){
                throw new AppError(availabilityMessages.AVAILABILITY_NOT_FOUND,404)
             }
          }
        
         return true
      } catch (error) {
        if(error instanceof AppError){
          throw error
        }

        throw new AppError('something went wrong while booking a training session',500)
      }
  }
  async updateExpiredSubscription(): Promise<void> {
      try {
          const activeSubscribedUsers = await this.userRepository.find({'subscription.status':'active'})
          console.log(activeSubscribedUsers)
          const today = new Date()
        if(activeSubscribedUsers){
          for(let user of activeSubscribedUsers){
              let updated = false
              if(user.subscription && Array.isArray(user.subscription)){
                  user.subscription.forEach((sub)=>{
                    if((sub.status === 'active' && sub.endDate <today) || sub.creditsRemaining ===0 ){
                      sub.status = 'completed'
                      updated = true
                    }
                  })
              }
              if(updated){
                await user.save()
              }
          }
        }
      } catch (error) {
        if(error instanceof AppError){
          throw error
        }
        throw new AppError('something went wrong while updating the subscription status',500)
      }
  }
}
