import { ITrainerSignUp,ITrainerDocument, ITrainerProfile, ITrainersAvailabilityDocument } from "../../interfaces/trainerInterfaces";
import { IUserDocument } from "../../interfaces/userInterfaces";
import { IBaseRepository } from "../IbaseRepository";
import { ITrainersForChat } from "../../interfaces/trainerInterfaces";
export interface ITrainerRepository extends IBaseRepository<ITrainerDocument>{
    // findTrainerByEmail(email:string):Promise<ITrainerDocument|null>;
    // createTrainer(data:ITrainerSignUp):Promise<ITrainerDocument>
    // findOne(googleId:string):Promise<ITrainerDocument|null>
    // saveGoogleId(email:string,googleId:string):Promise<IUserDocument|null>
    // findTrainerById(trainerId:string):Promise<ITrainerDocument|null>
    // editTrainerProfile(trainerId:string,trainerProfileData:ITrainerProfile):Promise<ITrainerDocument|null>
    // addProfilePic(trainerId:string,profilePic:string):Promise<ITrainerDocument|null>
    // updatePassword(id:string,password:string):Promise<ITrainerDocument|null>
    addCertificate(trainerId:string,trainerCertificate:string):Promise<ITrainerDocument|null>
    getApprovedTrainer(trainerId:string):Promise<ITrainerDocument|null>
    getApprovedAvailableTrainers(skip:number,search:string,date:string):Promise<ITrainersAvailabilityDocument[]|null>
    getTrainersForChat():Promise<ITrainersForChat[]|null>
    // getTrainers():Promise<ITrainerDocument[]|null>
    // changeApproval(trainerId:string,approved:boolean):Promise<ITrainerDocument|null>
}

// async getApprovedTrainersWithAvailability(skip: number, limit: number, search: string, date: string) {
//     const matchStage: any = {
//       approved: true
//     };
  
//     if (search) {
//       matchStage.name = { $regex: search, $options: 'i' }; // search by name
//     }
  
//     const trainers = await TrainerModel.aggregate([
//       { $match: matchStage },
//       {
//         $lookup: {
//           from: "availabilities",
//           let: { trainerId: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$trainerId", "$$trainerId"] },
//                     { $eq: ["$date", new Date(date)] }
//                   ]
//                 }
//               }
//             }
//           ],
//           as: "availability"
//         }
//       },
//       {
//         $match: { "availability.0": { $exists: true } } // only include trainers who are available on the given date
//       },
//       { $skip: skip },
//       { $limit: limit }
//     ]);
  
//     return trainers;
//   }
  