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
    const user = await this.userRepository.findOne({email:data.email});
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = comparePassword(data.password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    const accessToken = generateAccessToken(user._id.toString(),'user');
    const refreshToken = generateRefreshToken(user._id.toString(),'user');

    return { user, accessToken, refreshToken };
  }
  async getUserProfile(userId: string): Promise<IUserProfile | null> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error(userMessages.USER_NOT_FOUND);
        
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
         throw new Error(userMessages.ERROR_GET_PROFILE)
    }
  }

 async editUserProfile(userId:string,userProfileData: IUserProfile): Promise<IUserProfile | null> {
      try {
          const editedProfileData = await this.userRepository.findByIdAndUpdate(userId,userProfileData,{new:true})
          if(!editedProfileData){
            throw new Error(userMessages.EDIT_PROFILE_FAILURE)
          }
          return editedProfileData
      } catch (error) {
          throw new Error(userMessages.EDIT_PROFILE_FAILURE)
      }
  }
  async addProfilePic(userId: string, userProfilePic: string): Promise<string | null> {
      try {
        console.log('this isserviceurl',userProfilePic)
        const userData = await this.userRepository.findByIdAndUpdate(userId,{profilePicture:userProfilePic},{new:true})
        console.log('this is userdata',userData)
         if(!userData){
            throw new Error()
         }
         return userData?.profilePicture as string
      } catch (error) {
        console.log(error)
        throw new Error(userMessages.ADD_PROFILE_IMAGE_FAILURE)
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
        throw new Error()
      }
  }
  async resetPassword(userId: string, password: string): Promise<IUserDocument | null> {
      try {
        const hashedPassword = await hashPassword(password)
        const user = await this.userRepository.findByIdAndUpdate(userId,{password:hashedPassword},{new:true})
        if(!user){
          throw new Error()
        }
        return user
      } catch (error) {
        throw new Error()
      }
  }
}
