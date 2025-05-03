import { IPayment } from "../models/payments/IpaymentModel";
import { Document,Types } from "mongoose";

export interface IPaymentDocument extends IPayment,Document{
      _id:Types.ObjectId
}