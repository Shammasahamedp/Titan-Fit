import { Request,Response } from "express";
import { IPaymentService } from "../services/payment/IpaymentService";
import { handleError } from "../utils/handleResponse";
import { paymentMessages } from "../messages/payment-related";

export class PaymentController{
    private paymentService:IPaymentService
    constructor(paymentService:IPaymentService){
        this.paymentService = paymentService
    }

    async createCheckoutSession(req:Request,res:Response){
        try {
           const url=await this.paymentService.createCheckoutSession(req.body.planId,res.locals.user.userId)
            res.status(200).json({success:true,message:'url created',url})
        } catch (error) {
            console.log(error)
            handleError(res,error)
        }
    }

    async handleWebhook(req:Request,res:Response){
        try {
            const signature = req.headers['stripe-signature'] as string
            console.log(signature)
            if(!signature){
                throw new Error(paymentMessages.SIGNATURE_NOT_FOUND)
            }
           const somethiing= await this.paymentService.handleWebhook(req.body,signature)
           console.log('this is something',somethiing)
        } catch (error) {
            console.log(error)
            handleError(res,error)
        }
    }

    async getSessionDetails(req:Request,res:Response){
        try {
            if(!req.params.id){
                throw new Error(paymentMessages.SESSIONID_NOT_FOUND)
            }
            const sessionDetails = await this.paymentService.getPaymentSessionDetails(req.params.id)
            res.status(200).json({success:true,message:paymentMessages.FETCH_SESSION_DETAILS_SUCCESS,sessionDetails})
        } catch (error) {
            console.log(error)
            handleError(res,error)
        }
    }
}