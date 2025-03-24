import { ITrainerDocument, ITrainerSignUp } from "../../interfaces/trainerInterfaces";
import { ITrainerRepository } from "./ItrainerRepository";
import { trainerModel } from "../../models/trainer/trainerModel";

export class TrainerRepository implements ITrainerRepository{
   async findTrainerByEmail(email: string): Promise<ITrainerDocument | null> {
        return await trainerModel.findOne({email})
    }
  async  createTrainer(data: ITrainerSignUp): Promise<ITrainerDocument> {
        return (await trainerModel.create(data)) as ITrainerDocument
    }
}