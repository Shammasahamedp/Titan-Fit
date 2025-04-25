import { ISubscription, ISubscriptionDocument } from "../../interfaces/subscriptionInterfaces";
import { ISubscriptionRepository } from "../../repositories/subscription/IsubscriptionRepository";
import { ISubscriptionService } from "./IsubscriptionService";

export class SubscriptionService implements ISubscriptionService{
    private subscriptionRepo : ISubscriptionRepository

    constructor(subscriptionRepository:ISubscriptionRepository){
        this.subscriptionRepo = subscriptionRepository
    }
async addSubscription(subscription: ISubscription): Promise<ISubscriptionDocument | null> {
    try {
        const isSubscriptionNameExist = this.subscriptionRepo.findOne({planName:subscription.planName})
        if(isSubscriptionNameExist !== null){
               throw new Error('Subscription name is already exists')
        }
        const isSubscriptionExist = this.subscriptionRepo.findOne({planName:subscription.price,description:subscription.description,durationInMonth:subscription.durationInMonth})
        if(isSubscriptionExist !== null){
            throw new Error('Subscription already Exists')
        }
        const newSubscription = await this.subscriptionRepo.create(subscription)
        if(!newSubscription){
            throw new Error()
        }
        return newSubscription
    } catch (error:any) {
        if(error.message === 'Subscription already Exists'){
            throw new Error(error.message)
        }
        throw new Error()
    }
}
async getAllSubscriptions(): Promise<ISubscriptionDocument[] | null> {
    try {
        const subscriptions = await this.subscriptionRepo.find({})
        if(!subscriptions){
           throw new Error()
        }
        return subscriptions
    } catch (error) {
        throw new Error()
    }
}
async editSubscription(subscription: ISubscription,id:string): Promise<ISubscriptionDocument | null> {
    try {
        const editedSubscription = await this.subscriptionRepo.findByIdAndUpdate(id,subscription,{new:true})
        if(!editedSubscription){
            throw new Error()
        }
        return editedSubscription
    } catch (error) {
        throw new Error()
    }
}
async getActiveSubscription(): Promise<ISubscriptionDocument[] | null> {
    try {
        const activeSubscription = await this.subscriptionRepo.find({isActive:true})
        if(!activeSubscription){
            throw new Error()
        }
        return activeSubscription
    } catch (error) {
        throw new Error()
    }
}
}