import { commonMessages } from "../messages/common";
import { commonErrors } from "../messages/common-errors";
import { trainerMessages } from "../messages/trainerRelated";
import { ITrainerService } from "../services/trainer/ItrainerService";
import { Request, Response } from "express";
import { handleError } from "../utils/handleResponse";
import { availabilityMessages } from "../messages/availability-related";

export class TrainerController {
  private trainerService: ITrainerService;

  constructor(trainerService: ITrainerService) {
    this.trainerService = trainerService;
  }

  async registerTrainer(req: Request, res: Response): Promise<void> {
    try {
      const trainer = await this.trainerService.registerTrainer(req.body);
      res
        .status(201)
        .json({
          success: true,
          data: trainer,
          message: trainerMessages.SIGNUP_SUCCESS,
        });
    } catch (error: any) {
      handleError(res, error);
      // res.status(400).json({success:false,message:error.message})
    }
  }

  async loginTrainer(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.trainerService.loginTrainer(req.body);
      console.log("responssssssssssssssssss", response);
      res.cookie("refreshToken", response?.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
      const data = {
        trainer: response?.trainer,
        accessToken: response?.accessToken,
      };
      res
        .status(200)
        .json({ success: true, data, message: trainerMessages.LOGIN_SUCCESS });
    } catch (error: any) {
      console.log("eeeeeeeeeeeeerrrrrrrrrrrooooooorrrrrrr");
      handleError(res, error);
    }
  }

  async getTrainerProfile(req: Request, res: Response): Promise<void> {
    try {
      const trainerProfile = await this.trainerService.getTrainerProfile(
        res.locals.user?.userId
      );
      res
        .status(200)
        .json({
          success: true,
          message: trainerMessages.GET_TRAINER_PROFILE_SUCCESS,
          trainerProfile,
        });
    } catch (error: any) {
      handleError(res, error);
      // res.status(400).json({success:false,message:trainerMessages.GET_TRAINER_PROFILE_FAILURE})
    }
  }
  async editTrainerProfile(req: Request, res: Response): Promise<void> {
    try {
      const updatedTrainerProfile =
        await this.trainerService.editTrainerProfile(
          res.locals?.user.userId,
          req.body
        );
      res
        .status(200)
        .json({
          success: true,
          message: trainerMessages.TRAINER_EDIT_PROFILE_SUCCESS,
          returnedTrainerProfile: updatedTrainerProfile,
        });
    } catch (error) {
      handleError(res, error);
      // res.status(400).json({success:false,message:trainerMessages.EDIT_TRAINER_PROFILE_ERROR})
    }
  }
  async addTrainerProfilImage(req: Request, res: Response): Promise<void> {
    try {
      const image = await this.trainerService.addTrainerProfilePic(
        res.locals.user?.userId,
        req.body.trainerProfileImage
      );
      res
        .status(200)
        .json({
          success: true,
          message: trainerMessages.ADD_PROFILE_IMAGE_SUCCESS,
          image,
        });
    } catch (error) {
      handleError(res, error);
      // res.status(400).json({success:false,message:trainerMessages.ADD_PROFILE_IMAGE_ERROR})
    }
  }
  async addCertificate(req: Request, res: Response): Promise<void> {
    try {
      const trainerCertificate = await this.trainerService.addCertificate(
        res.locals.user?.userId,
        req.body.trainerCertificate
      );
      res
        .status(201)
        .json({
          success: true,
          message: trainerMessages.TRAINER_CERTIFICATE_ADD_SUCCESS,
          trainerCertificate,
        });
    } catch (error) {
      console.log(error);
      handleError(res, error);
      // res.status(400).json({success:false,message:trainerMessages.TRAINER_CERTIFICATE_ADD_FAILURE})
    }
  }

  async checkPassword(req: Request, res: Response): Promise<void> {
    try {
      const isTrue = await this.trainerService.checkPassword(
        res.locals.user?.userId,
        req.body.password
      );
      if (isTrue) {
        res
          .status(200)
          .json({
            success: true,
            message: trainerMessages.PASSWORD_CHECK_SUCCESS,
          });
        return;
      }
      res
        .status(403)
        .json({
          success: false,
          message: trainerMessages.PASSWORD_CHECK_FAILURE,
        });
    } catch (error) {
      handleError(res, error);
      // res.status(400).json({success:false,message:trainerMessages.PASSWORD_CHECK_ERROR})
    }
  }
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const trainer = await this.trainerService.resetPassword(
        res.locals.user.userId,
        req.body.password
      );
      if (trainer)
        res
          .status(201)
          .json({
            success: true,
            message: commonMessages.PASSWORD_UPDATE_SUCCESS,
          });
    } catch (error) {
      handleError(res, error);
      // res.status(400).json({success:false,message:commonErrors.RESET_PASSWORD_ERROR})
    }
  }

  async updateAvailability(req: Request, res: Response): Promise<void> {
    try {
      console.log("req", req.body);
      const availability = await this.trainerService.updateAvailability(
        res.locals.user?.userId,
        req.body
      );

      res
        .status(201)
        .json({
          success: true,
          message: availabilityMessages.AVAILABILITY_UPDATE_SUCCESS,
          availability,
        });
    } catch (error) {
      console.log(error);
      handleError(res, error);
    }
  }
}
