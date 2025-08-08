import { TypeOf } from "zod";
import { availabilityModel } from "../../models/availability/availabilityModel";
import {
  IAvailabilityDocument,
  IAvailabilityPopulated,
  IAvailableDate,
  ISlot,
  IUserBookedSessionPopulated,
} from "../../models/availability/IavailabilityModel";
import { BaseRepository } from "../baseRepository";
import { IAvailabilityRepository } from "./IavailabilityRepository";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { IUsersForChat } from "../../interfaces/userInterfaces";
export class AvailabilityRepository
  extends BaseRepository<IAvailabilityDocument>
  implements IAvailabilityRepository
{
  constructor() {
    super(availabilityModel);
  }

  async updateAvailability(
    trainerId: string,
    availableDate: IAvailableDate
  ): Promise<IAvailabilityDocument | null> {
    return await availabilityModel.findOneAndUpdate(
      { trainerId: trainerId },
      { $push: { availability: availableDate } },
      { new: true, upsert: true }
    );
  }

  async getBookedSlotsInADate(
    trainerId: string,
    date: string
  ): Promise<string[] | []> {
    const data = await availabilityModel.findOne({ trainerId: trainerId });
const something = data?.availability.find((value) =>
  new Date(value.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
);
    const bookedSlots = something?.timeSlots
      .filter((value) => value.isBooked)
      .map((value) => value.startTime);

    if (bookedSlots) {
      return bookedSlots;
    } else {
      return [];
    }
  }

  async isDateExist(trainerId: string, date: string): Promise<boolean | null> {
    return await availabilityModel.findOne({
      trainerId: trainerId,
      'availability.date':date
    });
  }

  async updateExistingDateAvailability(
    trainerId: string,
    availableDate: IAvailableDate
  ): Promise<IAvailabilityDocument | null> {
    return await availabilityModel.findOneAndUpdate(
      { trainerId: trainerId, "availability.date": availableDate.date },
      { $set: { "availability.$.timeSlots": availableDate.timeSlots } },
      { new: true }
    );
  }


  async updateAlreadyBookedDateAvailability(
  trainerId: string,
  date: string,
  newSlots: ISlot[]
): Promise<IAvailabilityDocument | null> {
  const availabilityDoc = await availabilityModel.findOne({ trainerId });
  if (!availabilityDoc) return null;
  const dateEntry = availabilityDoc.availability.find((entry) => entry.date.toISOString() === date);
  if (!dateEntry) return null;
  const filteredNewSlots = newSlots.map((slot)=>{
    return {
      startTime:slot.startTime,
      isBooked:slot.isBooked,

    }
  })
  const bookedSlots=dateEntry.timeSlots.filter((slot)=>{
    return slot.isBooked === true
  })

  const updatedSlots = [...bookedSlots,...filteredNewSlots]

  dateEntry.timeSlots =  updatedSlots
  await availabilityDoc.save();
  return availabilityDoc;
}


  async bookASession(
    trainerId: Types.ObjectId,
    userId: Types.ObjectId,
    date: string,
    startTime: string
  ): Promise<IAvailabilityDocument | null> {
    const [year, month, day] = date.split("-");
    const formatted = `${year}-${month}-${day}`;

    return await availabilityModel.findOneAndUpdate(
      {
        trainerId: trainerId,
        $expr: {
          $in: [
            formatted,
            {
              $map: {
                input: "$availability",
                as: "a",
                in: { $dateToString: { date: "$$a.date", format: "%Y-%m-%d" } },
              },
            },
          ],
        },
      },
      {
        $set: {
          "availability.$[outer].timeSlots.$[slot].isBooked": true,
          "availability.$[outer].timeSlots.$[slot].userId": userId,
        },
      },
      {
        arrayFilters: [
          {
            "outer.date": {
              $gte: new Date(date),
              $lt: new Date(
                new Date(date).setDate(new Date(date).getDate() + 1)
              ),
            },
          },
          { "slot.startTime": startTime, "slot.isBooked": false },
        ],
        new: true,
      }
    );
  }

  async cancelTrainerBookedSession(trainerId: Types.ObjectId, userId: Types.ObjectId, date: string, startTime: string): Promise<IAvailabilityDocument | null> {
      const [year, month, day] = date.split("-");
    const formatted = `${year}-${month}-${day}`;
    return await availabilityModel.findOneAndUpdate(
      {
        trainerId: trainerId,
        $expr: {
          $in: [
            formatted,
            {
              $map: {
                input: "$availability",
                as: "a",
                in: { $dateToString: { date: "$$a.date", format: "%Y-%m-%d" } },
              },
            },
          ],
        },
      },
      {
        $set: {
          "availability.$[outer].timeSlots.$[slot].isBooked": false,
          "availability.$[outer].timeSlots.$[slot].userId": null,
        },
      },
       {
    arrayFilters: [
       {
            "outer.date": {
              $gte: new Date(date),
              $lt: new Date(
                new Date(date).setDate(new Date(date).getDate() + 1)
              ),
            },
          },               
      { "slot.userId": userId }                  
    ],
    new: true
  }
    );
  }



async changeUserSlotOnDate(
  trainerId: Types.ObjectId,
  userId: Types.ObjectId,
  date: string,
  newStartTime: string
): Promise<IAvailabilityDocument | null> {
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  // 1️⃣ Step 1: Unset (unbook) previous slot
  await availabilityModel.updateOne(
    {
      trainerId,
      "availability.date": { $gte: startOfDay, $lt: endOfDay },
      "availability.timeSlots.userId": userId
    },
    {
      $set: {
        "availability.$[outer].timeSlots.$[slot].isBooked": false,
        "availability.$[outer].timeSlots.$[slot].userId": null
      }
    },
    {
      arrayFilters: [
        { "outer.date": { $gte: startOfDay, $lt: endOfDay } },
        { "slot.userId": userId }
      ]
    }
  );

  // 2️⃣ Step 2: Set (book) new slot
  const updated = await availabilityModel.findOneAndUpdate(
    {
      trainerId,
      "availability.date": { $gte: startOfDay, $lt: endOfDay },
      "availability.timeSlots.startTime": newStartTime,
      "availability.timeSlots.isBooked": false
    },
    {
      $set: {
        "availability.$[outer].timeSlots.$[slot].isBooked": true,
        "availability.$[outer].timeSlots.$[slot].userId": userId
      }
    },
    {
      arrayFilters: [
        { "outer.date": { $gte: startOfDay, $lt: endOfDay } },
        { "slot.startTime": newStartTime, "slot.isBooked": false }
      ],
      new: true
    }
  );

  return updated;
}





  async findUserSlotInAnyTrainerInADate(userId: Types.ObjectId, date: string): Promise<IAvailabilityDocument | null> {
  // const startOfDay = new Date(date);

  const startOfDay = new Date(`${date}T00:00:00.000Z`);
const endOfDay = new Date(`${date}T23:59:59.999Z`);




  const existingBooking = await availabilityModel.findOne({ 
    availability: {
      $elemMatch: {
        date: { $gte: startOfDay, $lt: endOfDay },
        timeSlots: {
          $elemMatch: {
            userId: userId // or userId.toString() depending on schema
          }
        }
      }
    }
  });

  return existingBooking;
}

  async getTrainersBookedSessions(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IAvailabilityPopulated | null> {
    console.log(
      "page",
      page,
      "trainerId",
      trainerId,
      "search",
      search,
      "sortKey",
      sortKey
    );

    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    const pipeline: any[] = [
      { $match: { trainerId: new mongoose.Types.ObjectId(trainerId) } },
      { $unwind: "$availability" },
      { $unwind: "$availability.timeSlots" },
      { $match: { "availability.timeSlots.isBooked": true } },
      {
        $lookup: {
          from: "users",
          localField: "availability.timeSlots.userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          "availability.timeSlots.userDetails": {
            $let: {
              vars: { user: { $arrayElemAt: ["$userDetails", 0] } },
              in: {
                name: "$$user.name",
                email: "$$user.email",
                fitnessLevel: "$$user.fitnessLevel",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$availability.date",
            },
          },
          isCompleted: "$availability.isCompleted",
          timeSlot: {
            startTime: "$availability.timeSlots.startTime",
            userDetails: "$availability.timeSlots.userDetails",
          },
        },
      },
    ];

    if (search && search !== "") {
      pipeline.push({
        $match: {
          "timeSlot.userDetails.name": { $regex: search, $options: "i" },
        },
      });
    }

    if (sortKey) {
      pipeline.push({
        $sort: {
          [sortKey]: false ? 1 : -1,
        },
      });
    }

    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await availabilityModel.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    pipeline.push({ $skip: skip }, { $limit: PAGE_SIZE });

    const availability = await availabilityModel.aggregate(pipeline);
    return { availability, totalPages };
  }

  async getTrainerSessionsAdmin(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IAvailabilityPopulated | null> {
   

    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    const pipeline: any[] = [
      { $match: { trainerId: new mongoose.Types.ObjectId(trainerId) } },
      { $unwind: "$availability" },
      { $unwind: "$availability.timeSlots" },
      {
        $lookup: {
          from: "users",
          localField: "availability.timeSlots.userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          "availability.timeSlots.userDetails": {
            $cond: {
              if: { $gt: [{ $size: "$userDetails" }, 0] },
              then: {
                name: { $arrayElemAt: ["$userDetails.name", 0] },
                email: { $arrayElemAt: ["$userDetails.email", 0] },
                fitnessLevel: {
                  $arrayElemAt: ["$userDetails.fitnessLevel", 0],
                },
              },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$availability.date",
            },
          },
          isCompleted: "$availability.isCompleted",
          isBooked: "$availability.timeSlots.isBooked",
          time: "$availability.timeSlots.startTime",
          userDetails: "$availability.timeSlots.userDetails",
        },
      },
    ];

    if (search && search.trim() !== "") {
      pipeline.push({
        $match: {
          "userDetails.name": { $regex: search, $options: "i" },
        },
      });
    }

    if (sortKey) {
      pipeline.push({
        $sort: {
          [sortKey]: sortAsc === true || sortAsc === "true" ? 1 : -1,
        },
      });
    }

    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await availabilityModel.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    pipeline.push({ $skip: skip }, { $limit: PAGE_SIZE });

    const availability = await availabilityModel.aggregate(pipeline);
    return { availability, totalPages };
  }

  async getUsersBookesSessions(
    userId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IUserBookedSessionPopulated | null> {
    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    const pipeline: any[] = [
      { $unwind: "$availability" },
      { $unwind: "$availability.timeSlots" },
      {
        $match: {
          "availability.timeSlots.userId": new mongoose.Types.ObjectId(userId),
          "availability.timeSlots.isBooked": true,
        },
      },
      {
        $lookup: {
          from: "trainers",
          localField: "trainerId",
          foreignField: "_id",
          as: "trainerDetails",
        },
      },
      {
        $addFields: {
          trainerDetails: { $arrayElemAt: ["$trainerDetails", 0] },
        },
      },
    ];

    if (search && search !== "") {
      pipeline.push({
        $match: {
          "trainerDetails.name": { $regex: search, $options: "i" },
        },
      });
    }

    pipeline.push({
      $project: {
        _id: 0,
        trainerName: "$trainerDetails.name",
        trainerEmail: "$trainerDetails.email",
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$availability.date",
          },
        },
        startTime: "$availability.timeSlots.startTime",
        isCompleted: "$availability.isCompleted",
      },
    });

    if (sortKey) {
      pipeline.push({
        $sort: {
          [sortKey]: sortAsc ? 1 : -1,
        },
      });
    }

    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await availabilityModel.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    pipeline.push({ $skip: skip }, { $limit: PAGE_SIZE });

    const sessions = await availabilityModel.aggregate(pipeline);

    return { sessions, totalPages };
  }

  async getTrainersSlots(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IAvailabilityPopulated | null> {

    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    const pipeline: any[] = [
      { $match: { trainerId: new mongoose.Types.ObjectId(trainerId) } },
      { $unwind: "$availability" },
      { $unwind: "$availability.timeSlots" },
      { $match: { "availability.timeSlots.isBooked": true } },
      {
        $lookup: {
          from: "users",
          localField: "availability.timeSlots.userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          "availability.timeSlots.userDetails": {
            $let: {
              vars: { user: { $arrayElemAt: ["$userDetails", 0] } },
              in: {
                name: "$$user.name",
                email: "$$user.email",
                fitnessLevel: "$$user.fitnessLevel",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$availability.date",
            },
          },
          isCompleted: "$availability.isCompleted",
          timeSlot: {
            startTime: "$availability.timeSlots.startTime",
            userDetails: "$availability.timeSlots.userDetails",
          },
        },
      },
    ];

    if (search && search !== "") {
      pipeline.push({
        $match: {
          "timeSlot.userDetails.name": { $regex: search, $options: "i" },
        },
      });
    }

    if (sortKey) {
      pipeline.push({
        $sort: {
          [sortKey]: false ? 1 : -1,
        },
      });
    }

    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await availabilityModel.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    pipeline.push({ $skip: skip }, { $limit: PAGE_SIZE });

    const availability = await availabilityModel.aggregate(pipeline);

    return { availability, totalPages };
  }

  

 getUsersForChat = async (trainerId: string): Promise<IUsersForChat[]> => {
  const users = await availabilityModel.aggregate([
    {
      $match: { trainerId: new mongoose.Types.ObjectId(trainerId) }
    },
    { $unwind: "$availability" },
    { $unwind: "$availability.timeSlots" },
    {
      $match: {
        "availability.timeSlots.userId": { $ne: null }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "availability.timeSlots.userId",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    { $unwind: "$userDetails" },
    {
      $group: {
        _id: "$userDetails._id",
        name: { $first: "$userDetails.name" },
        profilePicture: { $first: "$userDetails.profilePicture" }
      }
    },
    {
      $project: {
        id: "$_id",
        name: 1,
        profilePicture: 1,
        _id: 0
      }
    }
  ]);

  return users as IUsersForChat[];
};

}
