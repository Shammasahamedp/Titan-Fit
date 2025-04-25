import { ITrainerDocument, ITrainerLogin, ITrainerLoginResponse, ITrainerProfile, ITrainerSignUp } from "../../interfaces/trainerInterfaces";
import { trainerMessages } from "../../messages/trainerRelated";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { ITrainerService } from "./ItrainerService";


export class TrainerService implements ITrainerService{
    private trainerRepository:ITrainerRepository;
    private userRepository : IUserRepository
    constructor(trainerRepository:ITrainerRepository,userRepository:IUserRepository){
        this.trainerRepository = trainerRepository
        this.userRepository = userRepository
    }

    async loginTrainer(data: ITrainerLogin): Promise<ITrainerLoginResponse | null> {
        const trainer = await this.trainerRepository.findOne({email:data.email})
        if(!trainer){
            throw new Error(trainerMessages.LOGIN_FAILED)
        }
        const isValid = comparePassword(data.password,trainer.password as string)
        if(!isValid){
            throw new Error(trainerMessages.LOGIN_FAILED)
        }
        const accessToken = generateAccessToken(trainer._id.toString(),'trainer')
        const refreshToken = generateRefreshToken(trainer._id.toString(),'trainer')

        return {trainer,accessToken,refreshToken}
    }
    async registerTrainer(data: ITrainerSignUp): Promise<ITrainerDocument | null> {
        const existingTrainer = await this.trainerRepository.findOne({email:data.email})
        const existingUser = await this.userRepository.findOne({email:data.email})
        if(existingTrainer || existingUser){
            throw new Error(trainerMessages.EMAIL_ALREADY_EXIST)
        }
        data.password = await hashPassword(data.password)
        console.log('this is data inside register',data)
        return await this.trainerRepository.create(data)
    }
  async  getTrainerProfile(trainerId: string): Promise<ITrainerProfile | null> {
        try {
            const trainer = await this.trainerRepository.findById(trainerId)
            if(trainer){
                const {
                    name,
                    email,
                    gender,
                    age,
                    yearsOfExperience,
                    bio,
                    phone,
                    profilePicture,
                    trainerCertificate
                } = trainer

                const trainerProfile = {
                    name,
                    email,
                    gender,
                    age,
                    yearsOfExperience,
                    bio,
                    phone,
                    profilePicture,
                    trainerCertificate
                }
                return trainerProfile as ITrainerProfile
            }
            throw new Error(trainerMessages.TRAINER_NOT_FOUND)
        } catch (error) {
            throw new Error (trainerMessages.ERROR_GET_PROFILE)
        }
    }
    async editTrainerProfile(trainerId: string, trainerProfileData: ITrainerProfile): Promise<ITrainerDocument | null> {
        try {
            const editedTrainerProfile = await this.trainerRepository.findByIdAndUpdate(trainerId,trainerProfileData,{new:true})
            if(!editedTrainerProfile){
                throw new Error(trainerMessages.EDIT_TRAINER_PROFILE_ERROR)
            }
            return editedTrainerProfile
        } catch (error) {
            throw new Error(trainerMessages.EDIT_TRAINER_PROFILE_ERROR)
        }
    }

   async addTrainerProfilePic(trainerId: string, trainerProfilePic: string): Promise<string | null> {
        try {
            const trainerData = await this.trainerRepository.findByIdAndUpdate(trainerId,{profilePicture:trainerProfilePic},{new:true})
            if(!trainerData){
                throw new Error(trainerMessages.TRAINER_NOT_FOUND)
            }
            return trainerData?.profilePicture as string
        } catch (error) {
            throw new Error(trainerMessages.ADD_PROFILE_IMAGE_ERROR)
        }
    }
   async addCertificate(trainerId: string, trainerCertificate: string): Promise<string[]> {
        try {
           const trainerData= await this.trainerRepository.addCertificate(trainerId,trainerCertificate)
           if(!trainerData){
            throw new Error(trainerMessages.TRAINER_NOT_FOUND)
           }
           return trainerData.trainerCertificate as string[]
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    async checkPassword(trainerId: string, password: string): Promise<boolean> {
        try {
            
            const trainer = await this.trainerRepository.findById(trainerId)
            if(!trainer){
                return false
            }
            const isValid =await  comparePassword(password,trainer.password as string)
            if(!isValid){
                return false
            }
            return true
        } catch (error) {
            throw new Error()
        }
    }
    async resetPassword(trainerId: string, password: string): Promise<ITrainerDocument | null> {
        try {
            const hashedPassword =await hashPassword(password)
            const trainer = await this.trainerRepository.findByIdAndUpdate(trainerId,{password:hashedPassword},{new:true})
            if(trainer){
                return trainer
            }
            throw new Error()
        } catch (error) {
            throw new Error()
        }
    }
}