import {
  ITrainerDocument,
  ITrainersAvailabilityDocument,
  ITrainersForChat,
} from "../../interfaces/trainerInterfaces";
import { ITrainerRepository } from "./ItrainerRepository";
import { trainerModel } from "../../models/trainer/trainerModel";
import { BaseRepository } from "../baseRepository";

export class TrainerRepository
  extends BaseRepository<ITrainerDocument>
  implements ITrainerRepository
{
  constructor() {
    super(trainerModel);
  }
  //    async findTrainerByEmail(email: string): Promise<ITrainerDocument | null> {
  //         return await trainerModel.findOne({email})
  //     }
  //   async  createTrainer(data: ITrainerSignUp): Promise<ITrainerDocument> {
  //         return (await trainerModel.create(data)) as ITrainerDocument
  //     }

  // async saveGoogleId(email: string, googleId: string): Promise<IUserDocument | null> {
  //     return await trainerModel.findOneAndUpdate(
  //         {email:email},
  //         {$set:{googleId:googleId}},
  //         {new:true}
  //     )
  // }
  // async updatePassword(id: string, password: string): Promise<ITrainerDocument | null> {
  //     return await trainerModel.findOneAndUpdate(
  //         {_id:id},
  //         {$set:{password:password}},
  //         {new:true}
  //     )
  // }
  // async findTrainerById(trainerId: string): Promise<ITrainerDocument | null> {
  //     return await trainerModel.findById(trainerId)
  // }
  // async editTrainerProfile(trainerId: string, trainerProfileData: ITrainerProfile): Promise<ITrainerDocument | null> {
  //     return await trainerModel.findByIdAndUpdate(trainerId,trainerProfileData,{new:true})
  // }
  // async addProfilePic(trainerId: string, profilePic: string): Promise<ITrainerDocument | null> {
  //     return await trainerModel.findByIdAndUpdate(trainerId,{profilePicture:profilePic},{new:true})
  // }

  async addCertificate(
    trainerId: string,
    trainerCertificate: string
  ): Promise<ITrainerDocument | null> {
    return await trainerModel.findByIdAndUpdate(
      trainerId,
      { $push: { trainerCertificate: trainerCertificate } },
      { new: true }
    );
  }
  async getApprovedTrainer(
    trainerId: string
  ): Promise<ITrainerDocument | null> {
    return await trainerModel.findOne({ _id: trainerId, approved: true });
  }
  async getApprovedAvailableTrainers(
    skip: number,
    search: string,
    date: string
  ): Promise<ITrainersAvailabilityDocument[] | null> {
    console.log("d", skip, "d", search, "d", date);
    const pipeline: any[] = [];
    const matchStage: any = { approved: true };
    if (search) {
      matchStage.$text = { $search: search };
    }
    pipeline.push({ $match: matchStage });

    pipeline.push({
      $lookup: {
        from: "availabilities",
        localField: "_id",
        foreignField: "trainerId",
        as: "availability",
      },
    });

    pipeline.push({
      $unwind: {
        path: "$availability",
        preserveNullAndEmptyArrays: true,
      },
    });

    if (date) {
      let newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);

      pipeline.push({
        $match: {
          "availability.availability.date": new Date(newDate.toISOString()),
        },
      });
    }

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        profilePicture: 1,
        availability: 1,
      },
    });

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: 3 });

    const result = await trainerModel.aggregate(pipeline);
    return result;
  }

  async getTrainersForChat(): Promise<ITrainersForChat[] | null> {
    const trainers = await trainerModel.aggregate([
      {
        $match: {
          approved: true,
          blocked: false,
        },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          name: 1,
          profilePicture: 1,
        },
      },
    ]);

    return trainers;
  }
}
