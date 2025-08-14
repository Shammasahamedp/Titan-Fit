import { Types } from "mongoose";
import {
  IAvailabilityDocument,
  IAvailableDate,
  IAvailabilityPopulated,
  IUserBookedSessionPopulated,
  ISlot,
} from "../../models/availability/IavailabilityModel";
import { IBaseRepository } from "../IbaseRepository";
import { IUsersForChat } from "../../interfaces/userInterfaces";
import { IPopulatedAvailability } from "../../interfaces/notificationinterfaces";

export interface IAvailabilityRepository
  extends IBaseRepository<IAvailabilityDocument> {
  updateAvailability(
    trainerId: string,
    availableDate: IAvailableDate
  ): Promise<IAvailabilityDocument | null>;
  isDateExist(trainerId: string, date: string): Promise<boolean | null>;
  getBookedSlotsInADate(
    trainerId: string,
    date: string
  ): Promise<string[] | []>;
  updateExistingDateAvailability(
    trainerId: string,
    availableDate: IAvailableDate
  ): Promise<IAvailabilityDocument | null>;
  updateAlreadyBookedDateAvailability(
    trainerId: string,
    date: string,
    slots: ISlot[]
  ): Promise<IAvailabilityDocument | null>;
  bookASession(
    trainerId: Types.ObjectId,
    userId: Types.ObjectId,
    date: string,
    startTime: string
  ): Promise<IAvailabilityDocument | null>;
  findUserSlotInAnyTrainerInADate(
    userId: Types.ObjectId,
    date: string
  ): Promise<IAvailabilityDocument | null>;
  changeUserSlotOnDate(
    trainerId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
    date: string,
    newStartTime: string
  ): Promise<IAvailabilityDocument | null>;
  getTrainersBookedSessions(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IAvailabilityPopulated | null>;
  getTrainerSessionsAdmin(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IAvailabilityPopulated | null>;
  getTrainersSlots(
    trainerId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IAvailabilityPopulated | null>;
  getUsersBookesSessions(
    userId: string,
    page: number,
    search: string,
    sortKey: string,
    sortAsc: boolean | string
  ): Promise<IUserBookedSessionPopulated | null>;

  cancelTrainerBookedSession(
    trainerId: Types.ObjectId|string,
    userId: Types.ObjectId|string,
    date: string,
    startTime: string
  ): Promise<IAvailabilityDocument | null>;

  getUsersForChat(trainerId:string):Promise<IUsersForChat[]|null>

  checkWhetherSessionExists(trainerId:string,userId:string,date:string,time:string):Promise<IPopulatedAvailability|null>
}
