import { ISubscription, ISubscriptionDocument } from "../../interfaces/subscriptionInterfaces";

export interface ISubscriptionService{
    addSubscription(subscription:ISubscription):Promise<ISubscriptionDocument|null>
    getAllSubscriptions():Promise<ISubscriptionDocument[]|null>
    editSubscription(subscription:ISubscription,id:string):Promise<ISubscriptionDocument|null>
    getActiveSubscription():Promise<ISubscriptionDocument[]|null>
    
}