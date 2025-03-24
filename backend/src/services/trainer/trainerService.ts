import { ITrainerDocument, ITrainerLogin, ITrainerLoginResponse, ITrainerSignUp } from "../../interfaces/trainerInterfaces";
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
        const trainer = await this.trainerRepository.findTrainerByEmail(data.email)
        if(!trainer){
            throw new Error(trainerMessages.LOGIN_FAILED)
        }
        const isValid = comparePassword(data.password,trainer.password)
        if(!isValid){
            throw new Error(trainerMessages.LOGIN_FAILED)
        }
        const accessToken = generateAccessToken(trainer._id.toString())
        const refreshToken = generateRefreshToken(trainer._id.toString())

        return {trainer,accessToken,refreshToken}
    }
    async registerTrainer(data: ITrainerSignUp): Promise<ITrainerDocument | null> {
        const existingTrainer = await this.trainerRepository.findTrainerByEmail(data.email)
        const existingUser = await this.userRepository.findUserByEmail(data.email)
        if(existingTrainer || existingUser){
            throw new Error(trainerMessages.EMAIL_ALREADY_EXIST)
        }
        data.password = await hashPassword(data.password)
        console.log('this is data inside register',data)
        return await this.trainerRepository.createTrainer(data)
    }
}