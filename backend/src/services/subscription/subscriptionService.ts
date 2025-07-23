import { ISubscription, ISubscriptionDocument } from "../../interfaces/subscriptionInterfaces";
import { ISubscriptionRepository } from "../../repositories/subscription/IsubscriptionRepository";
import { AppError } from "../../utils/handleResponse";
import { ISubscriptionService } from "./IsubscriptionService";

export class SubscriptionService implements ISubscriptionService{
    private subscriptionRepo : ISubscriptionRepository

    constructor(subscriptionRepository:ISubscriptionRepository){
        this.subscriptionRepo = subscriptionRepository
    }
async addSubscription(subscription: ISubscription): Promise<ISubscriptionDocument | null> {
    try {
        const isSubscriptionNameExist =await this.subscriptionRepo.findOne({planName:subscription.planName})
        console.log(isSubscriptionNameExist,'sadf')
        if(isSubscriptionNameExist !== null){
               throw new AppError('Subscription name is already exists',409)
        }
        const isSubscriptionExist =await this.subscriptionRepo.findOne({planName:subscription.price,description:subscription.description,durationInMonth:subscription.durationInMonth})
        if(isSubscriptionExist !== null){
            throw new AppError('Subscription already Exists',409)
        }
        const newSubscription = await this.subscriptionRepo.create(subscription)
        
        if(!newSubscription){
            throw new AppError('failed to create new subscription',400)
        }
        return newSubscription
    } catch (error:any) {
        if(error instanceof AppError){
            throw error
        }
        throw new AppError('something went wrong while adding subscription',500)
    }
}
async getAllSubscriptions(): Promise<ISubscriptionDocument[] | null> {
    try {
        const subscriptions = await this.subscriptionRepo.find({})
        if(!subscriptions){
           throw new AppError('subscriptions not found',404)
        }
        return subscriptions
    } catch (error) {
        if(error instanceof AppError){
            throw error
        }
        throw new AppError('something went wrong while fetch subscriptions',500)
    }
}
async editSubscription(subscription: ISubscription,id:string): Promise<ISubscriptionDocument | null> {
    try {
        const editedSubscription = await this.subscriptionRepo.findByIdAndUpdate(id,subscription,{new:true})
        if(!editedSubscription){
            throw new AppError('failed to edit the subscription,not found the edited subscription',404)
        }
        return editedSubscription
    } catch (error) {
        if(error instanceof AppError){
            throw error
        }
        throw new AppError('something went wrong while edit subscription',500)
    }
}
async getActiveSubscription(): Promise<ISubscriptionDocument[] | null> {
    try {
        const activeSubscription = await this.subscriptionRepo.find({isActive:true})
        
        if(!activeSubscription){
            throw new AppError('not found active subscription',404)
        }
        return activeSubscription
    } catch (error) {
        if(error instanceof AppError){
            throw error
        }
        throw new AppError('something went wrong while fetching active subscription',500)
    }
}
}