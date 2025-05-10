import stripe from "../../config/stripe";
import { subscriptionMessage } from "../../messages/subscription-related";
import { IPaymentRepository } from "../../repositories/payment/IpaymentRepository";
import { ISubscriptionRepository } from "../../repositories/subscription/IsubscriptionRepository";
import {  IPaymentService } from "./IpaymentService";
import Stripe from "stripe";
import { paymentMessages } from "../../messages/payment-related";
import { generateTransactionId } from "../../utils/transaction";
import { IPaymentDocument } from "../../interfaces/paymentInterfaces";
import { IUserRepository } from "../../repositories/user/IuserRepository";
import { ISubscriptionDetails } from "../../models/user/IuserModel";
import { Types } from "mongoose";
import { getEndDate } from "../../utils/endDate";
// let stripe.api_key  = process.env.WEBHOOK_SECRET_KEY

export class PaymentService implements IPaymentService{
    private paymentRepo :IPaymentRepository
    private subscriptionRepo : ISubscriptionRepository
    private userRepo : IUserRepository
    constructor(paymentRepository:IPaymentRepository,subscriptionRepository:ISubscriptionRepository,userRepository:IUserRepository){
        this.paymentRepo = paymentRepository
        this.subscriptionRepo = subscriptionRepository
        this.userRepo = userRepository
    }
    async createCheckoutSession(planId:string,userId:string): Promise<string|undefined> {
        try {
            const subscription =await this.subscriptionRepo.findById(planId as string)
            if(!subscription){
                throw new Error(subscriptionMessage.SUBSCRIPTION_NOT_FOUND)
            }
            const sessionParams:Stripe.Checkout.SessionCreateParams = {
                line_items:[{
                    price_data:{
                        currency:'usd',
                        product_data:{name:planId as string},
                        unit_amount:subscription.price*100
                    },
                    quantity:1
                }],
                mode:'payment',
                success_url:`http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url:'http://localhost:5173/cancel',
                payment_intent_data:{
                    metadata:{
                        subscriptionId:planId,
                    amount:subscription.price,
                    userId:userId,
                    transactionId:generateTransactionId()
                    }

                }
            }
            const session = await stripe.checkout.sessions.create(sessionParams)

            if(session){
                return session.url as string
            }
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async handleWebhook(eventData: any,signature:string): Promise<void> {
        try {
            console.log('webhook hit')
             let event = stripe.webhooks.constructEvent(eventData,signature,process.env.WEBHOOK_SECRET_KEY as string)
             if(!event){
                throw new Error(paymentMessages.WEBHOOK_VERIFICATION_FAILED)
             }
             const session = event.data.object as Stripe.Checkout.Session
             const paymentIntentId = session.payment_intent
             const payementIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string)
             if(payementIntent.status === 'succeeded'){
                console.log('metadata',payementIntent.metadata)
                console.log('payemetn successful')
                let paymentData:Partial<IPaymentDocument> = {
                    ...payementIntent.metadata,
                    status:'completed',
                    type:'subscription',

                }
                const paymentWithSameId = await this.paymentRepo.findOne({transactionId:paymentData.transactionId})
                if(!paymentWithSameId){
                    const payment=await this.paymentRepo.create(paymentData)
                    if(payment){
                        const subscription = await this.subscriptionRepo.findById(payementIntent.metadata.subscriptionId)
                        const subscriptionDetails:ISubscriptionDetails={
                            planName:subscription?.planName as string,
                            creditsRemaining:subscription?.credits as number,
                            paymentId:payment._id,
                            status:"active",
                            totalCredits:subscription?.credits as number,
                            subscriptionId:subscription?._id as Types.ObjectId,
                            startDate:new Date(Date.now()),
                            endDate:getEndDate(subscription?.durationInMonth as number)
                        }
                        this.userRepo.addSubscription(payementIntent.metadata.userId,subscriptionDetails)
                    }
                }
                

             }
           
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getPaymentSessionDetails(sessionId:string):Promise<any>{
        try {
            const sessionDetails = await stripe.checkout.sessions.retrieve(sessionId)
            if(!sessionDetails){
                throw new Error(paymentMessages.SESSIONID_MISMATCH_ERROR)
            }
            return sessionDetails
        } catch (error) {
            throw error
        }
    }

}