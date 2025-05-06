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

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private trainerRepository: ITrainerRepository;
  constructor(
    userRepository: IUserRepository,
    trainerRepository: ITrainerRepository
  ) {
    this.userRepository = userRepository;
    this.trainerRepository = trainerRepository;
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
      console.log('inside blocked')
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
  async getApprovedTrainers(): Promise<ITrainerDocument[] | null> {
      try {
        const approvedTrainers = await this.trainerRepository.find({approved:true})
        if(!approvedTrainers){
          throw new AppError(trainerMessages.APPROVED_TRAINERS_NOT_FOUND,404)
        }
        return approvedTrainers
      } catch (error) {
        if(error instanceof AppError){
          throw error
        }
        throw new AppError('something went wrong while fetching trainers',500)
      }
  }
}
