import { ISubscription, ISubscriptionDocument } from "../../interfaces/subscriptionInterfaces";
import { subscriptionModel } from "../../models/subscription/subscriptionModel";
import { ISubscriptionRepository } from "./IsubscriptionRepository";

export class SubscriptionRepository implements ISubscriptionRepository{
    async addSubscription(subscription: ISubscription): Promise<ISubscriptionDocument | null> {
        return await subscriptionModel.create(subscription) as ISubscriptionDocument
    }
    async getAllSubscriptions(): Promise<ISubscriptionDocument[] | null> {
        return await subscriptionModel.find()
    }
    async editSubscription(subscription: ISubscription,id:string): Promise<ISubscriptionDocument | null> {
        return await subscriptionModel.findByIdAndUpdate(id,subscription,{new:true})
    }
    async getActiveSubscription(): Promise<ISubscriptionDocument[] | null> {
        return await subscriptionModel.find({isActive:true})
    }
    async checkSubscriptionExists(price: number, description: string, durationInMonth: number): Promise<ISubscriptionDocument[] | null> {
        return await subscriptionModel.find({price,description,durationInMonth})
    }
    async checkSubscriptionNameExists(planName: string): Promise<ISubscriptionDocument[] | null> {
        return await subscriptionModel.findOne({planName})
    }
}