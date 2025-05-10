import {
  ITrainerDocument,
  ITrainerProfile,
  ITrainersAvailabilityDocument,
  ITrainerSignUp,
} from "../../interfaces/trainerInterfaces";
import { ITrainerRepository } from "./ItrainerRepository";
import { trainerModel } from "../../models/trainer/trainerModel";
import { IUserDocument } from "../../interfaces/userInterfaces";
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
    console.log(typeof date,'type')
    console.log(date)
    console.log(new Date(new Date(date).getTime()+86400000))
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
        let newDate = new Date(date)
        newDate.setHours(0,0,0,0)
       
      pipeline.push({
        $match: {
          "availability.availability.date":new Date(newDate.toISOString()),
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
    pipeline.push({ $limit: 2 });

    const result = await trainerModel.aggregate(pipeline);
        console.log(result)
    return result

    //   let something=await trainerModel.aggregate([
    //     {
    //       $match: {
    //         approved: true,
    //         $text: { $search: search||''},
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "availabilities",
    //         localField: "_id",
    //         foreignField: "trainerId",
    //         as: "availability",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$availability",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $match: {
    //         "availability.availability.date": date||'',
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         name: 1,
    //         profilePicture: 1,
    //         availability: 1,
    //       },
    //     },
    //     {
    //       $skip: skip,
    //     },
    //     {
    //       $limit: 2,
    //     },
    //   ]);
    //   console.log(something)
    //   return something
  }

  // async getTrainers(): Promise<ITrainerDocument[] | null> {
  //     return await trainerModel.find().select('-password -createdAt -updatedAt -__v -googleId')
  // }

  //    async changeApproval(trainerId: string,approved:boolean): Promise<ITrainerDocument | null> {
  //         return await trainerModel.findByIdAndUpdate(
  //             trainerId,
  //             {$set:{approved:!approved}},
  //             {new:true}
  //         )
  //     }
}
