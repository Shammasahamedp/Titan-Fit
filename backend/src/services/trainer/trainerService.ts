import mongoose from "mongoose";
import {
  ITrainerDocument,
  ITrainerLogin,
  ITrainerLoginResponse,
  ITrainerProfile,
  ITrainerSignUp,
} from "../../interfaces/trainerInterfaces";
import { availabilityMessages } from "../../messages/availability-related";
import { trainerMessages } from "../../messages/trainerRelated";
import {
  IAvailableDate,
  IAvailabilityDocument,
} from "../../models/availability/IavailabilityModel";
import { IAvailabilityRepository } from "../../repositories/availability/IavailabilityRepository";
import { ITrainerRepository } from "../../repositories/trainer/ItrainerRepository";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { AppError } from "../../utils/handleResponse";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { ITrainerService } from "./ItrainerService";

export class TrainerService implements ITrainerService {
  private trainerRepository: ITrainerRepository;
  private userRepository: IUserRepository;
  private availabilityRepo: IAvailabilityRepository;
  constructor(
    trainerRepository: ITrainerRepository,
    userRepository: IUserRepository,
    availabilityRepository: IAvailabilityRepository
  ) {
    this.trainerRepository = trainerRepository;
    this.userRepository = userRepository;
    this.availabilityRepo = availabilityRepository;
  }

  async loginTrainer(
    data: ITrainerLogin
  ): Promise<ITrainerLoginResponse | null> {
    const trainer = await this.trainerRepository.findOne({ email: data.email });
    if (!trainer) {
      throw new AppError(trainerMessages.LOGIN_FAILED, 401);
    } else if (trainer.blocked) {
      throw new AppError("Trainer is blocked by admin, contact admin", 403);
    }
    const isValid = comparePassword(data.password, trainer.password as string);
    if (!isValid) {
      throw new AppError(trainerMessages.LOGIN_FAILED, 401);
    }
    const accessToken = generateAccessToken(trainer._id.toString(), "trainer");
    const refreshToken = generateRefreshToken(
      trainer._id.toString(),
      "trainer"
    );

    return { trainer, accessToken, refreshToken };
  }
  async registerTrainer(
    data: ITrainerSignUp
  ): Promise<ITrainerDocument | null> {
    try {
      const existingTrainer = await this.trainerRepository.findOne({
        email: data.email,
      });
      const existingUser = await this.userRepository.findOne({
        email: data.email,
      });
      const cooldownPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

      if (existingTrainer) {
        const rejectedDate = existingTrainer.rejectedDate;
        const now = new Date();
        if (rejectedDate) {
          const timeSinceRejection = now.getTime() - rejectedDate?.getTime();
          const canReapplay = timeSinceRejection >= cooldownPeriod;
          if (!canReapplay) {
            const nextEligibleDate = new Date(
              rejectedDate.getTime() + cooldownPeriod
            );

            throw new AppError(`You can re-apply after ${nextEligibleDate.toLocaleDateString()},for further details contact admin`,400)
          }
        }
      }
      if (existingTrainer || existingUser) {
        throw new AppError(trainerMessages.EMAIL_ALREADY_EXIST, 409);
      }

      data.password = await hashPassword(data.password);
      return await this.trainerRepository.create(data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("something went wrong while register trainer", 500);
    }
  }
  async getTrainerProfile(trainerId: string): Promise<ITrainerProfile | null> {
    try {
      const trainer = await this.trainerRepository.findById(trainerId);
      if (trainer) {
        const {
          name,
          email,
          gender,
          age,
          yearsOfExperience,
          bio,
          phone,
          profilePicture,
          trainerCertificate,
          approved,
          rejectedDate
        } = trainer;

        const trainerProfile = {
          name,
          email,
          gender,
          age,
          yearsOfExperience,
          bio,
          phone,
          profilePicture,
          trainerCertificate,
          approved,
          rejectedDate
        };
        return trainerProfile as ITrainerProfile;
      }
      throw new AppError(trainerMessages.TRAINER_NOT_FOUND, 404);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(trainerMessages.ERROR_GET_PROFILE, 500);
    }
  }
  async editTrainerProfile(
    trainerId: string,
    trainerProfileData: ITrainerProfile
  ): Promise<ITrainerDocument | null> {
    try {
      const editedTrainerProfile =
        await this.trainerRepository.findByIdAndUpdate(
          trainerId,
          trainerProfileData,
          { new: true }
        );
      if (!editedTrainerProfile) {
        throw new AppError(
          "failed to edit trainer, edited trainer not found",
          404
        );
      }
      return editedTrainerProfile;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(trainerMessages.EDIT_TRAINER_PROFILE_ERROR, 500);
    }
  }

  async addTrainerProfilePic(
    trainerId: string,
    trainerProfilePic: string
  ): Promise<string | null> {
    try {
      const trainerData = await this.trainerRepository.findByIdAndUpdate(
        trainerId,
        { profilePicture: trainerProfilePic },
        { new: true }
      );
      if (!trainerData) {
        throw new AppError(trainerMessages.TRAINER_NOT_FOUND, 404);
      }
      return trainerData?.profilePicture as string;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(trainerMessages.ADD_PROFILE_IMAGE_ERROR, 500);
    }
  }
  async addCertificate(
    trainerId: string,
    trainerCertificate: string
  ): Promise<string[]> {
    try {
      const trainerData = await this.trainerRepository.addCertificate(
        trainerId,
        trainerCertificate
      );
      if (!trainerData) {
        throw new AppError(trainerMessages.TRAINER_NOT_FOUND, 404);
      }
      return trainerData.trainerCertificate as string[];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw new AppError(
        "something went wrong while add trainer certificate",
        500
      );
    }
  }

  async checkPassword(trainerId: string, password: string): Promise<boolean> {
    try {
      const trainer = await this.trainerRepository.findById(trainerId);
      if (!trainer) {
        return false;
      }
      const isValid = await comparePassword(
        password,
        trainer.password as string
      );
      if (!isValid) {
        return false;
      }
      return true;
    } catch (error) {
      throw new AppError("something went wrong while check password", 500);
    }
  }
  async resetPassword(
    trainerId: string,
    password: string
  ): Promise<ITrainerDocument | null> {
    try {
      const hashedPassword = await hashPassword(password);
      const trainer = await this.trainerRepository.findByIdAndUpdate(
        trainerId,
        { password: hashedPassword },
        { new: true }
      );
      if (trainer) {
        return trainer;
      }
      throw new AppError(trainerMessages.TRAINER_NOT_FOUND, 404);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("something went wrong while reset password", 500);
    }
  }
  async updateAvailability(
    trainerId: string,
    availability: { date: string; slots: string[] }
  ): Promise<IAvailabilityDocument | null> {
    try {
      const trainer = await this.trainerRepository.findById(trainerId);
      if (!trainer) {
        throw new AppError(trainerMessages.TRAINER_NOT_FOUND, 404);
      }
      let transformedSlots = availability.slots.map((value) => {
        return { startTime: value, isBooked: false };
      });
      const isDateExist = await this.availabilityRepo.isDateExist(
        trainerId,
        availability.date
      );
      if (!isDateExist) {
        return await this.availabilityRepo.updateAvailability(trainerId, {
          date: availability.date,
          timeSlots: transformedSlots,
          isCompleted: false,
        });
      }

      return await this.availabilityRepo.updateExistingDateAvailability(
        trainerId,
        {
          date: availability.date,
          timeSlots: transformedSlots,
          isCompleted: false,
        }
      );
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        "something went wrong while updating availability",
        500
      );
    }
  }
}
