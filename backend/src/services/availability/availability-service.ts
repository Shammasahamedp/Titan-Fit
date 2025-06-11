import mongoose from "mongoose";
import { availabilityMessages } from "../../messages/availability-related";
import {
  IAvailabilityDocument,
  IUserBookedSessionDetails,
  IUserBookedSessionPopulated,
  IUserBookedSessionTableData,
} from "../../models/availability/IavailabilityModel";
import { IAvailabilityRepository } from "../../repositories/availability/IavailabilityRepository";
import { AppError } from "../../utils/handleResponse";
import { IAvailabilityService } from "./Iavailability-service";

export class AvailabilityService implements IAvailabilityService {
  private availabilityRepo: IAvailabilityRepository;
  constructor(availabilityRepository: IAvailabilityRepository) {
    this.availabilityRepo = availabilityRepository;
  }
  async getAvailability(
    trainerId: string
  ): Promise<IAvailabilityDocument | null> {
    try {
      const availability = await this.availabilityRepo.findOne({
        trainerId: trainerId,
      });
      let newAvailability;
      if (!availability) {
        const newTrainerId = new mongoose.Types.ObjectId(trainerId);
        newAvailability = await this.availabilityRepo.create({
          trainerId: newTrainerId,
          availability: [],
        });
      } else {
        newAvailability = availability;
      }
      return newAvailability;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new Error("something went wrong while fetching availability");
    }
  }

  async getBookedSessionDetails(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: string | boolean
  ) {
    try {
      const bookedSessions =
        await this.availabilityRepo.getTrainersBookedSessions(
          trainerId,
          page,
          search,
          sortKey,
          sortAsc
        );
      if (
        !bookedSessions ||
        (Array.isArray(bookedSessions) && bookedSessions.length === 0)
      ) {
        throw new AppError(availabilityMessages.BOOKED_SESSION_NOT_FOUND, 404);
      }
      const bookesSesssionTableData = bookedSessions.availability.map(

        (item) => {
          return {
            date: item.date,
            time: item.timeSlot.startTime,
            user: item.timeSlot.userDetails?.name,
            email: item.timeSlot.userDetails?.email,
            fitnessLevel: item.timeSlot.userDetails?.fitnessLevel,

            status: item.isCompleted
              ? "completed"
              : new Date(item.date) < new Date()
              ? "missed"
              : "upcoming",
          };
        }

      );
      console.log("booked sessions", bookedSessions);

      return bookesSesssionTableData;
    } catch (error) {
      console.log(error)
      if (error instanceof AppError) {
        throw error;
      }
      throw new Error("something went wrong while fetching booked sessions");
    }
  }
  async getUsersBookesSessions(
    userId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: string | boolean
  ): Promise<IUserBookedSessionTableData | any[]> {
    try {
      const bookedSessions = await this.availabilityRepo.getUsersBookesSessions(
        userId,
        page,
        search,
        sortKey,
        sortAsc
      );
      if (bookedSessions === null) {
        throw new AppError(
          availabilityMessages.USER_BOOKEDSESSION_GET_FAILURE,
          404
        );
      }
      const userBookedSessionTableData = bookedSessions.sessions.map((item) => {
        return {
          trainer: item.trainerName,
          email: item.trainerEmail,
          date: item.date,
          time: item.startTime,
          status: item.isCompleted
            ? "completed"
            : new Date(item.date) < new Date()
            ? "missed"
            : "upcoming",
        };
      });
      console.log("fds", userBookedSessionTableData);
      return userBookedSessionTableData;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new Error(
        "something went wrong while fetching the booked sessions"
      );
    }
  }
}
