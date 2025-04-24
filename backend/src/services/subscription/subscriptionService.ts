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
        const isSubscriptionNameExist = this.subscriptionRepo.checkSubscriptionNameExists(subscription.planName)
        if(isSubscriptionNameExist !== null){
               throw new Error('Subscription name is already exists')
        }
        const isSubscriptionExist = this.subscriptionRepo.checkSubscriptionExists(subscription.price,subscription.description,subscription.durationInMonth)
        if(isSubscriptionExist !== null){
            throw new Error('Subscription already Exists')
        }
        const newSubscription = await this.subscriptionRepo.addSubscription(subscription)
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
        const subscriptions = await this.subscriptionRepo.getAllSubscriptions()
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
        const editedSubscription = await this.subscriptionRepo.editSubscription(subscription,id)
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
        const activeSubscription = await this.subscriptionRepo.getActiveSubscription()
        if(!activeSubscription){
            throw new Error()
        }
        return activeSubscription
    } catch (error) {
        throw new Error()
    }
}
}