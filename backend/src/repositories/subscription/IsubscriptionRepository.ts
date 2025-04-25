import { ISubscription, ISubscriptionDocument } from "../../interfaces/subscriptionInterfaces";
import { IBaseRepository } from "../IbaseRepository";

export interface ISubscriptionRepository extends IBaseRepository<ISubscriptionDocument>{
    // addSubscription(subscription:ISubscription):Promise<ISubscriptionDocument|null>
    // getAllSubscriptions():Promise<ISubscriptionDocument[]|null>
    // editSubscription(subscription:ISubscription,id:string):Promise<ISubscriptionDocument|null>
    // getActiveSubscription():Promise<ISubscriptionDocument[]|null>
//  checkSubscriptionExists(price:number,description:string,durationInMonth:number):Promise<ISubscriptionDocument[]|null>
//  checkSubscriptionNameExists(planName:string):Promise<ISubscriptionDocument[]|null>

}