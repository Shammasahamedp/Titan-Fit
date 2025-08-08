import {
  IUserSignUp,
  IUserDocument,
  IUserProfile,
  IUserSubscriptionDetailsPopulated,
  IUsersForChat,
} from "../../interfaces/userInterfaces";
import { ISubscriptionDetails } from "../../models/user/IuserModel";
import { userModel } from "../../models/user/userModel";
import { BaseRepository } from "../baseRepository";
import { IUserRepository } from "./IuserRepository";
import { Types } from "mongoose";

export class UserRepository
  extends BaseRepository<IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(userModel);
  }
  //   async  createUser(data: IUserSignUp): Promise<IUserDocument> {
  //         return (await userModel.create(data)) as IUserDocument
  //     }
  //   async  findUserByEmail(email: string): Promise<IUserDocument | null> {
  //         return await userModel.findOne({email})
  //     }
  //    async findOne(googleId: string): Promise<IUserDocument | null> {
  //         return await this.model.findOne({googleId})
  //     }
  async saveGoogleId(
    email: string,
    googleId: string
  ): Promise<IUserDocument | null> {
    return await userModel.findOneAndUpdate(
      { email: email },
      { $set: { googleId: googleId } },
      { new: true }
    );
  }
  // async findUserById(userId: string): Promise<IUserDocument | null> {
  //     return await userModel.findById(userId)
  // }
  async editUserProfile(
    userId: string,
    profileData: IUserProfile
  ): Promise<IUserDocument | null> {
    return await userModel.findByIdAndUpdate(userId, profileData, {
      new: true,
    });
  }
  async addProfilePic(
    userId: string,
    profilePic: string
  ): Promise<IUserDocument | null> {
    return await userModel.findByIdAndUpdate(
      userId,
      { profilePicture: profilePic },
      { new: true }
    );
  }
  async updatePassword(
    id: string,
    password: string
  ): Promise<IUserDocument | null> {
    return await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { password: password } },
      { new: true }
    );
  }
  async addSubscription(
    userId: string,
    subscriptionDetails: ISubscriptionDetails
  ): Promise<void> {
    const result = await userModel.findByIdAndUpdate(userId, {
      $push: {
        subscription: subscriptionDetails,
      },
    });
  }

  async getSubscribers(): Promise<IUserDocument[]> {
    const subscribers = await userModel.find({
      subscription: { $exists: true, $ne: [] },
    });
    return subscribers;
  }
  // async getUsers(): Promise<IUserDocument[] | null> {
  //     return await userModel.find().select('-password -createdAt -updatedAt -__v -googleId')
  // }
  // async userToggle(userId: string, blocked: boolean): Promise<IUserDocument | null> {
  //     return await userModel.findByIdAndUpdate(
  //         userId,
  //         {$set:{blocked:!blocked}},
  //         {new:true}
  //     )
  // }

   //  let user = await userModel.findById(userId).populate('subscription.subscriptionId').populate('subscription.paymentId') .lean(false)
    //   console.log('usersub',user)
    //  return user as unknown as IUserSubscriptionDetailsPopulated
    
  async getSubscriptionDetails(
    userId: string
  ): Promise<IUserSubscriptionDetailsPopulated | null > {
   
    let userSubscriptionDetails = await userModel.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "subscriptions",
          localField: "subscription.subscriptionId",
          foreignField: "_id",
          as: "subscriptionId",
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "subscription.paymentId",
          foreignField: "_id",
          as: "paymentId",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          subscription: 1,
          subscriptionId: 1,
          paymentId: 1,
        },
      },
    ]);

    return userSubscriptionDetails[0];
  }

 
}
