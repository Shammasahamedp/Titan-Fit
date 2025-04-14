import { ITrainerDocument, ITrainerProfile, ITrainerSignUp } from "../../interfaces/trainerInterfaces";
import { ITrainerRepository } from "./ItrainerRepository";
import { trainerModel } from "../../models/trainer/trainerModel";
import { IUserDocument } from "../../interfaces/userInterfaces";

export class TrainerRepository implements ITrainerRepository{
   async findTrainerByEmail(email: string): Promise<ITrainerDocument | null> {
        return await trainerModel.findOne({email})
    }
  async  createTrainer(data: ITrainerSignUp): Promise<ITrainerDocument> {
        return (await trainerModel.create(data)) as ITrainerDocument
    }
   async findOne(googleId: string): Promise<ITrainerDocument | null> {
        return await trainerModel.findOne({googleId})
    }
    async saveGoogleId(email: string, googleId: string): Promise<IUserDocument | null> {
        return await trainerModel.findOneAndUpdate(
            {email:email},
            {$set:{googleId:googleId}},
            {new:true}
        )
    }
    async updatePassword(email: string, password: string): Promise<ITrainerDocument | null> {
        return await trainerModel.findOneAndUpdate(
            {email:email},
            {$set:{password:password}},
            {new:true}
        )
    }
    async findTrainerById(trainerId: string): Promise<ITrainerDocument | null> {
        return await trainerModel.findById(trainerId)
    }
    async editTrainerProfile(trainerId: string, trainerProfileData: ITrainerProfile): Promise<ITrainerDocument | null> {
        return await trainerModel.findByIdAndUpdate(trainerId,trainerProfileData,{new:true})
    }
    async addProfilePic(trainerId: string, profilePic: string): Promise<ITrainerDocument | null> {
        return await trainerModel.findByIdAndUpdate(trainerId,{profilePicture:profilePic},{new:true})
    }

   async addCertificate(trainerId: string, trainerCertificate: string): Promise<ITrainerDocument|null> {
        return await trainerModel.findByIdAndUpdate(
            trainerId,
            {$push:{trainerCertificate:trainerCertificate}},
            {new:true}
        )
    }
    async getTrainers(): Promise<ITrainerDocument[] | null> {
        return await trainerModel.find().select('-password -createdAt -updatedAt -__v -googleId')
    }
    
   async changeApproval(trainerId: string,approved:boolean): Promise<ITrainerDocument | null> {
        return await trainerModel.findByIdAndUpdate(
            trainerId,
            {$set:{approved:!approved}},
            {new:true}
        )
    }
}