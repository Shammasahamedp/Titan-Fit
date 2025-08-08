import { AvailabilityRepository } from "../repositories/availability/availabilityRepository";
import { TrainerRepository } from "../repositories/trainer/trainerRepository";
import { UserRepository } from "../repositories/user/userRepository";
import { UserService } from "../services/user/userSevice";
import cron from 'node-cron'
const userRepo = new UserRepository()
const trainerRepo = new TrainerRepository()
const trainerAvailability = new AvailabilityRepository()
const userService = new UserService(userRepo,trainerRepo,trainerAvailability)

cron.schedule('0 0 * * *',async ()=>{
    await userService.updateExpiredSubscription()
})